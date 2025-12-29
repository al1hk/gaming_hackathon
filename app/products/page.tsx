import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import ProductsClient, { type Product } from "./ProductsClient";

async function getAllProducts(): Promise<Product[]> {
  const query = groq`
    *[_type == "product"]{
      _id,
      name,
      price,
      discountPercentage,
      "imageUrl": image.asset->url,
      "slug": slug.current,
      tags,
    }
  `;

  const products = await client.fetch(query);
  return Array.isArray(products) ? products : [];
}

export default async function ProductsPage() {
  const products = await getAllProducts();
  return <ProductsClient products={products} />;
}