import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NavClient } from './composants/NavClient'
import { apiURL } from '../../lib/apiURL';

export const DoBookingClient = () => {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [selectedCarId, setSelectedCarId] = useState('');
    const [DateBooking, setDateBooking] = useState('');

    useEffect(() => {
        const fetchCars = async () => {
            const response = await fetch(`${apiURL}/api/cars/all`);
            const data = await response.json();
            
            setCars(data.cars);
        };
        fetchCars();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedCarId || !DateBooking) {
            alert("Veuillez sélectionner une voiture et une date.");
            return;
        }

        const response = await fetch(`${apiURL}/api/booking/new/${selectedCarId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Auth token header si nécessaire
            },
            body: JSON.stringify({ DateBooking }),
        });

        const data = await response.json();

        if (data.success) {
            navigate('/client/my-bookings');
        } else {
            alert(data.message || "Erreur lors de la réservation");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <NavClient />
            
            <div className="container mx-auto px-4 py-8">
                {/* Section des voitures disponibles */}
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Voitures disponibles</h1>
                    <p className="text-gray-600 mb-8">Sélectionnez une voiture pour votre réservation</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cars.map((car) => (
                            <div 
                                key={car.id} 
                                className={`bg-white rounded-lg shadow-md border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
                                    selectedCarId === car.id 
                                        ? 'border-blue-500 ring-2 ring-blue-200' 
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                                onClick={() => setSelectedCarId(car.id)}
                            >
                                <div className="p-6">
                                    {/* Icône de voiture */}
                                    <img src={car.image} alt={car.name} className="w-full h-48 object-cover mb-4" />
                                    
                                    <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">{car.name}</h3>
                                    <p className="text-gray-600 text-center mb-4">Couleur: {car.color}</p>
                                    
                                    {/* Bouton de sélection */}
                                    <div className="flex justify-center">
                                        <button 
                                            type="button"
                                            className={`px-4 py-2 rounded-md font-medium transition-colors ${
                                                selectedCarId === car.id 
                                                    ? 'bg-blue-600 text-white' 
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        >
                                            {selectedCarId === car.id ? 'Sélectionnée' : 'Sélectionner'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section de réservation */}
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Réserver une voiture</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="DateBooking" className="block text-sm font-medium text-gray-700 mb-2">
                                Date de la réservation
                            </label>
                            <input
                                type="date"
                                name="DateBooking"
                                id="DateBooking"
                                onChange={(e) => setDateBooking(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
                        >
                            Réserver
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default DoBookingClient;