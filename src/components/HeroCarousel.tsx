"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { heroStats } from "@/content/site";

type HomeSlide = { src: string; mobileSrc?: string; alt: string };

type HeroCarouselProps = {
  slides: HomeSlide[];
};

const HOLD_MS = 5200;
const DISSOLVE_MS = 720;
const MOBILE_MQ = "(max-width: 767px)";

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function smootherstep(t: number) {
  const x = clamp01(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

function coverSource(img: HTMLImageElement, viewW: number, viewH: number) {
  const ir = img.naturalWidth / img.naturalHeight;
  const cr = viewW / viewH;
  if (ir > cr) {
    const sw = img.naturalHeight * cr;
    return { sx: (img.naturalWidth - sw) / 2, sy: 0, sw, sh: img.naturalHeight, dx: 0, dy: 0, dw: viewW, dh: viewH };
  }
  const sh = img.naturalWidth / cr;
  return { sx: 0, sy: (img.naturalHeight - sh) / 2, sw: img.naturalWidth, sh, dx: 0, dy: 0, dw: viewW, dh: viewH };
}

function drawPixelated(
  ctx: CanvasRenderingContext2D,
  sample: HTMLCanvasElement,
  sampleCtx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  viewW: number,
  viewH: number,
  block: number,
  alpha: number,
) {
  if (!img.naturalWidth || alpha <= 0.01) return;
  const size = Math.max(1, block);
  const src = coverSource(img, viewW, viewH);
  const dw = Math.max(1, Math.round(src.dw / size));
  const dh = Math.max(1, Math.round(src.dh / size));

  if (sample.width !== dw) sample.width = dw;
  if (sample.height !== dh) sample.height = dh;
  sampleCtx.imageSmoothingEnabled = false;
  sampleCtx.drawImage(img, src.sx, src.sy, src.sw, src.sh, 0, 0, dw, dh);

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(sample, 0, 0, dw, dh, src.dx, src.dy, src.dw, src.dh);
  ctx.restore();
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [dissolve, setDissolve] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const frameRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const leavingRef = useRef<number | null>(null);
  const indexRef = useRef(0);
  const inViewRef = useRef(true);
  const sizeRef = useRef({ w: 1, h: 1 });

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(motion.matches);
    apply();
    motion.addEventListener("change", apply);
    return () => motion.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const rect = frame.getBoundingClientRect();
      sizeRef.current = {
        w: Math.max(1, Math.round(rect.width)),
        h: Math.max(1, Math.round(rect.height)),
      };
    };
    measure();

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting && entry.intersectionRatio > 0.2;
      },
      { threshold: [0, 0.2, 0.5] },
    );
    io.observe(frame);

    const ro = new ResizeObserver(measure);
    ro.observe(frame);

    return () => {
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    if (count < 2) return;
    const id = window.setInterval(() => {
      if (!inViewRef.current || document.hidden) return;
      setIndex((current) => {
        const next = (current + 1) % count;
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          leavingRef.current = current;
          setLeaving(current);
          setDissolve(true);
        }
        return next;
      });
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, [count]);

  useEffect(() => {
    if (!dissolve || reduceMotion) return;

    const canvas = canvasRef.current;
    const fromIndex = leavingRef.current;
    const toIndex = indexRef.current;
    if (!canvas || fromIndex === null) return;

    const fromImg = imgRefs.current[fromIndex];
    const toImg = imgRefs.current[toIndex];
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx || !fromImg || !toImg) {
      setDissolve(false);
      setLeaving(null);
      return;
    }

    const sample = document.createElement("canvas");
    const sampleCtx = sample.getContext("2d", { alpha: false });
    if (!sampleCtx) return;

    let raf = 0;
    let started = 0;
    let cancelled = false;

    const stop = () => {
      if (cancelled) return;
      cancelled = true;
      window.cancelAnimationFrame(raf);
      setDissolve(false);
      setLeaving(null);
      leavingRef.current = null;
    };

    const run = () => {
      if (cancelled) return;
      started = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        if (!inViewRef.current) {
          stop();
          return;
        }

        const t = Math.min(1, (now - started) / DISSOLVE_MS);
        const e = smootherstep(t);
        const { w, h } = sizeRef.current;

        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }

        const fromPixel = 1 + smootherstep(t / 0.42) * 10;
        const toPixel = 1 + (1 - smootherstep(clamp01((t - 0.48) / 0.52))) * 10;

        ctx.clearRect(0, 0, w, h);
        drawPixelated(ctx, sample, sampleCtx, fromImg, w, h, fromPixel, 1);
        drawPixelated(ctx, sample, sampleCtx, toImg, w, h, toPixel, e);

        if (t < 1) {
          raf = window.requestAnimationFrame(tick);
        } else {
          setDissolve(false);
          setLeaving(null);
          leavingRef.current = null;
        }
      };
      raf = window.requestAnimationFrame(tick);
    };

    Promise.all([fromImg.decode(), toImg.decode()])
      .catch(() => undefined)
      .then(run);

    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchmove", stop, { passive: true });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchmove", stop);
    };
  }, [dissolve, reduceMotion]);

  const mounted = useMemo(() => {
    const set = new Set<number>([index]);
    if (leaving !== null) set.add(leaving);
    if (count > 1) {
      set.add((index + 1) % count);
      set.add((index - 1 + count) % count);
    }
    return set;
  }, [count, index, leaving]);

  if (count === 0) return null;

  return (
    <section
      ref={frameRef}
      id="hero"
      className="hero-viewport relative h-svh min-h-screen w-full overflow-hidden bg-ink"
      aria-roledescription="carousel"
      aria-label="Home banner"
    >
      {slides.map((slide, i) => {
        if (!mounted.has(i)) return null;
        const active = i === index;
        const isLeaving = i === leaving;
        const show = isLeaving || (active && !dissolve);
        const desktopSrc = /mobile/i.test(slide.src) ? "" : slide.src;
        const mobileSrc = slide.mobileSrc || desktopSrc;
        const imgSrc = desktopSrc || mobileSrc;
        if (!imgSrc) return null;

        return (
          <figure key={`${slide.src}-${i}`} className={`absolute inset-0 m-0 ${show ? "z-10 opacity-100" : "z-0 opacity-0"}`}>
            <picture>
              {mobileSrc && desktopSrc ? <source media={MOBILE_MQ} srcSet={mobileSrc} /> : null}
              <img
                ref={(el) => {
                  imgRefs.current[i] = el;
                }}
                src={imgSrc}
                alt={slide.alt}
                draggable={false}
                decoding="async"
                fetchPriority={i === 0 ? "high" : "low"}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </picture>
          </figure>
        );
      })}

      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-[12] h-full w-full"
        style={{ opacity: dissolve ? 1 : 0, transition: "none" }}
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-0 z-[13] hidden bg-ink/20 md:block" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 z-[13] hidden h-36 bg-gradient-to-b from-ink/55 to-transparent md:block"
        aria-hidden="true"
      />
      <div className="hero-grain pointer-events-none absolute inset-0 z-20" aria-hidden="true" />

      <div className="absolute inset-x-0 bottom-0 z-[21] grid grid-cols-2 border-t-2 border-lime bg-navy md:grid-cols-4">
        {heroStats.map((stat, statIndex) => (
          <div
            key={stat.label}
            className={`px-5 py-4 md:px-7 md:py-5 ${
              statIndex < 3 ? "md:border-r md:border-white/15" : ""
            } ${statIndex % 2 === 0 ? "max-md:border-r max-md:border-white/15" : ""} ${
              statIndex < 2 ? "max-md:border-b max-md:border-white/15" : ""
            }`}
          >
            <p className="font-display text-[1.75rem] leading-none font-bold tracking-tight text-lime md:text-[2rem]">
              {stat.value}
            </p>
            <p className="mt-1.5 text-xs leading-snug text-white/75 md:text-[13px]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
