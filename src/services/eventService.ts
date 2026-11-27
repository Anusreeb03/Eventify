
import type { Event } from '../types/Event'

const API_URL = 'https://eventify-api-3dq1.onrender.com/events'
export async function getEvents(): Promise<Event[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch events')
  }

  return response.json()
}

// GET - Fetch one event
export async function getEventById(id: string): Promise<Event> {
  const response = await fetch(`${API_URL}/${id}`)

  if (!response.ok) {
    throw new Error('Event not found')
  }

  return response.json()
}

// POST - Add event
export async function addEvent(event: Omit<Event, 'id'>): Promise<Event> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  })

  if (!response.ok) {
    throw new Error('Failed to add event')
  }

  return response.json()
}

// PUT - Update event
export async function updateEvent(
  id: string,
  event: Omit<Event, 'id'>
): Promise<Event> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  })

  if (!response.ok) {
    throw new Error('Failed to update event')
  }

  return response.json()
}

// DELETE - Delete event
export async function deleteEvent(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error('Failed to delete event')
  }
}
