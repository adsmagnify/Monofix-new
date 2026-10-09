"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MarketPopup } from "@/components/MarketPopup";
import { Main } from "@/components/Main";
import { InPageScroll } from "@/components/InPageScroll";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/studio")) {
    return <>{children}</>;
  }

  return (
    <>
      <InPageScroll />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <Main>{children}</Main>
      <Footer />
      <MarketPopup />
    </>
  );
}
