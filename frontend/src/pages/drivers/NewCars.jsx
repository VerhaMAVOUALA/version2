import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../lib/apiURL';
import { Toaster, toast } from 'sonner';
import { NavCars } from './composants/NavCars';

export const NewCars = () => {
    const navigate = useNavigate();
    const [loading, setLoading] =  useState(false)
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
    <div>
        <Toaster /> 
        <NavCars />
        <h1>Page de nouvelle voiture</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nom de la voiture</label>
            <input type="text" className="p-2 border border-gray-300" name="name" id="name" onChange={handleChange} /> <br /> <br />
            <label htmlFor="color">Couleur de la voiture</label>
            <input type="text" className="p-2 border border-gray-300" name="color" id="color" onChange={handleChange} /> <br /> <br />
            <label htmlFor="registration">Immatriculation de la voiture</label>
            <input type="text" className="p-2 border border-gray-300" name="registration" id="registration" onChange={handleChange} /> <br /> <br />
            <label htmlFor="image">Image de la voiture</label>
            <input type="text" className="p-2 border border-gray-300" name="image" id="image" onChange={handleChange} /> <br /> <br />
            <button type="submit" className="p-2 bg-gray-800 cursor-pointer text-white">{loading ? 'En cours...' : 'Ajouter la voiture'}</button>
        </form>
    </div>
  )
}
