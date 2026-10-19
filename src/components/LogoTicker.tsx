import type { CSSProperties } from "react";
import Image from "next/image";

type Logo = {
  src: string;
  alt: string;
};

type LogoTickerProps = {
  logos?: Logo[];
};

const BLANK_SLOTS = 8;

export function LogoTicker({ logos = [] }: LogoTickerProps) {
  const slots: Array<Logo | null> = logos.length
    ? logos
    : Array.from({ length: BLANK_SLOTS }, () => null);

  return (
    <div className="bg-navy" aria-label="Client logos">
      <div className="relative overflow-hidden py-5">
        <div className="logo-ticker-track flex w-max" style={{ "--ticker-duration": "42s" } as CSSProperties}>
          <TickerRow slots={slots} />
          <TickerRow slots={slots} decorative />
        </div>
      </div>
    </div>
  );
}

function TickerRow({
  slots,
  decorative = false,
}: {
  slots: Array<Logo | null>;
  decorative?: boolean;
}) {
  return (
    <ul
      className="flex items-center gap-5 px-5 sm:gap-7 sm:px-7"
      aria-hidden={decorative || undefined}
    >
      {slots.map((logo, index) => (
        <li
          key={`${decorative ? "b" : "a"}-${logo?.src ?? "blank"}-${index}`}
          className="flex h-14 w-[148px] shrink-0 items-center justify-center rounded-xl bg-white sm:h-16 sm:w-[168px]"
        >
          {logo ? (
            <Image
              src={logo.src}
              alt={decorative ? "" : logo.alt}
              width={120}
              height={36}
              className="max-h-9 w-auto object-contain"
            />
          ) : null}
        </li>
      ))}
    </ul>
  );
}
