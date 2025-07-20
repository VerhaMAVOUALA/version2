import React from 'react'
import { Link } from 'react-router-dom'
import { NavClient } from './composants/NavClient'

export const MyBookingClient = () => {
  return (
    <div>
        <NavClient />
        <hr />
        <h1>Mes réservations</h1>
        <p>Vous n'avez pas de réservations</p>
        <hr />
        <Link to="/client" className="hover:text-gray-300 cursor-pointer">Retour à l'accueil</Link>
    </div>
  )
}
export default MyBookingClient
