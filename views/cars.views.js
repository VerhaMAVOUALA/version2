import express from "express"
import { VerifyUser } from "../middleware/verifyUser.js"
import { addNewCars, getAllCars, getMyCars } from "../controllers/cars.controllers.js"

const router = express.Router()

router.post("/new", VerifyUser, addNewCars)
router.get("/my-cars", VerifyUser, getMyCars)
router.get("/all", getAllCars)

export default router