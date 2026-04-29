'use client';

import React, { useEffect, useRef, useState } from 'react';

interface LazyLoadProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  placeholder?: React.ReactNode;
}

/**
 * A component that only renders its children when it enters the viewport.
 * Useful for heavy components that are below the fold.
 */
export default function LazyLoad({ 
  children, 
  threshold = 0.01, 
  rootMargin = '200px 0px', 
  placeholder = <div style={{ minHeight: '100px' }} /> 
}: LazyLoadProps) {
  const [hasEntered, setHasEntered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasEntered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasEntered, threshold, rootMargin]);

  return (
    <div 
      ref={ref} 
      style={{ 
        opacity: hasEntered ? 1 : 0,
        transition: 'opacity 0.6s ease-in-out'
      }}
    >
      {hasEntered ? children : placeholder}
    </div>
  );
}
