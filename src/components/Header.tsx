"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";

const links = nav.filter((item) => item.id !== "contact");

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const isHome = pathname === "/";
  const solid = !isHome || scrolled || open;
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const setHeight = () => {
      document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    };
    setHeight();
    const observer = new ResizeObserver(setHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, [open, solid]);

  useEffect(() => {
    if (!isHome) {
      setActive("");
      return;
    }

    const ids = ["hero", "about", "why", "services", "gallery", "sustainability", "testimonials", "insights", "casestudies", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    ids.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow] duration-300 ${
        solid
          ? "border-b-2 border-lime bg-navy/90 shadow-[0_10px_32px_rgba(12,44,74,0.35)] backdrop-blur-md"
          : "border-b-2 border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10 lg:py-5">
        <Link href="/#hero" className="flex min-w-0 shrink-0 items-center" onClick={() => setOpen(false)}>
          <Image
            src="/logo-nav.png"
            alt={site.name}
            width={480}
            height={120}
            className="h-11 w-auto max-w-[220px] object-contain sm:h-12 sm:max-w-[260px]"
            priority
            unoptimized
          />
        </Link>

        <nav className="hidden items-center gap-0.5 rounded-full px-1 py-1 xl:flex">
          {links.map((item) => {
            const isActive = active === item.id;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`cursor-pointer rounded-full px-3 py-2 text-[13px] font-medium whitespace-nowrap transition ${
                  isActive ? "bg-lime text-ink" : "text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/#contact"
            className={`cursor-pointer rounded-full px-4 py-2 text-[13px] font-semibold whitespace-nowrap ${
              solid ? "bg-lime text-ink" : "bg-ink text-white"
            }`}
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/30 xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className={`h-0.5 w-5 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open ? (
        <nav id="mobile-nav" className="grid gap-1 bg-ink/90 px-5 py-3 backdrop-blur-md xl:hidden">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="mt-1 cursor-pointer rounded-full bg-lime px-4 py-2.5 text-center text-sm font-semibold text-ink"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
