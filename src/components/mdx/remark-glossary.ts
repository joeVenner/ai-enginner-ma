import { visit } from 'unist-util-visit';
import { Node } from 'unist';

// Define the terms we want to match
const glossaryTerms = ['rag', 'llm', 'vector db', 'gpu', 'api', 'fine-tuning'];

// Helper to escape regex special characters
const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Create a regex that matches any of the terms as whole words, case-insensitive
const termRegex = new RegExp(`\\b(${glossaryTerms.map(escapeRegExp).join('|')})\\b`, 'gi');

interface ParentNode extends Node {
  children?: Node[];
}

export function remarkGlossary() {
  return (tree: Node) => {
    visit(tree, 'text', (node: Node, index: number | undefined, parent: ParentNode | undefined) => {
      // Don't modify text inside links, code blocks, or headings to prevent rendering bugs
      if (
        !parent || 
        ['link', 'code', 'inlineCode', 'heading', 'GlossaryTerm'].includes(parent.type) ||
        !('value' in node) ||
        typeof (node as any).value !== 'string'
      ) {
        return;
      }

      const text = (node as any).value as string;
      const matches = Array.from(text.matchAll(termRegex));

      if (matches.length === 0) return;

      const newChildren: Node[] = [];
      let lastIndex = 0;

      for (const match of matches) {
        const startIndex = match.index!;
        const endIndex = startIndex + match[0].length;
        const term = match[0];

        // Add text before the match
        if (startIndex > lastIndex) {
          newChildren.push({
            type: 'text',
            value: text.slice(lastIndex, startIndex),
          } as unknown as Node);
        }

        // Add the GlossaryTerm component
        newChildren.push({
          type: 'mdxJsxTextElement',
          name: 'GlossaryTerm',
          attributes: [
            {
              type: 'mdxJsxAttribute',
              name: 'term',
              value: term,
            },
          ],
          children: [{ type: 'text', value: term }],
        } as unknown as Node);

        lastIndex = endIndex;
      }

      // Add remaining text after the last match
      if (lastIndex < text.length) {
        newChildren.push({
          type: 'text',
          value: text.slice(lastIndex),
        } as unknown as Node);
      }

      // Replace the original text node with the new children
      if (parent.children && index !== undefined) {
        parent.children.splice(index, 1, ...newChildren);
      }
    });
  };
}
