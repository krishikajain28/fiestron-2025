import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'

// --- Image Data Structure (You will populate the images folder) ---
interface GalleryItem {
  id: number;
  title: string;
  category: 'coverage' | 'previous';
  // Placeholder image URLs - Replace these with your actual files in public/images/
  url: string; 
  alt: string;
}

const initialGalleryItems: GalleryItem[] = [
  // FIESTRON 2024 (Previous Year)
  { id: 1, title: 'Hackathon 2024 Winners', category: 'previous', url: '/images/gallery/hackathon-24.jpg', alt: 'Hackathon winners from 2024' },
  { id: 2, title: 'Closing Ceremony 2024', category: 'previous', url: '/images/gallery/closing-24.jpg', alt: 'Closing ceremony last year' },
  { id: 3, title: 'Faculty & Core Team 2024', category: 'previous', url: '/images/gallery/team-24.jpg', alt: 'Last year core team' },
  // Current Coverage (Placeholder for FIESTRON 2025 Live)
  { id: 4, title: 'Code Sprint In Progress', category: 'coverage', url: '/images/gallery/codesprint-live.jpg', alt: 'Live coding competition' },
  { id: 5, title: 'Tech Talks Speaker', category: 'coverage', url: '/images/gallery/techtalk-speaker.jpg', alt: 'Speaker giving tech talk' },
  { id: 6, title: 'Escape Room Setup', category: 'coverage', url: '/images/gallery/escape-room.jpg', alt: 'Escape room game setup' },
  { id: 7, title: 'Meme Mania Booth', category: 'coverage', url: '/images/gallery/meme-booth.jpg', alt: 'Meme creation contest' },
  { id: 8, title: 'Gaming Zone', category: 'coverage', url: '/images/gallery/gaming-zone.jpg', alt: 'Gaming tournament area' },
];

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('all')
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null) // State for Lightbox

  const filteredItems = filter === 'all'
    ? initialGalleryItems
    : initialGalleryItems.filter(item => item.category === filter)

  const categories = ['all', 'previous', 'coverage']

  return (
    <>
      <Header />
      <section className="relative py-24 px-6 bg-black text-white min-h-screen overflow-visible">

        {/* Gradient Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-32 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Title - Clean & Formal */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-[#F77E00] to-[#00A896] bg-clip-text text-transparent">
            Event Highlights Gallery
          </h2>
          {/* Description */}
          <p className="text-center text-gray-400 mb-12 text-lg max-w-3xl mx-auto">
            Relive the moments! Showcasing the best captures from current and past Fiestron events.
          </p>

          {/* Category Buttons */}
          <div className="flex justify-center gap-4 mb-16 flex-wrap">
            {categories.map(cat => {
              const isActive = filter === cat
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 uppercase tracking-wide text-sm
                    ${isActive 
                      ? 'bg-gradient-to-r from-orange-500 to-teal-500 text-white shadow-lg scale-105'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'}`
                  }
                >
                  {cat === 'all' ? 'All' : cat === 'previous' ? 'Previous Years' : 'Live Coverage'}
                </button>
              )
            })}
          </div>

          {/* Gallery Grid */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredItems.map(item => (
              <div
                key={item.id}
                onClick={() => setLightboxImage(item)} // Open Lightbox
                className="aspect-square flex items-center justify-center rounded-xl overflow-hidden cursor-pointer 
                           border border-[#f77e00]/20 bg-gradient-to-br from-[#1e0f28]/60 to-[#140a1e]/40 backdrop-blur-xl 
                           hover:scale-[1.02] hover:border-teal-400/50 hover:shadow-xl transition-all duration-300"
              >
                <img 
                    src={item.url} 
                    alt={item.alt}
                    className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-80"
                    // Placeholder fallback if image is missing
                    onError={(e) => { 
                        (e.target as HTMLImageElement).onerror = null; 
                        (e.target as HTMLImageElement).src = `https://placehold.co/400x400/222/FFF?text=${item.title.split(' ')[0]}`; 
                        (e.target as HTMLImageElement).style.opacity = '1';
                    }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* --- LIGHTBOX MODAL --- */}
        {lightboxImage && (
          <div 
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setLightboxImage(null)} // Close on backdrop click
          >
            <div 
              className="relative w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image/container
            >
              <img 
                src={lightboxImage.url} 
                alt={lightboxImage.alt}
                className="w-full h-full object-contain" // Use object-contain to prevent cropping
              />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/70 text-white text-lg font-semibold text-center">
                {lightboxImage.title}
                <span className="ml-4 px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-xs uppercase tracking-wider">
                    {lightboxImage.category === 'previous' ? 'Fiestron 2024' : 'Live Coverage'}
                </span>
              </div>
              
              {/* Close Button */}
              <button 
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white text-xl transition-colors z-20"
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