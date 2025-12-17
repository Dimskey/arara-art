import { client } from "./client";
import { NewsItem } from "@/types/news";

export async function getNewsByLanguage(lang: string): Promise<NewsItem[]> {
  const query = `*[_type == "news" && language == $lang] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "imageUrl": image.asset->url,
    date,
    body,
    language
  }`;

  return await client.fetch(query, { lang });
}