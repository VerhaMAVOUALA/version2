import React from 'react'
import { Link } from 'react-router-dom'

export const NavCars = () => {
  return (
    <div>
         <div className="flex gap-5 cursor-pointer hover:text-gray-300 mb-10">
            <Link to="/driver">Mon compte</Link>
            <Link to="/driver/new-cars">Ajouter une voiture</Link>
            <Link to="/driver/my-cars">Voir Ma voiture</Link>
        </div>
        <hr />
    </div>
  )
}
