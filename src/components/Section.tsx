import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  bleed?: boolean;
  dense?: boolean;
  fit?: boolean;
  hug?: boolean;
  start?: boolean;
  bottom?: ReactNode;
};

export function Section({
  id,
  className = "bg-paper",
  children,
  bleed = false,
  dense = false,
  fit = false,
  hug = false,
  start = false,
  bottom,
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
      className={`relative flex flex-col ${hug ? "" : fit ? "screen-fit" : "screen-full"} ${className}`}
    >
      <div
        className={`mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-start px-4 sm:px-10 lg:px-14 ${
          bottom
            ? "pt-8 pb-8 sm:pt-10"
            : start || dense
              ? "pt-6 pb-10 sm:pt-8"
              : fit
                ? "pt-8 pb-12 lg:pt-10 lg:pb-14"
                : "pt-8 pb-14 sm:pt-10 lg:pb-16"
        }`}
      >
        {children}
      </div>
      {bottom}
    </section>
  );
}

type HeadProps = {
  kicker: string;
  title: ReactNode;
  lead?: string;
  light?: boolean;
  compact?: boolean;
  wide?: boolean;
  kickerClassName?: string;
  wideLead?: boolean;
};

export function SectionHead({
  kicker,
  title,
  lead,
  light = false,
  compact = false,
  wide = false,
  kickerClassName,
  wideLead = false,
}: HeadProps) {
  return (
    <header
      className={
        compact
          ? "flex max-w-none flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-x-6"
          : wide
            ? "max-w-none"
            : "max-w-4xl"
      }
    >
      <div>
        <p
          className={`text-xs font-semibold tracking-[0.28em] uppercase ${
            kickerClassName ?? (light ? "text-lime" : "text-blue")
          }`}
        >
          {kicker}
        </p>
        <h2
          className={`font-display mt-2 text-[1.75rem] leading-[1.12] sm:text-[2.35rem] lg:text-5xl ${
            wide ? "xl:whitespace-nowrap" : ""
          } ${light ? "text-white" : "text-ink"}`}
        >
          {title}
        </h2>
      </div>
      {lead ? (
        <p
          className={`${wideLead ? "max-w-none" : "max-w-xl"} leading-relaxed ${
            compact ? "text-sm sm:text-base" : "mt-3 text-[15px] sm:text-lg"
          } ${light ? "text-white/70" : "text-slate"}`}
        >
          {lead}
        </p>
      ) : null}
    </header>
  );
}
