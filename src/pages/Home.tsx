
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Event } from '../types/Event'
import { getEvents } from '../services/eventService'

function Home() {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedEvents = async () => {
      try {
        const data = await getEvents()
        setFeaturedEvents(data.slice(0, 3))
      } catch (error) {
        console.error('Unable to fetch featured events', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedEvents()
  }, [])

  const categories = [
    {
      name: 'Music',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea'
    },
    {
      name: 'Technology',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87'
    },
    {
      name: 'Sports',
      image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20'
    },
    {
      name: 'Education',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'
    }
  ]

  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white">

      {/* Hero Section */}
      <section
        className="relative min-h-[550px] flex items-center justify-center text-center px-6 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-950/90 to-black/70"></div>

        <div className="relative z-10 max-w-3xl text-white">

          <p className="text-purple-300 uppercase tracking-widest font-semibold mb-4">
            Discover. Experience. Celebrate.
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Find Your Next Unforgettable Experience
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Explore exciting events, discover new experiences and book your tickets with ease.
          </p>

          <Link
            to="/events"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Explore Events
          </Link>

        </div>
      </section>

      {/* Explore Categories */}
      <section className="py-20 px-6 md:px-12">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">
            <p className="text-purple-600 font-semibold uppercase tracking-widest text-sm">
              Find Your Interest
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Explore Categories
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-3">
              Discover events based on what you love.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {categories.map((category) => (
              <Link
                key={category.name}
                to="/events"
                className="group relative h-72 rounded-2xl overflow-hidden"
              >

                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <h3 className="absolute bottom-7 left-6 text-white text-2xl font-bold">
                  {category.name}
                </h3>

              </Link>
            ))}

          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 px-6 md:px-12 bg-gray-50 dark:bg-gray-900">

        <div className="max-w-7xl mx-auto">

          <div className="flex flex-wrap justify-between items-center gap-4 mb-12">

            <div>
              <p className="text-purple-600 font-semibold uppercase tracking-widest text-sm">
                Don't Miss Out
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mt-3">
                Featured Events
              </h2>
            </div>

            <Link
              to="/events"
              className="text-purple-600 font-semibold hover:underline"
            >
              View All Events →
            </Link>

          </div>

          {loading ? (
            <p className="text-center text-gray-500">
              Loading featured events...
            </p>
          ) : featuredEvents.length === 0 ? (
            <p className="text-center text-gray-500">
              No featured events available.
            </p>
          ) : (

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {featuredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white dark:bg-gray-950 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
                >

                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-56 object-cover"
                  />

                  <div className="p-6">

                    <span className="text-purple-600 font-semibold text-sm">
                      {event.category}
                    </span>

                    <h3 className="text-xl font-bold mt-2">
                      {event.title}
                    </h3>

                    <p className="text-gray-500 dark:text-gray-400 mt-3">
                      {event.date}
                    </p>

                    <p className="text-gray-500 dark:text-gray-400">
                      {event.location}
                    </p>

                    <div className="flex justify-between items-center mt-5">

                      <span className="text-purple-600 font-bold text-lg">
                        ₹{event.price}
                      </span>

                      <Link
                        to={`/events/${event.id}`}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                      >
                        View Details
                      </Link>

                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      </section>

      {/* Why Eventify Section */}
      <section className="py-24 px-6 md:px-12">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <p className="text-purple-600 font-semibold uppercase tracking-widest text-sm">
              The Eventify Advantage
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              More Than Just Events
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
              We make discovering, booking and managing your favourite events simple and convenient.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Easy Booking */}
            <div className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition">

              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 mb-7">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 9a3 3 0 0 0 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 0 0-6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
                  <path d="M13 5v2" />
                  <path d="M13 11v2" />
                  <path d="M13 17v2" />
                </svg>

              </div>

              <h3 className="text-xl font-bold mb-3">
                Easy Booking
              </h3>

              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Find your favourite events and book tickets through a simple and convenient process.
              </p>

            </div>

            {/* Exciting Experiences */}
            <div className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition">

              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 mb-7">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
                </svg>

              </div>

              <h3 className="text-xl font-bold mb-3">
                Exciting Experiences
              </h3>

              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Discover music, technology, sports and educational events that match your interests.
              </p>

            </div>

            {/* Manage Bookings */}
            <div className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition">

              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mb-7">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M16 3v4M8 3v4M3 11h18" />
                  <path d="m9 16 2 2 4-4" />
                </svg>

              </div>

              <h3 className="text-xl font-bold mb-3">
                Manage Bookings
              </h3>

              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Keep track of your bookings and manage your event reservations with ease.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-700 to-indigo-800 text-white text-center">

        <div className="max-w-3xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            Ready for Your Next Experience?
          </h2>

          <p className="text-purple-100 text-lg mb-8">
            Explore exciting events and make every moment memorable with Eventify.
          </p>

          <Link
            to="/events"
            className="inline-block bg-white text-purple-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Explore Events
          </Link>

        </div>
      </section>

    </div>
  )
}

export default Home
