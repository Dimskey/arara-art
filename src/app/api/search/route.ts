import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { searchProductsQuery } from "@/sanity/queries/search";

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

  return NextResponse.json(data);
}
