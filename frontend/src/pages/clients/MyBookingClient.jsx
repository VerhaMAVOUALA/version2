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
        const response = await fetch(`${apiURL}/api/bookings/my-bookings`, {
          credentials: "include",
          method: "GET",
        })
        const data = await response.json()
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

  const deleteBooking = async (bookingId) => {
    try {
      const response = await fetch(`${apiURL}/api/bookings/delete/${bookingId}`, {
        credentials: "include",
        method: "DELETE",
      })
      const data = await response.json()
      if (data.success) {
        toast.success("Réservation supprimée avec succès")
        setBookings(bookings.filter(booking => booking.id !== bookingId))
      } else {
        toast.error(data.message || "Erreur lors de la suppression")
      }
    } catch (error) {
      console.error("Error deleting booking:", error)
      toast.error("Erreur de connexion lors de la suppression")
    }
  }

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

  // Fonction pour formater l'ID de manière sécurisée
  const formatBookingId = (id) => {
    try {
      // Si l'ID est une chaîne, on prend les 8 premiers caractères
      if (typeof id === 'string') {
        return `#${id.slice(0, 8)}`
      }
      // Si c'est un nombre, on le convertit en chaîne
      if (typeof id === 'number') {
        return `#${id.toString().slice(0, 8)}`
      }
      // Sinon on retourne une valeur par défaut
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
                key={booking.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-2xl"
              >
                {/* Status Ribbon */}
                <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-lg text-sm font-semibold ${booking.action === 0 ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'}`}>
                  {booking.action === 0 ? 'En attente' : 'Confirmée'}
                </div>

                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    {booking.image && (
                      <div className="flex-shrink-0 h-24 w-24 rounded-lg overflow-hidden bg-gray-100 shadow-inner">
                        <img 
                          src={booking.image} 
                          alt="Réservation" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        Réservation {formatBookingId(booking.id)}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {formatDate(booking.DateBooking)}
                      </p>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center">
                          <svg className="flex-shrink-0 h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="ml-2 text-sm font-medium text-gray-700">{booking.startPlace}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <svg className="flex-shrink-0 h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="ml-2 text-sm font-medium text-gray-700">{booking.endPlace}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Détails
                    </button>
                    <button
                      onClick={() => deleteBooking(booking.id)}
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

      {/* Booking Details Modal */}
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
                <div>
                  <p className="text-sm font-medium text-gray-500">Référence</p>
                  <p className="mt-1 text-sm text-gray-900">{formatBookingId(selectedBooking.id)}</p>
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

                {selectedBooking.image && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-500">Photo associée</p>
                    <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                      <img 
                        src={selectedBooking.image} 
                        alt="Réservation" 
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                )}
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