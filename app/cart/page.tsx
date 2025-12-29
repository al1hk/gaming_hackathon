"use client"
import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#050505] text-white py-32 font-['Orbitron'] relative overflow-hidden flex items-center justify-center">
        {/* Empty State Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="bg-black/50 border border-green-500/20 p-12 max-w-lg mx-auto backdrop-blur-sm relative"
          >
             <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500"></div>
             <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500"></div>

             <h1 className="text-4xl font-bold mb-4 text-gray-500">CACHE_EMPTY</h1>
             <p className="text-green-500/60 mb-8 font-['Share_Tech_Mono'] uppercase tracking-widest">// No_Items_Detected_In_Inventory</p>
             
             <Link 
                href="/products"
                className="inline-block bg-green-500/10 border border-green-500 text-green-500 px-8 py-4 hover:bg-green-500 hover:text-black transition-all duration-300 font-bold uppercase tracking-widest clip-path-polygon-[10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px]"
             >
                Initialize_Shopping_Protocol
             </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white py-24 font-['Orbitron'] relative">
      {/* Background Effect */}
      <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.1)_0%,transparent_50%)]"></div>
          <div className="absolute top-0 left-0 w-px h-full bg-green-500/10"></div>
          <div className="absolute top-0 right-0 w-px h-full bg-green-500/10"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-green-500/30 pb-4">
             <div>
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-['Share_Tech_Mono'] text-green-500 uppercase tracking-[0.2em]">System / Inventory</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                    Shopping <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Cart</span>
                </h1>
             </div>
             <div className="font-['Share_Tech_Mono'] text-gray-500 text-sm mt-4 md:mt-0">
                ITEMS: {items.reduce((acc, item) => acc + item.quantity, 0).toString().padStart(2, '0')} // TOTAL_WEIGHT: NULL
             </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20, height: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/40 border border-green-500/20 p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 group hover:border-green-500/50 transition-colors relative overflow-hidden"
              >
                {/* Decoration */}
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500/0 group-hover:bg-green-500/50 transition-colors"></div>
                <div className="absolute right-0 top-0 text-[200px] font-black text-green-500/5 pointer-events-none select-none -translate-y-1/2 translate-x-1/2">
                   {index + 1}
                </div>

                <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                   <div className="absolute inset-0 border border-green-500/30 group-hover:border-green-500 transition-colors z-10"></div>
                   {/* Scanline overlay on image */}
                   <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(34,197,94,0.2)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-50"></div>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                
                <div className="flex-grow text-center md:text-left z-10">
                  <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-1">{item.name}</h3>
                  <div className="text-green-500/60 font-['Share_Tech_Mono'] text-xs uppercase mb-4">
                     ID: {item._id} // CLASS: A
                  </div>
                  <div className="text-2xl font-bold text-green-400">
                     ${item.price}
                  </div>
                </div>

                <div className="flex flex-col items-center md:items-end gap-4 z-10">
                   {/* Quantity Control */}
                   <div className="flex items-center border border-green-500/30 bg-black">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-green-500/20 text-green-500 transition-colors font-mono text-xl"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-['Share_Tech_Mono'] text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-green-500/20 text-green-500 transition-colors font-mono text-xl"
                      >
                        +
                      </button>
                   </div>

                   <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500/70 hover:text-red-500 text-xs uppercase tracking-widest font-bold flex items-center gap-2 group/del"
                  >
                    <span className="group-hover/del:underline decoration-red-500">Delete_Protocol</span>
                    <span className="text-lg">×</span>
                  </button>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-black/60 border border-green-500/30 p-8 sticky top-32 backdrop-blur-md relative">
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-500"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-500"></div>

              <h2 className="text-2xl font-black uppercase mb-8 border-b border-green-500/30 pb-4 flex items-center gap-2">
                 <span className="w-2 h-2 bg-green-500"></span>
                 Transaction_Log
              </h2>
              
              <div className="space-y-4 mb-8 font-['Share_Tech_Mono']">
                <div className="flex justify-between text-gray-400">
                  <span>SUBTOTAL_UNITS</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>SHIPPING_MODULE</span>
                  <span className="text-green-500">NULL (FREE)</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>TAX_ESTIMATE</span>
                  <span>CALCULATED_AT_NEXT_STEP</span>
                </div>
                
                <div className="border-t border-dashed border-green-500/30 pt-4 mt-4">
                  <div className="flex justify-between items-end">
                    <span className="text-sm uppercase tracking-widest">Total_Credits</span>
                    <span className="text-3xl font-bold text-green-500 shadow-green-500/50 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">
                        ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className="w-full bg-green-600 text-black py-4 font-black uppercase tracking-widest text-lg hover:bg-green-500 hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 clip-path-polygon-[10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px] group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                   Initialize_Checkout
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                   </svg>
                </span>
              </button>
              
              <div className="mt-6 text-[10px] text-gray-500 text-center font-['Share_Tech_Mono']">
                 // SECURE_CONNECTION_ESTABLISHED_V.4.0.2
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}