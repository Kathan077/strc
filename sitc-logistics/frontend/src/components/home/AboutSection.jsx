'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Quote,
  Sparkles,
  MapPin,
  TrendingUp,
  Radio,
  Activity,
  Compass,
  Truck,
} from 'lucide-react';
import './AboutSection.css';

export default function AboutSection({ data }) {
  const capabilities = data?.capabilities || [];
  const [activeCap, setActiveCap] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);

  // Default to 100% visible so mobile, tablets, and slow connections never see blank space
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isVisualVisible, setIsVisualVisible] = useState(true);
  const [isTabsVisible, setIsTabsVisible] = useState(true);
  const [isCapabilitiesVisible, setIsCapabilitiesVisible] = useState(true);
  const [isTestimonialVisible, setIsTestimonialVisible] = useState(true);

  // Counter States (Animate smoothly once stepped tabs enter viewport)
  const [shipmentsCount, setShipmentsCount] = useState(1.2);
  const [corridorsCount, setCorridorsCount] = useState(180);
  const [fleetCount, setFleetCount] = useState(840);
  const [slaCount, setSlaCount] = useState(99.4);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const visualCardRef = useRef(null);
  const tabsRef = useRef(null);
  const capabilitiesRef = useRef(null);
  const testimonialRef = useRef(null);

  // 1. Desktop Staggered Scroll Observers
  useEffect(() => {
    // If mobile or tablet, keep everything visible immediately
    if (typeof window !== 'undefined' && window.innerWidth < 1025) {
      setIsHeaderVisible(true);
      setIsVisualVisible(true);
      setIsTabsVisible(true);
      setIsCapabilitiesVisible(true);
      setIsTestimonialVisible(true);
      return;
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px 0px 50px 0px',
    };

    const observers = [];

    const createTrigger = (ref, setVisible) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        setVisible(true);
      }

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      }, observerOptions);

      observer.observe(ref.current);
      observers.push(observer);
    };

    createTrigger(headerRef, setIsHeaderVisible);
    createTrigger(visualCardRef, setIsVisualVisible);
    createTrigger(tabsRef, setIsTabsVisible);
    createTrigger(capabilitiesRef, setIsCapabilitiesVisible);
    createTrigger(testimonialRef, setIsTestimonialVisible);

    // Safety timeout: ensure everything is visible after 1.2s
    const timer = setTimeout(() => {
      setIsHeaderVisible(true);
      setIsVisualVisible(true);
      setIsTabsVisible(true);
      setIsCapabilitiesVisible(true);
      setIsTestimonialVisible(true);
    }, 1200);

    return () => {
      observers.forEach((obs) => obs.disconnect());
      clearTimeout(timer);
    };
  }, []);

  // 2. Smooth Butter Counter Physics Loop (Triggered strictly when Tabs enter viewport)
  useEffect(() => {
    if (!isTabsVisible) return;

    let startTime = null;
    const duration = 1600; // 1.6s smooth easing

    const targetShipments = data?.stats?.shipments ?? 1.2;
    const targetCorridors = data?.stats?.corridors ?? 180;
    const targetFleet = data?.stats?.fleet ?? 840;
    const targetSla = data?.stats?.sla ?? 99.4;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Smooth easeOutCubic curve
      const ease = 1 - Math.pow(1 - progress, 3);

      setShipmentsCount(Number((ease * targetShipments).toFixed(1)));
      setCorridorsCount(Math.floor(ease * targetCorridors));
      setFleetCount(Math.floor(ease * targetFleet));
      setSlaCount(Number((ease * targetSla).toFixed(1)));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const anim = requestAnimationFrame(step);
    return () => cancelAnimationFrame(anim);
  }, [isTabsVisible]);

  // 3. Smooth Auto-cycle for Capability Items with manual pause on hover
  useEffect(() => {
    if (!isAutoCycling) return;
    const timer = setInterval(() => {
      setActiveCap((prev) => (prev + 1) % capabilities.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [isAutoCycling]);

  // 4. Subtle 3D Card Tilt Interaction on Mouse Move (Desktop Only)
  const handleMouseMove = (e) => {
    if (typeof window !== 'undefined' && window.innerWidth <= 1024) return;
    if (!visualCardRef.current) return;
    const rect = visualCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 4.2;
    const rotateY = (x / rect.width) * 4.2;
    visualCardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!visualCardRef.current) return;
    visualCardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <section
      ref={sectionRef}
      className="sitc-about-section sitc-about-section--white"
      id="about-srtc"
      data-section-name="ABOUT SECTION"
      aria-label="About SRTC Logistics"
    >
      {/* Dynamic Pro-Level Background Architecture */}
      <div className="sitc-about-bg-stage" aria-hidden="true">
        {/* Animated Technical Coordinate Grid */}
        <div className="sitc-about-bg-grid" />

        {/* Floating Luminous Ambient Gradient Orbs */}
        <div className="sitc-about-glow sitc-about-glow--gold" />
        <div className="sitc-about-glow sitc-about-glow--navy" />
        <div className="sitc-about-glow sitc-about-glow--accent" />

        {/* Animated Pan-India Logistics Arterial Corridors (SVG) */}
        <svg
          className="sitc-about-transit-svg"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="corridorGoldFlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E8B94F" stopOpacity="0" />
              <stop offset="25%" stopColor="#E8B94F" stopOpacity="0.3" />
              <stop offset="70%" stopColor="#FFF1A8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#E8B94F" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="corridorNavyFlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B2F4A" stopOpacity="0" />
              <stop offset="50%" stopColor="#07557A" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#0B2F4A" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Artery Arc 1: Priority Industrial Trunk Line */}
          <path
            d="M -60,260 C 380,140 680,390 1500,210"
            stroke="url(#corridorGoldFlow)"
            strokeWidth="2"
            strokeDasharray="10 14"
            className="sitc-transit-flow sitc-transit-flow--primary"
          />

          {/* Artery Arc 2: Maritime Coastal Artery */}
          <path
            d="M 80,-40 C 220,340 760,560 1420,920"
            stroke="url(#corridorNavyFlow)"
            strokeWidth="2.5"
            strokeDasharray="12 18"
            className="sitc-transit-flow sitc-transit-flow--secondary"
          />

          {/* Artery Arc 3: Dynamic Intermodal Cross-Trunk Line */}
          <path
            d="M 200,820 C 580,680 940,320 1520,140"
            stroke="url(#corridorGoldFlow)"
            strokeWidth="1.8"
            strokeDasharray="8 14"
            className="sitc-transit-flow sitc-transit-flow--tertiary"
          />

          {/* Pulsing Logistics Terminal Beacons with Radar Ping Waves */}
          <circle cx="460" cy="245" r="4" fill="#E8B94F" className="sitc-bg-beacon sitc-bg-beacon--1" />
          <circle cx="460" cy="245" r="16" fill="none" stroke="#E8B94F" strokeWidth="1" className="sitc-about-radar-wave" />

          <circle cx="910" cy="370" r="4" fill="#22C55E" className="sitc-bg-beacon sitc-bg-beacon--2" />
          <circle cx="910" cy="370" r="16" fill="none" stroke="#22C55E" strokeWidth="1" className="sitc-about-radar-wave sitc-about-radar-wave--green" />

          <circle cx="1180" cy="250" r="4" fill="#E8B94F" className="sitc-bg-beacon sitc-bg-beacon--3" />
          <circle cx="1180" cy="250" r="16" fill="none" stroke="#E8B94F" strokeWidth="1" className="sitc-about-radar-wave" />
        </svg>

        {/* Ambient Horizontal Laser Horizon */}
        <div className="sitc-about-horizon-laser" />

        {/* Floating Dispatch Watermark */}
        <div className="sitc-about-watermark">
          SRTC CENTRAL FREIGHT DISPATCH // 24/7 FLEET COMMAND // PAN-INDIA EXPRESS CORRIDORS
        </div>
      </div>

      <div className="sitc-about-container">
        {/* ==========================================================================
            1. Section Header Row (Big Bold Editorial Typography + Corporate Narrative)
            ========================================================================== */}
        <header ref={headerRef} className={`sitc-about-header ${isHeaderVisible ? 'is-visible' : ''}`}>
          <div className="sitc-about-header__left">
            <div className="sitc-about-kicker">
              <Truck size={14} className="sitc-about-kicker__icon" />
              <span>{data?.kicker || 'SRTC SUPPLY CHAIN PVT. LTD.'}</span>
            </div>
            <h2 className="sitc-about-title">
              {data?.titleLine1 || 'Legacy of'} <br />
              <span className="sitc-about-title--highlight">{data?.highlightText || 'Reliability,'}</span> Delivering <br />
              {data?.titleLine2 || 'Value Every Single Time.'}
            </h2>
          </div>

          <div className="sitc-about-header__right">
            <p className="sitc-about-desc">
              {data?.description || 'Shree Ram Transportation Corporation, founded in 2003 by Mr. Menandbhai Odedara, has been Gujarat’s trusted transport benchmark for over two decades. Building on this legacy, SRTC Supply Chain Pvt. Ltd. delivers modern, technology-driven, end-to-end logistics & warehousing nationwide.'}
            </p>

            <div className="sitc-about-header__actions">
              <Link href={data?.ctaLink || '/contact'} className="sitc-about-btn-gold">
                <span className="sitc-btn-gold__shimmer" aria-hidden="true" />
                <span className="sitc-btn-gold__text">{data?.ctaText || 'Contact Us'}</span>
                <span className="sitc-about-btn-gold__circle">
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </span>
              </Link>
              <Link href="/services" className="sitc-about-btn-outline">
                <Compass size={14} className="sitc-about-btn-outline__icon" />
                <span>Explore Capabilities</span>
              </Link>
            </div>
          </div>
        </header>

        {/* ==========================================================================
            2. Bento Architecture: Left Sculpted Visual Card + Right Capabilities Grid
            ========================================================================== */}
        <div className="sitc-about-bento">
          {/* ------------------------------------------------------------------
              LEFT COLUMN: Cinematic Sculpted Card with Overlapping Stepped Tabs
              ------------------------------------------------------------------ */}
          <div
            ref={visualCardRef}
            className={`sitc-about-visual-card ${isVisualVisible ? 'is-visible' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Cinematic Truck Image Canvas with Multi-Stop Brand Vignette */}
            <div className="sitc-about-image-canvas">
              <img
                src="/images/about/about-truck-tunnel.jpg"
                alt="SRTC Heavy Duty Transport Truck in High-Speed Transit Corridor"
                className="sitc-about-image"
              />
              <div className="sitc-about-image-overlay" />
            </div>

            {/* Overlapping Sculpted Metric Tabs Docked at Bottom-Right */}
            <div ref={tabsRef} className={`sitc-about-sculpted-dock ${isTabsVisible ? 'is-visible' : ''}`}>
              {/* Card 1: Official Brand Premium Gold (#E8B94F) Stepped Card */}
              <div className="sitc-sculpted-tab sitc-sculpted-tab--gold">
                <div className="sitc-sculpted-tab__notch-cut" />
                <div className="sitc-sculpted-tab__inner">
                  <div className="sitc-sculpted-tab__meta">
                    <span className="sitc-sculpted-tab__label">Industry Experience</span>
                    <TrendingUp size={14} className="sitc-sculpted-tab__icon" />
                  </div>
                  <div className="sitc-sculpted-tab__stat">
                    23+ Years
                  </div>
                  <div className="sitc-sculpted-tab__sub">
                    <strong>Est. 2003</strong> by Menandbhai
                  </div>
                </div>
              </div>

              {/* Card 2: Crisp Pure White (#FFFFFF) Stepped Card with Gold Border */}
              <div className="sitc-sculpted-tab sitc-sculpted-tab--white">
                <div className="sitc-sculpted-tab__notch-cut" />
                <div className="sitc-sculpted-tab__inner">
                  <div className="sitc-sculpted-tab__meta">
                    <span className="sitc-sculpted-tab__label">Pan-India Network</span>
                    <MapPin size={14} className="sitc-sculpted-tab__icon" />
                  </div>
                  <div className="sitc-sculpted-tab__stat">
                    Largest
                  </div>
                  <div className="sitc-sculpted-tab__sub">Privately Owned Fleets</div>
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------
              RIGHT COLUMN: Bespoke Architectural Capabilities Matrix
              ------------------------------------------------------------------ */}
          <div className="sitc-about-details-col">
            {/* Core Capabilities Showcase: Architectural Hairline Matrix */}
            <div
              ref={capabilitiesRef}
              className={`sitc-about-capabilities-card ${isCapabilitiesVisible ? 'is-visible' : ''}`}
              onMouseEnter={() => setIsAutoCycling(false)}
              onMouseLeave={() => setIsAutoCycling(true)}
            >
              <div className="sitc-capabilities-header">
                <h3 className="sitc-capabilities-title">
                  Why Choose Us? <span className="sitc-capabilities-title--gold">Core Capabilities</span> That Deliver
                </h3>
                <span className="sitc-capabilities-badge">Audited Enterprise Standards</span>
              </div>

              <div className="sitc-capabilities-matrix">
                {capabilities.map((cap, idx) => {
                  const isActive = activeCap === idx;
                  return (
                    <div
                      key={cap.id}
                      className={`sitc-cap-row ${isActive ? 'is-active' : ''}`}
                      onClick={() => setActiveCap(idx)}
                    >
                      <div className="sitc-cap-row__main">
                        <span className="sitc-cap-row__num">{cap.id}</span>
                        <div className="sitc-cap-row__content">
                          <span className="sitc-cap-row__title">{cap.title}</span>
                          {isActive && (
                            <p className="sitc-cap-row__detail">{cap.detail}</p>
                          )}
                        </div>
                        <span className="sitc-cap-row__tag">{cap.tag}</span>
                      </div>
                      <div className="sitc-cap-row__line" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Executive Testimonial Anchor: Founder's Vision */}
            <div ref={testimonialRef} className={`sitc-about-testimonial-card ${isTestimonialVisible ? 'is-visible' : ''}`}>
              <div className="sitc-testimonial-header">
                <div className="sitc-testimonial-tag">
                  <Quote size={12} />
                  <span>FOUNDER’S VISION & COMMITMENT</span>
                </div>
              </div>

              <blockquote className="sitc-testimonial-quote">
                “Our vision and dream is to become Gujarat’s foremost and most promising transport service with cutting-edge digital technology, delivering reliability, speed, and value every single time.”
                <footer style={{ marginTop: '0.85rem', fontSize: '0.82rem', fontWeight: 800, color: '#E8B94F', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  — Menand Balubhai Odedara, Founder
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
