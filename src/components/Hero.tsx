import React from 'react'
import '../styles/neon-tunnel.css'
import '../css/Hero.css'

const Hero: React.FC = () => {
  return (
    <section id="home" className="hero-root">
      <div className="neon-tunnel" aria-hidden="true" />
      <div className="hero-inner">
        <h1 className="hero-title">
          FIESTRON 2025
        </h1>
        <p className="hero-sub">
          A celebration of technology and creativity at KC College — join workshops, competitions and talks. Step into the tunnel to the future.
        </p>
        <div className="hero-cta">
          <a href="#register" className="hero-register">Register Now</a>
          <a href="#about" className="hero-learn">Learn More</a>
        </div>
      </div>
    </section>
  )
}

export default Hero
