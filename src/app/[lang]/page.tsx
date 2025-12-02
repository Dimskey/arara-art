import Header from "@/components/layout/Header";
import HeroNewsSlider from "@/components/home/HeroSection";
import CollectionsSection from "@/components/home/CollectionsSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import AboutUs from "@/components/home/AboutUs";
import NewsServer from "@/components/home/NewsServer";
import { getHeroBanner } from "@/sanity/lib/getHeroBanner";

export default async function Home({
   params,
}: {
   params: { lang: string };
}) {
  const { lang } = await params;

  const slides = await getHeroBanner(lang);

  return (
    <>
      <div className="backdrop-blur-md sticky top-0 z-50">
        <Header />
      </div>

      <main>
        <HeroNewsSlider slides={slides} />
        <AboutUs />
        <CollectionsSection />
        <CategoriesSection />
        <NewsServer lang={lang} />
      </main>
    </>
  );
}
