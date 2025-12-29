"use client";

import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  const teamMembers = [
    { name: "Alex 'Glitch' Mercer", role: "Lead Architect", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200" },
    { name: "Sarah 'Neon' Vance", role: "UI/UX Operative", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" },
    { name: "Marcus 'Tank' Steel", role: "Hardware Specialist", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" },
    { name: "Yuki 'Cipher' Tanaka", role: "Network Security", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200" }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white pb-20 overflow-hidden font-['Orbitron']">
        {/* Global Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>
            {/* Hex Grid Background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-500/5 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/5 blur-[100px] rounded-full"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-10">
            {/* Header / Breadcrumb Area */}
            <div className="flex flex-col items-center mb-20">
                 <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center space-x-2 text-[10px] md:text-xs font-['Share_Tech_Mono'] text-green-500/80 uppercase tracking-[0.3em] border border-green-500/30 bg-green-900/10 px-6 py-2 rounded-none clip-path-polygon-[10%_0,100%_0,100%_100%,0%_100%,0_40%] mb-8"
                 >
                    <span className="animate-pulse">●</span>
                    <span>System</span>
                    <span>/</span>
                    <span>Profile</span>
                 </motion.div>

                 <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative text-center"
                 >
                     <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4 relative z-10 drop-shadow-[0_0_25px_rgba(34,197,94,0.4)]">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-b from-green-300 to-green-700">Us</span>
                     </h1>
                     <div className="h-1 w-24 bg-green-500 mx-auto mt-6 shadow-[0_0_15px_#22c55e]"></div>
                     
                     {/* Decorative Japanese Text */}
                     <div className="absolute top-1/2 -translate-y-1/2 left-full ml-4 text-green-900/40 text-8xl font-black hidden lg:block select-none writing-vertical">
                        未来
                     </div>
                     <div className="absolute top-1/2 -translate-y-1/2 right-full mr-4 text-green-900/40 text-8xl font-black hidden lg:block select-none writing-vertical">
                        技術
                     </div>
                 </motion.div>
                 
                 <p className="text-gray-400 font-['Share_Tech_Mono'] max-w-2xl mx-auto text-center mt-8 text-sm md:text-lg tracking-wide leading-relaxed">
                    // We engineer the future of gaming hardware. <br/>
                    // Providing elite-grade cybernetics and peripherals for the digital frontier.
                 </p>
            </div>

            {/* Holographic Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-32 border-y border-green-500/20 py-12 bg-green-900/5 relative">
                {/* Background scanline for this section */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
                
                {[
                    { val: "2077", label: "Est. Year", sub: "Since Foundation" },
                    { val: "400+", label: "Global Nodes", sub: "Active Regions" },
                    { val: "99.9%", label: "Uptime", sub: "System Reliability" },
                    { val: "2M+", label: "Units Sold", sub: "Verified Users" }
                ].map((stat, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        key={i}
                        className="text-center border-r last:border-r-0 border-green-500/20 p-4 relative group"
                    >
                        <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-green-400 transition-colors group-hover:drop-shadow-[0_0_10px_#22c55e]">{stat.val}</div>
                        <div className="text-green-500 font-bold text-sm uppercase tracking-widest mb-1">{stat.label}</div>
                        <div className="text-gray-600 font-['Share_Tech_Mono'] text-xs uppercase">[{stat.sub}]</div>
                    </motion.div>
                ))}
            </div>

            {/* Narrative Section with Timeline Vibe */}
            <div className="space-y-32 relative">
                {/* Center Line */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-green-500/50 to-transparent hidden md:block"></div>

                {[
                    {
                        title: "The_Origin",
                        subtitle: "How It Started",
                        desc: "Born in the underground tech labs of Neo-Tokyo, we started as a small collective of hackers and hardware modders. Our goal was simple: to break the limits of conventional gaming gear.",
                        img: "https://gaming-workdo.myshopify.com/cdn/shop/files/about-info-img.png?v=1721795867",
                        align: "left"
                    },
                    {
                        title: "Expansion_Protocol",
                        subtitle: "Global Reach",
                        desc: "By 2080, our network expanded globally. We established secure supply lines and automated factories, ensuring that every gamer, from the Sprawl to the Orbit, gets access to top-tier equipment.",
                        img: "https://gaming-workdo.myshopify.com/cdn/shop/files/about-info-img2.png?v=1721795867",
                        align: "right"
                    },
                    {
                        title: "Future_Vision",
                        subtitle: "What's Next",
                        desc: "We are currently developing direct neural interface technology. The barrier between player and game is dissolving. Join us as we step into the next evolution of digital existence.",
                        img: "https://gaming-workdo.myshopify.com/cdn/shop/files/about-info-img3.png?v=1721795867",
                        align: "left"
                    }
                ].map((item, index) => (
                    <motion.div 
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        key={index} 
                        className={`flex flex-col ${item.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 relative`}
                    >
                        {/* Connecting Dot for Timeline */}
                        <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-black border-2 border-green-500 rounded-full z-20 hidden md:block shadow-[0_0_10px_#22c55e]"></div>

                        {/* Image Side */}
                        <div className="w-full md:w-1/2 group">
                            <div className="relative overflow-hidden border-2 border-green-500/20 group-hover:border-green-500/60 transition-colors duration-500 rounded-lg bg-gray-900">
                                <div className="absolute inset-0 bg-green-500/10 mix-blend-overlay group-hover:bg-transparent transition-colors z-10"></div>
                                <img src={item.img} alt={item.title} className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
                                {/* Cyber UI Overlay on Image */}
                                <div className="absolute top-2 left-2 text-[10px] font-mono text-green-500 bg-black/80 px-2 py-1">IMG_0{index + 1}</div>
                                <div className="absolute bottom-2 right-2 flex gap-1">
                                    <div className="w-10 h-1 bg-green-500"></div>
                                    <div className="w-2 h-1 bg-green-500/50"></div>
                                </div>
                            </div>
                        </div>

                        {/* Text Side */}
                        <div className="w-full md:w-1/2 md:px-12 text-center md:text-left">
                            <div className="text-green-500 font-['Share_Tech_Mono'] text-sm tracking-widest mb-2 uppercase">
                                // {item.subtitle}
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-tight relative inline-block">
                                {item.title.replace('_', ' ')}
                            </h3>
                            <p className="text-gray-400 font-['Share_Tech_Mono'] text-lg leading-relaxed border-l-2 border-green-500/20 pl-6 md:ml-0 ml-4 text-left">
                                {item.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Team Section */}
            <div className="mt-40 mb-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black uppercase mb-4">Core <span className="text-green-500">Operatives</span></h2>
                    <p className="text-gray-500 font-['Share_Tech_Mono']">The minds behind the machine.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -10 }}
                            className="bg-gray-900/40 border border-green-500/10 p-6 relative group overflow-hidden"
                        >
                            {/* Hover Border Effect */}
                            <div className="absolute inset-0 border border-green-500/0 group-hover:border-green-500/50 transition-all duration-300"></div>
                            
                            <div className="w-32 h-32 mx-auto mb-6 relative">
                                <div className="absolute inset-0 bg-green-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                <img src={member.img} alt={member.name} className="w-full h-full object-cover rounded-full border-2 border-green-500/30 group-hover:border-green-400 relative z-10 grayscale group-hover:grayscale-0 transition-all" />
                            </div>
                            
                            <div className="text-center">
                                <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
                                <p className="text-green-500/70 font-['Share_Tech_Mono'] text-sm uppercase">{member.role}</p>
                            </div>
                            
                            {/* Corner Decors */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-green-500/50"></div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-green-500/50"></div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center py-20 border-t border-green-500/20 relative overflow-hidden bg-green-900/10 rounded-2xl">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase">Ready to <span className="text-green-500">Upgrade?</span></h2>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto font-['Share_Tech_Mono']">
                        Join the elite ranks of gamers who demand perfection. The future is waiting.
                    </p>
                    <button className="bg-green-600 text-black font-bold uppercase py-4 px-10 hover:bg-green-500 hover:shadow-[0_0_20px_#22c55e] transition-all clip-path-polygon-[10%_0,100%_0,100%_80%,90%_100%,0_100%,0_20%]">
                        Initialize_Setup
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AboutUs;