import fs from "node:fs";
import path from "node:path";
import { homeSlides } from "@/content/site";
import { isSanityConfigured } from "@/sanity/env";
import { sanityQuery } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import { HOME_BANNERS_QUERY } from "@/sanity/lib/queries";

export type HomeSlide = { src: string; mobileSrc?: string; alt: string };

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
  const base = filename.replace(/\.[^.]+$/, "").replace(/-mobile$/i, "").toLowerCase();
  const numbered = base.match(/^(\d+)/);
  if (numbered) return Number(numbered[1]);
  for (const [word, index] of Object.entries(WORD_ORDER)) {
    if (base.startsWith(word)) return index;
  }
  return 500;
}

function isImageFile(name: string) {
  if (!/\.(jpe?g|png|webp|avif)$/i.test(name)) return false;
  if (/carousell/i.test(name)) return false;
  if (/\.txt$/i.test(name)) return false;
  if (/^readme/i.test(name)) return false;
  return true;
}

function isMobileBanner(name: string) {
  const base = name.replace(/\.[^.]+$/, "");
  return /mobile/i.test(base);
}

function stem(name: string) {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/-mobilee$/i, "")
    .replace(/-mobile$/i, "")
    .toLowerCase();
}

function looksLikeMobileSrc(src: string) {
  return /mobile/i.test(src);
}

function listHomeImages() {
  const dir = path.join(process.cwd(), "public", "home");
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((entry) => entry.isFile() && isImageFile(entry.name))
      .map((entry) => entry.name);
  } catch {
    return [];
  }
}

function localHomeSlides(): HomeSlide[] {
  const names = listHomeImages();
  const altBySrc = Object.fromEntries(homeSlides.map((slide) => [slide.src, slide.alt]));
  const mobileByStem = new Map<string, string>();
  for (const name of names.filter(isMobileBanner)) {
    const key = stem(name);
    if (!mobileByStem.has(key) || /-mobile\./i.test(name)) {
      mobileByStem.set(key, `/home/${name}`);
    }
  }
  const desktop = names
    .filter((name) => !isMobileBanner(name))
    .sort((a, b) => slideIndex(a) - slideIndex(b) || a.localeCompare(b, undefined, { numeric: true }));

  if (desktop.length > 0) {
    return desktop.map((name, index) => {
      const src = `/home/${name}`;
      return {
        src,
        mobileSrc: mobileByStem.get(stem(name)),
        alt: altBySrc[src] ?? `MONOFIX home banner ${index + 1}`,
      };
    });
  }

  return homeSlides.map((slide) => ({ ...slide }));
}

function localMobileByOrder() {
  return listHomeImages()
    .filter(isMobileBanner)
    .sort((a, b) => slideIndex(a) - slideIndex(b) || a.localeCompare(b, undefined, { numeric: true }))
    .map((name) => `/home/${name}`);
}

type SanityImageValue = {
  asset?: {
    metadata?: {
      dimensions?: { width?: number; height?: number; aspectRatio?: number };
    };
  };
  alt?: string;
};

type SanityBanner = {
  _id: string;
  title?: string;
  order?: number;
  image?: SanityImageValue;
  mobileImage?: SanityImageValue;
};

function isPortrait(image?: SanityImageValue) {
  const dimensions = image?.asset?.metadata?.dimensions;
  if (!dimensions) return false;
  const ratio =
    dimensions.aspectRatio ??
    (dimensions.width && dimensions.height ? dimensions.width / dimensions.height : undefined);
  return ratio != null && ratio < 1;
}

function splitBannerImages(banner: SanityBanner) {
  const desk = banner.image;
  const mob = banner.mobileImage;
  const deskPortrait = Boolean(desk?.asset) && isPortrait(desk);
  const mobPortrait = mob?.asset ? isPortrait(mob) : undefined;

  if (deskPortrait && mob?.asset && mobPortrait === false) {
    return { desktop: mob, mobile: desk };
  }
  if (deskPortrait) {
    return { desktop: undefined, mobile: desk };
  }
  if (mob?.asset && mobPortrait === false) {
    return { desktop: desk, mobile: undefined };
  }
  return { desktop: desk, mobile: mob };
}

export async function getHomeSlides(): Promise<HomeSlide[]> {
  const local = localHomeSlides();
  const localMobile = localMobileByOrder();

  if (isSanityConfigured()) {
    const banners = await sanityQuery<SanityBanner[]>(HOME_BANNERS_QUERY);
    const mapped =
      banners
        ?.map((banner) => {
          const { desktop, mobile } = splitBannerImages(banner);
          return {
            src: urlForImage(desktop, 2400),
            sanityMobile: urlForImage(mobile, 1600, true),
            alt: desktop?.alt || mobile?.alt || banner.title || "MONOFIX home banner",
            order: banner.order,
            title: banner.title,
          };
        })
        .sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || slideIndex(a.title || "") - slideIndex(b.title || ""))
        .map((slide, index) => {
          const desktopSrc = looksLikeMobileSrc(slide.src) ? "" : slide.src;
          return {
            src: desktopSrc || local[index]?.src || "",
            mobileSrc: slide.sanityMobile || localMobile[index] || local[index]?.mobileSrc,
            alt: slide.alt,
          };
        })
        .filter((slide) => slide.src) ?? [];
    if (mapped.length > 0) return mapped;
  }

  return local;
}
