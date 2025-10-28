import Header from "@/components/layout/Header";
import HeroSection from "@/components/home/HeroSection";
import CollectionsSection from "@/components/home/CollectionsSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import AboutUs from "@/components/home/AboutUs";
import NewsServer from "@/components/home/NewsServer";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <>
      <div className="backdrop-blur-md sticky top-0 z-50">
        <Header />
      </div>
      <main>
        <HeroSection />
        <AboutUs />
        <CollectionsSection />
        <CategoriesSection />
        <NewsServer lang={lang} />
      </main>
    </>
  );
}
