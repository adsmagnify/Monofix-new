import studies from "@/content/casestudies.json";
import { isSanityConfigured } from "@/sanity/env";
import { sanityQuery } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import { CASE_STUDIES_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export type CaseAccent = "blue" | "lime" | "pink" | "navy";

export type CaseStudy = {
  id: string;
  title: string;
  area: string;
  lead?: string;
  detail?: string;
  caption?: string;
  resultLabel?: string;
  timeline?: string;
  timelineNote?: string;
  image?: string;
  images?: string[];
  href?: string;
  active?: boolean;
  highlight?: boolean;
  accent?: CaseAccent;
  order?: number;
};

const ACCENTS: CaseAccent[] = ["lime", "blue", "pink", "navy"];

export function caseVisuals(item: CaseStudy): string[] {
  const fromList = (item.images ?? []).map((src) => src.trim()).filter(Boolean);
  if (fromList.length) return fromList;
  const single = item.image?.trim();
  return single ? [single] : [];
}

function arrange(items: CaseStudy[], max: number): CaseStudy[] {
  return [...items]
    .filter((item) => item.active !== false)
    .sort((a, b) => {
      if (Boolean(a.highlight) !== Boolean(b.highlight)) return a.highlight ? -1 : 1;
      return (a.order ?? 99) - (b.order ?? 99);
    })
    .slice(0, max)
    .map((item, index) => ({
      ...item,
      accent: item.accent ?? ACCENTS[index % ACCENTS.length],
    }));
}

function fromJson(): CaseStudy[] {
  return arrange(studies.items as CaseStudy[], studies.show ?? 2);
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const local = fromJson();
  if (local.length) return local;
  if (!isSanityConfigured()) return local;

  const [rows, settings] = await Promise.all([
    sanityQuery<
      Array<{
        _id: string;
        title: string;
        area: string;
        detail?: string;
        href?: string;
        accent?: CaseAccent;
        order?: number;
        featured?: boolean;
        image?: { asset?: unknown; alt?: string };
      }>
    >(CASE_STUDIES_QUERY),
    sanityQuery<{ caseStudiesToShow?: number }>(SITE_SETTINGS_QUERY),
  ]);

  if (!rows?.length) return local;

  return arrange(
    rows.map((row) => ({
      id: row._id,
      title: row.title,
      area: row.area,
      detail: row.detail,
      href: row.href,
      image: urlForImage(row.image, 900) || undefined,
      accent: row.accent,
      order: row.order,
      highlight: Boolean(row.featured),
    })),
    settings?.caseStudiesToShow ?? studies.show ?? 2,
  );
}
