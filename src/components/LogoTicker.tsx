import type { CSSProperties } from "react";
import { clientNames } from "@/content/site";

type LogoTickerProps = {
  names?: readonly string[];
};

const GAP = "gap-5 sm:gap-6";

export function LogoTicker({ names = clientNames }: LogoTickerProps) {
  const items = names.length ? [...names] : [];
  if (items.length === 0) return null;

  return (
    <div className="bg-navy" aria-label="Clients">
      <div className="relative overflow-hidden py-5">
        <div
          className={`logo-ticker-track flex w-max ${GAP}`}
          style={{ "--ticker-duration": "42s" } as CSSProperties}
        >
          <TickerRow names={items} />
          <TickerRow names={items} decorative />
        </div>
      </div>
    </div>
  );
}

function TickerRow({
  names,
  decorative = false,
}: {
  names: string[];
  decorative?: boolean;
}) {
  return (
    <ul className={`flex items-center ${GAP}`} aria-hidden={decorative || undefined}>
      {names.map((name, index) => (
        <li
          key={`${decorative ? "b" : "a"}-${name}-${index}`}
          className="flex h-14 w-[14.5rem] shrink-0 items-center justify-center rounded-xl bg-white px-4 sm:h-16"
        >
          <span className="whitespace-nowrap text-[13px] font-bold tracking-[0.02em] text-navy sm:text-sm">
            {name}
          </span>
        </li>
      ))}
    </ul>
  );
}
