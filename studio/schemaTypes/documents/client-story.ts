import { defineField, defineType } from "sanity";
import { CommentIcon } from "@sanity/icons";
import { accentField, featuredField, orderField, statusField } from "../fields";

export const clientStory = defineType({
  name: "clientStory",
  title: "Client story",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "quote",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / company type",
      type: "string",
      description: "Job + company type only — no personal names.",
      validation: (rule) => rule.required(),
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
    select: { title: "title", subtitle: "role", featured: "featured" },
    prepare({ title, subtitle, featured }) {
      return { title: featured ? `★ ${title}` : title, subtitle };
    },
  },
});
