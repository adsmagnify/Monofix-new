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

function Capability({
  label,
  emphasize = false,
  featured = false,
}: {
  label: string;
  emphasize?: boolean;
  featured?: boolean;
}) {
  return (
    <span
      className={`text-[12px] leading-tight sm:text-[13px] ${
        emphasize ? "font-semibold text-ink" : featured ? "font-semibold text-white" : "font-medium text-white/95"
      }`}
    >
      {label}
    </span>
  );
}

export function DifferenceTable() {
  return (
    <div className="mt-5 flex justify-center">
      <div className="w-full max-w-[720px] overflow-x-auto overscroll-x-contain rounded-2xl bg-navy/30 shadow-[0_18px_40px_rgba(7,21,31,0.18)] ring-1 ring-white/20">
        <table className="w-full table-fixed border-collapse">
          <caption className="sr-only">What MONOFIX covers versus a design house and a vendor</caption>
          <colgroup>
            <col className="w-[31%]" />
            <col className="w-[38%]" />
            <col className="w-[31%]" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="bg-navy px-2 py-3 text-left font-normal sm:px-3 sm:py-3.5">
                <p className="text-[9px] font-semibold tracking-[0.14em] text-white/55 uppercase whitespace-nowrap sm:text-[10px]">
                  They start
                </p>
                <p className="font-display mt-1 text-[13px] leading-[1.15] font-bold text-white sm:text-[16px]">
                  Design house /
                  <br />
                  Ad. agency
                </p>
              </th>
              <th scope="col" className="bg-lime px-2 py-3 text-left font-normal text-ink sm:px-3 sm:py-3.5">
                <p className="text-[9px] font-semibold tracking-[0.14em] uppercase whitespace-nowrap sm:text-[10px]">
                  The full process
                </p>
                <p className="font-display mt-1 text-[13px] leading-[1.15] font-bold sm:text-[16px]">★ MONOFIX</p>
              </th>
              <th scope="col" className="bg-navy px-2 py-3 text-left font-normal sm:px-3 sm:py-3.5">
                <p className="text-[9px] font-semibold tracking-[0.14em] text-white/55 uppercase whitespace-nowrap sm:text-[10px]">
                  They finish
                </p>
                <p className="font-display mt-1 text-[13px] leading-[1.15] font-bold text-white sm:text-[16px]">
                  Vendor /
                  <br />
                  Engineering co.
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {whyTable.rows.map((row, index) => {
              const emphasize = "emphasize" in row && row.emphasize;
              const zebra = index % 2 === 1;

              return (
                <tr key={row.capability} className={emphasize ? "bg-lime text-ink" : zebra ? "bg-white/10" : "bg-white/5"}>
                  <td className="h-10 border-t border-white/15 px-2 sm:h-11 sm:px-3">
                    <div className="flex h-full items-center gap-1.5 sm:gap-2">
                      {row.agency ? <Tick /> : <Cross />}
                      {row.agency ? (
                        <Capability label={row.capability} emphasize={emphasize} />
                      ) : (
                        <span className="sr-only">{row.capability} — not covered</span>
                      )}
                    </div>
                  </td>
                  <td
                    className={`h-10 border-t border-x px-2 sm:h-11 sm:px-3 ${
                      emphasize ? "border-lime bg-lime" : "border-white/15 bg-lime/20"
                    }`}
                  >
                    <div className="flex h-full items-center gap-1.5 sm:gap-2">
                      <Tick />
                      <Capability label={row.capability} emphasize={emphasize} featured={!emphasize} />
                    </div>
                  </td>
                  <td className="h-10 border-t border-white/15 px-2 sm:h-11 sm:px-3">
                    <div className="flex h-full items-center gap-1.5 sm:gap-2">
                      {row.vendor ? <Tick /> : <Cross />}
                      {row.vendor ? (
                        <Capability label={row.capability} emphasize={emphasize} />
                      ) : (
                        <span className="sr-only">{row.capability} — not covered</span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
