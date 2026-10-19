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

function BrandMark({ src, alt, className = "h-9 max-h-9" }: { src: string; alt: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={assetSrc(src)} alt={alt} className={`w-auto object-contain ${className}`} />
  );
}

function PersonCard({ person }: { person: Person }) {
  const Icon = roleIcons[person.roleIcon];
  const sectors = chips(person.sectors);
  const note = "experienceNote" in person ? person.experienceNote : undefined;
  const eduKicker = "kicker" in person.education ? person.education.kicker : undefined;
  const darkMark = "dark" in person.education && person.education.dark;

  return (
    <article className="col-span-1 row-span-8 mb-5 grid grid-rows-subgrid overflow-hidden rounded-[1.4rem] border border-[#d8dee6] bg-[#f4f6f8] xl:mb-0">
      <header className="flex min-h-[5rem] items-center gap-3 bg-navy px-5 py-3.5">
        <Icon className="size-6 shrink-0 text-lime" strokeWidth={2} />
        <p className="min-w-0 text-[11px] leading-[1.3] font-semibold tracking-[0.14em] text-white uppercase">
          {person.role}
        </p>
      </header>

      <div className="flex items-start justify-between gap-3 px-5 pt-5">
        <div className="size-[6rem] overflow-hidden rounded-full bg-white">
          <Image src={person.photo} alt={person.name} width={192} height={192} className="size-full object-cover" />
        </div>
        <a
          href={person.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label={`${person.name} on LinkedIn`}
          className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-[6px] bg-[#0a66c2] text-white"
        >
          <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-current">
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
          </svg>
        </a>
      </div>

      <h3 className="px-5 pt-3 text-[0.95rem] leading-tight font-bold tracking-tight text-ink sm:text-[0.98rem] sm:leading-none xl:whitespace-nowrap">
        {person.name}
      </h3>
      <p className="px-5 pt-1.5 text-[13px] leading-[1.4] font-semibold text-ink">{person.summary}</p>
      <p className="px-5 pt-2 pb-1 text-[12px] leading-[1.5] font-medium text-blue">{sectors.join(" | ")} |</p>

      <div className="border-t border-[#d3dae3] px-5 pt-4">
        <p className="text-[12px] font-semibold tracking-[0.22em] text-[#8b95a1] uppercase">Experience</p>
      </div>

      <div className="px-5 pt-4">
        <ul className="flex flex-wrap items-center gap-x-3.5 gap-y-3">
          {person.companyLogos.map((logo) => (
            <li key={logo.alt} className="flex h-9 items-center">
              <BrandMark src={logo.src} alt={logo.alt} className="h-9 max-h-9" />
            </li>
          ))}
        </ul>
        {note ? <p className="mt-2.5 text-[13px] leading-relaxed text-[#6b7580] italic whitespace-pre-line">{note}</p> : null}
      </div>

      <div className="flex items-center gap-3 self-end px-5 pt-4 pb-4">
        <div className={`flex size-11 shrink-0 items-center justify-center ${darkMark ? "rounded bg-navy p-0.5" : ""}`}>
          <BrandMark src={person.education.src} alt={person.education.alt} className={darkMark ? "h-8" : "h-10 max-h-10"} />
        </div>
        <div className="min-w-0">
          {eduKicker ? <p className="text-[12px] leading-snug font-semibold text-ink">{eduKicker}</p> : null}
          <p className="text-[12px] leading-snug font-medium whitespace-pre-line text-blue">{person.education.caption}</p>
        </div>
      </div>
    </article>
  );
}

export function TeamPeopleList({ layout = "page" }: { layout?: "home" | "page" }) {
  return (
    <div className={`grid grid-cols-1 gap-x-4 gap-y-0 sm:grid-cols-2 xl:grid-cols-5 ${layout === "home" ? "mt-8" : ""}`}>
      {teamList.map((person) => (
        <PersonCard key={person.name} person={person} />
      ))}
    </div>
  );
}

export function TeamGrid() {
  return <TeamPeopleList />;
}
