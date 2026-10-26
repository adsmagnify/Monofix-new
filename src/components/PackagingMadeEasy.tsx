const appUrl = process.env.NEXT_PUBLIC_PACKAGING_APP_URL?.trim();

export function PackagingMadeEasy() {
  if (appUrl) {
    return (
      <div id="packaging-made-easy" className="mt-8 scroll-mt-28 rounded-2xl bg-lime p-4 sm:p-6">
        <div className="grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-[0.28em] text-navy uppercase">Insights</p>
            <h3 className="font-display mt-2 text-2xl leading-tight text-ink sm:text-4xl">Packaging made easy</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/75">
              Use the pack quality calculator in your browser. It is free to use online — there is no download.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl bg-white shadow-[0_14px_32px_rgba(7,21,31,0.1)]">
            <iframe
              src={appUrl}
              title="Pack quality calculator"
              className="h-[min(70vh,560px)] w-full border-0"
              sandbox="allow-scripts allow-same-origin allow-forms"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="packaging-made-easy"
      className="mt-6 flex scroll-mt-28 flex-wrap items-center justify-between gap-x-6 gap-y-1 rounded-2xl bg-lime px-5 py-3 sm:px-6"
    >
      <div className="min-w-0">
        <p className="text-[10px] font-semibold tracking-[0.28em] text-navy uppercase">Insights</p>
        <h3 className="font-display text-lg leading-tight text-ink sm:text-xl">Packaging made easy</h3>
      </div>
      <p className="text-sm text-ink/70">Pack quality calculator — coming soon.</p>
    </div>
  );
}
