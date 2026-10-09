import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MarketPopup } from "@/components/MarketPopup";
import { Main } from "@/components/Main";
import { InPageScroll } from "@/components/InPageScroll";

export function SiteChrome({
  children,
  mode,
}: {
  children: ReactNode;
  mode: "overlay" | "solid";
}) {
  return (
    <>
      <InPageScroll />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header mode={mode} />
      <Main padded={mode === "solid"}>{children}</Main>
      <Footer />
      <MarketPopup />
    </>
  );
}
