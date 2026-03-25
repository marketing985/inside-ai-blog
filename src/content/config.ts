import { defineCollection, z } from 'astro:content'

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tag: z.enum(['DEEP DIVE', 'TOOLS', 'OPINION']),
    excerpt: z.string().max(200),
    readTime: z.string(),
  }),
})

const log = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string().max(100),
  }),
})

export const collections = { articles, log }
