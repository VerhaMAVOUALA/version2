import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import connectionDB from '../config/db.js';

dotenv.config();
export const VerifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.Ng4pvnk32vzl0vvr;
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Utilisateur non authentifié.",
      });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_USER);
    const userId = decodedToken.userId;

    const [user] = await connectionDB.query(
      'SELECT id, username, email FROM users WHERE id = ?', 
      [userId]
    );
    
    if (!user[0]) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé.",
      });
    }

    req.user = user[0];
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Token invalide.",
    });
  }
};