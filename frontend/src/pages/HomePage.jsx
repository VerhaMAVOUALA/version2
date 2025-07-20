import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, Mail, Star, Users, Shield, Car, CheckCircle, ArrowRight, Menu, X } from 'lucide-react';

// Composant Hero avec formulaire de réservation
const HeroSection = () => {
  const [formData, setFormData] = useState({
    depart: '',
    destination: '',
    date: '',
    heure: '',
    passengers: '1'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    alert('Votre réservation a été envoyée avec succès ! Nous vous contacterons sous peu.');
  };

  return (
    <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Texte principal */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Votre <span className="text-blue-300">Chauffeur Privé</span> de Confiance
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Découvrez un service de transport premium avec des chauffeurs professionnels, 
              des véhicules haut de gamme et une ponctualité irréprochable.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Disponible 24h/24</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Chauffeurs expérimentés</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Véhicules premium</span>
              </div>
            </div>
          </div>

          {/* Formulaire de réservation */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-gray-800">
            <h3 className="text-2xl font-bold mb-6 text-center">Réservation Rapide</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="depart"
                    placeholder="Lieu de départ"
                    value={formData.depart}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="destination"
                    placeholder="Destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="time"
                    name="heure"
                    value={formData.heure}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="relative">
                <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="1">1 passager</option>
                  <option value="2">2 passagers</option>
                  <option value="3">3 passagers</option>
                  <option value="4">4 passagers</option>
                  <option value="5+">5+ passagers</option>
                </select>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Réserver Maintenant</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Composant Services
const ServicesSection = () => {
  const services = [
    {
      icon: <Car className="h-12 w-12 text-blue-600" />,
      title: "Transport Aéroport",
      description: "Service de navette premium vers tous les aéroports avec suivi de vol en temps réel."
    },
    {
      icon: <Users className="h-12 w-12 text-blue-600" />,
      title: "Événements & Mariages",
      description: "Transport élégant pour vos événements spéciaux avec service personnalisé."
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Transport Sécurisé",
      description: "Chauffeurs formés et véhicules équipés pour un transport en toute sécurité."
    },
    {
      icon: <Clock className="h-12 w-12 text-blue-600" />,
      title: "Service 24h/24",
      description: "Disponible à toute heure pour tous vos besoins de transport."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Nos Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des solutions de transport adaptées à tous vos besoins professionnels et personnels
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Composant Flotte
const FleetSection = () => {
  const vehicles = [
    {
      name: "Berline Executive",
      capacity: "1-3 passagers",
      features: ["Climatisation", "Wi-Fi", "Eau gratuite"],
      price: "À partir de 45€/h"
    },
    {
      name: "SUV Premium",
      capacity: "1-6 passagers",
      features: ["Espace bagages", "Sièges cuir", "Système audio"],
      price: "À partir de 65€/h"
    },
    {
      name: "Van Luxe",
      capacity: "1-8 passagers",
      features: ["Espace groupe", "Confort max", "Éclairage LED"],
      price: "À partir de 85€/h"
    }
  ];

  return (
    <section id="flotte" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Notre Flotte</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Véhicules haut de gamme entretenus régulièrement pour votre confort et sécurité
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Car className="h-24 w-24 text-white" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{vehicle.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{vehicle.capacity}</p>
                <ul className="space-y-2 mb-6">
                  {vehicle.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-xl font-bold text-gray-800">{vehicle.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Composant Témoignages
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Directrice Marketing",
      text: "Service impeccable ! Le chauffeur était ponctuel et très professionnel. Je recommande vivement.",
      rating: 5
    },
    {
      name: "Pierre Martin",
      role: "Entrepreneur",
      text: "Excellent service pour mes déplacements d'affaires. Véhicules confortables et chauffeurs courtois.",
      rating: 5
    },
    {
      name: "Sophie Bernard",
      role: "Particulier",
      text: "Parfait pour notre mariage ! Le service était exceptionnel et a contribué à rendre notre jour spécial.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Ce que disent nos clients</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            La satisfaction de nos clients est notre priorité absolue
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Composant Contact
const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Contactez-nous</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour tous vos besoins de transport
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-800 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Phone className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Téléphone</h3>
            <p className="text-blue-100">+33 1 23 45 67 89</p>
            <p className="text-blue-100">Disponible 24h/24</p>
          </div>

          <div className="text-center">
            <div className="bg-blue-800 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-blue-100">contact@elitedriver.fr</p>
            <p className="text-blue-100">Réponse sous 2h</p>
          </div>

          <div className="text-center">
            <div className="bg-blue-800 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Adresse</h3>
            <p className="text-blue-100">123 Avenue des Champs</p>
            <p className="text-blue-100">75008 Paris, France</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Composant Footer
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Car className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">EliteDriver</span>
            </div>
            <p className="text-gray-400">
              Votre service de transport premium avec chauffeur privé.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Transport Aéroport</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Événements</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Transport Sécurisé</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Service 24h/24</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Notre équipe</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Carrières</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partenaires</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
              <li><a href="#" className="hover:text-white transition-colors">RGPD</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 EliteDriver. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

// Composant principal HomePage
export const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <FleetSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};