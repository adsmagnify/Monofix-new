import { teamList } from "@/content/site";

type Person = (typeof teamList)[number];

function chips(value: string) {
  return value
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean);
}

function PersonDetails({ person }: { person: Person }) {
  const tags = [...chips(person.sectors), ...chips(person.companies)];

  return (
    <>
      <p className="text-sm leading-relaxed text-slate sm:text-base">{person.summary}</p>
      {tags.length > 0 ? (
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <li key={tag} className="rounded-full bg-mist px-2.5 py-1 text-xs font-medium text-navy">
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

export function TeamPeopleList() {
  return (
    <ul className="grid gap-3">
      {teamList.map((person) => (
        <li
          key={person.name}
          className="grid gap-2 rounded-2xl border-l-4 border-lime bg-white px-5 py-4 sm:px-6 lg:grid-cols-[16rem_1fr] lg:items-start lg:gap-8"
        >
          <div>
            <p className="font-display text-xl leading-tight text-ink sm:text-2xl">{person.listName}</p>
            {person.credential ? (
              <p className="mt-1 text-xs font-semibold tracking-[0.14em] text-blue uppercase">{person.credential}</p>
            ) : null}
            <a
              href={person.linkedin}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-sm font-medium text-navy underline-offset-4 hover:text-blue hover:underline"
            >
              LinkedIn
            </a>
          </div>
          <div>
            <PersonDetails person={person} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function TeamGrid() {
  return <TeamPeopleList />;
}
