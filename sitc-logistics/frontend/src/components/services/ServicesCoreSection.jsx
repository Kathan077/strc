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
  Boxes,
  Radio,
  Clock,
  Layers,
} from 'lucide-react';
import './ServicesCoreSection.css';

const ICON_MAP = {
  Truck,
  Package,
  Warehouse,
  ShieldCheck,
  Boxes,
  Layers,
  Clock,
  Radio,
};

export default function ServicesCoreSection({ data }) {
  const coreServices = data?.coreServices || [];
  const kicker = data?.kicker || 'CORE FREIGHT SOLUTIONS // BROCHURE SPECIFICATION';
  const title = data?.title || 'Core Transportation & Warehouse Solutions';
  const desc =
    data?.description ||
    'Tailored logistics solutions driven by our commitment to deliver reliability, speed, and enterprise value every single time. Direct industrial corridors across Gujarat and nationwide linehaul networks.';

  return (
    <section className="srtc-core-services-section" aria-label="Core Freight Services">
      <div className="srtc-core-container">
        {/* Section Header */}
        <div className="srtc-core-header">
          <div className="srtc-core-kicker">
            <Boxes size={14} className="srtc-core-kicker-icon" />
            <span>{kicker}</span>
          </div>

          <h2 className="srtc-core-title">{title}</h2>

          <p className="srtc-core-subtitle">{desc}</p>
        </div>

        {/* 3 Bespoke Intermodal Freight Pod Cards */}
        <div className="srtc-freight-pods-grid">
          {coreServices.map((service) => {
            const Icon = (typeof service.icon === 'string' ? ICON_MAP[service.icon] : service.icon) || Truck;
            return (
              <article
                key={service.id}
                className={`srtc-freight-pod ${service.isFeatured ? 'srtc-freight-pod--featured' : ''}`}
              >
                {/* 4 Authentic Industrial Corner Castings */}
                <span className="srtc-pod-casting srtc-pod-casting--tl" aria-hidden="true" />
                <span className="srtc-pod-casting srtc-pod-casting--tr" aria-hidden="true" />
                <span className="srtc-pod-casting srtc-pod-casting--bl" aria-hidden="true" />
                <span className="srtc-pod-casting srtc-pod-casting--br" aria-hidden="true" />

                {/* Featured Badge if applicable */}
                {service.isFeatured && (
                  <div className="srtc-pod-featured-ribbon">
                    <span>{service.featuredBadge}</span>
                  </div>
                )}

                {/* 1. Pod Top Stencil Console Header */}
                <div className="srtc-pod-console-header">
                  <div className="srtc-pod-stencil-badge">
                    <span className="srtc-pod-unit-code">{service.unitCode}</span>
                    <span className="srtc-pod-unit-sep">/</span>
                    <span className="srtc-pod-unit-type">{service.unitType}</span>
                  </div>

                  <div className="srtc-pod-status-pill">
                    <span className="srtc-pod-live-dot" />
                    <span>{service.statusTag}</span>
                  </div>
                </div>

                {/* 2. Visual Viewport: Truck & Cargo Bay */}
                <div className="srtc-pod-viewport">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="srtc-pod-img"
                    loading="lazy"
                  />
                  <div className="srtc-pod-viewport-overlay" />

                  {/* Corner Capacity Metric Stamp */}
                  <div className="srtc-pod-capacity-stamp">
                    <span className="srtc-pod-stamp-val">{service.metricBadge}</span>
                  </div>

                  {/* Left Bottom Floating Icon Badge */}
                  <div className="srtc-pod-icon-floating">
                    <Icon size={20} />
                  </div>
                </div>

                {/* 3. Pod Content Body */}
                <div className="srtc-pod-body">
                  <span className="srtc-pod-category">{service.category}</span>
                  <h3 className="srtc-pod-title">{service.title}</h3>
                  <p className="srtc-pod-desc">{service.description}</p>

                  {/* Structured 2x2 Technical Manifest Spec Grid */}
                  <div className="srtc-pod-specs-grid">
                    {service.specs.map((item, idx) => (
                      <div key={idx} className="srtc-pod-spec-tile">
                        <span className="srtc-pod-spec-label">{item.label}</span>
                        <span className="srtc-pod-spec-value">{item.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Clean Feature Capabilities */}
                  <ul className="srtc-pod-features-list">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="srtc-pod-feature-item">
                        <CheckCircle2 size={15} className="srtc-pod-check-icon" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. Heavy Commercial Chassis Base Bar & Action Button */}
                <div className="srtc-pod-chassis-bar">
                  <Link href={service.ctaHref} className="srtc-pod-cta-btn">
                    <span>{service.ctaText}</span>
                    <ArrowRight size={15} className="srtc-pod-btn-arrow" />
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
