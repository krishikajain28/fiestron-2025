import React, { useEffect, useRef, useState } from 'react';

/**
 * LiquidGlassBlob
 * A self-contained React component featuring a 3D, glassy, liquid blob
 * that smoothly follows and rotates with the cursor.
 * Updated: MAXIMUM GLOW and neon intensity.
 */
const LiquidGlassBlob = () => {
  // Refs for animation to avoid re-renders
  // FIXED: Added <HTMLDivElement> so TypeScript knows these are div elements
  const blobRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null); 
  const position = useRef({
    mouseX: window.innerWidth / 2,
    mouseY: window.innerHeight / 2,
    currX: window.innerWidth / 2,
    currY: window.innerHeight / 2,
  });
  
  const [blobSize, setBlobSize] = useState({ width: 384, height: 384 });

  useEffect(() => {
    // FIXED: Added type MouseEvent for 'e'
    const handleMouseMove = (e: MouseEvent) => {
      position.current.mouseX = e.clientX;
      position.current.mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', () => {
      if (blobRef.current) {
        setBlobSize({ width: blobRef.current.offsetWidth, height: blobRef.current.offsetHeight });
      }
      position.current.mouseX = window.innerWidth / 2;
      position.current.mouseY = window.innerHeight / 2;
    });

    // FIXED: Added type number
    let animationFrameId: number;

    const animate = () => {
      if (blobRef.current) {
        const ease = 0.08; 

        const distX = position.current.mouseX - position.current.currX;
        const distY = position.current.mouseY - position.current.currY;

        position.current.currX += distX * ease;
        position.current.currY += distY * ease;

        // Center the blob
        const x = position.current.currX - blobSize.width / 2;
        const y = position.current.currY - blobSize.height / 2;

        // Rotation
        const rotateX = distY * 0.1;
        const rotateY = distX * 0.1;

        // Apply transform to Blob
        blobRef.current.style.transform = `translate(${x}px, ${y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        // Apply slightly different transform to the Glow for depth (parallax)
        if (glowRef.current) {
            glowRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.2)`;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [blobSize]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* CSS for organic morphing animation */}
      <style>{`
        @keyframes morph {
          0% { border-radius: 45% 55% 60% 40% / 55% 35% 65% 45%; }
          25% { border-radius: 55% 45% 40% 60% / 45% 65% 35% 55%; }
          50% { border-radius: 40% 60% 55% 45% / 65% 45% 55% 35%; }
          75% { border-radius: 60% 40% 45% 55% / 35% 55% 45% 65%; }
          100% { border-radius: 45% 55% 60% 40% / 55% 35% 65% 45%; }
        }
        .blob-morph {
          animation: morph 6s ease-in-out infinite;
        }
      `}</style>
      
      {/* 1. BACKGROUND ATMOSPHERE GLOW (Behind the blob) */}
      {/* This is a separate blurred layer to create the massive "room-filling" light */}
      <div
        ref={glowRef}
        className="blob-morph absolute w-96 h-96 top-0 left-0 pointer-events-none will-change-transform"
        style={{
          background: 'radial-gradient(circle, #d946ef 0%, #8b5cf6 40%, transparent 70%)',
          filter: 'blur(80px)', // Extreme blur for atmospheric glow
          opacity: 0.6,
          zIndex: 0
        }}
      />

      {/* 2. THE MAIN BLOB */}
      <div
        ref={blobRef}
        className="blob-morph absolute w-96 h-96 top-0 left-0 will-change-transform backdrop-blur-sm z-10"
        style={{
          // Base gradient: Dark tech purple/blue
          background: 'linear-gradient(135deg, rgba(59, 7, 100, 0.9) 0%, rgba(124, 58, 237, 0.8) 50%, rgba(37, 99, 235, 0.8) 100%)',
          
          // The "Neon" Stack: Multiple shadows for intense glowing rim
          boxShadow: `
            inset -10px -10px 30px rgba(0, 0, 0, 0.8),   /* Deep dark core */
            inset 10px 10px 40px rgba(255, 255, 255, 0.6), /* Glass reflection */
            0 0 20px #d946ef,    /* Tight Pink neon rim */
            0 0 50px #8b5cf6,    /* Medium Purple glow */
            0 0 100px #3b82f6,   /* Wide Blue glow */
            0 0 200px rgba(217, 70, 239, 0.4) /* Massive ambient spill */
          `,
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        {/* High-Gloss Reflection (Top Left) */}
        <div 
          className="absolute top-10 left-12 w-32 h-16 bg-white rounded-[50%] blur-md transform -rotate-12 mix-blend-overlay opacity-90"
        />
        
        {/* Secondary Rim Light (Bottom Right) */}
        <div 
          className="absolute bottom-12 right-12 w-24 h-24 bg-fuchsia-500 rounded-full blur-xl mix-blend-screen opacity-80"
        />
        
        {/* Internal "Plasma" Swirl */}
        <div 
          className="absolute top-1/2 left-1/2 w-40 h-40 bg-cyan-400 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 mix-blend-color-dodge opacity-40 animate-pulse"
        />
      </div>
    </div>
  );
};

export default LiquidGlassBlob;