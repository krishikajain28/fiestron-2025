import React from 'react';
import { motion } from 'framer-motion';

interface PreEventProps {
  onBack: () => void;
}

const PreEvent: React.FC<PreEventProps> = ({ onBack }) => {
  return (
    <motion.div
      key="preevent"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center min-h-[50vh] text-center relative"
    >
        <button 
            onClick={onBack}
            className="absolute top-0 left-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
        >
            ←
        </button>
        <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 text-4xl animate-pulse">
            🚀
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Pre-Event Buzz</h2>
        <p className="text-white/40 max-w-md">
            Teasers, behind-the-scenes, and the road to Fiestron. The gallery is being updated!
        </p>
    </motion.div>
  );
};

export default PreEvent;