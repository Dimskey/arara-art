"use client";

import Link from "next/link";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useLang } from "@/contexts/langContext";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { t } = useLang();

  // Helper function to ensure t() returns string
  const tString = (key: string): string => {
    const value = t(key);
    return typeof value === "string" ? value : key;
  };

  const bgClass = isDark ? "bg-white text-neutral-900" : "bg-black text-neutral-100";
  const borderClass = isDark ? "border-black" : "border-white";
  const subtleText = isDark ? "text-neutral-500" : "text-neutral-400";
  const linkHover = isDark ? "hover:text-neutral-900" : "hover:text-white";

  return (
    <footer className={`${bgClass} border-t ${borderClass}`}>
      <div id="contact" className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Brand / Contact - Arara Art */}
          <div className="space-y-6">
            <div className="text-3xl tracking-[0.25em] font-semibold ">
              {tString("footer.brand")}
            </div>
            <p className={`text-sm font-family-sans ${subtleText}`}>{tString("footer.description")}</p>
            <div className="space-y-3 text-sm font-family-sans">
              <p className={subtleText}>{tString("footer.address")}</p>
              <p className={subtleText}>{tString("footer.phone")}</p>
              <p className={subtleText}>{tString("footer.email")}</p>
            </div>
           
            <div className="flex items-center gap-4 pt-2">
              <Link href="#" aria-label="Facebook" className={`${subtleText} ${linkHover}`}><Facebook size={18} /></Link>
              <Link href="#" aria-label="YouTube" className={`${subtleText} ${linkHover}`}><Youtube size={18} /></Link>
              <Link href="#" aria-label="Twitter" className={`${subtleText} ${linkHover}`}><Twitter size={18} /></Link>
              <Link href="#" aria-label="Instagram" className={`${subtleText} ${linkHover}`}><Instagram size={18} /></Link>
            </div>
          </div>

          {/* Google Maps */}
          <div>
             <div className="text-xs font-familiy-sans uppercase mb-4">{tString("footer.locationTitle")}</div>
            <div className=" overflow-hidden border border-neutral-700 shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.730499696782!2d112.70232577373625!3d-7.27147769273554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fdc85711b3f7%3A0x47baa64e5882ad2b!2sArara%20Art%2C%20Ethnic%20Accessories!5e0!3m2!1sid!2sid!4v1759825803827!5m2!1sid!2sid"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={` font-family-sans border-t ${borderClass}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 text-xs flex items-center justify-between">
            <div className={subtleText}>{tString("footer.copyright")}</div>
          <div className="flex items-center gap-6">
            <p>Made With <span className="line-through">Love </span>Passion By 
            <Link href="https://dimkeys.is-a.dev" className={` font-family-sans underline ${subtleText} ${linkHover}`}>  Dimskey</Link>
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
}






