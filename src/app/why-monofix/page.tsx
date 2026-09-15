import { CtaBand, PageHero } from "@/components/PageHero";
import { DifferenceTable } from "@/components/DifferenceTable";

export const metadata = {
  title: "Why MONOFIX",
  description: "The MONOFIX difference — your end-to-end partner, till successful launch.",
};

export default function WhyPage() {
  return (
    <>
      <PageHero
        kicker="Why MONOFIX"
        title="The MONOFIX difference"
        lead="Your End-to-End partner, till successful Launch !"
      />
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-[1400px] px-6 py-10 sm:px-10 lg:px-16 lg:py-12">
          <DifferenceTable />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
