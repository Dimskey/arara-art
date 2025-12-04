import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { searchProductsQuery } from "@/sanity/queries/search";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const lang = searchParams.get("lang") || "id";

  if (!q.trim()) {
    return NextResponse.json([]);
  }

  const data = await client.fetch(searchProductsQuery, {
    search: `${q}*`,
    lang
  });

  // Add imageUrl to results
  const results = data.map((item: any) => ({
    _id: item._id,
    slug: item.slug,
    title: item.title,
    imageUrl: item.images?.[0] 
      ? builder.image(item.images[0]).width(100).url() 
      : null
  }));

  return NextResponse.json(results);
}