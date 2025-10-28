"use client";

import { collections } from "@/data/collections";
import CollectionCard from "@/components/shared/CollectionCard";
import Button from "@/components/ui/Button";
import { useLang } from "@/contexts/langContext";

export default function CollectionsSection() {
  const { t, lang } = useLang();
  const collectionsText = t("collections");
  const cards = t("collections.cards") as any[];

  return (
    <section className="py-20 lg:py-28 border-t border-[var(--color-border)]/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-medium tracking-[0.25em] mb-6">
            {collectionsText.title}
          </h2>
          <p className="text-[var(--color-accent)] text-base leading-relaxed max-w-2xl mx-auto">
            {collectionsText.paragraph}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              cardData={cards[index]}
              featured={index === 0}
            />
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <Button onClick={() => (window.location.href = `/${lang}/product`)}>
            {collectionsText.button}
          </Button>
        </div>
      </div>
    </section>
  );
}
