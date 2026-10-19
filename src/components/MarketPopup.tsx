"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { popup } from "@/content/site";

export function MarketPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("monofix-geo-dismissed") === "1") return;
    const timer = window.setTimeout(() => setVisible(true), 4000);
    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    sessionStorage.setItem("monofix-geo-dismissed", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside
      className="fixed inset-x-3 bottom-3 z-50 max-h-[min(85svh,36rem)] w-auto overflow-y-auto rounded-2xl border border-white/15 bg-navy p-5 text-white shadow-[0_24px_60px_rgba(7,21,31,0.45)] sm:inset-x-auto sm:top-1/2 sm:right-8 sm:bottom-auto sm:w-[min(100%-2rem,22rem)] sm:-translate-y-1/2 sm:p-6 [padding-bottom:max(1.25rem,env(safe-area-inset-bottom))] sm:[padding-bottom:1.5rem]"
      role="dialog"
      aria-labelledby="geo-popup-title"
    >
      <button
        type="button"
        onClick={dismiss}
        className="absolute right-3 top-3 grid h-8 w-8 cursor-pointer place-items-center rounded-full text-lg text-white/70 hover:bg-white/10"
        aria-label="Close"
      >
        ×
      </button>
      <h2 id="geo-popup-title" className="font-display pr-8 text-xl leading-tight sm:text-2xl">
        {popup.title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-white/80">{popup.body}</p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {popup.regions.map((region) => (
          <Link
            key={region.id}
            href={`/?region=${region.id}#contact`}
            onClick={dismiss}
            className="cursor-pointer rounded-xl bg-white/10 px-3 py-4 text-center transition hover:bg-white/20"
          >
            <span className="block font-display text-xl">{region.label}</span>
            <span className="mt-2 block text-xs leading-snug text-white/70">{region.detail}</span>
          </Link>
        ))}
      </div>
      <Link
        href="/#contact"
        onClick={dismiss}
        className="mt-5 flex cursor-pointer items-center justify-center rounded-full bg-lime px-4 py-3 text-sm font-bold text-ink"
      >
        {popup.cta}
      </Link>
    </aside>
  );
}
