"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LangSwitcer";
import { useLang } from "@/contexts/langContext";
import { gsap } from "@/lib/gsapClient";

export default function Header() {
  const { lang } = useLang();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current.querySelectorAll("a"),
        { opacity: 0, y: 14, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          ease: "power2.out",
          stagger: 0.08,
        }
      );
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="p-3 sticky top-0 z-50 border-b border-[var(--color-border)] backdrop-blur-md bg-[var(--color-background)/80] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col transition-all duration-500">
        {/* Logo (Smooth hide) */}
        <div
          className={`overflow-hidden text-center transition-[opacity,max-height] duration-500 
          ${isScrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"}
        `}
        >
          <Link href={`/${lang}`}>
            <h1 className="text-3xl lg:text-4xl font-medium tracking-[0.3em] cursor-pointer hover:text-[var(--color-accent)] transition-colors">
              ARARA.ART
            </h1>
          </Link>
        </div>

        {/* Navigation Row */}
        <div
          className={`flex items-center justify-between relative
            lg:transition-transform lg:duration-500 
            ${isScrolled ? "lg:-translate-y-2" : "lg:translate-y-0"}
          `}
        >
          {/* Left: Theme Toggle */}
          <div className="flex items-center gap-4 pb-2">
            <ThemeToggle />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
            <div className="flex gap-6 lg:gap-9 font-[family-name:var(--font-montserrat)] text-xs tracking-[0.2em]">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={`/${lang}${link.href}`}
                  className="text-[var(--color-accent)] hover:text-[var(--color-foreground)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile - Language + Button */}
          <div className="flex items-center  gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md border border-[var(--color-border)] hover:bg-[var(--color-muted)] transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[var(--color-accent)]" />
              ) : (
                <Menu className="w-5 h-5 text-[var(--color-accent)]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav
            ref={menuRef}
            className="lg:hidden w-full border-t border-[var(--color-border)] mt-2 pt-4 pb-4"
          >
            <div className="flex flex-col gap-1 font-[family-name:var(--font-montserrat)] text-sm tracking-[0.15em]">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={`/${lang}${link.href}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="
            w-full py-3 px-4 flex items-center
            text-[var(--color-foreground)]
            hover:text-[var(--color-accent)]
            transition-colors
          "
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
