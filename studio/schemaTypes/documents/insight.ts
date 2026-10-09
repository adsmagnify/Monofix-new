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
      name: "linkedinUrl",
      title: "LinkedIn post URL",
      type: "url",
      description: "Clicking this insight on the website opens this LinkedIn post in a new tab.",
      validation: (rule) =>
        rule.uri({
          allowRelative: false,
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "href",
      title: "Article URL",
      type: "url",
      description: "Optional. Used only if no LinkedIn post URL is set.",
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
