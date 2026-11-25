
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Event } from '../types/Event'
import { getEvents } from '../services/eventService'

function Events() {
  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents()
        setAllEvents(data)
      } catch (err) {
        setError('Unable to load events. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const categories = [
    'All',
    'Music',
    'Technology',
    'Sports',
    'Education'
  ]

  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      category === 'All' || event.category === category

    return matchesSearch && matchesCategory
  })

  if (loading) {
    return <p className="text-center p-10">Loading events...</p>
  }

  if (error) {
    return <p className="text-center p-10 text-red-500">{error}</p>
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white p-8">

      <h1 className="text-4xl font-bold text-center mb-8">
        Explore Events
      </h1>

      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`px-5 py-2 rounded-full font-medium ${
              category === item
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {filteredEvents.length === 0 ? (
        <p className="text-center text-gray-500">
          No events found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">
                <span className="text-sm font-semibold text-purple-600">
                  {event.category}
                </span>

                <h2 className="text-xl font-bold mt-2">
                  {event.title}
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mt-3">
                  Date: {event.date}
                </p>

                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Location: {event.location}
                </p>

                <p className="text-purple-600 font-bold text-lg mt-3">
                  ₹{event.price}
                </p>

                <Link
                  to={`/events/${event.id}`}
                  className="block text-center bg-purple-600 text-white py-2 rounded-lg mt-5 hover:bg-purple-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  )
}

export default Events
