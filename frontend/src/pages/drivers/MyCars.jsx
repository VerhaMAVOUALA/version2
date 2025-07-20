import React, { useEffect, useState } from 'react'
import { NavCars } from './composants/NavCars'
import { useSelector } from 'react-redux'
import { Toaster, toast } from 'sonner'
import { apiURL } from '../../lib/apiURL'

export const MyCars = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [cars, setCars] = useState([])

    useEffect(() => {
        const fetchMyCars = async () => {
            try {
                const response = await fetch(`${apiURL}/api/cars/my-cars`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setCars(data.cars)
                    console.log(data);
                } else {
                    console.log('Erreur lors de la récupération de vos voitures');
                    toast.error("Une erreur est survenue: " + error.message);
                }
            } catch (error) {
                console.log('Erreur lors de la récupération de vos voitures :', error);
                toast.error("Une erreur est survenue: " + error.message);
            }
        };
        fetchMyCars();
    }, [])

  return (
    <div>
        <Toaster />
        <NavCars />
        <h1>Page de ma voiture</h1>
        <p>Vous etes connecté en tant que chauffeur</p>
        <hr />
        <div>
            <p>Vos informations de la voiture</p>
            {cars.map((car) => (
                <div key={car.id}>
                    <p>Ma voiture: {car.name}</p>
                    <p>Couleur: {car.color}</p>
                    <p>Immatriculation: {car.registration}</p>
                    <img src={car.image} alt="" />
                </div>
            ))}
            
        </div>
        <hr />
    </div>
  )
}
