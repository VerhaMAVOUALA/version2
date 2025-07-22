import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, Mail, Star, Users, Shield, Car, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Images pour la flotte (liens externes - à remplacer par vos propres images)
const BerlineImage = "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
const SuvImage = "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
const VanImage = "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
const HeroCarImage = "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80";
const ContactBgImage = "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2128&q=80";

// Images pour les témoignages (liens externes - à remplacer par vos propres avatars)
const Avatar1 = "https://randomuser.me/api/portraits/women/44.jpg";
const Avatar2 = "https://randomuser.me/api/portraits/men/32.jpg";
const Avatar3 = "https://randomuser.me/api/portraits/women/65.jpg";

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
    <section className="relative overflow-hidden text-white py-20 h-screen flex items-center">
      {/* Image de fond avec overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={HeroCarImage} 
          alt="Voiture de luxe" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/90 to-blue-900/90"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Votre <span className="text-blue-300">Chauffeur Privé</span> de Confiance
            </motion.h1>
            
            <motion.p 
              className="text-xl text-blue-100 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Découvrez un service de transport premium avec des chauffeurs professionnels, 
              des véhicules haut de gamme et une ponctualité irréprochable.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
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
            </motion.div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-2xl shadow-2xl p-8 text-gray-800"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
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

              <motion.button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Réserver Maintenant</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Composant Services amélioré
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
    <section id="services" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Animation de fond */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/30 to-gray-100/30"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-dots-pattern opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Nos Services
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Des solutions de transport adaptées à tous vos besoins professionnels et personnels
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              {/* Effet de fond animé */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              
              <motion.div 
                className="flex justify-center mb-6"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {service.icon}
              </motion.div>
              
              <motion.h3 
                className="text-xl font-semibold text-gray-800 mb-4"
                whileHover={{ color: "#2563eb" }}
                transition={{ duration: 0.3 }}
              >
                {service.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-600 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {service.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Composant Flotte amélioré
const FleetSection = () => {
  const vehicles = [
    {
      name: "Berline Executive",
      image: BerlineImage,
      capacity: "1-3 passagers",
      features: ["Climatisation", "Wi-Fi", "Eau gratuite", "Sièges massants"],
      price: "À partir de 45€/h",
      specs: [
        { label: "Marque", value: "Mercedes" },
        { label: "Modèle", value: "Classe S" },
        { label: "Année", value: "2024" }
      ]
    },
    {
      name: "SUV Premium",
      image: SuvImage,
      capacity: "1-6 passagers",
      features: ["Espace bagages", "Sièges cuir", "Système audio", "Toit panoramique"],
      price: "À partir de 65€/h",
      specs: [
        { label: "Marque", value: "Range Rover" },
        { label: "Modèle", value: "Autobiography" },
        { label: "Année", value: "2023" }
      ]
    },
    {
      name: "Van Luxe",
      image: VanImage,
      capacity: "1-8 passagers",
      features: ["Espace groupe", "Confort max", "Éclairage LED", "Mini-bar"],
      price: "À partir de 85€/h",
      specs: [
        { label: "Marque", value: "Mercedes" },
        { label: "Modèle", value: "V-Class" },
        { label: "Année", value: "2024" }
      ]
    }
  ];

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
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">{vehicle.name}</h3>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {vehicle.price}
                  </span>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-2">Caractéristiques techniques :</h4>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {vehicle.specs.map((spec, i) => (
                      <div key={i} className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500">{spec.label}</p>
                        <p className="font-medium">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-2">Équipements :</h4>
                  <ul className="space-y-2">
                    {vehicle.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <motion.button 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Réserver ce véhicule
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Composant Témoignages amélioré
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Directrice Marketing",
      text: "Service impeccable ! Le chauffeur était ponctuel et très professionnel. Le véhicule était luxueux et propre. Je recommande vivement ce service pour tous les déplacements d'affaires.",
      rating: 5,
      avatar: Avatar1
    },
    {
      name: "Pierre Martin",
      role: "Entrepreneur",
      text: "Excellent service pour mes déplacements d'affaires. Véhicules confortables et chauffeurs courtois. La ponctualité est toujours au rendez-vous, ce qui est crucial pour mes réunions.",
      rating: 5,
      avatar: Avatar2
    },
    {
      name: "Sophie Bernard",
      role: "Particulier",
      text: "Parfait pour notre mariage ! Le service était exceptionnel et a contribué à rendre notre jour spécial. Les véhicules étaient magnifiques et le chauffeur très attentionné.",
      rating: 5,
      avatar: Avatar3
    },
    {
      name: "Thomas Lefèvre",
      role: "Directeur Commercial",
      text: "J'utilise régulièrement ce service pour mes clients internationaux. Toujours une excellente impression, ce qui renforce notre image professionnelle. Un service premium digne de ce nom.",
      rating: 5,
      avatar: Avatar1
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            Témoignages Clients
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Découvrez ce que nos clients disent de leur expérience
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30
              }
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="h-full"
                >
                  <div className="bg-white rounded-xl shadow-lg p-8 h-full flex flex-col">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic flex-grow">"{testimonial.text}"</p>
                    <div className="flex items-center space-x-4 mt-auto">
                      <div className="flex-shrink-0">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="h-12 w-12 rounded-full object-cover border-2 border-blue-200"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl">
            Lire tous les témoignages
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// Composant Contact amélioré
const ContactSection = () => {
  return (
    <section id="contact" className="py-20 text-white relative overflow-hidden">
      {/* Image de fond floutée */}
      <div className="absolute inset-0 z-0">
        <img 
          src={ContactBgImage} 
          alt="Contact background" 
          className="w-full h-full object-cover filter blur-sm"
        />
        <div className="absolute inset-0 bg-blue-900/90"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Contactez-nous
          </motion.h2>
          <motion.p
            className="text-xl text-blue-100 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Notre équipe est à votre disposition pour tous vos besoins de transport
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="bg-blue-800 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Phone className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Téléphone</h3>
            <p className="text-blue-100">+33 1 23 45 67 89</p>
            <p className="text-blue-100">Disponible 24h/24</p>
          </motion.div>

          <motion.div 
            className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="bg-blue-800 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-blue-100">contact@elitedriver.fr</p>
            <p className="text-blue-100">Réponse sous 2h</p>
          </motion.div>

          <motion.div 
            className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="bg-blue-800 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Adresse</h3>
            <p className="text-blue-100">123 Avenue des Champs</p>
            <p className="text-blue-100">75008 Paris, France</p>
          </motion.div>
        </div>

        {/* Formulaire de contact */}
        <motion.div
          className="mt-16 bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Envoyez-nous un message</h3>
          <form className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-blue-100 mb-2">Nom complet</label>
              <input 
                type="text" 
                id="name" 
                className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-blue-100 mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Votre email"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="subject" className="block text-blue-100 mb-2">Sujet</label>
              <input 
                type="text" 
                id="subject" 
                className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Objet de votre message"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-blue-100 mb-2">Message</label>
              <textarea 
                id="message" 
                rows="4"
                className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Votre message..."
              ></textarea>
            </div>
            <div className="md:col-span-2 text-center">
              <motion.button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Envoyer le message
              </motion.button>
            </div>
          </form>
        </motion.div>
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