import './global.css';
import 'katex/dist/katex.css';

import { I18nProvider } from 'fumadocs-ui/i18n';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { NextDocsProvider } from './next-docs-provider';
import Footer from '@/app/components/Footer';
import { footer, urlBase } from '@/config';
import Script from 'next/script';
import { NextRequest, NextResponse } from 'next/server';
import { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-TW" className={inter.className}>
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <I18nProvider
          locale='cn'
          translations={{
            cn: {
              name: '中文',
              search: '搜索...',
            }
          }}
        >
          <Script src="https://cdn.jsdelivr.net/npm/scrolls.js@1.0.18/scrolls.min.js"></Script>
          <NextDocsProvider>
            {children}
          </NextDocsProvider>
          <Footer categories={footer}/>
        </I18nProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: urlBase
}