import React, { useState } from 'react'
import '../css/Gallery.css'

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

  const filteredItems = filter === 'all' ? galleryItems : galleryItems.filter(item => item.category === filter)

  return (
    <section id='gallery' className='gallery-root'>
      <div className='gallery-container'>
        <h2 className='gallery-title'>Gallery</h2>

        <div className='gallery-filter'>
          {['all', 'previous', 'coverage'].map(cat => {
            const isActive = filter === cat
            const btnClass = isActive ? 'gallery-filter-btn-active' : 'gallery-filter-btn-inactive'
            return (
              <button key={cat} onClick={() => setFilter(cat)} className={btnClass}>
                {cat === 'all' ? 'All' : cat === 'previous' ? 'Previous Years' : 'Coverage'}
              </button>
            )
          })}
        </div>

        <div className='gallery-grid'>
          {filteredItems.map(item => (
            <div key={item.id} className='gallery-item'>
              <span className='gallery-emoji'>{item.emoji}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
