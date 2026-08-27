# AI & Data Article Publishing Platform

A highly polished, static-first publishing platform built for technical content around AI, Data, LLMs, and Software Engineering.

This platform is specifically designed as the presentation layer for automated AI article-generation systems. The architecture is intentionally "headless" from an administrative perspective—the filesystem is the CMS.

## The Workflow

```
Create article (.md)
       ↓
Save in /content/articles/
       ↓
Git commit & push
       ↓
Website automatically builds & publishes
```

## Features

- **Filesystem CMS:** Just drop markdown files in the folder. No database required.
- **Static First:** Pages are pre-rendered for maximum performance.
- **Beautiful Reading Experience:** Optimized typography, syntax highlighting, and reading-focused layout.
- **Dark/Light Mode:** First-class support for both system preferences.
- **Search:** Client-side, fast article search without backend requirements.
- **SEO Ready:** Sitemap, Robots, OpenGraph, and Twitter Card metadata generated automatically.
- **RSS Feed:** Automatic RSS generation for syndication.
- **Category System:** Dynamically generated from article metadata.

## Article Format

Articles must be placed in `/content/articles/` with a `.md` extension.

They require YAML frontmatter at the top:

```yaml
---
title: "The Future of AI Agents"
description: "What autonomous AI agents mean for software development."
date: "2026-08-26"
author: "Joe"
category: "AI"
tags:
  - AI
  - Agents
  - LLMs
image: "https://example.com/image.jpg" # Optional
featured: true # Optional
---

Your markdown content here...
```

## Local Development

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:3000` to see the site.

## Building for Production

```bash
# Build the static site
npm run build

# Start the production server
npm run start
```

## Customization

You can update the site metadata (name, description, author, social links) in `src/config/site.ts`.

```typescript
export const siteConfig = {
  name: 'Terminal',
  description: 'The future of AI, Data, and Software Engineering.',
  // ...
};
```
