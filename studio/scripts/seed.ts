import fs from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-01-01" });

function readJson<T>(name: string): T {
  const file = path.join(process.cwd(), "..", "src", "content", name);
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}

function status(active?: boolean) {
  return active === false ? "hidden" : "published";
}

type ClientFile = {
  show: number;
  items: Array<{
    title: string;
    quote: string;
    role: string;
    accent: string;
    order: number;
    highlight: boolean;
    active: boolean;
  }>;
};

type InsightFile = {
  show: number;
  items: Array<{
    title: string;
    text: string;
    href: string;
    linkedinUrl: string;
    accent: string;
    order: number;
    highlight: boolean;
    active: boolean;
  }>;
};

type StudyFile = {
  show: number;
  items: Array<{
    title: string;
    area: string;
    href: string;
    accent: string;
    order: number;
    highlight: boolean;
    active: boolean;
  }>;
};

type PriceFile = { items: Array<{ code: string; name: string; sourceUrl: string }> };

type GalleryFile = {
  show: number;
  items: Array<{
    title: string;
    image: string;
    note: string;
    order: number;
    highlight: boolean;
    active: boolean;
  }>;
};

async function uploadLocalImage(relPath: string, alt: string) {
  const file = path.join(process.cwd(), "..", "public", relPath.replace(/^\//, "").replaceAll("/", path.sep));
  if (!fs.existsSync(file)) return undefined;
  const filename = path.basename(file);
  const contentType = /\.jpe?g$/i.test(filename) ? "image/jpeg" : "image/png";
  const asset = await client.assets.upload("image", fs.createReadStream(file), { filename, contentType });
  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: asset._id },
    alt,
  };
}

async function seedGallery() {
  const existing = await client.fetch<number>('count(*[_type == "galleryItem"])');
  if (existing > 0) {
    console.log(`Gallery already has ${existing} items. Skipping gallery seed.`);
    return;
  }

  const gallery = readJson<GalleryFile>("gallery.json");
  for (const item of gallery.items) {
    const image = await uploadLocalImage(item.image, item.title);
    await client.create({
      _type: "galleryItem",
      title: item.title,
      note: item.note,
      image,
      order: item.order,
      featured: item.highlight,
      status: status(item.active),
    });
  }
  console.log(`Seeded ${gallery.items.length} gallery items.`);
}

async function run() {
  await seedGallery();

  const already = await client.fetch<number>('count(*[_type in ["clientStory","insight","caseStudy","materialPrice","homeBanner"]])');
  if (already > 0) {
    console.log(`Dataset already has ${already} content documents. Skipping remaining seed.`);
    return;
  }

  const clients = readJson<ClientFile>("clients.json");
  const insights = readJson<InsightFile>("insights.json");
  const studies = readJson<StudyFile>("casestudies.json");
  const prices = readJson<PriceFile>("prices.json");

  const tx = client.transaction();

  const gallery = readJson<GalleryFile>("gallery.json");

  tx.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    clientsToShow: clients.show,
    insightsToShow: insights.show,
    caseStudiesToShow: studies.show,
    galleryToShow: gallery.show,
  });

  for (const item of clients.items) {
    tx.create({
      _type: "clientStory",
      title: item.title,
      quote: item.quote,
      role: item.role,
      accent: item.accent,
      order: item.order,
      featured: item.highlight,
      status: status(item.active),
    });
  }

  for (const item of insights.items) {
    tx.create({
      _type: "insight",
      title: item.title,
      text: item.text,
      href: item.href || undefined,
      linkedinUrl: item.linkedinUrl || undefined,
      accent: item.accent,
      order: item.order,
      featured: item.highlight,
      status: status(item.active),
    });
  }

  for (const item of studies.items) {
    tx.create({
      _type: "caseStudy",
      title: item.title,
      area: item.area,
      href: item.href || undefined,
      accent: item.accent,
      order: item.order,
      featured: item.highlight,
      status: status(item.active),
    });
  }

  for (const [index, item] of prices.items.entries()) {
    tx.create({
      _type: "materialPrice",
      code: item.code,
      name: item.name,
      sourceUrl: item.sourceUrl || undefined,
      order: index + 1,
      status: "published",
    });
  }

  await tx.commit();
  console.log("Seeded client stories, insights, case studies, prices and display settings.");
  console.log("Upload home banners in Studio → Home banners.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
