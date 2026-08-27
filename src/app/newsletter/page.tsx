import { Newsletter } from '@/components/newsletter';

export const metadata = {
  title: 'Newsletter',
  description: 'Subscribe to our newsletter for the latest updates on AI and Engineering.',
};

export default function NewsletterPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16">
      <Newsletter />
    </div>
  );
}
