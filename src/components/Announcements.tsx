import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios'; 
// NOTE: axios is imported for use in fetch logic

// --- HELPER FUNCTIONS (Moved outside for cleaner structure) ---

// Function to determine colors based on API data 'type'
const getTypeColor = (type: string) => {
  switch(type) {
    case 'important': return 'border-red-500 bg-red-500/10 border-l-4'
    case 'update': return 'border-yellow-500 bg-yellow-500/10 border-l-4'
    case 'new': return 'border-green-500 bg-green-500/10 border-l-4'
    case 'highlight': return 'border-cyan-400 bg-cyan-400/10 border-l-4'
    default: return 'border-purple-400 bg-purple-400/10 border-l-4'
  }
}

// Function to determine emoji based on API data 'type'
const getTypeEmoji = (type: string) => {
  switch(type) {
    case 'important': return '🚨'
    case 'update': return '📝'
    case 'new': return '✨'
    case 'highlight': return '⭐'
    default: return 'ℹ️'
  }
}
// ----------------------------------------------------------------

const Announcements: React.FC = () => {

  const [announcements, setAnnouncements] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 
  const API_URL = 'http://localhost:5000/api/announcements';

  // Fetch Logic
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try 
      {
        const response = await axios.get(API_URL);
        // Assuming API returns an array like [{ id, title, content, type, date }]
        setAnnouncements(response.data);
        setIsLoading(false);
      }
      catch (err: unknown) 
      {
        let message = "Failed to load updates. Check server connection.";
        if (axios.isAxiosError(err) && err.response) {
            message = `Server Error (${err.response.status}): Could not retrieve data.`;
        } else if (err instanceof Error) {
            message = `Network Error: ${err.message}`;
        }

        console.error("Failed to fetch announcements:", err);
        setError(message);
        setIsLoading(false);
      }
    };
    fetchAnnouncements();
  },[]);

  // --- Start Render ---
  return (
    <>
      <Header />
      <section id="announcements" className="relative bg-black py-20 sm:py-32 overflow-visible">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent mb-4">News & Updates</h2>
            <p className="text-gray-300 text-lg">Stay updated with latest FIESTRON announcements</p>
            <div className="h-1 w-24 mx-auto mt-4 bg-gradient-to-r from-orange-500 to-teal-500"></div>
          </div>

          
          {/* Conditional Rendering Block */}
          {isLoading && (
              <div className="text-center py-10 text-lg text-gray-500">
                  <div className="animate-spin inline-block w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mb-3"></div>
                  <p>Fetching the latest Fiestron updates...</p>
              </div>
          )}

          {error && (
              <div className="text-center py-10 text-red-400 text-lg border border-red-500/30 p-4 rounded-xl">
                  {error}
              </div>
          )}

          {/* Announcement Grid (Render only if loaded successfully) */}
          {!isLoading && !error && (
              <div className="flex flex-col gap-4">
                  {announcements.map((ann) => (
                      <div 
                          key={ann.id} 
                          className={`p-6 rounded-lg ${getTypeColor(ann.type)} bg-gradient-to-br from-[#1e0f28]/60 to-[#140a1e]/40 backdrop-blur-md hover:shadow-lg transition-shadow duration-300`}
                      >
                          <div className="flex items-start gap-4">
                              <span className="text-2xl">{getTypeEmoji(ann.type)}</span>
                              <div className="flex-1">
                                  <div className="flex justify-between items-center mb-2">
                                      {/* Using ann.title and ann.date from API response */}
                                      <h3 className="text-lg font-bold bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">{ann.title}</h3>
                                      <span className="text-xs font-semibold text-gray-400">{ann.date}</span>
                                  </div>
                                  <p className="text-gray-300 leading-relaxed">{ann.content}</p>
                              </div>
                          </div>
                      </div>
                  ))}
                  {announcements.length === 0 && (
                      <div className="text-center py-10 text-gray-500 text-lg border border-white/10 p-4 rounded-xl">
                          No official announcements yet. Stay tuned!
                      </div>
                  )}
              </div>
          )}

          {/* Call to Action: Newsletter (Kept static) */}
          <div className="mt-12 bg-orange-500/10 border border-orange-500 rounded-lg p-6 text-center">
            <p className="text-gray-200 font-semibold text-lg mb-4">🔔 Subscribe to our newsletter to get real-time updates!</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <input type="email" placeholder="Enter your email" className="flex-1 min-w-[220px] px-4 py-2 rounded-lg bg-[#003049] border border-orange-500/30 text-white focus:outline-none focus:border-orange-500"/>
              <button className="px-6 py-2 font-bold text-white rounded-lg bg-gradient-to-r from-orange-500 to-teal-500 hover:shadow-lg transition-shadow">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Announcements;