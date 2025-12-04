import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import ProductDetailContent from "./ProductDetailContent";
import { productBySlugQuery } from "@/sanity/queries/product";

export const revalidate = 10;

interface Product {
  title: string;
  slug: string;
  images?: { url: string }[];
  price?: number;
  discountPrice?: number;
  category?: string;
  description?: string;
  shopeeLink?: string;
  tokopediaLink?: string;
}

interface ProductParams {
  slug: string;
  language: string;
}

/* ============================================
   🔹 Ambil semua slug untuk pre-render (ISR)
============================================ */
export async function generateStaticParams() {
  const products = await client.fetch<ProductParams[]>(
    `*[_type == "product" && defined(slug.current)]{
      "slug": slug.current,
      language
    }`
  );

  return products.map((product) => ({
    slug: String(product.slug),
    lang: String(product.language),
  }));
}

/* ============================================
   🔹 Query produk berdasarkan slug dan bahasa
============================================ */
async function getProduct(slug: string, lang: string): Promise<Product | null> {
  const product = await client.fetch(productBySlugQuery, { slug, lang });
  return product || null;
}

/* ============================================
   🔹 SEO Dynamic Metadata (Next.js)
============================================ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;
  const product = await getProduct(slug, lang);
  if (!product) return {};

  const title = product.title || "Product";
  const description =
    product.description ||
    "Discover our handcrafted accessories inspired by Indonesian culture.";

  const image =
    product.images && product.images.length > 0
      ? product.images[0].url
      : "/default-og.jpg";

  return {
    title: `${title} | ARARA ART`,
    description,
    openGraph: {
      title: `${title} | ARARA ART`,
      description,
      type: "website",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ARARA ART`,
      description,
      images: [image],
    },
  };
}

/* ============================================
   🔹 Halaman Detail Produk
============================================ */
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;
  const product = await getProduct(slug, lang);
  if (!product) return notFound();

  const images = product.images?.length ? product.images : [];

  return <ProductDetailContent product={product} images={images} />;
}
