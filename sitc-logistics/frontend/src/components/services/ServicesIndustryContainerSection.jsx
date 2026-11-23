'use client';

import React from 'react';
import {
  Boxes,
  Truck,
  Thermometer,
  ShieldCheck,
  Factory,
  Utensils,
  ShoppingBag,
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
                </div>

                {/* Container Content Body */}
                <div className="srtc-ind-card__body">
                  <div className="srtc-ind-card__badge-row">
                    <span className="srtc-ind-card__badge">{item.badge}</span>
                  </div>

                  <h3 className="srtc-ind-card__title">{item.title}</h3>
                  <p className="srtc-ind-card__desc">{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

