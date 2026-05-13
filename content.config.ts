import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: "page",
      source: "*.md",
      schema: z.object({
        blocks: z.array(z.string()).optional(),
      }),
    }),
    blocks: defineCollection({
      type: "page",
      source: "blocks/**/*.md",
    }),
  },
});
