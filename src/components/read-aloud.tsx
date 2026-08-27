'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Square, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReadAloudProps {
  contentSelector?: string; // CSS selector for the content to read (e.g., '.prose')
  title?: string;
  className?: string;
}

export function ReadAloud({ contentSelector = '.prose', title = '', className }: ReadAloudProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  
  // Use a ref to store the utterance so we don't recreate it
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Check if the Web Speech API is supported
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
      
      // Stop speaking when navigating away
      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, []);

  const handlePlayPause = () => {
    if (!isSupported) return;

    const synth = window.speechSynthesis;

    // If currently playing, we either pause or resume
    if (isPlaying) {
      if (isPaused) {
        synth.resume();
        setIsPaused(false);
      } else {
        synth.pause();
        setIsPaused(true);
      }
      return;
    }

    // If not playing, start from the beginning
    const contentElement = document.querySelector(contentSelector);
    if (!contentElement) {
      console.warn('ReadAloud: Could not find content element using selector', contentSelector);
      return;
    }

    // Extract text from the article content
    // We do basic cleanup to remove code blocks and visual-only text
    let textToRead = title ? `${title}. \n\n` : '';
    
    // Create a clone to manipulate before extracting text
    const clone = contentElement.cloneNode(true) as HTMLElement;
    
    // Remove code blocks, tables, and other elements that sound terrible when read
    const elementsToRemove = clone.querySelectorAll('pre, code, table, .math, svg, .anchor-link');
    elementsToRemove.forEach(el => el.parentNode?.removeChild(el));
    
    textToRead += clone.innerText;

    if (!textToRead.trim()) return;

    // Create the utterance
    const utterance = new SpeechSynthesisUtterance(textToRead);
    
    // Find a good English voice if available
    const voices = synth.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('en-') && v.name.includes('Google')) || 
                           voices.find(v => v.lang.startsWith('en-'));
                           
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    // Slightly tweak speed and pitch for better listening
    utterance.rate = 0.95; 
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    
    // Cancel any ongoing speech before starting new
    synth.cancel();
    synth.speak(utterance);
    
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handleStop = () => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!isSupported) return null;

  return (
    <div className={cn("flex items-center gap-2 rounded-full border border-border/50 bg-secondary/30 px-3 py-1.5 shadow-sm backdrop-blur-sm", className)}>
      <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mr-1">Listen</span>
      
      <button
        onClick={handlePlayPause}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-background border border-border text-foreground hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={isPlaying && !isPaused ? "Pause article audio" : "Play article audio"}
        title={isPlaying && !isPaused ? "Pause" : "Play"}
      >
        {isPlaying && !isPaused ? (
          <Pause className="h-3.5 w-3.5" />
        ) : (
          <Play className="h-3.5 w-3.5 ml-0.5" /> // ml-0.5 visually centers the play triangle
        )}
      </button>

      {isPlaying && (
        <button
          onClick={handleStop}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-background border border-border text-destructive hover:bg-destructive/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Stop audio"
          title="Stop"
        >
          <Square className="h-3 w-3" />
        </button>
      )}
      
      {isPlaying && !isPaused && (
        <div className="flex items-center gap-0.5 ml-1 h-3">
          <div className="w-1 bg-primary/70 animate-[bounce_1s_infinite] h-full" style={{ animationDelay: '0s' }}></div>
          <div className="w-1 bg-primary/70 animate-[bounce_1s_infinite] h-2/3" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1 bg-primary/70 animate-[bounce_1s_infinite] h-4/5" style={{ animationDelay: '0.4s' }}></div>
        </div>
      )}
    </div>
  );
}
