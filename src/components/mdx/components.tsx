import { CodeBlock } from './code-block';
import { ZoomImage } from './zoom-image';
import { Callout } from './callout';
import { CustomLink } from './link';
import { YouTube } from './youtube';
import { Heading } from './heading';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';
import { Table, TableHeader, TableRow, TableHead, TableCell } from './table';
import { Blockquote } from './blockquote';
import { Axiom } from './axiom';
import { EntityLink } from './entity-link';
import { Steps } from './steps';
import { Accordion, AccordionItem } from './accordion';
import { Card, CardGrid } from './card';
import { Mermaid } from './mermaid';
import { FileTree, TreeFolder, TreeFile } from './file-tree';
import { CodeBlockWrapper } from '../code-block-wrapper';
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
  table: Table,
  thead: TableHeader,
  tr: TableRow,
  th: TableHead,
  td: TableCell,
  blockquote: Blockquote,
  Axiom,
  EntityLink,
  Steps,
  Accordion,
  AccordionItem,
  Card,
  CardGrid,
  Mermaid,
  FileTree,
  TreeFolder,
  TreeFile,
  CodeBlockWrapper,
};
