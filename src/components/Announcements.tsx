import React, { useState } from "react";
import axios from "axios"; 
import staticAnnouncements from "../data/announcements.json"; // Importing the local JSON

// ---------------- TYPES ----------------
type Announcement = {
  id: string | number;
  type: string;
  title: string;
  date: string;
  content: string;
};

type AnnouncementType = "important" | "update" | "new" | "highlight" | string;

//theme styles based on type
const getTypeStyles = (type: AnnouncementType): string => {
  switch (type) {
    case "important":
      return "border-pink-500/50 bg-pink-500/10 text-pink-200 shadow-[0_0_20px_rgba(236,72,153,0.15)]";
    case "update":
      return "border-orange-500/50 bg-orange-500/10 text-orange-200 shadow-[0_0_20px_rgba(249,115,22,0.15)]";
    case "new":
      return "border-purple-500/50 bg-purple-500/10 text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.15)]";
    case "highlight":
      return "border-white/40 bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]";
    default:
      return "border-white/20 bg-white/5 text-gray-300";
  }
};

const getTypeEmoji = (type: AnnouncementType): string => {
  switch (type) {
    case "important": return "🚨";
    case "update": return "📝";
    case "new": return "✨";
    case "highlight": return "⭐";
    default: return "ℹ️";
  }
};

// ---------------- COMPONENT ----------------
const Announcements: React.FC = () => {
  // DIRECTLY USE STATIC DATA (Solves the White Screen Crash)
  const announcements: Announcement[] = staticAnnouncements;
  
  // Newsletter Logic
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  
  // Note: This API call might still fail if backend is down, but it won't crash the page on load
  const CONTACT_API_URL = "/api/contact"; 

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    setIsSubscribing(true);
    try {
      await axios.post(CONTACT_API_URL, {
        type: "Newsletter Subscription",
        email,
        timestamp: new Date().toISOString(),
      });
      alert("Successfully subscribed! 🚀");
      setEmail("");
    } catch (error) {
      // Graceful error handling
      console.error(error);
      alert("Subscription service is currently offline. Please try again later.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section id="announcements" className="relative w-full py-24 bg-black min-h-screen overflow-hidden font-sans selection:bg-purple-500/30">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-[-10%] w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 backdrop-blur-sm">
          <div>
            <h2 className="text-xs font-bold text-orange-500 mb-3 tracking-[0.2em] uppercase">/ Updates</h2>
            <h3 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">News.</span>
            </h3>
          </div>
          <p className="mt-6 md:mt-0 max-w-sm text-white/50 text-base leading-relaxed text-right">
            Stay plugged in to the <br /> <span className="text-white/90">Fiestron Ecosystem.</span>
          </p>
        </div>

        {/* Announcements List */}
        <div className="grid gap-6">
          {announcements.map((ann) => (
            <div key={ann.id} className={`group relative p-6 rounded-3xl border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${getTypeStyles(ann.type)}`}>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row gap-6">
                <div className="shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl bg-black/20 border border-white/10 text-3xl shadow-inner">
                  {getTypeEmoji(ann.type)}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3 gap-2">
                    <h3 className="text-xl font-bold tracking-tight">{ann.title}</h3>
                    <span className="inline-block px-3 py-1 rounded-full bg-black/30 border border-white/5 text-xs font-mono text-white/60 uppercase tracking-wider">{ann.date}</span>
                  </div>
                  <p className="text-white/70 leading-relaxed text-base font-light">{ann.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-24 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-2xl p-10 md:p-16 text-center group">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-purple-500/10 to-transparent opacity-50 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block p-3 rounded-2xl bg-white/5 border border-white/10 text-3xl mb-6">🔔</span>
            <h4 className="text-3xl md:text-4xl font-bold text-white mb-4">Never Miss a Beat.</h4>
            <p className="text-white/50 mb-8 text-lg">Get real-time updates on schedules, results, and surprise events directly to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 px-6 py-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-black/60 transition-all" />
              <button onClick={handleSubscribe} disabled={isSubscribing} className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Announcements;