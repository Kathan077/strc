'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import './TechCTAStrip.css';

export default function TechCTAStrip() {
  return (
    <section className="srtc-tech-cta-section">
      <div className="srtc-tech-cta-container">
        <div className="srtc-tech-cta-card">
          <div className="srtc-tech-cta-content">
            <h2 className="srtc-tech-cta-title">
              Ready to Book Your Commercial Freight?
            </h2>

            <p className="srtc-tech-cta-subtitle">
              Connect directly with our 24/7 central dispatch desk in Ahmedabad. 
              Get dedicated vehicle allocations, verified paperwork, and live milestone updates for your cargo.
            </p>

            <div className="srtc-tech-cta-guarantees">
              <div className="srtc-cta-guarantee-item">
                <CheckCircle2 size={15} />
                <span>Zero Broker Intermediaries</span>
              </div>
              <div className="srtc-cta-guarantee-item">
                <CheckCircle2 size={15} />
                <span>100% Verified E-Way &amp; Bilty (LR)</span>
              </div>
              <div className="srtc-cta-guarantee-item">
                <CheckCircle2 size={15} />
                <span>Instant Electronic POD Handover</span>
              </div>
            </div>
          </div>

          <div className="srtc-tech-cta-actions">
            <Link href="/contact" className="srtc-cta-btn srtc-cta-btn--quote">
              <span>Request Freight Quote</span>
              <ArrowRight size={16} />
            </Link>
            <a href="tel:+919426646095" className="srtc-cta-btn srtc-cta-btn--call">
              <Phone size={15} />
              <span>+91 94266 46095</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

