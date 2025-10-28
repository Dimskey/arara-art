"use client";

import { NewsItem } from "@/types/news";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { useLang } from "@/contexts/langContext";

export default function NewsClient({ news, lang }: { news: NewsItem[]; lang?: string }) {
  const { t } = useLang();
  
  // Ensure lang is a valid string, fallback to 'en' if undefined or invalid
  const validLang = typeof lang === 'string' ? lang : 'en';

  return (
    <section className="relative py-24 lg:py-32 border-t border-[var(--color-border)]/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3 mb-12">
          <h1 className="text-4xl lg:text-5xl font-medium tracking-[0.2em] uppercase">
            {t("news.title")}
          </h1>
          <Link
            href={`/${validLang}/news`}
            className="px-8 py-3 text-sm uppercase tracking-widest text-[var(--color-accent)] hover:text-[var(--color-foreground)] transition"
          >
            {t("news.viewAll")}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {news.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-[var(--color-accent)] opacity-60">
                {t("news.empty")}
              </p>
            </div>
          ) : (
            news.map((item) => (
              <Link
                key={item._id}
                href={`/${validLang}/news/${item.slug}`}
                className="border border-[var(--color-border)] rounded-2xl overflow-hidden group hover:border-[var(--color-accent)] transition"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  {item.imageUrl && (
                    <Image
                      src={urlFor(item.imageUrl).width(600).url()}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-[var(--color-accent)] leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
