import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"], 
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zyvarin.com"),
  title : "Zyvarin Social | Write Once, Publish Everywhere",
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
    title: "Zyvarin Social | AI Cross-Posting Engine",
    description:
      "Write once, repurpose with AI, and publish everywhere. Manage LinkedIn, X, Medium and more from one clean dashboard.",
    url: "https://zyvarin.com",
    siteName: "Zyvarin Social",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zyvarin Social | AI Cross-Posting Engine",
    description:
      "Write once, repurpose with AI, and publish everywhere from a single dashboard.",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=G-51NY69XWVF`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-51NY69XWVF');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
