import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Footer: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // --- Smooth Scroll Logic ---
  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } })
    } else {
      const el = document.getElementById(id)
      if (el) {
        const headerOffset = 100; 
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  return (
    // z-50 to sit above the blob, bg-black for seamless look
    <footer className="relative z-50 w-full bg-black text-white pt-20 pb-10 border-t border-white/[0.08] font-sans antialiased">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* --- MAIN GRID SYSTEM --- */}
        {/* Changed layout to 5-3-4 split to remove the empty gap and tighten the structure */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">

          {/* COLUMN 1: BRANDING & SOCIALS (Span 5) */}
          <div className="md:col-span-5 flex flex-col gap-8">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tighter mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                  FIESTRON
                </span>
                <span className="text-white"></span>
              </h2>
              <p className="text-neutral-500 text-sm leading-relaxed max-w-sm font-medium">
                The Past Isn't Forgotten, It's Rebooted. <br />
                KC College's premier technical festival. <br />
                Where code meets culture.
              </p>
            </div>

            <div className="flex gap-5">
              <SocialLink href="https://www.instagram.com/kc.techclub/" label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </SocialLink>
              
              <SocialLink href="https://www.linkedin.com/company/fiestron/" label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </SocialLink>
              
              <SocialLink href="mailto:kccs.techclub@gmail.com" label="Email">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </SocialLink>
            </div>
          </div>

          {/* COLUMN 2: EXPLORE (Span 3) */}
          <div className="md:col-span-3 pt-2">
            <h4 className="text-xs font-bold text-purple-500 uppercase tracking-[0.2em] mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><FooterBtn onClick={() => scrollToSection('home')}>Home</FooterBtn></li>
              <li><FooterBtn onClick={() => scrollToSection('about')}>About</FooterBtn></li>
              <li><FooterLink to="/events">Events Catalog</FooterLink></li>
              <li><FooterLink to="/gallery">Gallery</FooterLink></li>
              <li><FooterLink to="/team">Organizing Team</FooterLink></li>
            </ul>
          </div>

          {/* COLUMN 3: CONTACT US (Span 4) */}
          <div className="md:col-span-4 pt-2">
            <h4 className="text-xs font-bold text-orange-500 uppercase tracking-[0.2em] mb-6">Contact Us</h4>
            
            <div className="space-y-6">
              {/* Rida */}
              <div className="group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors">Rida Ansari</span>
                </div>
                <a href="tel:+919786678636" className="text-sm text-neutral-500 font-mono tracking-wide group-hover:text-pink-500 transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 bg-neutral-600 rounded-full group-hover:bg-pink-500 transition-colors"></span>
                  +91 97866 78636
                </a>
              </div>

              {/* Akanksha */}
              <div className="group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors">Akanksha Jadhav</span>
                </div>
                <a href="tel:+917083120150" className="text-sm text-neutral-500 font-mono tracking-wide group-hover:text-orange-500 transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 bg-neutral-600 rounded-full group-hover:bg-orange-500 transition-colors"></span>
                  +91 70831 20150
                </a>
              </div>

              {/* Official Email */}
              <div className="pt-2 border-t border-white/5 mt-4">
                <a href="mailto:kccs.techclub@gmail.com" className="group flex items-center gap-3 text-sm text-neutral-500 hover:text-white transition-colors duration-300 mt-4">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                  kccs.techclub@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-neutral-500">© 2025 Fiestron. All rights reserved.</p>
            <p className="text-[10px] text-neutral-600 uppercase tracking-wide">KC College, Churchgate, Mumbai - 400020</p>
          </div>
          
          <div className="flex items-center gap-2">
             <span className="text-xs font-medium text-neutral-600 uppercase tracking-wider hover:text-neutral-400 transition-colors cursor-default">
               Designed by Tech Club Web Team
             </span>
          </div>
        </div>

      </div>
    </footer>
  )
}

// --- MICRO COMPONENTS ---

const FooterLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
  <Link to={to} className="block text-sm font-medium text-neutral-400 hover:text-white hover:translate-x-1 transition-all duration-300">
    {children}
  </Link>
)

const FooterBtn = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => (
  <button onClick={onClick} className="block text-sm font-medium text-neutral-400 hover:text-white hover:translate-x-1 transition-all duration-300 text-left">
    {children}
  </button>
)

const SocialLink = ({ href, label, children }: { href: string, label: string, children: React.ReactNode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    aria-label={label}
    className="text-neutral-500 hover:text-white transition-colors duration-300 hover:scale-110 transform"
  >
    {children}
  </a>
)

export default Footer