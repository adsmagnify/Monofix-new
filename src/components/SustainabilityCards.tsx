import { Layers, Recycle, RefreshCw, Settings2, ShieldCheck } from "lucide-react";
import { sustainabilityPoints } from "@/content/site";

const visuals = [
  {
    Icon: Layers,
    tile: "bg-lime text-ink",
    number: "text-lime",
    bar: "bg-lime",
    darkCard: "bg-lime/15 border-lime/45 hover:bg-lime/25",
    lightCard: "border-lime hover:bg-lime/15",
    lightNumber: "text-navy",
  },
  {
    Icon: Recycle,
    tile: "bg-blue text-white",
    number: "text-blue",
    bar: "bg-blue",
    darkCard: "bg-blue/15 border-blue/45 hover:bg-blue/25",
    lightCard: "border-blue/40 hover:bg-blue/[0.04]",
    lightNumber: "text-blue",
  },
  {
    Icon: RefreshCw,
    tile: "bg-pink text-white",
    number: "text-pink",
    bar: "bg-pink",
    darkCard: "bg-pink/15 border-pink/45 hover:bg-pink/25",
    lightCard: "border-pink/40 hover:bg-pink/[0.04]",
    lightNumber: "text-pink",
  },
  {
    Icon: ShieldCheck,
    tile: "bg-white text-navy",
    number: "text-white",
    bar: "bg-white",
    darkCard: "bg-white/10 border-white/35 hover:bg-white/16",
    lightCard: "border-navy/25 hover:bg-navy/[0.04]",
    lightNumber: "text-navy",
    lightTile: "bg-navy text-lime",
  },
  {
    Icon: Settings2,
    tile: "bg-[#167a4a] text-lime",
    number: "text-lime",
    bar: "bg-[#3ecf8e]",
    darkCard: "bg-[#167a4a]/55 border-[#3ecf8e]/50 hover:bg-[#167a4a]/75",
    lightCard: "border-[#167a4a]/40 hover:bg-[#167a4a]/[0.05]",
    lightNumber: "text-[#167a4a]",
  },
] as const;

type Props = {
  tone?: "dark" | "light";
};

export function SustainabilityCards({ tone = "dark" }: Props) {
  const dark = tone === "dark";

  return (
    <ol className="mt-10 grid gap-4 lg:grid-cols-2">
      {sustainabilityPoints.map((item, index) => {
        const visual = visuals[index];
        const Icon = visual.Icon;
        const tile = !dark && "lightTile" in visual ? visual.lightTile : visual.tile;

        return (
          <li
            key={item.title}
            className={`relative overflow-hidden rounded-2xl border px-6 py-6 pt-7 transition-colors duration-200 ${
              dark ? visual.darkCard : `bg-white ${visual.lightCard}`
            }`}
          >
            <span className={`absolute inset-x-0 top-0 h-1.5 ${visual.bar}`} aria-hidden="true" />
            <div className="flex items-start justify-between gap-3">
              <span
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${tile}`}
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <p className={`font-display text-sm tracking-wide ${dark ? visual.number : visual.lightNumber}`}>
                0{index + 1}
              </p>
            </div>
            <h3 className={`font-display mt-5 text-xl leading-tight ${dark ? "text-white" : "text-ink"}`}>
              {item.title}
            </h3>
            <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-white/75" : "text-slate"}`}>{item.text}</p>
          </li>
        );
      })}
    </ol>
  );
}
