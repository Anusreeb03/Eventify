
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { ChangeEvent, FormEvent } from 'react'
import type { Event } from '../types/Event'
import { getEventById, updateEvent } from '../services/eventService'

function EditEvent() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState<Omit<Event, 'id'>>({
    title: '',
    category: 'Music',
    date: '',
    location: '',
    price: 0,
    description: '',
    image: ''
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) {
        setError('Invalid event ID')
        setLoading(false)
        return
      }

      try {
        const event = await getEventById(id)

        setFormData({
          title: event.title,
          category: event.category,
          date: event.date,
          location: event.location,
          price: event.price,
          description: event.description,
          image: event.image
        })
      } catch {
        setError('Unable to find this event.')
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [id])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: name === 'price' ? Number(value) : value
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!id) return

    setSaving(true)
    setError('')

    try {
      await updateEvent(id, formData)
      alert('Event updated successfully!')
      navigate('/admin')
    } catch {
      setError('Unable to update event. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-center p-10">Loading event...</p>
  }

  if (error && !formData.title) {
    return (
      <div className="text-center p-10 dark:bg-gray-950 dark:text-white">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-8 text-gray-900 dark:text-white">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Edit Event
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event Title"
            required
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
          >
            <option value="Music">Music</option>
            <option value="Technology">Technology</option>
            <option value="Sports">Sports</option>
            <option value="Education">Education</option>
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Event Location"
            required
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            required
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Event Description"
            rows={4}
            required
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
          />

          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
          />

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {saving ? 'Updating...' : 'Update Event'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="w-full border border-gray-300 dark:border-gray-600 py-3 rounded-lg"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditEvent
