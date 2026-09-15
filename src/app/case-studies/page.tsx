import { CtaBand, PageHero } from "@/components/PageHero";
import { CaseStudyCards } from "@/components/CaseStudyCards";

export const metadata = {
  title: "Case studies",
  description: "Unique successes across NPD, cost, audit, sustainability and resourcing.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero kicker="Case studies" title="Unique successes" />
      <section className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <CaseStudyCards tone="light" />
      </section>
      <CtaBand />
    </>
  );
}
