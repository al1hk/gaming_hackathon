"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Link from "next/link";
import { useCart } from "../context/CartContext";

// Fallback image if product.imageUrl is empty or invalid
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=500";

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPercentage: number;
  imageUrl: string;
  slug: string | { current: string };
}

interface ProductsProps {
  products: Product[];
}

const Best: React.FC<ProductsProps> = ({ products }) => {
  const { addToCart } = useCart();
  const displayProducts = products.slice(0, 6);

  return (
    <div id="product" className="relative">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-black pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-900 to-transparent"></div>
        {/* Vertical Grid Lines */}
        <div className="absolute inset-0 flex justify-between px-4 opacity-10 pointer-events-none">
            <div className="w-px h-full bg-green-500"></div>
            <div className="w-px h-full bg-green-500"></div>
            <div className="w-px h-full bg-green-500"></div>
            <div className="w-px h-full bg-green-500"></div>
        </div>
      </div>

      <section className="py-24 px-4 relative bg-black/80">
        <div className="container mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-green-900/50 pb-6">
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-green-500"></div>
              <h2 className="text-4xl md:text-6xl font-black text-white font-orbitron tracking-tighter uppercase relative pl-6 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-700">Hardware</span>
              </h2>
              <p className="pl-6 text-green-500/60 font-share_tech_mono text-sm mt-3 tracking-[0.3em] uppercase">
                // System_Optimized // Top_Rated_Gear // V.2.0.77
              </p>
            </div>
            
            <Link href="/products" className="group flex items-center gap-2 mt-6 md:mt-0">
              <span className="text-sm font-share_tech_mono text-green-500 group-hover:text-white transition-colors uppercase tracking-widest border-b border-green-500/30 pb-1">
                View_Database_ALL
              </span>
              <span className="bg-green-500/10 p-2 border border-green-500 group-hover:bg-green-500 group-hover:text-black transition-all duration-300 clip-path-polygon-[20%_0,100%_0,100%_100%,0%_100%,0_20%]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          </div>
          
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {displayProducts.map((product, index) => {
              const slug = typeof product.slug === "string" ? product.slug : product.slug?.current;
              const href = slug ? `/products/${slug}` : "/products";

              return (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  {/* Tech Card Shape Container */}
                  <div className="bg-[#050505] border border-green-500/30 relative transition-all duration-300 group-hover:border-green-500 group-hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] h-full flex flex-col clip-path-polygon-[0_0,100%_0,100%_95%,95%_100%,0_100%]">
                    
                    {/* Digital Header on Card */}
                    <div className="flex justify-between items-center px-4 py-2 border-b border-green-500/20 bg-green-900/10">
                        <span className="text-[10px] font-share_tech_mono text-green-500/70">MK-III // UNIT_{index + 1}</span>
                        <div className="flex gap-1">
                            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                            <div className="w-1 h-1 bg-green-500/30 rounded-full"></div>
                        </div>
                    </div>

                    <Link href={href} className="block relative p-4 pb-0">
                      {/* Image Container with Pulsing Border */}
                      <div className="aspect-square relative overflow-hidden bg-black/50">
                        
                        {/* THE PULSING BORDER */}
                        <div className="absolute inset-0 border-2 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.4)] z-20 pointer-events-none animate-[pulse_3s_ease-in-out_infinite]"></div>
                        
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-400 z-30"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-400 z-30"></div>

                        {/* Image */}
                        <img
                          src={product.imageUrl || DEFAULT_IMAGE}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:contrast-125 filter grayscale-[30%] group-hover:grayscale-0 relative z-10"
                        />
                        
                        {/* Scanline Overlay */}
                        <div className="absolute inset-0 z-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                        <div className="absolute inset-0 z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-50"></div>

                        {/* Discount Tag */}
                        {product.discountPercentage > 0 && (
                          <div className="absolute top-2 right-2 z-30">
                            <div className="bg-red-600 text-white text-[10px] font-bold font-share_tech_mono px-2 py-0.5 border border-red-400 shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                              -{product.discountPercentage}% CRITICAL DROP
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>
                    
                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow relative">
                      {/* Decorative lines */}
                      <div className="absolute left-0 top-6 w-1 h-8 bg-green-500"></div>

                      <div className="mb-6 pl-4">
                        <Link 
                          href={href}
                          className="block group-hover:text-green-400 transition-colors"
                        >
                          <h3 className="text-white font-bold text-xl md:text-2xl font-orbitron tracking-wide truncate uppercase">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-gray-500 text-xs font-share_tech_mono mt-1">
                          CLASS: LEGENDARY_TIER
                        </p>
                      </div>

                      <div className="mt-auto pl-4">
                        <div className="flex items-end justify-between mb-6 font-share_tech_mono border-t border-green-500/20 pt-4">
                          <div className="flex flex-col">
                             <span className="text-[10px] text-green-500/70 uppercase tracking-wider">Credits_Required</span>
                             <span className="text-white font-bold text-3xl drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                               ${product.price}
                             </span>
                          </div>
                          {product.discountPercentage > 0 && (
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] text-red-500/70 uppercase">MSRP</span>
                                <span className="text-red-500/50 line-through text-lg decoration-2">
                                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(0)}
                                </span>
                            </div>
                          )}
                        </div>

                        {/* AGGRESSIVE BUTTON DESIGN */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() =>
                            addToCart({
                              _id: product._id,
                              name: product.name,
                              price: product.price,
                              quantity: 1,
                              imageUrl: product.imageUrl,
                              discountPercentage: product.discountPercentage,
                            })
                          }
                          className="w-full relative group/btn overflow-hidden"
                        >
                           {/* Background Layer */}
                           <div className="absolute inset-0 bg-green-900/20 border border-green-500 transition-all duration-300 group-hover/btn:bg-green-500 group-hover/btn:shadow-[0_0_20px_rgba(34,197,94,0.6)] clip-path-polygon-[0_0,100%_0,100%_80%,90%_100%,0_100%]"></div>
                           
                           {/* Scanning Line Effect */}
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/30 to-transparent -translate-x-[200%] group-hover/btn:animate-[shimmer_1s_infinite] z-10"></div>

                           {/* Content Layer */}
                           <div className="relative z-20 flex items-center justify-between px-4 py-3">
                               <div className="flex flex-col items-start">
                                   <span className="text-[10px] font-share_tech_mono text-green-400 group-hover/btn:text-black font-bold tracking-widest">CMD: PURCHASE</span>
                                   <span className="text-lg font-black font-orbitron text-white group-hover/btn:text-black tracking-widest">
                                       ADD TO CART
                                   </span>
                               </div>
                               
                               {/* Digital Readout Graphic */}
                               <div className="flex items-center gap-1 opacity-70 group-hover/btn:opacity-100 group-hover/btn:text-black text-green-500">
                                   <span className="text-xl font-bold">»</span>
                                   <div className="flex flex-col gap-[2px]">
                                       <div className="w-4 h-[2px] bg-current"></div>
                                       <div className="w-3 h-[2px] bg-current"></div>
                                       <div className="w-5 h-[2px] bg-current"></div>
                                   </div>
                               </div>
                           </div>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Best;