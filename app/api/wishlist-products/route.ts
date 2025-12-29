import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { ids?: unknown };
    const ids = Array.isArray(body?.ids) ? body.ids : [];

    const safeIds = ids.filter((id): id is string => typeof id === 'string' && id.length > 0);

    if (safeIds.length === 0) {
      return NextResponse.json([]);
    }

    const query = `*[_type == "product" && _id in $ids] {
      _id,
      name,
      price,
      discountPercentage,
      description,
      "imageUrl": image.asset->url,
      "slug": slug.current
    }`;

    const products = await client.fetch(query, { ids: safeIds });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
