import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { site } from "@/content/site";

export const metadata = {
  title: "Contact us",
  description: "Get in touch… we respond within 24 hours, or earlier.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero kicker="Contact us" title="Get in touch…" lead="we respond within 24 hours, or earlier." />
      <section className="mx-auto grid max-w-[1400px] gap-16 px-6 py-24 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-16 lg:py-32">
        <div className="grid gap-6">
          <div>
            <h2 className="font-display text-3xl">Headquarters</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              {site.name}
              <br />
              {site.address.line1}
              <br />
              {site.address.line2}
            </p>
          </div>
          <p className="text-lg text-slate">
            <strong>Locations:</strong> {site.locations.join(", ")}
          </p>
          <p className="text-lg">
            <a className="font-semibold text-navy" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <br />
            <a className="font-semibold text-navy" href={site.phoneHref}>
              {site.phone}
            </a>
          </p>
          <p className="text-lg text-slate">LinkedIn: to be added</p>
        </div>
        <div className="rounded-3xl bg-white p-8 sm:p-12">
          <h2 className="font-display mb-8 text-3xl">Get in touch</h2>
          <Suspense fallback={<p>Loading form…</p>}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
