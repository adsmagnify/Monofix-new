import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  bleed?: boolean;
  dense?: boolean;
  fit?: boolean;
};

export function Section({
  id,
  className = "bg-paper",
  children,
  bleed = false,
  dense = false,
  fit = false,
}: SectionProps) {
  if (bleed) {
    return (
      <section id={id} className={`screen-full ${className}`}>
        {children}
      </section>
    );
  }

  return (
    <section
      id={id}
      className={`relative flex flex-col ${fit ? "screen-fit" : "screen-full min-h-svh"} ${className}`}
    >
      <div
        className={`mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-6 sm:px-10 lg:px-14 ${
          fit ? "py-12 lg:py-14" : dense ? "py-8 lg:py-10" : "py-16 lg:py-20"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

type HeadProps = {
  kicker: string;
  title: ReactNode;
  lead?: string;
  light?: boolean;
  compact?: boolean;
};

export function SectionHead({ kicker, title, lead, light = false, compact = false }: HeadProps) {
  return (
    <header className={compact ? "flex max-w-none flex-wrap items-end justify-between gap-x-6 gap-y-2" : "max-w-4xl"}>
      <div>
        <p
          className={`text-xs font-semibold tracking-[0.28em] uppercase ${
            light ? "text-lime" : "text-blue"
          }`}
        >
          {kicker}
        </p>
        <h2
          className={`font-display leading-[1.08] ${
            compact ? "mt-1 text-3xl sm:text-4xl" : "mt-3 text-3xl sm:text-4xl lg:text-5xl"
          } ${light ? "text-white" : "text-ink"}`}
        >
          {title}
        </h2>
      </div>
      {lead ? (
        <p
          className={`max-w-xl leading-relaxed ${
            compact ? "text-sm sm:text-base" : "mt-4 text-base sm:text-lg"
          } ${light ? "text-white/70" : "text-slate"}`}
        >
          {lead}
        </p>
      ) : null}
    </header>
  );
}
