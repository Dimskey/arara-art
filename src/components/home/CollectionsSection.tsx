"use client";

import React from "react";
import { collections } from "@/data/collections";
import CollectionCard from "@/components/shared/CollectionCard";
import { useLang } from "@/contexts/langContext";

export default function CollectionsSection() {
  const { t } = useLang();
  const cards = t("collections.cards") as any[];

  return (
    <section id="collections" className=" border-t max-w-8xl mx-auto px-8 py-16 overflow-hidden">

      {/* ✅ Title + Description */}
      <div className="text-center mb-12">
        <h2 className="text-4xl lg:text-5xl font-medium tracking-[0.25em]">
          {t("collections.title")}
        </h2>
        <p className="text-[var(--color-accent)]/80 mt-2 text-sm max-w-md mx-auto leading-relaxed">
          {t("collections.paragraph")}
        </p>
      </div>

      {/* ✅ Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto px-8 py-16 overflow-hidden">
        {collections.map((collection, index) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            cardData={cards[index]}
            featured={index === 0}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
