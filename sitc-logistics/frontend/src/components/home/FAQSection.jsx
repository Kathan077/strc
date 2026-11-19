'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  ChevronDown,
  Lock,
  Unlock,
  ShieldCheck,
  Truck,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import './FAQSection.css';

export default function FAQSection({ data }) {
  // Support opening multiple or one at a time (default first open)
  const [openIndex, setOpenIndex] = useState(0);

  const kicker = data?.kicker || 'FREQUENTLY ASKED QUESTIONS';
  const title = data?.title || 'Commercial Freight & Linehaul Queries';
  const subtitle =
    data?.subtitle ||
    'Everything corporate shippers need to know about booking, transit safety, fleet capacities, and real-time tracking.';
  const items = data?.items || [];

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  if (!items || items.length === 0) return null;

  return (
    <section
      id="freight-faq"
      className="srtc-faq-section"
      data-section-name="FREQUENTLY ASKED QUESTIONS"
      aria-label="Frequently Asked Questions - Commercial Freight & Logistics"
    >
      {/* Soft Ambient Depth Glows */}
      <div className="srtc-faq-ambient srtc-faq-ambient--left" aria-hidden="true" />
      <div className="srtc-faq-ambient srtc-faq-ambient--right" aria-hidden="true" />

      <div className="srtc-faq-container">
        {/* ===================================================================
            1. SECTION HEADER: Monospace Kicker, H2 Heading & CSC Plate Spec
            =================================================================== */}
        <div className="srtc-faq-header">
          <div className="srtc-faq-header-top">
            <div className="srtc-faq-kicker">
              <span className="srtc-faq-kicker-beacon" />
              <span className="srtc-faq-kicker-text">{kicker}</span>
            </div>
            <div className="srtc-faq-plate-spec">
              <span className="srtc-faq-plate-dot" />
              <span>ISO 1161 // HEAVY FREIGHT CONTAINER SPEC</span>
            </div>
          </div>

          <h2 className="srtc-faq-heading">{title}</h2>
          <p className="srtc-faq-lead">{subtitle}</p>
        </div>

        {/* ===================================================================
            2. CONTAINER & TRUCK BAY ACCORDION GRID
            =================================================================== */}
        <div className="srtc-faq-accordion" role="region" aria-label="Freight Questions Accordion">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const containerNum = `CTR-${String(idx + 1).padStart(2, '0')}`;
            const sealCode = `SEAL #SRTC-${4900 + idx * 37}`;

            return (
              <div
                key={item.id || idx}
                className={`srtc-faq-card ${isOpen ? 'is-open' : ''}`}
              >
                {/* Industrial Twist-Lock Corner Crosshairs */}
                <span className="srtc-faq-corner srtc-faq-corner--tl" aria-hidden="true">+</span>
                <span className="srtc-faq-corner srtc-faq-corner--tr" aria-hidden="true">+</span>
                <span className="srtc-faq-corner srtc-faq-corner--bl" aria-hidden="true">+</span>
                <span className="srtc-faq-corner srtc-faq-corner--br" aria-hidden="true">+</span>

                {/* Container Door Lock Bar & Question Trigger */}
                <button
                  type="button"
                  className="srtc-faq-trigger"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                >
                  <div className="srtc-faq-trigger-left">
                    {/* Industrial Rotating Cam-Lock Mechanical Handle */}
                    <div
                      className={`srtc-cam-lock ${isOpen ? 'is-unlocked' : ''}`}
                      title={isOpen ? 'Container Cam Unlocked' : 'Container Cam Locked'}
                      aria-hidden="true"
                    >
                      <div className="srtc-cam-lock-rod" />
                      <div className="srtc-cam-lock-handle">
                        <div className="srtc-cam-lock-knob" />
                      </div>
                    </div>

                    {/* Container Serial & Category Badges */}
                    <div className="srtc-faq-badges-wrap">
                      <span className="srtc-faq-serial-tag">[{containerNum}]</span>
                      {item.category && (
                        <span className="srtc-faq-category-tag">{item.category}</span>
                      )}
                      {item.badge && (
                        <span className="srtc-faq-pill-tag">{item.badge}</span>
                      )}
                    </div>

                    {/* Question Text */}
                    <h3 className="srtc-faq-question-text">{item.question}</h3>
                  </div>

                  {/* Right Status Indicators */}
                  <div className="srtc-faq-trigger-right">
                    {/* Bolt Seal Tag Indicator */}
                    <div className={`srtc-faq-seal ${isOpen ? 'is-open' : ''}`}>
                      {isOpen ? (
                        <>
                          <Unlock size={11} className="srtc-faq-seal-icon" />
                          <span>BAY REVEALED</span>
                        </>
                      ) : (
                        <>
                          <Lock size={11} className="srtc-faq-seal-icon" />
                          <span>{sealCode}</span>
                        </>
                      )}
                    </div>

                    {/* Chevron Indicator */}
                    <div className={`srtc-faq-chevron-wrap ${isOpen ? 'is-rotated' : ''}`}>
                      <ChevronDown size={17} className="srtc-faq-chevron" />
                    </div>
                  </div>
                </button>

                {/* Container Interior Bay Content (Accordion Expand) */}
                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  className={`srtc-faq-collapse ${isOpen ? 'is-expanded' : ''}`}
                >
                  <div className="srtc-faq-interior">
                    {/* Corrugated Inner Guide Line */}
                    <div className="srtc-faq-guide-line" />

                    <div className="srtc-faq-interior-content">
                      <p className="srtc-faq-answer-text">{item.answer}</p>

                      {/* Technical Footer Row Inside Container Bay */}
                      <div className="srtc-faq-bay-footer">
                        <div className="srtc-faq-bay-chips">
                          <span className="srtc-faq-chip">
                            <ShieldCheck size={12} className="srtc-faq-chip-icon" />
                            100% Insured Transit
                          </span>
                          <span className="srtc-faq-chip">
                            <Clock size={12} className="srtc-faq-chip-icon" />
                            15-Min Booking SLA
                          </span>
                          <span className="srtc-faq-chip">
                            <Truck size={12} className="srtc-faq-chip-icon" />
                            Pre-Approved Green Corridors
                          </span>
                        </div>

                        <Link href="/contact" className="srtc-faq-bay-cta">
                          <span>Request Linehaul Quote</span>
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===================================================================
            3. BOTTOM FLEET CAPACITY DISPATCH CALLOUT
            =================================================================== */}
        <div className="srtc-faq-footer-callout">
          <div className="srtc-faq-footer-left">
            <span className="srtc-faq-footer-badge">LINEHAUL CAPABILITY</span>
            <span className="srtc-faq-footer-title">
              Have specific oversized cargo, multi-axle or industrial project questions?
            </span>
          </div>
          <div className="srtc-faq-footer-actions">
            <span className="srtc-faq-footer-phone">24/7 Dispatch Desk: +91 9426646095</span>
            <Link href="/contact" className="srtc-faq-footer-btn">
              <span>Contact Dispatch Center</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

