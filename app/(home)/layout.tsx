import { Layout } from 'fumadocs-ui/layout';
import type { ReactNode } from 'react';
import { baseOptions } from '../layout.config';

export default function HomeLayout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return <Layout nav={baseOptions.nav} links={baseOptions.links}>{children}</Layout>;
}