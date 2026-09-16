import gallery from "@/content/gallery.json";
import { isSanityConfigured } from "@/sanity/env";
import { sanityQuery } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import { GALLERY_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export type GalleryItem = {
  id: string;
  title: string;
  image: string;
  note?: string;
  active?: boolean;
  highlight?: boolean;
  order?: number;
};

function arrange(items: GalleryItem[], max?: number): GalleryItem[] {
  const sorted = [...items]
    .filter((item) => item.active !== false && item.image)
    .sort((a, b) => {
      if (Boolean(a.highlight) !== Boolean(b.highlight)) return a.highlight ? -1 : 1;
      return (a.order ?? 99) - (b.order ?? 99);
    });

  return typeof max === "number" ? sorted.slice(0, max) : sorted;
}

function fromJson(max?: number): GalleryItem[] {
  return arrange(gallery.items as GalleryItem[], max);
}

type SanityGallery = {
  _id: string;
  title: string;
  note?: string;
  order?: number;
  featured?: boolean;
  image?: { asset?: unknown; alt?: string };
};

async function loadGallery(max?: number): Promise<GalleryItem[]> {
  if (isSanityConfigured()) {
    const rows = await sanityQuery<SanityGallery[]>(GALLERY_QUERY);
    if (rows?.length) {
      const mapped = arrange(
        rows.map((row) => ({
          id: row._id,
          title: row.title,
          note: row.note,
          image: urlForImage(row.image, 2400, true),
          order: row.order,
          highlight: Boolean(row.featured),
        })),
        max,
      );
      if (mapped.length) return mapped;
    }
  }

  return fromJson(max);
}

export async function getHomeGallery(): Promise<GalleryItem[]> {
  let max = gallery.show ?? 4;
  if (isSanityConfigured()) {
    const settings = await sanityQuery<{ galleryToShow?: number }>(SITE_SETTINGS_QUERY);
    if (settings?.galleryToShow) max = settings.galleryToShow;
  }
  return loadGallery(max);
}

export async function getGallery(): Promise<GalleryItem[]> {
  return loadGallery();
}
