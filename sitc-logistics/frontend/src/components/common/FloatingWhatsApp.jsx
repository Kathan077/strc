'use client';

import React, { useState } from 'react';
import './FloatingWhatsApp.css';

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  // Official SRTC Logistics WhatsApp Hotline
  const whatsappUrl =
    'https://wa.me/919426646095?text=Hello%20SRTC%20Logistics%2C%20I%20need%20a%20freight%20quote%20for%20my%20shipment.';

  return (
    <aside
      className="srtc-floating-wa-wrapper"
      aria-label="Direct WhatsApp Support"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Tooltip / Expanded Tag */}
      <div className={`srtc-floating-wa-tooltip ${isHovered ? 'srtc-tooltip-active' : ''}`}>
        <div className="srtc-wa-tooltip-header">
          <span className="srtc-wa-online-dot" />
          <span className="srtc-wa-online-status">Online 24/7</span>
        </div>
        <span className="srtc-wa-tooltip-text">Chat with SRTC Dispatch</span>
      </div>

      {/* Main Circular WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="srtc-floating-wa-btn"
        aria-label="Chat with SRTC Logistics Central Dispatch on WhatsApp"
      >
        {/* Ambient Pulse Ripple Rings */}
        <span className="srtc-wa-pulse-ring" aria-hidden="true" />
        <span className="srtc-wa-pulse-ring srtc-wa-pulse-ring--delay" aria-hidden="true" />

        {/* Official WhatsApp Vector Logo */}
        <svg
          className="srtc-wa-icon"
          viewBox="0 0 32 32"
          width="32"
          height="32"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16.02 2C8.28 2 2 8.28 2 16.02c0 2.6.7 5.04 1.94 7.15L2 30l7.07-1.85a13.97 13.97 0 0 0 6.95 1.83h.01c7.74 0 14.02-6.28 14.02-14.02 0-3.75-1.46-7.27-4.11-9.92A13.93 13.93 0 0 0 16.02 2zm0 25.68h-.01a11.66 11.66 0 0 1-5.94-1.63l-.43-.25-4.42 1.16 1.18-4.31-.28-.44a11.64 11.64 0 0 1-1.78-6.19c0-6.44 5.24-11.68 11.68-11.68 3.12 0 6.05 1.22 8.26 3.43a11.62 11.62 0 0 1 3.42 8.25c0 6.44-5.24 11.68-11.68 11.68zm6.41-8.75c-.35-.18-2.08-1.03-2.4-1.15-.32-.12-.56-.18-.8.18-.24.35-.92 1.15-1.12 1.38-.21.24-.41.26-.77.09-.35-.18-1.49-.55-2.84-1.75-1.05-.94-1.76-2.1-1.97-2.45-.2-.35-.02-.54.15-.72.16-.16.35-.41.53-.62.18-.2.24-.35.35-.59.12-.24.06-.44-.03-.62-.09-.18-.8-1.93-1.1-2.65-.29-.7-.59-.61-.8-.62h-.68c-.24 0-.62.09-.95.44-.32.35-1.24 1.21-1.24 2.96s1.27 3.43 1.45 3.67c.18.24 2.5 3.82 6.06 5.35.85.37 1.51.58 2.02.75.85.27 1.63.23 2.24.14.68-.1 2.08-.85 2.37-1.67.29-.82.29-1.53.2-1.68-.08-.15-.32-.24-.67-.41z" />
        </svg>
      </a>
    </aside>
  );
}

