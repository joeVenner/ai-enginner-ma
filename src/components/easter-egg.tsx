'use client';

import { useEffect, useState } from 'react';
import { Terminal, Code, Cpu, Database } from 'lucide-react';

export function EasterEgg() {
  const [show, setShow] = useState(false);
  const [, setKeys] = useState<string[]>([]);
  const [glitchText, setGlitchText] = useState('ACCESS GRANTED');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((prev) => {
        // Keep last 10 keys (length of konami code)
        const newKeys = [...prev, e.key].slice(-10);
        
        // Konami code: ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight, b, a
        if (
          newKeys.length === 10 &&
          newKeys[0] === 'ArrowUp' &&
          newKeys[1] === 'ArrowUp' &&
          newKeys[2] === 'ArrowDown' &&
          newKeys[3] === 'ArrowDown' &&
          newKeys[4] === 'ArrowLeft' &&
          newKeys[5] === 'ArrowRight' &&
          newKeys[6] === 'ArrowLeft' &&
          newKeys[7] === 'ArrowRight' &&
          newKeys[8].toLowerCase() === 'b' &&
          newKeys[9].toLowerCase() === 'a'
        ) {
          setShow(true);
          
          // Glitch text effect
          let i = 0;
          const originalText = 'ACCESS GRANTED';
          const chars = '!<>-_\\/[]{}—=+*^?#_';
          
          const interval = setInterval(() => {
            setGlitchText(
              originalText.split('').map((char, index) => {
                if (index < i) return char;
                return chars[Math.floor(Math.random() * chars.length)];
              }).join('')
            );
            i += 1/3;
            if (i >= originalText.length) clearInterval(interval);
          }, 30);
          
          // Auto hide after 6 seconds
          setTimeout(() => setShow(false), 6000);
          return []; // Reset after matching
        }
        
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" />
      
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />

      <div className="relative z-10 flex flex-col items-center justify-center animate-in zoom-in-90 duration-500 p-12 rounded-3xl bg-black border border-green-500/50 shadow-[0_0_100px_rgba(34,197,94,0.2)]">
        
        <div className="absolute -top-3 -left-3 border-t-2 border-l-2 border-green-500 w-6 h-6" />
        <div className="absolute -top-3 -right-3 border-t-2 border-r-2 border-green-500 w-6 h-6" />
        <div className="absolute -bottom-3 -left-3 border-b-2 border-l-2 border-green-500 w-6 h-6" />
        <div className="absolute -bottom-3 -right-3 border-b-2 border-r-2 border-green-500 w-6 h-6" />

        <div className="flex gap-8 mb-8">
          <Code className="w-8 h-8 text-green-500/50 animate-pulse delay-75" />
          <Terminal className="w-16 h-16 text-green-500 animate-pulse" />
          <Database className="w-8 h-8 text-green-500/50 animate-pulse delay-150" />
        </div>
        
        <h2 className="text-4xl sm:text-6xl font-mono font-bold text-green-500 mb-4 tracking-widest uppercase">
          {glitchText}
        </h2>
        
        <div className="flex flex-col items-center gap-2">
          <p className="text-green-400 font-mono text-lg opacity-80">&gt; INITIALIZING AI SUBSYSTEMS...</p>
          <p className="text-green-400 font-mono text-lg opacity-80">&gt; BYPASSING SECURITY PROTOCOLS...</p>
          <p className="text-green-400 font-mono text-lg animate-pulse">&gt; WELCOME, ENGINEER.</p>
        </div>
        
        <div className="absolute bottom-4 right-6 flex items-center gap-2 text-xs font-mono text-green-600/50">
          <Cpu className="w-3 h-3" />
          <span>SYS.VER. 16.3.3</span>
        </div>
      </div>
    </div>
  );
}
