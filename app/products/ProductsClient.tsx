"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=500";

export interface Product {
  _id: string;
  name: string;
  price: number;
  discountPercentage: number;
  imageUrl: string;
  slug: string;
  tags?: string[];
}

interface ProductsClientProps {
  products?: Product[];
}

type SortOrder = "ASC" | "DESC" | "NEW";

export default function ProductsClient({ products = [] }: ProductsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [sortOrder, setSortOrder] = useState<SortOrder>("NEW");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const normalizeTag = (tag: string) => tag.trim().toUpperCase().replace(/\s+/g, "_");

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) {
      for (const t of p.tags ?? []) {
        const normalized = normalizeTag(t);
        if (normalized) set.add(normalized);
      }
    }

    return ["ALL", ...Array.from(set).sort()];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "ALL") {
      result = result.filter((p) => (p.tags ?? []).some((t) => normalizeTag(t) === activeCategory));
    }

    if (sortOrder === "ASC") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "DESC") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, activeCategory, sortOrder]);

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-10 pb-20 font-orbitron relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-900/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-green-500/30 pb-6 relative">
          <div className="absolute bottom-0 left-0 w-1/3 h-[2px] bg-green-500 shadow-[0_0_10px_#22c55e]"></div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-share_tech_mono text-green-500/50 uppercase tracking-widest">
                System / Inventory / All
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              PROD_<span className="text-green-500">DB</span>
            </h1>
          </div>

          <div className="flex items-center gap-6 mt-6 md:mt-0 font-share_tech_mono">
            <div className="text-right">
              <div className="text-[10px] text-gray-500">ITEMS_LOADED</div>
              <div className="text-xl text-green-500">{filteredProducts.length.toString().padStart(2, "0")}</div>
            </div>
            <div className="h-8 w-px bg-green-500/30"></div>
            <div className="text-right">
              <div className="text-[10px] text-gray-500">SERVER_TIME</div>
              <div className="text-xl text-green-500">23:42:01</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <aside className={`lg:w-1/4 space-y-8 ${isSidebarOpen ? "block" : "hidden lg:block"}`}>
            <div className="bg-black/50 border border-green-500/20 p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-green-500/50"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-green-500/50"></div>

              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-green-500"></span>
                CLASSIFICATION
              </h3>

              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-4 py-3 font-share_tech_mono text-sm tracking-wider transition-all border-l-2 flex justify-between items-center group/item ${
                      activeCategory === cat
                        ? "bg-green-500/10 border-green-500 text-green-400"
                        : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{cat === "ALL" ? "ALL" : cat.replace(/_/g, " ")}</span>
                    {activeCategory === cat && <span className="animate-pulse">●</span>}
                    <span className="opacity-0 group-hover/item:opacity-100 text-[10px] text-green-500/50">[SELECT]</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-black/50 border border-green-500/20 p-6 relative">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-green-500"></span>
                SORT_PROTOCOL
              </h3>

              <div className="flex flex-col gap-2 font-share_tech_mono">
                {[
                  { label: "NEWEST_ARRIVAL", val: "NEW" as const },
                  { label: "PRICE_ASCENDING", val: "ASC" as const },
                  { label: "PRICE_DESCENDING", val: "DESC" as const },
                ].map((opt) => (
                  <label key={opt.val} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className={`w-4 h-4 border border-green-500 flex items-center justify-center ${
                        sortOrder === opt.val ? "bg-green-500/20" : ""
                      }`}
                    >
                      {sortOrder === opt.val && <div className="w-2 h-2 bg-green-500"></div>}
                    </div>
                    <input
                      type="radio"
                      name="sort"
                      className="hidden"
                      checked={sortOrder === opt.val}
                      onChange={() => setSortOrder(opt.val)}
                    />
                    <span
                      className={`text-sm ${
                        sortOrder === opt.val ? "text-white" : "text-gray-500 group-hover:text-gray-300"
                      }`}
                    >
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border border-green-500/30 bg-green-900/10 p-4 text-center">
              <div className="text-green-500 font-bold animate-pulse text-sm mb-2">LIMITED OFFER</div>
              <div className="text-2xl font-black text-white mb-2">NEURAL LINK V5</div>
              <div className="text-xs text-gray-400 font-share_tech_mono mb-4">
                Compatible with all current gen cyberdecks.
              </div>
              <button className="w-full bg-green-600 text-black font-bold py-2 hover:bg-green-500 transition-colors uppercase text-xs">
                Access Deal
              </button>
            </div>
          </aside>

          <div className="lg:w-3/4">
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="w-full border border-green-500 text-green-500 font-bold py-3 uppercase tracking-widest hover:bg-green-500 hover:text-black transition-colors"
              >
                {isSidebarOpen ? "CLOSE_FILTERS [-]" : "OPEN_FILTERS [+]"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    key={product._id}
                    className="group relative"
                  >
                    <div className="h-full bg-[#050505] border border-gray-800 hover:border-green-500 transition-all duration-300 flex flex-col relative overflow-hidden">
                      <div className="absolute inset-0 bg-green-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0"></div>

                      <div className="relative z-10 flex justify-between items-center p-3 border-b border-white/5 bg-white/5">
                        <span className="text-[10px] font-share_tech_mono text-gray-500 group-hover:text-green-500 transition-colors">
                          ID: {product._id.substring(0, 4)}
                        </span>
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-green-500"></div>
                          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                        </div>
                      </div>

                      <Link
                        href={`/products/${product.slug}`}
                        className="block relative aspect-square overflow-hidden bg-black group-hover:p-1 transition-all duration-300"
                      >
                        <div className="absolute top-2 right-2 z-20 flex flex-col gap-1 items-end">
                          {product.discountPercentage > 0 && (
                            <span className="bg-red-500 text-black text-[10px] font-bold px-1.5 py-0.5 shadow-[0_0_8px_rgba(239,68,68,0.5)]">
                              -{product.discountPercentage}%
                            </span>
                          )}
                        </div>
                        <img
                          src={product.imageUrl || DEFAULT_IMAGE}
                          alt={product.name}
                          className="w-full h-full object-cover filter grayscale-[50%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-0 group-hover:opacity-20 transition-opacity"></div>
                      </Link>

                      <div className="p-4 relative z-10 flex flex-col flex-grow">
                        <h2 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors truncate">
                          {product.name}
                        </h2>
                        <div className="text-xs text-gray-500 font-share_tech_mono mb-4">MK-III Grade Hardware</div>

                        <div className="mt-auto flex items-center justify-between border-t border-dashed border-gray-700 pt-3">
                          <div className="flex flex-col">
                            {product.discountPercentage > 0 && (
                              <span className="text-[10px] text-gray-500 line-through">
                                ${Math.round(product.price / (1 - product.discountPercentage / 100))}
                              </span>
                            )}
                            <span className="text-green-500 font-bold text-xl">${product.price}</span>
                          </div>

                          <button className="bg-white/10 hover:bg-green-500 hover:text-black text-white p-2 transition-all duration-300 border border-transparent hover:border-green-400 group/btn">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gray-700 group-hover:border-green-500 transition-colors"></div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 border border-dashed border-gray-800">
                <div className="text-gray-500 font-share_tech_mono">NO_DATA_FOUND_IN_SECTOR</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
