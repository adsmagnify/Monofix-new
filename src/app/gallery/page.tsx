import Image from "next/image";
import { CtaBand, PageHero } from "@/components/PageHero";
import { getGallery } from "@/lib/gallery";

export const metadata = {
  title: "Gallery",
  description: "Work samples from MONOFIX Packaging Solutions.",
};

export default async function GalleryPage() {
  const items = await getGallery();

  return (
    <>
      <PageHero kicker="Gallery" title="Work samples" />
      <section className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="grid gap-12 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-3xl bg-white">
              <div className="relative aspect-[16/9] bg-ink">
                <Image src={item.image} alt={item.title} fill className="object-contain" sizes="(min-width: 768px) 50vw, 100vw" />
              </div>
              <div className="p-8 sm:p-10">
                <h2 className="font-display text-3xl">{item.title}</h2>
                {item.note ? <p className="mt-3 text-lg text-slate">{item.note}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
