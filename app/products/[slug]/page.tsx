import React from "react";
import { client } from "@/sanity/lib/client";
import ProductDetails from "@/app/components/ProductDetails";
import PageProps from 'next';

async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    price,
    discountPercentage,
    description,
    keyFeatures,
    image,
    "slug": slug.current
  }`;
  return client.fetch(query, { slug });
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}): Promise<React.JSX.Element> {
  const product = await getProduct(params.slug);

  if (!product) {
    return <main>Product not found</main>;
  }

  return (
    <main>
      <ProductDetails product={product} />
    </main>
  );
}