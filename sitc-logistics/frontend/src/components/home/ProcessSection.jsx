'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Compass,
  Truck,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import ProcessTruckBlueprint from './ProcessTruckBlueprint';
import './ProcessSection.css';

const STEP_ICONS = [FileText, Compass, Truck, ShieldCheck];

export default function ProcessSection({ data }) {
  const [activeStep, setActiveStep] = useState(0);
  const steps = data?.steps || [];

  return (
    <section
      id="how-we-deliver"
      className="sitc-proc-section"
      data-section-name="HOW WE DELIVER"
      aria-label="How We Deliver - 4 Step Streamlined Logistics Process"
    >
      {/* Realistic Technical Truck Blueprint & Highway Transit Corridor Background */}
      <ProcessTruckBlueprint />

      <div className="sitc-proc-container">
        <div className="sitc-proc-grid">
          {/* ===================================================================
              LEFT COLUMN: Header, Kicker, CTA, and Sleek 4-Step Cards
              =================================================================== */}
          <div className="sitc-proc-left">
            {/* Header Block */}
            <div className="sitc-proc-header">
              <div className="sitc-proc-kicker">
                <span className="sitc-proc-kicker-dot" />
                <span className="sitc-proc-kicker-title">{data?.kicker || 'HOW WE DELIVER'}</span>
              </div>

              <h2 className="sitc-proc-heading">
                {data?.title || 'A simple process. Every step covered.'}
              </h2>

              <p className="sitc-proc-lead">
                {data?.subtitle ||
                  'We simplify complex logistics through an intelligent, technology-driven workflow that keeps your cargo moving safely and on schedule.'}
              </p>

              {/* Action Row */}
              <div className="sitc-proc-action-row">
                <Link
                  href="/contact"
                  className="sitc-proc-btn"
                  aria-label="Start Shipping with SRTC Logistics"
                >
                  <span className="sitc-proc-btn-dot" />
                  <span>START SHIPPING</span>
                  <ArrowRight size={15} className="sitc-proc-btn-arrow" />
                </Link>
                <div className="sitc-proc-guarantee-pill">
                  <CheckCircle2 size={13} className="sitc-proc-pill-icon" />
                  <span>Quotes confirmed in under 15 minutes</span>
                </div>
              </div>
            </div>

            {/* Clean Process Steps */}
            {steps.length > 0 && (
              <div className="sitc-proc-steps-list" role="list">
                {steps.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const Icon = STEP_ICONS[idx % STEP_ICONS.length];

                  return (
                    <div
                      key={step.stepNum || idx}
                      role="listitem"
                      className={`sitc-proc-card ${isActive ? 'is-active' : ''}`}
                      onClick={() => setActiveStep(idx)}
                    >
                      {/* Step Number Badge */}
                      <div className="sitc-proc-card-badge-wrap">
                        <span className="sitc-proc-card-num">[{step.stepNum || `0${idx + 1}`}]</span>
                      </div>

                      {/* Step Content */}
                      <div className="sitc-proc-card-content">
                        <div className="sitc-proc-card-top">
                          <div className="sitc-proc-card-title-row">
                            <span className="sitc-proc-card-icon-wrap" aria-hidden="true">
                              <Icon size={14} className="sitc-proc-card-icon" />
                            </span>
                            <h3 className="sitc-proc-card-title">{step.title}</h3>
                          </div>
                          {step.pill && (
                            <span className="sitc-proc-card-pill">{step.pill}</span>
                          )}
                        </div>
                        <p className="sitc-proc-card-desc">{step.desc}</p>
                      </div>

                      {/* Active Indicator Chevron Accent */}
                      <div className="sitc-proc-card-accent" aria-hidden="true">
                        <ArrowRight size={14} className="sitc-proc-card-arrow" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ===================================================================
              RIGHT COLUMN: Technical Metric HUD & Highway Corridor Guarantee Box
              =================================================================== */}
          <div className="sitc-proc-right">
            <div className="sitc-proc-hud-card">
              {/* Corner crosshairs for technical precision */}
              <span className="sitc-proc-hud-corner sitc-proc-hud-corner--tl" aria-hidden="true">+</span>
              <span className="sitc-proc-hud-corner sitc-proc-hud-corner--tr" aria-hidden="true">+</span>
              <span className="sitc-proc-hud-corner sitc-proc-hud-corner--bl" aria-hidden="true">+</span>
              <span className="sitc-proc-hud-corner sitc-proc-hud-corner--br" aria-hidden="true">+</span>

              {/* HUD Header */}
              <div className="sitc-proc-hud-header">
                <div className="sitc-proc-hud-badge">
                  <span className="sitc-proc-hud-badge-dot" />
                  <span>LIVE PROTOCOL HUD</span>
                </div>
                <div className="sitc-proc-hud-status">
                  <span className="sitc-proc-hud-beacon-wrap">
                    <span className="sitc-proc-hud-beacon" />
                    <span className="sitc-proc-hud-beacon-ping" />
                  </span>
                  <span>STATUS: ONLINE 24/7</span>
                </div>
              </div>

              {/* KPI Performance Metrics */}
              <div className="sitc-proc-hud-metric-row">
                <div className="sitc-proc-hud-metric">
                  <span className="sitc-proc-hud-metric-val">15 MIN</span>
                  <span className="sitc-proc-hud-metric-lbl">RAPID QUOTE SLA</span>
                </div>
                <div className="sitc-proc-hud-metric-sep" />
                <div className="sitc-proc-hud-metric">
                  <span className="sitc-proc-hud-metric-val">99.4%</span>
                  <span className="sitc-proc-hud-metric-lbl">ON-TIME DISPATCH</span>
                </div>
                <div className="sitc-proc-hud-metric-sep" />
                <div className="sitc-proc-hud-metric">
                  <span className="sitc-proc-hud-metric-val">0%</span>
                  <span className="sitc-proc-hud-metric-lbl">TRANSIT LOSS</span>
                </div>
              </div>

              {/* Active Step Real-time Banner */}
              {steps[activeStep] && (
                <div className="sitc-proc-hud-active-bar">
                  <span className="sitc-proc-hud-phase-tag">ACTIVE PROTOCOL</span>
                  <span className="sitc-proc-hud-phase-val">
                    [{steps[activeStep].stepNum || `0${activeStep + 1}`}] {steps[activeStep].title}
                  </span>
                </div>
              )}

              <div className="sitc-proc-hud-divider" />

              {/* HUD Body Description */}
              <div className="sitc-proc-hud-body">
                <p className="sitc-proc-hud-body-text">
                  SRTC’s highway routing engine evaluates live industrial corridor traffic, toll booth wait times, and road conditions across NH-48 and pan-India expressways to assign optimal dual-driver linehauls.
                </p>

                {/* Technical Protocol Checklist */}
                <div className="sitc-proc-hud-checklist">
                  <div className="sitc-proc-hud-check-item">
                    <span className="sitc-proc-check-icon-wrap">
                      <CheckCircle2 size={14} className="sitc-proc-check-icon" />
                    </span>
                    <span>Real-time GPS telematics with live geofenced corridor alerts</span>
                  </div>
                  <div className="sitc-proc-hud-check-item">
                    <span className="sitc-proc-check-icon-wrap">
                      <CheckCircle2 size={14} className="sitc-proc-check-icon" />
                    </span>
                    <span>Dedicated key account manager assigned to every corporate contract</span>
                  </div>
                  <div className="sitc-proc-hud-check-item">
                    <span className="sitc-proc-check-icon-wrap">
                      <CheckCircle2 size={14} className="sitc-proc-check-icon" />
                    </span>
                    <span>Instant e-POD upload with zero-loss destination verification</span>
                  </div>
                </div>
              </div>

              {/* HUD Footer */}
              <div className="sitc-proc-hud-footer">
                <span className="sitc-proc-hud-code">CORRIDOR SYSTEM SPEC // SRTC-VADODARA-COMMAND</span>
                <span className="sitc-proc-hud-verified">● VERIFIED SLA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
