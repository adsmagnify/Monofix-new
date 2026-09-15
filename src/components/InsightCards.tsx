import Image from "next/image";
import Link from "next/link";
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

function CardBody({ item, index, showText }: { item: InsightItem; index: number; showText: boolean }) {
  const highlighted = Boolean(item.highlight);
  const visual = accents[item.accent ?? "blue"];
  const Icon = icons[item.id] ?? BookOpen;
  const image = item.image?.trim();

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
      {item.linkedinUrl ? (
        <span className={`mt-3 inline-block text-xs font-semibold ${highlighted ? "text-ink" : "text-blue"}`}>
          View on LinkedIn
        </span>
      ) : null}
    </>
  );
}

export function InsightCards({ showText = false }: Props) {
  const items = getInsights();

  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {items.map((item, index) => {
        const highlighted = Boolean(item.highlight);
        const visual = accents[item.accent ?? "blue"];
        const className = `relative overflow-hidden rounded-2xl border px-5 py-4 pt-6 transition-colors duration-200 ${
          highlighted ? "border-lime bg-lime" : `bg-white ${visual.card}`
        }`;
        const href = item.href || item.linkedinUrl;

        if (href) {
          return (
            <Link key={item.id} href={href} className={`${className} cursor-pointer`} target="_blank" rel="noreferrer">
              <CardBody item={item} index={index} showText={showText} />
            </Link>
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
