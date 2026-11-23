'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Truck,
  Package,
  Warehouse,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import './ServicesCoreSection.css';

const ICON_MAP = {
  Truck,
  Package,
  Warehouse,
  ShieldCheck,
};

// 3 Core Services — 100% Brochure Aligned (Page 3: Services)
// Pure authentic content, sequential scroll-driven card replacement
const CORE_SERVICES = [
  {
    step: 1,
    id: 'ftl',
    serviceIndex: '01',
    category: 'Dedicated Transport',
    title: 'Full Truck Load (FTL)',
    tagline: 'Dedicated point-to-point road freight with zero mid-route transshipment',
    description:
      'Our Full Truck Load service provides dedicated vehicle deployment for heavy industrial manufacturers, refineries, and commercial enterprises. Consignments are allocated exclusively to single company-managed vehicles from origin to destination, ensuring your cargo remains untouched, fully secured, and delivered on strict highway transit schedules across Gujarat and national corridors.',
    image: '/images/services/service-truck-1.jpg',
    imageAlt: 'SRTC Dedicated Full Truck Load (FTL) Freight Transport',
    icon: Truck,
    specs: [
      { label: 'Payload Capacity', val: '16 to 42 Metric Tons (GVW)' },
      { label: 'Vehicle Types', val: 'Multi-Axle Trailers, Volvo FM & Heavy Haulers' },
      { label: 'Container Standards', val: '24ft, 28ft, 32ft High-Cube Steel Containers' },
      { label: 'Transit Security', val: '24/7 GPS Tracking & High-Security E-Seals' },
    ],
    features: [
      'Dedicated vehicle allocated exclusively to a single corporate consignor',
      'Direct plant-to-warehouse transit with zero transshipment guarantee',
      'Comprehensive transit marine insurance coverage on every shipment',
      'Trained commercial drivers with 24/7 central control room monitoring',
    ],
    ctaText: 'Inquire FTL Fleet',
    ctaHref: '/contact',
  },
  {
    step: 2,
    id: 'ptl',
    serviceIndex: '02',
    category: 'Consolidated Freight',
    title: 'Part Truck Load (PTL) & Superfast Cargo',
    tagline: 'Scheduled daily departures for partial consignments and express parcels',
    description:
      'Part Truck Load provides cost-effective highway logistics for shipments that do not require an entire vehicle. Operating on fixed daily departure schedules across regional transit centers, our PTL network combines volumetric cargo efficiency with express transit speed, reliable handling, and transparent pay-per-weight pricing for commercial distribution.',
    image: '/images/services/service-truck-2.jpg',
    imageAlt: 'SRTC Part Truck Load and Express Cargo Logistics',
    icon: Package,
    specs: [
      { label: 'Consignment Range', val: '50 Kg to 12 Metric Tons' },
      { label: 'Departure Schedule', val: 'Daily Fixed Evening Linehaul' },
      { label: 'Network Coverage', val: '28+ Hub and Spoke Regional Centers' },
      { label: 'Handling Mandate', val: 'Palletized Staging & Zero-Damage Stacking' },
    ],
    features: [
      'Economical shared capacity with transparent pay-per-weight pricing',
      'Daily scheduled linehaul departures with committed delivery windows',
      'Doorstep pickup and verified last-mile delivery available',
      'Full compliance with highway safety standards and digital e-Way bills',
    ],
    ctaText: 'Book PTL Cargo',
    ctaHref: '/contact',
  },
  {
    step: 3,
    id: 'warehousing',
    serviceIndex: '03',
    category: 'Contract Storage',
    title: 'Warehousing & Storage Handling Services',
    tagline: 'Modern Grade-A storage facilities along major industrial corridors and ports',
    description:
      'Our warehousing and contract logistics facilities are strategically positioned near major industrial belts, state highways, and ports such as Mundra and Kandla. We provide secure staging, automated inventory tracking, heavy-duty racking, and cross-docking to eliminate supply chain bottlenecks, supporting raw material infeed and finished goods distribution.',
    image: '/images/services/service-truck-3.jpg',
    imageAlt: 'SRTC Modern Industrial Warehouse and Contract Storage Facilities',
    icon: Warehouse,
    specs: [
      { label: 'Facility Grade', val: 'Grade-A Industrial Warehousing Hubs' },
      { label: 'Handling Equipment', val: 'Hydraulic Dock Levelers & Reach Trucks' },
      { label: 'Security & Safety', val: '24/7 HD CCTV & Fire Suppression Compliance' },
      { label: 'Contract Models', val: 'Flexible 3PL, Dedicated & Shared Storage' },
    ],
    features: [
      'Strategic locations near major state highways, ports, and transit nodes',
      'Dedicated cargo handling, sorting, palletizing, and cross-docking',
      'Customized inventory staging with digital barcoding and lot tracking',
      'Climate-buffered staging for sensitive consumer goods and chemicals',
    ],
    ctaText: 'Inquire Warehouse Storage',
    ctaHref: '/contact',
  },
];

export default function ServicesCoreSection({ data }) {
  const sectionRef = useRef(null);
  const [activeStage, setActiveStage] = useState(1); // 1, 2, or 3
  const [isDesktop, setIsDesktop] = useState(true);

  const title = data?.title || 'Core Logistics & Warehouse Solutions';

  // Dynamic services array directly sourced from Admin CMS / MongoDB
  const dynamicServices =
    data?.coreServices && data.coreServices.length > 0
      ? data.coreServices.map((service, idx) => {
          const fallback = CORE_SERVICES[idx] || {};
          const IconComponent =
            (typeof service.icon === 'string' ? ICON_MAP[service.icon] : service.icon) ||
            fallback.icon ||
            Truck;
          return {
            step: idx + 1,
            id: service.id || fallback.id || `service-${idx + 1}`,
            serviceIndex: String(idx + 1).padStart(2, '0'),
            category:
              service.category ||
              fallback.category ||
              (idx === 0
                ? 'Dedicated Transport'
                : idx === 1
                ? 'Consolidated Freight'
                : 'Contract Storage'),
            title: service.title || fallback.title || '',
            tagline:
              service.tagline ||
              fallback.tagline ||
              (service.description ? service.description.slice(0, 80) + '...' : ''),
            description: service.description || fallback.description || '',
            image: service.image || fallback.image || '',
            imageAlt: service.title || fallback.imageAlt || 'SRTC Dedicated Freight Transport',
            icon: IconComponent,
            specs:
              service.specs && service.specs.length > 0 ? service.specs : fallback.specs || [],
            features:
              service.features && service.features.length > 0
                ? service.features
                : fallback.features || [],
            ctaText: service.ctaText || fallback.ctaText || 'Inquire Fleet',
            ctaHref: service.ctaHref || fallback.ctaHref || '/contact',
          };
        })
      : CORE_SERVICES;

  // Detect desktop vs mobile viewport
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1025);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sticky scroll-pinned tracking
  useEffect(() => {
    if (!isDesktop) return;

    let rafId = null;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const trackHeight = sectionRef.current.offsetHeight - window.innerHeight;

      if (trackHeight <= 0) return;

      // Progress from 0.0 to 1.0 through the 280vh track
      const progress = Math.min(1, Math.max(0, -rect.top / trackHeight));

      if (progress < 0.35) {
        setActiveStage(1);
      } else if (progress < 0.7) {
        setActiveStage(2);
      } else {
        setActiveStage(3);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isDesktop]);

  return (
    <section
      className="srtc-core-scroll-section"
      id="core-logistics-solutions"
      ref={sectionRef}
      aria-label="Core Logistics and Warehouse Solutions"
    >
      {/* Sticky Viewport Stage (Desktop pins until all 3 cards are shown) */}
      <div className="srtc-core-sticky-viewport">
        <div className="srtc-core-inner-container">
          {/* ===================================================================
              1. Compact Executive Top Header (Clean & Minimal)
              =================================================================== */}
          <header className="srtc-core-top-nav-bar">
            <div className="srtc-top-nav-left">
              <h2 className="srtc-top-main-title">{title}</h2>
            </div>
          </header>

          {/* ===================================================================
              2. Perfectly Centered Card Stacking Deck Stage:
                 - Expanded width (1420px max)
                 - Fits comfortably within 100vh on any desktop/laptop
                 - Zero clipping at top and bottom
              =================================================================== */}
          <div className="srtc-cards-stack-deck">
            {dynamicServices.map((service) => {
              const ServiceIcon = service.icon;
              const isCurrent = activeStage === service.step;
              const isPassed = activeStage > service.step;
              const isUpcoming = activeStage < service.step;

              let cardStateClass = 'is-active';
              if (isDesktop) {
                if (isCurrent) cardStateClass = 'is-active';
                else if (isPassed) cardStateClass = 'is-passed';
                else if (isUpcoming) cardStateClass = 'is-upcoming';
              }

              return (
                <article
                  key={service.id}
                  id={service.id}
                  className={`srtc-stack-card ${cardStateClass}`}
                  data-step={service.step}
                >
                  {/* Left Column: Pure Photography (Natural, Zero Text Overlay) */}
                  <div className="srtc-stack-image-col">
                    <div className="srtc-stack-image-frame">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.image}
                        alt={service.imageAlt}
                        className="srtc-stack-pure-img"
                        loading={service.step === 1 ? 'eager' : 'lazy'}
                        fetchPriority={service.step === 1 ? 'high' : 'auto'}
                      />
                    </div>
                  </div>

                  {/* Right Column: Pure Content & Technical Specs */}
                  <div className="srtc-stack-content-col">
                    {/* Meta Row */}
                    <div className="srtc-stack-meta-row">
                      <div className="srtc-stack-icon-box">
                        <ServiceIcon size={16} strokeWidth={2.2} />
                      </div>
                      <span className="srtc-stack-category">{service.category}</span>
                      <span className="srtc-stack-counter">
                        Service {service.serviceIndex} of 03
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="srtc-stack-title">{service.title}</h3>
                    <p className="srtc-stack-tagline">{service.tagline}</p>

                    {/* Description Paragraph */}
                    <p className="srtc-stack-desc">{service.description}</p>

                    {/* 4-Tile Technical Specifications Matrix */}
                    <div className="srtc-stack-specs-box">
                      <div className="srtc-stack-specs-grid">
                        {service.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="srtc-stack-spec-tile">
                            <span className="srtc-stack-spec-lbl">{spec.label}</span>
                            <strong className="srtc-stack-spec-val">{spec.val}</strong>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Features & Mandates */}
                    <ul className="srtc-stack-features-list">
                      {service.features.map((feat, fIdx) => (
                        <li key={fIdx} className="srtc-stack-feature-item">
                          <CheckCircle2 size={14} className="srtc-stack-check-icon" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Row */}
                    <div className="srtc-stack-action-row">
                      <Link href={service.ctaHref} className="srtc-stack-cta-btn">
                        <span>{service.ctaText}</span>
                        <ArrowRight size={14} className="srtc-stack-btn-arrow" />
                      </Link>

                      <div className="srtc-stack-guarantee-note">
                        <ShieldCheck size={14} className="srtc-stack-shield-icon" />
                        <span>100% Insured & GPS Telematics Tracked</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom subtle indicator */}
          <div className="srtc-stack-scroll-hint">
            <span>Scroll to explore all 3 services • {activeStage} of 3</span>
          </div>
        </div>
      </div>
    </section>
  );
}
