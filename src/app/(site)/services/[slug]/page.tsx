import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, PageHero } from "@/components/PageHero";
import { services } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return { title: "Service" };
  return { title: service.title, description: service.short };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <>
      <PageHero kicker={service.number} title={service.title} lead={service.short} />
      <section className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <p className="max-w-3xl text-xl leading-relaxed text-slate">{service.body}</p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {service.points.map((point) => (
            <li key={point} className="rounded-3xl bg-white px-8 py-6 text-lg">
              {point}
            </li>
          ))}
        </ul>
        <p className="mt-10">
          <Link href="/services" className="font-semibold text-navy hover:text-blue">
            ← All six verticals
          </Link>
        </p>
      </section>
      <CtaBand />
    </>
  );
}
