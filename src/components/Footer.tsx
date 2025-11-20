import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Footer: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Scroll handler for homepage sections (Reused logic for consistency)
  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      // If on another page, navigate to home first with state
      navigate('/', { state: { scrollTo: id } })
    } else {
      // If already on home page, scroll smoothly
      const el = document.getElementById(id)
      if (el) {
        const headerOffset = 100; // Match the header offset
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      } else {
        // Fallback if element not found (e.g. top of page)
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  return (
    <footer
      id="footer"
      className="
        bg-black
        border-t border-[rgba(247,126,0,0.1)]
        px-6 sm:px-8 lg:px-10
      "
    >
      <div className="max-w-7xl mx-auto py-20">

        {/* GRID */}
        <div className="grid gap-12 mb-12 md:grid-cols-4">

          {/* Column 1: Branding */}
          <div>
            <h3
              className="
                font-semibold mb-4 text-xl
                bg-gradient-to-r from-[#F77E00] to-[#00A896]
                bg-clip-text text-transparent
              "
            >
              FIESTRON
            </h3>
            <p className="text-sm text-gray-500 mb-1 leading-relaxed">
              Tech and cultural fest celebrating innovation at KC College.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <p className="text-sm font-semibold text-[#00A896] mb-4 uppercase tracking-wider">Quick Links</p>
            <ul className="flex flex-col gap-3">
              {/* Home & About -> Scroll Function */}
              <li>
                <button onClick={() => scrollToSection('home')} className="text-sm text-gray-500 hover:text-[#00A896] transition text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="text-sm text-gray-500 hover:text-[#00A896] transition text-left">
                  About
                </button>
              </li>
              
              {/* Dedicated Pages -> Router Links */}
              <li>
                <Link to="/events" className="text-sm text-gray-500 hover:text-[#00A896] transition">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm text-gray-500 hover:text-[#00A896] transition">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-sm text-gray-500 hover:text-[#00A896] transition">
                  Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <p className="text-sm font-semibold text-[#00A896] mb-4 uppercase tracking-wider">Contact</p>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-500">📧 fiestron@kccollege.edu.in</p>
              <p className="text-sm text-gray-500">📞 +91 98765 43210</p>
              <p className="text-sm text-gray-500">📍 KC College, Mumbai</p>
            </div>
          </div>

          {/* Column 4: Socials */}
          <div>
            <p className="text-sm font-semibold text-[#00A896] mb-4 uppercase tracking-wider">Follow</p>
            <div className="flex gap-4">
              <a href="#" className="text-sm text-gray-500 hover:text-[#00A896] transition">Twitter</a>
              <a href="#" className="text-sm text-gray-500 hover:text-[#00A896] transition">Instagram</a>
              <a href="#" className="text-sm text-gray-500 hover:text-[#00A896] transition">LinkedIn</a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[rgba(247,126,0,0.1)] pt-8">
          <div
            className="
              flex flex-col sm:flex-row
              justify-between items-center gap-4
            "
          >
            <p className="text-sm text-gray-600 text-center sm:text-left">
              © 2025 FIESTRON - Tech Club, KC College
            </p>

            <div className="flex gap-8">
              <a href="#" className="text-sm text-gray-500 hover:text-[#00A896] transition">Privacy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-[#00A896] transition">Terms</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer