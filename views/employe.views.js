import express from "express";
import { createEmployee } from "../controllers/employe.controllers.js";

const router = express.Router();

router.post("/", createEmployee);

export default router;
