"use client"
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Home, ShoppingBag, Terminal } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden font-sans">
        {/* Background Grid & Scanlines */}
        <div className="absolute inset-0 z-0 opacity-20" 
           style={{ 
             backgroundImage: `linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
           }}>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black z-0 pointer-events-none"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block relative mb-8"
        >
            <div className="absolute inset-0 bg-green-500 blur-[40px] opacity-40 rounded-full"></div>
            <div className="w-24 h-24 bg-black border-2 border-green-500 rounded-full flex items-center justify-center relative shadow-[0_0_20px_rgba(34,197,94,0.6)]">
                 <CheckCircle className="w-12 h-12 text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,1)]" />
            </div>
        </motion.div>

        <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="flex items-center justify-center gap-2 text-green-600 font-mono text-xs uppercase tracking-widest mb-4"
        >
            <Terminal size={12} /> SEQUENCE_COMPLETE
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-200 to-green-500 uppercase tracking-tighter"
        >
          Order Completed!
        </motion.h1>

        <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            className="h-1 bg-green-900 mx-auto mb-8 relative overflow-hidden"
        >
             <div className="absolute inset-0 bg-green-500 animate-[shimmer_2s_infinite] translate-x-[-100%]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 font-mono text-sm md:text-base mb-12 max-w-lg mx-auto leading-relaxed"
        >
          Thank you for your purchase. Your order has been processed successfully.
          <br className="my-2 block"/>
          <span className="text-green-500/80">You can download your receipt from the PDF that was generated.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <Link
            href="/"
            className="group relative bg-green-600 hover:bg-green-500 text-black px-8 py-4 font-display font-bold uppercase tracking-wider transition-all duration-300 overflow-hidden"
            style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Home size={18} /> Return Home
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </Link>
          
          <Link
            href="/products"
            className="group relative bg-transparent text-green-500 border border-green-500/50 hover:border-green-400 px-8 py-4 font-display font-bold uppercase tracking-wider transition-all duration-300 hover:bg-green-500/10"
            style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
          >
            <span className="flex items-center gap-2">
              <ShoppingBag size={18} /> Continue Shopping
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}