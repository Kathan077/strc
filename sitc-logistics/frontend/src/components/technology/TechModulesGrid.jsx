'use client';

import React from 'react';
import './TechModulesGrid.css';

const TECH_MODULES = [
  {
    id: 'mod-01',
    title: '1. Consignment Booking & Fleet Placement',
    description:
      'Directly matches your cargo volume, tonnage, and destination with our available dedicated fleet (FTL, PTL, or 20ft/32ft/40ft container trailers) without broker delays.',
    deliverable: 'Guaranteed vehicle allocation & confirmed reporting schedule',
  },
  {
    id: 'mod-02',
    title: '2. E-Way Bill & Bilty (LR) Verification',
    description:
      'Automated compliance check ensuring GST E-Way bills, valid Bilty (LR) documentation, and tamper-evident container seal numbers are verified before departure.',
    deliverable: '100% compliant paperwork ensuring zero highway inspection delays',
  },
  {
    id: 'mod-03',
    title: '3. Gujarat Highway Route Tracking',
    description:
      'Continuous transit monitoring across key industrial corridors connecting Mundra Port, Hazira, Dahej, Sanand, Ahmedabad, and regional hubs.',
    deliverable: 'Real-time corridor updates & 24/7 central traffic desk oversight',
  },
  {
    id: 'mod-04',
    title: '4. Dock Handover & Proof of Delivery (e-POD)',
    description:
      'Upon destination dock arrival, unloading is completed and physical cargo condition is confirmed followed by immediate signed digital Proof of Delivery sign-off.',
    deliverable: 'Same-day digital POD handover for prompt billing clearance',
  },
];

export default function TechModulesGrid() {
  return (
    <section className="srtc-tech-modules-section">
      <div className="srtc-tech-modules-container">
        {/* Header (Clean Title & Subtitle, No Pill Badge) */}
        <div className="srtc-tech-modules-header">
          <h2 className="srtc-tech-modules-title">
            Core Operational Modules
          </h2>
          <p className="srtc-tech-modules-desc">
            Simple, reliable software built specifically around our transport, container haulage, 
            and dock handling operations across Gujarat.
          </p>
        </div>

        {/* 4 Clean Container Cards Grid */}
        <div className="srtc-tech-grid">
          {TECH_MODULES.map((mod) => (
            <article key={mod.id} className="srtc-tech-card srtc-container-box">
              {/* ISO Container Corner Castings */}
              <span className="srtc-casting srtc-casting--tl" aria-hidden="true" />
              <span className="srtc-casting srtc-casting--tr" aria-hidden="true" />
              <span className="srtc-casting srtc-casting--bl" aria-hidden="true" />
              <span className="srtc-casting srtc-casting--br" aria-hidden="true" />

              {/* Vertical Door Lockbar Accent */}
              <div className="srtc-card-lockbar" aria-hidden="true">
                <div className="srtc-lockbar-bracket srtc-lockbar-bracket--top" />
                <div className="srtc-lockbar-rod" />
                <div className="srtc-lockbar-bracket srtc-lockbar-bracket--bottom" />
              </div>

              {/* Card Body */}
              <div className="srtc-card-body">
                {/* Title & Description */}
                <h3 className="srtc-card-title">{mod.title}</h3>
                <p className="srtc-card-desc">{mod.description}</p>

                {/* Deliverable Box */}
                <div className="srtc-card-deliverable">
                  <div className="srtc-cdeliv-head">
                    <span className="srtc-cdeliv-label">KEY OUTPUT</span>
                    <span className="srtc-cdeliv-status">VERIFIED</span>
                  </div>
                  <strong className="srtc-cdeliv-text">{mod.deliverable}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
