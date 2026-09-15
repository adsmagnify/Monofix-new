import { CtaBand, PageHero } from "@/components/PageHero";
import { InsightCards } from "@/components/InsightCards";
import { PackagingMadeEasy } from "@/components/PackagingMadeEasy";
import { PriceTiles } from "@/components/PriceTiles";

export const metadata = {
  title: "Insights",
  description: "Trends, technology and packaging education — plus live material prices and Packaging made easy.",
};

export default function InsightsPage() {
  return (
    <>
      <PageHero kicker="Insights & resources" title="Trends, technology & packaging education series" />
      <section className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <PriceTiles />
        <InsightCards showText />
        <PackagingMadeEasy />
      </section>
      <CtaBand />
    </>
  );
}
