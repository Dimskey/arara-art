"use client";
import Button from "@/components/ui/Button";
import HeroBannerGrid from "@/components/shared/HeroBannerGrid";
import { useLang } from "@/contexts/langContext";
import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsapClient";

export default function HeroSection() {
  const { t, lang } = useLang();

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!leftRef.current || !rightRef.current) return;

    gsap.to(leftRef.current.children, {
      duration: 2,
      stagger: 0.15,
      opacity: 0,
      keyframes: [
        { x: 48, opacity: 1, ease: "power3.out" },
        { x: -24, opacity: 1, ease: "power3.in" },
        //{ x: 0, ease: "power3.out" },
      ],
    });

    gsap.fromTo(
      rightRef.current,
      { opacity: 0, scale: 0.94, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.15,
      }
    );
  }, []);

  return (
    <section className="relative py-24 lg:py-32 border-b border-[var(--color-border)]/30 transition-colors duration-300 overflow-hidden">
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1718017333312-00ed1e9de165?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-fixed opacity-20"
        style={{ backgroundAttachment: "fixed" }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent dark:from-white/10 dark:via-white/5 dark:to-transparent pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT (Animates Staggered) */}
          <div ref={leftRef} className="space-y-6">
            <h2 className="text-4xl lg:text-6xl font-medium tracking-[0.2em] leading-tight uppercase">
              {t("hero.title")}
            </h2>
            <p className="text-[var(--color-accent)] text-base leading-relaxed max-w-md">
              {t("hero.paragraph1")}
            </p>
            <p className="text-[var(--color-accent)] text-base leading-relaxed max-w-md">
              {t("hero.paragraph2")}
            </p>
            <div className="flex justify-start">
              <Button
                onClick={() => (window.location.href = `/${lang}/product`)}
              >
                {t("hero.button")}
              </Button>
            </div>
          </div>

          {/* RIGHT IMAGE GRID (Zoom/Fade) */}
          <div ref={rightRef} className="relative z-10">
            <HeroBannerGrid />
          </div>
        </div>
      </div>
    </section>
  );
}
