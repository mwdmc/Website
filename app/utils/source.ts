import { map } from '@/.map';
import { createMDXSource, defaultSchemas } from 'fumadocs-mdx';
import { InferMetaType, InferPageType, loader } from 'fumadocs-core/source';
import { z } from 'zod';

const frontmatterSchema = defaultSchemas.frontmatter.extend({
  tags: z.array(z.string()).default([]),
  image: z.string().optional(),
  authors: z.array(z.string()).default([]),
  date: z.date().default(new Date),
});

export const docs = loader({
  baseUrl: '/docs',
  rootDir: 'docs',
  source: createMDXSource(map),
});

export type DocsPage = InferPageType<typeof docs>;
export type DocsMeta = InferMetaType<typeof docs>;

export const blogs = loader({
  baseUrl: '/blog',
  rootDir: 'blog',
  source: createMDXSource(map, { schema: { frontmatter: frontmatterSchema}}),
});

export type BlogPage = InferPageType<typeof blogs>;
export type BlogMeta = InferMetaType<typeof blogs>;

export const other = loader({
  baseUrl: '/other',
  rootDir: 'other',
  source: createMDXSource(map),
});

export type OtherPage = InferPageType<typeof other>;
export type OtherMeta = InferMetaType<typeof other>;