import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Header from './Header';
import Footer from './Footer';

// --- Type Definition ---
interface GalleryItem {
  id: number;
  category: '2024' | '2025';
  title: string;
  url: string;
  alt: string;
}

// --- Data Generation ---
const generateGalleryData = (): GalleryItem[] => {
  const items: GalleryItem[] = [];
  
  const titles = [
    "Hackathon Victory", "The Crowd", "Leaders Meet", "Workshop Focus", "Code Quest", 
    "Candid Moments", "Stage Lights", "Setup Vibes", "Team Spirit", "Night Event",
    "Registration Buzz", "Main Hall", "Tech Talk", "Gaming Zone", "Prize Distribution",
    "Faculty Visit", "Volunteers", "Opening Ceremony", "Closing Night", "Audience Cheering",
    "Project Demo", "Final Group"
  ];

  for (let i = 1; i <= 22; i++) {
    items.push({
      id: i,
      category: '2024', 
      title: titles[i-1] || `Fiestron Archive ${i}`,
      url: `/images/gallery/a${i}.png`, 
      alt: `Fiestron 2024 Event Highlight ${i}`
    });
  }
  return items;
};

const initialGalleryItems = generateGalleryData();

// --- Messages ---
const preEventMessages = [
  "Moments are still cooking… come back later 🏃‍♀️",
  "Moments unlock once the event begins. 😊",
  "Loading… the event hasn’t even happened yet. 🤭",
  "Memories loading… 0% complete. 🫤",
  "Brb, event hasn’t started. 🫣"
];

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<'all' | '2024' | '2025'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  const categories: ('all' | '2024' | '2025')[] = ['all', '2024', '2025'];

  // Filter items
  const filteredItems = useMemo(() => {
    if (filter === 'all') return initialGalleryItems;
    return initialGalleryItems.filter(item => item.category === filter);
  }, [filter]);

  // Group items for "all" view
  const groupedItems = useMemo(() => {
    if (filter !== 'all') return null;

    const uniqueCategories = Array.from(new Set(initialGalleryItems.map(item => item.category))).sort();
    const groups = uniqueCategories.map(cat => ({
      category: cat as '2024' | '2025',
      items: initialGalleryItems.filter(item => item.category === cat)
    }));

    if (!groups.find(g => g.category === '2025')) {
      groups.push({ category: '2025', items: [] });
    }

    return groups;
  }, [filter]);

  // Random message
  const randomPreEventMessage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * preEventMessages.length);
    return preEventMessages[randomIndex];
  }, []);

  // --- Lightbox Logic ---
  const openLightbox = (item: GalleryItem) => {
    const index = filteredItems.findIndex(i => i.id === item.id);
    setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, showNext, showPrev]);

  // --- Components ---

  const GalleryItemCard: React.FC<{ item: GalleryItem }> = ({ item }) => (
    <div
      onClick={() => openLightbox(item)}
      className="group relative mb-6 break-inside-avoid cursor-zoom-in overflow-hidden border border-white/5 bg-white/[0.02] hover:border-pink-500/50 transition-all duration-300 shadow-2xl"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-4">
        <h4 className='text-white font-bold text-lg drop-shadow-md translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
          {item.title}
        </h4>
        <div className="h-0.5 w-12 bg-gradient-to-r from-orange-500 to-pink-500 mt-2 mb-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        <span className="text-gray-300 text-[10px] uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
          {item.category} Collection
        </span>
      </div>

      <img
        src={item.url}
        alt={item.alt}
        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out rounded-none"
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://placehold.co/600x400/1a1a1a/FFF?text=Img+Not+Found`;
        }}
      />
    </div>
  );

  const PreEventMessage: React.FC = () => (
    <div className="text-center p-12 my-12 border border-dashed border-white/10 mx-auto max-w-2xl bg-white/[0.02]">
      <p className="text-xl md:text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600 mb-2">
        {randomPreEventMessage}
      </p>
    </div>
  );

  return (
    <>
      <Header />

      <section className="relative pt-32 pb-24  min-h-screen bg-[#050505] text-white font-sans selection:bg-pink-500/30">
        
        {/* Grainy Noise Background */}
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"  />
        
        {/* Ambient Glow */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]  bg-black blur-[120px] rounded-full pointer-events-none z-0" />

        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 z-10">

          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 mb-4 tracking-[0.3em] uppercase">
              // Visual Archives
            </h2>

      <h3 className="text-4xl md:text-8xl font-black tracking-tighter text-white mb-6 ">

              Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 stroke-white">Highlights</span>

            </h3>


            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              A curated collection of moments, energy, and innovation from previous years. 
              Witness the legacy of KC College's Tech Fest.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-16 flex-wrap">
            {categories.map(cat => {
              const active = filter === cat;
              const label = cat === 'all' ? 'ALL YEARS' : cat === '2024' ? '2024 ARCHIVE' : '2025 LIVE';

              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-8 py-3 font-bold text-xs uppercase tracking-widest border transition-all duration-300 rounded-full
                    ${active
                      ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                      : 'bg-transparent text-gray-500 border-white/10 hover:border-white/40 hover:text-white'
                    }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Masonry Grid Layout */}
          {filter === 'all' ? (
            groupedItems?.map((group, index) => (
              <React.Fragment key={group.category}>
                
                {/* --- CHANGED: Header now renders for 2025 even if empty --- */}
                <div className={`mt-24 mb-12 text-center ${index > 0 ? 'border-t border-white/10 pt-16' : ''}`}>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight inline-flex items-center gap-3">
                    <span className="text-white">{group.category}</span>
                    <span className="text-transparent bg-clip-text text-white/50">
                      {group.category === '2024' ? 'Archives' : 'Live Feed'}
                    </span>
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mt-4 rounded-full"></div>
                </div>

                {group.items.length > 0 ? (
                  <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    {group.items.map(item => (
                      <GalleryItemCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  group.category === '2025' && <PreEventMessage />
                )}
              </React.Fragment>
            ))
          ) : (
            <>
              {filteredItems.length > 0 ? (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                  {filteredItems.map(item => (
                    <GalleryItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                 <PreEventMessage />
              )}
            </>
          )}

        </div>

        {/* --- LIGHTBOX MODAL --- */}
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <div
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-xl transition-all duration-300"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-[160] p-2 text-white/50 hover:text-white hover:rotate-90 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* Previous Button */}
            <button
              onClick={showPrev}
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-[160] p-4 bg-black/50 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>

            {/* Next Button */}
            <button
              onClick={showNext}
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-[160] p-4 bg-black/50 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>

            {/* Content Container */}
            <div
              className="relative w-full h-full max-w-7xl flex flex-col items-center justify-center p-4 md:p-10"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative max-h-[85vh] flex flex-col items-center">
                <img
                  src={filteredItems[lightboxIndex].url}
                  alt={filteredItems[lightboxIndex].alt}
                  className="max-h-[75vh] max-w-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
                />
                
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {filteredItems[lightboxIndex].title}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-orange-500 text-xs font-bold uppercase tracking-wider">
                      {filteredItems[lightboxIndex].category}
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="text-white/40 text-sm">
                      Image {lightboxIndex + 1} of {filteredItems.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default Gallery;