'use client';

import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import './AboutHero.css';

export default function AboutHero({ data }) {
  const bgImg = data?.backgroundImage || '/images/hero/hero-truck-cinematic.jpg';
  const title = data?.title || 'About';
  const titleGold = data?.titleGold || 'SRTC Logistics';
  const subtitle =
    data?.subtitle ||
    'Two Decades of Heavy Freight Mastery, Port Evacuation & Guaranteed SLA Corridors Across India.';
  const breadcrumbHome = data?.breadcrumbHome || 'Home';
  const breadcrumbCurrent = data?.breadcrumbCurrent || 'About Us';

  return (
    <section className="srtc-about-hero" aria-label="About SRTC Hero Banner">
      {/* 1. Cinematic Background Layer with Brand Overlays */}
      <div className="srtc-about-hero__bg-wrap">
        <img
          src={bgImg}
          alt="SRTC Heavy Duty Container Fleet on Indian Highway Corridor"
          className="srtc-about-hero__bg-img"
        />
        <div className="srtc-about-hero__overlay-dark" />
        <div className="srtc-about-hero__overlay-radial" />
      </div>

      {/* 2. Main Center Hero Content */}
      <div className="srtc-about-hero__container">
        {/* Prominent Main Display Heading */}
        <h1 className="srtc-about-hero__title">
          {title} <span className="srtc-about-hero__title-gold">{titleGold}</span>
        </h1>

        {/* Creative Subheading / Brand Purpose */}
        <p className="srtc-about-hero__subtitle">{subtitle}</p>

        {/* Interactive Breadcrumb */}
        <nav className="srtc-about-hero__breadcrumb-nav" aria-label="Breadcrumb">
          <ol className="srtc-about-hero__breadcrumb-list">
            <li className="srtc-about-hero__breadcrumb-item">
              <Link href="/" className="srtc-about-hero__breadcrumb-link">
                <Home size={14} className="srtc-about-hero__breadcrumb-home-icon" />
                <span>{breadcrumbHome}</span>
              </Link>
            </li>
            <li className="srtc-about-hero__breadcrumb-sep" aria-hidden="true">
              <ChevronRight size={13} />
            </li>
            <li className="srtc-about-hero__breadcrumb-item srtc-about-hero__breadcrumb-item--active" aria-current="page">
              <span>{breadcrumbCurrent}</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* 3. Bottom Radiant Gold Transition Edge */}
      <div className="srtc-about-hero__bottom-edge" />
    </section>
  );
}
