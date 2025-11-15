import React from 'react'
import '../css/Announcements.css'

const Announcements: React.FC = () => {
  const announcements = [
    {
      id: 1,
      title: 'Registration Extended!',
      content: 'Last date for online registration is now 10th December. Hurry up and register!',
      type: 'important',
      date: '10 Nov 2025',
    },
    {
      id: 2,
      title: 'Venue Change - Code Sprint',
      content: 'Code Sprint event moved from Lab A to Main Hall. New start time: 9:00 AM',
      type: 'update',
      date: '8 Nov 2025',
    },
    {
      id: 3,
      title: 'New Event Added: DevOps Workshop',
      content: 'A new technical workshop on DevOps and Cloud Deployment has been added. Limited seats!',
      type: 'new',
      date: '6 Nov 2025',
    },
    {
      id: 4,
      title: 'Prize Pool Increased!',
      content: 'Total prize pool increased to ₹2,00,000. Check out updated prize distribution.',
      type: 'highlight',
      date: '4 Nov 2025',
    },
    {
      id: 5,
      title: 'Live Streaming Available',
      content: 'All main events will be streamed live on our YouTube channel. Subscribe now!',
      type: 'info',
      date: '2 Nov 2025',
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'important':
        return 'border-red-500 bg-red-500 bg-opacity-10'
      case 'update':
        return 'border-yellow-500 bg-yellow-500 bg-opacity-10'
      case 'new':
        return 'border-green-500 bg-green-500 bg-opacity-10'
      case 'highlight':
        return 'border-cyan-400 bg-cyan-400 bg-opacity-10'
      default:
        return 'border-purple-400 bg-purple-400 bg-opacity-10'
    }
  }

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case 'important':
        return '🚨'
      case 'update':
        return '📝'
      case 'new':
        return '✨'
      case 'highlight':
        return '⭐'
      default:
        return 'ℹ️'
    }
  }

  return (
    <section id="announcements" className="ann-root">
      <div className="ann-container">
        <div className="ann-header">
          <h2 className="ann-title">
            News & Updates
          </h2>
          <p className="ann-sub">Stay updated with latest FIESTRON announcements</p>
          <div className="ann-divider"></div>
        </div>

        <div className="ann-list">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className={`ann-item ${getTypeColor(announcement.type)}`}
            >
            <div className="ann-item-flex">
                <span className="ann-emoji">{getTypeEmoji(announcement.type)}</span>
                <div className="ann-item-flex-1">
                  <div className="ann-item-flex-header">
                    <h3 className="ann-title-sm">{announcement.title}</h3>
                    <span className="ann-date">{announcement.date}</span>
                  </div>
                  <p className="ann-content">{announcement.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="ann-subscribe">
          <p className="ann-subscribe-text">
            🔔 Subscribe to our newsletter to get real-time updates!
          </p>
          <div className="ann-subscribe-flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="ann-input"
            />
            <button className="ann-button">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Announcements
