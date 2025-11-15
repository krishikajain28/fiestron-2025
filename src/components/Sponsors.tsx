import React from 'react'
import '../css/Sponsors.css'

const Sponsors: React.FC = () => {
  const sponsors = [
    { name: 'Tech Corp', tier: 'platinum', logo: '🏢' },
    { name: 'Innovation Labs', tier: 'gold', logo: '🔬' },
    { name: 'Digital Solutions', tier: 'gold', logo: '💼' },
    { name: 'Cloud Services', tier: 'silver', logo: '☁️' },
    { name: 'Dev Tools', tier: 'silver', logo: '⚙️' },
  ]

  return (
    <section id="sponsors" className="spon-root">
      <div className="spon-container">
        <div className="spon-header">
          <h2 className="spon-title">
            Our Sponsors
          </h2>
          <p className="spon-sub">Supporting FIESTRON 2025</p>
          <div className="spon-divider"></div>
        </div>

        {/* Sponsors Grid */}
        <div className="spon-mb-wrapper">
          <div className="spon-grid">
            {sponsors.map((sponsor, idx) => (
              <div
                key={idx}
                className="spon-card"
              >
                <div className="spon-logo">{sponsor.logo}</div>
                <h3 className="contact-form-title">{sponsor.name}</h3>
                <span className="spon-badge">
                  {sponsor.tier.toUpperCase()} SPONSOR
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsorship Benefits & Form */}
        <div className="spon-benefits-grid">
          <div className="spon-benefits">
            <h3 className="contact-form-title">Why Sponsor FIESTRON?</h3>
            <ul className="spon-benefits-list">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 text-xl">✓</span>
                <span>
                  <strong>Brand Visibility:</strong> Reach 1000+ students and tech professionals
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 text-xl">✓</span>
                <span>
                  <strong>Recruitment:</strong> Connect with top talent from KC College
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 text-xl">✓</span>
                <span>
                  <strong>Social Impact:</strong> Support innovation and learning in tech community
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 text-xl">✓</span>
                <span>
                  <strong>Media Coverage:</strong> Featured in all promotional materials
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 text-xl">✓</span>
                <span>
                  <strong>Networking:</strong> Direct access to student community and team
                </span>
              </li>
            </ul>
          </div>

          <div className="spon-form-wrap">
            <h3 className="contact-form-title">Become a Sponsor</h3>
            <form className="spon-form-space">
              <input
                type="text"
                placeholder="Company Name"
                className="spon-input"
              />
              <input
                type="email"
                placeholder="Contact Email"
                className="spon-input"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="spon-input"
              />
              <select className="spon-input">
                <option>Select Sponsorship Tier</option>
                <option>Platinum - ₹50,000+</option>
                <option>Gold - ₹30,000</option>
                <option>Silver - ₹15,000</option>
              </select>
              <button
                type="submit"
                className="spon-submit"
              >
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Sponsors
