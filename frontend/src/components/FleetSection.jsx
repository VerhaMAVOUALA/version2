import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { CheckCircle, User, Car, Palette, Hash, UserCheck } from 'lucide-react';
import { apiURL } from '../lib/apiURL';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export const FleetSection = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    
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
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // Fonction pour déterminer les caractéristiques basées sur la marque
  const getVehicleFeatures = (name) => {
    const brand = name.toLowerCase();
    if (brand.includes('mercedes')) {
      return ["Climatisation premium", "Wi-Fi gratuit", "Sièges cuir", "Système audio Bang & Olufsen"];
    } else if (brand.includes('bmw')) {
      return ["Conduite sportive", "Technologie iDrive", "Éclairage LED", "Sièges chauffants"];
    } else if (brand.includes('toyota')) {
      return ["Économique", "Fiabilité garantie", "Conduite confortable", "Système hybride"];
    } else if (brand.includes('alfa')) {
      return ["Design italien", "Performance sportive", "Conduite dynamique", "Finitions premium"];
    } else {
      return ["Confort optimal", "Sécurité renforcée", "Équipements modernes", "Service premium"];
    }
  };

  // Fonction pour déterminer la capacité basée sur la marque
  const getVehicleCapacity = (name) => {
    const brand = name.toLowerCase();
    if (brand.includes('mercedes') || brand.includes('bmw')) {
      return "1-4 passagers";
    } else if (brand.includes('toyota')) {
      return "1-5 passagers";
    } else if (brand.includes('alfa')) {
      return "1-4 passagers";
    } else {
      return "1-4 passagers";
    }
  };


  if (loading) {
    return (
      <section id="flotte" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement de la flotte...</p>
          </div>
        </div>
      </section>
    );
  }

  if (cars.length === 0) {
    return (
      <section id="flotte" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Aucune voiture disponible pour le moment.</p>
          </div>
        </div>
      </section>
    );
  }
    
  return (
     <section id="flotte" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-gray-800 mb-4"
              >
                Notre Flotte Exclusive
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                Des véhicules haut de gamme entretenus avec soin pour votre confort et sécurité
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-sm text-gray-500 mt-2"
              >
                {cars.length} véhicule{cars.length > 1 ? 's' : ''} disponible{cars.length > 1 ? 's' : ''}
              </motion.p>
            </div>
    
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {cars.map((car, index) => (
                <motion.div 
                  key={car.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Image+Non+Disponible';
                      }}
                    />
                   
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{car.name}</h3>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 flex items-center mb-2">
                        <User className="h-4 w-4 mr-2" />
                        {getVehicleCapacity(car.name)}
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-700 mb-3 text-sm">Informations véhicule :</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-xs text-gray-500 flex items-center">
                            <Palette className="h-3 w-3 mr-1" />
                            Couleur
                          </span>
                          <span className="text-sm font-medium">{car.color}</span>
                        </div>
                        <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-xs text-gray-500 flex items-center">
                            <Hash className="h-3 w-3 mr-1" />
                            Immatriculation
                          </span>
                          <span className="text-sm font-medium">{car.registration}</span>
                        </div>
                        <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-xs text-gray-500 flex items-center">
                            <UserCheck className="h-3 w-3 mr-1" />
                            Propriétaire
                          </span>
                          <span className="text-sm font-medium">{car.username}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-700 mb-2 text-sm">Équipements :</h4>
                      <ul className="space-y-1">
                        {getVehicleFeatures(car.name).map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                            <span className="text-xs text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <motion.button 
                      className={`w-full py-2 rounded-lg font-semibold text-sm transition-all duration-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800`}
                    >
                     <Link to={`/client/do-booking`}>Réserver ce véhicule</Link>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
  )
}