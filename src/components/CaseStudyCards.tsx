import Image from "next/image";
import Link from "next/link";
import {
  BadgePercent,
  ClipboardCheck,
  Layers,
  Package,
  Recycle,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { getCaseStudies, type CaseAccent, type CaseStudy } from "@/lib/casestudies";

const icons: Record<string, LucideIcon> = {
  "pc-products": Package,
  "bkk-cost": BadgePercent,
  "egypt-audit": ClipboardCheck,
  "europe-ppwr": Recycle,
  "alcobev-resource": Users,
  "beauty-cartons": Layers,
  "sugar-gmp": ShieldCheck,
};

const accents: Record<
  CaseAccent,
  {
    tile: string;
    number: string;
    lightNumber: string;
    bar: string;
    darkCard: string;
    lightCard: string;
    pill: string;
  }
> = {
  lime: {
    tile: "bg-lime text-ink",
    number: "text-lime",
    lightNumber: "text-navy",
    bar: "bg-lime",
    darkCard: "bg-lime/15 border-lime/45 hover:bg-lime/25",
    lightCard: "border-lime hover:bg-lime/15",
    pill: "bg-lime text-ink",
  },
  blue: {
    tile: "bg-blue text-white",
    number: "text-blue",
    lightNumber: "text-blue",
    bar: "bg-blue",
    darkCard: "bg-blue/15 border-blue/45 hover:bg-blue/25",
    lightCard: "border-blue/40 hover:bg-blue/[0.04]",
    pill: "bg-blue text-white",
  },
  pink: {
    tile: "bg-pink text-white",
    number: "text-pink",
    lightNumber: "text-pink",
    bar: "bg-pink",
    darkCard: "bg-pink/15 border-pink/45 hover:bg-pink/25",
    lightCard: "border-pink/40 hover:bg-pink/[0.04]",
    pill: "bg-pink text-white",
  },
  navy: {
    tile: "bg-navy text-lime",
    number: "text-white",
    lightNumber: "text-navy",
    bar: "bg-white",
    darkCard: "bg-white/10 border-white/35 hover:bg-white/15",
    lightCard: "border-navy/25 hover:bg-navy/[0.04]",
    pill: "bg-navy text-lime",
  },
};

type Props = {
  tone?: "dark" | "light";
};

function CardInner({ item, index, dark }: { item: CaseStudy; index: number; dark: boolean }) {
  const highlighted = Boolean(item.highlight);
  const visual = accents[item.accent ?? "lime"];
  const Icon = icons[item.id] ?? Package;
  const image = item.image?.trim();

  return (
    <>
      <span className={`absolute inset-x-0 top-0 h-1.5 ${highlighted ? "bg-ink" : visual.bar}`} aria-hidden="true" />
      {image ? (
        <div className="relative h-28 w-full overflow-hidden rounded-xl sm:h-16 sm:w-20 sm:shrink-0">
          <Image src={image} alt="" fill className="object-cover" sizes="160px" />
        </div>
      ) : null}
      <span
        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          highlighted ? "bg-ink text-lime" : visual.tile
        }`}
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <p
          className={`font-display text-sm tracking-wide ${
            highlighted ? "text-ink/70" : dark ? visual.number : visual.lightNumber
          }`}
        >
          {highlighted ? "Featured" : String(index + 1).padStart(2, "0")}
        </p>
        <h3 className={`font-display mt-1 text-lg leading-snug sm:text-xl ${highlighted || !dark ? "text-ink" : "text-white"}`}>
          {item.title}
        </h3>
      </div>
      <span
        className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold tracking-wide uppercase ${
          highlighted ? "bg-ink text-lime" : visual.pill
        }`}
      >
        {item.area}
      </span>
    </>
  );
}

export async function CaseStudyCards({ tone = "dark" }: Props) {
  const items = await getCaseStudies();
  const dark = tone === "dark";

  return (
    <div className="mt-10 grid gap-3 sm:grid-cols-2">
      {items.map((item, index) => {
        const highlighted = Boolean(item.highlight);
        const visual = accents[item.accent ?? "lime"];
        const className = `relative flex flex-wrap items-center gap-4 overflow-hidden rounded-2xl border px-5 py-5 pt-7 transition-colors duration-200 ${
          highlighted
            ? "border-lime bg-lime"
            : dark
              ? visual.darkCard
              : `bg-white ${visual.lightCard}`
        }`;

        if (item.href) {
          return (
            <Link key={item.id} href={item.href} className={`${className} cursor-pointer`}>
              <CardInner item={item} index={index} dark={dark} />
            </Link>
          );
        }

        return (
          <article key={item.id} className={className}>
            <CardInner item={item} index={index} dark={dark} />
          </article>
        );
      })}
    </div>
  );
}
