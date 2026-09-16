import { defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons";
import { orderField, statusField } from "../fields";

export const homeBanner = defineType({
  name: "homeBanner",
  title: "Home banner",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Desktop image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (rule) => rule.required().warning("Add alt text for the banner."),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mobileImage",
      title: "Mobile image",
      type: "image",
      description: "Portrait image for phones. If empty, the matching public/home *-mobile file is used.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    orderField,
    statusField,
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", media: "image", order: "order", status: "status" },
    prepare({ title, media, order, status }) {
      return {
        title,
        subtitle: `${order ?? "—"} · ${status === "hidden" ? "Hidden" : "Published"}`,
        media,
      };
    },
  },
});
