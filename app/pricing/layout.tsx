import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zyvarin Social Pricing | Flexible Plans for Every Creator',
  description: 'Choose the perfect plan for your social media needs. Start with our free plan or upgrade to unlock advanced features like AI content generation, multi-platform scheduling, and detailed analytics. Flexible pricing for creators, businesses, and teams.',
  keywords: [
    'pricing',
    'social media pricing',
    'subscription plans',
    'content scheduling pricing',
    'social media management cost',
    'creator tools pricing',
    'AI content generation pricing',
    'free social media scheduler',
    'affordable social media tools',
    'multi-platform posting pricing',
  ],
  openGraph: {
    title: 'Zyvarin Social Pricing | Flexible Plans for Every Creator',
    description: 'Start free or choose from Creator and Premium plans. AI-powered social media scheduling with transparent pricing. No hidden fees.',
    url: 'https://zyvarin.com/pricing',
    type: 'website',
    images: [
      {
        url: 'https://zyvarin.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zyvarin Social Pricing Plans',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zyvarin Social Pricing | Start Free Today',
    description: 'Transparent pricing for social media management. Free plan available. Upgrade anytime.',
    images: ['https://zyvarin.com/twitter-card.png'],
  },
  alternates: {
    canonical: 'https://zyvarin.com/pricing',
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
