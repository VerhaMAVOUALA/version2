import express from "express";
import dotenv from "dotenv";
import connectionDB from "./config/db.js";
import employeeRoutes from "./views/employe.views.js";
import authRoutes from "./views/users.views.js";
import carsRoutes from "./views/cars.views.js"
import bookingRoutes from "./views/booking.views.js"
import cookieParser from "cookie-parser";
import cors from "cors";

// Chargement des variables d'environnement
dotenv.config();

const app = express();
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true,
  }
));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

connectionDB;

app.use("/api/employees", employeeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cars", carsRoutes)
app.use("/api/bookings", bookingRoutes)

const PORT = process.env.PORT || 9000;

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
