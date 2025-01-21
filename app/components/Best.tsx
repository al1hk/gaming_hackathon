"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { motion } from 'framer-motion';

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPercentage: number;
  imageUrl: string;
  slug: { current: string };
}

interface ProductsProps {
  products: Product[];
}

const Best: React.FC<ProductsProps> = ({ products }) => {
  const displayProducts = products.slice(0,6)
  return (
    
    <div id="product">
      <section className="py-16 px-4 bg-black">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-white font-orbitron">
              Best Seller <span className="text-green-500">Products</span>
            </h2>
            <Link href="/products" className="text-green-500 hover:text-green-400 transition-colors">
              View All Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProducts.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#111] rounded-lg overflow-hidden relative group"
              >
                <Link href={`/products/${product.slug.current}`} className="block">
                  <div className="aspect-square relative">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.discountPercentage > 0 && (
                      <span className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-md text-sm">
                        {product.discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                </Link>
                
                <div className="p-4">
                  <Link 
                    href={`/products/${product.slug.current}`}
                    className="block hover:text-green-500 transition-colors"
                  >
                    <h3 className="text-white font-semibold mb-2 truncate">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500 font-bold">${product.price}</span>
                    {product.discountPercentage > 0 && (
                      <span className="text-gray-400 line-through text-sm">
                        ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
                  >
                    Add To Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Best;