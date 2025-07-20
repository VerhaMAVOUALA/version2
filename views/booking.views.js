import express from "express";
import { doBooking } from "../controllers/booking.controller.js";
import { VerifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/new/:carId", VerifyUser, doBooking);

export default router;
