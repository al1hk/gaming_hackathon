import React from "react";
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import Hero from "./components/Hero";
import Products from "./components/Products";
import SpecialOfferSection from "./components/Special";
import PopularProducts from "./components/Popular";
import BestProducts from "./components/Best";

async function getProducts() {
  const query = groq`
    *[_type == "product"]{
      _id,
      name,
      price,
      discountPercentage,
      "imageUrl": image.asset->url,
      slug
    }
  `;
  
  const products = await client.fetch(query);
  return products;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <Hero />
      <BestProducts products={products} />
      <SpecialOfferSection />
      <PopularProducts products={products} />
    </div>
  );
}
