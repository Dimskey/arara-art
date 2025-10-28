"use client";
import React, { useRef, useLayoutEffect } from "react";
import { useLang } from "@/contexts/langContext";
import { aboutbanners } from "@/data/AboutBanner";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";
import { gsap } from "@/lib/gsapClient";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const { t } = useLang();

  const cards = t("about.cards") as any[];
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Push card elements to ref array (tanpa return)
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useLayoutEffect(() => {
    // Title fade in
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
        },
      });
    }

    // Card stagger animation
    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 60,
      stagger: 0.25,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#about",
        start: "top 75%",
      },
    });
  }, []);

  return (
    <section
      id="about"
      className="py-20 lg:py-28 border-t border-[var(--color-border)]/30 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="space-y-6">
            <h1
              ref={titleRef}
              className="text-3xl lg:text-4xl font-medium tracking-widest uppercase"
            >
              {t("about.title")}
            </h1>
            <p className="text-[var(--color-accent)] text-base leading-relaxed">
              {t("about.description")}
            </p>
          </div>

          {/* Cards */}
          {aboutbanners.map((banner, index) => (
            <div
              key={banner.id}
              ref={addToRefs}
              className="relative aspect-[4/3] overflow-hidden group"
            >
              <ImagePlaceholder
                src={banner.image}
                alt={cards[index]?.title || "Banner"}
                className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/80 transition-colors duration-300"></div>

              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-lg font-semibold uppercase tracking-wide">
                  {cards[index]?.title}
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                  {cards[index]?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
