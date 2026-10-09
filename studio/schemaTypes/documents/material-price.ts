import { defineField, defineType } from "sanity";
import { ChartUpwardIcon } from "@sanity/icons";
import { orderField, statusField } from "../fields";

export const materialPrice = defineType({
  name: "materialPrice",
  title: "Material price",
  type: "document",
  icon: ChartUpwardIcon,
  fields: [
    defineField({
      name: "code",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sourceUrl",
      title: "Live price source URL",
      type: "url",
      description: "Plastic4Trade or OfBusiness page for this grade. The site does not scrape live rates.",
    }),
    orderField,
    statusField,
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "code", subtitle: "name" },
  },
});
