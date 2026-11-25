
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ChangeEvent, FormEvent } from 'react'
import type { Event } from '../types/Event'
import { addEvent } from '../services/eventService'

function AddEvent() {
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

  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

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
    setError('')
    setSaving(true)

    try {
      await addEvent(formData)
      alert('Event added successfully!')
      navigate('/admin')
    } catch {
      setError('Unable to add event. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-8 text-gray-900 dark:text-white">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Add New Event
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
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
            placeholder="Event Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
          />

          <input
            type="number"
            name="price"
            placeholder="Ticket Price"
            min="0"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
          />

          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
          />

          <input
            type="url"
            name="image"
            placeholder="Event Image URL"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
          />

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {saving ? 'Adding...' : 'Add Event'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddEvent
