"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    
    const root = document.documentElement;
    if (initialTheme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setIsAnimating(true);
    
    // Wait for animation to start
    setTimeout(() => {
      setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }, 300);
    
    // Remove animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
      
      {/* Slide Animation Overlay */}
      {isAnimating && (
        <div
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={{
            background: theme === "dark" 
              ? "linear-gradient(to right, #000000, #1a1a1a)" 
              : "linear-gradient(to right, #ffffff, #f5f5f5)",
            animation: "slideTheme 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        />
      )}
      
      <style jsx global>{`
        @keyframes slideTheme {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}