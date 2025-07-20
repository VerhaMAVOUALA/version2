import bcrypt from 'bcrypt';
import connectionDB from '../config/db.js';
import jwt from 'jsonwebtoken';

// Fonction pour valider l'email
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


// Fonction pour valider le mot de passe
const isValidPassword = (password) => {
    // Au moins 4 caractères, une majuscule, une minuscule, un chiffre
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{4,}$/;
    return passwordRegex.test(password);
};

export const signup = async (req, res) => {
    const { email, username, role, password } = req.body;

    // Validation des champs obligatoires
    if (!username || !email || !role || !password) {
        return res.status(400).json({ 
            message: 'Tous les champs sont obligatoires',
            error: 'MISSING_FIELDS'
        });
    }

    // Validation de l'email
    if (!isValidEmail(email)) {
        return res.status(400).json({ 
            message: 'Format d\'email invalide',
            error: 'INVALID_EMAIL'
        });
    }

    // Validation du username (longueur minimum)
    if (username.length < 3) {
        return res.status(400).json({ 
            message: 'Le nom d\'utilisateur doit contenir au moins 3 caractères',
            error: 'INVALID_USERNAME'
        });
    }

    // Validation du mot de passe
    if (!isValidPassword(password)) {
        return res.status(400).json({ 
            message: 'Le mot de passe doit contenir au moins 4 caractères, une majuscule, une minuscule et un chiffre',
            error: 'INVALID_PASSWORD'
        });
    }

    try {
        // Vérification si l'email existe déjà
        const [existingUserByEmail] = await connectionDB.query(
            'SELECT id FROM users WHERE email = ?', 
            [email]
        );
        
        if (existingUserByEmail.length > 0) {
            return res.status(409).json({ 
                message: 'Cet email est déjà utilisé',
                error: 'EMAIL_EXISTS'
            });
        }

        // Vérification si le username existe déjà
        const [existingUserByUsername] = await connectionDB.query(
            'SELECT id FROM users WHERE username = ?', 
            [username]
        );
        
        if (existingUserByUsername.length > 0) {
            return res.status(409).json({ 
                message: 'Ce nom d\'utilisateur est déjà utilisé',
                error: 'USERNAME_EXISTS'
            });
        }

        // Hachage du mot de passe
        const saltRounds = 12; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insertion du nouvel utilisateur
        const [result] = await connectionDB.query(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', 
            [username, email.toLowerCase(),  hashedPassword, role]
        );

        // Réponse de succès (sans renvoyer d'informations sensibles)
        res.status(201).json({ 
            message: 'Utilisateur créé avec succès',
            userId: result.insertId,
            username: username
        });

    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        
        // Gestion des erreurs spécifiques MySQL
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ 
                message: 'Cette information est déjà utilisée',
                error: 'DUPLICATE_ENTRY'
            });
        }
        
        // Erreur générique pour ne pas exposer les détails internes
        res.status(500).json({ 
            message: 'Erreur interne du serveur',
            error: 'INTERNAL_SERVER_ERROR'
        });
    }
};

export const signin = async (req, res) => {
    const { email, password } = req.body;

    // Validation des champs obligatoires
    if (!email || !password) {
        return res.status(400).json({ 
            message: 'Email et mot de passe sont obligatoires',
            error: 'MISSING_CREDENTIALS'
        });
    }

    // Validation du format d'email
    if (!isValidEmail(email)) {
        return res.status(400).json({ 
            message: 'Format d\'email invalide',
            error: 'INVALID_EMAIL'
        });
    }

    try {
        // Recherche de l'utilisateur par email
        const [users] = await connectionDB.query(
            'SELECT id, username, email, password,role FROM users WHERE email = ?', 
            [email.toLowerCase()]
        );

        if (users.length === 0) {
            return res.status(401).json({ 
                message: 'Email ou mot de passe incorrect',
                error: 'INVALID_CREDENTIALS'
            });
        }

        const user = users[0];

        // Vérification du mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ 
                message: 'Email ou mot de passe incorrect',
                error: 'INVALID_CREDENTIALS'
            });
        }

        // Génération du token JWT avec expiration de 5h
        const token = jwt.sign(
            { 
                userId: user.id,
                },
            process.env.TOKEN_SECRET_USER,
            { 
                expiresIn: '5h',
            }
        );
    // Configuration de l'expiration du cookie avec le token
    const cookieExpiration = new Date(Date.now() + 5 * 60 * 60 * 1000);


    res
    .cookie("Ng4pvnk32vzl0vvr", token, {
      httpOnly: true,
      expires: cookieExpiration,
      secure: true,
      sameSite: "strict",
      path: "/",
    })
    .status(200)
    .json({
      success: true,
      message: "Connexion réussie !",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });


    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        
        // Vérification si l'erreur est liée au JWT
        if (error.name === 'JsonWebTokenError') {
            return res.status(500).json({ 
                message: 'Erreur de génération du token',
                error: 'JWT_ERROR'
            });
        }
        
        // Erreur générique
        res.status(500).json({ 
            message: 'Erreur interne du serveur',
            error: 'INTERNAL_SERVER_ERROR'
        });
    }
};


export const signout = async (req, res, next) => {
    try {
      const token = req.cookies.Ng4pvnk32vzl0vvr
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Utilisateur non authentifié.",
        })
      }
  
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_USER)
      const userId = decodedToken.id
  
      // Vérifier si l'utilisateur existe
      const user = await connectionDB.query(
        'SELECT id FROM users WHERE id = ?', 
        [userId]
      );
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé.",
        })
      }
  
      // Effacer le cookie de connexion
      res
        .clearCookie("Ng4pvnk32vzl0vvr", {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/",
        })
        .status(200)
        .json({
          success: true,
          message: "Déconnexion réussie.",
        })
    } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
        res.status(500).json({
            success: false,
            message: "Erreur lors de la déconnexion.",
            error: error.message
          })
    }
  }