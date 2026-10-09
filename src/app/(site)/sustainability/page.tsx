import { CtaBand, PageHero } from "@/components/PageHero";
import { SustainabilityCards } from "@/components/SustainabilityCards";

export const metadata = {
  title: "Sustainability & EPR",
  description: "Packaging that protects the planet — mono-material, PCR, PPWR and EPR.",
};

export default function SustainabilityPage() {
  return (
    <>
      <PageHero kicker="Sustainability" title="Packaging that protects the planet" />
      <section className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <SustainabilityCards tone="light" />
      </section>
      <CtaBand />
    </>
  );
}
