"use client";
import { DocsLayout } from 'fumadocs-ui/layout';
import type { ReactNode } from 'react';
import { docs, other } from '../utils/source';
import { Book } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { baseOptions } from '../layout.config';

export default function RootDocsLayout({ children }: { children: ReactNode }) {
  let path = usePathname();
  return (
    <DocsLayout 
        sidebar={{
            enabled: (path.startsWith("/docs")) ? true : false,
            defaultOpenLevel: 0,
        }}
        nav={baseOptions.nav}
        tree={(path.startsWith("/docs")) ? docs.pageTree : other.pageTree}
        links={baseOptions.links}
    >
        {children}
    </DocsLayout>
  );
}
