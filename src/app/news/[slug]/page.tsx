import { client } from "@/sanity/lib/client";
import { singleNewsQuery } from "@/sanity/queries/news";
import { NewsItem } from "@/types/news";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";

// 🔹 Generate static params (semua slug dari semua bahasa)
export async function generateStaticParams() {
  const slugs: { slug: string; language: string }[] = await client.fetch(
    `*[_type == "news" && defined(slug.current)]{
      "slug": slug.current,
      language
    }`
  );

  return slugs.map((item) => ({
    slug: item.slug,
    lang: item.language,
  }));
}

// 🔹 Page utama (multilang)
export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;

  const news: NewsItem | null = await client.fetch(singleNewsQuery, {
    slug,
    lang,
  });

  if (!news) return notFound();

  return (
    <>
      <Header />
      <section className="relative py-24 lg:py-32 border-t border-[var(--color-border)]/30 transition-colors duration-300 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          {/* BREADCRUMB */}
          <nav className="mb-8">
            <Link
              href={`/${lang}/news`}
              className="text-[var(--color-accent)] hover:text-[var(--color-foreground)] transition text-sm uppercase tracking-widest"
            >
              ← Back to All News
            </Link>
          </nav>

          <h1 className="text-4xl lg:text-5xl font-medium mb-4">{news.title}</h1>

          {news.date && (
            <p className="text-[var(--color-accent)] mb-8">
              {new Date(news.date).toLocaleDateString(lang === "id" ? "id-ID" : "en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          )}

          {news.imageUrl && (
            <div className="relative aspect-[16/9] mb-12 rounded-2xl overflow-hidden">
              <Image
                src={news.imageUrl}
                alt={news.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {news.body ? (
              <PortableText value={news.body} />
            ) : (
              <p className="opacity-70 italic">Content coming soon...</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
