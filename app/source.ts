import { blog, docs, meta } from '@/.source';
import { createMDXSource } from 'fumadocs-mdx';
import { InferMetaType, InferPageType, loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { createElement } from 'react';

export const docSource = loader({
  baseUrl: '/docs',
  source: createMDXSource(docs, meta),
  icon(icon) {
    if (!icon) {
      return;
    }

    if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  }
});

export type DocsPage = InferPageType<typeof docSource>;
export type DocsMeta = InferMetaType<typeof docSource>;

export const blogs = loader({
  baseUrl: '/blog',
  source: createMDXSource(blog, []),
  icon(icon) {
    if (!icon) {
      // You may set a default icon
      return;
    }
  
    if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  }
});

export type BlogPage = InferPageType<typeof blogs>;
export type BlogMeta = InferMetaType<typeof blogs>;