"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartContext";
import {useEffect} from "react";
interface Product {
  _id: string;
  name: string;
  price: number;
  discountPercentage: number;
  imageUrl: string;
  slug: { current: string };
}

export default function Header({ products = [] }: { products?: Product[] }) {
  const { searchQuery, setSearchQuery } = useSearch();
  const { totalItems } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Use useMemo instead of useState + useEffect for filtered products
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products
      .filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5); // Show only top 5 results
  }, [searchQuery, products]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.search-container')) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="bg-black text-white sticky top-0 z-50">
      {/* Top Bar */}
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        <p className="text-sm">
          Get special price up to{" "}
          <span className="text-green-500">50% off</span> our products
        </p>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span>🌍</span>
            <select className="bg-black text-green-500 text-sm outline-none">
              <option value="en">English</option>
              <option value="fr">French</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span>💲</span>
            <select className="bg-black text-green-500 text-sm outline-none">
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
            </select>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-black relative">
        <div className="container mx-auto flex items-center justify-between py-4 px-4 relative">
          <Link href={"/"}>
            <h1 className="text-green-500 text-3xl font-bold font-orbitron tracking-wider hover:text-green-400 transition-colors duration-300">
              Hackathon Project
            </h1>
          </Link>

          <div className="flex items-center space-x-6">
            {/* Search Bar */}
            <div className="relative search-container">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-white hover:text-green-500 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-10 w-96 bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full px-4 py-3 bg-gray-700 text-white focus:outline-none"
                    />
                    
                    {filteredProducts.length > 0 && (
                      <div className="max-h-96 overflow-y-auto">
                        {filteredProducts.map((product) => (
                          <Link
                            key={product._id}
                            href={`/products/${product.slug.current}`}
                            className="flex items-center gap-4 p-3 hover:bg-gray-700 transition-colors"
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                          >
                            <div className="relative w-16 h-16">
                              <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                            <div>
                              <h3 className="text-white font-medium">{product.name}</h3>
                              <div className="flex items-center gap-2">
                                <span className="text-green-500">${product.price}</span>
                                {product.discountPercentage > 0 && (
                                  <span className="text-sm text-gray-400 line-through">
                                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                    
                    {searchQuery && filteredProducts.length === 0 && (
                      <div className="p-4 text-gray-400 text-center">
                        No products found
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Links */}
            <ul className="flex items-center space-x-6 font-poppins">
              <li>
                <Link href="/products" className="hover:text-green-500">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-green-500">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/#featured" className="hover:text-green-500">
                  Featured
                </Link>
              </li>
              <li>
                <Link href="/#popular" className="hover:text-green-500">
                  Popular
                </Link>
              </li>
            </ul>

            {/* Cart Icon */}
            <Link href="/cart" className="relative p-2 hover:text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
