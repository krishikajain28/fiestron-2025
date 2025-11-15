import React from 'react'
import '../css/Team.css'

const Team: React.FC = () => {
  const members = [
    { id: 1, name: 'Alex Johnson', role: 'President', specialty: 'Web Development' },
    { id: 2, name: 'Sarah Chen', role: 'Vice President', specialty: 'AI/ML' },
    { id: 3, name: 'Mike Rodriguez', role: 'Event Manager', specialty: 'DevOps' },
    { id: 4, name: 'Emily Wilson', role: 'Content Lead', specialty: 'UI/UX Design' },
    { id: 5, name: 'James Brown', role: 'Tech Lead', specialty: 'Backend Development' },
    { id: 6, name: 'Lisa Anderson', role: 'Community Manager', specialty: 'Mobile Development' },
  ]

  return (
    <section id="team" className="team-root">
      <div className="team-container">
        <div className="team-header">
          <h2 className="team-title">Meet Our Team</h2>
          <p className="team-sub">Passionate technologists leading the community</p>
        </div>

        <div className="team-grid">
          {members.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-avatar">
                👤
              </div>
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-spec">{member.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
