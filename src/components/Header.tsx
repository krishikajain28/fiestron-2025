import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  // Scroll handler for homepage sections
  const scrollToSection = (id: string) => {
    if (window.location.pathname !== '/') {
      // Navigate to homepage first, pass id to scroll
      navigate('/', { state: { scrollTo: id } })
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsOpen(false) // close mobile menu
  }

  return (
    <header className="sticky top-0 z-50 px-5 sm:px-8 lg:px-10 py-4 bg-black backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex justify-center">
        <div className="flex items-center gap-10 px-10 py-3 rounded-full bg-gradient-to-b from-[#0a0a0a]/70 to-[#050505]/70 backdrop-blur-xl border border-white/5 shadow-[0_0_40px_rgba(255,145,0,0.3),0_0_60px_rgba(0,168,150,0.2)] w-full max-w-6xl justify-center">
          
          {/* Logo */}
          <div className="text-xl font-bold bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent mr-4">
            FIESTRON
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('home')} className="text-sm text-gray-300 hover:text-white transition">Home</button>
            <button onClick={() => scrollToSection('about')} className="text-sm text-gray-300 hover:text-white transition">About</button>
            <button onClick={() => scrollToSection('announcements')} className="text-sm text-gray-300 hover:text-white transition">News</button>
            <button onClick={() => scrollToSection('sponsors')} className="text-sm text-gray-300 hover:text-white transition">Sponsors</button>
            <Link to="/events" className="text-sm text-gray-300 hover:text-white transition">Events</Link>
            <Link to="/gallery" className="text-sm text-gray-300 hover:text-white transition">Gallery</Link>
            <Link to="/team" className="text-sm text-gray-300 hover:text-white transition">Team</Link>
            <Link to="/contact" className="text-sm text-gray-300 hover:text-white transition">Contact Us</Link>
            
          </nav>

          {/* Register Button */}
          <Link to="/registration" className="hidden md:flex px-5 py-2 text-sm font-medium text-white rounded-full bg-white/10 border border-white/20 backdrop-blur-xl">
            Register
          </Link>

          {/* Mobile Hamburger */}
          <button className="md:hidden text-xl text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <nav className="flex flex-col md:hidden items-center gap-3 mt-3 py-3 bg-[#0a0a0a]/90 rounded-xl border border-white/10 backdrop-blur-xl">
          <button onClick={() => scrollToSection('home')} className="text-sm text-gray-300 hover:text-white transition">Home</button>
          <button onClick={() => scrollToSection('about')} className="text-sm text-gray-300 hover:text-white transition">About</button>
          <button onClick={() => scrollToSection('news')} className="text-sm text-gray-300 hover:text-white transition">News</button>
          <button onClick={() => scrollToSection('sponsors')} className="text-sm text-gray-300 hover:text-white transition">Sponsors</button>
          <Link to="/events" className="text-sm text-gray-300 hover:text-white transition">Events</Link>
          <Link to="/gallery" className="text-sm text-gray-300 hover:text-white transition">Gallery</Link>
          <Link to="/team" className="text-sm text-gray-300 hover:text-white transition">Team</Link>

          <Link to="/registration" className="px-5 py-2 text-sm font-medium text-white rounded-full bg-white/10 border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.2)] backdrop-blur-xl mt-2">
            Register
          </Link>
        </nav>
      )}
    </header>
  )
}

export default Header
