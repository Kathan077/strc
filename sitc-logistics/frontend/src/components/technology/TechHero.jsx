'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import './TechHero.css';

export default function TechHero() {
  const bgImg = '/images/hero/hero-truck-cinematic.jpg';
  const title = 'Technology &';
  const titleGold = 'Software Platform';
  const subtitle =
    'In-house software engineering powering real-time fleet dispatch, container telemetry, and verified compliance across Gujarat.';
  const breadcrumbHome = 'Home';
  const breadcrumbCurrent = 'Technology';

  return (
    <section className="srtc-tech-hero" aria-label="SRTC Technology Platform Hero Banner">
      {/* 1. Cinematic Background Layer with Brand Overlays (Matches AboutHero) */}
      <div className="srtc-tech-hero__bg-wrap">
        <img
          src={bgImg}
          alt="SRTC Freight Fleet and Real-Time Technology Infrastructure"
          className="srtc-tech-hero__bg-img"
        />
        <div className="srtc-tech-hero__overlay-dark" />
        <div className="srtc-tech-hero__overlay-radial" />
      </div>

      {/* 2. Main Center Hero Content (Clean Title + Single Description + Breadcrumbs) */}
      <div className="srtc-tech-hero__container">
        {/* Main Display Heading */}
        <h1 className="srtc-tech-hero__title">
          {title} <span className="srtc-tech-hero__title-gold">{titleGold}</span>
        </h1>

        {/* Concise Description */}
        <p className="srtc-tech-hero__subtitle">{subtitle}</p>

        {/* Interactive Breadcrumb */}
        <nav className="srtc-tech-hero__breadcrumb-nav" aria-label="Breadcrumb">
          <ol className="srtc-tech-hero__breadcrumb-list">
            <li className="srtc-tech-hero__breadcrumb-item">
              <Link href="/" className="srtc-tech-hero__breadcrumb-link">
                <Home size={14} className="srtc-tech-hero__breadcrumb-home-icon" />
                <span>{breadcrumbHome}</span>
              </Link>
            </li>
            <li className="srtc-tech-hero__breadcrumb-sep" aria-hidden="true">
              <ChevronRight size={13} />
            </li>
            <li
              className="srtc-tech-hero__breadcrumb-item srtc-tech-hero__breadcrumb-item--active"
              aria-current="page"
            >
              <span>{breadcrumbCurrent}</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* 3. Bottom Radiant Gold Transition Edge */}
      <div className="srtc-tech-hero__bottom-edge" />
    </section>
  );
}
