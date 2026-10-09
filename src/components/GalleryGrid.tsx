"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

export type GalleryVisual = {
  id: string;
  title: string;
  image: string;
  note?: string;
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
  items: GalleryVisual[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];
  const titleId = useId();

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
        aria-label="Close gallery"
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
            aria-label="Previous image"
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
            aria-label="Next image"
          >
            <Chevron dir="next" />
          </button>
        </>
      ) : null}

      <figure
        className="flex max-h-full w-full max-w-5xl flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative w-full overflow-hidden rounded-2xl bg-navy">
          <div className="relative mx-auto aspect-[16/9] max-h-[68vh] w-full">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-contain"
              sizes="(min-width: 1024px) 64rem, 100vw"
              priority
            />
          </div>
        </div>
        <figcaption className="mt-4 w-full max-w-3xl text-center text-white">
          <p className="text-[10px] font-semibold tracking-[0.22em] text-lime uppercase">
            {index + 1} / {items.length}
          </p>
          <h3 id={titleId} className="font-display mt-2 text-2xl leading-tight sm:text-3xl">
            {item.title}
          </h3>
          {item.note ? <p className="mt-2 text-sm leading-relaxed text-white/75 sm:text-base">{item.note}</p> : null}
        </figcaption>
      </figure>
    </div>,
    document.body,
  );
}

export function GalleryGrid({
  items,
  layout = "home",
}: {
  items: GalleryVisual[];
  layout?: "home" | "page";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((current) => (current === null ? current : (current + items.length - 1) % items.length)),
    [items.length],
  );
  const next = useCallback(
    () => setOpenIndex((current) => (current === null ? current : (current + 1) % items.length)),
    [items.length],
  );

  if (!items.length) return null;

  if (layout === "page") {
    return (
      <>
        <div className="grid gap-12 md:grid-cols-2">
          {items.map((item, index) => (
            <article key={item.id} className="overflow-hidden rounded-3xl bg-white">
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="relative block aspect-[16/9] w-full cursor-pointer bg-ink"
                aria-label={`View ${item.title}`}
              >
                <Image src={item.image} alt={item.title} fill className="object-contain" sizes="(min-width: 768px) 50vw, 100vw" />
              </button>
              <div className="p-8 sm:p-10">
                <h2 className="font-display text-3xl">{item.title}</h2>
                {item.note ? <p className="mt-3 text-lg text-slate">{item.note}</p> : null}
              </div>
            </article>
          ))}
        </div>
        {openIndex !== null ? (
          <Lightbox items={items} index={openIndex} onClose={close} onPrev={prev} onNext={next} />
        ) : null}
      </>
    );
  }

  return (
    <>
      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-ink text-left aspect-[16/9] ${
              index === 0 ? "col-span-2 lg:row-span-2" : ""
            }`}
            aria-label={`View ${item.title}`}
          >
            <Image src={item.image} alt={item.title} fill className="object-contain transition duration-300 group-hover:scale-[1.03]" sizes="50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <h3 className="font-display text-lg leading-tight sm:text-xl">{item.title}</h3>
            </div>
          </button>
        ))}
      </div>
      {openIndex !== null ? (
        <Lightbox items={items} index={openIndex} onClose={close} onPrev={prev} onNext={next} />
      ) : null}
    </>
  );
}
