export interface Author {
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  twitter?: string;
  github?: string;
}

export const authors: Record<string, Author> = {
  'Editor': {
    name: 'Terminal Editor',
    handle: 'editor',
    avatar: 'https://ui-avatars.com/api/?name=Terminal+Editor&background=0D8ABC&color=fff',
    bio: 'The editorial team at Terminal, covering the latest in AI, Data, and Software Engineering.',
    twitter: 'https://twitter.com/terminal_pub',
  },
  'Joe Venner': {
    name: 'Joe Venner',
    handle: 'joevenner',
    avatar: 'https://ui-avatars.com/api/?name=Joe+Venner&background=2563eb&color=fff',
    bio: 'Software Engineer and AI enthusiast. Building tools and writing about the intersection of AI and product development.',
    github: 'https://github.com/joeVenner',
  }
};
