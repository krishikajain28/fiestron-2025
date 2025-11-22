import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

const NotFound: React.FC = () => {
  return (
    <>
      <Header />
      <div className="relative min-h-screen bg-black flex flex-col items-center justify-center text-center px-6 overflow-hidden font-sans selection:bg-purple-500/30">
        
        {/* --- SHARED BACKGROUND --- */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" 
             style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
        </div>
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
        </div>

        <div className="relative z-10">
            <h1 className="text-[10rem] md:text-[12rem] font-extrabold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 drop-shadow-2xl select-none">
            404
            </h1>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Lost in the <span className="text-purple-400">Void?</span>
            </h2>
            
            <p className="text-white/50 text-lg max-w-md mx-auto mb-10 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            
            <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300 backdrop-blur-xl transform hover:scale-105"
            >
            <span>←</span> Return Home
            </Link>
        </div>

      </div>
    </>
  )
}

export default NotFound