import Link from "next/link";
import { BadgePercent, ClipboardCheck, Cuboid, Package, Recycle, Users } from "lucide-react";
import { services } from "@/content/site";

const visuals = [
  {
    Icon: Package,
    tile: "bg-blue text-white",
    number: "text-blue",
    bar: "bg-blue",
    card: "hover:border-blue/40 hover:bg-blue/[0.04]",
  },
  {
    Icon: BadgePercent,
    tile: "bg-lime text-ink",
    number: "text-navy",
    bar: "bg-lime",
    card: "hover:border-lime hover:bg-lime/15",
  },
  {
    Icon: ClipboardCheck,
    tile: "bg-pink text-white",
    number: "text-pink",
    bar: "bg-pink",
    card: "hover:border-pink/40 hover:bg-pink/[0.04]",
  },
  {
    Icon: Cuboid,
    tile: "bg-navy text-lime",
    number: "text-navy",
    bar: "bg-navy",
    card: "hover:border-navy/30 hover:bg-navy/[0.04]",
  },
  {
    Icon: Recycle,
    tile: "bg-[#167a4a] text-lime",
    number: "text-[#167a4a]",
    bar: "bg-[#167a4a]",
    card: "hover:border-[#167a4a]/40 hover:bg-[#167a4a]/[0.05]",
  },
  {
    Icon: Users,
    tile: "bg-ink text-lime",
    number: "text-ink",
    bar: "bg-ink",
    card: "hover:border-ink/25 hover:bg-ink/[0.03]",
  },
] as const;

type Props = {
  linked?: boolean;
};

export function ServiceCards({ linked = false }: Props) {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => {
        const visual = visuals[index];
        const Icon = visual.Icon;
        const inner = (
          <>
            <span className={`absolute inset-x-0 top-0 h-1.5 ${visual.bar}`} aria-hidden="true" />
            <div className="flex items-start justify-between gap-3">
              <span
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${visual.tile}`}
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <p className={`font-display text-sm tracking-wide ${visual.number}`}>{service.number}</p>
            </div>
            <h3 className="font-display mt-5 text-xl leading-tight text-ink">{service.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate">{service.short}</p>
          </>
        );

        const className = `relative overflow-hidden rounded-2xl border border-mist bg-white p-6 pt-7 transition-colors duration-200 ${visual.card}`;

        if (linked) {
          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className={`${className} cursor-pointer`}
            >
              {inner}
            </Link>
          );
        }

        return (
          <article key={service.slug} className={className}>
            {inner}
          </article>
        );
      })}
    </div>
  );
}
