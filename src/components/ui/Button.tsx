"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "outline" | "solid";
}

export default function Button({
  children,
  variant = "outline",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "px-14 py-4 font-[family-name:var(--font-montserrat)] text-xs tracking-[0.2em] transition-all duration-300 ",
        variant === "outline" &&
          "bg-transparent border border-[var(--color-border)] hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)]",
        variant === "solid" &&
          "bg-transparent text-[var(--color-background)] hover:bg-[var(--color-accent)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}