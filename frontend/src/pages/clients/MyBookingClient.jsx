import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavClient } from './composants/NavClient'
import { apiURL } from '../../lib/apiURL'
import { toast, Toaster } from 'sonner'
import { motion } from 'framer-motion'

export const MyBookingClient = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState(null)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${apiURL}/api/bookings/my-bookings/client`, {
          credentials: "include",
          method: "GET",
        })
        const data = await response.json()
        console.log(data);
        setBookings(data.bookings)
      } catch (error) {
        console.error('Error fetching bookings:', error)
        toast.error('Erreur lors du chargement des réservations')
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  
  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    }
    return new Date(dateString).toLocaleDateString('fr-FR', options)
  }

  const formatBookingId = (id) => {
    try {
      if (typeof id === 'string') {
        return `#${id.slice(0, 8)}`
      }
      if (typeof id === 'number') {
        return `#${id.toString().slice(0, 8)}`
      }
      return '#N/A'
    } catch (e) {
      return '#ID'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Toaster position="top-right" richColors expand={true} />
      <NavClient />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Mes Réservations
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600">
            Consultez et gérez l'ensemble de vos réservations en cours
          </p>
        </motion.div>

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : bookings.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {bookings.map((booking) => (
              <motion.div
                key={booking.bookingId}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-2xl"
              >
                {/* Status Ribbon */}
                <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-lg text-sm font-semibold ${booking.action === 0 ? 'bg-amber-500 text-white' : booking.action === 1 ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
                  {booking.action === 0 ? 'En attente' : booking.action === 1 ? 'Confirmée' : 'Réfusée'}
                </div>

                <div className="p-6">
                  {/* Info de la réservation */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900">
                      Réservation {formatBookingId(booking.bookingId)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(booking.DateBooking)}
                    </p>
                  </div>

                  {/* Trajet */}
                  <div className="mb-6 space-y-2">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">De: {booking.startPlace}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">À: {booking.endPlace}</span>
                    </div>
                  </div>

                  {/* Informations du chauffeur */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Chauffeur</h4>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {booking.driverName?.charAt(0)?.toUpperCase() || 'C'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{booking.driverName || 'Nom non disponible'}</p>
                        <p className="text-xs text-gray-500">ID: {booking.driverId}</p>
                      </div>
                    </div>
                  </div>

                  {/* Informations de la voiture */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">Véhicule</h4>
                    <div className="flex items-start space-x-3">
                      {booking.carImage && (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={booking.carImage} 
                            alt={booking.carName} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{booking.carName || 'Véhicule non spécifié'}</p>
                        <p className="text-xs text-gray-600">Couleur: {booking.carColor || 'N/A'}</p>
                        <p className="text-xs text-gray-600">Plaque: {booking.carRegistration || 'N/A'}</p>
                        <div className="mt-1">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            booking.carAvailable === 1 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {booking.carAvailable === 1 ? 'Accepté' : 'Disponible'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Boutons d'action */}
                  <div className="flex justify-end space-x-3">
                    
                    <button
                      className="px-4 py-2 bg-red-600 rounded-lg text-sm font-medium text-white hover:bg-red-700 transition-colors duration-200 flex items-center"
                    >
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Supprimer
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-200"
          >
            <svg className="mx-auto h-20 w-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-4 text-2xl font-medium text-gray-900">Aucune réservation trouvée</h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              Vous n'avez pas encore effectué de réservation. Commencez par rechercher un trajet disponible.
            </p>
            <div className="mt-8">
              <Link
                to="/client"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                <svg className="-ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Rechercher un trajet
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {/* Booking Details Modal - Mis à jour */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-900">Détails de la réservation</h3>
                <button 
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {/* Infos de base */}
                <div>
                  <p className="text-sm font-medium text-gray-500">Référence</p>
                  <p className="mt-1 text-sm text-gray-900">{formatBookingId(selectedBooking.bookingId)}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Date et heure</p>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(selectedBooking.DateBooking)}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Point de départ</p>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.startPlace}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Destination</p>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.endPlace}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Statut</p>
                  <p className={`mt-1 text-sm font-medium ${selectedBooking.action === 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {selectedBooking.action === 0 ? 'En attente de confirmation' : 'Réservation confirmée'}
                  </p>
                </div>

                {/* Infos chauffeur */}
                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-500 mb-2">Chauffeur</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {selectedBooking.driverName?.charAt(0)?.toUpperCase() || 'C'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{selectedBooking.driverName}</p>
                      <p className="text-xs text-gray-500">ID: {selectedBooking.driverId}</p>
                    </div>
                  </div>
                </div>

                {/* Infos voiture */}
                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-500 mb-2">Véhicule</p>
                  {selectedBooking.carImage && (
                    <div className="mb-3">
                      <img 
                        src={selectedBooking.carImage} 
                        alt={selectedBooking.carName} 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="space-y-1">
                    <p className="text-sm text-gray-900"><span className="font-medium">Modèle:</span> {selectedBooking.carName}</p>
                    <p className="text-sm text-gray-900"><span className="font-medium">Couleur:</span> {selectedBooking.carColor}</p>
                    <p className="text-sm text-gray-900"><span className="font-medium">Plaque:</span> {selectedBooking.carRegistration}</p>
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">Statut:</span> 
                      <span className={selectedBooking.carAvailable === 1 ? 'text-green-600 ml-1' : 'text-red-600 ml-1'}>
                        {selectedBooking.carAvailable === 1 ? 'Disponible' : 'Indisponible'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Fermer
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default MyBookingClient