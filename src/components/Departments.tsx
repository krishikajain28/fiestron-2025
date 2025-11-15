import React from 'react'
import '../css/Departments.css'

const Departments: React.FC = () => {
  const departments = [
    { name: 'Accounts', emoji: '💰', desc: 'Manages finances and tracks expenses' },
    { name: 'Admin', emoji: '📋', desc: 'Coordinates permissions and operations' },
    { name: 'Coverage', emoji: '📸', desc: 'Photography, videography, and media' },
    { name: 'Decor', emoji: '🎨', desc: 'Creates stunning setups and spaces' },
    { name: 'Design', emoji: '🖌️', desc: 'Posters, banners, and digital assets' },
    { name: 'Logistics', emoji: '🚚', desc: 'Transport and material management' },
    { name: 'Hospitality', emoji: '🤝', desc: 'Welcomes guests and participants' },
    { name: 'PR & Marketing', emoji: '📢', desc: 'Campaigns and publicity management' },
    { name: 'Security', emoji: '🔒', desc: 'Ensures safety during the fest' },
    { name: 'Technical', emoji: '⚙️', desc: 'Tech setups and troubleshooting' },
    { name: 'Website Team', emoji: '💻', desc: 'Website maintenance and updates' },
  ]

  return (
    <section id="departments" className="dept-root">
      <div className="dept-container">
        <div className="dept-header">
          <h2 className="dept-title">
            FIESTRON Teams
          </h2>
          <p className="dept-sub">Meet the 11 departments making FIESTRON possible</p>
          <div className="dept-divider"></div>
        </div>

        <div className="dept-grid">
          {departments.map((dept, idx) => (
            <div
              key={idx}
              className="dept-card"
            >
              <div className="dept-emoji">{dept.emoji}</div>
              <h3 className="dept-name">{dept.name}</h3>
              <p className="dept-desc">{dept.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Departments
