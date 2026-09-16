import { defineField, defineType } from "sanity";
import { CaseIcon } from "@sanity/icons";
import { accentField, featuredField, orderField, statusField } from "../fields";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "area",
      title: "Tag",
      type: "string",
      description: "e.g. NPD, Sustainability, Audit & quality",
      validation: (rule) => rule.required(),
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
      title: "Write-up URL",
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
    select: { title: "title", subtitle: "area", media: "image", featured: "featured" },
    prepare({ title, subtitle, media, featured }) {
      return { title: featured ? `★ ${title}` : title, subtitle, media };
    },
  },
});
