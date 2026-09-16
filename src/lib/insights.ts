import insights from "@/content/insights.json";
import prices from "@/content/prices.json";
import { isSanityConfigured } from "@/sanity/env";
import { sanityQuery } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import { INSIGHTS_QUERY, MATERIAL_PRICES_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export type InsightAccent = "blue" | "lime" | "pink" | "navy";

export type InsightItem = {
  id: string;
  title: string;
  text: string;
  image?: string;
  href?: string;
  linkedinUrl?: string;
  active?: boolean;
  highlight?: boolean;
  accent?: InsightAccent;
  order?: number;
};

export type PriceItem = {
  code: string;
  name: string;
  sourceUrl?: string;
};

const ACCENTS: InsightAccent[] = ["blue", "lime", "pink", "navy"];

function arrangeInsights(items: InsightItem[], max: number): InsightItem[] {
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

export async function getInsights(): Promise<InsightItem[]> {
  if (isSanityConfigured()) {
    const [rows, settings] = await Promise.all([
      sanityQuery<
        Array<{
          _id: string;
          title: string;
          text?: string;
          href?: string;
          linkedinUrl?: string;
          accent?: InsightAccent;
          order?: number;
          featured?: boolean;
          image?: { asset?: unknown; alt?: string };
        }>
      >(INSIGHTS_QUERY),
      sanityQuery<{ insightsToShow?: number }>(SITE_SETTINGS_QUERY),
    ]);

    if (rows?.length) {
      return arrangeInsights(
        rows.map((row) => ({
          id: row._id,
          title: row.title,
          text: row.text ?? "",
          image: urlForImage(row.image, 900) || undefined,
          href: row.href,
          linkedinUrl: row.linkedinUrl,
          accent: row.accent,
          order: row.order,
          highlight: Boolean(row.featured),
        })),
        settings?.insightsToShow ?? insights.show ?? 7,
      );
    }
  }

  return arrangeInsights(insights.items as InsightItem[], insights.show ?? 7);
}

export async function getPrices(): Promise<PriceItem[]> {
  if (isSanityConfigured()) {
    const rows = await sanityQuery<PriceItem[]>(MATERIAL_PRICES_QUERY);
    if (rows?.length) return rows;
  }
  return prices.items as PriceItem[];
}
