
import { useLocation, useNavigate, Link } from 'react-router-dom'
import type { EventBooking } from '../types/Booking'

function Payment() {

  const location = useLocation()
  const navigate = useNavigate()

  // Receive booking information
  const booking = location.state as EventBooking | null

  // Prevent direct access without booking information
  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
        <h1 className="text-2xl font-bold">
          No Booking Details Found
        </h1>

        <Link
          to="/events"
          className="text-purple-600 mt-4"
        >
          Explore Events
        </Link>
      </div>
    )
  }

  // Simulate payment
  const handlePayment = () => {

    const existingBookings: EventBooking[] = JSON.parse(
      localStorage.getItem('bookings') || '[]'
    )

    existingBookings.push(booking)

    localStorage.setItem(
      'bookings',
      JSON.stringify(existingBookings)
    )

    alert('Payment Successful! Booking Confirmed.')

    navigate('/my-bookings')
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white p-8">

      <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-8">
          Payment
        </h1>

        {/* Booking Details */}
        <h2 className="text-xl font-bold mb-4">
          Order Summary
        </h2>

        <div className="space-y-3">

          <p>
            <strong>Event:</strong> {booking.eventTitle}
          </p>

          <p>
            <strong>Date:</strong> {booking.date}
          </p>

          <p>
            <strong>Location:</strong> {booking.location}
          </p>

          <p>
            <strong>Tickets:</strong> {booking.tickets}
          </p>

          <p>
            <strong>Total Amount:</strong> ₹{booking.totalPrice}
          </p>

        </div>

        {/* Payment Information */}
        <div className="bg-purple-50 dark:bg-gray-800 p-5 rounded-lg mt-6">

          <h2 className="font-bold text-lg mb-2">
            Demo Payment
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-sm">
            This is a simulated payment. No real money will be charged.
          </p>

        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          className="w-full bg-purple-600 text-white p-3 rounded-lg mt-6 hover:bg-purple-700"
        >
          Pay Now
        </button>

        <button
          onClick={() => navigate(`/booking/${booking.eventId}`)}
          className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg mt-3"
        >
          Back to Booking
        </button>

      </div>

    </div>
  )
}

export default Payment
