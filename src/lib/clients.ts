import clients from "@/content/clients.json";

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

export function getClientStories(): ClientStory[] {
  const max = clients.show ?? 3;
  const items = clients.items as ClientStory[];

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
