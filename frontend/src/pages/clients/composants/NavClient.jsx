import React from 'react'
import { Link } from 'react-router-dom'
import './NavClient.css'

export const NavClient = () => {
  return (
    <nav className="dashboard-nav">
      <ul>
        <li>
          <Link to="/client" className="nav-link active">Mon compte</Link>
        </li>
        <li>
          <Link to="/client/my-bookings" className="nav-link">Mes Réservations</Link>
        </li>
      </ul>
    </nav>
  )
}

