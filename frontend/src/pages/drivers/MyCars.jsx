import React, { useEffect, useState } from 'react'
import { NavCars } from './composants/NavCars'
import { useSelector } from 'react-redux'
import { Toaster, toast } from 'sonner'
import { apiURL } from '../../lib/apiURL'

export const MyCars = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)

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
                } else {
                    toast.error("Erreur lors de la récupération des données du véhicule");
                }
            } catch (error) {
                toast.error("Erreur système: " + error.message);
            } finally {
                setLoading(false)
            }
        };
        fetchMyCars();
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Toaster position="top-right" richColors expand={true} />
            <NavCars />
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                        Gestion de Flotte
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                        Panel de gestion complet pour vos véhicules professionnels
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="px-6 py-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                                        <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-500 truncate">Véhicules enregistrés</p>
                                        <p className="text-2xl font-semibold text-gray-900">{cars.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="px-6 py-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-lg">
                                        <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-500 truncate">Statut</p>
                                        <p className="text-2xl font-semibold text-gray-900">Actif</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="px-6 py-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-amber-100 p-3 rounded-lg">
                                        <svg className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-500 truncate">Dernière mise à jour</p>
                                        <p className="text-2xl font-semibold text-gray-900">Aujourd'hui</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vehicle Cards */}
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                        </div>
                    ) : cars.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {cars.map((car) => (
                                <div key={car.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-2xl">
                                    <div className="relative h-48 bg-gray-100">
                                        {car.image ? (
                                            <img 
                                                src={car.image} 
                                                alt={`${car.name}`} 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-gray-200 to-gray-300">
                                                <svg className="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-sm">
                                            <span className="text-xs font-semibold text-blue-600">ACTIF</span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900">{car.name}</h3>
                                                <p className="mt-1 text-sm text-gray-500">{car.registration}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="inline-block h-6 w-6 rounded-full mr-2 border border-gray-200" style={{ backgroundColor: car.color }} />
                                                <span className="text-sm font-medium text-gray-700">{car.color}</span>
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-6 border-t border-gray-100">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-xs font-medium text-gray-500">Type</p>
                                                    <p className="mt-1 text-sm font-medium text-gray-900">Berline</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium text-gray-500">Kilométrage</p>
                                                    <p className="mt-1 text-sm font-medium text-gray-900">24,500 km</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium text-gray-500">Dernier contrôle</p>
                                                    <p className="mt-1 text-sm font-medium text-gray-900">15/06/2023</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium text-gray-500">Prochaine révision</p>
                                                    <p className="mt-1 text-sm font-medium text-gray-900">15/12/2023</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex space-x-3">
                                            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                                                Détails
                                            </button>
                                            <button className="flex-1 bg-white hover:bg-gray-50 text-gray-800 py-2 px-4 border border-gray-300 rounded-lg font-medium transition-colors duration-200">
                                                Modifier
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
                            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="mt-4 text-xl font-medium text-gray-900">Aucun véhicule enregistré</h3>
                            <p className="mt-2 text-gray-500 max-w-md mx-auto">
                                Vous n'avez actuellement aucun véhicule associé à votre compte. Ajoutez votre premier véhicule pour commencer.
                            </p>
                            <div className="mt-6">
                                <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    <svg className="-ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Ajouter un véhicule
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}