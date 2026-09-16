import { defineField } from "sanity";

export const accentField = defineField({
  name: "accent",
  title: "Colour",
  type: "string",
  options: {
    list: [
      { title: "Blue", value: "blue" },
      { title: "Lime", value: "lime" },
      { title: "Pink", value: "pink" },
      { title: "Navy", value: "navy" },
    ],
    layout: "radio",
  },
  initialValue: "blue",
});

export const statusField = defineField({
  name: "status",
  title: "Status",
  type: "string",
  options: {
    list: [
      { title: "Published", value: "published" },
      { title: "Hidden", value: "hidden" },
    ],
    layout: "radio",
  },
  initialValue: "published",
  validation: (rule) => rule.required(),
});

export const orderField = defineField({
  name: "order",
  title: "Order",
  type: "number",
  description: "Lower numbers appear first.",
  initialValue: 1,
  validation: (rule) => rule.required().min(0),
});

export const featuredField = defineField({
  name: "featured",
  title: "Featured",
  type: "boolean",
  description: "Turn on for one item to highlight it.",
  initialValue: false,
});
