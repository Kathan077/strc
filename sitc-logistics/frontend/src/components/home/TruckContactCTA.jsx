'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CodedTruckRealistic from './CodedTruckRealistic';
import './TruckContactCTA.css';

export default function TruckContactCTA({ data }) {
  // Dipper active state
  const [isDipper, setIsDipper] = useState(false);

  // Periodic automatic realistic highway dipper (every 4.5 seconds, double quick flash)
  useEffect(() => {
    const interval = setInterval(() => {
      // First quick flash
      setIsDipper(true);
      setTimeout(() => {
        setIsDipper(false);
        // Second quick flash
        setTimeout(() => {
          setIsDipper(true);
          setTimeout(() => {
            setIsDipper(false);
          }, 180);
        }, 120);
      }, 180);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const buttonText = data?.buttonText || 'CONTACT US';
  const buttonLink = data?.buttonLink || '/contact';
  const statusText = data?.statusText || 'SRTC CENTRAL DISPATCH // ACTIVE FLEET';

  return (
    <section
      id="truck-contact"
      className="sitc-truck-real-section"
      data-section-name="CONTACT US"
      aria-label="Contact SRTC Logistics"
    >
      <div className="sitc-truck-real-container">
        {/* Simple Minimal Top Bar: Status Badge + Single Clean Contact Us Button */}
        <div className="sitc-truck-top-bar">
          <div className="sitc-truck-status-badge">
            <span className="sitc-truck-live-dot" />
            <span className="sitc-truck-status-text">{statusText}</span>
          </div>

          <div className="sitc-truck-action-group">
            {/* Clean Contact Us Button */}
            <Link
              href={buttonLink}
              className="sitc-truck-contact-btn"
              aria-label="Contact SRTC Logistics"
            >
              <span>{buttonText}</span>
              <ArrowRight size={15} className="sitc-contact-arrow" />
            </Link>
          </div>
        </div>

        {/* 100% Coded Realistic Truck Showcase (Clickable Link to buttonLink) */}
        <Link
          href={buttonLink}
          className="sitc-truck-display-link"
          aria-label="Click truck to contact SRTC Logistics"
        >
          <div className={`sitc-truck-frame ${isDipper ? 'is-dipper-active' : ''}`}>
            {/* 100% Native Vector Coded Truck - Zero External Images */}
            <CodedTruckRealistic isDipper={isDipper} />

            {/* Minimal Hover Dispatch Indicator */}
            <div className="sitc-truck-hover-pill" aria-hidden="true">
              <span>CLICK TO ROUTE TO {buttonLink}</span>
              <ArrowRight size={12} />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
