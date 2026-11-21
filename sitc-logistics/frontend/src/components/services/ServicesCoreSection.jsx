'use client';

import React from 'react';
import Link from 'next/link';
import {
  Truck,
  Package,
  Warehouse,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import './ServicesCoreSection.css';

const ICON_MAP = {
  Truck,
  Package,
  Warehouse,
  ShieldCheck,
};

// ============================================================================
// 3 CORE SERVICES - 100% BROCHURE ALIGNED (PAGE 3: SERVICES)
// ============================================================================
const DEFAULT_CORE_SERVICES = [
  {
    id: 'ftl',
    badgeText: 'FULL TRUCK LOAD',
    title: 'Full Truck Load (FTL)',
    tagline: 'Dedicated End-to-End Linehaul Deployment',
    image: '/images/services/service-truck-1.jpg',
    icon: 'Truck',
    description:
      'Dedicated point-to-point vehicle deployment engineered for heavy industrial manufacturers, refineries, and petrochemical producers. Consignments are allocated exclusively to single company-owned heavy linehaul vehicles with guaranteed zero mid-route transshipment, ensuring maximum cargo safety and non-stop highway transit across Gujarat and Pan-India corridors.',
    specs: [
      { label: 'Payload Capacity', val: '16 to 42 Metric Tons (GVW)' },
      { label: 'Vehicle Types', val: 'Volvo FM, BharatBenz & Multi-Axle' },
      { label: 'Container Mandate', val: '24ft, 28ft, 32ft High-Cube Steel' },
      { label: 'Transit Security', val: 'AIS-140 GPS & Digital E-Seals' },
    ],
    features: [
      'Dedicated vehicle allocated exclusively to a single consignor',
      'Direct refinery, port & plant evacuation with zero transshipment',
      'Non-stop highway corridor transit with trained commercial pilots',
      'Real-time GPS telematics with 24/7 control room surveillance',
    ],
    ctaText: 'Inquire FTL Fleet',
    ctaHref: '/contact',
    isFeatured: true,
    featuredBadge: 'HIGH CAPACITY',
  },
  {
    id: 'ptl',
    badgeText: 'PART TRUCK LOAD',
    title: 'Part Truck Load (PTL)',
    tagline: 'Consolidated Freight & Superfast Cargo Parcels',
    image: '/images/services/service-truck-2.jpg',
    icon: 'Package',
    description:
      'Cost-optimized consolidated highway logistics engineered for partial consignments, regional commercial distribution, and urgent small packages. Operating on scheduled daily departures across Gujarat and national transport nodes, PTL maximizes volumetric efficiency while delivering express linehaul speed and complete shipment visibility.',
    specs: [
      { label: 'Consignment Size', val: '50 Kg to 12 Metric Tons' },
      { label: 'Departure Schedule', val: 'Daily Fixed Evening Linehaul' },
      { label: 'Consolidation Grid', val: 'Hub & Spoke Network Routing' },
      { label: 'Handling Mandate', val: 'Zero-Damage Stacking & Palletizing' },
    ],
    features: [
      'Economical shared capacity with flexible pay-per-weight pricing',
      'Daily scheduled linehaul departures with strict arrival SLAs',
      'Door-to-door express pickup and last-mile delivery available',
      'Full compliance with highway safety rules and digital e-Way bills',
    ],
    ctaText: 'Book PTL Cargo',
    ctaHref: '/contact',
    isFeatured: false,
    featuredBadge: '',
  },
  {
    id: 'warehousing',
    badgeText: 'WAREHOUSING',
    title: 'Warehousing & Storage',
    tagline: 'Grade-A Strategic Inventory & Distribution Hubs',
    image: '/images/services/service-truck-3.jpg',
    icon: 'Warehouse',
    description:
      'Modern, scalable, technology-driven warehousing and contract logistics facilities strategically positioned along key industrial corridors and port links. We provide climate-controlled staging, automated inventory management, high-density racking, and seamless multi-modal transshipment to eliminate logistics bottlenecks for corporate enterprises.',
    specs: [
      { label: 'Facility Grade', val: 'Grade-A Industrial Warehousing Hubs' },
      { label: 'Handling Equipment', val: 'Hydraulic Docks, Reach Trucks & WMS' },
      { label: 'Security & Access', val: '24/7 High-Definition CCTV & Biometric' },
      { label: 'Contract Models', val: 'Flexible 3PL, Dedicated & Shared Space' },
    ],
    features: [
      'Strategic locations near major state highways, ports & freight corridors',
      'Dedicated cargo handling, sorting, palletizing and cross-docking',
      'Customized inventory staging with digital barcoding and tracking',
      '24/7 operational surveillance with fire suppression compliance',
    ],
    ctaText: 'Inquire Warehouse Space',
    ctaHref: '/contact',
    isFeatured: false,
    featuredBadge: '',
  },
];

export default function ServicesCoreSection({ data }) {
  const kicker = data?.kicker || 'PROPRIETARY, EASY, CONVENIENT';
  const title = data?.title || 'Core Logistics & Warehouse Solutions';
  const description =
    data?.description ||
    'We specialize in FTL (Full Truck Load), PTL (Part Truck Load), small packages, superfast cargo, warehousing, and contract logistics, ensuring reliable and on-time delivery through a strong network and professional team.';
  const rawServices =
    data?.coreServices && data.coreServices.length > 0
      ? data.coreServices
      : DEFAULT_CORE_SERVICES;

  return (
    <section className="srtc-core-services-section" aria-label="Core Logistics Solutions">
      <div className="srtc-core-container">
        {/* Section Header */}
        <div className="srtc-core-header">
          <div className="srtc-core-kicker">
            <Sparkles size={14} className="srtc-core-kicker-icon" />
            <span>{kicker}</span>
          </div>

          <h2 className="srtc-core-title">{title}</h2>

          <p className="srtc-core-subtitle">{description}</p>
        </div>

        {/* 3 Executive Modern Service Cards */}
        <div className="srtc-services-grid">
          {rawServices.map((service, idx) => {
            const fallbackItem = DEFAULT_CORE_SERVICES[idx] || DEFAULT_CORE_SERVICES[0];
            const IconComponent =
              (typeof service.icon === 'string' ? ICON_MAP[service.icon] : service.icon) ||
              ICON_MAP[fallbackItem.icon] ||
              Truck;
            const badgeText =
              service.badgeText ||
              (service.id === 'ftl'
                ? 'FULL TRUCK LOAD'
                : service.id === 'ptl'
                  ? 'PART TRUCK LOAD'
                  : 'WAREHOUSING');
            const tagline = service.tagline || fallbackItem.tagline;
            const description =
              service.description || fallbackItem.description || '';
            const specs =
              service.specs && service.specs.length > 0
                ? service.specs
                : fallbackItem.specs;
            const features =
              service.features && service.features.length > 0
                ? service.features
                : fallbackItem.features;
            const ctaText = service.ctaText || fallbackItem.ctaText || 'Inquire Service';
            const ctaHref = service.ctaHref || fallbackItem.ctaHref || '/contact';
            const isFeatured = service.isFeatured ?? fallbackItem.isFeatured;

            return (
              <article
                key={service.id || idx}
                className={`srtc-service-card ${isFeatured ? 'srtc-service-card--featured' : ''}`}
              >
                {/* 1. Header Pill: Official Brochure Badge */}
                <div className="srtc-service-card-top">
                  <div className="srtc-service-pill">
                    <div className="srtc-service-pill-icon">
                      <IconComponent size={18} strokeWidth={2.2} />
                    </div>
                    <span className="srtc-service-pill-text">{badgeText}</span>
                  </div>
                  {isFeatured && (
                    <span className="srtc-service-featured-pill">
                      <Sparkles size={12} className="srtc-service-sparkle" />
                      {service.featuredBadge || fallbackItem.featuredBadge || 'FEATURED'}
                    </span>
                  )}
                </div>

                {/* 2. Cinematic Image Box */}
                <div className="srtc-service-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image || fallbackItem.image}
                    alt={service.title}
                    className="srtc-service-img"
                    loading="lazy"
                  />
                  <div className="srtc-service-img-overlay" />
                </div>

                {/* 3. Card Body: Title, Tagline & Detailed Content */}
                <div className="srtc-service-card-body">
                  <h3 className="srtc-service-title">{service.title}</h3>
                  <span className="srtc-service-tagline">{tagline}</span>

                  <p className="srtc-service-desc">{description}</p>

                  {/* 4. Structured Technical Specifications Grid */}
                  <div className="srtc-service-specs-grid">
                    {specs.map((item, sIdx) => (
                      <div key={sIdx} className="srtc-service-spec-tile">
                        <span className="srtc-service-spec-label">{item.label}</span>
                        <strong className="srtc-service-spec-val">{item.val}</strong>
                      </div>
                    ))}
                  </div>

                  {/* 5. Key Operational Capabilities Checklist */}
                  <ul className="srtc-service-features-list">
                    {features.map((feat, fIdx) => (
                      <li key={fIdx} className="srtc-service-feature-item">
                        <CheckCircle2 size={15} className="srtc-service-check-icon" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 6. Card Footer: Direct CTA Button */}
                <div className="srtc-service-card-footer">
                  <Link href={ctaHref} className="srtc-service-cta-btn">
                    <span>{ctaText}</span>
                    <ArrowRight size={15} className="srtc-service-btn-arrow" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
