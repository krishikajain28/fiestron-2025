import React, { useState } from "react"; 
import axios from 'axios'; 

const Sponsors: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactEmail: '',
    phoneNumber: '',
    tier: 'Select Sponsorship Tier', 
  });
  
  // Static sponsor data for display cards
  const sponsors = [
    { name: "TechFlow", tier: "platinum", logo: "🏢" },
    { name: "CyberCore", tier: "platinum", logo: "🔬" },
    { name: "Quantum Leap", tier: "gold", logo: "⚡" },
    { name: "Nebula Systems", tier: "silver", logo: "☁️" },
    { name: "Pixel Forge", tier: "silver", logo: "🎨" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.tier === 'Select Sponsorship Tier') {
        alert('Please select a valid sponsorship tier before submitting.');
        return;
    }

    const API_URL = 'http://localhost:5000/api/contact';

    try {
        await axios.post(API_URL, { 
            ...formData, 
            type: 'Sponsor Inquiry', 
            timestamp: new Date().toISOString() 
        });

        console.log('Sponsor Inquiry Success');
        alert('Inquiry sent! We will contact you shortly with the media kit.');
        setFormData({ companyName: '', contactEmail: '', phoneNumber: '', tier: 'Select Sponsorship Tier' });

    } catch (error) {
        console.error('Submission Failed:', error);
        alert('Error submitting form. Please ensure the server is running.');
    }
  };

  return (
    <section id="sponsors" className="relative w-full py-24 bg-black min-h-screen overflow-hidden font-sans selection:bg-orange-500/30">
      
      {/* --- SHARED BACKGROUND --- */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
      </div>
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
         <div className="absolute top-20 left-[-10%] w-[600px] h-[600px] bg-orange-900/20 rounded-full blur-[120px]" />
         <div className="absolute bottom-20 right-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 backdrop-blur-sm">
             <div>
                <h2 className="text-xs font-bold text-purple-500 mb-3 tracking-[0.2em] uppercase">/ Partners</h2>
                <h3 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">
                  Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-500">Sponsors.</span>
                </h3>
             </div>
             <p className="mt-6 md:mt-0 max-w-sm text-white/50 text-base leading-relaxed text-right">
               Fueling the future of innovation. <br/>
               <span className="text-white/90">Join the Fiestron family.</span>
             </p>
        </div>

        {/* SPONSOR CARDS GRID */}
        <div className="grid gap-6 md:grid-cols-3 mb-24">
          {sponsors.map((sponsor, idx) => (
            <div
              key={idx}
              className="group relative p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl text-center transition-all duration-300 hover:border-orange-500/30 hover:-translate-y-2"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
              
              <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-black/30 border border-white/10 text-4xl shadow-inner">
                    {sponsor.logo}
                  </div>
                  <h3 className="text-white text-xl font-bold mb-3 tracking-tight">
                    {sponsor.name}
                  </h3>
                  <span className={`inline-block px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${
                      sponsor.tier === 'platinum' 
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
                      : sponsor.tier === 'gold' 
                        ? 'bg-orange-500/20 text-orange-300 border-orange-500/30'
                        : 'bg-white/10 text-gray-300 border-white/20'
                  }`}>
                    {sponsor.tier} Partner
                  </span>
              </div>
            </div>
          ))}
        </div>

        {/* SPLIT LAYOUT: BENEFITS & FORM */}
        <div className="grid gap-8 lg:grid-cols-2">

          {/* BENEFITS CARD */}
          <div className="p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-2xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 text-2xl">🚀</div>
                <h3 className="text-white text-2xl font-bold">Why Sponsor Us?</h3>
            </div>

            <ul className="space-y-6">
              {[
                { title: "Massive Reach", desc: "Connect with 5000+ students & professionals." },
                { title: "Top Talent", desc: "Recruit from KC College's best tech minds." },
                { title: "Brand Impact", desc: "Premium logo placement across campus & digital." },
                { title: "CSR Value", desc: "Support education and innovation in Mumbai." },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <div className="mt-1 w-5 h-5 rounded-full border border-purple-500/50 flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <strong className="text-white block mb-1">{item.title}</strong>
                    <span className="text-white/50 text-sm leading-relaxed">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* FORM CARD */}
          <div className="p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden">
            {/* Subtle background gradient for form */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2" />

            <h3 className="text-white text-2xl font-bold mb-2">Become a Partner</h3>
            <p className="text-white/40 text-sm mb-8">Fill out the form below to receive our sponsorship deck.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
              <div className="space-y-5">
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-black/40 text-white rounded-xl border border-white/10 focus:border-orange-500 focus:bg-black/60 outline-none transition-all placeholder-white/20"
                  />

                  <div className="grid grid-cols-2 gap-4">
                      <input
                        type="email"
                        name="contactEmail"
                        placeholder="Email Address"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-black/40 text-white rounded-xl border border-white/10 focus:border-purple-500 focus:bg-black/60 outline-none transition-all placeholder-white/20"
                      />
                      <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-black/40 text-white rounded-xl border border-white/10 focus:border-purple-500 focus:bg-black/60 outline-none transition-all placeholder-white/20"
                      />
                  </div>

                  <div className="relative">
                      <select 
                        name="tier" 
                        value={formData.tier}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-black/40 text-white rounded-xl border border-white/10 focus:border-orange-500 focus:bg-black/60 outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option disabled>Select Sponsorship Tier</option>
                        <option value="Platinum">Platinum (Title) - ₹50,000+</option>
                        <option value="Gold">Gold (Associate) - ₹30,000</option>
                        <option value="Silver">Silver (Event) - ₹15,000</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">▼</div>
                  </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-2 rounded-xl font-bold text-white bg-gradient-to-r from-orange-600 via-purple-600 to-purple-800 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all transform hover:scale-[1.02] active:scale-95"
              >
                Send Inquiry
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Sponsors;