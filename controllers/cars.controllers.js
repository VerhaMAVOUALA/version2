import connectionDB from "../config/db.js";

// Fonction pour ajouter une voiture
export const addNewCars = async (req, res) => {
  const { name, color, registration, image } = req.body;
  const tokenUserId = req.user.id;

  try {
    //console.log("tokenUserId: ", tokenUserId)

    if (!tokenUserId) {
      return res.status(401).json({
        success: false,
        message: "Utilisateur non authentifié",
      });
    }

    if (!name || !color || !registration || !image) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires",
        success: false,
      });
    }

    // Vérifier si le chauffeur a une voiture
    const [existingCars] = await connectionDB.query(
      "SELECT userId FROM cars WHERE userId = ?",
      [tokenUserId]
    );

    if (existingCars.length > 0) {
      return res.status(409).json({
        message: "Vous avez déjà une voiture",
        success: false,
      });
    }

    // Insérer une nouvelle voiture
    const [result] = await connectionDB.query(
      "INSERT INTO cars (name, color, registration, image, userId) VALUES (?, ?, ?, ?, ?)",
      [name, color, registration, image, tokenUserId]
    );

    res.status(201).json({
      message: "Voiture ajoutée avec succès !",
      success: true,
    });
  } catch (error) {
    console.log("Erreur lors de l'ajout d'une voiture :", error);
    // Erreur générique pour ne pas exposer les détails internes
    res.status(500).json({
      message: "Erreur interne du serveur",
      error: "INTERNAL_SERVER_ERROR",
    });
  }
};

// Fonction pour récupérer la voiture du chauffeur
export const getMyCars = async (req, res) => {
  const tokenUserId = req.user.id;
  try {
    if (!tokenUserId) {
      return res.status(401).json({
        success: false,
        message: "Utilisateur non authentifié",
      });
    }
    const [cars] = await connectionDB.query(
      "SELECT * FROM cars WHERE userId = ?",
      [tokenUserId]
    );
    res.status(200).json({
      message: "Votre voiture a été récupérée avec succès !",
      success: true,
      cars,
    });
  } catch (error) {
    console.log("Erreur lors de la récupération de votre voiture :", error);
    // Erreur générique pour ne pas exposer les détails internes
    res.status(500).json({
      message: "Erreur interne du serveur",
      error: "INTERNAL_SERVER_ERROR",
    });
  }
};

// Fonction pour mettre à jour une voiture
export const updateCars = async (req, res) =>{


}

// Fonction pour récupérer toutes les voitures
export const getAllCars = async (req, res) =>{
  try {
    const [cars] = await connectionDB.query(`
      SELECT c.*, u.username
      FROM cars c
      JOIN users u ON c.userId = u.id
      WHERE c.available = 0
    `);
    if (!cars) {
      return res.status(404).json({
        success: false,
        message: "Voitures non trouvées",
      });
    }

    //console.log(cars);
    res.status(200).json({
      message: "Voitures récupérées avec succès !",
      success: true,
      cars,
    });
  } catch (error) {
    console.log("Erreur lors de la récupération des voitures :", error);
    // Erreur générique pour ne pas exposer les détails internes
    res.status(500).json({
      message: "Erreur interne du serveur",
      error: "INTERNAL_SERVER_ERROR",
    });
  }


}
