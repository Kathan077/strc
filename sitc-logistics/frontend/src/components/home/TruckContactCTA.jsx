'use client';

import React, { useState, useEffect, useRef, memo } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CodedTruckRealistic from './CodedTruckRealistic';
import './TruckContactCTA.css';

function TruckContactCTA({ data }) {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isDipper, setIsDipper] = useState(false);

  // Monitor visibility to only run dipper timer when visible
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '100px' }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  // Periodic automatic realistic highway dipper (only when visible in viewport)
  useEffect(() => {
    if (!isInView) return;

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
  }, [isInView]);

  const buttonText = data?.buttonText || 'CONTACT US';
  const buttonLink = data?.buttonLink || '/contact';
  const statusText = data?.statusText || 'SRTC CENTRAL DISPATCH // ACTIVE FLEET';

  return (
    <section
      ref={sectionRef}
      id="truck-contact"
      className="sitc-truck-real-section"
      data-section-name="CONTACT US"
      aria-label="Contact SRTC Logistics"
    >
      <div className="sitc-truck-real-container">
        {/* Simple Minimal Top Bar: Single Clean Contact Us Button */}
        <div className="sitc-truck-top-bar sitc-truck-top-bar--btn-only">
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

export default memo(TruckContactCTA);
