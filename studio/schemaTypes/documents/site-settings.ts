import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Display settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "clientsToShow",
      title: "Client cards to show",
      type: "number",
      initialValue: 3,
      validation: (rule) => rule.min(1).max(12),
    }),
    defineField({
      name: "insightsToShow",
      title: "Insight cards to show",
      type: "number",
      initialValue: 7,
      validation: (rule) => rule.min(1).max(24),
    }),
    defineField({
      name: "caseStudiesToShow",
      title: "Case studies to show",
      type: "number",
      initialValue: 7,
      validation: (rule) => rule.min(1).max(24),
    }),
    defineField({
      name: "galleryToShow",
      title: "Gallery tiles on the home page",
      type: "number",
      initialValue: 4,
      validation: (rule) => rule.min(1).max(12),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Display settings" };
    },
  },
});
