import fs from "node:fs";
import path from "node:path";
import { homeSlides } from "@/content/site";

export type HomeSlide = { src: string; alt: string };

const WORD_ORDER: Record<string, number> = {
  one: 1,
  two: 2,
  twoo: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
};

function slideIndex(filename: string) {
  const base = filename.replace(/\.[^.]+$/, "").toLowerCase();
  const numbered = base.match(/^(\d+)/);
  if (numbered) return Number(numbered[1]);
  for (const [word, index] of Object.entries(WORD_ORDER)) {
    if (base.startsWith(word)) return index;
  }
  return 500;
}

function isBannerFile(name: string) {
  if (!/\.(jpe?g|png|webp|avif)$/i.test(name)) return false;
  if (/carousell/i.test(name)) return false;
  if (/\.txt$/i.test(name)) return false;
  if (/^readme/i.test(name)) return false;
  return true;
}

/** Reads `public/home` at build/request time. Drop new files in that folder — no code edit needed. */
export function getHomeSlides(): HomeSlide[] {
  const dir = path.join(process.cwd(), "public", "home");
  const altBySrc = Object.fromEntries(homeSlides.map((slide) => [slide.src, slide.alt]));

  try {
    const files = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((entry) => entry.isFile() && isBannerFile(entry.name))
      .map((entry) => entry.name)
      .sort((a, b) => slideIndex(a) - slideIndex(b) || a.localeCompare(b, undefined, { numeric: true }));

    if (files.length > 0) {
      return files.map((name, index) => {
        const src = `/home/${name}`;
        return {
          src,
          alt: altBySrc[src] ?? `MONOFIX home banner ${index + 1}`,
        };
      });
    }
  } catch {
    // Fall through to the known six-slide list.
  }

  return [...homeSlides];
}
