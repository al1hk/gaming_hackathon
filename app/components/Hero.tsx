"use client"
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative bg-black text-white min-h-[90vh] z-5 overflow-hidden flex items-center justify-center border-b border-cyber-green/30">
      
      {/* Dynamic Background Image - Gaming Setup Vibe */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ 
          scale: 1.15,
          x: mousePosition.x * -0.5, // Reduced movement for less nausea
          y: mousePosition.y * -0.5
        }}
        transition={{ 
          scale: { duration: 20, repeat: Infinity, repeatType: "reverse" },
          x: { type: "spring", stiffness: 50, damping: 20 },
          y: { type: "spring", stiffness: 50, damping: 20 }
        }}
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0 opacity-50"
        style={{
          // Gaming setup with neon lights
          backgroundImage: "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2000&auto=format&fit=crop')",
        }}
      />

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0 pointer-events-none" />
      
      {/* Vignette & Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.9)_100%)] z-0" />

      {/* --- GAMING HUD ELEMENTS --- */}
      
      {/* Top Right: FPS Counter */}
      <div className="absolute top-6 right-6 z-20 flex flex-col items-end opacity-70">
        <div className="flex items-center gap-2 font-orbitron text-xs text-cyber-green tracking-widest">
           FPS <span className="animate-pulse font-bold">144</span>
        </div>
        <div className="w-16 h-0.5 bg-cyber-green/50 mt-1"></div>
      </div>

      {/* Top Left: Server Status */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-3 opacity-70">
        <div className="w-2 h-2 bg-cyber-green rounded-full animate-[ping_2s_ease-in-out_infinite]" />
        <span className="font-rajdhani text-xs text-cyber-green uppercase tracking-widest">Server: Online</span>
      </div>

      {/* Center Background: Sniper Crosshair subtle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-10">
        <div className="absolute w-[80vw] h-[1px] bg-cyber-green/50"></div>
        <div className="absolute h-[80vh] w-[1px] bg-cyber-green/50"></div>
        <div className="absolute w-[400px] h-[400px] border border-cyber-green/20 rounded-full"></div>
        <div className="absolute w-[200px] h-[200px] border border-dashed border-cyber-green/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
      </div>

      {/* Side Decorative Bars (HUD style) */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-1 z-20 opacity-40">
        <span className="text-[10px] font-orbitron text-cyber-green -rotate-90 mb-4 tracking-widest">SYS.LOAD</span>
        {[...Array(8)].map((_, i) => (
          <motion.div 
            key={i}
            animate={{ width: ["10px", "20px", "10px"], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
            className="h-1 bg-cyber-green rounded-r-full"
          />
        ))}
      </div>

      {/* --- CONTENT --- */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="container relative mx-auto flex flex-col items-center justify-center text-center min-h-[80vh] py-12 px-4 z-10"
      >
        {/* HUD Top Bracket - Tighter */}
        <div className="absolute top-20 w-full max-w-3xl flex justify-between opacity-50 pointer-events-none">
           <div className="w-8 h-8 border-t border-l border-cyber-green" />
           <div className="w-8 h-8 border-t border-r border-cyber-green" />
        </div>

        {/* Floating Tag */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-4 px-3 py-1 border border-cyber-green/30 rounded bg-cyber-green/5 backdrop-blur-sm"
        >
          <span className="font-orbitron text-cyber-green uppercase tracking-[0.3em] text-[10px] font-bold">
            /// Protocol: Gaming
          </span>
        </motion.div>

        {/* Scaled Down Heading */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-orbitron mb-4 tracking-wider leading-tight uppercase relative">
          <span className="relative z-10 text-gray-200">Level Up Your</span>
          <br />
          <span className="text-cyber-green inline-block relative font-bold">
             Arsenal
          </span>
        </h1>
        
        {/* Scaled Down Paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-4 text-sm md:text-base text-gray-400 font-rajdhani font-medium max-w-xl leading-relaxed border-l border-cyber-green/40 pl-4 bg-black/60 backdrop-blur-sm py-2 mx-auto md:mx-0 text-left md:text-center"
        >
          Equip yourself with elite gaming peripherals. 
          Precision engineered for e-sports dominance. 
          <span className="text-cyber-green block md:inline mt-1 md:mt-0 md:ml-2 font-bold tracking-widest text-xs uppercase">/// Ready Player One</span>
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-10 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6"
        >
          <Link href={"#product"}>
            <CyberButton primary>
              Start Game
            </CyberButton>
          </Link>
          <Link href={"/products"}>
            <CyberButton>
              Loadout
            </CyberButton>
          </Link>
        </motion.div>

        {/* HUD Bottom Bracket - Tighter */}
        <div className="absolute bottom-20 w-full max-w-3xl flex justify-between opacity-50 pointer-events-none">
           <div className="w-8 h-8 border-b border-l border-cyber-green" />
           <div className="w-8 h-8 border-b border-r border-cyber-green" />
        </div>
      </motion.div>
    </section>
  );
};

// Reusable Cyberpunk Button Component
const CyberButton: React.FC<{ children: React.ReactNode; primary?: boolean; onClick?: () => void }> = ({ children, primary, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative group overflow-hidden px-8 py-3 font-orbitron font-bold tracking-widest uppercase text-xs
        clip-corner transition-all duration-300
        ${primary 
          ? "text-cyber-green bg-transparent border-2 border-cyber-green shadow-[0_0_15px_rgba(0,255,65,0.4)] hover:bg-white hover:text-black" 
          : "text-cyber-green bg-transparent border border-cyber-green hover:bg-cyber-green/10 hover:shadow-[0_0_10px_rgba(0,255,65,0.2)]"}
      `}
    >
      {/* Scanline effect on hover */}
      <span className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-500 ease-in-out"></span>
      
      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/50 opacity-0 group-hover:opacity-100 transition-opacity"></span>
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/50 opacity-0 group-hover:opacity-100 transition-opacity"></span>

      <span className="relative z-10 flex items-center gap-2">
        {children}
        {!primary && <span className="w-1.5 h-1.5 bg-cyber-green rotate-45"></span>}
      </span>
    </motion.button>
  );
};

export default Hero;