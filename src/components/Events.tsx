import React, { useState } from 'react'
import '../css/Events.css'

const Events: React.FC = () => {
  const [filter, setFilter] = useState('all')

  const events = [
    { id: 1, title: 'Code Sprint', category: 'technical', description: 'Competitive coding challenge', date: '12 Mar', emoji: '💻' },
    { id: 2, title: 'Web Dev Challenge', category: 'technical', description: 'Build the best web application', date: '13 Mar', emoji: '🌐' },
    { id: 3, title: 'AI/ML Hackathon', category: 'technical', description: 'Innovation with AI and ML', date: '14 Mar', emoji: '🤖' },
    { id: 4, title: 'Gaming Tournament', category: 'games', description: 'Esports competitions', date: '12 Mar', emoji: '🎮' },
    { id: 5, title: 'Quiz Master', category: 'non-technical', description: 'General knowledge quiz', date: '13 Mar', emoji: '🧠' },
    { id: 6, title: 'Treasure Hunt', category: 'non-technical', description: 'Adventurous treasure quest', date: '14 Mar', emoji: '🔍' },
    { id: 7, title: 'Debate Competition', category: 'non-technical', description: 'Intellectual debate showdown', date: '12 Mar', emoji: '🎤' },
    { id: 8, title: 'Photography Contest', category: 'non-technical', description: 'Capture the moment', date: '13 Mar', emoji: '📸' },
  ]

  const filteredEvents = filter === 'all' ? events : events.filter(e => e.category === filter)

  return (
    <section id='events' className='events-root'>
      <div className='events-container'>
        <h2 className='events-title'>Explore Events</h2>

        <div className='events-filter'>
          {['all', 'technical', 'non-technical', 'games'].map(cat => {
            const isActive = filter === cat
            const btnClass = isActive ? 'events-filter-btn-active' : 'events-filter-btn-inactive'
            return (
              <button key={cat} onClick={() => setFilter(cat)} className={btnClass}>
                {cat === 'all' ? 'All Events' : cat === 'technical' ? 'Technical' : cat === 'non-technical' ? 'Non-Technical' : 'Games'}
              </button>
            )
          })}
        </div>

        <div className='events-grid'>
          {filteredEvents.map(event => (
            <div key={event.id} className='event-card'>
              <div className='event-emoji'>{event.emoji}</div>
              <h3 className='event-title'>{event.title}</h3>
              <p className='event-desc'>{event.description}</p>
              <div className='event-footer'>
                <span className='event-date'>📅 {event.date}</span>
                <span className='event-arrow'>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Events
