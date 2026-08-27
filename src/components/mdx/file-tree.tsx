import React from 'react';
import { File, Folder, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileTreeProps {
  children: React.ReactNode;
  className?: string;
}

export function FileTree({ children, className }: FileTreeProps) {
  return (
    <div className={cn("my-6 rounded-xl border border-border bg-card p-4 font-mono text-sm shadow-sm", className)}>
      <ul className="m-0 list-none p-0 text-foreground">
        {children}
      </ul>
    </div>
  );
}

interface TreeFolderProps {
  name: string;
  defaultOpen?: boolean;
  children?: React.ReactNode;
}

export function TreeFolder({ name, defaultOpen = true, children }: TreeFolderProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <li className="my-1">
      <div 
        className="flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronDown className="h-4 w-4 shrink-0" /> : <ChevronRight className="h-4 w-4 shrink-0" />}
        <Folder className="h-4 w-4 shrink-0 fill-current opacity-70" />
        <span className="font-medium truncate">{name}</span>
      </div>
      
      {isOpen && children && (
        <ul className="m-0 ml-4 mt-1 list-none border-l border-border/50 pl-3">
          {children}
        </ul>
      )}
    </li>
  );
}

interface TreeFileProps {
  name: string;
  active?: boolean;
}

export function TreeFile({ name, active }: TreeFileProps) {
  return (
    <li className="my-1">
      <div className={cn(
        "flex items-center gap-2 rounded-md px-2 py-1 transition-colors",
        active 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
      )}>
        <File className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "opacity-70")} />
        <span className="truncate">{name}</span>
      </div>
    </li>
  );
}
