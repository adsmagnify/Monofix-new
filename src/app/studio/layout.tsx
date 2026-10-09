import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { NextStudioLayout, metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "MONOFIX Studio",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: studioViewport.width,
  initialScale: studioViewport.initialScale,
  viewportFit: "cover",
};

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-[200] bg-white">
      <NextStudioLayout>{children}</NextStudioLayout>
    </div>
  );
}
