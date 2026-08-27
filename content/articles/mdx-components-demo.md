---
title: "MDX Components Demo"
description: "A comprehensive demonstration of all available MDX components in our AI Engineer blog template."
date: "2026-08-27"
author: "Joe V"
category: "Harnesses"
tags: ["mdx", "react", "nextjs", "ui"]
featured: false
draft: true
---

This article demonstrates the rich set of MDX components available in this repository. These components make it easy to write highly interactive, visually appealing technical content.

<MobileToc content={`
## Code Blocks
## Callouts
## Interactive Elements
### Accordions
### Tabs
## Media
### Images
### Video and YouTube
## Diagrams and Trees
### Mermaid Diagrams
### File Trees
## Timelines
## Advanced Layouts
`} />

## Code Blocks

Code blocks support automatic syntax highlighting, a copy button, and language badges.

```typescript
// src/example.ts
export async function calculateEmbeddings(text: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text
    })
  });
  
  const data = await response.json();
  return data.data[0].embedding;
}
```

For extremely long code snippets, you can use the `<CodeBlockWrapper>` component to automatically truncate it with an expand button:

<CodeBlockWrapper expandButtonTitle="View full JSON payload">
```json
{
  "name": "ai-engineer-blog",
  "version": "1.0.0",
  "dependencies": {
    "next": "15.0.0",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.300.0",
    "next-themes": "^0.3.0",
    "mermaid": "^10.0.0",
    "next-mdx-remote": "^5.0.0",
    "cmdk": "^1.0.0",
    "date-fns": "^3.0.0",
    "rehype-highlight": "^7.0.0",
    "rehype-katex": "^7.0.0",
    "rehype-slug": "^6.0.0",
    "remark-gfm": "^4.0.0",
    "remark-math": "^6.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "tailwindcss": "^3.4.0"
  }
}
```
</CodeBlockWrapper>

## Callouts

Use callouts to highlight important information, warnings, or errors.

<Callout type="default" title="Note">
This is a default callout, perfect for general notes and tips that you want to stand out from regular text.
</Callout>

<Callout type="info" title="Pro Tip">
Use the info callout for best practices, shortcuts, or helpful "did you know?" style information.
</Callout>

<Callout type="warning" title="Warning">
The warning callout is ideal for deprecation notices, gotchas, or things that might cause unexpected behavior.
</Callout>

<Callout type="error" title="Danger">
Use the error callout sparingly, only when an action might cause data loss, security vulnerabilities, or hard crashes.
</Callout>

## Interactive Elements

### Accordions

Accordions are great for FAQs or hiding detailed information that isn't strictly necessary for the main flow of the article.

<Accordion>
  <AccordionItem title="How does React 19 handle concurrent rendering?">
    React 19 introduces several new primitives for concurrent rendering, including transitions and suspense boundaries that don't block the main thread.
  </AccordionItem>
  <AccordionItem title="What is the App Router?">
    The Next.js App Router is a new paradigm for building React applications that leverages React Server Components, nested layouts, and streaming.
  </AccordionItem>
</Accordion>

### Tabs

Tabs are incredibly useful when you want to show the same implementation in different languages or frameworks.

<Tabs defaultValue="npm">
  <TabsList>
    <TabsTrigger value="npm">npm</TabsTrigger>
    <TabsTrigger value="pnpm">pnpm</TabsTrigger>
    <TabsTrigger value="yarn">yarn</TabsTrigger>
    <TabsTrigger value="bun">bun</TabsTrigger>
  </TabsList>
  <TabsContent value="npm">
    ```bash
    npm install framer-motion lucide-react next-themes
    ```
  </TabsContent>
  <TabsContent value="pnpm">
    ```bash
    pnpm add framer-motion lucide-react next-themes
    ```
  </TabsContent>
  <TabsContent value="yarn">
    ```bash
    yarn add framer-motion lucide-react next-themes
    ```
  </TabsContent>
  <TabsContent value="bun">
    ```bash
    bun add framer-motion lucide-react next-themes
    ```
  </TabsContent>
</Tabs>

## Media

### Images

Images automatically support click-to-zoom functionality.

![A beautiful AI generated image](https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1665&auto=format&fit=crop)

### Video and YouTube

Embed YouTube videos that won't destroy your Lighthouse performance score because they use a click-to-play facade.

<YouTube id="kJQP7kiw5Fk" title="Next.js App Router full course" />

## Diagrams and Trees

### Mermaid Diagrams

You can write Mermaid syntax directly in your MDX to generate flowcharts, sequence diagrams, and architecture maps.

<Mermaid chart={`
graph TD
    A[Client] -->|HTTP GET| B(Load Balancer)
    B --> C{API Gateway}
    C -->|/api/users| D[User Service]
    C -->|/api/orders| E[Order Service]
    D --> F[(PostgreSQL)]
    E --> G[(MongoDB)]
`} />

### File Trees

Document directory structures cleanly.

<FileTree>
  <TreeFolder name="src">
    <TreeFolder name="app">
      <TreeFile name="layout.tsx" />
      <TreeFile name="page.tsx" />
    </TreeFolder>
    <TreeFolder name="components" defaultOpen={true}>
      <TreeFolder name="mdx">
        <TreeFile name="components.tsx" active />
        <TreeFile name="callout.tsx" />
      </TreeFolder>
      <TreeFile name="header.tsx" />
    </TreeFolder>
  </TreeFolder>
  <TreeFile name="package.json" />
  <TreeFile name="next.config.ts" />
</FileTree>

## Timelines

Visualize sequential events, histories, or roadmaps.

<Timeline>
  <TimelineItem title="Project Inception" date="January 2026">
    We began planning the architecture for the new AI Engineer blogging platform, deciding to use Next.js App Router.
  </TimelineItem>
  <TimelineItem title="First MDX Implementation" date="March 2026">
    Successfully integrated `next-mdx-remote` to parse and render our custom React components.
  </TimelineItem>
  <TimelineItem title="Public Launch" date="August 2026">
    The platform is live and currently rendering the article you are reading right now!
  </TimelineItem>
</Timeline>

## Advanced Layouts

You can use the `<Card>` and `<CardGrid>` components to build visually distinct sub-sections.

<CardGrid>
  <Card 
    title="Next.js Documentation" 
    description="Read the official Next.js documentation to learn more about the App Router."
    href="https://nextjs.org/docs"
  />
  <Card 
    title="Tailwind CSS" 
    description="Rapidly build modern websites without ever leaving your HTML."
    href="https://tailwindcss.com/docs"
  />
</CardGrid>

And lastly, use the `<Badge>` component to add inline status markers like <Badge variant="success">New</Badge> or <Badge variant="warning">Deprecated</Badge> directly in your text.
