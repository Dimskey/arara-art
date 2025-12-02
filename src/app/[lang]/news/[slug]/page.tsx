import Header from "@/components/layout/Header";
import { client } from "@/sanity/lib/client";
import { singleNewsQuery } from "@/sanity/queries/news";
import { NewsItem } from "@/types/news";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import imageUrlBuilder from "@sanity/image-url";

/* -----------------------------------------------
 * Image Builder
 * --------------------------------------------- */
const builder = imageUrlBuilder(client);
const urlFor = (src: any) => builder.image(src).auto("format");

/* -----------------------------------------------
 * Static Params
 * --------------------------------------------- */
export async function generateStaticParams() {
  const news = await client.fetch(`
    *[_type == "news" && defined(slug.current)]{
      "slug": slug.current,
      language
    }
  `);

  return news.map((item: any) => ({
    slug: String(item.slug),
    lang: String(item.language),
  }));
}

/* -----------------------------------------------
 * PortableText Components (FULL)
 * --------------------------------------------- */
const portableComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-10 w-full flex flex-col items-center">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || "News Image"}
            width={1200}
            height={700}
            className="rounded-xl w-full object-cover"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },

  block: {
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-semibold mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold mt-6 mb-3">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 pl-4 italic opacity-80 my-6">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="leading-relaxed mb-4">{children}</p>
    ),
  },

  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--color-accent)] underline hover:opacity-75"
      >
        {children}
      </a>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 space-y-2 my-4">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 space-y-2 my-4">{children}</ol>
    ),
  },
};

/* -----------------------------------------------
 * Page Component
 * --------------------------------------------- */
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
          
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              href={`/${lang}/news`}
              className="text-[var(--color-accent)] hover:text-[var(--color-foreground)] transition text-sm uppercase tracking-widest"
            >
              ← Back to All News
            </Link>
          </nav>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-medium mb-4">
            {news.title}
          </h1>

          {/* Date */}
          {news.date && (
            <p className="text-[var(--color-accent)] mb-8">
              {new Date(news.date).toLocaleDateString(
                lang === "id" ? "id-ID" : "en-GB",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )}
            </p>
          )}

          {/* Featured Image */}
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

          {/* Body Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {news.body ? (
              <PortableText value={news.body} components={portableComponents} />
            ) : (
              <p className="opacity-70 italic">Content coming soon...</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
