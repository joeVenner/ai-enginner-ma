import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import 'katex/dist/katex.min.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BackToTop } from '@/components/back-to-top';
import { KeyboardShortcuts } from '@/components/keyboard-shortcuts';
import { CommandPalette } from '@/components/command-palette';
import TopLoader from '@/components/top-loader';
import { siteConfig } from '@/config/site';
import { GoogleTagManager } from '@next/third-parties/google';
import { WebSiteSchema } from '@/components/schema-org';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'AI Engineer | AI, Data & Software Engineering Insights',
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [
    {
      name: siteConfig.author.name,
      url: siteConfig.links.twitter,
    },
  ],
  creator: siteConfig.author.name,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.author.twitter,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-background font-sans antialiased selection:bg-primary selection:text-primary-foreground`}
      >
        <WebSiteSchema />
        <TopLoader />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <KeyboardShortcuts />
          <CommandPalette />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <BackToTop />
          </div>
        </ThemeProvider>
        <GoogleTagManager gtmId="GTM-XXXXXXX" />
      </body>
    </html>
  );
}
