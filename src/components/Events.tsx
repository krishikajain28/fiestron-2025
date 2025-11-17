import { useState } from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'

const Events = () => {
  const [filter, setFilter] = useState('all')

  const events = [
    { id: 1, emoji: '💻', title: 'Hackathon', description: '24-hour coding challenge.', date: 'Jan 12', category: 'technical' },
    { id: 2, emoji: '🎤', title: 'Open Mic', description: 'Sing, speak, or perform.', date: 'Jan 15', category: 'non-technical' },
    { id: 3, emoji: '🎮', title: 'LAN Gaming', description: 'Multiplayer PC gaming.', date: 'Jan 18', category: 'games' },
    { id: 4, emoji: '🧪', title: 'Tech Expo', description: 'Showcase your creations.', date: 'Jan 20', category: 'technical' },
    { id: 5, emoji: '🖌️', title: 'Art Battle', description: 'Live digital art competition.', date: 'Jan 22', category: 'non-technical' },
    { id: 6, emoji: '🎲', title: 'Board Games', description: 'Strategy & fun tabletop games.', date: 'Jan 24', category: 'games' },
    { id: 7, emoji: '🤖', title: 'Robotics Workshop', description: 'Hands-on robotics session.', date: 'Jan 26', category: 'technical' },
    { id: 8, emoji: '🎬', title: 'Short Film Screening', description: 'Independent films by students.', date: 'Jan 28', category: 'non-technical' },
  ]

  const filteredEvents =
    filter === 'all'
      ? events
      : events.filter(e => e.category === filter)

  const categories = ['all', 'technical', 'non-technical', 'games']

  return (
    <>
      <Header />
      <section className="relative py-24 px-6 bg-black text-white overflow-hidden min-h-screen">

        {/* Gradient Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-20 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-32 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-teal-400/10 rounded-full blur-2xl animate-pulse-slow"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">

          {/* Title */}
          <h2 className="text-5xl font-extrabold mb-4 text-center bg-gradient-to-r from-orange-400 to-teal-400 bg-clip-text text-transparent">
            Events
          </h2>

          {/* Short description */}
          <p className="text-center text-white/70 mb-12 text-lg max-w-3xl mx-auto">
            Explore all the exciting events we have lined up—technical challenges, creative competitions, and fun games designed to engage, inspire, and bring our community together. Find your favorite and register to participate!
          </p>

          {/* Category Buttons */}
          <div className="flex gap-4 justify-center mb-16 flex-wrap">
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
                  {cat === 'all' ? 'All Events' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              )
            })}
          </div>

          {/* Events Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map(event => (
              <div
                key={event.id}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:scale-105 transition-transform duration-300 backdrop-blur-md shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="text-5xl mb-4">{event.emoji}</div>
                  <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-white/70 mb-4">{event.description}</p>
                  <div className="flex justify-between items-center text-white/80 font-medium mb-4">
                    <span>📅 {event.date}</span>
                    <span className="text-xl">→</span>
                  </div>
                </div>
                
                {/* Register Button */}
                <Link
                  to="/registration"
                  className="mt-2 px-4 py-2 text-sm font-medium text-white rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-center transition"
                >
                  Register
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Events
