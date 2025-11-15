import React from 'react'
import '../css/About.css'

const About: React.FC = () => {
  return (
    <section id='about' className='about-root'>
      <div className='about-bg'>
        <div className='about-bg-circle'></div>
      </div>

      <div className='about-container'>
        <div className='about-grid'>
          <div className='about-card'>
            <span className='about-emoji'>🎉</span>
          </div>

          <div>
            <h2 className='about-title'>Our Vision</h2>
            <p className='about-body'>
              FIESTRON brings together the brightest minds from KC College and beyond to celebrate technology, creativity, and innovation.
            </p>
            <p className='about-body'>
              With 50+ events, 11 dedicated departments, and a prize pool of ₹2 lakhs, FIESTRON is the ultimate platform for tech enthusiasts and cultural performers alike.
            </p>

            <div className='about-stats-grid'>
              <div className='about-stat'>
                <p className='about-stat-number'>50+</p>
                <p className='about-stat-caption'>Events</p>
              </div>
              <div className='about-stat'>
                <p className='about-stat-number'>11</p>
                <p className='about-stat-caption'>Departments</p>
              </div>
              <div className='about-stat'>
                <p className='about-stat-number'>3</p>
                <p className='about-stat-caption'>Categories</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
