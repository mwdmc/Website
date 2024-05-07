import { Metadata } from 'next';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-auto h-screen flex-col justify-center text-center align-middle">
      <h1 className="mb-4 text-2xl font-bold">Hello World</h1>
      <p className="text-muted-foreground">
        You can open{' '}
        <Link href="/docs" className="text-foreground font-semibold underline">
          /docs
        </Link>{' '}
        and see the documentation.
      </p>
    </main>
  );
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  return {
    title: "多元世界團隊",
    description: "多元世界團隊",
  };
}