import { CodeBlock } from './code-block';
import { ZoomImage } from './zoom-image';
import { Callout } from './callout';

// Map HTML elements to our custom React components
export const mdxComponents = {
  pre: CodeBlock,
  img: ZoomImage,
  Callout,
};
