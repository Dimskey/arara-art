import { client } from "@/sanity/lib/client";
import { allNewsQuery } from "@/sanity/queries/news";
import { NewsItem } from "@/types/news";
import NewsClient from "./NewsClient";

export default async function NewsServer({ lang }: { lang?: string }) {
  const news: NewsItem[] = await client.fetch(allNewsQuery, { lang: lang || "id" });
  return <NewsClient news={news} lang={lang} />;
}
