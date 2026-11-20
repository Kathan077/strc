'use client';

import React from 'react';
import './Loader.css';

export default function Loader({
  text = 'INITIALIZING FLEET TELEMETRY...',
  subtext = 'FASTEST • SECURED • TRUSTABLE',
  fullScreen = false,
}) {
  return (
    <div
      className={`srtc-loader-container ${fullScreen ? 'srtc-loader-container--fullscreen' : ''}`}
      role="status"
      aria-label="Loading content"
    >
      <div className="srtc-loader-box">
        {/* Soft Ambient Radial Glow */}
        <div className="srtc-loader-orb" aria-hidden="true" />

        {/* Dual-Ring Rotating Precision Wheel Spinner */}
        <div className="srtc-loader-visual" aria-hidden="true">
          <div className="srtc-loader-ring srtc-loader-ring--outer" />
          <div className="srtc-loader-ring srtc-loader-ring--inner" />
          <div className="srtc-loader-core">
            <span className="srtc-loader-dot" />
          </div>
        </div>

        {/* Brand Headline */}
        <div className="srtc-loader-brand">
          <span className="srtc-loader-navy">SRTC</span>
          <span className="srtc-loader-gold">LOGISTICS</span>
        </div>

        {/* Tagline */}
        {subtext && <div className="srtc-loader-subtext">{subtext}</div>}

        {/* Dynamic Status Bar with Live Pulse Radar Blip */}
        <div className="srtc-loader-status-pill">
          <span className="srtc-status-blip" />
          <span className="srtc-status-label">{text}</span>
        </div>
      </div>
    </div>
  );
}

