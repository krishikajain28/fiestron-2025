import React, { useState } from 'react'
import '../css/Contact.css'
import Header from './Header'
import Footer from './Footer'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for your inquiry! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <>
    <Header />
    <section id="contact" className="py-20 pb-32 bg-black relative overflow-visible">
      <div className="contact-container max-w ">
        <div className="contact-header">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-sub">Have questions? We'd love to hear from you!</p>
          <div className="contact-divider"></div>
        </div>

        <div className="contact-grid">
          {/* Contact Form */}
          <div className="contact-form">
            <h3 className="contact-form-title">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="contact-form-space">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="contact-input"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="contact-input"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="contact-input"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="contact-input resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="spon-submit"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact-quick">
            <div>
              <h3 className="contact-quick-title">Quick Links</h3>
              <div className="contact-link-group">
                <a href="tel:+919876543210" className="contact-quick-link-item">
                  <span className="contact-quick-link-icon">📞</span>
                  <div>
                    <p className="contact-link-text-sm">Call Us</p>
                    <p className="contact-link-text-bold">+91 98765 43210</p>
                  </div>
                </a>
                <a href="mailto:fiestron@kccollege.edu.in" className="contact-quick-link-item">
                  <span className="contact-quick-link-icon">📧</span>
                  <div>
                    <p className="contact-link-text-sm">Email Us</p>
                    <p className="contact-link-text-bold">fiestron@kccollege.edu.in</p>
                  </div>
                </a>
                <div className="contact-quick-link-item">
                  <span className="contact-quick-link-icon">📍</span>
                  <div>
                    <p className="contact-link-text-sm">Visit Us</p>
                    <p className="contact-link-text-bold">KC College, Fort, Mumbai</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="contact-quick-title">Follow Us</h3>
              <div className="contact-socials-grid">
                {[
                  { name: 'Facebook', emoji: '👥' },
                  { name: 'Instagram', emoji: '📷' },
                  { name: 'Twitter', emoji: '🐦' },
                  { name: 'LinkedIn', emoji: '💼' },
                  { name: 'YouTube', emoji: '📹' },
                  { name: 'Discord', emoji: '🎮' },
                ].map((social) => (
                  <button
                    key={social.name}
                    className="contact-social-btn"
                  >
                    <span className="contact-social-icon">{social.emoji}</span>
                    <p className="contact-social-name">{social.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="contact-faq">
          <h3 className="contact-form-title">Frequently Asked Questions</h3>
          <div className="contact-faq-grid">
            {[
              { q: 'When is FIESTRON 2025?', a: '15th & 16th December 2025' },
              { q: 'Is there an entry fee?', a: 'No, FIESTRON is free to attend! Event registration is separate.' },
              { q: 'How do I register?', a: 'Use the registration form above or visit the Events section.' },
              { q: 'Can I participate in multiple events?', a: 'Yes! You can register for multiple events as per your interest.' },
            ].map((faq, idx) => (
              <div key={idx} className="contact-faq-item">
                <p className="contact-faq-q">{faq.q}</p>
                <p className="contact-faq-a">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <Footer/>
  </>
  )
}

export default Contact
