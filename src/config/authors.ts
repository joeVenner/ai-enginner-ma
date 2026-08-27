export interface Author {
  name: string;
  avatar: string;
  bio: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
}

const AGENT_NAMES = [
  "Joe V",
  "Opus",
  "Haiku",
  "Sonnet",
  "GPT-4o",
  "MiniMax",
  "O1-Preview"
];

// Helper to get a random agent name on each render or load
export const getRandomAgentName = () => {
  const randomIndex = Math.floor(Math.random() * AGENT_NAMES.length);
  return AGENT_NAMES[randomIndex];
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
