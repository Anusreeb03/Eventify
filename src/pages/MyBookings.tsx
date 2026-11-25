
import { useEffect, useState, useContext } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { getEvents } from '../services/eventService'
import type { EventBooking } from '../types/Booking'
import type { RefundRequest } from '../types/RefundRequest'

function MyBookings() {
  const { currentUser } = useContext(AuthContext)

  const [bookings, setBookings] = useState<EventBooking[]>([])
  const [activeEventIds, setActiveEventIds] = useState<string[]>([])
  const [refundRequests, setRefundRequests] = useState<RefundRequest[]>([])

  const [loading, setLoading] = useState(true)
  const [eventCheckLoading, setEventCheckLoading] = useState(true)
  const [eventCheckError, setEventCheckError] = useState('')

  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null)

  const [reason, setReason] = useState('')
  const [additionalComments, setAdditionalComments] = useState('')

  // Load user's bookings and refund requests
  useEffect(() => {
    if (!currentUser) {
      setLoading(false)
      return
    }

    try {
      const allBookings: EventBooking[] = JSON.parse(
        localStorage.getItem('bookings') || '[]'
      )

      const userBookings = allBookings.filter(
        (booking) => booking.userEmail === currentUser.email
      )

      setBookings(userBookings)

      const allRequests: RefundRequest[] = JSON.parse(
        localStorage.getItem('refundRequests') || '[]'
      )

      setRefundRequests(
        allRequests.filter(
          (request) => request.userEmail === currentUser.email
        )
      )
    } catch {
      console.error('Unable to load booking information')
    } finally {
      setLoading(false)
    }
  }, [currentUser])

  // Check which events are still available
  useEffect(() => {
    const fetchActiveEvents = async () => {
      try {
        const events = await getEvents()

        setActiveEventIds(
          events.map((event) => String(event.id))
        )
      } catch {
        setEventCheckError(
          'Unable to check event status. Please try again later.'
        )
      } finally {
        setEventCheckLoading(false)
      }
    }

    fetchActiveEvents()
  }, [])

  // Submit refund request
  const handleRefundSubmit = (
    e: FormEvent<HTMLFormElement>,
    booking: EventBooking
  ) => {
    e.preventDefault()

    if (!currentUser) return

    const alreadyRequested = refundRequests.some(
      (request) => request.bookingId === booking.id
    )

    if (alreadyRequested) {
      alert('A refund request already exists for this booking.')
      return
    }

    const newRequest: RefundRequest = {
      id: Date.now(),
      bookingId: booking.id,
      userEmail: currentUser.email,
      eventId: String(booking.eventId),
      eventTitle: booking.eventTitle,
      tickets: booking.tickets,
      refundAmount: booking.totalPrice,
      reason,
      additionalComments,
      status: 'Pending',
      submittedAt: new Date().toISOString()
    }

    const allRequests: RefundRequest[] = JSON.parse(
      localStorage.getItem('refundRequests') || '[]'
    )

    const updatedRequests = [...allRequests, newRequest]

    localStorage.setItem(
      'refundRequests',
      JSON.stringify(updatedRequests)
    )

    setRefundRequests(
      updatedRequests.filter(
        (request) => request.userEmail === currentUser.email
      )
    )

    setSelectedBookingId(null)
    setReason('')
    setAdditionalComments('')

    alert('Your refund request has been submitted successfully.')
  }

  // Cancel booking
  const handleCancelBooking = (bookingId: number) => {
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel this booking?'
    )

    if (!confirmCancel) return

    try {
      const allBookings: EventBooking[] = JSON.parse(
        localStorage.getItem('bookings') || '[]'
      )

      const updatedBookings = allBookings.filter(
        (booking) => booking.id !== bookingId
      )

      localStorage.setItem(
        'bookings',
        JSON.stringify(updatedBookings)
      )

      setBookings((prev) =>
        prev.filter((booking) => booking.id !== bookingId)
      )
    } catch {
      alert('Unable to cancel booking.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="text-gray-700 dark:text-gray-200">
          Loading your bookings...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          My Bookings
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8">
          View your bookings and manage refund requests.
        </p>

        {eventCheckError && (
          <div className="mb-6 p-4 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
            {eventCheckError}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-xl p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              No bookings found
            </h2>

            <Link
              to="/events"
              className="inline-block mt-5 bg-purple-600 text-white px-6 py-3 rounded-lg"
            >
              Explore Events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {bookings.map((booking) => {
              const isCancelled =
                !eventCheckLoading &&
                !eventCheckError &&
                !activeEventIds.includes(String(booking.eventId))

              const refundRequest = refundRequests.find(
                (request) => request.bookingId === booking.id
              )

              return (
                <div
                  key={booking.id}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 p-6"
                >
                  <div className="flex justify-between items-start gap-3 mb-5">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {booking.eventTitle}
                    </h2>

                    {eventCheckLoading ? (
                      <span className="text-sm text-gray-500">
                        Checking...
                      </span>
                    ) : eventCheckError ? (
                      <span className="text-sm text-amber-600 dark:text-amber-400">
                        Status unavailable
                      </span>
                    ) : isCancelled ? (
                      <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                        Event cancelled
                      </span>
                    ) : (
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                        Booking confirmed
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 text-gray-700 dark:text-gray-300">
                    <p>Booking ID: {booking.id}</p>
                    <p>Event Date: {booking.date}</p>
                    <p>Location: {booking.location}</p>
                    <p>Tickets: {booking.tickets}</p>
                    <p>
                      Total Amount: ₹{booking.totalPrice}
                    </p>
                  </div>

                  {isCancelled && (
                    <div className="mt-5 border-t border-gray-200 dark:border-gray-700 pt-5">

                      {refundRequest ? (
                        <div className="space-y-3">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            Refund Request
                          </p>

                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Requested Amount: ₹{refundRequest.refundAmount}
                          </p>

                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Reason: {refundRequest.reason}
                          </p>

                          <span
                            className={`inline-block text-sm font-semibold px-3 py-2 rounded-lg ${
                              refundRequest.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                : refundRequest.status === 'Rejected'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            }`}
                          >
                            {refundRequest.status}
                          </span>
                        </div>
                      ) : (
                        <>
                          {selectedBookingId === booking.id ? (
                            <form
                              onSubmit={(e) =>
                                handleRefundSubmit(e, booking)
                              }
                              className="space-y-4"
                            >
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Request a Refund
                              </h3>

                              <div>
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">
                                  Refund Amount
                                </label>

                                <input
                                  type="text"
                                  value={`₹${booking.totalPrice}`}
                                  readOnly
                                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                              </div>

                              <div>
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">
                                  Reason for Refund
                                </label>

                                <textarea
                                  value={reason}
                                  onChange={(e) =>
                                    setReason(e.target.value)
                                  }
                                  rows={3}
                                  required
                                  placeholder="Explain why you are requesting a refund"
                                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                              </div>

                              <div>
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">
                                  Additional Comments (Optional)
                                </label>

                                <textarea
                                  value={additionalComments}
                                  onChange={(e) =>
                                    setAdditionalComments(e.target.value)
                                  }
                                  rows={2}
                                  placeholder="Additional information"
                                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                              </div>

                              <div className="flex gap-3">
                                <button
                                  type="submit"
                                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg"
                                >
                                  Submit Request
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedBookingId(null)
                                    setReason('')
                                    setAdditionalComments('')
                                  }}
                                  className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-5 py-2 rounded-lg"
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          ) : (
                            <button
                              onClick={() =>
                                setSelectedBookingId(booking.id)
                              }
                              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg"
                            >
                              Request Refund
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {!isCancelled && !eventCheckError && !eventCheckLoading && (
                    <div className="flex flex-wrap gap-3 mt-6">
                      <Link
                        to={`/events/${booking.eventId}`}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                      >
                        View Event
                      </Link>

                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="border border-red-500 text-red-600 px-4 py-2 rounded-lg"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
              )
            })}

          </div>
        )}
      </div>
    </div>
  )
}

export default MyBookings
