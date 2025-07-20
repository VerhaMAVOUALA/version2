import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { NavClient } from './composants/NavClient'
import './HomeClientPage.css'

export const HomeClientPage = () => {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <header className="dashboard-header">
        <div className="welcome-section">
          <h1 className="welcome-title">Bienvenue, {currentUser.username}!</h1>
          <p className="welcome-subtitle">Vous êtes connecté à votre espace client</p>
        </div>
        <NavClient />
      </header>

      {/* Quick Stats */}
      <section className="stats-section">
        <div className="stat-card">
          <h3>Profil complet</h3>
          <p>100%</p>
        </div>
        <div className="stat-card">
          <h3>Réservations</h3>
          <p>0</p>
        </div>
        <div className="stat-card">
          <h3>Messages</h3>
          <p>0</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="dashboard-main">
        <section className="profile-section">
          <h2 className="section-title">Vos informations</h2>
          <div className="profile-card">
            <div className="profile-info">
              <p><span>Nom d'utilisateur:</span> {currentUser.username}</p>
              <p><span>Email:</span> {currentUser.email}</p>
              <p><span>Rôle:</span> {currentUser.role}</p>
            </div>
          </div>
        </section>

        <section className="actions-section">
          <Link to="/client/do-booking" className="action-button primary-button">
            Réserver une voiture
          </Link>
          <Link to="/" className="action-button secondary-button">
            Retour à l'accueil
          </Link>
        </section>
      </main>
    </div>
  )
}
