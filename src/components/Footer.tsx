import React from 'react'
import '../css/Footer.css'

const Footer: React.FC = () => {
  return (
    <footer id='contact' className='footer-root'>
      <div className='footer-container'>
        <div className='footer-grid'>
          <div>
            <h3 className='footer-heading'>FIESTRON</h3>
            <p className='footer-contact'>Tech and cultural fest celebrating innovation at KC College.</p>
          </div>
          <div>
            <p className='footer-follow'>Quick Links</p>
            <ul className='footer-list'>
              <li><a href='#home' className='footer-social-link'>Home</a></li>
              <li><a href='#about' className='footer-social-link'>About</a></li>
              <li><a href='#events' className='footer-social-link'>Events</a></li>
              <li><a href='#gallery' className='footer-social-link'>Gallery</a></li>
            </ul>
          </div>
          <div>
            <p className='footer-follow'>Contact</p>
            <p className='footer-contact'>📧 fiestron@kccollege.edu.in</p>
            <p className='footer-contact'>📞 +91 98765 43210</p>
            <p className='footer-contact'>📍 KC College, Mumbai</p>
          </div>
          <div>
            <p className='footer-follow'>Follow</p>
            <div className='footer-social-links'>
              <a href='#' className='footer-social-link'>Twitter</a>
              <a href='#' className='footer-social-link'>Instagram</a>
              <a href='#' className='footer-social-link'>LinkedIn</a>
            </div>
          </div>
        </div>

        <div className='footer-bottom'>
          <div className='footer-flex-div'>
            <p className='footer-copy'>© 2025 FIESTRON - Tech Club, KC College</p>
            <div className='footer-terms'>
              <a href='#' className='footer-social-link'>Privacy</a>
              <a href='#' className='footer-social-link'>Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
