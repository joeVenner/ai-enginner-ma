import { visit } from 'unist-util-visit';
import { Node } from 'unist';

// Custom plugin to support standard GitHub style admonitions:
// > [!NOTE]
// > Useful information that users should know, even when skimming content.

interface BlockquoteNode extends Node {
  type: 'blockquote';
  children: Array<{
    type: string;
    value?: string;
    children?: unknown[];
  }>;
}

export function remarkAdmonition() {
  return (tree: Node) => {
    visit(tree, 'blockquote', (node: BlockquoteNode) => {
      // Find the first text node inside the blockquote
      if (node.children && node.children.length > 0) {
        const firstChild = node.children[0];
        
        // Blockquotes usually contain a paragraph first
        if (firstChild.type === 'paragraph' && firstChild.children && firstChild.children.length > 0) {
          const textNode = firstChild.children[0] as { type: string; value?: string };
          
          if (textNode.type === 'text' && textNode.value) {
            const text = textNode.value;
            const match = text.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
            
            if (match) {
              const type = match[1].toLowerCase();
              
              // Map github admonitions to our Callout types
              let calloutType = 'default';
              if (type === 'note' || type === 'info') calloutType = 'info';
              else if (type === 'warning' || type === 'important') calloutType = 'warning';
              else if (type === 'caution' || type === 'error') calloutType = 'error';
              else if (type === 'tip') calloutType = 'default';

              // Remove the tag from the text
              textNode.value = text.substring(match[0].length).trim();
              
              // If it's now empty, we can remove the node, but usually it has content after
              if (!textNode.value && firstChild.children.length > 1) {
                firstChild.children.shift();
              }
              
              // Convert blockquote to Callout component
              // @ts-expect-error - Hacking the AST to render our React component requires adding non-standard properties
              node.type = 'mdxJsxFlowElement';
              // @ts-expect-error - Hacking the AST to render our React component requires adding non-standard properties
              node.name = 'Callout';
              // @ts-expect-error - Hacking the AST to render our React component requires adding non-standard properties
              node.attributes = [
                {
                  type: 'mdxJsxAttribute',
                  name: 'type',
                  value: calloutType
                },
                {
                  type: 'mdxJsxAttribute',
                  name: 'title',
                  value: type.charAt(0).toUpperCase() + type.slice(1)
                }
              ];
            }
          }
        }
      }
    });
  };
}
