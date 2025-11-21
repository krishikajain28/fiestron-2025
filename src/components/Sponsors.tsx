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
    { name: "ABC", tier: "platinum", logo: "🏢" },
    { name: "XYZ", tier: "gold", logo: "🔬" },
    { name: "PQR", tier: "gold", logo: "💼" },
    { name: "LMN", tier: "silver", logo: "☁️" },
    { name: "DEF", tier: "silver", logo: "⚙️" },
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
        // Send data to the same contact API, but include a distinct type
        await axios.post(API_URL, { 
            ...formData, 
            type: 'Sponsor Inquiry', 
            timestamp: new Date().toISOString() 
        });

        console.log('Sponsor Inquiry Success');
        alert('Inquiry sent! We will contact you shortly with the media kit.');

        // Reset the form
        setFormData({ companyName: '', contactEmail: '', phoneNumber: '', tier: 'Select Sponsorship Tier' });

    } catch (error) {
        console.error('Submission Failed:', error);
        alert('Error submitting form. Please ensure the server is running.');
    }
  };

  return (
    <>
    
    <section
      id="sponsors"
      className="relative py-24 bg-black via-[#16213e] to-[#0f0f1e] overflow-visible"
    >
      {/* Ambient Glow Background (TOP & BOTTOM) */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_bottom_center,rgba(247,126,0,0.2)_0%,rgba(247,126,0,0)_42%),radial-gradient(ellipse_at_bottom_center,rgba(247,126,0,0.14)_0%,rgba(247,126,0,0)_48%),radial-gradient(ellipse_at_bottom_center,rgba(247,126,0,0.1)_0%,rgba(247,126,0,0)_56%),radial-gradient(ellipse_at_bottom_center,rgba(247,126,0,0.06)_0%,rgba(247,126,0,0)_68%)] bg-[length:40%_28%,60%_42%,86%_62%,120%_88%] bg-no-repeat bg-bottom blur-xl"></div>
      <div className="absolute bottom-[-60px] left-0 right-0 h-[300px] pointer-events-none z-0 bg-[radial-gradient(ellipse_at_bottom_center,rgba(247,126,0,0.2)_0%,rgba(247,126,0,0)_42%),radial-gradient(ellipse_at_bottom_center,rgba(247,126,0,0.14)_0%,rgba(247,126,0,0)_48%),radial-gradient(ellipse_at_bottom_center,rgba(247,126,0,0.1)_0%,rgba(247,126,0,0)_56%),radial-gradient(ellipse_at_bottom_center,rgba(247,126,0,0.06)_0%,rgba(247,126,0,0)_68%)] bg-[length:40%_28%,60%_42%,86%_62%,120%_88%] bg-no-repeat bg-bottom blur-xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-[#F77E00] to-[#00A896] bg-clip-text text-transparent">
            Our Sponsors
          </h2>
          <p className="text-gray-300 mt-2">Supporting FIESTRON 2025</p>
          <div className="h-1.5 w-24 mx-auto mt-4 bg-gradient-to-r from-[#F77E00] to-[#00A896] rounded-full"></div>
        </div>

        {/* Sponsor Cards */}
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {sponsors.map((sponsor, idx) => (
            <div
              key={idx}
              className="p-8 rounded-xl border border-[#F77E0040] bg-[linear-gradient(135deg,rgba(30,15,40,0.6)_0%,rgba(20,10,30,0.4)_100%)] backdrop-blur-xl text-center transition-all hover:border-[#F77E0080] hover:shadow-[0_12px_40px_rgba(247,126,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)]"
            >
              <div className="text-7xl mb-4">{sponsor.logo}</div>
              <h3 className="text-white text-xl font-semibold mb-2">
                {sponsor.name}
              </h3>
              <span className="inline-block px-4 py-1 rounded-full bg-[#F77E0033] text-[#00A896] font-bold text-xs">
                {sponsor.tier.toUpperCase()} SPONSOR
              </span>
            </div>
          ))}
        </div>

        {/* Benefits + Form */}
        <div className="grid gap-8 md:grid-cols-2">

          {/* Benefits */}
          <div className="p-8 rounded-xl border border-[#F77E0040] bg-[linear-gradient(135deg,rgba(30,15,40,0.6)_0%,rgba(20,10,30,0.4)_100%)] backdrop-blur-xl">
            <h3 className="text-white text-2xl font-semibold mb-6">
              Why Sponsor FIESTRON?
            </h3>

            <ul className="flex flex-col gap-4 text-gray-300">
              {[
                ["Brand Visibility", "Reach 1000+ students and tech professionals"],
                ["Recruitment", "Connect with top talent from KC College"],
                ["Social Impact", "Support innovation and learning in tech community"],
                ["Media Coverage", "Featured in all promotional materials"],
                ["Networking", "Direct access to student community and team"],
              ].map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="text-cyan-400 mr-3 text-xl">✓</span>
                  <span>
                    <strong>{title}: </strong>
                    {desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="p-8 rounded-xl border border-[#F77E0040] bg-[linear-gradient(135deg,rgba(30,15,40,0.6)_0%,rgba(20,10,30,0.4)_100%)] backdrop-blur-xl">
            <h3 className="text-white text-2xl font-semibold mb-6">
              Become a Sponsor
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-[#003049] text-white rounded-lg border border-[#F77E004D] focus:border-[#00A896] outline-none transition"
              />

              <input
                type="email"
                name="contactEmail"
                placeholder="Contact Email"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-[#003049] text-white rounded-lg border border-[#F77E004D] focus:border-[#00A896] outline-none transition"
              />

              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-[#003049] text-white rounded-lg border border-[#F77E004D] focus:border-[#00A896] outline-none transition"
              />

              <select 
                name="tier" 
                value={formData.tier}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-[#003049] text-white rounded-lg border border-[#F77E004D] focus:border-[#00A896] outline-none transition"
              >
                <option disabled={formData.tier !== 'Select Sponsorship Tier'}>Select Sponsorship Tier</option>
                <option value="Platinum">Platinum - ₹50,000+</option>
                <option value="Gold">Gold - ₹30,000</option>
                <option value="Silver">Silver - ₹15,000</option>
              </select>

              <button
                type="submit"
                className="w-full py-2 rounded-lg font-bold text-teal-400 border border-teal-400 bg-transparent hover:bg-teal-400/10 transition shadow-lg shadow-teal-500/20"
              >
                Send Inquiry
              </button>

            </form>
          </div>
        </div>

      </div>
    </section>

    </>
  );
};

export default Sponsors;