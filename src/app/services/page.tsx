import { CtaBand, PageHero } from "@/components/PageHero";
import { ServiceCards } from "@/components/ServiceCards";

export const metadata = {
  title: "Services",
  description: "Six verticals of packaging excellence from MONOFIX.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero kicker="Services" title="6 verticals of packaging excellence" />
      <section className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <ServiceCards linked />
      </section>
      <CtaBand />
    </>
  );
}
