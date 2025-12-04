"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { gsap } from "gsap";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";



interface HeroSlide {
  _id?: string;
  title?: string;
  description?: string;
  imageUrl?: string | null;
  image?: { asset?: { _ref?: string; _type?: string } };
  link?: string | null;
}

export default function HeroNewsSlider({ slides }: { slides: HeroSlide[] }) {

  // Embla carousel
  const [viewportRef, emblaApi] = useEmblaCarousel(
    { loop: true, skipSnaps: false },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  const progressRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const btnRef = useRef<HTMLAnchorElement | null>(null);
  const typeTimerRef = useRef<number | null>(null);
  const [ctaUrl, setCtaUrl] = useState<string | null>(null);

  // animate progress bar
  const animateProgress = useCallback(() => {
    if (!progressRef.current) return;
    gsap.killTweensOf(progressRef.current);
    gsap.fromTo(
      progressRef.current,
      { width: "0%" },
      { width: "100%", duration: 5, ease: "linear" }
    );
  }, []);

  // typewriter helper
  const runTypewriter = useCallback((text: string) => {
    if (!descRef.current) return;
    // clear any existing
    if (typeTimerRef.current) {
      window.clearInterval(typeTimerRef.current);
      typeTimerRef.current = null;
    }
    descRef.current.textContent = "";
    let i = 0;
    const speed = 24; // ms per char
    typeTimerRef.current = window.setInterval(() => {
      if (!descRef.current) return;
      descRef.current.textContent = text.slice(0, i + 1);
      i++;
      if (i >= text.length) {
        if (typeTimerRef.current) {
          window.clearInterval(typeTimerRef.current);
          typeTimerRef.current = null;
        }
      }
    }, speed);
  }, []);

  // animate texts when slide changes
  const animateSlideContent = useCallback(
    (index: number) => {
      // get slide data
      const s = slides[index];
      if (!s) return;

      const titleText = s.title ?? "";
      const descText = s.description ?? "";
      const hasLink = !!s.link;

      // kill previous tweens
      gsap.killTweensOf(titleRef.current);
      gsap.killTweensOf(btnRef.current);

      // title slide from left
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 1., ease: "power3.out" }
        );
        titleRef.current.textContent = titleText;
      }

      // desc typewriter (clear then run)
      if (descRef.current) {
        descRef.current.textContent = "";
        runTypewriter(descText);
      }

      // button fade-in (delay slightly so typewriter starts first)
      // CTA LINK
      setCtaUrl(hasLink && s.link ? s.link : null);

      if (btnRef.current) {
        if (hasLink) {
          btnRef.current.style.display = "";

          gsap.fromTo(
            btnRef.current,
            { opacity: 0, y: 6 },
            {
              opacity: 1,
              y: 0,
              delay: 0.35,
              duration: 0.45,
              ease: "power3.out",
            }
          );
        } else {
          btnRef.current.style.display = "none";
        }
      }


      // restart progress
      animateProgress();
    },
    [slides, animateProgress, runTypewriter]
  );

  // hook: when embla ready, register select event
  useEffect(() => {
    if (!emblaApi) return;

    // initial animate
    const initial = emblaApi.selectedScrollSnap();
    animateSlideContent(initial);

    // on select
    const handleSelect = () => {
      const idx = emblaApi.selectedScrollSnap();
      animateSlideContent(idx);
    };

    emblaApi.on("select", handleSelect);
    emblaApi.on("pointerDown", () => {
      gsap.killTweensOf(progressRef.current);
    });

    // cleanup
    return () => {
      emblaApi.off("select", handleSelect);
      emblaApi.off("pointerDown", () => {});
      if (typeTimerRef.current) {
        window.clearInterval(typeTimerRef.current);
        typeTimerRef.current = null;
      }
    };
  }, [emblaApi, animateSlideContent]);

  // manual prev/next
  const handlePrev = () => emblaApi?.scrollPrev();
  const handleNext = () => emblaApi?.scrollNext();

  // cleanup GSAP on unmount
  useEffect(() => {
    return () => {
      gsap.killTweensOf([titleRef.current, btnRef.current, progressRef.current]);
      if (typeTimerRef.current) {
        window.clearInterval(typeTimerRef.current);
        typeTimerRef.current = null;
      }
    };
  }, []);

  // render
  return (
    <section className="relative h-[90vh] md:h-[100vh] overflow-hidden">
      {/* Slider viewport */}
      <div className="absolute inset-0">
        {/* Embla viewport */}
        <div className="embla overflow-hidden h-full" ref={viewportRef}>
          <div className="flex h-full">
            {slides.map((s, i: number) => {
              const imageUrl =
                s.imageUrl ??
                (s.image ? urlFor(s.image).width(1600).height(900).url() : null);

              return (
                <div
                  key={s._id ?? i}
                  className="relative flex-[0_0_100%] h-full flex-shrink-0"
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={s.title ?? `slide-${i}`}
                      fill
                      priority={i === 0}
                      className="object-cover brightness-65"
                      sizes="100vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed text overlay (doesn't move with slides) */}
      <div className="absolute inset-0 pointer-events-none flex items-center px-6 lg:px-20">
        <div className="text-white space-y-6 max-w-2xl pointer-events-auto">
          <h2
            ref={titleRef}
            className="text-4xl lg:text-6xl font-semibold opacity-0"
          />
          <p ref={descRef} className="opacity-90 min-h-[3rem]" />
          <a
            ref={btnRef}
            href={ctaUrl ?? "#"}
            target={ctaUrl?.startsWith("http") ? "_blank" : "_self"}
            className="inline-block mt-4 px-6 py-3 bg-white/20 border-1 border-white/40 backdrop-blur-md  text-white hover:bg-white/30 transition opacity-0"
          >
            Learn more →
          </a>

        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-5 left-0 w-full px-6 lg:px-20 pointer-events-none">
        <div className="w-full h-[3px] bg-white/30 rounded-full overflow-hidden">
          <div ref={progressRef} className="h-[3px] bg-white rounded-full" />
        </div>
      </div>

      {/* Nav arrows (small) */}
      <button
        onClick={handlePrev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 text-white text-3xl flex items-center justify-center hover:bg-black/60"
        style={{ pointerEvents: "auto" }}
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 text-white text-3xl flex items-center justify-center hover:bg-black/60"
        style={{ pointerEvents: "auto" }}
      >
        ›
      </button>
    </section>
  );
}
