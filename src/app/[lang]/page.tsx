import Header from "@/components/layout/Header";
import HeroNewsSlider from "@/components/home/HeroSection";
import CollectionsSection from "@/components/home/CollectionsSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import AboutUs from "@/components/home/AboutUs";
import NewsServer from "@/components/home/NewsServer";
import { getNewsByLanguage } from "@/sanity/lib/getNews";

export default async function Home({
   params,
}: {
   params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  // Fetch news data berdasarkan bahasa
  const allNews = await getNewsByLanguage(lang);

  return (
    <>
      <div className="backdrop-blur-md sticky top-0 z-50">
        <Header />
      </div>

      <main>
        {/* Hero slider menggunakan 4 berita terbaru */}
        <HeroNewsSlider news={allNews} lang={lang} />
        <AboutUs />
        <CollectionsSection />
        <CategoriesSection />
        {/* News section juga menggunakan data yang sama */}
        <NewsServer lang={lang} />
      </main>
    </>
  );
}