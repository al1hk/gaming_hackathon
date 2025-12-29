"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const SpecialOfferSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 149,
    hours: 23,
    minutes: 34,
    seconds: 44,
  });

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const formatTime = (value: number): string =>
    value < 10 ? `0${value}` : `${value}`;

  return (
    <section className="relative bg-black text-white min-h-[80vh] flex flex-col items-center justify-center py-20 overflow-hidden border-y border-green-900/30">
      
      {/* Background Image & Overlays */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40 mix-blend-luminosity"
        style={{
          backgroundImage:
          "url('https://gaming-workdo.myshopify.com/cdn/shop/files/offer-bg-img.png?v=1721386355')",
        }}
      ></div>
      {/* Green tint overlay */}
      <div className="absolute inset-0 bg-green-900/20 mix-blend-overlay"></div>
      {/* Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-10"></div>
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_80%,#000_100%)] z-0"></div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 relative z-20 flex flex-col items-center space-y-16">
        
        {/* Header Content */}
        <div className="text-center flex flex-col items-center space-y-6">
          <div className="inline-block border border-green-500/50 bg-black/80 backdrop-blur px-4 py-1 rounded-sm mb-4">
             <span className="text-green-500 font-share_tech_mono tracking-[0.3em] text-xs uppercase animate-pulse">
               ⚠ System_Override_Initiated
             </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black font-orbitron tracking-tighter uppercase relative">
            <span className="block text-xl md:text-2xl text-gray-400 font-bold mb-2 tracking-widest">Limited Access Protocol</span>
            Get Special Price Up To <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-200 to-emerald-600 drop-shadow-[0_0_15px_rgba(34,197,94,0.6)] text-6xl md:text-8xl">
              50% OFF
            </span>
          </h2>
          
          <p className="max-w-xl text-center text-gray-400 font-share_tech_mono">
            // WARNING: OFFER EXPIRATION IMMINENT. SECURE YOUR HARDWARE UPGRADE BEFORE SYSTEM LOCKDOWN.
          </p>

          {/* Countdown Timer */}
          <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              { label: "DAYS", value: timeLeft.days },
              { label: "HOURS", value: timeLeft.hours },
              { label: "MINS", value: timeLeft.minutes },
              { label: "SECS", value: timeLeft.seconds },
            ].map((time, index) => (
              <div
                key={index}
                className="group relative"
              >
                {/* Tech Box for Timer */}
                <div className="bg-black/80 backdrop-blur-md border border-green-500/30 w-24 h-24 md:w-32 md:h-32 flex flex-col items-center justify-center relative overflow-hidden clip-path-polygon-[10%_0,100%_0,100%_90%,90%_100%,0_100%,0_10%] transition-all duration-300 group-hover:border-green-500 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  {/* Inner glow */}
                  <div className="absolute inset-0 bg-green-500/5 group-hover:bg-green-500/10 transition-colors"></div>
                  
                  {/* Decorative corners */}
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-green-500 opacity-50"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-green-500 opacity-50"></div>

                  <span className="text-4xl md:text-6xl font-black font-share_tech_mono text-white group-hover:text-green-400 transition-colors tabular-nums">
                    {formatTime(time.value)}
                  </span>
                  <span className="text-[10px] md:text-xs text-green-500/70 font-bold uppercase tracking-[0.2em] mt-2 border-t border-green-500/20 pt-1 w-2/3 text-center">
                    {time.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA Button */}
          <Link href="/products" className="mt-8 px-10 py-4 bg-green-600 text-black font-black font-orbitron uppercase tracking-wider text-lg hover:bg-green-500 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.4)] clip-path-polygon-[10%_0,100%_0,100%_80%,90%_100%,0_100%,0_20%] relative overflow-hidden group inline-block">
            <span className="relative z-10">Access_Deals_Now</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12"></div>
          </Link>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>

        {/* Icons Grid */}
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { iconUrl: "https://gaming-workdo.myshopify.com/cdn/shop/files/sevr-1.svg?v=1721388147", text: "Global Shipping", sub: "Neural Networks" },
              { iconUrl: "https://gaming-workdo.myshopify.com/cdn/shop/files/sevr-2.svg?v=1721388147", text: "Secure Crypto", sub: "Encrypted Transactions" },
              { iconUrl: "https://gaming-workdo.myshopify.com/cdn/shop/files/sevr-3.svg?v=1721388147", text: "Money Back", sub: "Satisfaction Protocol" },
              { iconUrl: "https://gaming-workdo.myshopify.com/cdn/shop/files/sevr-4.svg?v=1721388147", text: "24/7 Support", sub: "Live Uplink" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center group cursor-default">
                <div className="w-20 h-20 bg-black border border-green-500/20 rounded-full flex items-center justify-center mb-4 relative transition-all duration-500 group-hover:border-green-500 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                  {/* Rotating ring effect on hover */}
                  <div className="absolute inset-[-4px] rounded-full border border-green-500/30 border-dashed opacity-0 group-hover:opacity-100 animate-[spin_10s_linear_infinite]"></div>
                  
                  <img src={item.iconUrl} alt={item.text} className="w-10 h-10 brightness-0 invert group-hover:brightness-100 group-hover:sepia group-hover:hue-rotate-[100deg] transition-all duration-300" />
                </div>
                <h3 className="text-lg font-bold font-orbitron text-white group-hover:text-green-400 transition-colors uppercase">
                  {item.text}
                </h3>
                <p className="text-xs text-gray-500 font-share_tech_mono mt-1">
                  [{item.sub}]
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOfferSection;