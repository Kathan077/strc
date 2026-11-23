'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './Hero.css';

function Hero({ data }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const videoSrc = data?.videoUrl || '/videos/video_no_logo_clean.mp4';

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // High-performance scroll parallax / curtain recess effect
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const scrollY = window.scrollY;
            const heroHeight = containerRef.current.offsetHeight || window.innerHeight;
            const progress = Math.min(1, Math.max(0, scrollY / heroHeight));
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    if (typeof window !== 'undefined') {
      const scrollTarget = window.innerHeight * 0.95;
      window.scrollTo({
        top: scrollTarget,
        behavior: 'smooth',
      });
    }
  };

  // Subtle cinematic recess as user scrolls
  const scale = 1 - scrollProgress * 0.06;
  const opacity = 1 - scrollProgress * 0.35;
  const overlayOpacity = scrollProgress * 0.45;

  return (
    <section 
      ref={containerRef} 
      className="srtc-video-hero-wrapper" 
      aria-label="SRTC Commercial Fleet Video Showcase"
    >
      <div className="srtc-video-hero-sticky">
        {/* Full-Bleed Video Element with hardware-accelerated curtain scaling */}
        <div
          className="srtc-video-canvas"
          style={{
            transform: `scale(${scale})`,
            opacity: opacity,
          }}
        >
          <video
            ref={videoRef}
            className="srtc-hero-video-player"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src={videoSrc} type="video/mp4" />
            {videoSrc !== '/videos/video_no_logo_clean.mp4' && (
              <source src="/videos/video_no_logo_clean.mp4" type="video/mp4" />
            )}
            Your browser does not support HTML5 video.
          </video>

          {/* Subtle Cinematic Vignette for Depth */}
          <div className="srtc-video-vignette" />
          <div
            className="srtc-video-scroll-dim"
            style={{ opacity: overlayOpacity }}
            aria-hidden="true"
          />
        </div>

        {/* Smooth Scroll Down Indicator */}
        <div
          className="srtc-video-scroll-indicator"
          onClick={scrollToContent}
          role="button"
          tabIndex={0}
          aria-label="Scroll down to explore content"
        >
          <span className="srtc-scroll-mouse">
            <span className="srtc-scroll-wheel" />
          </span>
          <span className="srtc-scroll-label">Scroll to Explore</span>
          <ChevronDown size={14} className="srtc-scroll-chevron" />
        </div>
      </div>
    </section>
  );
}

export default React.memo(Hero);
