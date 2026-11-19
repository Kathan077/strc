'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import './ServicesHero.css';

export default function ServicesHero({ data }) {
  const bgImg = data?.backgroundImage || '/images/hero/hero-truck-cinematic.jpg';
  const title = data?.title || 'Our';
  const titleGold = data?.titleGold || 'Services';
  const subtitle =
    data?.subtitle ||
    'Comprehensive Transport, Container Linehaul & Scalable Warehouse Solutions Across India.';
  const breadcrumbHome = data?.breadcrumbHome || 'Home';
  const breadcrumbCurrent = data?.breadcrumbCurrent || 'Our Services';

  return (
    <section className="srtc-services-hero" aria-label="Our Services Hero Banner">
      {/* 1. Cinematic Background Layer with Brand Overlays */}
      <div className="srtc-services-hero__bg-wrap">
        <img
          src={bgImg}
          alt="SRTC Heavy Duty Container Fleet on Indian Highway Corridor"
          className="srtc-services-hero__bg-img"
        />
        <div className="srtc-services-hero__overlay-dark" />
        <div className="srtc-services-hero__overlay-radial" />
      </div>

      {/* 2. Main Center Hero Content */}
      <div className="srtc-services-hero__container">
        <h1 className="srtc-services-hero__title">
          {title} <span className="srtc-services-hero__title-gold">{titleGold}</span>
        </h1>

        <p className="srtc-services-hero__subtitle">{subtitle}</p>

        {/* Interactive Breadcrumb */}
        <nav className="srtc-services-hero__breadcrumb-nav" aria-label="Breadcrumb">
          <ol className="srtc-services-hero__breadcrumb-list">
            <li className="srtc-services-hero__breadcrumb-item">
              <Link href="/" className="srtc-services-hero__breadcrumb-link">
                <Home size={14} className="srtc-services-hero__breadcrumb-home-icon" />
                <span>{breadcrumbHome}</span>
              </Link>
            </li>
            <li className="srtc-services-hero__breadcrumb-sep" aria-hidden="true">
              <ChevronRight size={13} />
            </li>
            <li
              className="srtc-services-hero__breadcrumb-item srtc-services-hero__breadcrumb-item--active"
              aria-current="page"
            >
              <span>{breadcrumbCurrent}</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* 3. Bottom Radiant Gold Transition Edge Line */}
      <div className="srtc-services-hero__bottom-edge" />
    </section>
  );
}
