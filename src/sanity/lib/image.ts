import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "../env";

type SanityImage = {
  asset?: unknown;
  alt?: string;
} | null | undefined;

const builder = createImageUrlBuilder({ projectId: projectId || "placeholder", dataset });

export function urlFor(source: SanityImage) {
  return builder.image(source as Parameters<typeof builder.image>[0]);
}

export function urlForImage(source: SanityImage, width = 1600, uncropped = false) {
  if (!source?.asset) return "";
  const image = uncropped ? urlFor({ asset: source.asset }) : urlFor(source);
  return image.width(width).fit("max").auto("format").url();
}
