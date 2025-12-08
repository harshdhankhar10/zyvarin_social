import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help Center - Zyvarin Social',
  description: 'Get answers to your questions about Zyvarin. Guides, tutorials, troubleshooting, and FAQs to help you succeed.',
  openGraph: {
    title: 'Help Center - Zyvarin Social',
    description: 'Get answers to your questions about Zyvarin. Guides, tutorials, troubleshooting, and FAQs to help you succeed.',
    type: 'website'
  }
};

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
