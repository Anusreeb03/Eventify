import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Payment from "./pages/Payment";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import Footer from "./components/Footer";
import AddEvent from "./pages/AddEvent";
import EditEvent from "./pages/EditEvent";
import RefundRequests from "./pages/RefundRequests";
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/login" element={<Login />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Protected Routes */}
            <Route
              path="/booking/:id"
              element={
                <ProtectedRoute>
                  <Booking />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-bookings"
              element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/add-event"
              element={
                <AdminRoute>
                  <AddEvent />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/edit-event/:id"
              element={
                <AdminRoute>
                  <EditEvent />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/refund-requests"
              element={
                <AdminRoute>
                  <RefundRequests />
                </AdminRoute>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
