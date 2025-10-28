"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-5 h-5 opacity-80">
        {/* Placeholder to prevent layout shift */}
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-5 h-5 opacity-80 hover:opacity-100 transition-opacity"
      aria-label="Toggle theme"
    >
      <Sun
        className={`w-5 h-5 absolute transition-all duration-500 ${
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        }`}
      />
      <Moon
        className={`w-5 h-5 absolute transition-all duration-500 ${
          theme === "light"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        }`}
      />
    </button>
  );
}