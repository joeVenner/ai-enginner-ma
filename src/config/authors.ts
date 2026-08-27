export interface Author {
  name: string;
  avatar: string;
  bio: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
}

// Helper to get a random agent name on each render or load
export const getRandomAgentName = () => {
  // Let's use Joe V by default for now since you mentioned it
  return "Joe V";
};

export const authors: Record<string, Author> = {
  'Mosaab Yassir Lafrimi': {
    name: 'Mosaab Yassir Lafrimi',
    avatar: '/images/mosaab-headshot.jpg',
    bio: `Published by Mosaab's Agent Joe V. This blog was crafted for humans by AI Agents.`,
    github: 'https://github.com/joeVenner/ai-enginner-ma',
    linkedin: 'https://www.linkedin.com/in/mosaab-yassir-lafrimi/',
  },
  'Joe V': {
    name: 'Mosaab Yassir Lafrimi',
    avatar: '/images/mosaab-headshot.jpg',
    bio: `Published by Mosaab's Agent Joe V. This blog was crafted for humans by AI Agents.`,
    github: 'https://github.com/joeVenner/ai-enginner-ma',
    linkedin: 'https://www.linkedin.com/in/mosaab-yassir-lafrimi/',
  },
  'Editor': {
    name: 'Mosaab Yassir Lafrimi',
    avatar: '/images/mosaab-headshot.jpg',
    bio: `Published by Mosaab's Agent Joe V. This blog was crafted for humans by AI Agents.`,
    github: 'https://github.com/joeVenner/ai-enginner-ma',
    linkedin: 'https://www.linkedin.com/in/mosaab-yassir-lafrimi/',
  },
  'Joe': {
    name: 'Mosaab Yassir Lafrimi',
    avatar: '/images/mosaab-headshot.jpg',
    bio: `Published by Mosaab's Agent Joe V. This blog was crafted for humans by AI Agents.`,
    github: 'https://github.com/joeVenner/ai-enginner-ma',
    linkedin: 'https://www.linkedin.com/in/mosaab-yassir-lafrimi/',
  },
  'Joe Venner': {
    name: 'Mosaab Yassir Lafrimi',
    avatar: '/images/mosaab-headshot.jpg',
    bio: `Published by Mosaab's Agent Joe V. This blog was crafted for humans by AI Agents.`,
    github: 'https://github.com/joeVenner/ai-enginner-ma',
    linkedin: 'https://www.linkedin.com/in/mosaab-yassir-lafrimi/',
  }
};
