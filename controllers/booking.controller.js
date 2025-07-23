import connectionDB from "../config/db.js";

// Fonction pour effectuer une réservation
export const doBooking = async (req, res) => {
  const { carId } = req.params;
  const { DateBooking, startPlace, endPlace } = req.body;
  const tokenUserId = req.user.id;

  try {
    //Vérifier si l'utilisateur est authentifié
    if (!tokenUserId) {
      return res.status(401).json({
        success: false,
        message: "Utilisateur non authentifié",
      });
    }

    //Vérifier les données
    const textRegex = /^[a-zA-ZÀ-ÿ\s-]+$/; 

    if (!DateBooking || !startPlace || !endPlace) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs sont obligatoires",
      });
    }

    // Vérification des champs texte (lieu de départ et d'arrivée)
    if (
      !textRegex.test(startPlace.trim()) ||
      !textRegex.test(endPlace.trim())
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Les lieux ne doivent contenir que des lettres, espaces et tirets",
      });
    }

    // Vérification de la date
    const selectedDate = new Date(DateBooking);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Format de date invalide",
      });
    }

    if (selectedDate < today) {
      return res.status(400).json({
        success: false,
        message:
          "La date de réservation doit être aujourd'hui ou dans le futur",
      });
    }

    // Vérifie si la voiture existe
    const [carRows] = await connectionDB.query(
      "SELECT id, userId FROM cars WHERE id = ? AND available = 0",
      [carId]
    );

    if (carRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Voiture non trouvée et pas disponible",
      });
    }

    const car = carRows[0];

    //console.log(car.userId);
  

    // Insère la réservation
    const [bookingResult] = await connectionDB.query(
      "INSERT INTO booking (driverId, clientId, DateBooking, startPlace, endPlace) VALUES (?, ?, ?, ?, ?)",
      [car.userId, tokenUserId, DateBooking, startPlace, endPlace]
    );

    res.status(201).json({
      success: true,
      message: "Réservation effectuée avec succès !",
      bookingId: bookingResult.insertId,
    });
  } catch (error) {
    //console.error("Erreur lors de la réservation :", error);
    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
      error: error.message,
    });
  }
};

// Fonction pour afficher mes réservations
export const myBookingsDriver = async (req, res) => {
  const tokenUserId = req.user.id;

  try {
    if (!tokenUserId) {
      return res.status(401).json({
        success: false,
        message: "Utilisateur non authentifié",
      });
    }

    const [rows] = await connectionDB.query(`
      SELECT 
        b.id AS bookingId,
        b.DateBooking,
        b.startPlace,
        b.endPlace,
        b.action,
        b.clientId,
        b.driverId,
        c.id AS carId,
        c.name AS carName,
        c.image,
        c.color,
        c.registration
      FROM booking b
      LEFT JOIN cars c ON b.driverId = c.userId 
      WHERE b.driverId = ?
    `, [tokenUserId]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Aucune réservation trouvée",
        count: 0,
      });
    }

    // Restructuration propre
    const bookings = rows.map(row => ({
      id: row.bookingId, // ← ID de la réservation
      DateBooking: row.DateBooking,
      startPlace: row.startPlace,
      endPlace: row.endPlace,
      action: row.action,
      clientId: row.clientId,
      driverId: row.driverId,
      car: {
        id: row.carId,
        name: row.carName,
        image: row.image,
        color: row.color,
        registration: row.registration,
      },
    }));

    res.status(200).json({
      message: "Vos réservations ont été récupérées avec succès !",
      success: true,
      bookings,
      count: bookings.length,
    });
  } catch (error) {
    console.log("Erreur lors de la récupération des réservations :", error);
    res.status(500).json({
      message: "Erreur interne du serveur",
      error: "INTERNAL_SERVER_ERROR",
    });
  }
};



//Fonction pour afficher les réservation pour le client
export const myBookingsClient = async (req, res) => {
  const tokenUserId = req.user.id;
  
  try {
    if (!tokenUserId) {
      return res.status(401).json({
        success: false,
        message: "Utilisateur non authentifié",
      });
    }

    // Requête avec jointures pour récupérer les infos du booking, chauffeur et voiture
    const [bookings] = await connectionDB.query(`
      SELECT 
        b.id as bookingId,
        b.DateBooking,
        b.startPlace,
        b.endPlace,
        b.action,
        u.id as driverId,
        u.username as driverName,
        c.id as carId,
        c.name as carName,
        c.color as carColor,
        c.registration as carRegistration,
        c.image as carImage,
        c.available as carAvailable
      FROM booking b
      INNER JOIN users u ON b.driverId = u.id
      LEFT JOIN cars c ON u.id = c.userId
      WHERE b.clientId = ?
    `, [tokenUserId]);

    if (bookings.length === 0) {
      return res.status(404).json({
        success: false,
        count: bookings.length,
        message: "Aucune réservation trouvée",
      });
    }

    res.status(200).json({
      message: "Vos réservations ont été récupérées avec succès !",
      success: true,
      bookings,
      count: bookings.length,
    });

  } catch (error) {
    console.log("Erreur lors de la récupération de vos réservations :", error);
    res.status(500).json({
      message: "Erreur interne du serveur",
      error: "INTERNAL_SERVER_ERROR",
    });
  }
};

// Fonction Accepter ou Refuser une réservation
export const manageBooking = async (req, res) => {
  const { bookingId } = req.params;
  const { action } = req.body;
  const tokenUserId = req.user?.id;

  const ALLOWED_ACTIONS = {
    accept: 1,
    refuse: 2,
  };

  if (!tokenUserId) {
    return res.status(401).json({
      success: false,
      message: "Utilisateur non authentifié",
    });
  }

  const mappedAction = ALLOWED_ACTIONS[action];
  if (!mappedAction) {
    return res.status(400).json({
      success: false,
      message: "Action invalide. Utilisez 'accept' ou 'refuse'.",
    });
  }

  try {
    // Vérifier que la réservation existe et appartient au conducteur connecté
    const [bookingResult] = await connectionDB.query(
      `
      SELECT b.*, c.id AS carId 
      FROM booking b 
      JOIN cars c ON c.userId = b.driverId 
      WHERE b.id = ? AND b.driverId = ?
      `,
      [bookingId, tokenUserId]
    );

    if (bookingResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Réservation non trouvée ou accès interdit.",
      });
    }

    const booking = bookingResult[0];

    if (booking.action && booking.action !== 0) {
      return res.status(400).json({
        success: false,
        message: "Cette réservation a déjà été traitée.",
      });
    }

    // Commencer la transaction
    await connectionDB.query("START TRANSACTION");

    try {
      // Mettre à jour le statut de la réservation
      await connectionDB.query(
        `UPDATE booking SET action = ? WHERE id = ? AND driverId = ?`,
        [mappedAction, bookingId, tokenUserId]
      );

      // Si acceptée, rendre la voiture disponible
      if (mappedAction === 1) {
        await connectionDB.query(
          `UPDATE cars SET available = 1 WHERE userId = ?`,
          [tokenUserId]
        );
      }

      await connectionDB.query("COMMIT");

      return res.status(200).json({
        success: true,
        message: `Réservation ${action}ée avec succès !`,
        booking: {
          id: bookingId,
          action: mappedAction,
          status: action,
        },
      });
    } catch (err) {
      await connectionDB.query("ROLLBACK");
      console.error("Erreur transactionnelle :", err);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la mise à jour de la réservation.",
      });
    }
  } catch (error) {
    console.error("Erreur serveur :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur interne du serveur.",
    });
  }
};

