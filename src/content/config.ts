import { defineCollection, z } from "astro:content";
import { gitHubReposLoader } from "../loaders/github";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/data/blog",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(60).min(10),
      hero: z.preprocess((val) => `~/assets/heros/${val}`, image()),
      heroAlt: z.string(),
      description: z.string().max(160).min(110),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
    }),
});

const projects = defineCollection({
  loader: gitHubReposLoader({
    username: "kevinzunigacuellar",
  }),
});

export const collections = {
  blog,
  projects,
};
