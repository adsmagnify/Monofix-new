import { getPrices } from "@/lib/insights";

export async function PriceTiles() {
  const items = await getPrices();

  return (
    <div className="mt-8 rounded-2xl bg-navy p-6 text-white">
      <p className="text-xs font-semibold tracking-[0.2em] text-lime uppercase">Live material prices</p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((item) => {
          const inner = (
            <>
              <p className="font-display text-2xl">{item.code}</p>
              <p className="text-xs text-white/65">{item.name}</p>
              <p className="mt-3 text-[10px] font-semibold tracking-wide text-lime uppercase">
                {item.sourceUrl ? "Open source" : "Link pending"}
              </p>
            </>
          );

          if (item.sourceUrl) {
            return (
              <a
                key={item.code}
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer rounded-xl bg-white/10 px-4 py-4 transition-colors hover:bg-white/20"
              >
                {inner}
              </a>
            );
          }

          return (
            <div key={item.code} className="rounded-xl bg-white/10 px-4 py-4">
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
