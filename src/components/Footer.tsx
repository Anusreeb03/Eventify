import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-purple-400">Eventify.</h2>

            <p className="text-gray-400 mt-4 leading-7">
              Make every moment memorable. Discover amazing events, connect with
              people and create unforgettable experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <Link to="/" className="hover:text-purple-400">
                Home
              </Link>
              <Link to="/events" className="hover:text-purple-400">
                Explore Events
              </Link>
              <Link to="/my-bookings" className="hover:text-purple-400">
                My Bookings
              </Link>
              <Link to="/signup" className="hover:text-purple-400">
                Register
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <span>Music</span>
              <span>Technology</span>
              <span>Sports</span>
              <span>Education</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <p>hello@eventify.com</p>
              <p>Kochi, Kerala, India</p>
            </div>

            <div className="flex gap-4 mt-5">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 Eventify. All rights reserved.
          </p>

          <p className="text-gray-500 text-sm mt-2">
            Made with passion for unforgettable experiences.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
