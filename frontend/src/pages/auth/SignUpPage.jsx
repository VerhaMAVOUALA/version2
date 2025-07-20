import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { apiURL } from '../../lib/apiURL';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import './SignUpPage.css'; // Import du fichier CSS

export const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    password: '',
  });
  const [error, setError] = useState('');
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
      const response = await fetch(`${apiURL}/api/auth/inscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Inscription réussie');
        setTimeout(() => {
          navigate('/connexion');
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
        setError(errorData.message);
      }

      setFormData({
        username: '',
        email: '',
        role: '',
        password: '',
      });
      
    } catch (error) {
      setError(error.message);
      toast.error("Une erreur est survenue: " + error.message);
    }
  };

  return (
    <div className="signup-container">
      <Toaster position="top-center" richColors />
      
      <div className="signup-header">
        <h2 className="signup-title">
          Créez votre compte
        </h2>
        <p className="signup-subtitle">
          Ou{' '}
          <Link to="/connexion" className="signup-link">
            connectez-vous à votre compte existant
          </Link>
        </p>
      </div>

      <div className="signup-form-container">
        <div className="signup-form-wrapper">
          {error && (
            <div className="error-message">
              <div className="error-content">
                <div className="error-icon">
                  <svg className="error-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="error-text">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          )}

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Nom d'utilisateur
              </label>
              <div className="form-input-container">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Adresse email
              </label>
              <div className="form-input-container">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="role" className="form-label">
                Rôle
              </label>
              <div className="form-input-container">
                <select
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Sélectionner un rôle</option>
                  <option value="client">Client</option>
                  <option value="driver">Chauffeur</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Mot de passe
              </label>
              <div className="form-input-container">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-submit">
              <button
                type="submit"
                className="submit-button"
              >
                S'inscrire
              </button>
            </div>
          </form>

          <div className="social-divider">
            <div className="divider-line"></div>
            <div className="divider-text">
              <span>Ou continuer avec</span>
            </div>
          </div>

          <div className="social-buttons">
            <div className="social-button-container">
              <button
                type="button"
                className="social-button google-button"
              >
                <FcGoogle className="social-icon" />
                <span className="social-button-text">Google</span>
              </button>
            </div>

            <div className="social-button-container">
              <button
                type="button"
                className="social-button facebook-button"
              >
                <FaFacebook className="social-icon facebook-icon" />
                <span className="social-button-text">Facebook</span>
              </button>
            </div>
          </div>

          <div className="home-link-container">
            <Link 
              to="/" 
              className="home-link"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};