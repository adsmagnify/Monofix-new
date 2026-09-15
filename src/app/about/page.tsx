import { CtaBand, PageHero } from "@/components/PageHero";
import { TeamPeopleList } from "@/components/TeamGrid";
import { site, teamHighlights } from "@/content/site";

export const metadata = {
  title: "About us",
  description: "Packaging & Design Specialists — MONOFIX Packaging Solutions.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero kicker="About us" title="Packaging & Design Specialists!" />
      <section className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <ul className="mb-12 max-w-3xl space-y-5 rounded-2xl bg-blue px-8 py-8 text-white sm:px-10 sm:py-10">
          {teamHighlights.map((point) => (
            <li key={point} className="flex gap-4 text-lg font-semibold leading-relaxed">
              <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-white" />
              {point}
            </li>
          ))}
        </ul>
        <TeamPeopleList />
        <div className="mt-16 rounded-3xl bg-navy p-10 text-white sm:p-12">
          <p className="text-lime">Headquarters</p>
          <p className="mt-4 text-lg font-medium leading-relaxed">
            {site.name}
            <br />
            {site.address.line1}
            <br />
            {site.address.line2}
          </p>
          <p className="mt-6 text-white/70">Locations: {site.locations.join(", ")}</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
