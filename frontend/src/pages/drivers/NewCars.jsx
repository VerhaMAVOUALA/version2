import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../lib/apiURL';
import { Toaster, toast } from 'sonner';
import { NavCars } from './composants/NavCars';

export const NewCars = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        color: '',
        registration: '',
        image: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const response = await fetch(`${apiURL}/api/cars/new`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const data = await response.json();
                toast.success('Voiture ajoutée avec succès !');
                setTimeout(() => {
                    navigate('/driver');
                }, 2000);
            } else {
                const errorData = await response.json();
                toast.error(errorData.message);
                setError(errorData.message);
            }
            setLoading(false)
            
        } catch (error) {
            setLoading(false)
            toast.error("Une erreur est survenue: " + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster position="top-right" richColors />
            <NavCars />
            
            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-800">Ajouter une nouvelle voiture</h1>
                        <p className="mt-1 text-sm text-gray-600">Remplissez les détails de votre véhicule</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="px-6 py-4">
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Nom de la voiture
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Ex: Mercedes Classe A"
                            />
                        </div>
                        
                        <div className="mb-6">
                            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                                Couleur de la voiture
                            </label>
                            <input
                                type="text"
                                name="color"
                                id="color"
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Ex: Noir"
                            />
                        </div>
                        
                        <div className="mb-6">
                            <label htmlFor="registration" className="block text-sm font-medium text-gray-700 mb-1">
                                Immatriculation de la voiture
                            </label>
                            <input
                                type="text"
                                name="registration"
                                id="registration"
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Ex: AB-123-CD"
                            />
                        </div>
                        
                        <div className="mb-8">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                                URL de l'image de la voiture
                            </label>
                            <input
                                type="text"
                                name="image"
                                id="image"
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                        
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        En cours...
                                    </span>
                                ) : 'Ajouter la voiture'}
                            </button>
                        </div>
                        
                        {error && (
                            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                                {error}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}