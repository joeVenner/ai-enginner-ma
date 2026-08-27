export const siteConfig = {
  name: 'Terminal',
  description: 'The future of AI, Data, and Software Engineering.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/images/og.jpg',
  author: {
    name: 'Mosaab Yassir Lafrimi',
    twitter: '@mosaab_lafrimi', // Replace with actual if needed
  },
  links: {
    twitter: 'https://twitter.com/', // Replace with actual if needed
    github: 'https://github.com/joeVenner/ai-enginner-ma',
    linkedin: 'https://www.linkedin.com/in/mosaab-yassir-lafrimi/',
  },
  categories: [
    'News',
    'Hackathons',
    'OS Projects',
    'AI',
    'Data',
    'Cloud',
    'LLMs',
    'Agentic AI',
    'Harnesses',
    'Certifications',
  ],
};

export type SiteConfig = typeof siteConfig;
