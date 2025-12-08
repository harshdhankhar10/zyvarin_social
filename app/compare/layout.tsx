import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zyvarin vs Competitors - Feature Comparison',
  description: 'Compare Zyvarin with Buffer, Hootsuite, and Later. See why creators choose Zyvarin for simple, powerful social media scheduling.',
  openGraph: {
    title: 'Zyvarin vs Competitors - Feature Comparison',
    description: 'Compare Zyvarin with Buffer, Hootsuite, and Later. See why creators choose Zyvarin for simple, powerful social media scheduling.',
    type: 'website'
  }
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
