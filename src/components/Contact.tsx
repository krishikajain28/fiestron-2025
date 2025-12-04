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
    
  const API_URL = 'https://fiestron-2025.onrender.com/api/contact';
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
      alert('Error submitting form. Please try again later.');
    }
  };

  return (
    <>
      <Header />

      <section id="contact" className="relative pt-36 pb-24 bg-black min-h-screen overflow-hidden font-sans selection:bg-purple-500/30">
        
        {/* --- SHARED BACKGROUND --- */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" 
             style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
        </div>
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
           <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]" />
           <div className="absolute bottom-20 left-[-10%] w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          
          {/* HEADER */}
          <div className="text-center mb-20">
             <h2 className="text-sm font-bold text-orange-500 mb-3 tracking-[0.2em] uppercase animate-pulse">/ Get in Touch</h2>
             <h3 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6">
               We'd love to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">hear from you.</span>
             </h3>
             <p className="text-white/50 text-lg max-w-2xl mx-auto">
               Have questions about events, sponsorships, or registrations? Drop us a message.
             </p>
          </div>

          {/* MAIN GRID */}
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            
            {/* LEFT: CONTACT FORM */}
            <div className="p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl relative overflow-hidden group">
               {/* Subtle glow */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />

               <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                 <span className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 text-purple-300 text-lg">✉️</span>
                 Send us a Message
               </h3>

               <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                 <div className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1">Name</label>
                            <input
                              type="text"
                              name="name"
                              placeholder="John Doe"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 text-white focus:border-purple-500 focus:bg-black/60 outline-none transition-all placeholder-white/20"
                              required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1">Email</label>
                            <input
                              type="email"
                              name="email"
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 text-white focus:border-purple-500 focus:bg-black/60 outline-none transition-all placeholder-white/20"
                              required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1">Subject</label>
                        <input
                          type="text"
                          name="subject"
                          placeholder="Event Inquiry / Sponsorship / Other"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 text-white focus:border-purple-500 focus:bg-black/60 outline-none transition-all placeholder-white/20"
                          required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1">Message</label>
                        <textarea
                          name="message"
                          placeholder="Tell us how we can help..."
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 text-white resize-none focus:border-purple-500 focus:bg-black/60 outline-none transition-all placeholder-white/20"
                          required
                        />
                    </div>
                 </div>

                 <button
                   type="submit"
                   className="w-full py-4 mt-2 rounded-xl font-bold text-white bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all transform hover:scale-[1.02] active:scale-95"
                 >
                   Send Message
                 </button>
               </form>
            </div>

            {/* RIGHT: INFO & FAQ */}
            <div className="flex flex-col gap-8">
              
              {/* QUICK LINKS CARD */}
              <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
                  <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
                  
                  <div className="space-y-4">
                    {/* PHONE SECTION */}
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all group">
                       <span className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-xl group-hover:scale-110 transition-transform mt-1">📞</span>
                       <div className="flex-1">
                          <p className="text-xs text-white/40 uppercase tracking-wider font-bold mb-2">Contact Us</p>
                          <div className="flex flex-col gap-2">
                            <a href="tel:+919786678636" className="flex justify-between text-sm text-white/80 hover:text-white transition-colors">
                              <span>Rida Ansari</span>
                              <span className="font-mono">+91 97866 78636</span>
                            </a>
                            <a href="tel:+917083120150" className="flex justify-between text-sm text-white/80 hover:text-white transition-colors">
                              <span>Akanksha Jadhav</span>
                              <span className="font-mono">+91 70831 20150</span>
                            </a>
                          </div>
                       </div>
                    </div>

                    {/* EMAIL SECTION */}
                    <a href="mailto:kccs.techclub@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all group">
                       <span className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">📧</span>
                       <div>
                          <p className="text-xs text-white/40 uppercase tracking-wider font-bold">Email</p>
                          <p className="text-white font-medium">kccs.techclub@gmail.com</p>
                       </div>
                    </a>

                    {/* LOCATION SECTION */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all group cursor-default">
                       <span className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">📍</span>
                       <div>
                          <p className="text-xs text-white/40 uppercase tracking-wider font-bold">Location</p>
                          <p className="text-white font-medium">KC College, Churchgate, Mumbai</p>
                       </div>
                    </div>
                  </div>

                  {/* Socials - REPLACED WITH ICONS */}
                  <div className="mt-8 pt-8 border-t border-white/10">
                     <p className="text-xs text-white/40 uppercase tracking-wider font-bold mb-4">Follow Us</p>
                     <div className="flex gap-4">
                        {/* INSTAGRAM ICON */}
                        <a 
                          href="https://www.instagram.com/kc.techclub/" 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-pink-500 hover:border-pink-500/30 hover:bg-pink-500/10 transition-all duration-300 transform hover:scale-105"
                          aria-label="Instagram"
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                             <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                             <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                             <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                           </svg>
                        </a>

                        {/* LINKEDIN ICON */}
                        <a 
                          href="https://www.linkedin.com/company/fiestron/" 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-500/10 transition-all duration-300 transform hover:scale-105"
                          aria-label="LinkedIn"
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                             <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                             <rect x="2" y="9" width="4" height="12"></rect>
                             <circle cx="4" cy="4" r="2"></circle>
                           </svg>
                        </a>
                     </div>
                  </div>
              </div>

              {/* FAQ SECTION */}
              <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl">
                  <h3 className="text-xl font-bold text-white mb-6">Common Questions</h3>
                  <div className="space-y-3">
                    {[
                      { q: "When is FIESTRON 2025?", a: "15th & 16th December 2025" },
                      { q: "Is entry free?", a: "Yes! Fiestron is open to all. Specific event registration fees apply." },
                      { q: "Can I participate in multiple events?", a: "Absolutely! Just ensure timings don't clash." },
                    ].map((faq, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-black/30 border border-white/5 hover:border-white/10 transition-colors">
                          <p className="text-purple-300 font-bold text-sm mb-1">{faq.q}</p>
                          <p className="text-white/60 text-sm">{faq.a}</p>
                      </div>
                    ))}
                  </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;