export const siteConfig = {
  name: 'AI Engineer',
  description: 'AI, Data & Software Engineering Insights',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aiengineer.ma',
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
