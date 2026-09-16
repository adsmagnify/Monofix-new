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
import { site, teamHighlights } from "@/content/site";

export function HomeSections() {
  return (
    <>
      <Section id="about" className="bg-paper">
        <SectionHead
          kicker="About us"
          title={
            <>
              Packaging &amp; <span className="text-blue">Design Specialists!</span>
            </>
          }
        />
        <ul className="mt-8 grid gap-3 sm:grid-cols-3">
          {teamHighlights.map((point) => (
            <li
              key={point}
              className="rounded-2xl bg-blue px-5 py-5 text-sm font-semibold leading-relaxed text-white sm:text-base"
            >
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <TeamPeopleList />
        </div>
      </Section>

      <Section id="why" dense className="bg-ink text-white">
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

      <Section id="sustainability" className="bg-[linear-gradient(135deg,#0a2418_0%,#07151f_55%,#0c2c4a_100%)] text-white">
        <SectionHead
          light
          kicker="Sustainability & EPR"
          title={
            <>
              Packaging that <span className="text-lime">protects</span> the planet
            </>
          }
        />
        <SustainabilityCards />
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
          kicker="Insights & resources"
          title={
            <>
              Trends, technology &amp;{" "}
              <span className="text-blue">packaging education series</span>
            </>
          }
        />
        <PriceTiles />
        <InsightCards />
        <PackagingMadeEasy />
      </Section>

      <Section id="casestudies" className="bg-ink text-white">
        <SectionHead
          light
          kicker="Case studies"
          title={
            <>
              Unique <span className="text-lime">successes</span>
            </>
          }
        />
        <CaseStudyCards />
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
              <p className="mt-2 text-sm text-slate">To be added</p>
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
