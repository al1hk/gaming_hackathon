"use client"
import { useState, useMemo, useEffect } from "react";
import Link from 'next/link';
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartContext";

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPercentage: number;
  imageUrl: string;
  slug: string;
}

export default function Header({ products = [] }: { products?: Product[] }) {
  const { searchQuery, setSearchQuery } = useSearch();
  const { totalItems } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products
      .filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5);
  }, [searchQuery, products]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".search-container")) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {/* Glow Effect under header */}
      <div className="fixed top-0 left-0 right-0 h-24 bg-green-500/10 blur-[100px] pointer-events-none z-40" />
      
      <header className="fixed top-0 w-full z-50 font-orbitron tracking-wide">
        {/* Top Bar - "System Status" Bar Look */}
        <div className="bg-black/95 border-b border-green-900/50 backdrop-blur-sm relative overflow-hidden">
          {/* Scanline animation overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(34,197,94,0.1)_50%,transparent_100%)] animate-[shimmer_3s_infinite] pointer-events-none"></div>
          
          <div className="container mx-auto flex flex-wrap items-center justify-between py-1.5 px-4 relative z-10">
            <p className="text-[10px] md:text-xs text-center md:text-left w-full md:w-auto mb-1 md:mb-0 text-gray-400 font-mono uppercase tracking-widest">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
              System Status: <span className="text-green-400">Online</span> | Get special access up to{" "}
              <span className="text-green-500 font-bold bg-green-500/10 px-1 border border-green-500/20">50% OFF</span>
            </p>
            
            <div className="flex flex-wrap items-center space-x-6 w-full md:w-auto justify-center md:justify-end font-mono text-xs">
              <div className="flex items-center space-x-2 group cursor-pointer">
                <span className="text-gray-500 group-hover:text-green-400 transition-colors">REGION</span>
                <select className="bg-transparent text-green-500 outline-none uppercase cursor-pointer border-none focus:ring-0">
                  <option value="en" className="bg-black">ENG</option>
                  <option value="fr" className="bg-black">FRA</option>
                </select>
              </div>
              <div className="w-px h-3 bg-green-900/50"></div>
              <div className="flex items-center space-x-2 group cursor-pointer">
                <span className="text-gray-500 group-hover:text-green-400 transition-colors">CURRENCY</span>
                <select className="bg-transparent text-green-500 outline-none uppercase cursor-pointer border-none focus:ring-0">
                  <option value="usd" className="bg-black">USD</option>
                  <option value="eur" className="bg-black">EUR</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation - Glass Panel */}
        <nav className="bg-black/80 backdrop-blur-md border-b border-green-500/30 shadow-[0_4px_30px_-10px_rgba(34,197,94,0.3)] relative">
          
          {/* Decorative Corner Lines */}
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500"></div>

          <div className="container mx-auto flex items-center justify-between py-4 px-6">
            {/* Logo */}
            <Link href="/" className="group relative">
              <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter text-white relative z-10 skew-x-[-10deg]">
                NEO<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">NEXUS</span>
              </h1>
              {/* Logo Glitch Shadow */}
              <span className="absolute top-0 left-0.5 w-full h-full text-3xl md:text-4xl font-black italic tracking-tighter text-red-500 opacity-0 group-hover:opacity-40 skew-x-[-10deg] animate-pulse transition-opacity duration-100 select-none pointer-events-none">
                HACKATHON
              </span>
              <span className="absolute top-0 -left-0.5 w-full h-full text-3xl md:text-4xl font-black italic tracking-tighter text-blue-500 opacity-0 group-hover:opacity-40 skew-x-[-10deg] animate-pulse transition-opacity duration-100 delay-75 select-none pointer-events-none">
                HACKATHON
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {['Home', 'Products', 'About', 'Contact'].map((item) => (
                <Link key={item} href={item === 'Home' ? '/' : item === 'About' ? '/about' : `/${item.toLowerCase()}`} className="relative px-6 py-2 group overflow-hidden">
                  <span className="relative z-10 text-sm font-bold uppercase tracking-widest text-gray-300 group-hover:text-green-400 transition-colors duration-300">
                    {item}
                  </span>
                  {/* Hover Background Shape */}
                  <span className="absolute inset-0 bg-green-500/10 transform skew-x-[-20deg] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left border border-green-500/20"></span>
                  {/* Bottom Line */}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-5">
              {/* Search Button & Dropdown Container */}
              <div className="relative search-container">
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)} 
                  className={`relative p-2 transition-all duration-300 group ${isSearchOpen ? 'text-green-400' : 'text-gray-300 hover:text-green-400'}`}
                >
                  <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 transform rotate-45 transition-colors duration-300 rounded-sm"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                {isSearchOpen && (
                  <div className="absolute top-full right-0 mt-2 w-80 md:w-96 overflow-hidden transition-all duration-300 ease-out z-[70]">
                    <div className="bg-black/95 backdrop-blur-xl border border-green-500/50 shadow-lg p-4">
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded opacity-75 blur group-focus-within:opacity-100 transition duration-1000 group-hover:duration-200 -z-10"></div>
                        <div className="relative z-10 flex items-center bg-black rounded border border-green-500/30">
                          <span className="pl-4 text-green-500 font-mono animate-pulse">{'>'}</span>
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="INITIALIZE SEARCH SEQUENCE..."
                            className="w-full bg-transparent text-white p-3 font-mono focus:outline-none placeholder:text-green-700 tracking-wider caret-green-400 selection:bg-green-500/30 selection:text-white"
                            autoFocus
                          />
                        </div>

                        {searchQuery.trim() && (
                          <div className="mt-4 border border-green-500/20 bg-green-900/10 rounded p-2">
                            <div className="text-[10px] text-green-600 font-mono mb-2 uppercase tracking-widest px-2">Search Results_</div>
                            {filteredProducts.length > 0 ? (
                              <ul className="space-y-1">
                                {filteredProducts.map((product) => (
                                  <li key={product._id}>
                                    <Link
                                      href={`/products/${product.slug}`}
                                      className="flex items-center justify-between p-2 hover:bg-green-500/20 rounded border border-transparent hover:border-green-500/30 transition-all group cursor-pointer"
                                      onClick={() => setIsSearchOpen(false)}
                                    >
                                      <span className="text-gray-300 group-hover:text-white font-mono text-sm">{product.name}</span>
                                      <span className="text-xs text-green-500/50 group-hover:text-green-400">{'<<VIEW>>'}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-500 font-mono p-2 text-sm">_No_data_found_</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/wishlist"
                className="relative p-2 text-gray-300 hover:text-green-400 transition-colors duration-300 group"
                onClick={() => {
                  setIsSearchOpen(false);
                  setIsMenuOpen(false);
                }}
              >
                <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 transform rotate-45 transition-colors duration-300 rounded-sm"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Link>

              <Link href="/cart" className="relative p-2 text-gray-300 hover:text-green-400 transition-colors duration-300 group">
                <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 transform rotate-45 transition-colors duration-300 rounded-sm"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {/* Cyberpunk Cart Badge */}
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center bg-green-500 text-black text-[10px] font-bold border border-black shadow-[0_0_10px_rgba(34,197,94,0.6)] skew-x-[-10deg]">
                  {totalItems}
                </span>
              </Link>

              {/* Mobile Menu Button - Hamburger */}
              <button 
                className="md:hidden text-white hover:text-green-400 focus:outline-none relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className={`block w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </button>
            </div>
          </div>

          {/* Mobile Menu - Slide In Overlay */}
          {isMenuOpen && (
            <div className="md:hidden fixed top-0 left-0 w-full h-screen z-[60] bg-black/90 backdrop-blur-xl">
              {/* Background Grid */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
              
              <div className="container mx-auto p-6 h-full flex flex-col relative z-10">
                <div className="flex justify-between items-center mb-10 border-b border-green-500/30 pb-4">
                  <h2 className="text-2xl font-black italic text-white tracking-tighter">MENU_SYSTEM</h2>
                  <button onClick={() => setIsMenuOpen(false)} className="text-green-500 hover:text-white transition-colors">
                    <span className="font-mono text-xl">[X] CLOSE</span>
                  </button>
                </div>
                
                <ul className="space-y-6 flex-grow">
                  {['Home', 'Products', 'About', 'Contact'].map((item, index) => (
                    <li key={item} className="transform translate-x-0 transition-transform hover:translate-x-4">
                      <Link href={item === 'Home' ? '/' : item === 'About' ? '/about' : `/${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="block group">
                        <div className="flex items-center">
                          <span className="text-green-500/40 font-mono text-sm mr-4">0{index + 1}</span>
                          <span className="text-3xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200 group-hover:from-green-400 group-hover:to-emerald-400 transition-all">
                            {item}
                          </span>
                        </div>
                        <div className="h-[1px] w-full bg-green-900/50 mt-2 group-hover:bg-green-500 group-hover:shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all"></div>
                      </Link>
                    </li>
                  ))}
                </ul>
                
                <div className="border-t border-green-500/30 pt-6 font-mono text-xs text-green-600 text-center">
                  // SYSTEM_READY
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}