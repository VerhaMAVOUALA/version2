import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavClient } from "./composants/NavClient";
import { apiURL } from "../../lib/apiURL";
import {toast, Toaster} from "sonner"

export const DoBookingClient = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState("");
  const [DateBooking, setDateBooking] = useState("");
  const [startPlace, setStartPlace] = useState("");
  const [endPlace, setEndPlace] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${apiURL}/api/cars/all`, {
          credentials: "include",
        });
        const data = await response.json();
        console.log(data);

        if (data.success) {
          setCars(data.cars);
        } else {
          toast.error("Erreur lors du chargement des voitures");
        }
      } catch (error) {
        console.error("Erreur:", error);
        toast.error("Erreur de connexion");
      }
    };
    fetchCars();
  }, []);

  // Fonction onChange centralisée (déplacée hors de handleSubmit)
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "DateBooking") {
      setDateBooking(value);
    } else if (name === "startPlace") {
      setStartPlace(value);
    } else if (name === "endPlace") {
      setEndPlace(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCarId) {
      toast.error("Veuillez sélectionner une voiture.");
      return;
    }

    if (!DateBooking || !startPlace || !endPlace) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch(`${apiURL}/api/bookings/new/${selectedCarId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ DateBooking, startPlace, endPlace }),
      });
      
      const data = await response.json();

      if (data.success) {
        toast.success("Réservation effectuée avec succès !");
        // Réduction du délai de redirection à 2 secondes
        setTimeout(() => {
          navigate("/client/my-bookings");
        }, 2000);
      } else {
        toast.error(data.message || "Erreur lors de la réservation");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur de connexion lors de la réservation");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <NavClient />

      <div className="container mx-auto px-4 py-8">
        {/* Section des voitures disponibles */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Voitures disponibles
          </h1>
          <p className="text-gray-600 mb-8">
            Sélectionnez une voiture pour votre réservation
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div
                key={car.id}
                className={`bg-white rounded-lg shadow-md border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
                  selectedCarId === car.id
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedCarId(car.id)}
              >
                <div className="p-6">
                  {/* Image de voiture */}
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {car.name}
                      </h3>
                      <p className="text-gray-600 mb-1">
                        Couleur: {car.color}
                      </p>
                      <p className="text-sm text-gray-500">
                        Immat: {car.registration}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Chauffeur:</p>
                      <p className="font-medium">{car.username}</p>
                    </div>
                  </div>

                  {/* Bouton de sélection */}
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-md font-medium transition-colors ${
                        selectedCarId === car.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {selectedCarId === car.id
                        ? "Sélectionnée"
                        : "Sélectionner"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section de réservation */}
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Réserver une voiture
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="startPlace"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Lieu de départ
              </label>
              <input
                type="text"
                onChange={onChange}
                name="startPlace"
                value={startPlace}
                placeholder="Lieu de départ"
                id="startPlace"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label
                htmlFor="endPlace"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Lieu d'arrivée
              </label>
              <input
                type="text"
                name="endPlace"
                onChange={onChange}
                value={endPlace}
                placeholder="Lieu d'arrivée"
                id="endPlace"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label
                htmlFor="DateBooking"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Date de la réservation
              </label>
              <input
                type="date"
                name="DateBooking"
                id="DateBooking"
                onChange={onChange}
                value={DateBooking}
                min={new Date().toISOString().split('T')[0]} // Date minimum = aujourd'hui
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
          
          {selectedCarId && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-700">
                Voiture sélectionnée: {cars.find(car => car.id === selectedCarId)?.name}
                voiture id: {selectedCarId}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoBookingClient;