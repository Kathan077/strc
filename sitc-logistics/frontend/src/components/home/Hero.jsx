'use client';

import React, { useRef, useEffect } from 'react';
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

  return (
    <section 
      ref={containerRef} 
      className="srtc-video-hero-wrapper" 
      aria-label="SRTC Commercial Fleet Video Showcase"
    >
      <div className="srtc-video-hero-container">
        {/* Hardware-accelerated Full-Bleed Video Canvas */}
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
      </div>
    </section>
  );
}

export default React.memo(Hero);
