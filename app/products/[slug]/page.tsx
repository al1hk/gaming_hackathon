// app/products/[slug]/page.tsx
import { client } from "@/sanity/lib/client";
import ProductDetails from "@/app/components/ProductDetails";

// A type for product data
interface Product {
  _id: string;
  name: string;
  price: number;
  discountPercentage: number;
  description: string;
  keyFeatures: string[];
  image: string[];
  slug: string;
}

// A function to fetch product data based on the slug
async function getProduct(slug: string): Promise<Product | null> {
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

  try {
    const product: Product | null = await client.fetch(query, { slug });
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Page component for product details
export default async function ProductPage({
  params,
}: {
  params: { slug: string }; // Correctly typed params
}): Promise<JSX.Element> {
  const product = await getProduct(params.slug);

  // If no product is found
  if (!product) {
    return <div>Product not found</div>;
  }

  // Render product details if found
  return (
    <main>
      <ProductDetails product={product} />
    </main>
  );
}
