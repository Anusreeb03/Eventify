
import { useEffect, useState } from 'react'
import type { RefundRequest } from '../types/RefundRequest'

function RefundRequests() {
  const [requests, setRequests] = useState<RefundRequest[]>([])

  // Load all refund requests
  useEffect(() => {
    const storedRequests = localStorage.getItem('refundRequests')

    if (storedRequests) {
      try {
        setRequests(JSON.parse(storedRequests))
      } catch {
        console.error('Unable to load refund requests')
      }
    }
  }, [])

  // Update refund status
  const handleStatusChange = (
    requestId: number,
    newStatus: RefundRequest['status']
  ) => {
    const updatedRequests = requests.map((request) =>
      request.id === requestId
        ? { ...request, status: newStatus }
        : request
    )

    localStorage.setItem(
      'refundRequests',
      JSON.stringify(updatedRequests)
    )

    setRequests(updatedRequests)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-6 py-12">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Refund Requests
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Review and manage refund requests submitted by users.
        </p>

        {requests.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-xl p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              No refund requests yet
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              User refund requests will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 p-6"
              >
                <div className="flex justify-between items-start gap-3 mb-5">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {request.eventTitle}
                  </h2>

                  <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                    #{request.id}
                  </span>
                </div>

                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    <strong>Booking ID:</strong> {request.bookingId}
                  </p>

                  <p>
                    <strong>User Email:</strong> {request.userEmail}
                  </p>

                  <p>
                    <strong>Tickets:</strong> {request.tickets}
                  </p>

                  <p>
                    <strong>Refund Amount:</strong> ₹{request.refundAmount}
                  </p>

                  <p>
                    <strong>Reason:</strong> {request.reason}
                  </p>

                  {request.additionalComments && (
                    <p>
                      <strong>Additional Comments:</strong>{' '}
                      {request.additionalComments}
                    </p>
                  )}

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Submitted: {new Date(request.submittedAt).toLocaleString()}
                  </p>
                </div>

                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-5">
                  <label className="block mb-2 font-semibold text-gray-900 dark:text-white">
                    Update Refund Status
                  </label>

                  <select
                    value={request.status}
                    onChange={(e) =>
                      handleStatusChange(
                        request.id,
                        e.target.value as RefundRequest['status']
                      )
                    }
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  )
}

export default RefundRequests
