import Image from "next/image";
import { getHomeGallery } from "@/lib/gallery";

export async function GalleryCards() {
  const items = await getHomeGallery();

  return (
    <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((item, index) => (
        <article
          key={item.id}
          className={`relative overflow-hidden rounded-2xl bg-ink aspect-[16/9] ${index === 0 ? "col-span-2 lg:row-span-2" : ""}`}
        >
          <Image src={item.image} alt={item.title} fill className="object-contain" sizes="50vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <h3 className="font-display text-lg leading-tight sm:text-xl">{item.title}</h3>
          </div>
        </article>
      ))}
    </div>
  );
}
