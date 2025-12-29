// app/products/[slug]/page.tsx
import { client } from "@/sanity/lib/client";
import ProductDetails from "@/app/components/ProductDetails";

// Async function to fetch product data
async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    price,
    discountPercentage,
    description,
    keyFeatures,
    "imageUrl": image.asset->url,
    "slug": slug.current
  }`;
  return client.fetch(query, { slug });
}

// Type definition for the component props
// The page component
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const product = await getProduct(slug);

  // If product not found, show a message
  if (!product) {
    return <main>Product not found</main>;
  }

  // Render the product details if found
  return (
    <main>
      <ProductDetails product={product} />
    </main>
  );
}
