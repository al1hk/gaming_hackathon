"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { client } from '@/sanity/lib/client';

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPercentage?: number;
  imageUrl: string;
  slug: string;
  description?: string;
}

export default function WishlistPage() {
  const router = useRouter();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const fetchWishlistProducts = async () => {
      if (wishlist.length === 0) {
        setProducts([]);
        return;
      }

      setIsLoading(true);
      try {
        const query = `*[_type == "product" && _id in $ids] {
          _id,
          name,
          price,
          discountPercentage,
          description,
          "imageUrl": image.asset->url,
          "slug": slug.current
        }`;

        const fetched = await client.fetch<Product[]>(query, { ids: wishlist });
        if (!isCancelled) setProducts(fetched);
      } catch (e) {
        if (!isCancelled) setProducts([]);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    fetchWishlistProducts();
    return () => {
      isCancelled = true;
    };
  }, [wishlist]);

  // Filter products based on wishlist IDs
  const wishlistProducts = useMemo(() => {
    return products.filter(p => wishlist.includes(p._id));
  }, [products, wishlist]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
      discountPercentage: product.discountPercentage
    });
    showToast(`${product.name} UPLOADED TO CART`, 'success');
  };

  const handleRemove = (id: string, name: string) => {
    removeFromWishlist(id);
    showToast(`${name} DELETED FROM MEMORY`, 'error'); // Using 'error' style for destructive action
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] text-white pt-32 pb-20 font-['Orbitron'] relative overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="relative z-10 text-center text-green-500/70 font-['Share_Tech_Mono'] uppercase tracking-widest">
          Loading_Wishlist...
        </div>
      </div>
    );
  }

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen bg-[#020202] text-white pt-32 pb-20 font-['Orbitron'] relative overflow-hidden flex flex-col items-center justify-center">
        {/* Empty State Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="relative z-10 text-center p-12 border border-green-500/20 bg-black/80 backdrop-blur-md max-w-lg"
        >
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-500"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-500"></div>
            
            <div className="text-6xl mb-6 opacity-50">∅</div>
            <h2 className="text-2xl font-bold text-green-500 mb-4 uppercase tracking-widest">Database_Empty</h2>
            <p className="text-gray-400 font-['Share_Tech_Mono'] mb-8">
               // NO_TARGETS_MARKED_FOR_ACQUISITION
            </p>
            <Link 
              href="/products" 
              className="inline-block bg-green-500/10 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black px-8 py-3 transition-all duration-300 font-bold uppercase tracking-wider clip-path-polygon-[10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px]"
            >
              Scan_For_Items
            </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-24 pb-20 font-['Orbitron'] relative">
       {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-screen bg-green-900/5 blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-900/5 blur-[100px]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-16 border-b border-green-500/30 pb-6">
          <div className="flex items-center gap-2 text-green-500/50 font-['Share_Tech_Mono'] text-xs uppercase tracking-[0.3em] mb-2">
            <span className="w-2 h-2 bg-green-500 animate-pulse"></span>
            User_Profile // Saved_Data
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
            Wishlist <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Database</span>
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {wishlistProducts.map((product) => (
              <motion.div 
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout
                className="group relative bg-black/60 border border-green-500/20 hover:border-green-500/60 transition-colors duration-300"
              >
                {/* Image Section */}
                <div className="relative h-64 w-full overflow-hidden border-b border-green-500/20">
                    <div className="absolute inset-0 bg-green-500/10 group-hover:bg-transparent transition-colors z-10"></div>
                    <Link href={`/products/${product.slug}`}>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      />
                    </Link>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 z-20">
                       <span className="bg-black/80 border border-green-500/50 text-green-500 text-[10px] font-bold px-2 py-1 font-['Share_Tech_Mono']">
                          SAVED_ITEM
                       </span>
                    </div>

                    {/* Delete Button (Corner) */}
                    <button
                        onClick={() => handleRemove(product._id, product.name)}
                        className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/80 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                       </svg>
                    </button>
                </div>

                {/* Details Section */}
                <div className="p-6 relative">
                    {/* Decorative lines */}
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-green-500/50"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-green-500/50"></div>

                    <Link href={`/products/${product.slug}`}>
                      <h2 className="text-xl font-bold text-white mb-2 truncate hover:text-green-400 transition-colors">
                        {product.name}
                      </h2>
                    </Link>

                    <div className="flex justify-between items-end mb-6 font-['Share_Tech_Mono']">
                        <span className="text-2xl text-green-500 font-bold">${product.price}</span>
                        <span className="text-xs text-gray-500">ID: {product._id.substring(0,4)}</span>
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                        <button
                            onClick={() => handleAddToCart(product)}
                            className="col-span-5 bg-green-900/20 border border-green-500/50 text-green-400 py-3 font-bold uppercase text-sm tracking-wider hover:bg-green-500 hover:text-black transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                        >
                            <span className="group-hover/btn:hidden">Initialize_Transfer</span>
                            <span className="hidden group-hover/btn:inline">Add_To_Cart</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}