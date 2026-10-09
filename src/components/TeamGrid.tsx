import Image from "next/image";
import { Cog, FlaskConical, Hexagon, Leaf, PencilRuler } from "lucide-react";
import { teamList } from "@/content/site";

type Person = (typeof teamList)[number];

const roleIcons = {
  cog: Cog,
  flask: FlaskConical,
  leaf: Leaf,
  hexagon: Hexagon,
  pen: PencilRuler,
};

function chips(value: string) {
  return value
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean);
}

function assetSrc(src: string) {
  return src
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")
    .replace(/^\/?/, "/");
}

function BrandMark({ src, alt, onDark = false }: { src: string; alt: string; onDark?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={assetSrc(src)}
      alt={alt}
      className={`w-auto object-contain ${onDark ? "h-8" : "h-12 max-h-12"}`}
    />
  );
}

function PersonCard({ person }: { person: Person }) {
  const Icon = roleIcons[person.roleIcon];
  const sectors = chips(person.sectors);
  const darkMark = "dark" in person.education && person.education.dark;

  return (
    <article className="row-span-6 grid h-full grid-rows-subgrid overflow-hidden rounded-[1.35rem] bg-white shadow-[0_10px_28px_rgba(7,21,31,0.07)] ring-1 ring-ink/8">
      <header className="relative bg-navy px-3.5 pt-3 pb-11">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-lime" aria-hidden="true" />
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-white/10">
              <Icon className="size-3.5 text-lime" strokeWidth={2.2} />
            </span>
            <p className="min-w-0 text-[10px] leading-snug font-semibold tracking-[0.12em] text-white uppercase">
              {person.role}
            </p>
          </div>
          <a
            href={person.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={`${person.name} on LinkedIn`}
            className="flex size-7 shrink-0 items-center justify-center rounded-md text-white/70 transition hover:bg-white/10 hover:text-lime"
          >
            <svg viewBox="0 0 24 24" aria-hidden className="size-3.5 fill-current">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
            </svg>
          </a>
        </div>
        <div className="absolute bottom-0 left-1/2 size-[76px] -translate-x-1/2 translate-y-1/2 overflow-hidden rounded-full bg-mist ring-[3px] ring-white">
          <Image src={person.photo} alt={person.name} width={150} height={150} className="size-full object-cover" />
        </div>
      </header>

      <div className="px-3.5 pt-[2.65rem]">
        <h3 className="font-display text-center text-xl leading-[1.15] text-ink sm:text-2xl">{person.name}</h3>
        <p className="mt-1.5 text-center text-[12px] leading-snug text-slate">{person.summary}</p>
      </div>

      <ul className="flex flex-wrap content-start justify-center gap-1 px-3 pt-3">
        {sectors.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-mist px-2 py-0.5 text-[9px] font-semibold tracking-[0.08em] text-navy uppercase"
          >
            {tag}
          </li>
        ))}
      </ul>

      <p className="px-3 pt-4 text-center text-[9px] leading-none font-semibold tracking-[0.2em] text-blue uppercase whitespace-nowrap">
        Experience
      </p>

      <ul className="grid grid-cols-2 content-start items-center justify-items-center gap-x-3 gap-y-3 px-3 pt-3">
        {person.companyLogos.map((logo) => (
          <li key={logo.alt} className="flex h-12 w-full items-center justify-center">
            <BrandMark src={logo.src} alt={logo.alt} />
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-center gap-2 border-t border-ink/8 px-3 py-3">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center ${darkMark ? "rounded bg-navy p-0.5" : ""}`}>
          <BrandMark src={person.education.src} alt={person.education.alt} onDark={darkMark} />
        </div>
        <p className="text-[10px] leading-snug font-medium text-slate">{person.education.caption}</p>
      </div>
    </article>
  );
}

export function TeamPeopleList({ layout = "page" }: { layout?: "home" | "page" }) {
  return (
    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5 ${layout === "home" ? "mt-6" : ""}`}>
      {teamList.map((person) => (
        <PersonCard key={person.name} person={person} />
      ))}
    </div>
  );
}

export function TeamGrid() {
  return <TeamPeopleList />;
}
