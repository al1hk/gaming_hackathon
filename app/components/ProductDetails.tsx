"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useRouter } from 'next/navigation';

// Mock types since we are in a demo env
interface Review {
  id: string;
  name: string;
  email: string;
  comment: string;
  rating: number;
  createdAt: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPercentage?: number;
  imageUrl: string; // Changed from image: any to imageUrl string for this env
  description?: string;
  rating?: number;
  ratingCount?: number;
  keyFeatures?: string[];
  slug: string;
}

interface Props {
  product: Product;
}

const ProductDetails: React.FC<Props> = ({ product }) => {
  // State from original code
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'SPECS' | 'REVIEWS'>('SPECS');

  const router = useRouter();
  const { addToCart } = useCart(); 
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      discountPercentage: product.discountPercentage,
      quantity: 1,
    });
    showToast(`${product.name} ADDED TO INVENTORY`, 'success');
  };

  const toggleWishlist = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      showToast('REMOVED FROM DATABASE', 'info');
    } else {
      addToWishlist(product._id);
      showToast('SAVED TO FAVORITES', 'success');
    }
  };

  useEffect(() => {
    const storedReviews = localStorage.getItem(`reviews-${product._id}`);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, [product._id]);

  useEffect(() => {
    localStorage.setItem(`reviews-${product._id}`, JSON.stringify(reviews));
  }, [reviews, product._id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
        const newReview: Review = {
          id: Date.now().toString(),
          name,
          email,
          comment,
          rating,
          createdAt: new Date().toISOString()
        };
        setReviews(prev => [newReview, ...prev]);
        setName('');
        setEmail('');
        setComment('');
        setRating(5);
        setIsSubmitting(false);
        showToast('DATA LOG ENTRY SUBMITTED', 'success');
    }, 1500);
  };

  // Default description if missing
  const description = product.description || "High-performance gaming hardware designed for the elite netrunner. Features military-grade components and a bio-neural interface for zero-latency response times.";
  const features = product.keyFeatures || [
    "Neural Interface Compatible",
    "Titanium Alloy Chassis",
    "Quantum Processor Core",
    "RGB Holo-Sync Technology"
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-24 pb-20 font-['Orbitron'] relative overflow-hidden">
      
      {/* Background Matrix Effect */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 blur-[100px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Breadcrumb / Back */}
        <button 
            onClick={() => router.push('/products')}
            className="group flex items-center gap-2 text-green-500/60 hover:text-green-400 mb-8 font-['Share_Tech_Mono'] uppercase tracking-widest text-xs"
        >
            <span className="group-hover:-translate-x-1 transition-transform">{'<<'}</span>
            RETURN_TO_DATABASE
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* --- LEFT: VISUALS --- */}
            <div className="relative">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative aspect-square bg-black border-2 border-green-500/30 group"
                >
                    {/* Holo Corners */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-green-500 z-20"></div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-green-500 z-20"></div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-green-500/30 z-20"></div>
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-green-500/30 z-20"></div>

                    {/* Scanning Line */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-green-500/10 to-transparent h-[10%] w-full animate-[scanVertical_4s_linear_infinite] pointer-events-none"></div>
                    
                    {/* Image */}
                    <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover filter contrast-125 sepia-[20%] group-hover:sepia-0 transition-all duration-500"
                    />
                    
                    {/* Overlay Grid */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

                    {/* Floating Stats */}
                    <div className="absolute top-4 right-4 flex flex-col items-end gap-1 pointer-events-none">
                        <span className="bg-black/80 text-green-500 px-2 py-0.5 text-[10px] font-mono border border-green-500/30">RES: 8K_READY</span>
                        <span className="bg-black/80 text-green-500 px-2 py-0.5 text-[10px] font-mono border border-green-500/30">LATENCY: 0.1MS</span>
                    </div>

                    {product.discountPercentage && product.discountPercentage > 0 && (
                        <div className="absolute bottom-8 left-0 bg-red-600 text-black font-black px-6 py-2 skew-x-[-20deg] shadow-[0_0_15px_#dc2626]">
                            <span className="skew-x-[20deg] inline-block">CRITICAL DROP -{product.discountPercentage}%</span>
                        </div>
                    )}
                </motion.div>
                
                {/* Thumbnails / Alt Views (Decorative) */}
                <div className="flex gap-4 mt-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="w-20 h-20 border border-green-500/20 bg-green-900/5 hover:border-green-500 hover:bg-green-500/10 transition-all cursor-pointer flex items-center justify-center">
                            <span className="text-[10px] text-green-500/50 font-mono">VIEW_0{i}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- RIGHT: DATA --- */}
            <div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-500 font-['Share_Tech_Mono'] tracking-[0.2em] text-xs">STATUS: IN_STOCK</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-none glitch-text-effect" data-text={product.name}>
                        {product.name}
                    </h1>

                    {/* Rating Bar */}
                    <div className="flex items-center gap-4 mb-8 border-b border-green-500/20 pb-8">
                        <div className="flex text-green-400">
                             {[1,2,3,4,5].map(star => (
                                 <span key={star} className="text-lg">{star <= (product.rating || 5) ? '★' : '☆'}</span>
                             ))}
                        </div>
                        <span className="text-green-500/60 font-mono text-sm">
                            [{reviews.length} VERIFIED_LOGS]
                        </span>
                    </div>

                    {/* Price Block */}
                    <div className="mb-10">
                        <div className="flex items-end gap-4">
                            <span className="text-5xl font-bold text-white tracking-tight">
                                ${product.price}
                            </span>
                            {product.discountPercentage && product.discountPercentage > 0 && (
                                <span className="text-xl text-red-500/60 line-through font-mono mb-2">
                                    ${(product.price * (1 + product.discountPercentage / 100)).toFixed(0)}
                                </span>
                            )}
                        </div>
                        <p className="text-green-500/40 text-xs font-mono mt-2">
                            // TAX_INCLUDED // SHIPPING_CALCULATED_AT_CHECKPOINT
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 mb-12">
                        <button 
                            onClick={handleAddToCart}
                            className="flex-1 bg-green-600 text-black font-bold uppercase py-4 hover:bg-green-500 hover:shadow-[0_0_20px_#22c55e] transition-all clip-path-polygon-[10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px] flex items-center justify-center gap-2 group"
                        >
                            <span>Initiate_Acquisition</span>
                            <span className="bg-black text-green-500 px-1 text-xs group-hover:bg-green-900">+</span>
                        </button>
                        
                        <button 
                            onClick={toggleWishlist}
                            className={`w-16 flex items-center justify-center border border-green-500/50 hover:border-green-400 transition-all ${isInWishlist(product._id) ? 'bg-green-900/20 shadow-[inset_0_0_10px_rgba(34,197,94,0.2)]' : ''}`}
                        >
                             <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`w-6 h-6 ${isInWishlist(product._id) ? 'text-green-500 fill-green-500' : 'text-green-500/50'}`} 
                                viewBox="0 0 24 24" 
                                stroke="currentColor" 
                                fill="none"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>

                    {/* Tabs System */}
                    <div className="border border-green-500/20 bg-black/50 backdrop-blur">
                        <div className="flex border-b border-green-500/20">
                            <button 
                                onClick={() => setActiveTab('SPECS')}
                                className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'SPECS' ? 'bg-green-500/10 text-green-400 border-b-2 border-green-500' : 'text-gray-500 hover:text-white'}`}
                            >
                                Technical_Specs
                            </button>
                            <button 
                                onClick={() => setActiveTab('REVIEWS')}
                                className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'REVIEWS' ? 'bg-green-500/10 text-green-400 border-b-2 border-green-500' : 'text-gray-500 hover:text-white'}`}
                            >
                                Data_Logs ({reviews.length})
                            </button>
                        </div>

                        <div className="p-6 min-h-[300px]">
                            {activeTab === 'SPECS' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <p className="text-gray-400 font-['Share_Tech_Mono'] leading-relaxed mb-6">
                                        {description}
                                    </p>
                                    <h4 className="text-green-500 font-bold mb-4 uppercase text-sm">Core_Modules:</h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-300 font-mono">
                                                <span className="w-1.5 h-1.5 bg-green-500"></span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}

                            {activeTab === 'REVIEWS' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    
                                    {/* Add Review Form */}
                                    <form onSubmit={handleSubmit} className="mb-8 border-b border-green-500/20 pb-8">
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <input 
                                                value={name} onChange={e => setName(e.target.value)} required placeholder="IDENTIFIER_NAME"
                                                className="bg-black border border-green-500/30 p-2 text-green-500 font-mono text-sm focus:outline-none focus:border-green-500"
                                            />
                                            <input 
                                                value={email} onChange={e => setEmail(e.target.value)} required placeholder="COMMS_EMAIL"
                                                className="bg-black border border-green-500/30 p-2 text-green-500 font-mono text-sm focus:outline-none focus:border-green-500"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="text-xs text-gray-500">RATING_VALUE:</span>
                                            {[1,2,3,4,5].map(s => (
                                                <button key={s} type="button" onClick={() => setRating(s)} className={`text-lg ${s <= rating ? 'text-green-500' : 'text-gray-700'}`}>★</button>
                                            ))}
                                        </div>
                                        <textarea 
                                            value={comment} onChange={e => setComment(e.target.value)} required placeholder="INPUT_LOG_ENTRY..."
                                            className="w-full bg-black border border-green-500/30 p-2 text-green-500 font-mono text-sm focus:outline-none focus:border-green-500 h-24 resize-none mb-4"
                                        />
                                        <button disabled={isSubmitting} className="bg-green-900/30 border border-green-500/50 text-green-400 px-6 py-2 text-xs font-bold uppercase hover:bg-green-500 hover:text-black transition-colors w-full">
                                            {isSubmitting ? 'TRANSMITTING...' : 'UPLOAD_ENTRY'}
                                        </button>
                                    </form>

                                    {/* Logs List */}
                                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                        {reviews.length === 0 && <div className="text-gray-600 font-mono text-sm text-center py-4">NO_LOGS_FOUND</div>}
                                        {reviews.map(review => (
                                            <div key={review.id} className="bg-green-900/5 p-4 border-l-2 border-green-500/30">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-green-400 font-bold text-sm uppercase">{review.name}</span>
                                                    <span className="text-xs text-gray-600 font-mono">{new Date(review.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <div className="text-yellow-500/50 text-xs mb-2">{'★'.repeat(review.rating)}</div>
                                                <p className="text-gray-400 text-sm font-mono leading-relaxed">"{review.comment}"</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                </motion.div>
            </div>
        </div>

      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #15803d; }
        .glitch-text-effect { position: relative; }
        .glitch-text-effect::before, .glitch-text-effect::after {
             content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.8;
        }
        .glitch-text-effect::before {
            color: #0ff; z-index: -1; animation: glitch-anim-1 2s infinite linear alternate-reverse;
        }
        .glitch-text-effect::after {
            color: #f00; z-index: -2; animation: glitch-anim-2 2s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim-1 {
            0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
            100% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
        }
        @keyframes glitch-anim-2 {
            0% { clip-path: inset(10% 0 50% 0); transform: translate(2px, -1px); }
            100% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 1px); }
        }
        @keyframes scanVertical {
            0% { top: 0; opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;