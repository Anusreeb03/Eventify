
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { currentUser, logout } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md">

      <div className="flex justify-between items-center px-5 md:px-8 py-4">

        {/* Logo */}
        <Link to="/" onClick={closeMenu}>
          <h1 className="text-2xl font-bold text-purple-600">
            Eventify
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">

          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>

          {currentUser && currentUser.role !== "admin" && (
            <Link to="/my-bookings">My Bookings</Link>
          )}

          {currentUser?.role === "admin" && (
            <Link to="/admin">Admin Dashboard</Link>
          )}

          {currentUser ? (
            <div className="flex items-center gap-4">
              <span className="font-semibold">
                Welcome, {currentUser.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login">Login</Link>

              <Link
                to="/signup"
                className="bg-purple-600 text-white px-5 py-2 rounded-lg"
              >
                Sign Up
              </Link>
            </div>
          )}

          <button
            onClick={toggleTheme}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>

        </div>

        {/* Mobile Menu Buttons */}
        <div className="flex items-center gap-3 md:hidden">

          <button
            onClick={toggleTheme}
            className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-900 dark:text-white p-2"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              // Close icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-5 pt-2 border-t border-gray-200 dark:border-gray-700">

          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/events" onClick={closeMenu}>
            Events
          </Link>

          {currentUser && currentUser.role !== "admin" && (
            <Link to="/my-bookings" onClick={closeMenu}>
              My Bookings
            </Link>
          )}

          {currentUser?.role === "admin" && (
            <Link to="/admin" onClick={closeMenu}>
              Admin Dashboard
            </Link>
          )}

          {currentUser ? (
            <>
              <span className="font-semibold">
                Welcome, {currentUser.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>
                Login
              </Link>

              <Link
                to="/signup"
                onClick={closeMenu}
                className="bg-purple-600 text-white px-5 py-2 rounded-lg text-center"
              >
                Sign Up
              </Link>
            </>
          )}

        </div>
      )}

    </nav>
  );
}

export default Navbar;
