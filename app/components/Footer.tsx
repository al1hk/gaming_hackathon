"use client"
import React from "react";

// Mock Link helper
const Link = ({ href, children, className }: any) => (
  <a href={href} className={className}>{children}</a>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white border-t border-green-500/30 relative overflow-hidden pt-16 pb-0">
       {/* Background Grid */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
       
       {/* Top glowing line */}
       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent shadow-[0_0_15px_#22c55e]"></div>

      <div className="container mx-auto px-6 relative z-10 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1 space-y-6">
             <Link href="/" className="group block w-fit">
              <h1 className="text-3xl font-black italic tracking-tighter text-white font-['Orbitron'] relative">
                NEO<span className="text-green-500">-NEXUS</span>
                <span className="absolute -top-1 -left-1 text-red-500 opacity-0 group-hover:opacity-50 animate-pulse mix-blend-screen select-none pointer-events-none">NEO-NEXUS</span>
                <span className="absolute top-1 left-1 text-blue-500 opacity-0 group-hover:opacity-50 animate-pulse mix-blend-screen delay-75 select-none pointer-events-none">NEO-NEXUS</span>
              </h1>
            </Link>
            <p className="text-gray-400 font-['Share_Tech_Mono'] text-sm leading-relaxed">
              // UPGRADING_HUMANITY_SINCE_2077 <br/>
              Premium cybernetics and neural interfaces for the modern runner. Secure. Fast. Lethal.
            </p>
            <div className="flex gap-2 font-mono text-xs text-green-500/60">
               <span className="animate-pulse">●</span>
               <span>[STATUS: ONLINE]</span>
            </div>
          </div>

          {/* Links Column */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold font-['Orbitron'] text-white mb-6 border-l-4 border-green-500 pl-3 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-3 font-['Share_Tech_Mono']">
              {['Home', 'Products', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace('home', '')}`} className="group flex items-center text-gray-400 hover:text-green-400 transition-colors">
                    <span className="mr-2 text-green-500/50 group-hover:text-green-500 transition-all group-hover:translate-x-1">{'>'}</span>
                    <span className="uppercase tracking-widest">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div className="col-span-1">
             <h3 className="text-lg font-bold font-['Orbitron'] text-white mb-6 border-l-4 border-green-500 pl-3 uppercase tracking-wider">
              Social_Link
            </h3>
            <div className="flex gap-4">
               {/* LinkedIn */}
               <a href="https://www.linkedin.com/in/ali-hassan-16a5682b7/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-green-500/30 bg-green-900/10 flex items-center justify-center hover:bg-green-500 hover:text-black hover:border-green-500 text-green-500 transition-all duration-300 clip-path-polygon-[20%_0,100%_0,100%_80%,80%_100%,0_100%,0_20%] group">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
               </a>
               {/* GitHub */}
               <a href="https://github.com/al1hk/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-green-500/30 bg-green-900/10 flex items-center justify-center hover:bg-green-500 hover:text-black hover:border-green-500 text-green-500 transition-all duration-300 clip-path-polygon-[20%_0,100%_0,100%_80%,80%_100%,0_100%,0_20%] group">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
               </a>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="col-span-1 md:col-span-1">
             <h3 className="text-lg font-bold font-['Orbitron'] text-white mb-6 border-l-4 border-green-500 pl-3 uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="text-gray-400 text-xs mb-4 font-['Share_Tech_Mono']">
              // SUBSCRIBE_FOR_UPDATES
            </p>
            <div className="relative group">
                <input 
                  type="email" 
                  placeholder="ENTER_EMAIL_ADDRESS" 
                  className="w-full bg-black border border-green-500/30 text-green-500 px-4 py-3 text-sm font-mono focus:outline-none focus:border-green-500 transition-colors"
                />
                <button className="absolute right-0 top-0 h-full px-4 text-green-500 hover:text-white bg-green-900/20 hover:bg-green-500 transition-all font-bold">
                    {'>'}
                </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-green-500/20 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs font-['Share_Tech_Mono'] text-gray-500">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
             <p>&copy; {new Date().getFullYear()} NEO_NEXUS_SYSTEMS. ALL RIGHTS RESERVED.</p>
             <div className="hidden md:block w-px h-3 bg-green-500/30"></div>
             <p>
                DESIGNED BY <a href="https://designingdose.com/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-400 font-bold tracking-wider transition-colors uppercase">DESIGNING DOSE</a>
             </p>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0 uppercase tracking-wider">
             <a href="#" className="hover:text-green-400">Privacy</a>
             <a href="#" className="hover:text-green-400">Terms</a>
             <a href="#" className="hover:text-green-400">Sitemap</a>
          </div>
        </div>
      </div>
      
      {/* Scrolling Text Bar at very bottom */}
      <div className="w-full bg-green-500/5 border-t border-green-500/20 py-2 overflow-hidden">
         <div className="whitespace-nowrap animate-[scroll_20s_linear_infinite] text-[10px] font-mono text-green-500/50 uppercase">
             SYSTEM ONLINE // SECURE CONNECTION ESTABLISHED // ALL SYSTEMS NORMAL // WELCOME TO THE NETWORK // NEW ARRIVALS DETECTED // SYSTEM ONLINE // SECURE CONNECTION ESTABLISHED // ALL SYSTEMS NORMAL
         </div>
         <style>{`
            @keyframes scroll {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
            }
         `}</style>
      </div>
    </footer>
  );
};

export default Footer;