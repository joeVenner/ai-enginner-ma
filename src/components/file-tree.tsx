'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, Code2, Terminal, Image as ImageIcon, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  language?: string;
  children?: FileNode[];
  isOpen?: boolean;
}

interface FileTreeProps {
  files: FileNode[];
  defaultFile?: string;
}

const getFileIcon = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
    case 'py':
    case 'go':
    case 'rs':
      return <Code2 className="h-3.5 w-3.5 text-blue-400" />;
    case 'sh':
    case 'bash':
    case 'zsh':
      return <Terminal className="h-3.5 w-3.5 text-green-400" />;
    case 'json':
    case 'md':
    case 'txt':
    case 'csv':
      return <FileText className="h-3.5 w-3.5 text-yellow-400" />;
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'svg':
      return <ImageIcon className="h-3.5 w-3.5 text-purple-400" />;
    default:
      return <File className="h-3.5 w-3.5 text-muted-foreground" />;
  }
};

export function FileTreeExplorer({ files = [], defaultFile }: FileTreeProps) {
  // Deep clone to add state to nodes, providing a fallback empty array
  const [treeData, setTreeData] = useState<FileNode[]>(JSON.parse(JSON.stringify(files || [])));
  
  // Find default file content
  let initialActiveFile: FileNode | null = null;
  
  const findDefault = (nodes: FileNode[]) => {
    for (const node of nodes) {
      if (node.type === 'file' && node.name === defaultFile) {
        initialActiveFile = node;
        return;
      }
      if (node.children) findDefault(node.children);
    }
  };
  
  if (defaultFile) {
    findDefault(treeData);
  } else {
    // Just pick the first file we find
    const findFirst = (nodes: FileNode[]) => {
      for (const node of nodes) {
        if (node.type === 'file' && node.content) {
          initialActiveFile = node;
          return;
        }
        if (node.children && !initialActiveFile) findFirst(node.children);
      }
    };
    findFirst(treeData);
  }

  const [activeFile, setActiveFile] = useState<FileNode | null>(initialActiveFile);

  const toggleFolder = (path: number[]) => {
    const newData = [...treeData];
    let current: FileNode | { children: FileNode[] } = { children: newData };

    for (const index of path) {
      if ('children' in current && current.children) {
        current = current.children[index];
      }
    }

    if ('type' in current && current.type === 'folder') {
      current.isOpen = !current.isOpen;
      setTreeData(newData);
    }
  };

  const renderTree = (nodes: FileNode[], path: number[] = [], level = 0) => {
    return (
      <ul className="w-full">
        {nodes.map((node, index) => {
          const currentPath = [...path, index];
          const isFolder = node.type === 'folder';
          const isActive = activeFile === node;
          
          return (
            <li key={node.name} className="w-full">
              <button
                onClick={() => {
                  if (isFolder) {
                    toggleFolder(currentPath);
                  } else if (node.content) {
                    setActiveFile(node);
                  }
                }}
                className={cn(
                  "flex w-full items-center gap-1.5 px-2 py-1 text-sm transition-colors rounded-sm",
                  isActive ? "bg-primary/20 text-primary font-medium" : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200",
                )}
                style={{ paddingLeft: `${level * 12 + 8}px` }}
              >
                {isFolder ? (
                  <>
                    <span className="flex items-center justify-center w-4 text-zinc-500">
                      {node.isOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                    </span>
                    <Folder className={cn("h-3.5 w-3.5", node.isOpen ? "fill-blue-400/20 text-blue-400" : "fill-none text-zinc-400")} />
                  </>
                ) : (
                  <>
                    <span className="w-4"></span>
                    {getFileIcon(node.name)}
                  </>
                )}
                <span className="truncate">{node.name}</span>
              </button>
              
              {isFolder && node.isOpen && node.children && (
                <div className="relative">
                  <div className="absolute left-[13px] top-0 bottom-0 w-px bg-white/10" style={{ left: `${level * 12 + 13}px` }}></div>
                  {renderTree(node.children, currentPath, level + 1)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="my-8 flex flex-col md:flex-row w-full overflow-hidden rounded-xl border border-border bg-[#1e1e1e] shadow-lg h-[500px]">
      {/* Sidebar: File Tree */}
      <div className="w-full md:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-white/10 bg-[#252526] flex flex-col overflow-hidden">
        <div className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 border-b border-white/10 bg-black/20">
          Explorer
        </div>
        <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">
          {renderTree(treeData)}
        </div>
      </div>

      {/* Main Content: Code Viewer */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e] overflow-hidden">
        <div className="flex items-center px-4 py-2 border-b border-white/10 bg-black/20 overflow-x-auto">
          {activeFile ? (
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              {getFileIcon(activeFile.name)}
              <span>{activeFile.name}</span>
            </div>
          ) : (
            <div className="text-sm text-zinc-500 italic">Select a file to view</div>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto relative bg-[#1e1e1e]">
          {activeFile && activeFile.content ? (
            <SyntaxHighlighter
              language={activeFile.language || activeFile.name.split('.').pop() || 'text'}
              style={oneDark}
              customStyle={{
                margin: 0,
                padding: '1.25rem',
                fontSize: '14px',
                background: 'transparent',
                minHeight: '100%',
              }}
              wrapLines={true}
              showLineNumbers={true}
              lineNumberStyle={{ opacity: 0.3, minWidth: '2.5em', paddingRight: '1em' }}
            >
              {activeFile.content}
            </SyntaxHighlighter>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-zinc-600">
              <Code2 className="h-16 w-16 opacity-20" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
