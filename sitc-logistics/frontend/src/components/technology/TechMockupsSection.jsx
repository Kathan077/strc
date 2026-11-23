'use client';

import React from 'react';
import { 
  CheckCircle2, 
} from 'lucide-react';
import './TechMockupsSection.css';

export default function TechMockupsSection() {
  return (
    <section className="srtc-tech-mockups-section" id="platform-showcase">
      <div className="srtc-tech-mockups-container">

        {/* ===================================================================
            SHOWCASE ROW 1: CENTRAL DISPATCH CONSOLE (REALISTIC LAPTOP MOCKUP)
            =================================================================== */}
        <div className="srtc-showcase-row srtc-showcase-row--laptop">
          {/* Column 1: Laptop Realistic 3D Mockup Image */}
          <div className="srtc-showcase-col srtc-showcase-col--mockup">
            <div className="srtc-mockup-wrapper srtc-mockup-wrapper--laptop">
              <div className="srtc-mockup-ambient-glow" aria-hidden="true" />
              <img
                src="/images/technology/srtc-fleetcore-laptop-mockup.jpg"
                alt="SRTC FleetCore Central Freight Dispatch Software Console on Laptop"
                className="srtc-mockup-img srtc-mockup-img--laptop"
                loading="eager"
              />
            </div>
          </div>

          {/* Column 2: Text Explanations */}
          <div className="srtc-showcase-col srtc-showcase-col--text">
            <h2 className="srtc-feature-title">
              Central Freight Dispatch Console
            </h2>

            <p className="srtc-feature-lead">
              Our in-house dispatch software connects our central operations desk directly with our dedicated fleet across Gujarat, ensuring complete transparency and control over every consignment.
            </p>

            <div className="srtc-feature-points">
              <div className="srtc-fpoint-item">
                <div className="srtc-fpoint-icon-box">
                  <CheckCircle2 size={16} className="srtc-fpoint-icon" />
                </div>
                <div className="srtc-fpoint-text">
                  <strong>FTL &amp; Container Allocation</strong>
                  <span>Prompt matching of 20ft, 32ft, and 40ft fleet vehicles for direct industrial transport.</span>
                </div>
              </div>

              <div className="srtc-fpoint-item">
                <div className="srtc-fpoint-icon-box">
                  <CheckCircle2 size={16} className="srtc-fpoint-icon" />
                </div>
                <div className="srtc-fpoint-text">
                  <strong>E-Way Bill &amp; Bilty (LR) Verification</strong>
                  <span>Instant digital paperwork generation and compliance checking before dock departure.</span>
                </div>
              </div>

              <div className="srtc-fpoint-item">
                <div className="srtc-fpoint-icon-box">
                  <CheckCircle2 size={16} className="srtc-fpoint-icon" />
                </div>
                <div className="srtc-fpoint-text">
                  <strong>Highway Route Tracking</strong>
                  <span>Real-time transit updates for Mundra, Hazira, Dahej, Sanand, and regional industrial corridors.</span>
                </div>
              </div>
            </div>

            {/* Deliverable Box */}
            <div className="srtc-feature-output-box">
              <span className="srtc-foutput-lbl">DIRECT FLEET MANAGEMENT</span>
              <strong className="srtc-foutput-val">Zero Broker Delays &bull; 99.4% Punctual Placement SLA</strong>
            </div>
          </div>
        </div>

        {/* ===================================================================
            SHOWCASE ROW 2: DRIVER COMPANION APP (REALISTIC SMARTPHONE MOCKUP)
            =================================================================== */}
        <div className="srtc-showcase-row srtc-showcase-row--phone">
          {/* Column 1: Text Explanations */}
          <div className="srtc-showcase-col srtc-showcase-col--text">
            <h2 className="srtc-feature-title">
              Driver &amp; Dock Handover Mobile App
            </h2>

            <p className="srtc-feature-lead">
              A straightforward mobile application used by drivers and dock supervisors to verify consignments at factory gates, port terminals, and client warehouses.
            </p>

            <div className="srtc-feature-points">
              <div className="srtc-fpoint-item">
                <div className="srtc-fpoint-icon-box">
                  <CheckCircle2 size={16} className="srtc-fpoint-icon" />
                </div>
                <div className="srtc-fpoint-text">
                  <strong>Loading Dock Safety Checklist</strong>
                  <span>Inspection of container twist-locks, industrial lashing, and tamper-evident seals.</span>
                </div>
              </div>

              <div className="srtc-fpoint-item">
                <div className="srtc-fpoint-icon-box">
                  <CheckCircle2 size={16} className="srtc-fpoint-icon" />
                </div>
                <div className="srtc-fpoint-text">
                  <strong>Highway Milestone Updates</strong>
                  <span>Simple checkpoint confirmation at major toll plazas and corridor junctions.</span>
                </div>
              </div>

              <div className="srtc-fpoint-item">
                <div className="srtc-fpoint-icon-box">
                  <CheckCircle2 size={16} className="srtc-fpoint-icon" />
                </div>
                <div className="srtc-fpoint-text">
                  <strong>Signed Proof of Delivery (e-POD)</strong>
                  <span>Immediate receiver digital sign-off upon dock unloading, enabling fast billing closure.</span>
                </div>
              </div>
            </div>

            {/* Deliverable Box */}
            <div className="srtc-feature-output-box">
              <span className="srtc-foutput-lbl">INSTANT DELIVERY CONFIRMATION</span>
              <strong className="srtc-foutput-val">100% Verified Digital e-POD &bull; Same-Day Billing Clearance</strong>
            </div>
          </div>

          {/* Column 2: Smartphone Realistic 3D Mockup Image */}
          <div className="srtc-showcase-col srtc-showcase-col--mockup srtc-showcase-col--phone-center">
            <div className="srtc-mockup-wrapper srtc-mockup-wrapper--phone">
              <div className="srtc-mockup-ambient-glow" aria-hidden="true" />
              <img
                src="/images/technology/srtc-driver-app-phone-mockup.jpg"
                alt="SRTC Driver & Dock Handover Mobile Companion App on Smartphone"
                className="srtc-mockup-img srtc-mockup-img--phone"
                loading="lazy"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
