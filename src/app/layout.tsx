import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import 'katex/dist/katex.min.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BackToTop } from "@/components/back-to-top";
import { PageTransition } from "@/components/page-transition";
import { Analytics } from "@/components/analytics";
import { KeyboardShortcuts } from '@/components/keyboard-shortcuts';
import { CommandPalette } from '@/components/command-palette';
import TopLoader from '@/components/top-loader';
import { siteConfig } from '@/config/site';
import { WebSiteSchema } from '@/components/schema-org';
import { SmoothScroll } from '@/components/smooth-scroll';
import { NewsletterModal } from '@/components/newsletter-modal';

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
  alternates: {
    types: {
      'application/rss+xml': `${siteConfig.url}/rss.xml`,
      'application/json': `${siteConfig.url}/feed.json`,
      'application/atom+xml': `${siteConfig.url}/atom.xml`,
    },
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
        <SmoothScroll />
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
            <PageTransition>{children}</PageTransition>
            <Footer />
            <BackToTop />
            <NewsletterModal />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
