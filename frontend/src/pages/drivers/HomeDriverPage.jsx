import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { NavCars } from './composants/NavCars'

export const HomeDriverPage = () => {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <div>
        <h1>Page d'accueil chauffeur</h1>
        <p>Vous etes connecté en tant que chauffeur</p>
        <hr />
        <NavCars /> 
        <div>
        <p>Vos informations</p>
        <p>{currentUser.username}</p>
        <p>{currentUser.email}</p>
        <p>{currentUser.role}</p>
        <br /> <br />
        </div>
        <hr />
      
    </div>
  )
}
