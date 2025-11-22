import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  // --- REFS FOR PERFORMANCE ---
  const blobRef = useRef<HTMLDivElement>(null);
  const scrollData = useRef({ targetY: 0, currentY: 0 });

  useEffect(() => {
    let animationFrameId: number;
    const handleScroll = () => { scrollData.current.targetY = window.scrollY; };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = () => {
      if (!blobRef.current) return;
      
      const ease = 0.05; 
      const diff = scrollData.current.targetY - scrollData.current.currentY;
      if (Math.abs(diff) > 0.1) scrollData.current.currentY += diff * ease;

      const progress = Math.min(Math.max(scrollData.current.currentY / 800, 0), 1);

      // --- POSITION LOGIC ---
      const currentX = 50 + (35 * progress); 
      const currentTop = 50 + (10 * progress);
      const currentScale = 1 - (0.2 * progress);

      blobRef.current.style.left = `${currentX}%`;
      blobRef.current.style.top = `${currentTop}%`;
      blobRef.current.style.transform = `translate(-50%, -50%) scale(${currentScale})`;

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative bg-black min-h-screen w-full overflow-x-hidden font-sans selection:bg-purple-500/30">
      
      {/* --- GLOBAL STYLES --- */}
      <style>{`
        @keyframes morph {
          0% { border-radius: 45% 55% 60% 40% / 55% 35% 65% 45%; }
          25% { border-radius: 55% 45% 40% 60% / 45% 65% 35% 55%; }
          50% { border-radius: 40% 60% 55% 45% / 65% 45% 55% 35%; }
          75% { border-radius: 60% 40% 45% 55% / 35% 55% 45% 65%; }
          100% { border-radius: 45% 55% 60% 40% / 55% 35% 65% 45%; }
        }
        .blob-morph { animation: morph 8s ease-in-out infinite; }

        @keyframes shine {
          from { background-position: 0% 0%; }
          to { background-position: 200% 0%; }
        }
        .text-shine {
          background: linear-gradient(to right, #ffffff 20%, #fca5a5 40%, #ffffff 60%, #ffffff 80%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shine 4s linear infinite;
        }
        
        /* Glass Card Utility */
        .glass-card {
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-card:hover {
            border-color: rgba(255, 255, 255, 0.2);
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%);
            transform: translateY(-2px);
        }
      `}</style>

      {/* --- BACKGROUNDS --- */}
      <div className="fixed inset-0 opacity-[0.05] pointer-events-none z-0" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
      </div>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-900/10 rounded-full blur-[100px]" />
      </div>

      {/* --- THE TRAVELING BLOB --- */}
      <div
        ref={blobRef}
        className="blob-morph fixed w-96 h-96 backdrop-blur-sm z-0 will-change-transform"
        style={{
            left: '50%', top: '50%', transform: 'translate(-50%, -50%) scale(1)',
            background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.9) 0%, rgba(219, 39, 119, 0.8) 50%, rgba(249, 115, 22, 0.8) 100%)',
            boxShadow: 'inset -10px -10px 30px rgba(0,0,0,0.8), inset 10px 10px 40px rgba(255,255,255,0.4), 0 0 30px #ec4899, 0 0 60px #8b5cf6, 0 0 100px #f97316',
            border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
          <div className="absolute top-10 left-12 w-32 h-16 bg-white rounded-[50%] blur-md transform -rotate-12 mix-blend-overlay opacity-70" />
          <div className="absolute bottom-12 right-12 w-24 h-24 bg-orange-500 rounded-full blur-xl mix-blend-screen opacity-80" />
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-pink-400 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 mix-blend-color-dodge opacity-40 animate-pulse" />
      </div>


      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-screen flex items-center justify-center z-10">
        <div className="max-w-7xl mx-auto text-center px-6"> 
          <div className="inline-block mb-6">
             <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium tracking-wider text-pink-200 uppercase shadow-[0_0_15px_rgba(236,72,153,0.3)]">
               KC College Presents
             </span>
          </div>
          <h1 className="text-shine font-extrabold leading-tight text-6xl sm:text-7xl lg:text-8xl mb-6 tracking-tighter drop-shadow-2xl"
              style={{ fontFamily: 'FiestronCustom, sans-serif' }}>
             F&nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;E&nbsp;&nbsp;&nbsp;S&nbsp;&nbsp;&nbsp;T&nbsp;&nbsp;&nbsp;R&nbsp;&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;N
          </h1>
          <p className="mt-4 text-white/80 text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg">
            The future is fluid. Join the ultimate tech celebration. <br/>
            <span className="font-medium text-white">Workshops • Competitions • Networking</span>
          </p>
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">
            <Link to="/events" className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full text-white font-bold tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(236,72,153,0.6)]">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">Register Now</span>
            </Link>
            <a href="#about" className="inline-flex items-center justify-center px-8 py-4 rounded-full text-white font-medium tracking-wide border border-white/20 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:scale-105">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="relative w-full py-32 z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 backdrop-blur-sm">
             <div>
                <h2 className="text-xs font-bold text-orange-500 mb-3 tracking-[0.2em] uppercase">/ Identity</h2>
                <h3 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">
                  We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Fiestron.</span>
                </h3>
             </div>
             <p className="mt-6 md:mt-0 max-w-md text-white/50 text-base leading-relaxed text-right">
               The intersection of Code, Culture, and Chaos. <br/>
               <span className="text-white/90">KC College's Annual Tech Fest.</span>
             </p>
          </div>

          {/* POLISHED BENTO GRID (12 Cols) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
            
            {/* CARD 1: VISION (8 Cols) */}
            <div className="md:col-span-8 glass-card rounded-3xl p-10 flex flex-col justify-between relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
               <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg mb-6">✦</div>
                  <h4 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    Innovation meets <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Expression.</span>
                  </h4>
                  <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
                    Driven by the <strong>Computer Science Department</strong>, we push boundaries to empower students. Fiestron is where 5,000+ visionaries blend retro roots with AI futures.
                  </p>
               </div>
            </div>

            {/* CARD 2: STATS STACK (4 Cols) */}
            <div className="md:col-span-4 flex flex-col gap-6">
                <div className="glass-card rounded-3xl p-8 flex-1 flex flex-col justify-center items-center text-center group">
                    <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 tracking-tight group-hover:scale-110 transition-transform">2L+</span>
                    <span className="text-orange-400 text-xs font-bold tracking-widest uppercase mt-2">Prize Pool</span>
                </div>
                <div className="glass-card rounded-3xl p-8 flex-1 flex flex-col justify-center items-center text-center group">
                    <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 tracking-tight group-hover:scale-110 transition-transform">25</span>
                    <span className="text-purple-400 text-xs font-bold tracking-widest uppercase mt-2">Years Legacy</span>
                </div>
            </div>

            {/* CARD 3: FLAGSHIP EVENTS - SMART LINK (7 Cols) */}
            {/* This whole card is now a clickable link to the events page */}
            <Link to="/events" className="md:col-span-7 glass-card rounded-3xl p-10 relative overflow-hidden group cursor-pointer">
               {/* Hover Glow */}
               <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-orange-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               
               <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                        <h5 className="text-white font-bold text-2xl">Flagship Events</h5>
                        <span className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">↗</span>
                    </div>
                    <p className="text-white/50 text-sm max-w-md">
                      Browse the complete list of technical, cultural, and gaming competitions.
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 mt-8">
                     {['Hackathon', 'Code Quest', 'BGMI', 'Vintage Ventures'].map((tag) => (
                        <span key={tag} className="px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-sm text-white font-medium group-hover:border-purple-500/50 transition-colors">
                           {tag}
                        </span>
                     ))}
                     <span className="px-4 py-2 rounded-lg border border-white/10 text-sm text-white/40 italic">
                       + 26 more
                     </span>
                  </div>
               </div>
            </Link>

            {/* CARD 4: THE SPECTRUM (5 Cols) */}
            <div className="md:col-span-5 glass-card rounded-3xl p-10 flex flex-col justify-center">
               <h5 className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-6">Event Categories</h5>
               <ul className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Technical', icon: '💻', color: 'text-purple-400' },
                    { label: 'Gaming', icon: '🎮', color: 'text-green-400' },
                    { label: 'Cultural', icon: '🎭', color: 'text-pink-400' },
                    { label: 'Carnival', icon: '🎡', color: 'text-orange-400' }
                  ].map((cat) => (
                    <li key={cat.label} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                       <span className="text-xl">{cat.icon}</span>
                       <span className={`text-sm font-bold ${cat.color}`}>{cat.label}</span>
                    </li>
                  ))}
               </ul>
            </div>

            {/* CARD 5: MINDS BEHIND FIESTRON (12 Cols) */}
            <div className="md:col-span-12 glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                   <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-3xl border border-white/10">
                     🎓
                   </div>
                   <div>
                      <h5 className="text-white font-bold text-lg">Minds Behind Fiestron</h5>
                      <p className="text-white/50 text-sm mt-1">
                        Driven by <span className="text-white">100+ Core Members</span> across <span className="text-white">11 Departments</span>.
                      </p>
                   </div>
                </div>

                <div className="flex items-center gap-8 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
                   <div className="text-center md:text-right">
                      <p className="text-white text-sm font-bold">Prof. (Dr.) Hemlata Bagla</p>
                      <p className="text-white/30 text-xs uppercase tracking-wider">Vice Chancellor</p>
                   </div>
                   <div className="hidden md:block w-px h-10 bg-white/10" />
                   <div className="text-center md:text-right">
                      <p className="text-white text-sm font-bold">Dr. S.B. Muley</p>
                      <p className="text-white/30 text-xs uppercase tracking-wider">Coordinator</p>
                   </div>
                </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Home