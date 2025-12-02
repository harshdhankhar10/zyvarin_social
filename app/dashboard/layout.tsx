import type { Metadata } from "next";
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  metadataBase: new URL("https://zyvarin.com"),
    title : "Zyvarin Social Dashboard",
  description:
    "Zyvarin Social is an AI-powered cross-posting tool that lets you write content once and automatically repurpose and publish it to LinkedIn, X (Twitter), Medium, and more from a single dashboard.",
  keywords: [
    "Zyvarin",
    "Zyvarin Social",
    "AI cross posting",
    "social media scheduling",
    "content repurposing",
    "LinkedIn posts",
    "Twitter posts",
    "Medium articles",
  ],
  openGraph: {
    title: "Zyvarin Social Dashboard",
    description:
      "Write once, repurpose with AI, and publish everywhere. Manage LinkedIn, X, Medium and more from one clean dashboard.",
    url: "https://zyvarin.com",
    siteName: "Zyvarin Social",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zyvarin Social Dashboard",
    description:
      "Write once, repurpose with AI, and publish everywhere from a single dashboard.",
  },
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = await currentLoggedInUserInfo();

    if(!user){
        redirect('/signin');
    }
  return (
    <div>
        {children}
    </div>    
);
}
