import express from "express";
import { doBooking, manageBooking, myBookingsClient, myBookingsDriver } from "../controllers/booking.controller.js";
import { VerifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/new/:carId", VerifyUser, doBooking);
router.get("/my-bookings/driver", VerifyUser, myBookingsDriver);
router.get("/my-bookings/client", VerifyUser, myBookingsClient);
router.patch("/manage/:bookingId", VerifyUser, manageBooking);

//router.delete("/delete/:bookingId", VerifyUser, deleteBookings);

export default router;
