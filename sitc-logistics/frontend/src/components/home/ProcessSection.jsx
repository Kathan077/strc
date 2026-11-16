'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  Radio,
  Clock,
  Sparkles,
  Layers,
  Zap,
} from 'lucide-react';
import './ProcessSection.css';

const processSteps = [
  {
    stepNum: '01',
    title: 'Request a Quote',
    desc: 'SHARE YOUR SHIPMENT DETAILS, CARGO REQUIREMENTS, DESTINATION, AND PREFERRED DELIVERY SCHEDULE WITH OUR TEAM.',
    kpi: '15-MIN QUOTE',
    kpiLabel: 'Instant Commercial SLA',
    hudStatus: 'STEP 01 • CARGO INGESTION & DISPATCH QUEUE',
  },
  {
    stepNum: '02',
    title: 'Plan the Shipment',
    desc: 'WE DETERMINE THE MOST EFFICIENT ROUTE, TRANSPORTATION METHOD, TIMELINE, AND HANDLING REQUIREMENTS FOR YOUR CARGO.',
    kpi: 'ROUTE AI OPTIMIZED',
    kpiLabel: 'Smart Freight Consolidation',
    hudStatus: 'STEP 02 • MULTI-AXLE ROUTE OPTIMIZATION',
  },
  {
    stepNum: '03',
    title: 'Move and Track',
    desc: 'YOUR SHIPMENT MOVES THROUGH OUR TRUSTED NETWORK WITH CLEAR UPDATES AND REAL-TIME VISIBILITY THROUGHOUT TRANSIT.',
    kpi: 'LIVE TELEMATICS',
    kpiLabel: 'IoT GPS Highway Monitoring',
    hudStatus: 'STEP 03 • ACTIVE CORRIDOR TRANSIT • EN ROUTE',
  },
  {
    stepNum: '04',
    title: 'Deliver with Confidence',
    desc: 'WE COORDINATE THE FINAL DELIVERY TO ENSURE YOUR SHIPMENT ARRIVES SAFELY, SECURELY, AND ACCORDING TO SCHEDULE.',
    kpi: 'ZERO-LOSS SLA',
    kpiLabel: 'Digital Proof of Delivery (e-POD)',
    hudStatus: 'STEP 04 • SECURE CROSS-DOCK & DESTINATION SIGN-OFF',
  },
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="how-we-deliver"
      className="sitc-process-section"
      data-section-name="HOW WE DELIVER"
      aria-label="How We Deliver - 4 Step Streamlined Logistics Process"
    >
      {/* Ambient Atmospheric Glows */}
      <div className="sitc-process-bg-glow sitc-process-bg-glow--top" aria-hidden="true" />
      <div className="sitc-process-bg-glow sitc-process-bg-glow--bottom" aria-hidden="true" />
      <div className="sitc-process-bg-grid" aria-hidden="true" />

      <div className="sitc-process-container">
        {/* Main 2-Column Split: Narrative & Steps (Left) + Aerial Drone Telematics (Right) */}
        <div className="sitc-process-layout">
          {/* ===================================================================
              LEFT COLUMN: Header, Kicker, Narrative, CTA, and 4-Step Process List
              =================================================================== */}
          <div className="sitc-process-left">
            {/* Top Monospace / Tech Kicker */}
            <div className="sitc-process-kicker">
              <span className="sitc-kicker-bullet" aria-hidden="true" />
              <span className="sitc-kicker-text">HOW WE DELIVER</span>
              <span className="sitc-kicker-badge">STREAMLINED 4-STEP FLOW</span>
            </div>

            {/* Main Headline */}
            <h2 className="sitc-process-title">
              A simple process.
              <span className="sitc-process-title--accent"> Every step covered.</span>
            </h2>

            {/* Technical Narrative Subtitle */}
            <p className="sitc-process-desc">
              WE SIMPLIFY COMPLEX LOGISTICS THROUGH A STREAMLINED PROCESS THAT KEEPS YOUR SHIPMENTS MOVING EFFICIENTLY FROM ORIGIN TO DESTINATION.
            </p>

            {/* High-Impact Primary CTA Button */}
            <div className="sitc-process-cta-wrap">
              <Link
                href="#quote"
                className="sitc-process-cta-btn"
                aria-label="Start Shipping with SRTC Logistics"
              >
                <span className="sitc-cta-bullet" aria-hidden="true" />
                <span className="sitc-cta-label">START SHIPPING</span>
                <ArrowUpRight size={17} className="sitc-cta-arrow" />
              </Link>
              <span className="sitc-cta-subtext">
                <CheckCircle2 size={13} className="sitc-cta-check" />
                Commercial quotes confirmed in under 15 minutes
              </span>
            </div>

            {/* The 4-Step Interactive Process List */}
            <div className="sitc-steps-timeline" role="list">
              {processSteps.map((step, idx) => {
                const isActive = activeStep === idx;

                return (
                  <article
                    key={step.stepNum}
                    role="listitem"
                    className={`sitc-step-card ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveStep(idx)}
                    onMouseEnter={() => setActiveStep(idx)}
                  >
                    {/* Left Step Identifier in Monospace Brackets */}
                    <div className="sitc-step-id-col">
                      <div className="sitc-step-bracket-wrap">
                        <span className="sitc-step-bracket">[</span>
                        <span className="sitc-step-number">{step.stepNum}</span>
                        <span className="sitc-step-bracket">]</span>
                      </div>
                      {idx < processSteps.length - 1 && (
                        <div className="sitc-step-rail-link" aria-hidden="true">
                          <div
                            className="sitc-step-rail-fill"
                            style={{ height: isActive ? '100%' : '0%' }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="sitc-step-body">
                      <div className="sitc-step-header-row">
                        <h3 className="sitc-step-title">{step.title}</h3>
                        <span className="sitc-step-pill">{step.kpi}</span>
                      </div>
                      <p className="sitc-step-desc">{step.desc}</p>
                      <div className="sitc-step-meta">
                        <span className="sitc-step-meta-dot" />
                        <span className="sitc-step-meta-text">{step.kpiLabel}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* ===================================================================
              RIGHT COLUMN: Aerial Top-Down Drone Truck Visual + Glassmorphism HUD
              =================================================================== */}
          <div className="sitc-process-right">
            <div className="sitc-visual-frame">
              {/* Top HUD Floating Telematics Tag */}
              <div className="sitc-drone-hud-top" aria-label="Live Fleet Status">
                <span className="sitc-hud-beacon" />
                <span className="sitc-hud-tag-text">
                  {processSteps[activeStep].hudStatus}
                </span>
                <Radio size={12} className="sitc-hud-signal-icon" />
              </div>

              {/* Drone Camera Reticle / HUD Corner Crosshairs */}
              <div className="sitc-hud-reticle sitc-hud-reticle--top-left" aria-hidden="true" />
              <div className="sitc-hud-reticle sitc-hud-reticle--top-right" aria-hidden="true" />

              {/* The Aerial Top-Down Container Truck Photograph */}
              <div className="sitc-drone-img-wrapper">
                <img
                  src="/images/process/drone-truck-topdown.jpg"
                  alt="Aerial top-down drone photograph of an SRTC commercial freight truck on highway"
                  className="sitc-drone-truck-img"
                  loading="lazy"
                />
                <div className="sitc-drone-overlay-gradient" aria-hidden="true" />
              </div>

              {/* Center Coordinate Target HUD Reticle */}
              <div className="sitc-drone-target-circle" aria-hidden="true">
                <div className="sitc-target-crosshair-h" />
                <div className="sitc-target-crosshair-v" />
                <span className="sitc-target-coord">NH-48 CORRIDOR • 0 KM/H SLA</span>
              </div>

              {/* ===================================================================
                  Floating Glassmorphic HUD Metric Overlay (Exact Reference Component)
                  =================================================================== */}
              <div className="sitc-hud-glass-card" aria-label="Fleet Performance Metrics">
                {/* Tech Corner Crosshairs (matching reference design marks) */}
                <span className="sitc-glass-corner sitc-glass-corner--tl" aria-hidden="true">+</span>
                <span className="sitc-glass-corner sitc-glass-corner--tr" aria-hidden="true">+</span>
                <span className="sitc-glass-corner sitc-glass-corner--bl" aria-hidden="true">+</span>
                <span className="sitc-glass-corner sitc-glass-corner--br" aria-hidden="true">+</span>

                {/* Left Metric: 98% On-Time Delivery Rate */}
                <div className="sitc-hud-stat-cell">
                  <div className="sitc-stat-val-row">
                    <span className="sitc-stat-number">98</span>
                    <span className="sitc-stat-unit">%</span>
                  </div>
                  <div className="sitc-stat-line" />
                  <span className="sitc-stat-label">ON-TIME DELIVERY RATE</span>
                </div>

                {/* Vertical Subtle Hairline Divider */}
                <div className="sitc-hud-stat-divider" aria-hidden="true" />

                {/* Right Metric: 24/7 Real-Time Shipment Tracking */}
                <div className="sitc-hud-stat-cell">
                  <div className="sitc-stat-val-row">
                    <span className="sitc-stat-number">24/7</span>
                  </div>
                  <div className="sitc-stat-line" />
                  <span className="sitc-stat-label">REAL-TIME SHIPMENT TRACKING</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

