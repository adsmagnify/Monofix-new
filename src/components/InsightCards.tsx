import Image from "next/image";
import {
  BookOpen,
  Factory,
  GraduationCap,
  Layers,
  Leaf,
  ShoppingBag,
  Ban,
  type LucideIcon,
} from "lucide-react";
import { getInsights, type InsightAccent, type InsightItem } from "@/lib/insights";

const icons: Record<string, LucideIcon> = {
  "packaging-for-dummies": BookOpen,
  greenwashing: Leaf,
  "packaging-sells": ShoppingBag,
  "zero-packaging": Ban,
  "multi-tasker": Layers,
  "industry-nuances": Factory,
  masterclass: GraduationCap,
};

const accents: Record<
  InsightAccent,
  { tile: string; number: string; bar: string; card: string; title: string }
> = {
  blue: {
    tile: "bg-blue text-white",
    number: "text-blue",
    bar: "bg-blue",
    card: "border-blue/30 hover:border-blue/50 hover:bg-blue/[0.04]",
    title: "text-ink",
  },
  lime: {
    tile: "bg-lime text-ink",
    number: "text-navy",
    bar: "bg-lime",
    card: "border-lime hover:bg-lime/15",
    title: "text-ink",
  },
  pink: {
    tile: "bg-pink text-white",
    number: "text-pink",
    bar: "bg-pink",
    card: "border-pink/30 hover:border-pink/50 hover:bg-pink/[0.04]",
    title: "text-ink",
  },
  navy: {
    tile: "bg-navy text-lime",
    number: "text-navy",
    bar: "bg-navy",
    card: "border-navy/25 hover:bg-navy/[0.04]",
    title: "text-ink",
  },
};

type Props = {
  showText?: boolean;
};

function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-3.5 fill-current">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

function insightHref(item: InsightItem) {
  return item.linkedinUrl || item.href;
}

function CardBody({ item, index, showText }: { item: InsightItem; index: number; showText: boolean }) {
  const highlighted = Boolean(item.highlight);
  const visual = accents[item.accent ?? "blue"];
  const Icon = icons[item.id] ?? BookOpen;
  const image = item.image?.trim();
  const linkedin = Boolean(item.linkedinUrl);

  return (
    <>
      <span
        className={`absolute inset-x-0 top-0 h-1.5 ${highlighted ? "bg-ink" : visual.bar}`}
        aria-hidden="true"
      />
      {image ? (
        <div className="relative mb-4 h-28 overflow-hidden rounded-xl">
          <Image src={image} alt="" fill className="object-cover" sizes="40vw" />
        </div>
      ) : null}
      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${
            highlighted ? "bg-ink text-lime" : visual.tile
          }`}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </span>
        <p className={`font-display text-sm tracking-wide ${highlighted ? "text-ink/70" : visual.number}`}>
          {highlighted ? "Featured" : String(index + 1).padStart(2, "0")}
        </p>
      </div>
      <h3 className={`font-display mt-3 text-base leading-snug ${highlighted ? "text-ink" : visual.title}`}>
        {item.title}
      </h3>
      {showText ? (
        <p className={`mt-2 text-sm leading-relaxed ${highlighted ? "text-ink/80" : "text-slate"}`}>{item.text}</p>
      ) : null}
      {linkedin ? (
        <span
          className={`mt-3 inline-flex items-center gap-1.5 text-xs font-semibold ${
            highlighted ? "text-ink" : "text-blue"
          }`}
        >
          <LinkedInMark />
          View on LinkedIn
        </span>
      ) : null}
    </>
  );
}

export async function InsightCards({ showText = false }: Props) {
  const items = await getInsights();

  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {items.map((item, index) => {
        const highlighted = Boolean(item.highlight);
        const visual = accents[item.accent ?? "blue"];
        const className = `relative overflow-hidden rounded-2xl border px-5 py-4 pt-6 transition-colors duration-200 ${
          highlighted ? "border-lime bg-lime" : `bg-white ${visual.card}`
        }`;
        const href = insightHref(item);

        if (href) {
          const isLinkedIn = Boolean(item.linkedinUrl);
          return (
            <a
              key={item.id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${className} cursor-pointer`}
              aria-label={isLinkedIn ? `${item.title} — opens LinkedIn post` : item.title}
            >
              <CardBody item={item} index={index} showText={showText} />
            </a>
          );
        }

        return (
          <article key={item.id} className={className}>
            <CardBody item={item} index={index} showText={showText} />
          </article>
        );
      })}
    </div>
  );
}
