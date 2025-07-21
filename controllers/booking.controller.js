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
export const myBookings = async (req, res) => {
  const tokenUserId = req.user.id;
  try {
    if (!tokenUserId) {
      return res.status(401).json({
        success: false,
        message: "Utilisateur non authentifié",
      });
    }
    const [bookings] = await connectionDB.query(  
      "SELECT * FROM booking WHERE clientId = ?",
      [tokenUserId] 
    );
    if (bookings.length === 0) {
      return res.status(404).json({
        success: false,
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
    // Erreur générique pour ne pas exposer les détails internes
    res.status(500).json({
      message: "Erreur interne du serveur",
      error: "INTERNAL_SERVER_ERROR",
    });
  }
};

//Fonction pour supprimer une réservation
export const deleteBookings = async(req, res) => {
  const {bookingId} = req.params;
  const tokenUserId = req.user.id;
  try {
    if (!tokenUserId) {
      return res.status(401).json({
        success: false,
        message: "Utilisateur non authentifié",
      });
    }
    const [bookings] = await connectionDB.query(  
      "SELECT * FROM booking WHERE id = ? AND clientId = ?",
      [bookingId, tokenUserId] 
    );
    if (bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Aucune réservation trouvée",
      });
    }
    
    const [deleteBooking] = await connectionDB.query(
      "DELETE FROM booking WHERE id = ? AND clientId = ?",
      [bookingId, tokenUserId] 
    );
    
    res.status(200).json({
      message: "Réservation supprimée avec succès !",
      success: true,
    });    
  } catch (error) {
    console.log("Erreur lors de la suppression de la réservation :", error);
    // Erreur générique pour ne pas exposer les détails internes
    res.status(500).json({
      message: "Erreur interne du serveur",
      error: "INTERNAL_SERVER_ERROR",
    });
  }
}
