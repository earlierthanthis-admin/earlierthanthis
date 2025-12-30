'use client';

import { useEffect, useState } from 'react';

/**
 * Hook for tracking which heading is currently in view.
 * Used for highlighting the active section in a table of contents.
 */
export function useScrollSpy(elementIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (elementIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        // Trigger when element is 20% from top, 60% from bottom
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      },
    );

    // Observe all elements
    for (const id of elementIds) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [elementIds]);

  return activeId;
}

/**
 * Hook for tracking reading progress based on scroll position.
 * Returns a value between 0 and 100.
 */
export function useReadingProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const newProgress =
        scrollHeight > 0 ? (scrollPosition / scrollHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, newProgress)));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return progress;
}

/**
 * Smoothly scroll to an element by ID
 */
export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
