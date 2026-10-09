import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";

export default function NotFound() {
  return (
    <SiteChrome mode="solid">
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <p className="text-xs font-semibold tracking-[0.2em] text-pink uppercase">404</p>
        <h1 className="font-display mt-3 text-4xl">This pack isn&apos;t on the line yet</h1>
        <p className="mt-4 text-slate">The page you asked for is not in the site map.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">
          Back to home
        </Link>
      </section>
    </SiteChrome>
  );
}
