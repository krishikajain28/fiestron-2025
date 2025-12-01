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
    <footer id="footer" className="relative w-full bg-black pt-20 pb-10 overflow-hidden  border border-white/0">
      
      {/* --- SHARED BACKGROUND (Matches Hero/About) --- */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
      </div>
      
      {/* Bottom Glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
         {/* <div className="absolute bottom-[-50%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px]" /> */}
         {/* <div className="absolute bottom-[-40%] right-[-10%] w-[500px] h-[500px] bg-orange-900/20 rounded-full blur-[100px]" /> */}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* MAIN GRID */}
        <div className="grid gap-12 mb-16 md:grid-cols-3">

          {/* Column 1: Branding */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-extrabold mb-4 text-2xl tracking-tight bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              FIESTRON
            </h3>
            <p className="text-sm text-white/50 mb-6 leading-relaxed">
              Where Code meets Culture. <br/>
              Celebrating innovation at KC College.
            </p>
            
            {/* Social Icons Row */}
            <div className="flex gap-4">

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/kc.techclub" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-purple-500/50 transition-all"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-4 h-4"
                >
                  <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.25a1.25 1.25 0 112.5 0 1.25 1.25 0 01-2.5 0z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-purple-500/50 transition-all"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-4 h-4"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* Gmail / Mail */}
              <a 
                href="mailto:fiestron@kccollege.edu.in"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-purple-500/50 transition-all"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-4 h-4"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>

            </div>

          </div>

          {/* Column 2: Navigation */}
          <div>
            <p className="text-xs font-bold text-purple-400 mb-6 uppercase tracking-widest">Quick Links</p>
            <ul className="flex flex-col gap-3">
              <li>
                <button onClick={() => scrollToSection('home')} className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all text-left">
                  About
                </button>
              </li>
              <li>
                <Link to="/events" className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <p className="text-xs font-bold text-orange-400 mb-6 uppercase tracking-widest">Contact</p>
            <div className="flex flex-col gap-4">
              <div className="group flex items-start gap-3">
                 <span className="text-lg opacity-50 group-hover:opacity-100 transition-opacity">📧</span>
                 <div>
                    <p className="text-xs text-white/40 uppercase tracking-wide">Email</p>
                    <a href="mailto:fiestron@kccollege.edu.in" className="text-sm text-white/80 hover:text-white transition-colors">fiestron@kccollege.edu.in</a>
                 </div>
              </div>
              
              <div className="group flex items-start gap-3">
                 <span className="text-lg opacity-50 group-hover:opacity-100 transition-opacity">📞</span>
                 <div>
                    <p className="text-xs text-white/40 uppercase tracking-wide">Phone</p>
                    <p className="text-sm text-white/80">+91 79776 75602</p>
                 </div>
              </div>

              <div className="group flex items-start gap-3">
                 <span className="text-lg opacity-50 group-hover:opacity-100 transition-opacity">📍</span>
                 <div>
                    <p className="text-xs text-white/40 uppercase tracking-wide">Location</p>
                    <p className="text-sm text-white/80">KC College, Churchgate,<br/>Mumbai - 400020</p>
                 </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30 text-center md:text-left">
            © 2025 FIESTRON. All rights reserved. <br className="md:hidden"/> Built with 💜 by the Web Team.
          </p>
                  </div>

      </div>
    </footer>
  )
}

export default Footer