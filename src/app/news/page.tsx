import { client } from "@/sanity/lib/client";
import { allNewsQuery } from "@/sanity/queries/news";
import { NewsItem } from "@/types/news";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import Header from "@/components/layout/Header";

export default async function NewsPage({ params }: { params: { lang: string } }) {
  const lang = params.lang || "id"; // default ke "id" bila tidak ada
  const news: NewsItem[] = await client.fetch(allNewsQuery, { lang });

  return (
    <>
      <Header />
      <section className="relative py-24 lg:py-32 border-t border-[var(--color-border)]/30 transition-colors duration-300 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* HEADER */}
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3 mb-12">
            <h1 className="text-4xl lg:text-5xl font-medium tracking-[0.2em] uppercase">
              {lang === "id" ? "Berita Terbaru" : "All News"}
            </h1>
            <div className="px-8 py-3 text-sm uppercase tracking-widest text-[var(--color-accent)] opacity-60">
              {news.length} {lang === "id" ? "Artikel" : "Articles"}
            </div>
          </div>

          {/* GRID */}
          {news.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[var(--color-accent)] opacity-60 text-lg">
                {lang === "id"
                  ? "Tidak ada artikel berita ditemukan."
                  : "No news articles found."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {news.map((item) => (
                <Link
                  key={item._id}
                  href={`/${lang}/news/${item.slug}`}
                  className="border border-[var(--color-border)] rounded-2xl overflow-hidden group hover:border-[var(--color-accent)] transition"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    {item.imageUrl ? (
                      <Image
                        src={urlFor(item.imageUrl).width(600).url()}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-[var(--color-placeholder-from)]" />
                    )}
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-semibold line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--color-accent)] leading-relaxed line-clamp-3">
                      {item.excerpt}
                    </p>
                    {item.date && (
                      <p className="text-xs text-[var(--color-accent)] opacity-60">
                        {new Date(item.date).toLocaleDateString(
                          lang === "id" ? "id-ID" : "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
