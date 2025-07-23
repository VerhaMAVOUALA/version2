import React, { useEffect, useState } from 'react';
import { NavCars } from './composants/NavCars';
import { Toaster, toast } from 'sonner';
import { apiURL } from '../../lib/apiURL';

const MyBookingDriverPage = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${apiURL}/api/bookings/my-bookings/driver`, {
          credentials: 'include',
          method: 'GET',
        });
        const data = await response.json();

        console.log("bookingData:", data.bookings)

        if (data.success) {
          // Filtrer les réservations refusées (action !== 2)
          const filteredBookings = (data.bookings || []).filter(b => b.action !== 2);
          setBookings(filteredBookings);
        } else {
          setBookings([]);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast.error('Erreur lors du chargement des réservations');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  //  Gestion de l'action sur une réservation
  const handleManage = async (bookingId, actionType) => {
    try {
      const response = await fetch(`${apiURL}/api/bookings/manage/${bookingId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: actionType }),
      });

      const result = await response.json();
      //console.log(bookingId);

      if (result.success) {
        toast.success(result.message);
        // Supprimer la réservation refusée ou mettre à jour son statut
        setBookings(prev =>
          actionType === 'refuse'
            ? prev.filter(b => b.id !== bookingId) // retirer si refusée
            : prev.map(b => b.id === bookingId ? { ...b, action: 1 } : b) // mise à jour si acceptée
        );
      } else {
        toast.error(result.message || 'Action impossible');
      }
    } catch (error) {
      console.error('Erreur lors de la gestion de la réservation :', error);
      toast.error("Une erreur s'est produite");
    }
  };

  if (isLoading) {
    return (
      <div>
        <NavCars />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center">Chargement...</p>
        </div>
        <Toaster />
      </div>
    );
  }

  return (
    <div>
      <NavCars />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Mes Réservations ({bookings.length})</h1>

        {bookings.length === 0 ? (
          <div className="text-center py-8 bg-gray-100 rounded-lg">
            <p className="text-gray-600 text-lg">Pas de réservation disponible</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <div key={booking.id || index} className="bg-white p-6 rounded-lg shadow border">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Réservation #{booking.id}</h3>
                    <p><strong>Date:</strong> {formatDate(booking.DateBooking)}</p>
                    <p><strong>Départ:</strong> {booking.startPlace}</p>
                    <p><strong>Destination:</strong> {booking.endPlace}</p>
                    <p><strong>ID Réservation:</strong> {booking.id}</p>
                    <p><strong>Statut:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded text-sm ${
                        booking.action === 1 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.action === 1 ? 'Confirmée' : 'En attente'}
                      </span>
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Véhicule</h4>
                    <div className="flex items-center mb-2">
                      <img 
                        src={booking.car.image} 
                        alt={booking.car.name}
                        className="w-16 h-12 object-cover rounded mr-3"
                      />
                      <div>
                        <p><strong>{booking.car.name}</strong></p>
                        <p className="text-sm text-gray-600">{booking.car.color}</p>
                        <p className="text-sm text-gray-600">{booking.car.registration}</p>
                      </div>
                    </div>
                  </div>

                  {booking.action !== 1 && (
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleManage(booking.id, 'accept')}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                      >
                        Accepter
                      </button>
                      <button
                        onClick={() => handleManage(booking.id, 'refuse')}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                      >
                        Refuser
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default MyBookingDriverPage;
