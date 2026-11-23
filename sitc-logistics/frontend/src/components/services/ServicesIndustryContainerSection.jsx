'use client';

import React from 'react';
import Link from 'next/link';
import {
  Boxes,
  Truck,
  Thermometer,
  ShieldCheck,
  Factory,
  Utensils,
  ShoppingBag,
  ArrowRight,
  Layers,
  Sparkles,
  Wrench,
  FlaskConical,
  Armchair,
  Cpu,
} from 'lucide-react';
import './ServicesIndustryContainerSection.css';

const ICON_MAP = {
  Layers,
  Utensils,
  Thermometer,
  Factory,
  Boxes,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Sparkles,
  Wrench,
  FlaskConical,
  Armchair,
  Cpu,
};



export default function ServicesIndustryContainerSection({ data }) {
  const industries = data?.industryCards || [];
  const kicker = data?.kicker || 'PDF BROCHURE SECTION: INDUSTRY SOLUTIONS';
  const title = data?.title || 'Specialized Intermodal Container Solutions';
  const subtitle = data?.subtitle || 'Engineered container architecture designed for specific vertical requirements.';

  return (
    <section
      id="industry-containers"
      className="srtc-industry-container-section"
      aria-label="Industry Tailored Container Solutions"
    >
      <div className="srtc-ind-container">
        {/* Section Header */}
        <div className="srtc-ind-header">
          <div className="srtc-ind-kicker">
            <Boxes size={14} className="srtc-ind-kicker-icon" />
            <span>{kicker}</span>
          </div>

          <h2 className="srtc-ind-title">
            {title}
          </h2>

          <p className="srtc-ind-subtitle">
            {subtitle}
          </p>
        </div>

        {/* 6 Industrial Shipping Container Cards */}
        <div className="srtc-ind-cards-grid">
          {industries.map((item, idx) => {
            const Icon = (typeof item.icon === 'string' ? ICON_MAP[item.icon] : item.icon) || Boxes;
            return (
              <article
                key={item.id}
                className={`srtc-ind-card ${item.isFeatured ? 'srtc-ind-card--featured' : ''}`}
              >


                {/* 4 Authentic Industrial Corner Castings */}
                <span className="srtc-casting srtc-casting--tl" aria-hidden="true" />
                <span className="srtc-casting srtc-casting--tr" aria-hidden="true" />
                <span className="srtc-casting srtc-casting--bl" aria-hidden="true" />
                <span className="srtc-casting srtc-casting--br" aria-hidden="true" />

                {/* Container Top Riveted Bar */}
                <div className="srtc-ind-card__top">
                  <div className="srtc-ind-card__icon-wrap">
                    <Icon size={20} className="srtc-ind-card__icon" />
                  </div>
                  <div className="srtc-ind-card__serials">
                    <span className="srtc-ind-card__serial-code">{item.serial}</span>
                    <span className="srtc-ind-card__iso-tag">{item.isoCode}</span>
                  </div>
                </div>

                {/* Container Content Body */}
                <div className="srtc-ind-card__body">
                  <div className="srtc-ind-card__badge-row">
                    <span className="srtc-ind-card__badge">{item.badge}</span>
                  </div>

                  <h3 className="srtc-ind-card__title">{item.title}</h3>
                  <p className="srtc-ind-card__desc">{item.description}</p>

                  {/* Technical Specifications Inside Container */}
                  <div className="srtc-ind-specs-panel">
                    {item.specs.map((s, idx) => (
                      <div key={idx} className="srtc-ind-spec-row">
                        <span className="srtc-ind-spec-label">{s.label}:</span>
                        <span className="srtc-ind-spec-value">{s.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Strategic Highlight Pill */}
                  <div className="srtc-ind-card__highlight">
                    <Sparkles size={13} className="srtc-ind-highlight-icon" />
                    <span>{item.highlight}</span>
                  </div>
                </div>

                {/* Container Bottom Anchor Bar */}
                <div className="srtc-ind-card__bottom">
                  <div className="srtc-ind-card__clients-tag">
                    <span className="srtc-ind-clients-lbl">TRUSTED BY:</span>
                    <span className="srtc-ind-clients-val">{item.clients}</span>
                  </div>

                  <Link href="/quote" className="srtc-ind-card__link">
                    <span>GET CONTAINER SPEC</span>
                    <ArrowRight size={14} className="srtc-ind-arrow" />
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

