import studies from "@/content/casestudies.json";

export type CaseAccent = "blue" | "lime" | "pink" | "navy";

export type CaseStudy = {
  id: string;
  title: string;
  area: string;
  image?: string;
  href?: string;
  active?: boolean;
  highlight?: boolean;
  accent?: CaseAccent;
  order?: number;
};

const ACCENTS: CaseAccent[] = ["lime", "blue", "pink", "navy"];

export function getCaseStudies(): CaseStudy[] {
  const max = studies.show ?? 7;
  const items = studies.items as CaseStudy[];

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
