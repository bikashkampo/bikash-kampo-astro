import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.preprocess(val => (!val ? undefined : val), z.coerce.date().optional()),
    category: z.enum(['Business', 'Technology', 'Life']),
    author: z.string().default('Bikash Kampo'),
    image: z.object({
      url: z.string(),
      alt: z.string().nullable().optional(),
    }).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
