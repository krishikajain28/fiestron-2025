import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

// --- THEME HELPERS ---
// Updated colors to match the Purple/Pink/Orange Fiestron Palette
const getTypeStyles = (type: string) => {
  switch(type) {
    case 'important': 
      return 'border-pink-500/50 bg-pink-500/10 text-pink-200 shadow-[0_0_20px_rgba(236,72,153,0.15)]'
    case 'update': 
      return 'border-orange-500/50 bg-orange-500/10 text-orange-200 shadow-[0_0_20px_rgba(249,115,22,0.15)]'
    case 'new': 
      return 'border-purple-500/50 bg-purple-500/10 text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
    case 'highlight': 
      return 'border-white/40 bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]'
    default: 
      return 'border-white/20 bg-white/5 text-gray-300'
  }
}

const getTypeEmoji = (type: string) => {
  switch(type) {
    case 'important': return '🚨'
    case 'update': return '📝'
    case 'new': return '✨'
    case 'highlight': return '⭐'
    default: return 'ℹ️'
  }
}

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 
  const API_URL = 'http://localhost:5000/api/announcements';

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(API_URL);
        setAnnouncements(response.data);
        setIsLoading(false);
      } catch (err: unknown) {
        let message = "Failed to load updates.";
        if (axios.isAxiosError(err) && err.response) {
            message = `Server Error (${err.response.status})`;
        } else if (err instanceof Error) {
            message = err.message;
        }
        console.error("Failed to fetch announcements:", err);
        setError(message);
        setIsLoading(false);
      }
    };
    fetchAnnouncements();
  },[]);

  return (
    <section id="announcements" className="relative w-full py-24 bg-black min-h-screen overflow-hidden font-sans selection:bg-purple-500/30">
      
      {/* --- SHARED BACKGROUND (Matches Hero/About) --- */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
      </div>
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
         <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]" />
         <div className="absolute bottom-20 left-[-10%] w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* --- HEADER (Matches About Page Style) --- */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 backdrop-blur-sm">
             <div>
                <h2 className="text-xs font-bold text-orange-500 mb-3 tracking-[0.2em] uppercase">/ Updates</h2>
                <h3 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">
                  Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">News.</span>
                </h3>
             </div>
             <p className="mt-6 md:mt-0 max-w-sm text-white/50 text-base leading-relaxed text-right">
               Stay plugged in to the <br/>
               <span className="text-white/90">Fiestron Ecosystem.</span>
             </p>
        </div>

        {/* --- LOADING / ERROR STATES --- */}
        {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-white/40 text-sm tracking-widest uppercase animate-pulse">Syncing Feed...</p>
            </div>
        )}

        {error && (
            <div className="p-6 rounded-2xl border border-red-500/30 bg-red-500/10 text-center backdrop-blur-md">
                <p className="text-red-400 font-medium">⚠️ {error}</p>
                <p className="text-red-400/60 text-sm mt-2">Check your connection or try again later.</p>
            </div>
        )}

        {/* --- ANNOUNCEMENTS GRID --- */}
        {!isLoading && !error && (
            <div className="grid gap-6">
                {announcements.map((ann) => (
                    <div 
                        key={ann.id} 
                        className={`group relative p-6 rounded-3xl border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${getTypeStyles(ann.type)}`}
                    >
                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col md:flex-row gap-6">
                            {/* Icon Box */}
                            <div className="shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl bg-black/20 border border-white/10 text-3xl shadow-inner">
                                {getTypeEmoji(ann.type)}
                            </div>

                            <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3 gap-2">
                                    <h3 className="text-xl font-bold tracking-tight">{ann.title}</h3>
                                    <span className="inline-block px-3 py-1 rounded-full bg-black/30 border border-white/5 text-xs font-mono text-white/60 uppercase tracking-wider">
                                        {ann.date}
                                    </span>
                                </div>
                                <p className="text-white/70 leading-relaxed text-base font-light">
                                    {ann.content}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Empty State */}
                {announcements.length === 0 && (
                    <div className="py-20 text-center border border-white/10 rounded-3xl bg-white/5 backdrop-blur-md">
                        <p className="text-white/30 text-lg">All caught up! No new updates.</p>
                    </div>
                )}
            </div>
        )}

        {/* --- NEWSLETTER SECTION --- */}
        <div className="mt-24 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-2xl p-10 md:p-16 text-center group">
            
            {/* Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-purple-500/10 to-transparent opacity-50 pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
                <span className="inline-block p-3 rounded-2xl bg-white/5 border border-white/10 text-3xl mb-6">🔔</span>
                <h4 className="text-3xl md:text-4xl font-bold text-white mb-4">Never Miss a Beat.</h4>
                <p className="text-white/50 mb-8 text-lg">
                    Get real-time updates on schedules, results, and surprise events directly to your inbox.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <input 
                        type="email" 
                        placeholder="Enter your email address" 
                        className="flex-1 px-6 py-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-black/60 transition-all"
                    />
                    <button className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-300 transform hover:scale-105">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>

      </div>
    </section>
  )
}

export default Announcements;