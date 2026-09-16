import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  typegen: {
    path: "../src/sanity/**/*.{ts,tsx}",
    schema: "./schema.json",
    generates: "../src/sanity/sanity.types.ts",
  },
});
