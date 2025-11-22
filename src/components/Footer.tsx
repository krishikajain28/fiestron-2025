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
    <footer id="footer" className="relative w-full bg-black pt-20 pb-10 overflow-hidden font-sans selection:bg-purple-500/30 border-t border-white/10">
      
      {/* --- SHARED BACKGROUND (Matches Hero/About) --- */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
      </div>
      
      {/* Bottom Glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
         <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px]" />
         <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-orange-900/20 rounded-full blur-[100px]" />
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
                {['Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                    <a key={social} href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-purple-500/50 transition-all">
                        {/* Placeholder Icons - Replace with SVGs if needed */}
                        <span className="text-xs">↗</span>
                    </a>
                ))}
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
                    <p className="text-sm text-white/80">+91 98765 43210</p>
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