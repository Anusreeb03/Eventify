
export interface RefundRequest {
  id: number
  bookingId: number
  userEmail: string
  eventId: string
  eventTitle: string
  tickets: number
  refundAmount: number
  reason: string
  additionalComments: string
  status: 'Pending' | 'Approved' | 'Rejected' | 'Refunded'
  submittedAt: string
}
