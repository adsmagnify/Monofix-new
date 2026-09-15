import insights from "@/content/insights.json";
import prices from "@/content/prices.json";

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

export function getInsights(): InsightItem[] {
  const max = insights.show ?? 7;
  const items = insights.items as InsightItem[];

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

export function getPrices(): PriceItem[] {
  return prices.items as PriceItem[];
}
