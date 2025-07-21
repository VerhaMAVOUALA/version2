import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NavClient } from './composants/NavClient'
import { apiURL } from '../../lib/apiURL';
import { toast, Toaster } from 'sonner';

export const MyBookingClient = () => {
  const [bookings, setBookings] = React.useState([]);


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${apiURL}/api/bookings/my-bookings`, {
          credentials: "include",
          method: "GET",
        });
        const data = await response.json();
        setBookings(data.bookings);
        console.log(data.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
    
  }, []);


  // Fonction pour supprimer une réservation
  const deleteBooking = async (bookingId) => {
    try {
      const response = await fetch(`${apiURL}/api/bookings/delete/${bookingId}`, {
        credentials: "include",
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Réservation supprimée avec succès");
        const updatedBookings = bookings.filter((booking) => booking.id !== bookingId);
        setBookings(updatedBookings);
      } else {
        toast.error(data.message || "Erreur lors de la suppression de la réservation");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Erreur de connexion lors de la suppression de la réservation");
    }
  };

  return (
    <div>
        <Toaster />
        <NavClient />
        <hr />
        <h1>Mes réservations</h1>
        {bookings.length > 0 ? (
          <ul className=''>
            {bookings.map((booking) => (
              <li key={booking.id} className='border rounded-2xl p-4 mb-2'>
                <p>{booking.DateBooking}</p>
                <p>{booking.startPlace}</p>
                <p>{booking.endPlace}</p>
                <p>
                  {booking.action === 0 ? <p className='text-yellow-500'>En attente</p> : <p className='text-green-500'>Acceptée</p>}
                </p>
                <button onClick={() => deleteBooking(booking.id)} className='bg-red-500 cursor-pointer text-white px-4 py-2 rounded'>Supprimer</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Vous n'avez pas de réservations</p>
        )}
        <hr />
        <Link to="/client" className="hover:text-gray-300 cursor-pointer">Retour à l'accueil</Link>
    </div>
  )
}
export default MyBookingClient
