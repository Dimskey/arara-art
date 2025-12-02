"use client";
import { useEffect, useState } from "react";

export default function Fade({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className={mounted ? "fade-enter-active" : "fade-enter"}>
      {children}
    </div>
  );
}
