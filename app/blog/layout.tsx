import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Zyvarin Social',
  description: 'Tips, strategies, and insights for creators building their audience on social media. Learn how to grow faster with Zyvarin.',
  openGraph: {
    title: 'Blog - Zyvarin Social',
    description: 'Tips, strategies, and insights for creators building their audience on social media. Learn how to grow faster with Zyvarin.',
    type: 'website'
  }
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
