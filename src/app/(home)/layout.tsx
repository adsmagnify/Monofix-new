import type { ReactNode } from "react";
import { SiteChrome } from "@/components/SiteChrome";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return <SiteChrome mode="overlay">{children}</SiteChrome>;
}
