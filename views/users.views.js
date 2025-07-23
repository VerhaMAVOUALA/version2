import express from "express";
import { signin, signout, signup, updateUser } from "../controllers/users.controller.js";
import { VerifyUser } from "../middleware/verifyUser.js";


const router = express.Router();

router.post("/inscription", signup);  
router.post("/connexion", signin); 
router.post("/deconnexion", VerifyUser, signout); 
router.patch("/update-user", VerifyUser, updateUser);

export default router;  