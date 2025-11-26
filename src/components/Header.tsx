import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  // FIXED: Moved useEffect OUTSIDE of handleNavClick
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.state]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 lg:px-8 py-6 pointer-events-none">
      <div className="pointer-events-auto shadow-[0_0_8px_rgba(250,126,29,0.22)] rounded-full max-w-5xl mx-auto flex justify-center">
        <div className="flex items-center justify-between px-8 py-3 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-500/10 w-full transition-all duration-300 hover:border-white/20 hover:bg-black/70">
          
          <div 
            onClick={() => scrollToSection('home')}
            className="text-xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent cursor-pointer tracking-tight hover:opacity-80 transition-opacity"
          >
            FIESTRON
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('home')} className="text-sm font-medium text-white/70 hover:text-white transition-colors hover:scale-105">Home</button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-white/70 hover:text-white transition-colors hover:scale-105">About</button>
            <button onClick={() => scrollToSection('announcements')} className="text-sm font-medium text-white/70 hover:text-white transition-colors hover:scale-105">News</button>
            <button onClick={() => scrollToSection('sponsors')} className="text-sm font-medium text-white/70 hover:text-white transition-colors hover:scale-105">Sponsors</button>
            <Link to="/events" className="text-sm font-medium text-white/70 hover:text-white transition-colors hover:scale-105">Events</Link>
            <Link to="/gallery" className="text-sm font-medium text-white/70 hover:text-white transition-colors hover:scale-105">Gallery</Link>
            <Link to="/team" className="text-sm font-medium text-white/70 hover:text-white transition-colors hover:scale-105">Team</Link>
            
            <Link to="/contact" className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm font-medium text-white hover:bg-white/20 transition-all hover:scale-105">
                Contact
            </Link>
          </nav>

          <button className="md:hidden text-white p-1" onClick={() => setIsOpen(!isOpen)}>
            <span className="sr-only">Open menu</span>
            {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="pointer-events-auto absolute top-24 left-4 right-4 p-1">
            <nav className="flex flex-col items-center gap-2 py-6 bg-black/90 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl animate-in slide-in-from-top-5 duration-200">
                <button onClick={() => scrollToSection('home')} className="w-full py-2 text-center text-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors">Home</button>
                <button onClick={() => scrollToSection('about')} className="w-full py-2 text-center text-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors">About</button>
                <button onClick={() => scrollToSection('announcements')} className="w-full py-2 text-center text-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors">News</button>
                <button onClick={() => scrollToSection('sponsors')} className="w-full py-2 text-center text-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors">Sponsors</button>
                <div className="w-16 h-px bg-white/10 my-2" />
                <Link to="/events" onClick={handleNavClick} className="w-full py-2 text-center text-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors">Events</Link>
                <Link to="/gallery" onClick={handleNavClick} className="w-full py-2 text-center text-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors">Gallery</Link>
                <Link to="/team" onClick={handleNavClick} className="w-full py-2 text-center text-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors">Team</Link>
                <Link to="/contact" onClick={handleNavClick} className="w-full py-2 text-center text-lg font-bold text-purple-400 hover:text-purple-300 transition-colors">Contact Us</Link>
            </nav>
        </div>
      )}
    </header>
  );
};

export default Header;