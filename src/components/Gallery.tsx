import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'

// --- Image Data Structure ---
interface GalleryItem {
  id: number;
  title: string;
  category: 'coverage' | 'previous';
  url: string; 
  alt: string;
}

const initialGalleryItems: GalleryItem[] = [
  // FIESTRON 2024 (Previous Year)
  { id: 1, title: 'Hackathon 2024 Winners', category: 'previous', url: '/images/gallery/hackathon-24.jpg', alt: 'Hackathon winners from 2024' },
  { id: 2, title: 'Closing Ceremony 2024', category: 'previous', url: '/images/gallery/closing-24.jpg', alt: 'Closing ceremony last year' },
  { id: 3, title: 'Faculty & Core Team 2024', category: 'previous', url: '/images/gallery/team-24.jpg', alt: 'Last year core team' },
  // Current Coverage
  { id: 4, title: 'Code Sprint In Progress', category: 'coverage', url: '/images/gallery/codesprint-live.jpg', alt: 'Live coding competition' },
  { id: 5, title: 'Tech Talks Speaker', category: 'coverage', url: '/images/gallery/techtalk-speaker.jpg', alt: 'Speaker giving tech talk' },
  { id: 6, title: 'Escape Room Setup', category: 'coverage', url: '/images/gallery/escape-room.jpg', alt: 'Escape room game setup' },
  { id: 7, title: 'Meme Mania Booth', category: 'coverage', url: '/images/gallery/meme-booth.jpg', alt: 'Meme creation contest' },
  { id: 8, title: 'Gaming Zone', category: 'coverage', url: '/images/gallery/gaming-zone.jpg', alt: 'Gaming tournament area' },
];

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('all')
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null)

  const filteredItems = filter === 'all'
    ? initialGalleryItems
    : initialGalleryItems.filter(item => item.category === filter)

  const categories = ['all', 'previous', 'coverage']

  return (
    <>
      <Header />
      <section className="relative pt-32 pb-24 min-h-screen bg-black text-white overflow-hidden font-sans selection:bg-purple-500/30">

        {/* --- SHARED BACKGROUND --- */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" 
             style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
        </div>
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
           <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]" />
           <div className="absolute bottom-20 left-[-10%] w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-16">
             <h2 className="text-sm font-bold text-orange-500 mb-3 tracking-[0.2em] uppercase animate-pulse">/ Gallery</h2>
             <h3 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6">
               Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">Highlights</span>
             </h3>
             <p className="text-white/50 text-lg max-w-2xl mx-auto">
               Relive the moments. Showcasing the best captures from current and past Fiestron events.
             </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center gap-4 mb-16 flex-wrap">
            {categories.map(cat => {
              const isActive = filter === cat
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-300 border
                    ${isActive 
                      ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105'
                      : 'bg-transparent text-white/60 border-white/10 hover:border-white/40 hover:text-white'}`
                  }
                >
                  {cat === 'all' ? 'All' : cat === 'previous' ? 'Archives' : 'Live Coverage'}
                </button>
              )
            })}
          </div>

          {/* Gallery Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map(item => (
              <div
                key={item.id}
                onClick={() => setLightboxImage(item)}
                className="group relative break-inside-avoid rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden cursor-zoom-in hover:border-purple-500/30 transition-all duration-500"
              >
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-6">
                    <span className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-1">
                        {item.category === 'previous' ? 'Archive' : 'Live'}
                    </span>
                    <h4 className="text-white font-bold text-lg leading-tight">{item.title}</h4>
                </div>

                <img 
                    src={item.url} 
                    alt={item.alt}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { 
                        (e.target as HTMLImageElement).onerror = null; 
                        (e.target as HTMLImageElement).src = `https://placehold.co/600x400/1a1a1a/FFF?text=${item.title.split(' ')[0]}`; 
                    }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* --- LIGHTBOX MODAL --- */}
        {lightboxImage && (
          <div 
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setLightboxImage(null)}
          >
            <div 
              className="relative w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col md:flex-row bg-[#0a0a0a] border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container */}
              <div className="flex-1 bg-black flex items-center justify-center relative">
                  <img 
                    src={lightboxImage.url} 
                    alt={lightboxImage.alt}
                    className="max-w-full max-h-[80vh] object-contain"
                    onError={(e) => { 
                        (e.target as HTMLImageElement).src = `https://placehold.co/800x600/1a1a1a/FFF?text=${lightboxImage.title}`; 
                    }}
                  />
              </div>

              {/* Sidebar (Desktop) / Bottom Bar (Mobile) */}
              <div className="w-full md:w-80 bg-[#111] border-l border-white/10 p-6 flex flex-col justify-center">
                 <div className="mb-auto hidden md:block">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                        lightboxImage.category === 'previous' 
                        ? 'border-purple-500/30 text-purple-400 bg-purple-500/10' 
                        : 'border-orange-500/30 text-orange-400 bg-orange-500/10'
                    }`}>
                        {lightboxImage.category === 'previous' ? '2024 Archive' : 'Live Feed'}
                    </span>
                 </div>
                 
                 <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{lightboxImage.title}</h3>
                    <p className="text-white/40 text-sm">{lightboxImage.alt}</p>
                 </div>

                 <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center">
                    <button className="text-white/40 hover:text-white text-sm transition-colors">Share</button>
                    <button className="text-white/40 hover:text-white text-sm transition-colors">Download</button>
                 </div>
              </div>
              
              {/* Close Button */}
              <button 
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 md:left-4 md:right-auto p-2 rounded-full bg-black/50 hover:bg-white/20 text-white transition-colors z-20 backdrop-blur-md border border-white/10"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  )
}

export default Gallery