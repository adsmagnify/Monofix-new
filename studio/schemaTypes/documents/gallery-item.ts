import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";
import { featuredField, orderField, statusField } from "../fields";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery item",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "note",
      title: "Caption",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (rule) => rule.required().warning("Add alt text for the gallery image."),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      ...featuredField,
      description: "Turn on for the large tile on the home gallery.",
    }),
    orderField,
    statusField,
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", media: "image", order: "order", featured: "featured", status: "status" },
    prepare({ title, media, order, featured, status }) {
      return {
        title: featured ? `★ ${title}` : title,
        subtitle: `${order ?? "—"} · ${status === "hidden" ? "Hidden" : "Published"}`,
        media,
      };
    },
  },
});
