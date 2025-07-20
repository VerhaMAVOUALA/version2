import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../../redux/userSlice';
import { apiURL } from '../../lib/apiURL';
import { Toaster, toast } from 'sonner';
import './SignInPage.css'; // Import du fichier CSS

/**
 * Composant SignInPage - Page de connexion utilisateur
 * Gère l'authentification avec Redux et redirige selon le rôle utilisateur
 */
export const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      
      const response = await fetch(`${apiURL}/api/auth/connexion`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(signInSuccess(data));
        toast.success('Connexion reussie');

        setTimeout(() => {
          if(data.user.role === "client") {
            navigate('/client');
          } else if(data.user.role === "driver") {
            navigate('/driver');
          } else {
            navigate('/');
          }
        }, 2000);
        
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
        setError(errorData.message);
        dispatch(signInFailure(error));
      }
    } catch (error) {
      setError(error.message);
      toast.error("Une erreur est survenue: " + error.message);
    }
  };

  return (
    <div className="signin-container">
      <Toaster />
      
      <div className="signin-content">
        <div className="signin-header">
          <h1 className="signin-title">Connexion</h1>
          <p className="signin-subtitle">Accédez à votre compte</p>
        </div>
        
        <div className="signin-form-container">
          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Adresse email
              </label>
              <input 
                className="form-input" 
                onChange={handleChange} 
                name="email" 
                type="email" 
                placeholder="votre@email.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Mot de passe
              </label>
              <input 
                className="form-input" 
                onChange={handleChange} 
                name="password" 
                type="password" 
                placeholder="••••••••"
                required
              />
            </div>
            
            <button 
              className="submit-button" 
              type="submit"
            >
              Se connecter
            </button>
          </form>
          
          <div className="signin-footer">
            <div className="footer-links">
              <div className="footer-link">
                <span className="footer-text">Vous n'avez pas de compte ? </span>
                <Link 
                  to="/inscription" 
                  className="footer-link-text"
                >
                  Créez-en un
                </Link>
              </div>
              
              <div className="footer-link">
                <Link 
                  to="/" 
                  className="footer-home-link"
                >
                  ← Retour à l'accueil
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};