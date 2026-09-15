"use client";

import { useEffect, useRef, useState } from "react";

type HomeSlide = { src: string; alt: string };

type HeroCarouselProps = {
  slides: HomeSlide[];
};

const HOLD_MS = 5200;
const DISSOLVE_MS = 900;

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
    return { sx: (img.naturalWidth - sw) / 2, sy: 0, sw, sh: img.naturalHeight };
  }
  const sh = img.naturalWidth / cr;
  return { sx: 0, sy: (img.naturalHeight - sh) / 2, sw: img.naturalWidth, sh };
}

function drawPixelBlur(
  ctx: CanvasRenderingContext2D,
  sample: HTMLCanvasElement,
  sampleCtx: CanvasRenderingContext2D,
  mosaic: HTMLCanvasElement,
  mosaicCtx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  viewW: number,
  viewH: number,
  block: number,
  blur: number,
  alpha: number,
) {
  if (!img.naturalWidth || alpha <= 0.01) return;
  const size = Math.max(1, block);
  const dw = Math.max(1, Math.round(viewW / size));
  const dh = Math.max(1, Math.round(viewH / size));
  const src = coverSource(img, viewW, viewH);

  sample.width = dw;
  sample.height = dh;
  sampleCtx.imageSmoothingEnabled = false;
  sampleCtx.clearRect(0, 0, dw, dh);
  sampleCtx.drawImage(img, src.sx, src.sy, src.sw, src.sh, 0, 0, dw, dh);

  if (mosaic.width !== viewW || mosaic.height !== viewH) {
    mosaic.width = viewW;
    mosaic.height = viewH;
  }
  mosaicCtx.imageSmoothingEnabled = false;
  mosaicCtx.clearRect(0, 0, viewW, viewH);
  mosaicCtx.drawImage(sample, 0, 0, dw, dh, 0, 0, viewW, viewH);

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.filter = blur > 0.4 ? `blur(${blur}px)` : "none";
  ctx.drawImage(mosaic, 0, 0, viewW, viewH);
  ctx.filter = "none";
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

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    if (count < 2) return;
    const id = window.setInterval(() => {
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
    const frame = frameRef.current;
    const fromIndex = leavingRef.current;
    const toIndex = indexRef.current;
    if (!canvas || !frame || fromIndex === null) return;

    const fromImg = imgRefs.current[fromIndex];
    const toImg = imgRefs.current[toIndex];
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx || !fromImg || !toImg) {
      setDissolve(false);
      setLeaving(null);
      return;
    }

    const sample = document.createElement("canvas");
    const sampleCtx = sample.getContext("2d");
    const mosaic = document.createElement("canvas");
    const mosaicCtx = mosaic.getContext("2d");
    if (!sampleCtx || !mosaicCtx) return;

    let raf = 0;
    let started = 0;
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      started = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        const t = Math.min(1, (now - started) / DISSOLVE_MS);
        const e = smootherstep(t);
        const rect = frame.getBoundingClientRect();
        const w = Math.max(1, Math.round(rect.width));
        const h = Math.max(1, Math.round(rect.height));

        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }

        const fromPixel = 1 + smootherstep(t / 0.42) * 12;
        const fromBlur = smootherstep(clamp01((t - 0.22) / 0.5)) * 9;
        const toPixel = 1 + (1 - smootherstep(clamp01((t - 0.48) / 0.52))) * 12;
        const toBlur = (1 - smootherstep(clamp01((t - 0.4) / 0.6))) * 9;

        ctx.clearRect(0, 0, w, h);
        drawPixelBlur(ctx, sample, sampleCtx, mosaic, mosaicCtx, fromImg, w, h, fromPixel, fromBlur, 1);
        drawPixelBlur(ctx, sample, sampleCtx, mosaic, mosaicCtx, toImg, w, h, toPixel, toBlur, e);

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

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
    };
  }, [dissolve, reduceMotion]);

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
        const active = i === index;
        const isLeaving = i === leaving;
        const show = isLeaving || (active && !dissolve);

        return (
          <figure key={slide.src} className={`absolute inset-0 m-0 ${show ? "z-10 opacity-100" : "z-0 opacity-0"}`}>
            <img
              ref={(el) => {
                imgRefs.current[i] = el;
              }}
              src={slide.src}
              alt={slide.alt}
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </figure>
        );
      })}

      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-[12] h-full w-full"
        style={{ opacity: dissolve ? 1 : 0, transition: "none" }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 z-[13] bg-ink/20" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 z-[13] h-36 bg-gradient-to-b from-ink/55 to-transparent"
        aria-hidden="true"
      />
      <div className="hero-grain pointer-events-none absolute inset-0 z-20" aria-hidden="true" />
    </section>
  );
}
