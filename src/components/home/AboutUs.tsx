"use client";
import React, { useRef, useLayoutEffect } from "react";
import { useLang } from "@/contexts/langContext";
import { aboutbanners } from "@/data/AboutBanner";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";
import { gsap } from "@/lib/gsapClient";
import { ScrollTrigger } from "gsap/ScrollTrigger";
interface AboutCard {
  title: string;
  description: string;
}

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const { t } = useLang();

  // Helper function to ensure t() returns string
  const tString = (key: string): string => {
    const value = t(key);
    return typeof value === "string" ? value : key;
  };

  const cards = t("about.cards") as AboutCard[];
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Push card elements to ref array (tanpa return)
 const addToRefs = (el: HTMLDivElement | null) => {
  if (el) {
    cardsRef.current.push(el);
  }
};


 useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 2.5,
        ease: "power3.out",
       
      }
    );

    gsap.fromTo(
      cardsRef.current,
      {  
      opacity: 0, x: (i) => (i === 0 || i === 1 ? -60 : 60),
    },
      {
        opacity: 1,
        x: 0,
        stagger: 0.5,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 95%",
          end: "bottom 70%",
         
          toggleActions: "play reverse play reverse",
        },
      }
    );
  });

  return () => ctx.revert();
  
}, [t]); 
 // re run saat bahasa berubah
cardsRef.current = [];

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
            id="title"
              ref={titleRef}
              className="text-4xl lg:text-4xl font-medium tracking-widest uppercase"
            >
              {tString("about.title")}
            </h1>
            <p ref={titleRef} className="text-[var(--color-accent)] text-base leading-relaxed">
              {tString("about.description")}
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
