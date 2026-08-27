import { CodeBlock } from './code-block';
import { ZoomImage } from './zoom-image';
import { Callout } from './callout';
import { CustomLink } from './link';
import { YouTube } from './youtube';
import { Heading } from './heading';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';
import { HTMLAttributes } from 'react';

type HeadingProps = HTMLAttributes<HTMLHeadingElement>;

// Map HTML elements to our custom React components
export const mdxComponents = {
  pre: CodeBlock,
  img: ZoomImage,
  a: CustomLink,
  h1: (props: HeadingProps) => <Heading level={1} {...props} />,
  h2: (props: HeadingProps) => <Heading level={2} {...props} />,
  h3: (props: HeadingProps) => <Heading level={3} {...props} />,
  h4: (props: HeadingProps) => <Heading level={4} {...props} />,
  h5: (props: HeadingProps) => <Heading level={5} {...props} />,
  h6: (props: HeadingProps) => <Heading level={6} {...props} />,
  Callout,
  YouTube,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
};
