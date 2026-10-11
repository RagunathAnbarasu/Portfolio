import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    order: z.number().int(),
    employer: z.string(),
    role: z.string(),
    period: z.string(),
    technologies: z.array(z.string()).min(1),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).min(1),
    source: z.literal('Owner-supplied resume, October 2026'),
  }),
});

export const collections = { work };
