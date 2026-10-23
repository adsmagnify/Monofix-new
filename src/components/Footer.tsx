import Image from "next/image";
import Link from "next/link";
import { services, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 sm:grid-cols-2 sm:px-10 sm:py-20 lg:grid-cols-4 lg:px-16">
        <div>
          <Image
            src="/logo-nav.png"
            alt={site.name}
            width={360}
            height={90}
            className="h-14 w-auto object-contain sm:h-16"
            unoptimized
          />
          <p className="mt-5 max-w-xs text-base text-white/55">{site.tagline}</p>
          <ul className="mt-6 grid gap-1.5 text-xs font-semibold tracking-[0.18em] uppercase">
            {site.hashtags.map((tag) => (
              <li key={tag}>
                <span className="text-pink">#</span>
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-display text-sm tracking-wide text-white uppercase">Services</p>
          <ul className="mt-5 grid gap-3 text-base text-white/50">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href="/#services" className="hover:text-lime">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-display text-sm tracking-wide text-white uppercase">Company</p>
          <ul className="mt-5 grid gap-3 text-base text-white/50">
            <li>
              <Link href="/#about" className="hover:text-lime">
                About us
              </Link>
            </li>
            <li>
              <Link href="/#why" className="hover:text-lime">
                Why MONOFIX
              </Link>
            </li>
            <li>
              <Link href="/#insights" className="hover:text-lime">
                Insights
              </Link>
            </li>
            <li>
              <Link href="/#testimonials" className="hover:text-lime">
                Clients
              </Link>
            </li>
            <li>
              <Link href="/#gallery" className="hover:text-lime">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/#casestudies" className="hover:text-lime">
                Case studies
              </Link>
            </li>
            <li>
              <Link href="/#sustainability" className="hover:text-lime">
                Sustainability
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-lime">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-display text-sm tracking-wide text-white uppercase">Resources</p>
          <ul className="mt-5 grid gap-3 text-base text-white/50">
            <li>
              <Link href="/#packaging-made-easy" className="hover:text-lime">
                Packaging made easy
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-lime">
                Get a quote
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1400px] px-6 py-6 text-sm text-white/40 sm:px-10 lg:px-16">
          <p>
            Created by{" "}
            <a href="https://adsmagnify.com" target="_blank" rel="noopener noreferrer" className="hover:text-lime">
              AdsMagnify</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}
