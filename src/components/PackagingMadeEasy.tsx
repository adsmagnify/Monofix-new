const appUrl = process.env.NEXT_PUBLIC_PACKAGING_APP_URL?.trim();

export function PackagingMadeEasy() {
  return (
    <div id="packaging-made-easy" className="mt-10 scroll-mt-28 rounded-2xl bg-lime p-6 sm:p-8">
      <div className="grid items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold tracking-[0.28em] text-navy uppercase">Insights</p>
          <h3 className="font-display mt-3 text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
            Packaging made easy
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/75 sm:text-base">
            Use the pack quality calculator in your browser. It is free to use online — there is no download.
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl bg-white shadow-[0_14px_32px_rgba(7,21,31,0.1)]">
          {appUrl ? (
            <iframe
              src={appUrl}
              title="Pack quality calculator"
              className="h-[min(70vh,560px)] w-full border-0"
              sandbox="allow-scripts allow-same-origin allow-forms"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex min-h-[280px] flex-col justify-center px-8 py-10 sm:min-h-[320px] sm:px-10">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-navy/50 uppercase">In-browser only</p>
              <p className="font-display mt-2 text-2xl text-ink">Pack quality calculator</p>
              <p className="mt-3 text-base leading-relaxed text-slate">
                The calculator will run here on the page. Users can use it online; they cannot download the app and
                take it away. It stays free for now — a paid unlock can be added later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
