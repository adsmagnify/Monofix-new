import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/content/site";

type PageHeroProps = {
  kicker: string;
  title: ReactNode;
  lead?: string;
};

export function PageHero({ kicker, title, lead }: PageHeroProps) {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <p className="text-sm font-semibold tracking-[0.22em] text-lime uppercase">{kicker}</p>
        <h1 className="font-display mt-5 max-w-4xl text-4xl leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
        {lead ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">{lead}</p> : null}
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="bg-lime">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 px-6 py-16 sm:flex-row sm:items-center sm:px-10 lg:px-16">
        <div>
          <p className="font-display text-3xl text-ink sm:text-4xl">Let&apos;s start something new.</p>
          <p className="mt-3 text-lg text-ink/80">{site.responseTime}</p>
        </div>
        <Link
          href="/#contact"
          className="cursor-pointer rounded-full bg-ink px-8 py-4 text-base font-bold text-white hover:bg-navy"
        >
          Contact MONOFIX
        </Link>
      </div>
    </section>
  );
}
