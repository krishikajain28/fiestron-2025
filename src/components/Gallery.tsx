import React, { useState } from 'react'
import Header from './Header'

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('all')

  const galleryItems = [
    { id: 1, title: 'Event 1', category: 'coverage', emoji: '📷' },
    { id: 2, title: 'Event 2', category: 'coverage', emoji: '🎬' },
    { id: 3, title: 'FIESTRON 2024', category: 'previous', emoji: '🏆' },
    { id: 4, title: 'Cultural Night', category: 'coverage', emoji: '🎭' },
    { id: 5, title: 'Tech Talks', category: 'previous', emoji: '💡' },
    { id: 6, title: 'Closing Ceremony', category: 'coverage', emoji: '✨' },
  ]

  const filteredItems =
    filter === 'all'
      ? galleryItems
      : galleryItems.filter(item => item.category === filter)

  const categories = ['all', 'previous', 'coverage']

  return (
    <>
      <Header />
      <section className="relative py-24 px-6 bg-black text-white min-h-screen overflow-visible">

        {/* Gradient Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-32 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Title */}
          <h2 className="text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-[#F77E00] to-[#00A896] bg-clip-text text-transparent">
            Gallery
          </h2>
          {/* Description */}
          <p className="text-center text-white/70 mb-12 text-lg max-w-3xl mx-auto">
            Relive the moments! Our gallery showcases highlights from past events, cultural nights, tech expos, and competitions. Explore and get inspired.
          </p>

          {/* Category Buttons */}
          <div className="flex justify-center gap-4 mb-16 flex-wrap">
            {categories.map(cat => {
              const isActive = filter === cat
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 rounded-full font-semibold transition
                    ${isActive 
                      ? 'bg-gradient-to-r from-orange-500 to-teal-500 text-black shadow-lg scale-105'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'}`
                  }
                >
                  {cat === 'all' ? 'All' : cat === 'previous' ? 'Previous Years' : 'Coverage'}
                </button>
              )
            })}
          </div>

          {/* Gallery Grid */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="aspect-square flex items-center justify-center text-7xl border rounded-xl transition border-[#f77e00]/20 bg-gradient-to-br from-[rgba(30,15,40,0.6)] to-[rgba(20,10,30,0.4)] backdrop-blur-xl hover:scale-105 hover:border-[#f77e00]/40 hover:shadow-[0_12px_40px_rgba(247,126,0,0.2)]"
              >
                <span
                  className="animate-[glow_4s_ease-in-out_infinite]"
                  style={{ filter: "drop-shadow(0 0 4px rgba(247,126,0,0.4))" }}
                >
                  {item.emoji}
                </span>
              </div>
            ))}
          </div>
        </div>

        <style>
          {`
            @keyframes glow {
              0%, 100% { filter: drop-shadow(0 0 4px rgba(247,126,0,0.4)); }
              50% { filter: drop-shadow(0 0 8px rgba(247,126,0,0.7)); }
            }
          `}
        </style>
      </section>
    </>
  )
}

export default Gallery
