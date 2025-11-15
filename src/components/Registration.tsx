import React, { useState } from 'react'
import '../css/Registration.css'

const Registration: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    events: [] as string[],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleEventToggle = (event: string) => {
    setFormData({
      ...formData,
      events: formData.events.includes(event)
        ? formData.events.filter((e) => e !== event)
        : [...formData.events, event],
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Thank you for registering, ${formData.name}! Confirmation email sent.`)
    setFormData({ name: '', email: '', phone: '', department: '', events: [] })
  }

  return (
    <section id="registration" className="reg-root">
      <div className="reg-container">
        <div className="reg-header">
          <h2 className="reg-title">
            Register Now
          </h2>
          <p className="reg-sub">Join FIESTRON 2025 - Get Your Spot Today!</p>
          <div className="reg-divider"></div>
        </div>

        <div className="reg-form-wrap">
          <form onSubmit={handleSubmit} className="reg-form-space">
            {/* Name */}
            <div>
              <label className="reg-label">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="reg-input"
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="reg-label">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="reg-input"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="reg-label">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="reg-input"
                placeholder="Your phone number"
              />
            </div>

            {/* Department */}
            <div>
              <label className="reg-label">Department / Course *</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="reg-input"
              >
                <option value="">Select your department</option>
                <option value="cs">Computer Science</option>
                <option value="ec">Electronics & Communication</option>
                <option value="it">Information Technology</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Events Selection */}
            <div>
              <label className="reg-events-label">Select Events *</label>
              <div className="reg-events-grid">
                {[
                  'Code Sprint',
                  'Web Dev Challenge',
                  'AI/ML Hackathon',
                  'Gaming Tournament',
                  'Quiz Master',
                  'Debate Competition',
                ].map((event) => (
                  <label key={event} className="reg-event-label">
                    <input
                      type="checkbox"
                      checked={formData.events.includes(event)}
                      onChange={() => handleEventToggle(event)}
                      className="reg-checkbox"
                    />
                    <span className="reg-event-span">{event}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="reg-submit"
            >
              ✓ Complete Registration
            </button>

            <p className="reg-note">
              A confirmation email will be sent to your registered email address
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Registration
