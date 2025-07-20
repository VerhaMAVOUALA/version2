import connectionDB from "../config/db.js";

// Fonction pour effectuer une réservation
export const doBooking = async (req, res) => {
    const { carId } = req.params;
    const { DateBooking } = req.body;
    const tokenUserId = req.user.id;

    try {
        if (!tokenUserId) {
            return res.status(401).json({
                success: false,
                message: "Utilisateur non authentifié",
            });
        }

        if (!DateBooking) {
            return res.status(400).json({
                success: false,
                message: "Tous les champs sont obligatoires",
            });
        }

        // Vérifie si la voiture existe
        const [carRows] = await connectionDB.query(
            "SELECT id FROM cars WHERE id = ?",
            [carId]
        );

        if (carRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Voiture non trouvée",
            });
        }

        const car = carRows[0];

        // Insère la réservation
        const [bookingResult] = await connectionDB.query(
            "INSERT INTO booking (driverId, clientId, DateBooking) VALUES (?, ?, ?)",
            [car.id, tokenUserId, DateBooking]
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
            error: "INTERNAL_SERVER_ERROR",
        });
    }
};
