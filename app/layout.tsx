import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tommy - Portfolio Développeur",
  description: "Portfolio de Tommy, développeur fullstack. Découvrez mon parcours, mes projets et mes articles techniques.",
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
        </div>
      </body>
    </html>
  );
}
