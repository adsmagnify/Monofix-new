import clients from "@/content/clients.json";
import { isSanityConfigured } from "@/sanity/env";
import { sanityQuery } from "@/sanity/lib/fetch";
import { CLIENT_STORIES_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export type ClientAccent = "blue" | "lime" | "pink" | "navy";

export type ClientStory = {
  id: string;
  title: string;
  quote: string;
  role: string;
  active?: boolean;
  highlight?: boolean;
  accent?: ClientAccent;
  order?: number;
};

const ACCENTS: ClientAccent[] = ["blue", "lime", "pink", "navy"];

function arrange<T extends { highlight?: boolean; order?: number; accent?: ClientAccent; active?: boolean }>(
  items: T[],
  max: number,
): T[] {
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

function fromJson(): ClientStory[] {
  return arrange(clients.items as ClientStory[], clients.show ?? 3);
}

type SanityClient = {
  _id: string;
  title: string;
  quote: string;
  role: string;
  accent?: ClientAccent;
  order?: number;
  featured?: boolean;
};

export async function getClientStories(): Promise<ClientStory[]> {
  if (!isSanityConfigured()) return fromJson();

  const [rows, settings] = await Promise.all([
    sanityQuery<SanityClient[]>(CLIENT_STORIES_QUERY),
    sanityQuery<{ clientsToShow?: number }>(SITE_SETTINGS_QUERY),
  ]);

  if (!rows?.length) return fromJson();

  return arrange(
    rows.map((row) => ({
      id: row._id,
      title: row.title,
      quote: row.quote,
      role: row.role,
      accent: row.accent,
      order: row.order,
      highlight: Boolean(row.featured),
    })),
    settings?.clientsToShow ?? clients.show ?? 3,
  );
}
