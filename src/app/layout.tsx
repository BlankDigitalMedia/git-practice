import type { Metadata } from "next";
import { Albert_Sans, Fira_Code } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
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
        url: '/favicon.ico', // Using favicon.ico for better compatibility
        width: 32,
        height: 32,
        alt: 'Blank Survey Logo',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "Blank Survey - Email Collection",
    description: "Help us improve by sharing your email for our upcoming survey",
    images: ['/favicon.ico'],
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
        className={`${albertSans.variable} ${firaCode.variable} font-sans antialiased`}
      >
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
