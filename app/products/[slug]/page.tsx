import { client } from "@/sanity/lib/client";
import ProductDetails from "@/app/components/ProductDetails";

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
}) {
  const product = await getProduct(params.slug);

  return (
    <main>
      <ProductDetails product={product} />
    </main>
  );
}
