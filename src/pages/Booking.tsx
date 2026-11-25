
import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Event } from '../types/Event'
import type { EventBooking } from '../types/Booking'
import { getEventById } from '../services/eventService'
import { AuthContext } from '../context/AuthContext'

function Booking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)

  const [event, setEvent] = useState<Event | null>(null)
  const [tickets, setTickets] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) {
        setLoading(false)
        return
      }

      try {
        const data = await getEventById(id)
        setEvent(data)
      } catch {
        setEvent(null)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [id])

  if (loading) {
    return <p className="text-center p-10">Loading event...</p>
  }

  if (!event) {
    return <p className="text-center p-10">Event not found.</p>
  }

  const totalPrice = event.price * tickets

  const handleBooking = () => {
    if (!currentUser) {
      navigate('/login')
      return
    }

    const newBooking: EventBooking = {
      id: Date.now(),
      userEmail: currentUser.email,
      eventId: event.id,
      eventTitle: event.title,
      date: event.date,
      location: event.location,
      tickets: tickets,
      totalPrice: totalPrice
    }

    navigate('/payment', {
      state: newBooking
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white p-8">

      <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6">
          Book Tickets
        </h1>

        <h2 className="text-xl font-bold">{event.title}</h2>

        <p className="mt-3 text-gray-500">
          Date: {event.date}
        </p>

        <p className="text-gray-500">
          Location: {event.location}
        </p>

        <p className="text-purple-600 font-bold mt-4">
          Ticket Price: ₹{event.price}
        </p>

        <div className="mt-6">
          <label className="block mb-2 font-semibold">
            Number of Tickets
          </label>

          <input
            type="number"
            min="1"
            max="10"
            value={tickets}
            onChange={(e) =>
              setTickets(
                Math.min(10, Math.max(1, Number(e.target.value) || 1))
              )
            }
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
          />
        </div>

        <h2 className="text-xl font-bold mt-6">
          Total Amount: ₹{totalPrice}
        </h2>

        <button
          onClick={handleBooking}
          className="w-full bg-purple-600 text-white p-3 rounded-lg mt-6 hover:bg-purple-700"
        >
          Continue to Payment
        </button>

      </div>
    </div>
  )
}

export default Booking
