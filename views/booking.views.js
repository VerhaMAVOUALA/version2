import express from "express";
import { doBooking, myBookings } from "../controllers/booking.controller.js";
import { VerifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/new/:carId", VerifyUser, doBooking);
router.get("/my-bookings", VerifyUser, myBookings);
//router.delete("/delete/:bookingId", VerifyUser, deleteBookings);

export default router;
