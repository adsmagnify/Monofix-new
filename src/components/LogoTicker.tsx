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
    <div className="mt-auto bg-white" aria-label="Clients">
      <div className="relative overflow-hidden py-7 sm:py-8">
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
          className="flex h-16 w-[16.5rem] shrink-0 items-center justify-center px-4 sm:h-[4.5rem] sm:w-[18rem]"
        >
          <span className="whitespace-nowrap text-base font-bold tracking-[0.02em] text-navy sm:text-lg">
            {name}
          </span>
        </li>
      ))}
    </ul>
  );
}
