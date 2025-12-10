import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const Admin: React.FC = () => {
  const [form, setForm] = useState({
    title: '',
    type: 'important', // Default option
    content: '',
    password: '' // The key to the backend
  });
  const [status, setStatus] = useState<{msg: string, type: 'success' | 'error' | ''}>({ msg: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ msg: '', type: '' });

    try {
      // this URL matches our live backend
      await axios.post('https://fiestron-2025.onrender.com/api/announcements', {
        ...form,
        date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
      });
      
      setStatus({ msg: '✅ Announcement Live!', type: 'success' });
      setForm({ ...form, title: '', content: '' }); // Keep password, clear others
    } catch (err) {
      console.error(err);
      setStatus({ msg: '❌ Access Denied. Check Password.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 flex justify-center items-center">
        
        {/* The Card */}
        <div className="w-full max-w-lg relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          
          <div className="relative bg-[#111] p-8 rounded-2xl border border-white/10">
            <h1 className="text-3xl font-black text-center mb-8 tracking-tighter">
              ADMIN <span className="text-red-500">CONSOLE</span>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* 1. PASSWORD (The Security Layer) */}
              <div>
                <label className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1 block">Authentication Key</label>
                <input 
                  type="password" 
                  required
                  placeholder="Enter the secret hash password..."
                  className="w-full bg-black/50 border border-red-900/50 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none transition-colors"
                  value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                />
              </div>

              <div className="h-px bg-white/10 my-6"></div>

              {/* 2. TITLE */}
              <div>
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1 block">Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Registrations Closing Soon"
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                />
              </div>

              {/* 3. TYPE */}
              <div>
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1 block">Badge Type</label>
                <select 
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none appearance-none"
                  value={form.type}
                  onChange={e => setForm({...form, type: e.target.value})}
                >
                  <option value="important">Important (Red)</option>
                  <option value="new">New (Green)</option>
                  <option value="update">Update (Blue)</option>
                </select>
              </div>

              {/* 4. CONTENT */}
              <div>
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1 block">Message</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Write the details here..."
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                  value={form.content}
                  onChange={e => setForm({...form, content: e.target.value})}
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-white text-black font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                {loading ? "Transmitting..." : "Push to Live 🚀"}
              </button>

              {/* STATUS MESSAGE */}
              {status.msg && (
                <div className={`text-center text-sm font-bold mt-4 ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {status.msg}
                </div>
              )}

            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;