import { CtaBand, PageHero } from "@/components/PageHero";
import { GalleryGrid } from "@/components/GalleryGrid";
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
        <GalleryGrid items={items} layout="page" />
      </section>
      <CtaBand />
    </>
  );
}
