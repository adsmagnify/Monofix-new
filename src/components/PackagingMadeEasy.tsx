import Link from "next/link";

export function PackagingMadeEasy() {
  return (
    <div id="packaging-made-easy" className="mt-10 scroll-mt-28 rounded-2xl bg-lime p-6 sm:p-8">
      <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-navy uppercase">Insights</p>
          <h3 className="font-display mt-3 text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
            Packaging made easy
          </h3>
          <div className="mt-8">
            <Link
              href="/#contact"
              className="inline-flex cursor-pointer rounded-full bg-ink px-6 py-3 text-sm font-bold text-white hover:bg-navy"
            >
              Start your project
            </Link>
          </div>
        </div>
        <div className="rounded-3xl bg-white/80 p-8">
          <p className="font-display text-2xl text-ink">Pack quality calculator</p>
          <p className="mt-3 text-base leading-relaxed text-slate">
            A calculator for pack quality and endurance. The application will be embedded here.
          </p>
        </div>
      </div>
    </div>
  );
}
