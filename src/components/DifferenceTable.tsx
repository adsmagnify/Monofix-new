import { whyTable } from "@/content/site";

function Tick() {
  return (
    <span
      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#22c55e] text-white"
      aria-hidden="true"
    >
      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
        <path
          d="M3.5 8.4 6.4 11.2 12.5 4.8"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function Cross() {
  return (
    <span
      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ef4444] text-white"
      aria-hidden="true"
    >
      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
        <path d="M4.2 4.2 11.8 11.8M11.8 4.2 4.2 11.8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function SideCell({
  on,
  name,
  emphasize,
}: {
  on: boolean;
  name: string;
  emphasize?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 ${emphasize ? "bg-lime text-ink" : ""}`}>
      {on ? (
        <>
          <Tick />
          <span className={`text-[13px] font-medium leading-tight ${emphasize ? "text-ink" : "text-white/90"}`}>
            {name}
          </span>
          <span className="sr-only">Covered</span>
        </>
      ) : (
        <>
          <Cross />
          <span className="sr-only">{name} — not covered</span>
        </>
      )}
    </div>
  );
}

export function DifferenceTable() {
  return (
    <div className="mt-4">
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <div className="min-w-[720px]">
          <div className="grid grid-cols-3 border-b border-white/10">
            <div className="bg-white/5 px-3 py-2.5">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-white/40 uppercase">They start</p>
              <p className="font-display text-[15px] leading-tight text-white">Design house / Ad. agency</p>
            </div>
            <div className="bg-lime px-3 py-2.5 text-ink">
              <p className="text-[10px] font-semibold tracking-[0.16em] uppercase">The full process</p>
              <p className="font-display text-[15px] leading-tight">★ MONOFIX</p>
            </div>
            <div className="bg-white/5 px-3 py-2.5">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-white/40 uppercase">They finish</p>
              <p className="font-display text-[15px] leading-tight text-white">Vendor / Engineering co.</p>
            </div>
          </div>

          {whyTable.rows.map((row, index) => {
            const emphasize = "emphasize" in row && row.emphasize;
            const zebra = index % 2 === 1;

            return (
              <div
                key={row.capability}
                className={`grid grid-cols-3 ${emphasize ? "" : zebra ? "bg-white/[0.03]" : ""}`}
              >
                <SideCell on={row.agency} name={row.capability} emphasize={emphasize} />
                <div
                  className={`flex items-center gap-2 border-x border-white/10 px-3 py-1.5 ${
                    emphasize ? "bg-lime text-ink" : "bg-lime/15"
                  }`}
                >
                  <Tick />
                  <span className={`text-[13px] font-semibold leading-tight ${emphasize ? "text-ink" : "text-white"}`}>
                    {row.capability}
                  </span>
                  <span className="sr-only">MONOFIX covers this</span>
                </div>
                <SideCell on={row.vendor} name={row.capability} emphasize={emphasize} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
