import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

// Define the shape of a pending photo
interface PendingPhoto {
  _id: string;
  imageUrl: string;
  eventCategory: string;
  studentName: string;
  college: string;
  contingentName: string;
  timestamp: string;
}

const Admin: React.FC = () => {
  // --- STATE FOR TABS (Announcements vs Gallery) ---
  const [activeTab, setActiveTab] = useState<'announcements' | 'gallery'>('announcements');
  const [password, setPassword] = useState(''); // Global Password state for simplicity in this demo

  // --- ANNOUNCEMENT STATE ---
  const [announcementForm, setAnnouncementForm] = useState({ title: '', type: 'important', content: '' });
  
  // --- GALLERY STATE ---
  const [pendingPhotos, setPendingPhotos] = useState<PendingPhoto[]>([]);
  
  // --- UI STATE ---
  const [status, setStatus] = useState<{msg: string, type: 'success' | 'error' | ''}>({ msg: '', type: '' });
  const [loading, setLoading] = useState(false);

  // --- FETCH PENDING PHOTOS ---
  const fetchPendingPhotos = async () => {
    if (!password) return;
    try {
        const res = await axios.post('https://fiestron-2025.onrender.com/api/admin/pending-photos', { password });
        setPendingPhotos(res.data);
    } catch (err) {
        console.error(err);
        setStatus({ msg: '❌ Failed to fetch photos. Check Password.', type: 'error' });
    }
  };

  // Effect to fetch photos when switching tabs (if password exists)
  useEffect(() => {
    if (activeTab === 'gallery' && password) {
        fetchPendingPhotos();
    }
  }, [activeTab, password]);


  // --- HANDLER: POST ANNOUNCEMENT ---
  const handleAnnouncementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ msg: '', type: '' });

    try {
      await axios.post('https://fiestron-2025.onrender.com/api/announcements', {
        ...announcementForm,
        password,
        date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
      });
      setStatus({ msg: '✅ Announcement Live!', type: 'success' });
      setAnnouncementForm({ title: '', type: 'important', content: '' }); 
    } catch (err) {
      setStatus({ msg: '❌ Access Denied.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLER: APPROVE/REJECT PHOTO ---
  const handlePhotoAction = async (photoId: string, action: 'approved' | 'rejected') => {
    try {
        await axios.put('https://fiestron-2025.onrender.com/api/admin/update-status', {
            photoId,
            action,
            password
        });
        // Remove from local list instantly
        setPendingPhotos(prev => prev.filter(p => p._id !== photoId));
        alert(`Photo ${action}!`);
    } catch (err) {
        alert("Action failed.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4">
        
        {/* TAB SWITCHER */}
        <div className="max-w-4xl mx-auto flex justify-center gap-4 mb-8">
            <button 
                onClick={() => setActiveTab('announcements')} 
                className={`px-6 py-2 rounded-full font-bold uppercase tracking-wider transition-all ${activeTab === 'announcements' ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
                Announcements
            </button>
            <button 
                onClick={() => setActiveTab('gallery')} 
                className={`px-6 py-2 rounded-full font-bold uppercase tracking-wider transition-all ${activeTab === 'gallery' ? 'bg-orange-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
                Gallery Requests
            </button>
        </div>

        {/* --- AUTH CHECKER (Simulated) --- */}
        <div className="max-w-md mx-auto mb-8">
            <input 
                type="password" 
                placeholder="Enter Admin Password to Unlock..."
                className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-center text-white focus:border-red-500 outline-none"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="flex justify-center">

            {/* --- ANNOUNCEMENTS TAB --- */}
            {activeTab === 'announcements' && (
                <div className="w-full max-w-lg bg-[#111] p-8 rounded-2xl border border-white/10 relative group">
                     {/* Glow */}
                     <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                     <div className="relative">
                        <h1 className="text-3xl font-black text-center mb-8 tracking-tighter">ANNOUNCEMENT <span className="text-red-500">CONSOLE</span></h1>
                        <form onSubmit={handleAnnouncementSubmit} className="space-y-5">
                            <div>
                                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1 block">Title</label>
                                <input type="text" required className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white outline-none"
                                value={announcementForm.title} onChange={e => setAnnouncementForm({...announcementForm, title: e.target.value})} />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1 block">Type</label>
                                <select className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white outline-none"
                                value={announcementForm.type} onChange={e => setAnnouncementForm({...announcementForm, type: e.target.value})}>
                                    <option value="important">Important (Red)</option>
                                    <option value="new">New (Green)</option>
                                    <option value="update">Update (Blue)</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1 block">Message</label>
                                <textarea required rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white outline-none"
                                value={announcementForm.content} onChange={e => setAnnouncementForm({...announcementForm, content: e.target.value})} />
                            </div>
                            <button type="submit" disabled={loading || !password} className="w-full py-4 bg-white text-black font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50">
                                {loading ? "Transmitting..." : "Push to Live 🚀"}
                            </button>
                            {status.msg && <div className={`text-center text-sm font-bold mt-4 ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{status.msg}</div>}
                        </form>
                     </div>
                </div>
            )}

            {/* --- GALLERY TAB --- */}
            {activeTab === 'gallery' && (
                <div className="w-full max-w-6xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Pending Photos ({pendingPhotos.length})</h2>
                        <button onClick={fetchPendingPhotos} className="text-sm bg-white/10 px-4 py-2 rounded-full hover:bg-white/20">↻ Refresh</button>
                    </div>

                    {pendingPhotos.length === 0 ? (
                        <div className="text-center text-white/30 py-20 border border-dashed border-white/10 rounded-xl">No pending photos to review.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pendingPhotos.map(photo => (
                                <div key={photo._id} className="bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-lg">
                                    <div className="h-64 w-full bg-black relative">
                                        <img src={photo.imageUrl} alt="" className="w-full h-full object-contain" />
                                        <div className="absolute top-2 right-2 bg-orange-600 px-3 py-1 text-xs font-bold rounded-full">
                                            {photo.eventCategory}
                                        </div>
                                    </div>
                                    <div className="p-4 space-y-3">
                                        <div>
                                            <p className="text-[10px] text-white/50 uppercase tracking-widest">Uploader</p>
                                            <p className="font-bold">{photo.studentName}</p>
                                            <p className="text-xs text-white/70">{photo.college}</p>
                                        </div>
                                        {photo.contingentName && (
                                            <div>
                                                <p className="text-[10px] text-white/50 uppercase tracking-widest">Contingent</p>
                                                <p className="text-sm">{photo.contingentName}</p>
                                            </div>
                                        )}
                                        <div className="pt-4 flex gap-3">
                                            <button 
                                                onClick={() => handlePhotoAction(photo._id, 'rejected')}
                                                className="flex-1 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded hover:bg-red-500 hover:text-white transition-colors text-sm font-bold"
                                            >
                                                Reject
                                            </button>
                                            <button 
                                                onClick={() => handlePhotoAction(photo._id, 'approved')}
                                                className="flex-1 py-2 bg-green-500/10 text-green-500 border border-green-500/20 rounded hover:bg-green-500 hover:text-white transition-colors text-sm font-bold"
                                            >
                                                Approve
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;