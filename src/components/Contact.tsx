import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from 'axios';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    const API_URL = 'http://localhost:5000/api/contact';

    try
    {
      const response = await axios.post(API_URL, formData);
      console.log('Submission Success:', response.data.message);
      alert('Thank you for your inquiry! We will get back to you soon.');

      // Reset the form
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
    catch(error){
      console.error('Submission Failed: ', error);
      alert('Error submitting form. Please try again later.'); // Keep this for user feedback
    }
  };

  return (
    <>
      <Header />

      <section
        id="contact"
        className="relative py-20 pb-32 bg-black overflow-visible"
      >
        {/* Background glow (before equivalent) */}
        <div
          className="absolute inset-0 pointer-events-none blur-xl"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at bottom center, rgba(247,126,0,0.2) 0%, rgba(247,126,0,0) 42%),
              radial-gradient(ellipse at bottom center, rgba(247,126,0,0.14) 0%, rgba(247,126,0,0) 48%),
              radial-gradient(ellipse at bottom center, rgba(247,126,0,0.1) 0%, rgba(247,126,0,0) 56%),
              radial-gradient(ellipse at bottom center, rgba(247,126,0,0.06) 0%, rgba(247,126,0,0) 68%)
            `,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom center",
            backgroundSize: "40% 28%, 60% 42%, 86% 62%, 120% 88%",
          }}
        ></div>

        {/* Background glow bottom (::after equivalent) */}
        <div
          className="absolute bottom-[-60px] left-0 right-0 h-[300px] pointer-events-none blur-xl"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at bottom center, rgba(247,126,0,0.2) 0%, rgba(247,126,0,0) 42%),
              radial-gradient(ellipse at bottom center, rgba(247,126,0,0.14) 0%, rgba(247,126,0,0) 48%),
              radial-gradient(ellipse at bottom center, rgba(247,126,0,0.1) 0%, rgba(247,126,0,0) 56%),
              radial-gradient(ellipse at bottom center, rgba(247,126,0,0,0.06) 0%, rgba(247,126,0,0) 68%)
            `,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom center",
            backgroundSize: "40% 28%, 60% 42%, 86% 62%, 120% 88%",
          }}
        ></div>

        {/* CONTENT WRAPPER */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* HEADER */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-[#F77E00] to-[#00A896] bg-clip-text text-transparent mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-300 text-lg">
              Have questions? We'd love to hear from you!
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-[#F77E00] to-[#00A896] mx-auto mt-4"></div>
          </div>

          {/* GRID */}
          <div className="grid gap-12 md:grid-cols-2">
            {/* FORM */}
            <div className="p-8 rounded-xl border border-orange-400/20 transition-all bg-[rgba(30,15,40,0.6)] bg-gradient-to-br from-[rgba(30,15,40,0.6)] to-[rgba(20,10,30,0.4)] backdrop-blur-xl">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#F77E00] to-[#00A896] bg-clip-text text-transparent mb-6">
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#003049] border border-orange-400/30 text-white focus:outline-none focus:border-[#00A896] transition"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#003049] border border-orange-400/30 text-white focus:outline-none focus:border-[#00A896] transition"
                  required
                />

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#003049] border border-orange-400/30 text-white focus:outline-none focus:border-[#00A896] transition"
                  required
                />

                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#003049] border border-orange-400/30 text-white resize-none focus:outline-none focus:border-[#00A896] transition"
                  required
                />

                <button
                  type="submit"
                  className="mt-2 px-6 py-3 font-bold rounded-lg text-teal-400 border border-teal-400 bg-transparent hover:bg-teal-400/10 transition-all duration-300 shadow-lg shadow-teal-500/20"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* QUICK LINKS + SOCIALS */}
            <div className="flex flex-col gap-12">
              {/* QUICK LINKS */}
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#F77E00] to-[#00A896] bg-clip-text text-transparent mb-6">
                  Quick Links
                </h3>

                <div className="flex flex-col gap-4">
                  {/* PHONE */}
                  <a className="flex gap-4 items-center p-4 rounded-lg border border-orange-400/20 bg-gradient-to-br from-[rgba(30,15,40,0.6)] to-[rgba(20,10,30,0.4)] backdrop-blur-xl">
                    <span className="text-2xl">📞</span>
                    <div>
                      <p className="text-gray-400 text-sm">Call Us</p>
                      <p className="text-white font-bold">+91 98765 43210</p>
                    </div>
                  </a>

                  {/* EMAIL */}
                  <a className="flex gap-4 items-center p-4 rounded-lg border border-orange-400/20 bg-gradient-to-br from-[rgba(30,15,40,0.6)] to-[rgba(20,10,30,0.4)] backdrop-blur-xl">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="text-gray-400 text-sm">Email Us</p>
                      <p className="text-white font-bold">
                        fiestron@kccollege.edu.in
                      </p>
                    </div>
                  </a>

                  {/* LOCATION */}
                  <div className="flex gap-4 items-center p-4 rounded-lg border border-orange-400/20 bg-gradient-to-br from-[rgba(30,15,40,0.6)] to-[rgba(20,10,30,0.4)] backdrop-blur-xl">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="text-gray-400 text-sm">Visit Us</p>
                      <p className="text-white font-bold">
                        KC College, Fort, Mumbai
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SOCIALS */}
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#F77E00] to-[#00A896] bg-clip-text text-transparent mb-6">
                  Follow Us
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Facebook", emoji: "👥" },
                    { name: "Instagram", emoji: "📷" },
                    { name: "Twitter", emoji: "🐦" },
                    { name: "LinkedIn", emoji: "💼" },
                    { name: "YouTube", emoji: "📹" },
                    { name: "Discord", emoji: "🎮" },
                  ].map((social) => (
                    <button
                      key={social.name}
                      className="flex flex-col items-center p-4 rounded-lg border border-orange-400/20 bg-gradient-to-br from-[rgba(30,15,40,0.6)] to-[rgba(20,10,30,0.4)] backdrop-blur-xl hover:border-orange-400/40 transition"
                    >
                      <span className="text-2xl">{social.emoji}</span>
                      <p className="text-sm mt-1 text-white">{social.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 p-8 rounded-xl border border-orange-400/20 bg-gradient-to-br from-[rgba(30,15,40,0.6)] to-[rgba(20,10,30,0.4)] backdrop-blur-xl">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#F77E00] to-[#00A896] bg-clip-text text-transparent mb-6">
              Frequently Asked Questions
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                { q: "When is FIESTRON 2025?", a: "15th & 16th December 2025" },
                {
                  q: "Is there an entry fee?",
                  a: "No, FIESTRON is free to attend! Event registration is separate.",
                },
                {
                  q: "How do I register?",
                  a: "Use the registration form above or visit the Events section.",
                },
                {
                  q: "Can I participate in multiple events?",
                  a: "Yes! You can register for multiple events as per your interest.",
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-lg p-4 bg-[#003049] border border-orange-400/20"
                >
                  <p className="font-bold bg-gradient-to-r from-[#F77E00] to-[#00A896] bg-clip-text text-transparent mb-2">
                    {faq.q}
                  </p>
                  <p className="text-gray-300 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
