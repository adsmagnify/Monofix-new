import type { Metadata, Viewport } from "next";
import { Figtree, Syne, Geist } from "next/font/google";
import Script from "next/script";
import { site } from "@/content/site";
import "./globals.css";
import { cn } from "@/lib/utils";

const GTM_ID = "GTM-W3T6LRTJ";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

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
    <html lang="en" className={cn("font-sans", figtree.variable, geist.variable)}>
      <body className={`${figtree.variable} ${syne.variable} antialiased`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
        <Script src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} strategy="afterInteractive" />
        {children}
      </body>
    </html>
  );
}
