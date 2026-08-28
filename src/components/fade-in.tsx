'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  onMount?: boolean;
}

export function FadeIn({ children, delay = 0, direction = 'up', className = '', onMount = false }: FadeInProps) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction]
      }}
      animate={onMount ? { opacity: 1, x: 0, y: 0 } : undefined}
      whileInView={!onMount ? { opacity: 1, x: 0, y: 0 } : undefined}
      viewport={!onMount ? { once: true, margin: "-100px" } : undefined}
      transition={{ 
        duration: 0.7, 
        ease: [0.21, 0.47, 0.32, 0.98], // easeOutCubic
        delay: delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
