import { GalleryGrid } from "@/components/GalleryGrid";
import { getHomeGallery } from "@/lib/gallery";

export async function GalleryCards() {
  const items = await getHomeGallery();
  return <GalleryGrid items={items} layout="home" />;
}
