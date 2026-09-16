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
  image?: string;
  href?: string;
  active?: boolean;
  highlight?: boolean;
  accent?: CaseAccent;
  order?: number;
};

const ACCENTS: CaseAccent[] = ["lime", "blue", "pink", "navy"];

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

export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (isSanityConfigured()) {
    const [rows, settings] = await Promise.all([
      sanityQuery<
        Array<{
          _id: string;
          title: string;
          area: string;
          href?: string;
          accent?: CaseAccent;
          order?: number;
          featured?: boolean;
          image?: { asset?: unknown; alt?: string };
        }>
      >(CASE_STUDIES_QUERY),
      sanityQuery<{ caseStudiesToShow?: number }>(SITE_SETTINGS_QUERY),
    ]);

    if (rows?.length) {
      return arrange(
        rows.map((row) => ({
          id: row._id,
          title: row.title,
          area: row.area,
          href: row.href,
          image: urlForImage(row.image, 900) || undefined,
          accent: row.accent,
          order: row.order,
          highlight: Boolean(row.featured),
        })),
        settings?.caseStudiesToShow ?? studies.show ?? 7,
      );
    }
  }

  return arrange(studies.items as CaseStudy[], studies.show ?? 7);
}
