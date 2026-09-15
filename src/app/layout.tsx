import type { Metadata } from "next";
import { Figtree, Syne, Geist } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MarketPopup } from "@/components/MarketPopup";
import { Main } from "@/components/Main";
import { site } from "@/content/site";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://monofixpackaging.com"),
  title: {
    default: `${site.name} | Packaging, design, sustainability & EPR`,
    template: `%s | ${site.name}`,
  },
  description:
    "MONOFIX Packaging Solutions — innovative packaging, design, sustainability and EPR expertise for brands in India, USA, Europe and beyond.",
  keywords: [
    "innovative packaging",
    "packaging design",
    "sustainable packaging",
    "EPR compliance",
    "PPWR",
    "value engineering packaging",
    "MONOFIX",
  ],
  openGraph: {
    title: site.name,
    description: site.tagline,
    type: "website",
    locale: "en_IN",
  },
  icons: { icon: "/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${figtree.variable} ${syne.variable} antialiased`}>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        <Main>{children}</Main>
        <Footer />
        <MarketPopup />
      </body>
    </html>
  );
}
