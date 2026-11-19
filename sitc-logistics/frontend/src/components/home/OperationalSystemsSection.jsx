'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  FileText,
  Navigation,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  Phone,
  Send,
  Boxes,
  Radio,
  FileCheck2,
  Lock,
  Calendar,
  AlertCircle,
  Building2,
  ChevronRight,
} from 'lucide-react';
import './OperationalSystemsSection.css';

export default function OperationalSystemsSection({ data }) {
  const LIFECYCLE_STAGES = data?.stages || [];
  const [activeStage, setActiveStage] = useState(LIFECYCLE_STAGES[0]?.id || 'stage-1');
  const cardRefs = useRef({});

  // Robust scroll spy to highlight the corresponding stage in sticky column
  useEffect(() => {
    const handleScroll = () => {
      const triggerY = window.innerHeight * 0.45;
      let currentStage = LIFECYCLE_STAGES[0].id;

      LIFECYCLE_STAGES.forEach((stage) => {
        const el = cardRefs.current[stage.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY) {
            currentStage = stage.id;
          }
        }
      });

      setActiveStage(currentStage);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStage = (stageId) => {
    const el = cardRefs.current[stageId];
    if (el) {
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveStage(stageId);
    }
  };

  return (
    <section
      id="operational-systems"
      className="sitc-story-section"
      aria-label="How SRTC Operational Systems Move Your Freight"
    >
      {/* Background Precision Engineering Matrix Lines */}
      <div className="sitc-story-bg-grid" aria-hidden="true" />

      <div className="sitc-story-container">
        {/* ===================================================================
            SECTION TOP BRAND HEADER
            =================================================================== */}
        <div className="sitc-story-top-header">
          <div className="sitc-story-pill">
            <Radio size={14} className="sitc-story-pill-icon" />
            <span>{data?.kicker || 'BESPOKE OPERATIONAL SYSTEMS'}</span>
          </div>

          <h2 className="sitc-story-main-title">
            {data?.title || 'How Your Freight Moves: From Factory Order to Paperless POD'}
          </h2>

          <p className="sitc-story-main-subtitle">
            {data?.subtitle ||
              'SRTC does not just operate trucks; we function as a synchronized extension of your industrial plant. Experience the four operational chapters of a high-velocity consignment.'}
          </p>
        </div>

        {/* ===================================================================
            THE STICKY-SCROLL STORYTELLING STAGE
            =================================================================== */}
        <div className="sitc-story-stage-layout">
          {/* -----------------------------------------------------------------
              LEFT COLUMN: STICKY PROGRESS RAIL & HUMAN CONSULTATION DECK
              ----------------------------------------------------------------- */}
          <aside className="sitc-story-sticky-col">
            <div className="sitc-story-sticky-card">
              <div className="sitc-sticky-meta-tag">
                <span>CONSIGNMENT LIFECYCLE</span>
                <span className="sitc-sticky-dot" />
                <span>4 STAGES</span>
              </div>

              <h3 className="sitc-sticky-heading">
                Engineered for High-Stakes Industrial Supply Chains
              </h3>

              <p className="sitc-sticky-copy">
                Click any milestone or scroll down to explore how our real-time logistics systems protect every shipment.
              </p>

              {/* Interactive Progress Rail */}
              <nav className="sitc-sticky-nav" aria-label="Consignment Stages">
                {LIFECYCLE_STAGES.map((stg) => {
                  const isActive = activeStage === stg.id;
                  return (
                    <button
                      key={stg.id}
                      type="button"
                      className={`sitc-sticky-step-btn ${isActive ? 'is-active' : ''}`}
                      onClick={() => scrollToStage(stg.id)}
                    >
                      <span className="sitc-step-num">{stg.number}</span>
                      <div className="sitc-step-meta">
                        <strong className="sitc-step-title">{stg.title}</strong>
                        <span className="sitc-step-category">{stg.category}</span>
                      </div>
                      <ChevronRight size={16} className="sitc-step-arrow" />
                    </button>
                  );
                })}
              </nav>

              {/* Direct Human Touchpoint Card */}
              <div className="sitc-sticky-contact-box">
                <div className="sitc-contact-box-top">
                  <Phone size={15} className="sitc-contact-icon" />
                  <span>DIRECT DISPATCH DESK</span>
                </div>
                <strong className="sitc-contact-phone">+91 9426646095</strong>
                <p className="sitc-contact-hint">
                  Speak directly with an SRTC Route Architect to engineer custom freight contracts for your plant.
                </p>
                <a
                  href="https://wa.me/919426646095?text=Hello%20SRTC%20Logistics%2C%20I%20would%20like%20to%20schedule%20a%20Fleet%20and%20Route%20Audit%20for%20our%20factory."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sitc-sticky-cta-btn"
                >
                  <Send size={14} />
                  <span>SCHEDULE FLEET AUDIT</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </aside>

          {/* -----------------------------------------------------------------
              RIGHT COLUMN: SCROLLING STORYBOARD (4 REAL LOGISTICAL CHAPTERS)
              ----------------------------------------------------------------- */}
          <div className="sitc-story-scroll-col">
            {LIFECYCLE_STAGES.map((stg) => (
              <article
                key={stg.id}
                id={stg.id}
                ref={(el) => (cardRefs.current[stg.id] = el)}
                className={`sitc-story-card ${activeStage === stg.id ? 'is-focused' : ''}`}
              >
                {/* Chapter Eyebrow Header */}
                <div className="sitc-story-card-top">
                  <div className="sitc-card-step-badge">
                    <span className="sitc-badge-label">STAGE</span>
                    <strong className="sitc-badge-num">{stg.number}</strong>
                  </div>
                  <span className="sitc-card-category">{stg.category}</span>
                </div>

                <h3 className="sitc-card-title">{stg.title}</h3>
                <p className="sitc-card-subtitle">{stg.subtitle}</p>

                {/* Problem vs SRTC Solution (Human Context) */}
                <div className="sitc-story-contrast-block">
                  <div className="sitc-contrast-item sitc-contrast-item--pain">
                    <div className="sitc-contrast-icon">
                      <AlertCircle size={15} />
                    </div>
                    <div className="sitc-contrast-text">
                      <span className="sitc-contrast-tag">INDUSTRY BOTTLENECK</span>
                      <p>{stg.clientPain}</p>
                    </div>
                  </div>

                  <div className="sitc-contrast-item sitc-contrast-item--solution">
                    <div className="sitc-contrast-icon">
                      <CheckCircle2 size={15} />
                    </div>
                    <div className="sitc-contrast-text">
                      <span className="sitc-contrast-tag">THE SRTC SYSTEM</span>
                      <p>{stg.srtcSolution}</p>
                    </div>
                  </div>
                </div>

                {/* Realistic Document / Logistics Status Voucher (Real Physical Look) */}
                <div className="sitc-story-voucher-panel">
                  {stg.id === 'stage-1' && (
                    <div className="sitc-voucher-inner">
                      <div className="sitc-voucher-header">
                        <div className="sitc-voucher-brand">
                          <FileText size={16} className="sitc-voucher-icon" />
                          <span>DIGITAL DISPATCH DOCKET</span>
                        </div>
                        <span className="sitc-voucher-code">{stg.cardMeta.docketNo}</span>
                      </div>
                      <div className="sitc-voucher-body-grid">
                        <div className="sitc-voucher-field">
                          <span className="sitc-vfield-k">ORIGIN FACILITY</span>
                          <strong className="sitc-vfield-v">{stg.cardMeta.shipper}</strong>
                        </div>
                        <div className="sitc-voucher-field">
                          <span className="sitc-vfield-k">RECEIVING PLANT</span>
                          <strong className="sitc-vfield-v">{stg.cardMeta.destination}</strong>
                        </div>
                        <div className="sitc-voucher-field">
                          <span className="sitc-vfield-k">ASSIGNED FLEET UNIT</span>
                          <strong className="sitc-vfield-v sitc-vfield-v--gold">
                            {stg.cardMeta.vehicle}
                          </strong>
                        </div>
                        <div className="sitc-voucher-field">
                          <span className="sitc-vfield-k">DISPATCH STATUS</span>
                          <span className="sitc-vfield-badge sitc-vfield-badge--ready">
                            {stg.cardMeta.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {stg.id === 'stage-2' && (
                    <div className="sitc-voucher-inner">
                      <div className="sitc-voucher-header">
                        <div className="sitc-voucher-brand">
                          <ShieldCheck size={16} className="sitc-voucher-icon" />
                          <span>HIGHWAY ROUTE COMMAND DESK</span>
                        </div>
                        <span className="sitc-voucher-live-dot">ACTIVE CORRIDOR TRANSIT</span>
                      </div>
                      <div className="sitc-voucher-body-grid">
                        <div className="sitc-voucher-field">
                          <span className="sitc-vfield-k">TRANSIT CORRIDOR</span>
                          <strong className="sitc-vfield-v">{stg.cardMeta.corridor}</strong>
                        </div>
                        <div className="sitc-voucher-field">
                          <span className="sitc-vfield-k">LINEHAUL CRUISE SPEED</span>
                          <strong className="sitc-vfield-v">{stg.cardMeta.speed}</strong>
                        </div>
                        <div className="sitc-voucher-field">
                          <span className="sitc-vfield-k">ROUTE PROTOCOL</span>
                          <span className="sitc-vfield-badge sitc-vfield-badge--green">
                            {stg.cardMeta.routing}
                          </span>
                        </div>
                        <div className="sitc-voucher-field">
                          <span className="sitc-vfield-k">CENTRAL DESK STATUS</span>
                          <strong className="sitc-vfield-v sitc-vfield-v--cyan">
                            {stg.cardMeta.controlDesk}
                          </strong>
                        </div>
                      </div>
                    </div>
                  )}

                  {stg.id === 'stage-3' && (
                    <div className="sitc-voucher-inner">
                      <div className="sitc-voucher-header">
                        <div className="sitc-voucher-brand">
                          <Building2 size={16} className="sitc-voucher-icon" />
                          <span>IN-PLANT DOCK MARSHALING</span>
                        </div>
                        <span className="sitc-voucher-code">GATE SCHEDULER</span>
                      </div>
                      <div className="sitc-voucher-body-grid">
                        <div className="sitc-voucher-field">
                          <span className="sitc-vfield-k">DESIGNATED UNLOADING BAY</span>
                          <strong className="sitc-vfield-v sitc-vfield-v--gold">
                            {stg.cardMeta.plantBay}
                          </strong>
                        </div>
                        <div className="sitc-voucher-field">
                          <span className="sitc-vfield-k">PRE-ARRIVAL NOTICE</span>
                          <strong className="sitc-vfield-v">{stg.cardMeta.preAlertStatus}</strong>
                        </div>
                        <div className="sitc-voucher-field">
                          <span className="sitc-vfield-k">MEASURED DOCK TURNAROUND</span>
                          <span className="sitc-vfield-badge sitc-vfield-badge--timer">
                            {stg.cardMeta.turnaroundTimer}
                          </span>
                        </div>
                        <div className="sitc-voucher-field">
                          <span className="sitc-vfield-k">SEAL VERIFICATION</span>
                          <strong className="sitc-vfield-v">{stg.cardMeta.containerSeal}</strong>
                        </div>
                      </div>
                    </div>
                  )}

                  {stg.id === 'stage-4' && (
                    <div className="sitc-voucher-inner sitc-voucher-inner--epod">
                      <div className="sitc-voucher-header">
                        <div className="sitc-voucher-brand">
                          <FileCheck2 size={16} className="sitc-voucher-icon" />
                          <span>ELECTRONIC PROOF OF DELIVERY (e-POD)</span>
                        </div>
                        <span className="sitc-stamp-verified">✓ 100% AUDIT READY</span>
                      </div>
                      <div className="sitc-voucher-body-grid">
                        <div className="sitc-voucher-field">
                          <span className="sitc-vfield-k">RECEIVER COUNTERSIGNATURE</span>
                          <strong className="sitc-vfield-v">{stg.cardMeta.receiverName}</strong>
                        </div>
                        <div className="sitc-voucher-field">
                          <span className="sitc-vfield-k">CARGO CONDITION</span>
                          <span className="sitc-vfield-badge sitc-vfield-badge--green">
                            {stg.cardMeta.shortageStatus}
                          </span>
                        </div>
                        <div className="sitc-voucher-field">
                          <span className="sitc-vfield-k">DELIVERY CONFIRMATION</span>
                          <strong className="sitc-vfield-v sitc-vfield-v--cyan">
                            {stg.cardMeta.epodStatus}
                          </strong>
                        </div>
                        <div className="sitc-voucher-field">
                          <span className="sitc-vfield-k">INVOICE READINESS</span>
                          <span className="sitc-vfield-badge sitc-vfield-badge--ready">
                            {stg.cardMeta.invoiceStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Technical SLA Grid */}
                <div className="sitc-card-specs-grid">
                  {stg.specs && stg.specs.map((item, idx) => {
                    const isObj = typeof item === 'object' && item !== null;
                    const label = isObj ? item.label : (typeof item === 'string' && item.includes(':') ? item.split(':')[0] : 'SLA Specification');
                    const value = isObj ? item.value : (typeof item === 'string' && item.includes(':') ? item.slice(item.indexOf(':') + 1).trim() : item);
                    return (
                      <div key={idx} className="sitc-card-spec-item">
                        <span className="sitc-cspec-k">{label}</span>
                        <strong className="sitc-cspec-v">{value}</strong>
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ===================================================================
            SECTION BOTTOM STRIP: PAN-INDIA OPERATIONAL PROMISE
            =================================================================== */}
        <div className="sitc-story-promise-strip">
          <div className="sitc-promise-item">
            <ShieldCheck size={22} className="sitc-promise-icon" />
            <div className="sitc-promise-text">
              <strong>Estd. 2003 &bull; 23+ Years Proven Legacy</strong>
              <span>Fastest &bull; Secured &bull; Trustable multimodal transit with 100% GST &amp; e-Way compliance.</span>
            </div>
          </div>

          <div className="sitc-promise-sep" />

          <div className="sitc-promise-item">
            <Truck size={22} className="sitc-promise-icon" />
            <div className="sitc-promise-text">
              <strong>840+ Active Commercial Fleet</strong>
              <span>Dedicated point-to-point FTL linehaul rigs, PTL cargo vehicles, and modern warehouse handling.</span>
            </div>
          </div>

          <div className="sitc-promise-sep" />

          <div className="sitc-promise-item">
            <Clock size={22} className="sitc-promise-icon" />
            <div className="sitc-promise-text">
              <strong>24/7/365 Non-Stop Central Dispatch</strong>
              <span>Ahmedabad headquarters and regional desks active round the clock for immediate route coordination.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
