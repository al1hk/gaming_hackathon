"use client"
import React from 'react';
import { motion } from 'framer-motion';
import NextLink from "next/link";
import { useCart } from "../context/CartContext";

// Mock Link for this env
const Link = ({ href, children, className, onClick }: any) => (
  <NextLink href={href} className={className} onClick={onClick}>
    {children}
  </NextLink>
);

// Fallback image
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1612287230217-96bd26c14206?auto=format&fit=crop&q=80&w=800";

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

const PopularProducts: React.FC<ProductsProps> = ({ products }) => {
  const { addToCart } = useCart();
  // Using the requested slice, make sure data exists in App.tsx
  const displayProducts = products.slice(6, 12);

  return (
    <div id="popular" className="relative border-t border-green-900/30">
       <style>{`
        @keyframes neonPulseBlue {
          0%, 100% { 
            box-shadow: 0 0 5px #3b82f6, inset 0 0 5px #3b82f6; 
            border-color: rgba(59, 130, 246, 1); 
            opacity: 1;
          }
          50% { 
            box-shadow: 0 0 15px #3b82f6, inset 0 0 10px #3b82f6; 
            border-color: rgba(59, 130, 246, 0.6); 
            opacity: 0.8;
          }
        }
        .neon-border-pulse-blue {
          animation: neonPulseBlue 3s infinite ease-in-out;
        }
        /* Reusing glitch animation from global or defining if needed */
        @keyframes glitch {
          0% { clip-path: inset(40% 0 61% 0); transform: translate(-2px, 2px); }
          20% { clip-path: inset(92% 0 1% 0); transform: translate(0px, 0px); }
          40% { clip-path: inset(43% 0 1% 0); transform: translate(2px, -2px); }
          60% { clip-path: inset(25% 0 58% 0); transform: translate(2px, 2px); }
          80% { clip-path: inset(54% 0 7% 0); transform: translate(-1px, -2px); }
          100% { clip-path: inset(58% 0 43% 0); transform: translate(0px, 0px); }
        }
        .group:hover .glitch-text {
          animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
          font-weight: 900;
        }
      `}</style>

      {/* Background Decor */}
      <div className="absolute inset-0 bg-black pointer-events-none">
        {/* Diagonal Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(34,197,94,0.05)_50%,transparent_51%)] bg-[size:20px_20px]"></div>
      </div>

      <section className="py-24 px-4 relative bg-black/90">
        <div className="container mx-auto relative z-10">
          
          {/* Section Header - Mirrored Layout */}
          <div className="flex flex-col md:flex-row-reverse justify-between items-end mb-20 border-b border-green-900/50 pb-6">
            <div className="relative text-right">
              <div className="absolute -right-4 top-0 bottom-0 w-1 bg-green-500"></div>
              <h2 className="text-4xl md:text-6xl font-black text-white font-orbitron tracking-tighter uppercase relative pr-6 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                Most <span className="text-transparent bg-clip-text bg-gradient-to-l from-green-400 to-teal-600">Popular</span>
              </h2>
              <p className="pr-6 text-green-500/60 font-share_tech_mono text-sm mt-3 tracking-[0.3em] uppercase">
                // Trending_Items // User_Verified // High_Demand
              </p>
            </div>
            
            <Link href="/products" className="group flex items-center gap-2 mt-6 md:mt-0 flex-row-reverse">
              <span className="text-sm font-share_tech_mono text-green-500 group-hover:text-white transition-colors uppercase tracking-widest border-b border-green-500/30 pb-1">
                View_Full_Catalog
              </span>
              <span className="bg-green-500/10 p-2 border border-green-500 group-hover:bg-green-500 group-hover:text-black transition-all duration-300 clip-path-polygon-[20%_0,100%_0,100%_100%,0%_100%,0_20%]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative"
                >
                  {/* Tech Card Shape Container */}
                  <div className="bg-[#080808] border border-green-500/20 relative transition-all duration-300 group-hover:border-green-500/80 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] h-full flex flex-col clip-path-polygon-[0_0,100%_0,100%_95%,90%_100%,0_100%]">
                    
                    {/* Digital Header on Card */}
                    <div className="flex justify-between items-center px-4 py-2 border-b border-green-500/20 bg-green-900/5">
                        <div className="flex gap-1">
                             {/* Status Lights */}
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-sm"></div>
                          <div className="w-1.5 h-1.5 bg-green-500/30 rounded-sm"></div>
                          <div className="w-1.5 h-1.5 bg-green-500/30 rounded-sm"></div>
                        </div>
                        <span className="text-[10px] font-share_tech_mono text-green-500/70 tracking-widest">POP_ITEM // ID_{product._id}</span>
                    </div>

                    <Link href={href} className="block relative p-4 pb-0">
                      {/* Image Container with Blue/Green variation Neon Border */}
                      <div className="aspect-square relative overflow-hidden bg-black/50 group-hover:scale-[1.02] transition-transform duration-500">
                        
                        {/* PULSING BORDER (Reusing styling from Best.tsx but varying slightly or keeping consistent) */}
                        <div className="absolute inset-0 border-2 border-green-500/80 z-20 pointer-events-none neon-border-pulse"></div>
                        
                        {/* Corner Accents */}
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-green-400 z-30"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-green-400 z-30"></div>

                        {/* Image */}
                        <img
                          src={product.imageUrl || DEFAULT_IMAGE}
                          alt={product.name}
                          className="w-full h-full object-cover filter sepia-[20%] contrast-110 group-hover:sepia-0 group-hover:contrast-125 transition-all duration-500 relative z-10"
                        />
                        
                        {/* Overlay Glitch Texture */}
                        <div className="absolute inset-0 z-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-color-dodge"></div>

                        {/* Discount Tag */}
                        {product.discountPercentage > 0 && (
                          <div className="absolute bottom-4 right-4 z-30">
                            <div className="bg-green-500 text-black text-xs font-bold font-orbitron px-3 py-1 skew-x-[-10deg] shadow-[0_0_15px_rgba(34,197,94,0.8)]">
                               <span className="skew-x-[10deg] inline-block">-{product.discountPercentage}% OFF</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>
                    
                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow relative bg-gradient-to-b from-transparent to-green-900/5">
                      <div className="mb-4">
                        <Link 
                          href={href}
                          className="block group-hover:text-green-400 transition-colors"
                        >
                          <h3 className="text-white font-bold text-lg md:text-xl font-orbitron tracking-wider uppercase leading-tight">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 mt-2">
                           <span className="text-[10px] bg-green-500/20 text-green-400 px-1 font-mono">★★★★★</span>
                           <span className="text-[10px] text-gray-500 font-mono">(542_REVIEWS)</span>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-5 font-share_tech_mono border-t border-dashed border-green-500/30 pt-3">
                          <div className="flex flex-col">
                             <span className="text-white font-bold text-2xl">
                               ${product.price}
                             </span>
                          </div>
                          {product.discountPercentage > 0 && (
                            <div className="text-gray-500 line-through text-sm">
                               ${(product.price / (1 - product.discountPercentage / 100)).toFixed(0)}
                            </div>
                          )}
                        </div>

                        {/* AGGRESSIVE BUTTON DESIGN - MATCHING BEST.TSX */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() =>
                            addToCart({
                              _id: product._id,
                              name: product.name,
                              price: product.price,
                              quantity: 1,
                              imageUrl: product.imageUrl || DEFAULT_IMAGE,
                              discountPercentage: product.discountPercentage,
                            })
                          }
                          className="w-full relative group/btn overflow-hidden bg-black border border-green-500/50 hover:border-green-400 h-12"
                        >
                           {/* Scanline */}
                           <div className="absolute top-0 bottom-0 w-[2px] bg-green-500/50 blur-[2px] animate-[shimmer_2s_infinite] z-0"></div>

                           <div className="relative z-10 w-full h-full flex items-center justify-center gap-3 group-hover/btn:bg-green-500 group-hover/btn:text-black transition-colors duration-200">
                              <span className="font-orbitron font-bold tracking-widest uppercase text-sm group-hover/btn:glitch-text">
                                Add_To_Cart
                              </span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                           </div>
                           
                           {/* Tech Corners */}
                           <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-green-500 opacity-50"></div>
                           <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-green-500 opacity-50"></div>
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

export default PopularProducts;