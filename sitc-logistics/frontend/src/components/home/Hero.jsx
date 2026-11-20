'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Compass,
  Truck,
} from 'lucide-react';
import './Hero.css';

function Hero({ data }) {
  const slides = data?.slides || [];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Check URL query param for initial slide (e.g. ?slide=1)
  useEffect(() => {
    if (typeof window !== 'undefined' && slides.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const s = params.get('slide');
      if (s !== null) {
        const idx = parseInt(s, 10);
        if (!isNaN(idx) && idx >= 0 && idx < slides.length) {
          setCurrentSlide(idx);
        }
      }
    }
  }, [slides.length]);

  // High-performance scroll parallax effect with RAF throttling & dead-band guard
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    let lastProgress = 0;

    const handleScroll = () => {
      if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        if (lastProgress !== 0) {
          lastProgress = 0;
          setScrollProgress(0);
        }
        return;
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (heroRef.current) {
            const currentY = window.scrollY;
            const heroHeight = heroRef.current.offsetHeight || window.innerHeight;

            // Scrolled past hero — lock at 1 and stop updating
            if (currentY > heroHeight * 1.1) {
              if (lastProgress !== 1) {
                lastProgress = 1;
                setScrollProgress(1);
              }
              ticking = false;
              return;
            }

            const progress = Math.min(1, Math.max(0, currentY / (heroHeight * 0.92)));
            // Dead-band threshold: only update if delta is at least 0.015
            if (Math.abs(progress - lastProgress) >= 0.015) {
              lastProgress = progress;
              setScrollProgress(progress);
            }
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

  const goToSlide = useCallback((index) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsFading(false);
    }, 220);
  }, []);

  const handlePrev = useCallback(() => {
    if (slides.length === 0) return;
    const nextIdx = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(nextIdx);
  }, [currentSlide, slides.length, goToSlide]);

  const handleNext = useCallback(() => {
    if (slides.length === 0) return;
    const nextIdx = (currentSlide + 1) % slides.length;
    goToSlide(nextIdx);
  }, [currentSlide, slides.length, goToSlide]);

  // Automatic rotation every 8 seconds
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [handleNext, slides.length]);

  if (!slides || slides.length === 0) {
    return null;
  }

  const slide = slides[currentSlide] || slides[0];

  return (
    <section
      ref={heroRef}
      className="sitc-hero-section"
      id="hero-section"
      data-section-name="HERO SECTION"
      aria-label="Hero Section"
    >
      {/* 100% Full Width Edge-to-Edge Container */}
      <div className="sitc-hero-card">
        {/* 1. Cinematic Multi-Layered Background with Parallax 3D Zoom on Scroll */}
        <div className="sitc-hero-bg-layers" aria-hidden="true">
          {slides.map((s, idx) => (
            <div
              key={s._id || idx}
              className={`sitc-hero-bg-layer ${idx === currentSlide ? 'is-active' : ''}`}
              style={{
                backgroundImage: `url('${s.image}')`,
                transform: `scale(${1.045 + scrollProgress * 0.14}) translateY(${scrollProgress * 55}px) translateX(${scrollProgress * -22}px)`,
              }}
            />
          ))}
        </div>

        {/* 2. Deep Navy Blue Brand Vignette & Ambient Light Gradient */}
        <div className="sitc-hero-overlay" aria-hidden="true" />
        <div
          className="sitc-hero-light-flare"
          style={{
            opacity: 0.5 + scrollProgress * 0.5,
            transform: `scale(${1 + scrollProgress * 0.25}) translateY(${scrollProgress * 40}px)`,
          }}
          aria-hidden="true"
        />

        {/* 3. Hero Content Column (Typography, CTAs & Impact Metrics with Parallax Lift) */}
        <div className="sitc-hero-inner">
          <div
            className="sitc-hero-content-col"
            style={{
              transform: `translateY(${-scrollProgress * 85}px)`,
              opacity: Math.max(0, 1 - scrollProgress * 1.55),
            }}
          >
            <div key={slide._id || currentSlide} className={`sitc-hero-slide-stage ${isFading ? 'is-fading' : ''}`}>
              {/* Pro-Level Hero Kicker Pill */}
              {slide.kicker && (
                <div className="sitc-hero-kicker-capsule">
                  <Truck size={13} className="sitc-hero-kicker__icon" />
                  <span className="sitc-hero-kicker__text">{slide.kicker}</span>
                  <span className="sitc-hero-kicker__shimmer" aria-hidden="true" />
                </div>
              )}

              {/* Bold Tri-Tone Hero Title with Staggered Lines */}
              <h1 className="sitc-hero-title">
                <span className="sitc-hero-title__line sitc-hero-title__line--1">{slide.titleLine1}</span>
                <br />
                <span className="sitc-hero-title__line sitc-hero-title__line--2 sitc-hero-title__highlight">
                  {slide.titleLine2}
                </span>
                <br />
                <span className="sitc-hero-title__line sitc-hero-title__line--3">{slide.titleLine3}</span>
              </h1>

              {/* High-Clarity Corporate Description */}
              <p className="sitc-hero-desc">{slide.description}</p>

              {/* Dual Action CTA Buttons */}
              <div className="sitc-hero-actions">
                {/* Primary CTA: Premium Gold Pill */}
                {slide.ctaPrimary?.text && (
                  <Link href={slide.ctaPrimary.link || '/services'} className="sitc-hero-btn-primary">
                    <span className="sitc-hero-btn-primary__shimmer" aria-hidden="true" />
                    <span>{slide.ctaPrimary.text}</span>
                    <span className="sitc-hero-btn-primary__circle">
                      <ArrowUpRight size={14} strokeWidth={2.5} />
                    </span>
                  </Link>
                )}

                {/* Secondary CTA: Frosted Navy Pill with Gold Border */}
                {slide.ctaSecondary?.text && (
                  <Link href={slide.ctaSecondary.link || '/contact'} className="sitc-hero-btn-secondary">
                    <Compass size={15} className="sitc-hero-btn-secondary__icon" />
                    <span>{slide.ctaSecondary.text}</span>
                  </Link>
                )}
              </div>

              {/* Industrial Statistics Ticker with Hairline Dividers */}
              {slide.stats && slide.stats.length > 0 && (
                <div className="sitc-hero-stats">
                  {slide.stats.map((stat, idx) => (
                    <div key={idx} className="sitc-hero-stat">
                      <div className="sitc-hero-stat__num">{stat.num}</div>
                      <div className="sitc-hero-stat__label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 5. Signature Bottom-Right White Sculpted Scoop Notch (Interactive Slider Controls) */}
        <div className="sitc-bottom-notch">
          <svg
            viewBox="0 0 280 72"
            fill="none"
            preserveAspectRatio="none"
            className="sitc-bottom-notch__svg"
            aria-hidden="true"
          >
            <path
              d="M0 72 C20 72, 30 48, 32 34 V22 C32 10, 42 0, 54 0 H280 V72 H0 Z"
              fill="#FFFFFF"
            />
          </svg>

          {/* Slider Control Elements Inside White Notch */}
          <div className="sitc-bottom-notch__inner">
            {/* Circular Arrow Buttons: < and > */}
            <div className="sitc-slider-arrows">
              <button
                type="button"
                className="sitc-slider-btn sitc-slider-btn--prev"
                onClick={handlePrev}
                aria-label="Previous Slide"
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>
              <button
                type="button"
                className="sitc-slider-btn sitc-slider-btn--next"
                onClick={handleNext}
                aria-label="Next Slide"
              >
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>

            {/* Horizontal Track with Gold Animated Progress Bar */}
            <div className="sitc-slider-progress" aria-hidden="true">
              <div
                key={currentSlide}
                className="sitc-slider-progress__bar sitc-slider-progress__bar--active"
              />
            </div>

            {/* Slide Index Counter (01 / 03) */}
            <div className="sitc-slider-count">
              <span className="sitc-slider-count__current">
                {String(currentSlide + 1).padStart(2, '0')}
              </span>
              <span className="sitc-slider-count__total">
                / {String(slides.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(Hero);
