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
                </div>

                {/* 3. Truck Windshield (Stage Icon & Prominent Title) */}
                <div className="srtc-truck-cab-windshield">
                  <div className="srtc-windshield-glass-reflection" aria-hidden="true" />

                  <div className="srtc-windshield-icon-wrap">
                    <Icon size={24} className="srtc-windshield-icon" />
                  </div>

                  <h3 className="srtc-windshield-title">{item.title}</h3>
                </div>

                {/* 4. Heavy Front Bumper & Headlamps */}
                <div className="srtc-truck-cab-bumper">
                  {/* Left Headlamp with DRL strip */}
                  <div className="srtc-cab-headlamp srtc-cab-headlamp--left" aria-hidden="true">
                    <div className="srtc-headlamp-drl" />
                    <div className="srtc-headlamp-projector" />
                    <div className="srtc-headlamp-amber" />
                  </div>

                  {/* Clean Center Bumper Lower Intake Bar */}
                  <div className="srtc-cab-bumper-bar" aria-hidden="true">
                    <span className="srtc-cab-bumper-slot" />
                    <span className="srtc-cab-bumper-slot" />
                    <span className="srtc-cab-bumper-slot" />
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
