"use client";

import Image from "next/image";
import {
  BadgePercent,
  ClipboardCheck,
  Layers,
  Package,
  Recycle,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import type { CaseAccent, CaseStudy } from "@/lib/casestudies";

const icons: Record<string, LucideIcon> = {
  "pc-products": Package,
  "bkk-cost": BadgePercent,
  "egypt-audit": ClipboardCheck,
  "europe-ppwr": Recycle,
  "alcobev-resource": Users,
  "beauty-cartons": Layers,
  "sugar-gmp": ShieldCheck,
};

const accents: Record<
  CaseAccent,
  {
    tile: string;
    number: string;
    lightNumber: string;
    bar: string;
    darkCard: string;
    lightCard: string;
    pill: string;
  }
> = {
  lime: {
    tile: "bg-lime text-ink",
    number: "text-lime",
    lightNumber: "text-navy",
    bar: "bg-lime",
    darkCard: "bg-lime/15 border-lime/45 hover:bg-lime/25",
    lightCard: "border-lime hover:bg-lime/15",
    pill: "bg-lime text-ink",
  },
  blue: {
    tile: "bg-blue text-white",
    number: "text-blue",
    lightNumber: "text-blue",
    bar: "bg-blue",
    darkCard: "bg-blue/15 border-blue/45 hover:bg-blue/25",
    lightCard: "border-blue/40 hover:bg-blue/[0.04]",
    pill: "bg-blue text-white",
  },
  pink: {
    tile: "bg-pink text-white",
    number: "text-pink",
    lightNumber: "text-pink",
    bar: "bg-pink",
    darkCard: "bg-pink/15 border-pink/45 hover:bg-pink/25",
    lightCard: "border-pink/40 hover:bg-pink/[0.04]",
    pill: "bg-pink text-white",
  },
  navy: {
    tile: "bg-navy text-lime",
    number: "text-white",
    lightNumber: "text-navy",
    bar: "bg-white",
    darkCard: "bg-white/10 border-white/35 hover:bg-white/15",
    lightCard: "border-navy/25 hover:bg-navy/[0.04]",
    pill: "bg-navy text-lime",
  },
};

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden>
      <path
        d={dir === "prev" ? "M14.5 5.5 8 12l6.5 6.5" : "M9.5 5.5 16 12l-6.5 6.5"}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: CaseStudy[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];
  const titleId = useId();
  const image = item?.image?.trim();

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/92 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 grid size-11 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition hover:bg-lime hover:text-ink"
        aria-label="Close case study"
      >
        <CloseIcon />
      </button>

      {items.length > 1 ? (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onPrev();
            }}
            className="absolute top-1/2 left-3 z-10 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition hover:bg-lime hover:text-ink sm:left-6"
            aria-label="Previous case study"
          >
            <Chevron dir="prev" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNext();
            }}
            className="absolute top-1/2 right-3 z-10 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition hover:bg-lime hover:text-ink sm:right-6"
            aria-label="Next case study"
          >
            <Chevron dir="next" />
          </button>
        </>
      ) : null}

      <figure
        className="flex max-h-full w-full max-w-4xl flex-col items-center overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        {image ? (
          <div className="relative w-full overflow-hidden rounded-2xl bg-navy">
            <div className="relative mx-auto aspect-[16/9] max-h-[52vh] w-full">
              <Image src={image} alt={item.title} fill className="object-contain" sizes="(min-width: 1024px) 56rem, 100vw" priority />
            </div>
          </div>
        ) : null}
        <figcaption className="mt-4 w-full max-w-3xl rounded-2xl bg-navy px-6 py-8 text-center text-white sm:px-10">
          <p className="text-[10px] font-semibold tracking-[0.22em] text-lime uppercase">
            {item.area} · {index + 1} / {items.length}
          </p>
          <h3 id={titleId} className="font-display mt-2 text-2xl leading-tight sm:text-3xl">
            {item.title}
          </h3>
          {item.detail ? <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">{item.detail}</p> : null}
        </figcaption>
      </figure>
    </div>,
    document.body,
  );
}

function CardInner({ item, index, dark, onPink }: { item: CaseStudy; index: number; dark: boolean; onPink: boolean }) {
  const highlighted = Boolean(item.highlight);
  const visual = accents[item.accent ?? "lime"];
  const Icon = icons[item.id] ?? Package;
  const image = item.image?.trim();

  return (
    <>
      <span className={`absolute inset-x-0 top-0 h-1.5 ${highlighted ? "bg-ink" : visual.bar}`} aria-hidden="true" />
      {image ? (
        <div className="relative h-28 w-full overflow-hidden rounded-xl sm:h-16 sm:w-20 sm:shrink-0">
          <Image src={image} alt="" fill className="object-cover" sizes="160px" />
        </div>
      ) : null}
      <span
        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          highlighted ? "bg-ink text-lime" : visual.tile
        }`}
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1 text-left">
        <p
          className={`font-display text-sm tracking-wide ${
            highlighted ? "text-ink/70" : dark ? visual.number : visual.lightNumber
          }`}
        >
          {highlighted ? "Featured" : String(index + 1).padStart(2, "0")}
        </p>
        <h3 className={`font-display mt-1 text-lg leading-snug sm:text-xl ${highlighted || !dark ? "text-ink" : "text-white"}`}>
          {item.title}
        </h3>
      </div>
      <span
        className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold tracking-wide uppercase ${
          highlighted ? "bg-ink text-lime" : onPink && item.accent === "pink" ? "bg-navy text-lime" : visual.pill
        }`}
      >
        {item.area}
      </span>
    </>
  );
}

export function CaseStudyGrid({ items, tone = "dark" }: { items: CaseStudy[]; tone?: "dark" | "light" | "onPink" }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dark = tone === "dark";
  const onPink = tone === "onPink";

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((current) => (current === null ? current : (current + items.length - 1) % items.length)),
    [items.length],
  );
  const next = useCallback(
    () => setOpenIndex((current) => (current === null ? current : (current + 1) % items.length)),
    [items.length],
  );

  return (
    <>
      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {items.map((item, index) => {
          const highlighted = Boolean(item.highlight);
          const visual = accents[item.accent ?? "lime"];
          const className = `relative flex w-full cursor-pointer flex-wrap items-center gap-4 overflow-hidden rounded-2xl border px-5 py-5 pt-7 text-left transition-colors duration-200 ${
            highlighted
              ? "border-lime bg-lime"
              : onPink
                ? "border-ink/20 bg-white shadow-[0_12px_28px_rgba(7,21,31,0.12)] hover:border-ink/35"
                : dark
                  ? visual.darkCard
                  : `bg-white ${visual.lightCard}`
          }`;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setOpenIndex(index)}
              className={className}
              aria-label={`View case study: ${item.title}`}
            >
              <CardInner item={item} index={index} dark={dark} onPink={onPink} />
            </button>
          );
        })}
      </div>
      {openIndex !== null ? (
        <Lightbox items={items} index={openIndex} onClose={close} onPrev={prev} onNext={next} />
      ) : null}
    </>
  );
}
