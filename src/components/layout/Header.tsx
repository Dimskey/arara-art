"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LangSwitcer";
import { useLang } from "@/contexts/langContext";
import { gsap } from "@/lib/gsapClient";
import SearchBox from "../ui/SearchBox";

export default function Header() {
  const { lang } = useLang();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const last = useRef(false);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      if (!last.current && y > 120) {
        setIsScrolled(true);
        last.current = true;
      } else if (last.current && y < 50) {
        setIsScrolled(false);
        last.current = false;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
        }
      );
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className="
        sticky top-0 z-50 border-b border-[var(--color-border)]
        backdrop-blur-md bg-[var(--color-background)]
        transition-[background-color,transform,opacity] duration-500
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-3 flex flex-col">
        {/* Logo */}
        <div
          className={`
            overflow-hidden text-center transition-[opacity,max-height,transform] duration-500
            ${
              isScrolled
                ? "max-h-0 opacity-0 -translate-y-2"
                : "max-h-12 opacity-100 translate-y-0"
            }
          `}
        >
          <Link href={`/${lang}`}>
            <h1
              className="
                text-2xl sm:text-3xl lg:text-4xl font-medium
                tracking-[0.22em] sm:tracking-[0.3em]
                cursor-pointer hover:text-[var(--color-accent)] transition-colors
              "
            >
              ARARA.ART
            </h1>
          </Link>
        </div>

        {/* Navigation Row */}
        <div
          className={`
            flex items-center justify-between relative gap-3
            transition-transform duration-500
            ${isScrolled ? "lg:-translate-y-2" : "lg:translate-y-0"}
          `}
        >
          {/* Desktop Theme Toggle */}
          <div className="hidden lg:flex items-center">
            <ThemeToggle />
          </div>

          {/* Mobile left spacer / brand mini */}
          <div className="lg:hidden flex-1" />

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

          {/* Right Actions */}
          <div
            className="
              flex items-center justify-end gap-2 sm:gap-3
              max-w-full
            "
          >
            {/* Mobile Theme Toggle */}
            <div className="lg:hidden flex items-center shrink-0">
              <ThemeToggle />
            </div>

            <div className="flex items-center shrink-0">
              <LanguageSwitcher />
            </div>

            <div className="hidden sm:flex items-center shrink-0">
              <SearchBox />
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="
                lg:hidden shrink-0 p-2 rounded-md
                border border-[var(--color-border)]
                hover:bg-[var(--color-muted)]
                transition-colors
              "
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
            className="
              lg:hidden w-full border-t border-[var(--color-border)]
              mt-3 pt-4 pb-4
            "
          >
            <div className="flex flex-col gap-1 font-[family-name:var(--font-montserrat)] text-sm tracking-[0.15em]">
              {/* Mobile Search */}
              <div className="sm:hidden px-4 pb-3">
                <SearchBox />
              </div>

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
