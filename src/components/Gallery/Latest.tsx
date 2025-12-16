import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types (Matching Gallery.tsx) ---
import { GalleryItem } from './Gallery'; 

interface LatestProps {
  items: GalleryItem[];
  onBack: () => void;
}

// --- RANDOM FEST CAPTIONS POOL ---
const FEST_CAPTIONS = [
    "The energy was absolutely electric! ⚡",
    "Moments that define Fiestron.",
    "Pure chaos, pure magic. ✨",
    "The crowd went wild for this one!",
    "Making history at Fiestron 2025.",
    "Vibes on point. 📸",
    "Just another legendary moment.",
    "Caught in the action!",
    "This is what the fest is all about.",
    "Unfiltered joy and madness.",
    "Core memory unlocked. 🔓",
    "The hype was real."
];

const Latest: React.FC<LatestProps> = ({ items, onBack }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState("ALL");
  
  // --- Mouse Tracking (Premium Effect) ---
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  };

  // --- FILTER LOGIC ---
  const filteredItems = filter === "ALL" 
    ? items 
    : items.filter(item => item.eventCategory === filter);

  // --- HELPER: GET RANDOM CAPTION ---
  // Uses the index to pick a caption so it stays consistent for that photo
  const getCaption = (index: number) => FEST_CAPTIONS[index % FEST_CAPTIONS.length];

  // --- LIGHTBOX HANDLERS ---
  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % filteredItems.length));
  }, [filteredItems.length]);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length));
  }, [filteredItems.length]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, showNext, showPrev]);

  const activeItem = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  // --- FILTER BUTTON COMPONENT ---
  const FilterBtn = ({ label, value }: { label: string, value: string }) => (
    <button 
      onClick={() => { setFilter(value); setSelectedIndex(null); }}
      className={`px-5 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest border transition-all duration-300 
      ${filter === value 
        ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
        : 'bg-transparent text-white/40 border-white/10 hover:border-white/40 hover:text-white'}`}
    >
      {label}
    </button>
  );

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full bg-[#050505] text-white overflow-hidden relative"
    >
        {/* --- PREMIUM RIPPLE --- */}
        <div 
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
            style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(219, 39, 119, 0.08), transparent 40%)`,
            }}
        />

      <motion.div
        key="latest-content"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} 
        className="relative z-10 w-full px-8 md:px-16 py-12"
      >
        {/* --- HEADER & FILTERS --- */}
        <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between mb-16 border-b border-white/5 pb-8 gap-8">
            
            {/* Title & Back */}
            <div className="space-y-6">
                <button onClick={onBack} className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors">
                    <span className="text-lg transition-transform group-hover:-translate-x-1">←</span>
                    <span className="text-xs uppercase tracking-[0.25em] font-medium">Back</span>
                </button>
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Latest Drops</h2>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap gap-3">
                <FilterBtn label="All" value="ALL" />
                <FilterBtn label="Day 1" value="DAY 1" />
                <FilterBtn label="Day 2" value="DAY 2" />
                <FilterBtn label="CCs" value="CCS" />
                <FilterBtn label="Randoms" value="RANDOMS" />
            </div>
        </div>

        {/* --- MASONRY GRID --- */}
        {filteredItems.length === 0 ? (
             <div className="w-full h-64 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-xl text-white/30">
                <span className="text-2xl mb-2">📸</span>
                <p className="text-sm uppercase tracking-widest">No photos in this category yet.</p>
             </div>
        ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item, index) => (
                <motion.div 
                    layout
                    key={item._id || item.id} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    onClick={() => openLightbox(index)}
                    className="group relative w-full break-inside-avoid mb-6 cursor-pointer overflow-hidden bg-gray-900 border border-white/5"
                >
                    <img 
                        src={item.imageUrl || item.url} 
                        alt="Gallery Image" 
                        className="w-full h-auto object-cover transition-transform duration-700 scale-100 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                        loading="lazy" 
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        {/* Category Badge */}
                        <span className="text-[10px] bg-pink-600 w-max px-2 py-1 rounded-sm font-bold uppercase mb-2">
                            {item.eventCategory}
                        </span>
                        
                        {/* Random Fest Description */}
                        <p className="text-white font-medium text-lg tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            {getCaption(index)}
                        </p>
                        
                        <div className="h-[1px] w-12 bg-pink-500 mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>
                </motion.div>
            ))}
            </div>
        )}
      </motion.div>

      {/* --- LIGHTBOX --- */}
      <AnimatePresence>
        {selectedIndex !== null && activeItem && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center"
                onClick={closeLightbox}
            >
                {/* Controls */}
                <button onClick={(e) => { e.stopPropagation(); closeLightbox(); }} className="absolute top-8 right-8 z-50 p-2 text-white/40 hover:text-white transition-colors">✕</button>
                <button onClick={showPrev} className="absolute left-8 top-1/2 -translate-y-1/2 z-50 p-4 text-white/20 hover:text-white transition-colors hover:-translate-x-1">←</button>
                <button onClick={showNext} className="absolute right-8 top-1/2 -translate-y-1/2 z-50 p-4 text-white/20 hover:text-white transition-colors hover:translate-x-1">→</button>

                <div className="relative w-full h-full max-w-5xl flex flex-col items-center justify-center p-6 md:p-12 pointer-events-none">
                    <motion.div
                        key={activeItem._id || activeItem.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="relative pointer-events-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <img
                            src={activeItem.imageUrl || activeItem.url}
                            alt="Gallery"
                            className="max-h-[70vh] w-auto object-contain bg-black border border-white/5" 
                        />
                    </motion.div>
                    
                    <motion.div 
                        key={`text-${activeItem._id || activeItem.id}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="mt-6 text-center max-w-xl pointer-events-auto"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        {/* Generic Title & Random Description */}
                        <h2 className="text-2xl font-medium text-white mb-2 tracking-tight">Fiestron Capture</h2>
                        <p className="text-white/50 text-sm font-light leading-relaxed">
                            <span className="text-pink-500 font-bold uppercase text-xs tracking-wider mr-2">[{activeItem.eventCategory}]</span>
                            {getCaption(selectedIndex)}
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Latest;