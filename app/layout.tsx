import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tommy - Portfolio Développeur",
    template: "%s | Tommy"
  },
  description: "Portfolio de Tommy, développeur web fullstack. Découvrez mon parcours, mes projets et mes articles techniques.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    title: "Tommy - Portfolio Développeur",
    description: "Portfolio de Tommy, développeur web fullstack. Découvrez mon parcours, mes projets et mes articles techniques.",
    siteName: "Tommy Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tommy - Portfolio Développeur",
    description: "Portfolio de Tommy, développeur web fullstack. Découvrez mon parcours, mes projets et mes articles techniques.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-primary)', position: 'relative' }}>
          <Navbar />
          <main
            className="page-transition"
            style={{ flex: '1 0 auto', position: 'relative', display: 'flex', flexDirection: 'column', paddingBottom: '120px' }}
          >
            {children}
          </main>
          <Footer />
          <AnalyticsTracker />
        </div>
      </body>
    </html>
  );
}
