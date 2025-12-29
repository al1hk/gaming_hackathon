"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // Effect to generate random "logs" for the cyberpunk feel
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = `> SYSTEM_CHECK: ${Math.random().toString(36).substring(7).toUpperCase()}`;
      setLogs(prev => [newLog, ...prev.slice(0, 5)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate complex transmission process
    setTimeout(() => {
        setIsSubmitting(false);
        setIsSent(true);
        setFormState({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSent(false), 3000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white pb-20 overflow-hidden font-['Orbitron'] selection:bg-green-500 selection:text-black">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Dynamic Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [transform:perspective(1000px)_rotateX(60deg)_translateY(-100px)_scale(1.5)] origin-top opacity-30"></div>
        {/* CRT Scanline */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] z-50 opacity-20 pointer-events-none"></div>
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center mb-20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-green-500/0 via-green-500/50 to-green-500/0"></div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center relative"
          >
             <div className="inline-block border border-green-500/30 bg-black/50 backdrop-blur px-4 py-1 mb-6">
                <span className="text-green-400 font-['Share_Tech_Mono'] text-xs tracking-[0.5em] uppercase animate-pulse">
                   // Secure_Channel_Established
                </span>
             </div>
             
             <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 relative z-10 glitch-text-effect">
                Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-500">Nexus</span>
             </h1>
             
             {/* Decorative sub-elements */}
             <div className="flex items-center justify-center gap-4 text-green-500/40 text-xs font-mono">
                <span>LAT: 35.6895</span>
                <span className="w-2 h-2 bg-green-500/40 rounded-full"></span>
                <span>LNG: 139.6917</span>
                <span className="w-2 h-2 bg-green-500/40 rounded-full"></span>
                <span>ENCRYPTION: AES-4096</span>
             </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- LEFT PANEL: INFO & MAP (5 Columns) --- */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Status Panel */}
            <motion.div 
               initial={{ x: -50, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               className="bg-black/60 border border-green-500/20 p-6 relative group overflow-hidden"
            >
               <div className="absolute top-0 left-0 w-1 h-full bg-green-500/50"></div>
               <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-green-500/50"></div>
               
               <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                 <span className="w-2 h-2 bg-green-500 animate-pulse"></span>
                 OPERATIONAL_STATUS
               </h3>
               
               <div className="space-y-4 font-['Share_Tech_Mono'] text-sm">
                  {logs.map((log, i) => (
                    <div key={i} className="text-green-500/60 truncate border-b border-green-500/10 pb-1">
                      {log}
                    </div>
                  ))}
               </div>
            </motion.div>

            {/* Contact Details Cards */}
            <div className="space-y-4">
               {[
                 { label: "FREQUENCY", val: "+81 90-XXXX-2077", sub: "VOICE_UPLINK" },
                 { label: "DATA_PORT", val: "contact@neonexus.com", sub: "MAIL_SERVER" },
                 { label: "COORDINATES", val: "Neo-Tokyo, Sector 7", sub: "PHYSICAL_NODE" }
               ].map((item, idx) => (
                 <motion.div 
                    key={idx}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center p-4 bg-green-900/5 border border-green-500/10 hover:border-green-500/50 hover:bg-green-500/10 transition-all cursor-crosshair group"
                 >
                    <div className="w-10 h-10 border border-green-500/30 flex items-center justify-center mr-4 bg-black group-hover:shadow-[0_0_10px_#22c55e]">
                       <span className="text-green-500 font-bold text-lg">{idx + 1}</span>
                    </div>
                    <div>
                       <div className="text-[10px] text-green-500/50 uppercase tracking-widest">{item.label}</div>
                       <div className="text-white font-mono text-lg group-hover:text-green-400 transition-colors">{item.val}</div>
                    </div>
                 </motion.div>
               ))}
            </div>

            {/* Holographic Map */}
            <div className="relative h-64 w-full border border-green-500/30 bg-black overflow-hidden group perspective-1000">
                {/* 3D Grid Floor */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.2)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 transform rotate-x-60 scale-150 origin-bottom animate-[gridScroll_10s_linear_infinite]"></div>
                
                {/* Scanning Laser */}
                <div className="absolute top-0 left-0 w-full h-1 bg-green-500/50 shadow-[0_0_15px_#22c55e] animate-[scanVertical_3s_ease-in-out_infinite]"></div>
                
                {/* Random Glitch Rects */}
                <div className="absolute top-1/4 left-1/4 w-10 h-10 border border-green-500/50 opacity-0 group-hover:opacity-100 animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/3 w-16 h-4 border border-green-500/50 opacity-0 group-hover:opacity-100 animate-pulse delay-75"></div>

                {/* Central Node */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="relative">
                      <div className="w-4 h-4 bg-green-500 rounded-full animate-ping absolute inset-0"></div>
                      <div className="w-4 h-4 bg-green-500 rounded-full relative z-10 shadow-[0_0_20px_#22c55e]"></div>
                      {/* Rings */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-green-500/30 rounded-full animate-[spin_4s_linear_infinite]"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-dashed border-green-500/20 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
                   </div>
                </div>
                
                <div className="absolute bottom-2 left-2 text-[10px] text-green-500/70 font-mono bg-black/80 px-2">
                   TARGET: HQ_NODE_ALPHA
                </div>
            </div>
          </div>

          {/* --- RIGHT PANEL: FORM (7 Columns) --- */}
          <div className="lg:col-span-7">
             <motion.div 
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               className="h-full relative"
             >
                {/* Cyber Frame */}
                <div className="absolute -inset-1 bg-gradient-to-b from-green-500/20 to-transparent opacity-50 clip-path-polygon-[0_0,100%_0,100%_90%,90%_100%,0_100%]"></div>
                
                <div className="relative bg-black border border-green-500/30 p-8 md:p-12 h-full clip-path-polygon-[0_0,100%_0,100%_90%,90%_100%,0_100%]">
                   
                   {/* Form Header */}
                   <div className="flex items-center justify-between mb-10 border-b border-green-500/20 pb-4">
                      <h2 className="text-3xl font-black text-white uppercase flex items-center gap-3">
                         <span className="text-green-500 text-4xl">►</span>
                         TRANSMIT_DATA
                      </h2>
                      <div className="text-right hidden sm:block">
                         <div className="text-[10px] text-gray-500 uppercase tracking-widest">Protocol</div>
                         <div className="text-green-500 font-mono">SMTP-SECURE-V4</div>
                      </div>
                   </div>

                   {/* The Form */}
                   <form onSubmit={handleSubmit} className="space-y-8 relative">
                      
                      {isSent && (
                        <div className="absolute inset-0 bg-black/90 z-20 flex flex-col items-center justify-center text-green-500 font-mono">
                           <motion.div 
                             initial={{ scale: 0 }} 
                             animate={{ scale: 1 }} 
                             className="text-6xl mb-4"
                           >✓</motion.div>
                           <div className="text-xl tracking-widest">TRANSMISSION COMPLETE</div>
                           <div className="text-sm opacity-60 mt-2">Log ID: {Math.floor(Math.random() * 999999)}</div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="relative group">
                            <input 
                              type="text" 
                              name="name"
                              value={formState.name}
                              onChange={handleChange}
                              required
                              className="peer w-full bg-transparent border-b-2 border-gray-800 py-3 text-white focus:outline-none focus:border-green-500 transition-colors font-mono pt-6"
                              placeholder=" "
                            />
                            <label className="absolute left-0 top-0 text-[10px] text-green-500/50 uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-green-500">
                               Identity_String
                            </label>
                            {/* Focus glow */}
                            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-green-400 shadow-[0_0_10px_#22c55e] transition-all duration-300 peer-focus:w-full"></div>
                         </div>
                         
                         <div className="relative group">
                            <input 
                              type="email" 
                              name="email"
                              value={formState.email}
                              onChange={handleChange}
                              required
                              className="peer w-full bg-transparent border-b-2 border-gray-800 py-3 text-white focus:outline-none focus:border-green-500 transition-colors font-mono pt-6"
                              placeholder=" "
                            />
                            <label className="absolute left-0 top-0 text-[10px] text-green-500/50 uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-green-500">
                               Digital_Address
                            </label>
                            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-green-400 shadow-[0_0_10px_#22c55e] transition-all duration-300 peer-focus:w-full"></div>
                         </div>
                      </div>

                      <div className="relative group">
                            <input 
                              type="text" 
                              name="subject"
                              value={formState.subject}
                              onChange={handleChange}
                              required
                              className="peer w-full bg-transparent border-b-2 border-gray-800 py-3 text-white focus:outline-none focus:border-green-500 transition-colors font-mono pt-6"
                              placeholder=" "
                            />
                            <label className="absolute left-0 top-0 text-[10px] text-green-500/50 uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-green-500">
                               Topic_Header
                            </label>
                            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-green-400 shadow-[0_0_10px_#22c55e] transition-all duration-300 peer-focus:w-full"></div>
                      </div>

                      <div className="relative group">
                            <textarea 
                              name="message"
                              value={formState.message}
                              onChange={handleChange}
                              required
                              rows={5}
                              className="peer w-full bg-green-500/5 border border-green-500/20 p-4 text-white focus:outline-none focus:border-green-500 transition-colors font-mono resize-none mt-4"
                              placeholder="ENTER_ENCRYPTED_MESSAGE..."
                            ></textarea>
                            <label className="absolute left-0 -top-2 text-[10px] text-green-500/50 uppercase tracking-widest">
                               Payload_Content
                            </label>
                            
                            {/* Corner brackets for textarea */}
                            <div className="absolute top-4 left-0 w-2 h-2 border-t border-l border-green-500/50 peer-focus:border-green-500 transition-colors"></div>
                            <div className="absolute top-4 right-0 w-2 h-2 border-t border-r border-green-500/50 peer-focus:border-green-500 transition-colors"></div>
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-green-500/50 peer-focus:border-green-500 transition-colors"></div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-green-500/50 peer-focus:border-green-500 transition-colors"></div>
                      </div>

                      <div className="pt-4">
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full relative overflow-hidden group bg-black border border-green-500 text-green-500 h-16 clip-path-polygon-[10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px]"
                        >
                           {/* Loading Bar */}
                           {isSubmitting && (
                             <div className="absolute inset-0 bg-green-900/40 z-0">
                                <div className="h-full bg-green-500/20 animate-[loading_2s_ease-in-out_infinite] w-full origin-left transform scale-x-0"></div>
                             </div>
                           )}
                           
                           <div className="absolute inset-0 bg-green-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
                           
                           <span className="relative z-10 flex items-center justify-center gap-3 font-bold uppercase tracking-[0.2em] group-hover:text-black transition-colors">
                              {isSubmitting ? 'UPLOADING...' : 'INITIATE_TRANSFER'}
                              <svg className={`w-5 h-5 ${isSubmitting ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                              </svg>
                           </span>
                        </button>
                      </div>

                   </form>
                </div>
             </motion.div>
          </div>

        </div>
      </div>

      <style>{`
        .glitch-text-effect {
          position: relative;
        }
        .glitch-text-effect::before,
        .glitch-text-effect::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        @keyframes scanVertical {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes gridScroll {
          0% { background-position: 0 0; }
          100% { background-position: 0 40px; }
        }
        @keyframes loading {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.7); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default Contact;