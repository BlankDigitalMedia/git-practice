import type { Metadata } from "next";
import { Albert_Sans, Fira_Code, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blank Survey - Email Collection",
  description: "Help us improve by sharing your email for our upcoming survey",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' }
    ],
    apple: [
      { url: '/apple-icon.svg', sizes: '180x180', type: 'image/svg+xml' }
    ]
  },
  openGraph: {
    title: "Blank Survey - Email Collection",
    description: "Help us improve by sharing your email for our upcoming survey",
    url: "https://blank-survey-help.vercel.app/",
    siteName: "Blank Survey",
    images: [
      {
        url: '/icon.svg', // Using your nice heart icon
        width: 1200,
        height: 630,
        alt: 'Blank Survey Logo',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Blank Survey - Email Collection",
    description: "Help us improve by sharing your email for our upcoming survey",
    images: ['/icon.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${albertSans.variable} ${spaceGrotesk.variable} ${firaCode.variable} font-body antialiased`}
      >
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
