// import React from 'react'

// const About: React.FC = () => {
//   return (
//     <section id="about" className="relative w-full py-24 bg-black text-white overflow-hidden">
      
//       {/* --- PREMIUM NOISE TEXTURE --- */}
//       {/* This adds that expensive, grainy film look to the black background */}
//       <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" 
//            style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
//       </div>

//       {/* --- BACKGROUND ORBS (Restrained & Deep) --- */}
//       <div className="absolute top-20 right-0 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-900/10 rounded-full blur-[100px] pointer-events-none" />

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
//         {/* HEADER */}
//         <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
//             <div>
//                 <h2 className="text-sm font-mono text-orange-500 mb-2 tracking-widest uppercase">/ Who We Are</h2>
//                 <h3 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white">
//                   Fiestron <span className="text-white/30">2025</span>
//                 </h3>
//             </div>
//             <p className="max-w-md text-white/60 text-lg leading-relaxed text-right md:text-left">
//               The intersection of code, culture, and chaos. <br/>
//               <span className="text-purple-400">KC College's Annual Tech Fest.</span>
//             </p>
//         </div>

//         {/* --- THE BENTO GRID --- */}
//         <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          
//           {/* CARD 1: THE VISION (Spans 4 cols) */}
//           <div className="md:col-span-4 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:border-purple-500/30 transition-colors duration-500">
//              {/* Hover Gradient */}
//              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
             
//              <div className="relative z-10 h-full flex flex-col justify-between">
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center text-xl mb-4">
//                   ✦
//                 </div>
//                 <div>
//                   <h4 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
//                     Not just a fest. <br/>
//                     A <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-purple-400 to-purple-500">Digital Revolution.</span>
//                   </h4>
//                   <p className="text-white/60 max-w-lg text-lg">
//                     We aim to ignite curiosity and foster collaboration. By blending code with creativity, Fiestron envisions a community where innovation meets expression.
//                   </p>
//                 </div>
//              </div>
//           </div>

//           {/* CARD 2: THE VISUAL (Spans 2 cols, Tall) */}
//           <div className="md:col-span-2 md:row-span-2 bg-neutral-900 border border-white/10 rounded-3xl relative overflow-hidden flex items-center justify-center group">
//              {/* The "Liquid" Lamp Effect */}
//              <div className="absolute inset-0 bg-black">
//                 <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-600 rounded-full blur-[40px] mix-blend-screen animate-[float-gentle_4s_ease-in-out_infinite]" />
//                 <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-orange-600 rounded-full blur-[50px] mix-blend-screen animate-[float-gentle_6s_ease-in-out_infinite_reverse]" />
//              </div>
             
//              {/* Glass Overlay Text */}
//              <div className="relative z-10 text-center p-6">
//                 <div className="text-[5rem] md:text-[8rem] font-bold text-white/10 group-hover:text-white/20 transition-colors duration-500 select-none">
//                   25
//                 </div>
//                 <div className="inline-block px-4 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-xs tracking-widest uppercase">
//                   Legacy
//                 </div>
//              </div>
//           </div>

//           {/* CARD 3: STATS (Spans 2 cols) */}
//           <div className="md:col-span-2 bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-3xl p-8 flex flex-col justify-center hover:shadow-[0_0_30px_rgba(124,58,237,0.1)] transition-shadow duration-500">
//               <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
//                 30+
//               </span>
//               <span className="text-purple-400 font-medium tracking-wide mt-2">Events & Workshops</span>
//           </div>

//           {/* CARD 4: PRIZE POOL (Spans 2 cols) */}
//           <div className="md:col-span-2 bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-3xl p-8 flex flex-col justify-center hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] transition-shadow duration-500">
//               <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">
//                 2L+
//               </span>
//               <span className="text-orange-400/80 font-medium tracking-wide mt-2">Prize Pool</span>
//           </div>

//         </div>
//       </div>
//     </section>
//   )
// }

// export default About