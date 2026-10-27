"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { caseVisuals, type CaseStudy } from "@/lib/casestudies";

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
  const visuals = item ? caseVisuals(item) : [];
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    setSlide(0);
  }, [index]);

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
  const src = visuals[slide] ?? visuals[0];

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
        className="grid max-h-full w-full max-w-6xl overflow-y-auto rounded-3xl bg-navy text-white lg:grid-cols-[1.15fr_0.85fr]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="min-w-0">
          {src ? (
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
              <Image
                src={src}
                alt={item.title}
                fill
                unoptimized
                className="object-cover object-center"
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
              />
            </div>
          ) : null}
          {item.caption ? (
            <div className="px-5 py-4 sm:px-6">
              {item.resultLabel ? (
                <p className="text-[10px] font-semibold tracking-[0.22em] text-lime uppercase">{item.resultLabel}</p>
              ) : null}
              <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-white/80 sm:text-[15px]">{item.caption}</p>
            </div>
          ) : null}
        </div>
        <figcaption className="flex flex-col justify-center px-6 py-6 sm:px-8 sm:py-8">
          <p className="text-[10px] font-semibold tracking-[0.22em] text-lime uppercase">{item.area}</p>
          <h3 id={titleId} className="font-display mt-3 text-2xl leading-tight sm:text-[2rem]">
            {item.title}
          </h3>
          {item.lead ? <p className="mt-3 text-sm font-medium text-lime sm:text-base">{item.lead}</p> : null}
          {item.detail ? (
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-white/80 sm:text-[15px]">{item.detail}</p>
          ) : null}
          {item.timeline ? (
            <div className="mt-6">
              <p className="text-[10px] font-semibold tracking-[0.22em] text-lime uppercase">TIMELINE</p>
              <p className="mt-1 text-sm text-white/90">{item.timeline}</p>
              {item.timelineNote ? <p className="text-sm text-white/70">{item.timelineNote}</p> : null}
            </div>
          ) : null}
        </figcaption>
      </figure>
    </div>,
    document.body,
  );
}

export function CaseStudyGrid({ items, tone = "dark" }: { items: CaseStudy[]; tone?: "dark" | "light" | "onPink" }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {items.map((item, index) => {
          const thumb = caseVisuals(item)[0];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setOpenIndex(index)}
              className={`overflow-hidden rounded-2xl text-left transition hover:-translate-y-0.5 ${
                onPink
                  ? "bg-white shadow-[0_10px_22px_rgba(7,21,31,0.12)] hover:shadow-[0_14px_28px_rgba(7,21,31,0.16)]"
                  : "bg-white shadow-[0_8px_18px_rgba(7,21,31,0.08)]"
              }`}
              aria-label={`View case study: ${item.title}`}
            >
              <div className="relative aspect-[16/9] bg-navy">
                {thumb ? (
                  <Image
                    src={thumb}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(min-width: 1280px) 18vw, (min-width: 768px) 30vw, 50vw"
                  />
                ) : null}
                <span className="absolute top-2 left-2 rounded-full bg-ink/70 px-2 py-0.5 text-[10px] font-bold tracking-wide text-lime">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="px-3 py-3">
                <p className="text-[10px] font-semibold tracking-[0.18em] text-blue uppercase">{item.area}</p>
                <h3 className="font-display mt-1 line-clamp-2 text-sm leading-snug text-ink sm:text-base">{item.title}</h3>
              </div>
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
