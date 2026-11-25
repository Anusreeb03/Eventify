import { useEffect, useState } from "react";
import type { User } from "../types/User";
import type { EventBooking } from "../types/Booking";
import type { Event } from "../types/Event";
import { Link } from "react-router-dom";
import { getEvents, deleteEvent } from "../services/eventService";

function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [bookings, setBookings] = useState<EventBooking[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setError("");

      const [eventData] = await Promise.all([getEvents()]);

      const savedUsers: User[] = JSON.parse(
        localStorage.getItem("users") || "[]",
      );

      const savedBookings: EventBooking[] = JSON.parse(
        localStorage.getItem("bookings") || "[]",
      );

      setUsers(savedUsers);
      setBookings(savedBookings);
      setAllEvents(eventData);
    } catch {
      setError("Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const totalRevenue = bookings.reduce(
    (total, booking) => total + booking.totalPrice,
    0,
  );

  const handleDeleteEvent = async (eventId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?",
    );

    if (!confirmDelete) return;

    try {
      await deleteEvent(eventId);

      setAllEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId),
      );

      alert("Event deleted successfully");
    } catch (error) {
      alert("Failed to delete event");
    }
  };

  if (loading) {
    return <p className="text-center p-10">Loading dashboard...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white p-8">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500 mt-2">Manage your events and bookings</p>
        </div>

        <Link
          to="/admin/add-event"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
        >
          + Add New Event
        </Link>
        <Link
          to="/admin/refund-requests"
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg"
        >
          Manage Refund Requests
        </Link>
      </div>

      {error && <p className="text-red-500 mb-5">{error}</p>}

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-3xl font-bold mt-2">{users.length}</h2>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Events</p>
          <h2 className="text-3xl font-bold mt-2">{allEvents.length}</h2>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
          <p className="text-gray-500">Confirmed Bookings</p>
          <h2 className="text-3xl font-bold mt-2">{bookings.length}</h2>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Revenue</p>
          <h2 className="text-3xl font-bold mt-2 text-purple-600">
            ₹{totalRevenue}
          </h2>
        </div>
      </div>

      {/* Manage Events */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow mt-10">
        <h2 className="text-2xl font-bold mb-6">Manage Events</h2>

        {allEvents.length === 0 ? (
          <p className="text-gray-500">No events available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="p-3">Event</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {allEvents.map((event) => (
                  <tr key={event.id} className="border-b dark:border-gray-700">
                    <td className="p-3">{event.title}</td>
                    <td className="p-3">{event.category}</td>
                    <td className="p-3">{event.date}</td>
                    <td className="p-3">₹{event.price}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/edit-event/${event.id}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* All Bookings */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow mt-10">
        <h2 className="text-2xl font-bold mb-6">All Bookings</h2>

        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="p-3">User Email</th>
                  <th className="p-3">Event</th>
                  <th className="p-3">Tickets</th>
                  <th className="p-3">Amount</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b dark:border-gray-700"
                  >
                    <td className="p-3">{booking.userEmail}</td>
                    <td className="p-3">{booking.eventTitle}</td>
                    <td className="p-3">{booking.tickets}</td>
                    <td className="p-3">₹{booking.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
