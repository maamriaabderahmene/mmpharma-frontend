'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      if (max <= 0) {
        setProgress(0);
        return;
      }
      setProgress((window.scrollY / max) * 100);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-[92px] z-50 h-1 bg-gold transition-[width] duration-150 md:top-[92px]"
      style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
    />
  );
}
