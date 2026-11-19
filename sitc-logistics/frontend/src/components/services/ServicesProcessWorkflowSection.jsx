'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileText,
  Lock,
  Navigation,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Truck,
} from 'lucide-react';
import './ServicesProcessWorkflowSection.css';

const ICON_MAP = {
  FileText,
  Lock,
  Navigation,
  CheckCircle,
  Truck,
  ShieldCheck,
  Zap,
};

export default function ServicesProcessWorkflowSection({ data }) {
  const steps = data?.steps || [];
  const kicker = data?.kicker || 'OPERATIONAL PIPELINE // 4-STEP CONVOY LIFECYCLE';
  const title = data?.title || 'How SRTC Delivers Your Cargo with Zero-Loss Precision';
  const subtitle =
    data?.subtitle ||
    'Every shipment follows an uncompromised 4-step heavy linehaul lifecycle — monitored through central dispatch, geo-fenced security seals, and automated digital POD.';

  return (
    <section className="srtc-proc-section" aria-label="How SRTC Logistics Operates">
      <div className="srtc-proc-container">
        {/* Header */}
        <div className="srtc-proc-header">
          <div className="srtc-proc-kicker">
            <Truck size={14} className="srtc-proc-kicker-icon" />
            <span>{kicker}</span>
          </div>

          <h2 className="srtc-proc-title">
            {title}
          </h2>

          <p className="srtc-proc-subtitle">
            {subtitle}
          </p>
        </div>

        {/* 4 Heavy-Duty Truck Front Face ("ट्रक का मुँह") Cards Grid */}
        <div className="srtc-truck-face-grid">
          {steps.map((item, idx) => {
            const Icon = (typeof item.icon === 'string' ? ICON_MAP[item.icon] : item.icon) || Truck;
            return (
              <div key={idx} className="srtc-truck-face-card">
                {/* 1. Aerodynamic Side Mirrors on Left and Right */}
                <div className="srtc-truck-mirror srtc-truck-mirror--left" aria-hidden="true">
                  <span className="srtc-mirror-arm" />
                  <span className="srtc-mirror-glass" />
                </div>
                <div className="srtc-truck-mirror srtc-truck-mirror--right" aria-hidden="true">
                  <span className="srtc-mirror-arm" />
                  <span className="srtc-mirror-glass" />
                </div>

                {/* 2. Cab Roof Fairing & 5 Amber Clearance Lights */}
                <div className="srtc-truck-cab-roof">
                  <div className="srtc-cab-roof-lights" aria-hidden="true">
                    <span className="srtc-cab-roof-led" />
                    <span className="srtc-cab-roof-led" />
                    <span className="srtc-cab-roof-led srtc-cab-roof-led--center" />
                    <span className="srtc-cab-roof-led" />
                    <span className="srtc-cab-roof-led" />
                  </div>

                  <div className="srtc-cab-visor">
                    <span className="srtc-cab-visor-step">STEP {item.stepNum}</span>
                    <span className="srtc-cab-visor-sep">·</span>
                    <span className="srtc-cab-visor-tag">{item.tag}</span>
                  </div>
                </div>

                {/* 3. Truck Windshield (Stage Icon & Prominent Title) */}
                <div className="srtc-truck-cab-windshield">
                  <div className="srtc-windshield-glass-reflection" aria-hidden="true" />

                  <div className="srtc-windshield-icon-wrap">
                    <Icon size={24} className="srtc-windshield-icon" />
                  </div>

                  <h3 className="srtc-windshield-title">{item.title}</h3>
                </div>

                {/* 4. Front Radiator Grille (Slats & Operational Description) */}
                <div className="srtc-truck-cab-grille">
                  {/* Chrome / Navy Horizontal Grille Slats */}
                  <div className="srtc-grille-slats-bg" aria-hidden="true">
                    <span className="srtc-grille-slat" />
                    <span className="srtc-grille-slat" />
                    <span className="srtc-grille-slat" />
                    <span className="srtc-grille-slat" />
                  </div>

                  {/* Brand Monogram Plaque */}
                  <div className="srtc-grille-brand-badge">
                    <span className="srtc-grille-falcon">SRTC</span>
                    <span className="srtc-grille-dot" />
                    <span className="srtc-grille-model">LINEHAUL · 0{idx + 1}</span>
                  </div>

                  {/* Description placed inside the truck front body */}
                  <p className="srtc-grille-desc">{item.desc}</p>
                </div>

                {/* 5. Heavy Front Bumper, Headlamps & Commercial Number Plate */}
                <div className="srtc-truck-cab-bumper">
                  {/* Left Headlamp with DRL strip */}
                  <div className="srtc-cab-headlamp srtc-cab-headlamp--left" aria-hidden="true">
                    <div className="srtc-headlamp-drl" />
                    <div className="srtc-headlamp-projector" />
                    <div className="srtc-headlamp-amber" />
                  </div>

                  {/* Center Indian Commercial Number Plate */}
                  <div className="srtc-cab-number-plate">
                    <div className="srtc-plate-ind-tag">
                      <span className="srtc-plate-ind-text">IND</span>
                    </div>
                    <div className="srtc-plate-data">
                      <span className="srtc-plate-num">{item.plateCode}</span>
                      <span className="srtc-plate-metric">{item.metric}</span>
                    </div>
                  </div>

                  {/* Right Headlamp with DRL strip */}
                  <div className="srtc-cab-headlamp srtc-cab-headlamp--right" aria-hidden="true">
                    <div className="srtc-headlamp-drl" />
                    <div className="srtc-headlamp-projector" />
                    <div className="srtc-headlamp-amber" />
                  </div>
                </div>

                {/* Road Ground Shadow */}
                <div className="srtc-truck-road-shadow" aria-hidden="true" />
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="srtc-proc-banner">
          <div className="srtc-proc-banner-left">
            <h4 className="srtc-proc-banner-title">Need a custom linehaul schedule or bulk contract?</h4>
            <p className="srtc-proc-banner-text">
              Our enterprise logistics engineers design dedicated fleet corridors for manufacturing
              and refinery operations.
            </p>
          </div>
          <Link href="/contact" className="srtc-proc-banner-btn">
            <span>Talk To Our Dispatch Desk</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
