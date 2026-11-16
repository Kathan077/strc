'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Truck, Gauge, Warehouse, Thermometer, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import './ServicesSection.css';

export default function ServicesSection() {
  const [revealed, setRevealed] = useState({
    'services-header': true,
    'truck-1': true,
    'truck-2': true,
    'truck-3': true,
    'container-1': true,
    'container-2': true,
    'container-3': true,
    'container-4': true,
    'container-5': true,
    'container-6': true,
  });

  useEffect(() => {
    // On mobile / tablet viewports, ensure all elements are immediately revealed
    if (typeof window !== 'undefined' && window.innerWidth < 1025) {
      setRevealed({
        'services-header': true,
        'truck-1': true,
        'truck-2': true,
        'truck-3': true,
        'container-1': true,
        'container-2': true,
        'container-3': true,
        'container-4': true,
        'container-5': true,
        'container-6': true,
      });
      return;
    }

    // On large desktop screens, enable staggered scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-reveal-id');
            if (id) {
              setRevealed((prev) => ({ ...prev, [id]: true }));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '60px 0px 60px 0px',
      }
    );

    const elements = document.querySelectorAll('#services-section [data-reveal-id]');
    elements.forEach((el) => {
      observer.observe(el);
    });

    // Safety fallback: ensure all items are revealed within 1s
    const timer = setTimeout(() => {
      setRevealed({
        'services-header': true,
        'truck-1': true,
        'truck-2': true,
        'truck-3': true,
        'container-1': true,
        'container-2': true,
        'container-3': true,
        'container-4': true,
        'container-5': true,
        'container-6': true,
      });
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      id="services-section"
      data-section-name="SERVICES SECTION"
      className="sitc-services-section"
      aria-label="Custom Logistics Solutions for Your Business"
    >
      {/* ===================================================================
          PREMIUM BACKGROUND STAGE: Precision Grid, Glowing Orbs & Flow Lines
          =================================================================== */}
      <div className="sitc-services-bg-stage" aria-hidden="true">
        {/* Animated Coordinate Precision Grid */}
        <div className="sitc-services-bg-grid" />

        {/* Luminous Ambient Gradient Floating Orbs */}
        <div className="sitc-services-glow sitc-services-glow--gold" />
        <div className="sitc-services-glow sitc-services-glow--navy" />
        <div className="sitc-services-glow sitc-services-glow--cyan" />

        {/* Animated Pan-India Logistics Arterial Flow Corridors (SVG) */}
        <svg
          className="sitc-services-transit-svg"
          viewBox="0 0 1600 1000"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="svcGoldFlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E8B94F" stopOpacity="0" />
              <stop offset="30%" stopColor="#E8B94F" stopOpacity="0.32" />
              <stop offset="70%" stopColor="#FFF1A8" stopOpacity="0.48" />
              <stop offset="100%" stopColor="#E8B94F" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="svcNavyFlow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B2F4A" stopOpacity="0" />
              <stop offset="40%" stopColor="#07557A" stopOpacity="0.22" />
              <stop offset="80%" stopColor="#0B2F4A" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0B2F4A" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Artery Corridor 1: Cross-Nation Express Trunk */}
          <path
            d="M -80,280 C 420,120 780,480 1680,240"
            stroke="url(#svcGoldFlow)"
            strokeWidth="2.2"
            strokeDasharray="12 16"
            className="sitc-svc-transit-flow sitc-svc-transit-flow--1"
          />

          {/* Artery Corridor 2: Coastal Maritime Evacuation Arc */}
          <path
            d="M 60,-60 C 240,420 840,640 1640,960"
            stroke="url(#svcNavyFlow)"
            strokeWidth="2"
            strokeDasharray="14 20"
            className="sitc-svc-transit-flow sitc-svc-transit-flow--2"
          />

          {/* Waypoint Radar Beacon 1: Western Industrial Hub */}
          <circle cx="520" cy="225" r="4.5" fill="#E8B94F" className="sitc-svc-beacon" />
          <circle cx="520" cy="225" r="16" fill="none" stroke="#E8B94F" strokeWidth="1" className="sitc-svc-radar-ring" />

          {/* Waypoint Radar Beacon 2: Central Hub */}
          <circle cx="1040" cy="410" r="4.5" fill="#07557A" className="sitc-svc-beacon sitc-svc-beacon--cyan" />
          <circle cx="1040" cy="410" r="16" fill="none" stroke="#07557A" strokeWidth="1" className="sitc-svc-radar-ring" />

          {/* Waypoint Radar Beacon 3: Port Evacuation Node */}
          <circle cx="1380" cy="280" r="4.5" fill="#E8B94F" className="sitc-svc-beacon" />
          <circle cx="1380" cy="280" r="16" fill="none" stroke="#E8B94F" strokeWidth="1" className="sitc-svc-radar-ring" />
        </svg>

        {/* Floating Telemetry Coordinates Watermark */}
        <div className="sitc-services-watermark">
          SRTC FLEET TELEMETRY // 180+ PAN-INDIA CORRIDORS // ISO 9001:2015 CERTIFIED
        </div>
      </div>

      <div className="sitc-services-container">
        {/* ===================================================================
            HEADER: Reference Layout with Scroll Reveal
            =================================================================== */}
        <header
          data-reveal-id="services-header"
          className={`sitc-services-header ${revealed['services-header'] ? 'is-revealed' : ''}`}
        >
          <div className="sitc-services-header__left">
            <div className="sitc-services-kicker-capsule">
              <Truck size={14} className="sitc-services-kicker__icon" />
              <span className="sitc-services-kicker__text">SRTC Supply Chain Services</span>
              <span className="sitc-services-kicker__shimmer" aria-hidden="true" />
            </div>

            <h2 className="sitc-services-title">
              Logistics & Warehouse<br />
              <span className="sitc-services-title--highlight">Handling Services</span>
            </h2>
          </div>

          <div className="sitc-services-header__right">
            <p className="sitc-services-desc">
              Proprietary, Easy, Convenient. Tailored logistics solutions driven by our commitment to deliver reliability, speed, and value every single time.
            </p>
          </div>
        </header>

        {/* ===================================================================
            ROW 1: 3 SIGNATURE TRUCK CARDS (Same-to-Same Layout with Sculpted Shapes)
            Staggered Scroll Entrance Animations
            =================================================================== */}
        <div className="sitc-services-cards-grid">
          {/* CARD 1: Text on Top, Sculpted Truck Image on Bottom */}
          <article
            data-reveal-id="truck-1"
            className={`sitc-svc-card sitc-svc-card--text-top sitc-reveal-card sitc-reveal-card--1 ${
              revealed['truck-1'] ? 'is-revealed' : ''
            }`}
          >
            <div className="sitc-svc-card__text-block">
              <h3 className="sitc-svc-card__title">Full Truck Load (FTL)</h3>
              <p className="sitc-svc-card__subtitle">
                Dedicated point-to-point fleet deployment for heavy, bulk, and industrial cargo across Gujarat and nationwide corridors.
              </p>
            </div>

            <div className="sitc-svc-card__img-frame sitc-svc-card__img-frame--bottom-sculpt">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/services/service-truck-1.jpg"
                alt="Full Truckload FTL Logistics Fleet"
                className="sitc-svc-card__img"
                loading="lazy"
              />
            </div>
          </article>

          {/* CARD 2: Full-Bleed Dark Cinematic Truck Card with Text on Bottom */}
          <article
            data-reveal-id="truck-2"
            className={`sitc-svc-card sitc-svc-card--full-bleed sitc-reveal-card sitc-reveal-card--2 ${
              revealed['truck-2'] ? 'is-revealed' : ''
            }`}
          >
            <div className="sitc-svc-card__bg-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/services/service-truck-2.jpg"
                alt="Express Cargo and JIT Linehaul Truck"
                className="sitc-svc-card__img"
                loading="lazy"
              />
              <div className="sitc-svc-card__gradient-overlay" />
            </div>

            <div className="sitc-svc-card__overlay-text-block">
              <h3 className="sitc-svc-card__title sitc-svc-card__title--white">Part Truck Load (PTL) & Superfast Cargo</h3>
              <p className="sitc-svc-card__subtitle sitc-svc-card__subtitle--white">
                Cost-effective consolidated transit for partial truck loads and urgent small packages with reliable, guaranteed on-time delivery.
              </p>
            </div>
          </article>

          {/* CARD 3: Sculpted Truck Image on Top, Text on Bottom */}
          <article
            data-reveal-id="truck-3"
            className={`sitc-svc-card sitc-svc-card--text-bottom sitc-reveal-card sitc-reveal-card--3 ${
              revealed['truck-3'] ? 'is-revealed' : ''
            }`}
          >
            <div className="sitc-svc-card__img-frame sitc-svc-card__img-frame--top-sculpt">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/services/service-truck-3.jpg"
                alt="Heavy and Project Ground Freight"
                className="sitc-svc-card__img"
                loading="lazy"
              />
            </div>

            <div className="sitc-svc-card__text-block sitc-svc-card__text-block--bottom">
              <h3 className="sitc-svc-card__title">Warehousing & Handling Services</h3>
              <p className="sitc-svc-card__subtitle">
                Scalable modern storage facilities, contract logistics, and inventory management designed for corporates and manufacturing hubs.
              </p>
            </div>
          </article>
        </div>

        {/* ===================================================================
            ROWS 2 & 3: 6 INDUSTRIAL SHIPPING CONTAINER TRUCK CARDS (Style 2)
            Independent Staggered Scroll Entrance Reveal per Card
            =================================================================== */}
        <div className="sitc-container-cards-grid">
          {/* CONTAINER CARD 1: Polymers & Petrochemicals */}
          <article
            data-reveal-id="container-1"
            className={`sitc-container-card sitc-reveal-container sitc-reveal-container--1 ${
              revealed['container-1'] ? 'is-revealed' : ''
            }`}
          >
            <span className="sitc-casting sitc-casting--tl" aria-hidden="true" />
            <span className="sitc-casting sitc-casting--tr" aria-hidden="true" />
            <span className="sitc-casting sitc-casting--bl" aria-hidden="true" />
            <span className="sitc-casting sitc-casting--br" aria-hidden="true" />

            <div className="sitc-container-card__top">
              <div className="sitc-container-card__icon-wrap">
                <Truck size={19} className="sitc-container-card__icon" />
              </div>
              <span className="sitc-container-serial">SRTC-32FT-POLYMERS</span>
            </div>

            <div className="sitc-container-card__body">
              <h4 className="sitc-container-card__title">Polymers & Petrochemicals</h4>
              <p className="sitc-container-card__desc">
                High-capacity bulk container transport engineered for polymer pellets, resins, and specialized industrial petrochemical supply chains.
              </p>
            </div>

            <div className="sitc-container-card__bottom">
              <span className="sitc-container-spec-tag">CLIENTS: IOCL / RELIANCE / OPAL</span>
              <Link href="/services" className="sitc-container-card__link">
                <span>EXPLORE SYSTEM SPEC</span>
                <span className="sitc-container-card__arrow">→</span>
              </Link>
            </div>
          </article>

          {/* CONTAINER CARD 2: Food & Beverages Linehaul (Featured Center) */}
          <article
            data-reveal-id="container-2"
            className={`sitc-container-card sitc-container-card--featured sitc-reveal-container sitc-reveal-container--2 ${
              revealed['container-2'] ? 'is-revealed' : ''
            }`}
          >
            <span className="sitc-casting sitc-casting--tl" aria-hidden="true" />
            <span className="sitc-casting sitc-casting--tr" aria-hidden="true" />
            <span className="sitc-casting sitc-casting--bl" aria-hidden="true" />
            <span className="sitc-casting sitc-casting--br" aria-hidden="true" />

            <div className="sitc-container-card__top">
              <div className="sitc-container-card__icon-wrap sitc-container-card__icon-wrap--gold">
                <Gauge size={19} className="sitc-container-card__icon" />
              </div>
              <span className="sitc-container-serial sitc-container-serial--featured">SRTC-40HC-AGRO-FOOD</span>
            </div>

            <div className="sitc-container-card__body">
              <h4 className="sitc-container-card__title">Food & Beverages Linehaul</h4>
              <p className="sitc-container-card__desc">
                Hygiene-compliant, sealed transportation for premium staples, flour mills, packaged foods, and FMCG agro-distribution networks.
              </p>
            </div>

            <div className="sitc-container-card__bottom">
              <span className="sitc-container-spec-tag">CLIENTS: GAAY CHHAP BESAN</span>
              <Link href="/services" className="sitc-container-card__link">
                <span>EXPLORE SYSTEM SPEC</span>
                <span className="sitc-container-card__arrow">→</span>
              </Link>
            </div>
          </article>

          {/* CONTAINER CARD 3: Pharmaceuticals & Healthcare */}
          <article
            data-reveal-id="container-3"
            className={`sitc-container-card sitc-reveal-container sitc-reveal-container--3 ${
              revealed['container-3'] ? 'is-revealed' : ''
            }`}
          >
            <span className="sitc-casting sitc-casting--tl" aria-hidden="true" />
            <span className="sitc-casting sitc-casting--tr" aria-hidden="true" />
            <span className="sitc-casting sitc-casting--bl" aria-hidden="true" />
            <span className="sitc-casting sitc-casting--br" aria-hidden="true" />

            <div className="sitc-container-card__top">
              <div className="sitc-container-card__icon-wrap">
                <Thermometer size={19} className="sitc-container-card__icon" />
              </div>
              <span className="sitc-container-serial">SRTC-REEFER-PHARMA</span>
            </div>

            <div className="sitc-container-card__body">
              <h4 className="sitc-container-card__title">Pharmaceuticals & Healthcare</h4>
              <p className="sitc-container-card__desc">
                Sensitive, time-critical cargo movement for active pharma ingredients, healthcare products, and precision life-sciences consignments.
              </p>
            </div>

            <div className="sitc-container-card__bottom">
              <span className="sitc-container-spec-tag">PROTECTION: TEMP-CONTROLLED</span>
              <Link href="/services" className="sitc-container-card__link">
                <span>EXPLORE SYSTEM SPEC</span>
                <span className="sitc-container-card__arrow">→</span>
              </Link>
            </div>
          </article>

          {/* CONTAINER CARD 4: Industrial & Heavy Machinery */}
          <article
            data-reveal-id="container-4"
            className={`sitc-container-card sitc-reveal-container sitc-reveal-container--4 ${
              revealed['container-4'] ? 'is-revealed' : ''
            }`}
          >
            <span className="sitc-casting sitc-casting--tl" aria-hidden="true" />
            <span className="sitc-casting sitc-casting--tr" aria-hidden="true" />
            <span className="sitc-casting sitc-casting--bl" aria-hidden="true" />
            <span className="sitc-casting sitc-casting--br" aria-hidden="true" />

            <div className="sitc-container-card__top">
              <div className="sitc-container-card__icon-wrap">
                <ShieldCheck size={19} className="sitc-container-card__icon" />
              </div>
              <span className="sitc-container-serial">SRTC-HEAVY-INDUSTRIAL</span>
            </div>

            <div className="sitc-container-card__body">
              <h4 className="sitc-container-card__title">Industrial & Heavy Machinery</h4>
              <p className="sitc-container-card__desc">
                Dedicated multi-axle freight movement for industrial machinery, manufacturing plants, and heavy engineering components.
              </p>
            </div>

            <div className="sitc-container-card__bottom">
              <span className="sitc-container-spec-tag">HAULAGE: PLANT-TO-PLANT</span>
              <Link href="/services" className="sitc-container-card__link">
                <span>EXPLORE SYSTEM SPEC</span>
                <span className="sitc-container-card__arrow">→</span>
              </Link>
            </div>
          </article>

          {/* CONTAINER CARD 5: D2C & B2B Cargo Distribution */}
          <article
            data-reveal-id="container-5"
            className={`sitc-container-card sitc-reveal-container sitc-reveal-container--5 ${
              revealed['container-5'] ? 'is-revealed' : ''
            }`}
          >
            <span className="sitc-casting sitc-casting--tl" aria-hidden="true" />
            <span className="sitc-casting sitc-casting--tr" aria-hidden="true" />
            <span className="sitc-casting sitc-casting--bl" aria-hidden="true" />
            <span className="sitc-casting sitc-casting--br" aria-hidden="true" />

            <div className="sitc-container-card__top">
              <div className="sitc-container-card__icon-wrap">
                <Zap size={19} className="sitc-container-card__icon" />
              </div>
              <span className="sitc-container-serial">SRTC-EXPRESS-D2C</span>
            </div>

            <div className="sitc-container-card__body">
              <h4 className="sitc-container-card__title">D2C & B2B Cargo Distribution</h4>
              <p className="sitc-container-card__desc">
                End-to-end commercial parcel distribution, regional distribution center (RDC) transfers, and scheduled retail dispatches.
              </p>
            </div>

            <div className="sitc-container-card__bottom">
              <span className="sitc-container-spec-tag">TRANSIT: HIGH-VELOCITY NETWORK</span>
              <Link href="/services" className="sitc-container-card__link">
                <span>EXPLORE SYSTEM SPEC</span>
                <span className="sitc-container-card__arrow">→</span>
              </Link>
            </div>
          </article>

          {/* CONTAINER CARD 6: Contract Logistics & Dedicated Fleet */}
          <article
            data-reveal-id="container-6"
            className={`sitc-container-card sitc-reveal-container sitc-reveal-container--6 ${
              revealed['container-6'] ? 'is-revealed' : ''
            }`}
          >
            <span className="sitc-casting sitc-casting--tl" aria-hidden="true" />
            <span className="sitc-casting sitc-casting--tr" aria-hidden="true" />
            <span className="sitc-casting sitc-casting--bl" aria-hidden="true" />
            <span className="sitc-casting sitc-casting--br" aria-hidden="true" />

            <div className="sitc-container-card__top">
              <div className="sitc-container-card__icon-wrap">
                <Warehouse size={19} className="sitc-container-card__icon" />
              </div>
              <span className="sitc-container-serial">SRTC-CONTRACT-FLEET</span>
            </div>

            <div className="sitc-container-card__body">
              <h4 className="sitc-container-card__title">Contract Logistics & Dedicated Fleet</h4>
              <p className="sitc-container-card__desc">
                Customized long-term supply chain partnerships, dedicated fleet allocation, and end-to-end logistics management nationwide.
              </p>
            </div>

            <div className="sitc-container-card__bottom">
              <span className="sitc-container-spec-tag">SOLUTIONS: ENTERPRISE CONTRACT</span>
              <Link href="/services" className="sitc-container-card__link">
                <span>EXPLORE SYSTEM SPEC</span>
                <span className="sitc-container-card__arrow">→</span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
