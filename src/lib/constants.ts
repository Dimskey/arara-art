export const NAV_LINKS = [
  { label: "HOME", href: "" },
  { label: "CATALOG", href: "/product" },
  { label: "CONTACT", href: "/#contact" },
  { label: "ABOUT", href: "/#about" },
] as const;

export const CATEGORIES = [
  { id: "rings", label: "RINGS", icon: "circle" },
  { id: "pendants", label: "PENDANTS", icon: "diamond" },
  { id: "earrings", label: "EARRINGS", icon: "sparkles" },
  { id: "bracelets", label: "BRACELETS", icon: "hexagon" },
  { id: "watches", label: "WATCHES", icon: "clock" },
] as const;