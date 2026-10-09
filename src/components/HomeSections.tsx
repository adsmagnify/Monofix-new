import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { DifferenceTable } from "@/components/DifferenceTable";
import { Section, SectionHead } from "@/components/Section";
import { CaseStudyCards } from "@/components/CaseStudyCards";
import { InsightCards } from "@/components/InsightCards";
import { PackagingMadeEasy } from "@/components/PackagingMadeEasy";
import { PriceTiles } from "@/components/PriceTiles";
import { ServiceCards } from "@/components/ServiceCards";
import { SustainabilityCards } from "@/components/SustainabilityCards";
import { TestimonialCards } from "@/components/TestimonialCards";
import { GalleryCards } from "@/components/GalleryCards";
import { TeamPeopleList } from "@/components/TeamGrid";
import { site, teamLead } from "@/content/site";

export function HomeSections() {
  return (
    <>
      <Section id="about" start className="scroll-mt-[calc(var(--header-h)+8px)] bg-paper">
        <SectionHead
          kicker="About us"
          title={
            <>
              Packaging &amp; <span className="text-blue">Design Specialists!</span>
            </>
          }
          lead={teamLead}
        />
        <TeamPeopleList layout="home" />
      </Section>

      <Section id="why" dense className="bg-blue text-white">
        <SectionHead
          compact
          light
          kicker="Why MONOFIX"
          title={
            <>
              The MONOFIX <span className="text-lime">difference</span>
            </>
          }
          lead="Your End-to-End partner, till successful Launch !"
        />
        <DifferenceTable />
      </Section>

      <Section id="services" className="bg-white">
        <SectionHead
          kicker="Services"
          title={
            <>
              6 verticals of <span className="text-blue">packaging excellence</span>
            </>
          }
        />
        <ServiceCards />
      </Section>

      <Section id="gallery" className="bg-paper">
        <SectionHead kicker="Gallery" title={<>Work <span className="text-blue">samples</span></>} />
        <GalleryCards />
      </Section>

      <Section id="sustainability" className="bg-lime">
        <SectionHead
          kicker="Sustainability & EPR"
          kickerClassName="text-navy"
          title={
            <>
              Packaging that <span className="text-navy">protects</span> the planet
            </>
          }
        />
        <SustainabilityCards tone="onLime" />
      </Section>

      <Section id="testimonials" className="bg-white">
        <SectionHead
          kicker="Client testimonials"
          title={
            <>
              Trusted by <span className="text-blue">global brands</span>
            </>
          }
        />
        <TestimonialCards />
      </Section>

      <Section id="insights" className="bg-paper">
        <SectionHead
          wide
          kicker="Insights & resources"
          title={
            <>
              Trends, technology &amp; <span className="text-blue">packaging education series</span>
            </>
          }
        />
        <PriceTiles />
        <InsightCards />
        <PackagingMadeEasy />
      </Section>

      <Section id="casestudies" className="bg-pink">
        <SectionHead
          kicker="Case studies"
          kickerClassName="text-ink"
          title={
            <>
              Unique <span className="text-navy">successes</span>
            </>
          }
        />
        <CaseStudyCards tone="onPink" />
      </Section>

      <Section id="contact" fit className="bg-paper">
        <SectionHead
          kicker="Contact us"
          title="Get in touch…"
          lead="we respond within 24 hours, or earlier."
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white px-5 py-5 sm:col-span-2">
              <p className="text-xs font-semibold tracking-wide text-navy uppercase">Headquarters</p>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {site.name}
                <br />
                {site.address.line1}
                <br />
                {site.address.line2}
              </p>
            </div>
            <div className="rounded-2xl bg-white px-5 py-5">
              <p className="text-xs font-semibold tracking-wide text-navy uppercase">Locations</p>
              <p className="mt-2 text-sm leading-relaxed text-slate">{site.locations.join(", ")}</p>
            </div>
            <div className="rounded-2xl bg-white px-5 py-5">
              <p className="text-xs font-semibold tracking-wide text-navy uppercase">Email</p>
              <a className="mt-2 block text-sm text-navy" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
            <div className="rounded-2xl bg-white px-5 py-5">
              <p className="text-xs font-semibold tracking-wide text-navy uppercase">Mobile</p>
              <a className="mt-2 block text-sm text-navy" href={site.phoneHref}>
                {site.phone}
              </a>
            </div>
            <div className="rounded-2xl bg-white px-5 py-5">
              <p className="text-xs font-semibold tracking-wide text-navy uppercase">LinkedIn</p>
              <a
                className="mt-2 block text-sm text-navy"
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                MONOFIX Packaging Solutions
              </a>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 sm:p-8">
            <Suspense fallback={<p className="text-slate">Loading form…</p>}>
              <ContactForm compact />
            </Suspense>
          </div>
        </div>
      </Section>
    </>
  );
}
