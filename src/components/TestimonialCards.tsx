import { Quote } from "lucide-react";
import { getClientStories, type ClientAccent } from "@/lib/clients";

const accents: Record<
  ClientAccent,
  { tile: string; number: string; bar: string; card: string; title: string }
> = {
  blue: {
    tile: "bg-blue text-white",
    number: "text-blue",
    bar: "bg-blue",
    card: "border-blue/30 hover:border-blue/50 hover:bg-blue/[0.04]",
    title: "text-blue",
  },
  lime: {
    tile: "bg-lime text-ink",
    number: "text-navy",
    bar: "bg-lime",
    card: "border-lime hover:bg-lime/15",
    title: "text-navy",
  },
  pink: {
    tile: "bg-pink text-white",
    number: "text-pink",
    bar: "bg-pink",
    card: "border-pink/30 hover:border-pink/50 hover:bg-pink/[0.04]",
    title: "text-pink",
  },
  navy: {
    tile: "bg-navy text-lime",
    number: "text-navy",
    bar: "bg-navy",
    card: "border-navy/25 hover:bg-navy/[0.04]",
    title: "text-navy",
  },
};

export function TestimonialCards() {
  const stories = getClientStories();

  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-3">
      {stories.map((item, index) => {
        const highlighted = Boolean(item.highlight);
        const visual = accents[item.accent ?? "blue"];

        return (
          <blockquote
            key={item.id}
            className={`relative overflow-hidden rounded-2xl border p-6 pt-7 transition-colors duration-200 ${
              highlighted
                ? "border-lime bg-lime text-ink"
                : `bg-white ${visual.card}`
            }`}
          >
            <span
              className={`absolute inset-x-0 top-0 h-1.5 ${highlighted ? "bg-ink" : visual.bar}`}
              aria-hidden="true"
            />
            <div className="flex items-start justify-between gap-3">
              <span
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                  highlighted ? "bg-ink text-lime" : visual.tile
                }`}
                aria-hidden="true"
              >
                <Quote className="h-5 w-5" strokeWidth={2} />
              </span>
              <p
                className={`font-display text-sm tracking-wide ${
                  highlighted ? "text-ink/70" : visual.number
                }`}
              >
                {highlighted ? "Featured" : String(index + 1).padStart(2, "0")}
              </p>
            </div>
            <p
              className={`font-display mt-5 text-lg leading-tight ${
                highlighted ? "text-ink" : visual.title
              }`}
            >
              {item.title}
            </p>
            <p className={`mt-4 text-sm leading-relaxed ${highlighted ? "text-ink/80" : "text-slate"}`}>
              &ldquo;{item.quote}&rdquo;
            </p>
            <footer className={`mt-5 text-sm font-medium ${highlighted ? "text-ink" : "text-navy"}`}>
              — {item.role}
            </footer>
          </blockquote>
        );
      })}
    </div>
  );
}
