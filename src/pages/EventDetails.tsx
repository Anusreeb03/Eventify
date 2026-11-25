
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { Event } from '../types/Event'
import { getEventById } from '../services/eventService'

function EventDetails() {
  const { id } = useParams()

  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) {
        setError('Invalid event ID')
        setLoading(false)
        return
      }

      try {
        const data = await getEventById(id)
        setEvent(data)
      } catch {
        setError('Event not found')
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [id])

  if (loading) {
    return <p className="text-center p-10">Loading event details...</p>
  }

  if (error || !event) {
    return (
      <div className="text-center p-10 dark:bg-gray-950 dark:text-white">
        <h1 className="text-3xl font-bold">
          {error || 'Event Not Found'}
        </h1>

        <Link to="/events" className="text-purple-600 mt-4 inline-block">
          Back to Events
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white p-8">
      <div className="max-w-5xl mx-auto">

        <img
          src={event.image}
          alt={event.title}
          className="w-full h-96 object-cover rounded-xl"
        />

        <div className="mt-8">
          <span className="text-purple-600 font-semibold">
            {event.category}
          </span>

          <h1 className="text-4xl font-bold mt-3">
            {event.title}
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-4">
            {event.description}
          </p>

          <div className="mt-6 space-y-3">
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Ticket Price:</strong> ₹{event.price}</p>
          </div>

          <Link
            to={`/booking/${event.id}`}
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg mt-8 hover:bg-purple-700"
          >
            Book Tickets
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventDetails
