import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';

// --- IMPORTS ---
import Archives from './Archives';
import Latest from './Latest';
import PreEvent from './PreEvent';
import Header from '../Header';
import Footer from '../Footer';

const FIESTRON_GRADIENT_TEXT = "bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-pink-700 to-purple-700";

// --- TYPES ---
export interface GalleryItem {
  _id?: string; // Optional because static items use 'id' (number)
  id?: number;
  imageUrl?: string; // DB uses this
  url?: string;      // Static uses this
  publicId?: string;
  caption?: string;
  title?: string;    // Static uses this
  description?: string; // Static uses this
  studentName?: string;
  college?: string;
  contingentName?: string;
  eventCategory: string; 
  status?: string;
}

// --- RESTORED STATIC DATA (For Highlights & Archives) ---
const generateGalleryData = (): GalleryItem[] => {
  const items: GalleryItem[] = [];
  const imageTitles: { [key: number]: string } = {
    1: "Candid Moments", 2: "The Fiestron Force", 3: "Workshop Vibes",
    4: "The Core Committee", 5: "Inauguration Day", 6: "The Packed Hall",
    7: "Tech Workshop", 8: "The Team Huddle", 9: "Inaugural Address",
    10: "Victory Moment", 11: "Faculty Jam", 12: "VR Experience",
    13: "The Neon Pulse", 14: "The Committee", 15: "Registration Desk",
    16: "Volunteers", 17: "Sweet Beginnings", 18: "Mentors & Guides",
    19: "Hosting Duties", 20: "Squad Goals", 21: "Award Moment", 22: "Seminar Session"
  };
  
  // Archives Data (2024) - 22 Items
  for (let i = 1; i <= 22; i++) {
    items.push({
      id: i,
      eventCategory: 'ARCHIVES',
      title: imageTitles[i] || `Fiestron Moment ${i}`,
      url: `/images/gallery/a${i}.png`, // Static Path
      imageUrl: `/images/gallery/a${i}.png`, // Compatibility for new components
      caption: imageTitles[i], // Compatibility
      studentName: "Fiestron Team", // Default
      description: "A spectacular moment captured in time at Fiestron 2024."
    });
  }
  return items;
};

const staticArchiveItems = generateGalleryData();

// ==================== COMPONENTS ====================

// 1. IOS BUTTON (Kept same)
const IOSButton = ({ text, onClick, icon = "→" }: { text: string, onClick: () => void, icon?: string }) => (
    <button 
        onClick={onClick} 
        className="group relative px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full overflow-hidden transition-all duration-300 hover:bg-white/20 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
    >
        <span className="relative z-10 flex items-center gap-3 text-white text-xs font-semibold tracking-widest">
            {text} <span className="group-hover:translate-x-1 transition-transform duration-300">{icon}</span>
        </span>
    </button>
);

// 2. HERO SECTION (Kept same)
const HeroSection = ({ onScroll }: { onScroll: () => void }) => (
  <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: 'url("/images/gallery/galleryHero.png")' }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]" />
    </div>
    
    <div className="relative z-10 text-center px-4 animate-in fade-in duration-1000 slide-in-from-bottom-10">
      <p className="text-[#FFA135] text-xs md:text-sm font-medium tracking-[0.3em] mb-6 font-mono">// Event Gallery</p>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter mb-10 drop-shadow-2xl leading-tight">
        Visual <span className={FIESTRON_GRADIENT_TEXT}>Chronicles</span>
      </h1>
      <IOSButton text="Watch Highlights" onClick={onScroll} />
    </div>
  </section>
);

// 3. BRIDGE (Kept same)
const BridgeSection = () => (
  <section className="w-full py-32 bg-[#050505] flex flex-col items-center justify-center text-center px-6 border-b border-white/5 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />
    <div className="space-y-6 max-w-2xl relative z-10">
      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-2xl md:text-4xl font-light text-white/40 leading-tight">"Every frame tells a story."</motion.p>
      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-3xl md:text-5xl font-medium text-white leading-tight">Your fest. Your <span className={FIESTRON_GRADIENT_TEXT}>memories.</span></motion.p>
    </div>
  </section>
);

// 4. HIGHLIGHTS SLIDER (Restored Logic for Static Items)
const HighlightsSlider = ({ items, onDiscoverClick }: { items: GalleryItem[], onDiscoverClick: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  const handleJumpTo = (index: number) => setCurrentIndex(index);

  const currentItem = items[currentIndex];
  // Handle both static (url) and dynamic (imageUrl) properties
  const displayUrl = currentItem.url || currentItem.imageUrl; 
  const displayTitle = currentItem.title || currentItem.caption || "Fiestron Moment";
  const displayDesc = currentItem.description || `Captured by ${currentItem.studentName || 'Fiestron Team'}`;

  const queueData = [1, 2, 3].map(offset => {
    const index = (currentIndex + offset) % items.length;
    return { ...items[index], originalIndex: index };
  });

  return (
    <div className="relative w-full h-[100vh] overflow-hidden bg-[#050505] font-sans selection:bg-pink-500/30">
      <div className="absolute inset-0 z-0">
         <AnimatePresence mode="wait">
            <motion.div key={currentIndex} className="absolute inset-0 w-full h-full" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
               <img src={displayUrl} alt="background" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/40" />
            </motion.div>
         </AnimatePresence>
      </div>

      <div className="absolute inset-0 z-30 flex flex-col lg:flex-row p-6 lg:p-12 gap-8 pointer-events-none">
        <div className="w-full lg:w-[50%] flex flex-col justify-center h-full relative pl-4 lg:pl-12 pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div key={`text-${currentIndex}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.5 }} className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-[2px] w-8 bg-gradient-to-r from-orange-500 to-purple-600" />
                    <p className="text-xs font-bold text-white uppercase tracking-[0.3em] drop-shadow-md">HIGHLIGHTS OF FIESTRON 2024</p> 
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-[0.9] tracking-tight uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                    {displayTitle}
                </h1>
                <p className="text-white text-sm md:text-base max-w-md leading-relaxed font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{displayDesc}</p>
                <div className="pt-4">
                    <IOSButton text="Browse Collections" onClick={onDiscoverClick} icon="↓" />
                </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-full lg:w-[50%] flex flex-col justify-end h-full relative pb-4 lg:pb-0 pointer-events-auto">
            <div className="flex gap-4 overflow-visible pb-8 items-end justify-end pr-6 lg:pr-12">
                 <AnimatePresence mode="popLayout">
                    {queueData.map((item: any) => (
                        <motion.div key={`card-${item.id || item._id}`} layout initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0, scale: 0.9 }} onClick={() => handleJumpTo(item.originalIndex)} className="group relative w-[100px] md:w-[120px] h-[140px] md:h-[160px] rounded-xl overflow-hidden cursor-pointer border border-white/20 hover:border-orange-500 transition-all shadow-2xl">
                            <img src={item.url || item.imageUrl} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </motion.div>
                    ))}
                 </AnimatePresence>
            </div>
            <div className="w-full flex items-center justify-end gap-6 pr-6 lg:pr-12 border-t border-white/10 pt-6">
                 <div className="flex gap-3">
                     <button onClick={handlePrev} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all backdrop-blur-sm">←</button>
                     <button onClick={handleNext} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all backdrop-blur-sm">→</button>
                 </div>
                 <div className="w-48 md:w-[500px] h-[1px] bg-white/20 relative overflow-hidden">
                    <motion.div key={currentIndex} initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 5, ease: "linear" }} className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-purple-600" />
                 </div>
                 <div className="text-4xl font-black text-white/50 leading-none tabular-nums font-mono tracking-tighter drop-shadow-lg">{String(currentIndex + 1).padStart(2, '0')}</div>
            </div>
        </div>
      </div>
    </div>
  );
};

// 5. COLLECTION CARD (Kept same)
const CollectionEntryCard = ({ title, count, image, glowColor, delay, onClick }: any) => (
    <div className="group relative h-[320px] w-full cursor-pointer" onClick={onClick}>
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${glowColor} blur opacity-0 group-hover:opacity-60 transition duration-700 ease-in-out`} />
        <div className="relative h-full w-full bg-[#080808] overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100" style={{ backgroundImage: `url(${image})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
            <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="flex justify-between items-end mb-2">
                    <div>
                         <p className="text-white/50 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Collection</p>
                         <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-white transition-colors">{title}</h3>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white text-xs bg-white/5 backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all duration-300">↗</div>
                </div>
                <div className="h-[1px] w-full bg-white/10 mb-2" />
                <p className="text-white/40 text-[10px] font-mono tracking-wide">{count}</p>
            </div>
        </div>
    </div>
);

// 6. UPLOAD MODAL (Kept same as approved version)
const UploadModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [category, setCategory] = useState("DAY 1"); 
    const [otherCategoryName, setOtherCategoryName] = useState("");
    const [isParticipant, setIsParticipant] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadForm, setUploadForm] = useState({
        studentName: '', college: '', contingentName: '', image: null as File | null
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!uploadForm.image) return alert("Please select an image!");
        setIsLoading(true);

        const formData = new FormData();
        formData.append('image', uploadForm.image);
        formData.append('studentName', uploadForm.studentName);
        formData.append('college', uploadForm.college);
        formData.append('contingentName', uploadForm.contingentName);
        const finalCategory = category === "OTHER" ? otherCategoryName.toUpperCase() : category;
        formData.append('eventCategory', finalCategory);

        try {
            await axios.post('https://fiestron-2025.onrender.com/api/upload-gallery', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("Uploaded! Sent for Approval.");
            onClose();
            setUploadForm({ studentName: '', college: '', contingentName: '', image: null });
        } catch (err) {
            console.error(err);
            alert("Upload Failed.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/90 backdrop-blur-md">
                    <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="w-full max-w-lg bg-[#0F0F0F] border border-white/10 rounded-lg shadow-2xl overflow-hidden">
                        <div className="relative px-6 py-4 bg-[#151515] flex justify-between items-center border-b border-white/10">
                            <h3 className="font-bold tracking-widest uppercase text-sm text-white">Submit Your Shot</h3>
                            <button onClick={onClose} className="text-white/50 hover:text-white">✕</button>
                        </div>
                        <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-white/50">Full Name</label>
                                        <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-sm p-3 text-white text-sm focus:border-white outline-none" 
                                            value={uploadForm.studentName} onChange={e => setUploadForm({...uploadForm, studentName: e.target.value})} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-white/50">College</label>
                                        <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-sm p-3 text-white text-sm focus:border-white outline-none" 
                                            value={uploadForm.college} onChange={e => setUploadForm({...uploadForm, college: e.target.value})} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-white/50">Collection Category</label>
                                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-sm p-3 text-white text-sm focus:border-white outline-none appearance-none">
                                        <option value="ARCHIVES">Archives (Fiestron 2024)</option>
                                        <option value="PRE-EVENT">Pre-Event (CL Meet)</option>
                                        <option disabled>──────────</option>
                                        <option value="DAY 1">Day 1, 2025</option>
                                        <option value="DAY 2">Day 2, 2025</option>
                                        <option value="CCS">CCs & Leaders</option>
                                        <option value="RANDOMS">Randoms / BTS</option>
                                        <option value="OTHER">Other (Specify)</option>
                                    </select>
                                </div>
                                {category === "OTHER" && (
                                    <input required type="text" value={otherCategoryName} onChange={(e) => setOtherCategoryName(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-sm p-3 text-white text-sm focus:border-white outline-none" placeholder="Specify Category Name..." />
                                )}
                                <div className="p-4 bg-white/5 rounded-sm border border-white/5">
                                    <p className="text-sm text-white font-medium mb-3">Are you a participant?</p>
                                    <div className="flex gap-6">
                                        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="participant" className="accent-orange-500" checked={isParticipant} onChange={() => setIsParticipant(true)} /> <span className="text-sm text-white/80">Yes</span></label>
                                        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="participant" className="accent-orange-500" checked={!isParticipant} onChange={() => setIsParticipant(false)} /> <span className="text-sm text-white/80">No</span></label>
                                    </div>
                                    {isParticipant && (
                                        <div className="mt-4 pt-4 border-t border-white/10">
                                            <input type="text" className="w-full bg-black/50 border border-orange-500/50 rounded-sm p-3 text-white text-sm focus:border-orange-500 outline-none" placeholder="Enter CC Name..." 
                                            value={uploadForm.contingentName} onChange={e => setUploadForm({...uploadForm, contingentName: e.target.value})}/>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-white/50">Upload Photo</label>
                                    <div className="relative border border-dashed border-white/20 rounded-sm p-8 text-center hover:bg-white/5 transition-colors cursor-pointer group">
                                        <input type="file" accept="image/*" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => setUploadForm({...uploadForm, image: e.target.files ? e.target.files[0] : null})} />
                                        <p className="text-white/40 group-hover:text-white transition-colors text-sm">{uploadForm.image ? uploadForm.image.name : "Click or Drag to upload image"}</p>
                                    </div>
                                </div>
                                <button type="submit" disabled={isLoading} className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-sm hover:bg-gray-200 transition-colors">
                                    {isLoading ? "Uploading..." : "Submit for Approval"}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// 7. MAIN GALLERY COMPONENT
const Gallery: React.FC = () => {
  const [activeCollection, setActiveCollection] = useState<'archives' | 'latest' | 'preevent' | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [allPhotos, setAllPhotos] = useState<GalleryItem[]>([]);
  
  const galleryRef = useRef<HTMLDivElement>(null);
  const collectionsRef = useRef<HTMLDivElement>(null);

  const scrollToGallery = () => galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToCollections = () => collectionsRef.current?.scrollIntoView({ behavior: 'smooth' });

  // --- FETCH APPROVED PHOTOS ON LOAD (For Latest/Pre-Event only) ---
  useEffect(() => {
    const fetchPhotos = async () => {
        try {
            const res = await axios.get('https://fiestron-2025.onrender.com/api/gallery-public');
            setAllPhotos(res.data);
        } catch (err) {
            console.error("Failed to load gallery", err);
        }
    };
    fetchPhotos();
  }, []);

  // --- SORT PHOTOS INTO COLLECTIONS ---
  // If you upload to Archives via Admin, they will be added here dynamically.
  // BUT the default 22 are from 'staticArchiveItems'.
  const dynamicArchives = allPhotos.filter(p => p.eventCategory === 'ARCHIVES');
  
  // COMBINE Static + Dynamic for the Archives Collection View
  const finalArchives = [...staticArchiveItems, ...dynamicArchives];

  const preEventData = allPhotos.filter(p => p.eventCategory === 'PRE-EVENT');
  // 'Latest' includes everything that isn't Archive or Pre-Event
  const latestData = allPhotos.filter(p => p.eventCategory !== 'ARCHIVES' && p.eventCategory !== 'PRE-EVENT');

  return (
    <>
      <Header />
      <div className="bg-[#050505] min-h-screen font-sans text-white selection:bg-purple-500/30">
        <HeroSection onScroll={scrollToGallery} />
        <BridgeSection />
        
        <div ref={galleryRef} />
        {/* --- CRITICAL FIX: Pass STATIC items to Slider --- */}
        <HighlightsSlider items={staticArchiveItems} onDiscoverClick={scrollToCollections} />
        
        <div ref={collectionsRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-32 min-h-[80vh]">
          <AnimatePresence mode="wait">
            {activeCollection === null && (
                <motion.div key="menu" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5 }}>
                    
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b border-white/10 pb-8 gap-6">
                        <div>
                            <h2 className={`text-sm font-bold mb-2 tracking-[0.2em] uppercase ${FIESTRON_GRADIENT_TEXT}`}>/ Library</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-white">Select Collection</h3>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <p className="text-white/50 text-[10px] tracking-widest uppercase font-bold text-right">Got a capture that shows your vision of the fest?</p>
                            <button onClick={() => setIsUploadOpen(true)} className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all rounded-3xl">
                                Upload it here
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Archives Card - Uses a4.png (Static) */}
                        <CollectionEntryCard 
                            title="Archives" 
                            count={`${finalArchives.length} Items • Fiestron 2024`} 
                            image="/images/gallery/a4.png" 
                            glowColor="from-blue-600 to-cyan-600" 
                            delay={0} 
                            onClick={() => setActiveCollection('archives')} 
                        />
                        {/* Latest Card - Dynamic */}
                        <CollectionEntryCard 
                            title="Latest" 
                            count={`${latestData.length} Items • Fiestron 2025`} 
                            image={latestData.length > 0 ? latestData[0].imageUrl : "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070"} 
                            glowColor="from-purple-600 to-pink-600" 
                            delay={0.1} 
                            onClick={() => setActiveCollection('latest')} 
                        />
                        {/* Pre-Event Card - Dynamic */}
                        <CollectionEntryCard 
                            title="Pre-Event" 
                            count={`${preEventData.length} Items • CL Meet`}  
                            image={preEventData.length > 0 ? preEventData[0].imageUrl : "/images/gallery/pre-event/clmeet1.png"} 
                            glowColor="from-orange-600 to-red-600" 
                            delay={0.2} 
                            onClick={() => setActiveCollection('preevent')} 
                        />
                    </div>
                </motion.div>
            )}
            
            {/* Pass COMBINED (Static + Dynamic) list to Archives view */}
            {activeCollection === 'archives' && <Archives items={finalArchives} onBack={() => setActiveCollection(null)} />}
            
            {/* Pass DYNAMIC lists to others */}
            {activeCollection === 'latest' && <Latest items={latestData} onBack={() => setActiveCollection(null)} />}
            {activeCollection === 'preevent' && <PreEvent items={preEventData} onBack={() => setActiveCollection(null)} />}
          </AnimatePresence>
        </div>
      </div>
      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
      <Footer />
    </>
  );
};

export default Gallery;