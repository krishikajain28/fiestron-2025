import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// --- IMPORTS FROM CHILD COMPONENTS ---
import Archives from './Archives';
import Latest from './Latest';
import PreEvent from './PreEvent';

// --- IMPORTS FROM PARENT FOLDER ---
import Header from '../Header';
import Footer from '../Footer';

// --- THEME CONSTANTS (Your Original Palette) ---
const FIESTRON_GRADIENT_TEXT = "bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-pink-700 to-purple-700";
const FIESTRON_BORDER_GRADIENT = "group-hover:border-transparent group-hover:ring-2 group-hover:ring-orange-500 group-hover:ring-offset-2 group-hover:ring-offset-black";
const BTN_GRADIENT = "bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600";

// --- Type Definition ---
export interface GalleryItem {
  id: number;
  category: 'archives' | 'latest' | 'preevent';
  title: string;
  url: string;
  alt: string;
  description?: string;
  location?: string;
}

// --- Data Generation ---
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
  
  for (let i = 1; i <= 22; i++) {
    items.push({
      id: i,
      category: 'archives',
      title: imageTitles[i] || `Fiestron Moment ${i}`,
      url: `/images/gallery/a${i}.png`,
      alt: `Fiestron Event - ${imageTitles[i]}`,
      description: "A spectacular moment captured in time at Fiestron.",
      location: "HIGHLIGHTS OF FIESTRON"
    });
  }
  return items;
};

const initialGalleryItems = generateGalleryData();

// --- COMPONENTS ---

const HeroSection = ({ onScroll }: { onScroll: () => void }) => (
  <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
    <div
      className="absolute inset-0 z-0 bg-cover bg-center"
      style={{ backgroundImage: 'url("/images/gallery/galleryHero.png")' }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      {/* Overlay Gradient to blend with dark theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]" />
    </div>
    
    <div className="relative z-10 text-center px-4 animate-in fade-in duration-1000 slide-in-from-bottom-10">
      <p className="text-[#FFA135] text-xs md:text-sm font-medium tracking-[0.3em] mb-6 font-mono">
        // Event Gallery
      </p>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter mb-10 drop-shadow-2xl leading-tight">
        Visual <span className={FIESTRON_GRADIENT_TEXT}>Chronicles</span>
      </h1>
      
      <button
        onClick={onScroll}
        className="group relative px-10 py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-full overflow-hidden transition-all duration-500 ease-out hover:scale-105 hover:border-orange-500 hover:shadow-[0_0_50px_-10px_rgba(250,126,30,0.6)]"
      >
        <span className="relative z-10 flex items-center gap-2 text-white text-xs md:text-sm font-bold uppercase tracking-widest group-hover:text-white">
           Watch Highlights 
           <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </span>
        {/* Hover Gradient Background */}
        <div className={`absolute inset-0 ${BTN_GRADIENT} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      </button>

    </div>
  </section>
);

const BridgeSection = () => (
  <section className="w-full py-32 bg-[#050505] flex flex-col items-center justify-center text-center px-6 border-b border-white/5 relative overflow-hidden">
    {/* Subtle Gradient Glow in Background */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />
    
    <div className="space-y-6 max-w-2xl relative z-10">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl md:text-4xl font-light text-white/40 leading-tight"
      >
        "Every frame tells a story."
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-3xl md:text-5xl font-medium text-white leading-tight"
      >
        Your fest. Your <span className={FIESTRON_GRADIENT_TEXT}>memories.</span>
      </motion.p>
    </div>
  </section>
);

const HighlightsSlider = ({ items, onDiscoverClick }: { items: GalleryItem[], onDiscoverClick: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleJumpTo = (index: number) => {
    setCurrentIndex(index);
  };

  const currentItem = items[currentIndex];

  const queueData = [1, 2, 3].map(offset => {
    const index = (currentIndex + offset) % items.length;
    return { ...items[index], originalIndex: index };
  });

  return (
    <div className="relative w-full h-[100vh] overflow-hidden bg-[#050505] font-sans selection:bg-pink-500/30">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
         <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
               <img src={currentItem.url} alt="background" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/20" /> {/* Slight tint for clarity */}
            </motion.div>
         </AnimatePresence>
      </div>

      {/* CONTENT */}
      <div className="absolute inset-0 z-30 flex flex-col lg:flex-row p-6 lg:p-12 gap-8 pointer-events-none">
        
        {/* LEFT TEXT */}
        <div className="w-full lg:w-[50%] flex flex-col justify-center h-full relative pl-4 lg:pl-12 pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
                key={`text-${currentItem.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
                <div className="flex items-center gap-3">
                    <div className={`h-[2px] w-8 ${BTN_GRADIENT}`} />
                    <p className="text-xs font-bold text-white uppercase tracking-[0.3em] drop-shadow-md">
                        {currentItem.location}
                    </p>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white leading-[0.9] tracking-tight uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                    {currentItem.title.split(' ')[0]}
                    <br />
                    <span className="text-white/90">{currentItem.title.split(' ').slice(1).join(' ')}</span>
                </h1>

                <p className="text-white text-sm md:text-base max-w-md leading-relaxed font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {currentItem.description}
                </p>

                <div className="pt-4">
                    <button 
                        onClick={onDiscoverClick}
                        className="group px-8 py-3 bg-white/10 border border-white/20 rounded-full text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:border-pink-500 transition-all backdrop-blur-md shadow-lg overflow-hidden relative"
                    >
                        <span className="relative z-10 group-hover:text-white transition-colors">Browse collections</span>
                        <div className={`absolute inset-0 ${BTN_GRADIENT} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    </button>
                </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT QUEUE */}
        <div className="w-full lg:w-[50%] flex flex-col justify-end h-full relative pb-4 lg:pb-0 pointer-events-auto">
            <div className="flex gap-4 overflow-visible pb-8 items-end justify-end pr-6 lg:pr-12">
                 <AnimatePresence mode="popLayout">
                    {queueData.map((item) => (
                        <motion.div
                          key={`card-${item.id}`}
                          layout
                          initial={{ x: 50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -20, opacity: 0, scale: 0.9 }}
                          onClick={() => handleJumpTo(item.originalIndex)}
                          className="group relative w-[100px] md:w-[120px] h-[140px] md:h-[160px] rounded-xl overflow-hidden cursor-pointer border border-white/20 hover:border-orange-500 transition-all shadow-2xl"
                        >
                            <img src={item.url} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                            <div className="absolute bottom-2 left-2">
                                <p className="text-[8px] font-bold text-white uppercase drop-shadow-md truncate">{item.title}</p>
                            </div>
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
                    <motion.div 
                        key={currentIndex}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5, ease: "linear" }}
                        className={`absolute top-0 left-0 h-full ${BTN_GRADIENT}`} // USING YOUR GRADIENT HERE
                    />
                 </div>
                 <div className="text-4xl font-black text-white/50 leading-none tabular-nums font-mono tracking-tighter drop-shadow-lg">
                     {String(currentIndex + 1).padStart(2, '0')}
                 </div>
            </div>
        </div>

      </div>
    </div>
  );
};

// 4. COLLECTION CARD (Updated with Fiestron Colors)
const CollectionEntryCard = ({ title, count, image, delay, onClick }: { title: string, count: string, image: string, delay: number, onClick: () => void }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: delay }}
        onClick={onClick}
        className="group relative h-[280px] rounded-md overflow-hidden cursor-pointer border border-white/10 hover:border-transparent transition-all duration-500 bg-[#0A0A0A]"
    >
        {/* The Animated Gradient Border Effect */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md p-[1px] ${BTN_GRADIENT}`} style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)' }} />
        
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100" style={{ backgroundImage: `url(${image})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6">
            <div className="flex justify-between items-end mb-2">
                <div>
                     <p className="text-orange-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Collection</p>
                     <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-pink-500 transition-colors">{title}</h3>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white text-xs group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-pink-600 group-hover:border-transparent transition-all">
                    ↗
                </div>
            </div>
            <div className="h-[1px] w-full bg-white/10 group-hover:bg-white/30 transition-colors mb-2" />
            <p className="text-white/40 text-xs font-mono">{count}</p>
        </div>
    </motion.div>
);

// 5. UPLOAD MODAL (Updated Logic for Categories & Other)
const UploadModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [category, setCategory] = useState("GENERAL");
    const [otherCategoryName, setOtherCategoryName] = useState(""); // For "Other" input
    const [isParticipant, setIsParticipant] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Final category to send to backend
        const finalCategory = category === "OTHER" ? otherCategoryName : category;
        console.log("Submitting Category:", finalCategory);

        setTimeout(() => {
            setIsLoading(false);
            onClose();
            alert("Upload Submitted for Approval!");
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/90 backdrop-blur-md"
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 20 }}
                        className="w-full max-w-lg bg-[#0F0F0F] border border-white/10 rounded-lg shadow-2xl overflow-hidden"
                    >
                        {/* Header with Gradient Line */}
                        <div className="relative px-6 py-4 bg-[#151515] flex justify-between items-center">
                            <h3 className={`font-bold tracking-widest uppercase text-sm ${FIESTRON_GRADIENT_TEXT}`}>Submit Your Shot</h3>
                            <button onClick={onClose} className="text-white/50 hover:text-white">✕</button>
                            <div className={`absolute bottom-0 left-0 w-full h-[1px] ${BTN_GRADIENT}`} />
                        </div>

                        <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                {/* Basic Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-white/50">Full Name</label>
                                        <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-sm p-3 text-white text-sm focus:border-orange-500 outline-none transition-colors" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-white/50">College</label>
                                        <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-sm p-3 text-white text-sm focus:border-orange-500 outline-none transition-colors" placeholder="KC College" />
                                    </div>
                                </div>

                                {/* CATEGORY SELECTION (Updated) */}
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-white/50">Category</label>
                                    <select 
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-sm p-3 text-white text-sm focus:border-orange-500 outline-none appearance-none"
                                    >
                                        <option value="GENERAL">General / Campus Vibes</option>
                                        <option value="CL MEET">CL Meet (Pre-Event)</option>
                                        <option value="DAY 1">Day 1 - 2025</option>
                                        <option value="DAY 2">Day 2 - 2025</option>
                                        <option value="RANDOMS">Randoms / BTS</option>
                                        <option value="OTHER">Other (Specify)</option>
                                    </select>
                                </div>

                                {/* CONDITIONAL: If "Other" is selected, show this input */}
                                <AnimatePresence>
                                    {category === "OTHER" && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <input 
                                                required 
                                                type="text" 
                                                value={otherCategoryName}
                                                onChange={(e) => setOtherCategoryName(e.target.value)}
                                                className="w-full bg-black/50 border border-pink-500/50 rounded-sm p-3 text-white text-sm focus:border-pink-500 outline-none" 
                                                placeholder="e.g. Backstage Chaos, After Party..." 
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Participant Toggle */}
                                <div className="p-4 bg-white/5 rounded-sm border border-white/5">
                                    <p className="text-sm text-white font-medium mb-3">Are you a participant in Fiestron 2025?</p>
                                    <div className="flex gap-6">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="participant" className="accent-orange-500" checked={isParticipant} onChange={() => setIsParticipant(true)} />
                                            <span className="text-sm text-white/80">Yes</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="participant" className="accent-orange-500" checked={!isParticipant} onChange={() => setIsParticipant(false)} />
                                            <span className="text-sm text-white/80">No</span>
                                        </label>
                                    </div>

                                    {/* Conditional CC Name */}
                                    <AnimatePresence>
                                        {isParticipant && (
                                            <motion.div 
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="mt-4 pt-4 border-t border-white/10">
                                                    <label className="text-[10px] uppercase tracking-widest text-orange-400 mb-2 block">
                                                        Enter CC Name (+1000 Points)
                                                    </label>
                                                    <input type="text" className="w-full bg-black/50 border border-orange-500/50 rounded-sm p-3 text-white text-sm focus:border-orange-500 outline-none" placeholder="e.g. TECH SQUAD" />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* File Upload */}
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-white/50">Upload Photo</label>
                                    <div className="relative border border-dashed border-white/20 rounded-sm p-8 text-center hover:bg-white/5 transition-colors cursor-pointer group">
                                        <input type="file" accept="image/*" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                        <p className="text-white/40 group-hover:text-white transition-colors text-sm">Click or Drag to upload image</p>
                                        <p className="text-white/20 text-[10px] mt-1">MAX 5MB (JPG, PNG)</p>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className={`w-full py-4 text-white font-bold uppercase tracking-widest rounded-sm disabled:opacity-50 transition-all hover:scale-[1.01] ${BTN_GRADIENT}`}
                                >
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

// 6. MAIN GALLERY COMPONENT
const Gallery: React.FC = () => {
  const [activeCollection, setActiveCollection] = useState<'archives' | 'latest' | 'preevent' | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  
  const galleryRef = useRef<HTMLDivElement>(null);
  const collectionsRef = useRef<HTMLDivElement>(null);

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCollections = () => {
    collectionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <div className="bg-[#050505] min-h-screen font-sans text-white selection:bg-purple-500/30">
        
        <HeroSection onScroll={scrollToGallery} />
        <BridgeSection />
        
        <div ref={galleryRef} />
        <HighlightsSlider items={initialGalleryItems} onDiscoverClick={scrollToCollections} />
        
        {/* COLLECTIONS SECTION */}
        <div ref={collectionsRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-32 min-h-[80vh]">
          
          <AnimatePresence mode="wait">
            {/* VIEW 1: MENU */}
            {activeCollection === null && (
                <motion.div
                    key="menu"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b border-white/10 pb-8 gap-6">
                        <div>
                            <h2 className={`text-sm font-bold mb-2 tracking-[0.2em] uppercase ${FIESTRON_GRADIENT_TEXT}`}>
                                / Library
                            </h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-white">
                                Select Collection
                            </h3>
                        </div>
                        
                        {/* THE UPLOAD BUTTON - NOW WITH GRADIENT */}
                        <button 
                            onClick={() => setIsUploadOpen(true)}
                            className="group flex items-center gap-3 px-6 py-3 border border-white/20 rounded-sm transition-all hover:border-transparent relative overflow-hidden"
                        >
                            <div className={`absolute inset-0 ${BTN_GRADIENT} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                            
                            <span className="relative z-10 w-2 h-2 rounded-full bg-red-500 animate-pulse group-hover:bg-white" />
                            <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-white group-hover:text-white transition-colors">
                                Upload Your Moment
                            </span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <CollectionEntryCard 
                            title="Archives" 
                            count="22 Items • Fiestron 2024"
                            image="/images/gallery/a4.png" 
                            delay={0}
                            onClick={() => setActiveCollection('archives')}
                        />
                         <CollectionEntryCard 
                            title="Latest" 
                            count="Coming Soon • Fiestron 2025"
                            image="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070" 
                            delay={0.1}
                            onClick={() => setActiveCollection('latest')}
                        />
                         <CollectionEntryCard 
                            title="Pre-Event" 
                            count="Coming Soon • Teasers"
                            image="https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2070" 
                            delay={0.2}
                            onClick={() => setActiveCollection('preevent')}
                        />
                    </div>
                </motion.div>
            )}

            {/* VIEW 2: ARCHIVES */}
            {activeCollection === 'archives' && (
                <Archives 
                    items={initialGalleryItems}
                    onBack={() => setActiveCollection(null)}
                />
            )}

            {/* VIEW 3: LATEST */}
            {activeCollection === 'latest' && (
                <Latest onBack={() => setActiveCollection(null)} />
            )}

            {/* VIEW 4: PRE-EVENT */}
            {activeCollection === 'preevent' && (
                <PreEvent onBack={() => setActiveCollection(null)} />
            )}
          </AnimatePresence>

        </div>
      </div>
      
      {/* RENDER THE UPLOAD MODAL */}
      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />

      <Footer />
    </>
  );
};

export default Gallery;