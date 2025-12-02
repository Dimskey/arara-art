import { client } from "./client";
import { heroBannerQuery } from "@/sanity/queries/herobanner";

export async function getHeroBanner(lang: string) {
  try {
    const data = await client.fetch(heroBannerQuery);

    return data.map((item: any) => ({
      title: lang === "id" ? item.title_id : item.title_en,
      description: lang === "id" ? item.description_id : item.description_en,
      imageUrl: item.image?.asset?.url || null, // 🔥 aman
      link: item.link || null,
    }));
  } catch (error) {
    console.error("Error fetching hero banner:", error);
    return [];
  }
}
