'use client';

import React, { useState } from 'react';
import {
  HardHat,
  Users,
  Sprout,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import './ValuesSection.css';

const PILLAR_CONFIGS = [
  { icon: HardHat, iconTheme: 'blue', positionClass: 'sitc-card-pos--top-left' },
  { icon: Users, iconTheme: 'blue', positionClass: 'sitc-card-pos--top-right' },
  { icon: Sprout, iconTheme: 'green', positionClass: 'sitc-card-pos--bot-left' },
  { icon: TrendingUp, iconTheme: 'blue', positionClass: 'sitc-card-pos--bot-right' },
];

function ValuesSection({ data }) {
  const [activeStage, setActiveStage] = useState(null);
  const pillars = data?.pillars || [];

  const handleCardClick = (stepNum) => {
    setActiveStage((prev) => (prev === stepNum ? null : stepNum));
  };

  return (
    <section
      id="our-values"
      data-section-name="TRUST & QUALITY"
      className="sitc-trust-section-wrapper"
      aria-label="Trust Built Into Every Mile - 4 Pillars of Quality"
    >
      {/* Stage Container */}
      <div className="sitc-trust-sticky-viewport">
        {/* Ambient Subtle Background Mesh & Atmospheric Halos */}
        <div className="sitc-trust-bg" aria-hidden="true">
          <div className="sitc-trust-bg__grid" />
          <div className="sitc-trust-bg__glow sitc-trust-bg__glow--center" />
          <div className="sitc-trust-bg__glow sitc-trust-bg__glow--top" />
          <div className="sitc-trust-bg__glow sitc-trust-bg__glow--bottom" />

          {/* Micro Grid Dots in Corners */}
          <div className="sitc-mesh-dots sitc-mesh-dots--top-left" />
          <div className="sitc-mesh-dots sitc-mesh-dots--bot-left" />
          <div className="sitc-mesh-dots sitc-mesh-dots--bot-right" />
        </div>

        <div className="sitc-trust-container">
          {/* Header */}
          <header className="sitc-trust-header">
            <div className="sitc-trust-badge-pill">
              <Sparkles size={13} className="sitc-badge-pill-icon" />
              <span>{data?.kicker || 'TRUST & QUALITY'}</span>
            </div>

            <h2 className="sitc-trust-title">
              {data?.title || (
                <>
                  Trust Built Into <span className="sitc-trust-title--blue">Every Mile.</span>
                </>
              )}
            </h2>

            <p className="sitc-trust-desc">
              {data?.subtitle ||
                'We combine advanced technology, a skilled team, and a customer-first approach to deliver safe, reliable, and efficient logistics solutions — across borders and beyond.'}
            </p>
          </header>

          {/* Central Orbit */}
          <div className="sitc-orbit-stage">
            <svg
              className="sitc-orbit-svg"
              viewBox="0 0 1100 580"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <filter id="orbitGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="connectorBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1769D2" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#2856A3" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="activeBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1769D2" stopOpacity="0" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#1769D2" stopOpacity="0" />
                </linearGradient>
              </defs>

              <circle cx="550" cy="310" r="140" stroke="#0E3360" strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
              <circle cx="550" cy="310" r="230" stroke="#124078" strokeWidth="1.2" opacity="0.45" />
              <circle cx="550" cy="310" r="320" stroke="#124078" strokeWidth="1" strokeDasharray="6 8" opacity="0.25" />
            </svg>

            {/* Central Circle */}
            <div className="sitc-central-circle-truck" aria-label="SRTC Fleet Transportation">
              <div className="sitc-core-guarantee-badge">
                <Sparkles size={11} className="sitc-core-guarantee-icon" />
                <span>CORE GUARANTEE</span>
              </div>
              <div className="sitc-circle-halo" aria-hidden="true" />
              <div className="sitc-circle-frame">
                <img
                  src="/images/values/truck-circle-clean.png"
                  alt="SRTC Road Freight Truck in Motion"
                  className="sitc-circle-img"
                  loading="lazy"
                />
                <div className="sitc-circle-vignette" aria-hidden="true" />
                <div className="sitc-circle-hud-badge">
                  <span className="sitc-hud-beacon-dot" />
                  <span className="sitc-hud-badge-text">
                    LIVE FLEET TELEMATICS • 99.4% SLA
                  </span>
                </div>
                <div className="sitc-circle-trust-badges">
                  <span className="sitc-circle-micro-badge">
                    <span className="sitc-micro-badge-dot sitc-micro-badge-dot--green" />
                    100% Insured
                  </span>
                  <span className="sitc-circle-micro-badge">
                    <span className="sitc-micro-badge-dot sitc-micro-badge-dot--blue" />
                    24/7 Monitored
                  </span>
                </div>
              </div>
            </div>

            {/* Pillars Cards */}
            {pillars.length > 0 && (
              <div className="sitc-orbit-cards-container">
                {pillars.map((pillar, idx) => {
                  const cfg = PILLAR_CONFIGS[idx % PILLAR_CONFIGS.length];
                  const Icon = cfg.icon;
                  const isActive = activeStage === (pillar.stepNumber || idx + 1);

                  return (
                    <article
                      key={pillar.id || idx}
                      className={`sitc-feature-card ${cfg.positionClass} ${
                        isActive ? 'is-stage-active' : ''
                      }`}
                      data-step={pillar.stepNumber || idx + 1}
                      onClick={() => handleCardClick(pillar.stepNumber || idx + 1)}
                    >
                      <div className="sitc-card-top-row">
                        <div
                          className={`sitc-card-icon-box ${
                            cfg.iconTheme === 'green' ? 'sitc-card-icon-box--green' : ''
                          }`}
                        >
                          <Icon size={19} className="sitc-card-icon" />
                        </div>
                        <span className="sitc-card-kpi-badge">{pillar.badge}</span>
                      </div>

                      <h3 className="sitc-card-title">{pillar.title}</h3>
                      <p className="sitc-card-desc">{pillar.desc}</p>

                      <div className="sitc-card-bottom-row">
                        <span className="sitc-card-metric">
                          <span className="sitc-card-metric-dot" />
                          {pillar.metric}
                        </span>
                        <ArrowRight size={15} className="sitc-card-arrow" />
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(ValuesSection);
