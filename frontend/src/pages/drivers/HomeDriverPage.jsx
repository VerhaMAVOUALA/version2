import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { NavCars } from './composants/NavCars'
import { toast, Toaster } from 'sonner'
import './HomeDriverPage.css'

export const HomeDriverPage = () => {
  const { currentUser } = useSelector((state) => state.user)

  const handleEditProfile = () => {
    toast.info('Fonctionnalité de modification en développement');
  };

  const handleDeleteProfile = () => {
    toast.warning('Fonctionnalité de suppression en développement');
  };

  return (
    <div className="dashboard-container">
      <Toaster position="top-right" richColors />
      
      <header className="dashboard-header">
        <div className="welcome-section">
          <h1 className="welcome-title">Bienvenue, {currentUser.username}!</h1>
          <p className="welcome-subtitle">Vous êtes connecté en tant que chauffeur</p>
        </div>
        <NavCars />
      </header>

      <section className="stats-section">
        <div className="stat-card">
          <div className="stat-icon">👤</div>
          <h3>Profil complet</h3>
          <p>100%</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '100%' }}></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚗</div>
          <h3>Véhicules</h3>
          <p>0</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '0%' }}></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <h3>Disponibilités</h3>
          <p>0</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '0%' }}></div>
          </div>
        </div>
      </section>

      <main className="dashboard-main">
        <section className="profile-section">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h2 className="section-title">Vos informations</h2>
            <div className="flex gap-3">
              <button 
                onClick={handleEditProfile} 
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm
                          bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 hover:border-blue-300
                          hover:-translate-y-0.5 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Modifier
              </button>
              <button 
                onClick={handleDeleteProfile} 
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm
                          bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:border-red-300
                          hover:-translate-y-0.5 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
                Supprimer
              </button>
            </div>
          </div>
          <div className="profile-card">
            <div className="profile-info">
              <p><span>Nom d'utilisateur:</span> {currentUser.username}</p>
              <p><span>Email:</span> {currentUser.email}</p>
              <p><span>Rôle:</span> {currentUser.role}</p>
            </div>
            <div className="profile-decoration">
              <div className="decoration-circle"></div>
              <div className="decoration-circle"></div>
              <div className="decoration-circle"></div>
            </div>
          </div>
        </section>

        <section className="actions-section">
          <Link to="/driver/manage-cars" className="action-button primary-button">
            Gérer les véhicules
            <span className="button-arrow">→</span>
          </Link>
          <Link to="/driver/availability" className="action-button accent-button">
            Gérer les disponibilités
            <span className="button-arrow">→</span>
          </Link>
          <Link to="/" className="action-button secondary-button">
            Retour à l'accueil
            <span className="button-arrow">↩</span>
          </Link>
        </section>
      </main>
    </div>
  )
}