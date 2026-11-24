'use client';

import React, { useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './Hero.css';

function Hero({ data }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const videoSrc = data?.videoUrl || '/videos/video_no_logo_clean.mp4';

  // Resilient Mobile & Desktop Autoplay Handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startPlayback = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy or low power mode restricts autoplay,
          // resume immediately on the user's first touch/interaction
          const handleFirstInteraction = () => {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
          };

          window.addEventListener('touchstart', handleFirstInteraction, { passive: true, once: true });
          window.addEventListener('click', handleFirstInteraction, { passive: true, once: true });
          window.addEventListener('scroll', handleFirstInteraction, { passive: true, once: true });
        });
      }
    };

    startPlayback();
  }, [videoSrc]);

  const scrollToContent = () => {
    if (typeof window !== 'undefined') {
      const heroEl = containerRef.current;
      const targetY = heroEl ? heroEl.offsetHeight : window.innerHeight;
      window.scrollTo({
        top: targetY - 60,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="srtc-video-hero-wrapper" 
      aria-label="SRTC Commercial Fleet Video Showcase"
    >
      <div className="srtc-video-hero-container">
        {/* Hardware-accelerated Full-Bleed Video Canvas (0 scroll-driven React re-renders) */}
        <div className="srtc-video-canvas">
          <video
            ref={videoRef}
            className="srtc-hero-video-player"
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            disablePictureInPicture
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
        </div>

        {/* High-Performance Hardware-Accelerated Scroll Down Indicator */}
        <div
          className="srtc-video-scroll-indicator"
          onClick={scrollToContent}
          role="button"
          tabIndex={0}
          aria-label="Scroll down to explore content"
        >
          <span className="srtc-scroll-mouse" aria-hidden="true">
            <span className="srtc-scroll-wheel" />
          </span>
          <span className="srtc-scroll-label">Scroll to Explore</span>
          <ChevronDown size={14} className="srtc-scroll-chevron" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

export default React.memo(Hero);
