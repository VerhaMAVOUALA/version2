import React from 'react'
import { Link } from 'react-router-dom'

export const NavCars = () => {
  return (
    <div>
         <div className="flex gap-5 cursor-pointer mb-10">
            <Link to="/driver" className='hover:text-blue-300 cursor-pointer'>Mon compte</Link>
            <Link to="/driver/new-cars" className='hover:text-blue-300 cursor-pointer'>Ajouter une voiture</Link>
            <Link to="/driver/my-cars" className='hover:text-blue-300 cursor-pointer'>Voir Ma voiture</Link>
            <Link to="/driver/my-bookings" className='hover:text-blue-300 cursor-pointer'>Voir mes réservations</Link>
        </div>
        <hr />
    </div>
  )
}
