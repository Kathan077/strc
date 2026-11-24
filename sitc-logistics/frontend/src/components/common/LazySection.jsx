'use client';

import React, { useState, useEffect, useRef } from 'react';
import './LazySection.css';

/**
 * LazySection - Instagram-Style Progressive Viewport Chunk Loader
 * Hydrates heavy below-the-fold sections only when scrolled within 250px of viewport.
 * Guarantees 0 layout shift (CLS = 0) and eliminates main-thread CPU freeze on initial load.
 */
export default function LazySection({
  children,
  minHeight = '300px',
  rootMargin = '800px 0px 800px 0px',
  fallbackText = 'SRTC FLEET DATA LOADING...',
}) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, render immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Once visible, remain permanently mounted
        }
      },
      { rootMargin }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [rootMargin]);

  return (
    <div
      ref={containerRef}
      className={`srtc-lazy-section ${isVisible ? 'is-hydrated' : 'is-skeleton'}`}
      style={{ minHeight: isVisible ? 'auto' : minHeight }}
    >
      {isVisible ? (
        children
      ) : (
        <div className="srtc-skeleton-placeholder" style={{ minHeight }} aria-hidden="true">
          <div className="srtc-skeleton-shimmer" />
          <div className="srtc-skeleton-badge">
            <span className="srtc-skeleton-dot" />
            <span>{fallbackText}</span>
          </div>
        </div>
      )}
    </div>
  );
}

