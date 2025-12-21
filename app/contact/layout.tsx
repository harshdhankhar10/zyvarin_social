import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Zyvarin Social',
  description: 'Get in touch with the Zyvarin team. Questions about pricing, features, or anything else? We\'re here to help.',
  openGraph: {
    title: 'Contact Us - Zyvarin Social',
    description: 'Get in touch with the Zyvarin team. Questions about pricing, features, or anything else? We\'re here to help.',
    type: 'website'
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
