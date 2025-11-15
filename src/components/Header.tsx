import React, { useState } from 'react'
import '../css/Header.css'

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className='header-root'>
      <div className='header-inner'>
        <div className='header-title'>FIESTRON</div>

        <button className='header-toggle' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '☰'}
        </button>

        <nav className='header-nav'>
          <a href='#home' className='header-link'>Home</a>
          <a href='#about' className='header-link'>About</a>
          <a href='#events' className='header-link'>Events</a>
          <a href='#gallery' className='header-link'>Gallery</a>
        </nav>

        <button className='header-register'>
          Register
        </button>
      </div>

      {isOpen && (
        <nav className='header-mobile-nav'>
          <a href='#home' className='header-mobile-link'>Home</a>
          <a href='#about' className='header-mobile-link'>About</a>
          <a href='#events' className='header-mobile-link'>Events</a>
          <a href='#gallery' className='header-mobile-link'>Gallery</a>
          <button className='header-mobile-register'>
            Register
          </button>
        </nav>
      )}
    </header>
  )
}

export default Header
