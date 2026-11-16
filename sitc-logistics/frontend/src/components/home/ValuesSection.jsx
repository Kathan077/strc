'use client';

import React, { useState } from 'react';
import {
  HardHat,
  Users,
  Sprout,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Wifi,
  Navigation,
} from 'lucide-react';
import './ValuesSection.css';

// 4 Core Trust & Quality Pillars (outer cards only, no center Reliability card)
const trustPillars = [
  {
    id: 'safety',
    stepNumber: 1,
    stepLabel: 'Safety',
    title: 'Safety First Protocol',
    badge: 'ZERO-HARM STANDARD',
    desc: 'Advanced telematics, 100% insured cargo transit, and rigorous driver safety audits across every highway mile.',
    metric: '100% Insured',
    icon: HardHat,
    iconTheme: 'blue',
    positionClass: 'sitc-card-pos--top-left',
    nodeAngle: -135,
  },
  {
    id: 'customer',
    stepNumber: 2,
    stepLabel: 'Customer',
    title: 'Customer-Centric Focus',
    badge: 'DEDICATED KEY MGRS',
    desc: 'Tailored enterprise contracts, proactive status notifications, and dedicated single-point-of-contact account managers.',
    metric: '24/7 Response',
    icon: Users,
    iconTheme: 'blue',
    positionClass: 'sitc-card-pos--top-right',
    nodeAngle: -45,
  },
  {
    id: 'sustainability',
    stepNumber: 3,
    stepLabel: 'Green',
    title: 'Sustainable Logistics',
    badge: 'BS-VI GREEN FLEET',
    desc: 'BS-VI compliant modern freight fleet, intelligent route fuel-savings, and measurable carbon footprint reduction.',
    metric: 'Eco-Certified',
    icon: Sprout,
    iconTheme: 'green',
    positionClass: 'sitc-card-pos--bot-left',
    nodeAngle: 145,
  },
  {
    id: 'excellence',
    stepNumber: 4,
    stepLabel: 'Excellence',
    title: 'Operational Excellence',
    badge: 'ROUTE AI OPTIMIZED',
    desc: 'Continuous transit improvement, multi-city cross-docking network, and strict zero cargo-loss handling protocol.',
    metric: 'Zero Cargo Loss',
    icon: TrendingUp,
    iconTheme: 'blue',
    positionClass: 'sitc-card-pos--bot-right',
    nodeAngle: 35,
  },
];

export default function ValuesSection() {
  const [activeStage, setActiveStage] = useState(null);

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

          {/* Micro Grid Dots in Corners (exact reference pattern) */}
          <div className="sitc-mesh-dots sitc-mesh-dots--top-left" />
          <div className="sitc-mesh-dots sitc-mesh-dots--bot-left" />
          <div className="sitc-mesh-dots sitc-mesh-dots--bot-right" />
        </div>

        {/* Top-Right Floating Live GPS Indicator */}
      

        <div className="sitc-trust-container">
          {/* ===================================================================
              1. Header: Pill Badge + Main Title + Subtitle
              =================================================================== */}
          <header className="sitc-trust-header">
            {/* Pill Tag with Sparkles Icon */}
            <div className="sitc-trust-badge-pill">
              <Sparkles size={13} className="sitc-badge-pill-icon" />
              <span>TRUST & QUALITY</span>
            </div>

            {/* Main Title: Trust Built Into Every Mile. */}
            <h2 className="sitc-trust-title">
              Trust Built Into{' '}
              <span className="sitc-trust-title--blue">Every Mile.</span>
            </h2>

            {/* Subtitle */}
            <p className="sitc-trust-desc">
              We combine advanced technology, a skilled team, and a customer-first approach to deliver safe, reliable, and efficient logistics solutions — across borders and beyond.
            </p>
          </header>

          {/* ===================================================================
              2. The Central Circular Orbit System
              Central Circular Truck Image + Concentric Orbit Rings + 5 Feature Cards
              =================================================================== */}
          <div className="sitc-orbit-stage">
            {/* SVG Concentric Orbit Rings & Connector Lines (Mathematically Centered at cx: 50%, cy: 50%) */}
            <svg
              className="sitc-orbit-svg"
              viewBox="0 0 1100 580"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                {/* Blue Glow Filter for Nodes & Rings */}
                <filter id="orbitGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Subtle Gradient for Connector Lines */}
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

              {/* -------------------------------------------------------------
                  Concentric Orbit Rings Centered at (550, 310)
                  ------------------------------------------------------------- */}
              {/* Ring 1: Inner Faint Orbit Ring (r = 135) */}
              <circle
                cx="550"
                cy="310"
                r="135"
                stroke="#1769D2"
                strokeWidth="1.2"
                strokeDasharray="4 6"
                opacity="0.35"
              />

              {/* Ring 2: Middle Orbit Track with Glowing Flow (r = 175) */}
              <circle
                cx="550"
                cy="310"
                r="175"
                stroke="#1769D2"
                strokeWidth="1.5"
                opacity="0.45"
              />

              {/* Ring 3: Outer Elliptical Guide Arc (r = 250) */}
              <circle
                cx="550"
                cy="310"
                r="250"
                stroke="#1769D2"
                strokeWidth="1.2"
                strokeDasharray="5 7"
                opacity="0.25"
              />

              {/* Dynamic Animated Pulse Traveling on Middle Ring */}
              <circle
                cx="550"
                cy="310"
                r="175"
                stroke="url(#activeBeamGrad)"
                strokeWidth="2.5"
                strokeDasharray="50 350"
                className="sitc-orbit-pulse-beam"
              />
            </svg>

            {/* -------------------------------------------------------------
                Central Circular Truck Image Showcase
                ------------------------------------------------------------- */}
            <div className="sitc-central-circle-truck" aria-label="SRTC Fleet Transportation">
              {/* Core Guarantee Top Badge */}
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

                {/* Overlaid HUD Telematics Pill */}
                <div className="sitc-circle-hud-badge">
                  <span className="sitc-hud-beacon-dot" />
                  <span className="sitc-hud-badge-text">
                    LIVE FLEET TELEMATICS • 99.4% SLA
                  </span>
                </div>

                {/* Trust Micro Badges on Circle */}
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

            {/* -------------------------------------------------------------
                4 Feature Cards (Positioned in 2x2 Grid Around Orbit)
                ------------------------------------------------------------- */}
            <div className="sitc-orbit-cards-container">
              {trustPillars.map((pillar) => {
                const Icon = pillar.icon;
                const isActive = activeStage === pillar.stepNumber;

                return (
                  <article
                    key={pillar.id}
                    className={`sitc-feature-card ${pillar.positionClass} ${
                      isActive ? 'is-stage-active' : ''
                    }`}
                    data-step={pillar.stepNumber}
                    onClick={() => handleCardClick(pillar.stepNumber)}
                  >
                    {/* Top Row: Icon + Badge */}
                    <div className="sitc-card-top-row">
                      <div
                        className={`sitc-card-icon-box ${
                          pillar.iconTheme === 'green' ? 'sitc-card-icon-box--green' : ''
                        }`}
                      >
                        <Icon size={19} className="sitc-card-icon" />
                      </div>
                      <span className="sitc-card-kpi-badge">{pillar.badge}</span>
                    </div>

                    {/* Middle: Title + Description */}
                    <h3 className="sitc-card-title">{pillar.title}</h3>
                    <p className="sitc-card-desc">{pillar.desc}</p>

                    {/* Bottom: Metric Dot + Arrow */}
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
          </div>
        </div>
      </div>
    </section>
  );
}
