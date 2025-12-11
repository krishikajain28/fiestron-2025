import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
// Assuming Gallery.tsx is in the same directory and exports the GalleryItem interface
import { GalleryItem } from './Gallery'; 

// Component Props: It expects the array of items and a function to go back.
interface PreEventProps {
    items: GalleryItem[]; 
    onBack: () => void;
}

const PreEvent: React.FC<PreEventProps> = ({ items, onBack }) => {
    // State to track which image is open in the lightbox (index in the items array)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    
    // --- Mouse Tracking for "Premium Smoothness" ---
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

    // --- Handlers ---
    const openLightbox = (index: number) => setSelectedIndex(index);
    const closeLightbox = () => setSelectedIndex(null);

    // Navigation handlers are wrapped in useCallback for performance and dependency management
    const showNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % items.length));
    }, [items.length, setSelectedIndex]);

    const showPrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + items.length) % items.length));
    }, [items.length, setSelectedIndex]);

    // Keyboard Navigation (Uses useEffect)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, showNext, showPrev, closeLightbox]);

    // Derived state for the currently active item
    const activeItem = selectedIndex !== null ? items[selectedIndex] : null;

    return (
        <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="min-h-screen w-full bg-[#050505] text-white overflow-hidden relative"
        >
            
            {/* --- PREMIUM RIPPLE (Background lighting effect) --- */}
            <div 
                className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                style={{
                    // Subtle orange glow for the Pre-Event section
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 161, 53, 0.06), transparent 40%)`,
                }}
            />

            <motion.div
                key="preevent-content"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} 
                className="relative z-10 w-full px-8 md:px-16 py-12"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-16 border-b border-white/5 pb-6">
                    <div className="flex items-center gap-6">
                        <button 
                            onClick={onBack}
                            className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors"
                        >
                            <span className="text-lg transition-transform group-hover:-translate-x-1">←</span>
                            <span className="text-xs uppercase tracking-[0.25em] font-medium">Back</span>
                        </button>
                        <div className="h-4 w-[1px] bg-white/10" />
                        <h2 className="text-xl font-light text-white tracking-wide">
                            Pre-Event Buzz (CL Meet)
                        </h2>
                    </div>
                </div>

                {/* --- MASONRY GRID (Same as Archives) --- */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    {items.map((item, index) => (
                        <motion.div 
                            key={item.id} 
                            // Individual item entrance animation
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            onClick={() => openLightbox(index)}
                            className="group relative w-full break-inside-avoid mb-6 cursor-pointer overflow-hidden bg-gray-900 border border-white/5"
                        >
                            {/* Image */}
                            <img 
                                src={item.url} 
                                alt={item.alt} 
                                className="w-full h-auto object-cover transition-transform duration-700 scale-100 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                                loading="lazy" 
                            />
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <p className="text-white font-medium text-lg tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {item.title}
                                </p>
                                <div className="h-[1px] w-12 bg-orange-500 mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* --- LIGHTBOX (Identical to Archives) --- */}
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
                        {/* Close Button */}
                        <button 
                            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                            className="absolute top-8 right-8 z-50 p-2 text-white/40 hover:text-white transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        </button>

                        {/* Previous Button */}
                        <button 
                            onClick={showPrev}
                            className="absolute left-8 top-1/2 -translate-y-1/2 z-50 p-4 text-white/20 hover:text-white transition-colors hover:-translate-x-1"
                        >
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M15 19l-7-7 7-7" /></svg>
                        </button>

                        {/* Next Button */}
                        <button 
                            onClick={showNext}
                            className="absolute right-8 top-1/2 -translate-y-1/2 z-50 p-4 text-white/20 hover:text-white transition-colors hover:translate-x-1"
                        >
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M9 5l7 7-7 7" /></svg>
                        </button>

                        {/* --- IMAGE & TEXT CONTAINER --- */}
                        <div className="relative w-full h-full max-w-5xl flex flex-col items-center justify-center p-6 md:p-12 pointer-events-none">
                            
                            {/* Image */}
                            <motion.div
                                key={activeItem.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="relative pointer-events-auto shadow-2xl"
                                onClick={(e) => e.stopPropagation()} 
                            >
                                <img
                                    src={activeItem.url}
                                    alt={activeItem.alt}
                                    className="max-h-[70vh] w-auto object-contain bg-black border border-white/5" 
                                />
                            </motion.div>
                            
                            {/* Text */}
                            <motion.div 
                                key={`text-${activeItem.id}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.4 }}
                                className="mt-6 text-center max-w-xl pointer-events-auto"
                                onClick={(e) => e.stopPropagation()} 
                            >
                                <h2 className="text-2xl font-medium text-white mb-2 tracking-tight">{activeItem.title}</h2>
                                {activeItem.description && (
                                    <p className="text-white/50 text-sm font-light leading-relaxed">
                                        {activeItem.description}
                                    </p>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PreEvent;