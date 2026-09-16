import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";
import { accentField, featuredField, orderField, statusField } from "../fields";

export const insight = defineType({
  name: "insight",
  title: "Insight",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
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
        }),
      ],
    }),
    defineField({
      name: "href",
      title: "Article URL",
      type: "url",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn post URL",
      type: "url",
    }),
    accentField,
    orderField,
    featuredField,
    statusField,
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", media: "image", featured: "featured" },
    prepare({ title, media, featured }) {
      return { title: featured ? `★ ${title}` : title, media };
    },
  },
});
