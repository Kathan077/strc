'use client';

import React, { useState } from 'react';
import {
  CalendarCheck,
  PackageCheck,
  Navigation,
  ShieldCheck,
  Route,
  CheckCircle2,
} from 'lucide-react';
import './AboutProcessSection.css';

// Helper to prevent floating-point SSR hydration mismatch
const r2 = (num) => Math.round(num * 100) / 100;

const ICON_MAP = {
  CalendarCheck,
  PackageCheck,
  Navigation,
  ShieldCheck,
  Route,
  CheckCircle2,
};

const DEFAULT_STEPS = [
  {
    number: '01',
    stepNum: '01',
    km: 'ORIGIN HUB',
    terminal: 'ALLOCATION',
    icon: 'CalendarCheck',
    badge: 'Guaranteed Allocation',
    title: 'Consignment Booking',
    tagline: 'Freight Scheduling & Fleet Allocation',
    desc: 'Consignment specifications and cargo weight are verified, followed by prompt allocation of dedicated company-owned trucks.',
    tireModel: 'SRTC LINEHAUL 295/80 R22.5',
    tireSpec: 'STEEL BELTED RADIAL • TUBELESS • 152/148M',
  },
  {
    number: '02',
    stepNum: '02',
    km: 'TRANSIT CORRIDOR',
    terminal: 'PRE-CHECK',
    icon: 'Route',
    badge: 'Full Traffic Compliance',
    title: 'Safety & Route Planning',
    tagline: 'Pre-Trip Inspection & Compliance',
    desc: 'Comprehensive multi-point vehicle safety inspection, toll mapping, and driver safety protocol compliance before rollout.',
    tireModel: 'SRTC EXPRESS 295/80 R22.5',
    tireSpec: 'DUAL DRIVE AXLE • HIGHWAY SPEED RATED',
  },
  {
    number: '03',
    stepNum: '03',
    km: 'HIGHWAY TRANSIT',
    terminal: 'LINEHAUL',
    icon: 'Navigation',
    badge: '24/7 Live GPS Tracking',
    title: 'Continuous Linehaul',
    tagline: '24/7 GPS Tracking & Telematics',
    desc: '24/7 en-route GPS tracking with trained, professional commercial drivers ensuring secure, punctual, and non-stop highway haulage.',
    tireModel: 'SRTC HAULAGE 295/80 R22.5',
    tireSpec: 'MAX LOAD 3750 KG • HEAVY DUTY HIGHWAY RATED',
  },
  {
    number: '04',
    stepNum: '04',
    km: 'DESTINATION DOCK',
    terminal: 'HANDOVER',
    icon: 'CheckCircle2',
    badge: 'Verified e-POD Handover',
    title: 'Dock Delivery & Handover',
    tagline: 'Zero-Demurrage Arrival & Delivery',
    desc: 'On-time arrival at receiving plant or warehouse dock, verified consignment unloading, and immediate digital Proof of Delivery (e-POD).',
    tireModel: 'SRTC TERMINAL MASTER',
    tireSpec: 'ZERO TRANSIT LOSS • SLA COMPLIANT',
  },
];

export default function AboutProcessSection({ data }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const steps = data?.steps && data.steps.length > 0 ? data.steps : DEFAULT_STEPS;
  const title = data?.title || 'Simple, Transparent &';
  const titleGold = data?.titleGold || 'Precision-Driven.';
  const desc =
    data?.description ||
    'From verified consignment booking to scheduled dock delivery, our dedicated company-owned fleet ensures safe, compliant, and punctual freight transit across Gujarat and national highway corridors.';

  return (
    <section className="srtc-process-clean" aria-label="How We Work: 4-Step Freight Lifecycle">
      <div className="srtc-process-clean__container">
        {/* ====================================================================
            HEADER: 100% English, Confident & Minimalist
            ==================================================================== */}
        <div className="srtc-process-clean__header">
          <h2 className="srtc-process-clean__title">
            {title} <span className="srtc-process-gold">{titleGold}</span>
          </h2>

          <p className="srtc-process-clean__desc">{desc}</p>
        </div>

        {/* ====================================================================
            4 HYPER-REALISTIC COMMERCIAL TRUCK WHEELS (1x4 FLEET GRID)
            Design: CAD-Grade 3D Radial Tires, Alcoa Forged Alloy Rims & Content
            ==================================================================== */}
        <div className="srtc-wheel-fleet-grid">
          {steps.map((step, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={step._id || step.id || `process-wheel-step-${step.number || idx}-${idx}`}
                className={`srtc-wheel-unit-card ${isHovered ? 'is-wheel-hovered' : ''}`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* ------------------------------------------------------------
                    PHOTOREALISTIC COMMERCIAL TRUCK TIRE & ALCOA ALLOY WHEEL SVG
                    ------------------------------------------------------------ */}
                <div className="srtc-wheel-graphic-wrap">
                  <svg
                    viewBox="0 0 360 380"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="srtc-wheel-svg"
                    aria-hidden="true"
                  >
                    <defs>
                      {/* 1. Realistic 3D Toroidal Vulcanized Rubber Gradient */}
                      <radialGradient id={`rubber3D-${idx}`} cx="42%" cy="38%" r="62%">
                        <stop offset="60%" stopColor="#2A333E" />
                        <stop offset="78%" stopColor="#1B222B" />
                        <stop offset="90%" stopColor="#10151B" />
                        <stop offset="97%" stopColor="#0A0D12" />
                        <stop offset="100%" stopColor="#040608" />
                      </radialGradient>

                      {/* 2. Sidewall 3D Highlight Arch (Simulates Sunlight Glare on Rubber Bulge) */}
                      <linearGradient id={`sidewallSheen-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3E4A59" stopOpacity="0.8" />
                        <stop offset="35%" stopColor="#252D37" stopOpacity="0.3" />
                        <stop offset="70%" stopColor="#10151C" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#05070A" stopOpacity="0.9" />
                      </linearGradient>

                      {/* 3. Polished Alcoa Dura-Bright Alloy Rim Ring */}
                      <linearGradient id={`rimAlloy3D-${idx}`} x1="25%" y1="15%" x2="75%" y2="85%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="18%" stopColor="#E2E8F0" />
                        <stop offset="38%" stopColor="#CBD5E1" />
                        <stop offset="55%" stopColor="#94A3B8" />
                        <stop offset="75%" stopColor="#475569" />
                        <stop offset="92%" stopColor="#1E293B" />
                        <stop offset="100%" stopColor="#0F172A" />
                      </linearGradient>

                      {/* 4. Ventilated Cast-Iron Brake Drum Rotor Gradient */}
                      <radialGradient id={`brakeRotorGrad-${idx}`} cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#1C242C" />
                        <stop offset="70%" stopColor="#11161B" />
                        <stop offset="100%" stopColor="#05080B" />
                      </radialGradient>

                      {/* 5. 3D Chrome Hexagonal Wheel Stud Lug Nut */}
                      <linearGradient id={`chromeStud-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="30%" stopColor="#F8FAFC" />
                        <stop offset="65%" stopColor="#94A3B8" />
                        <stop offset="100%" stopColor="#334155" />
                      </linearGradient>

                      {/* 6. Precision Machined Gold Accent Ring */}
                      <linearGradient id={`goldRingGrad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FDE68A" />
                        <stop offset="30%" stopColor="#E8B94F" />
                        <stop offset="70%" stopColor="#B88214" />
                        <stop offset="100%" stopColor="#78350F" />
                      </linearGradient>

                      {/* 7. Heavy Ground Tire Contact Shadow (Dual Layer) */}
                      <radialGradient id={`contactPatchShadow-${idx}`} cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#0B2F4A" stopOpacity="0.85" />
                        <stop offset="45%" stopColor="#05121E" stopOpacity="0.45" />
                        <stop offset="85%" stopColor="#000000" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                      </radialGradient>

                      {/* 8. Curved Sidewall Text Paths */}
                      <path
                        id={`textPathTop-${idx}`}
                        d="M 36,180 A 144,144 0 0,1 324,180"
                        fill="none"
                      />
                      <path
                        id={`textPathBottom-${idx}`}
                        d="M 324,180 A 144,144 0 0,1 36,180"
                        fill="none"
                      />
                    </defs>

                    {/* --------------------------------------------------------
                        A. GROUND ROAD SHADOW & CONTACT PATCH
                        -------------------------------------------------------- */}
                    <ellipse cx="180" cy="358" rx="140" ry="12" fill={`url(#contactPatchShadow-${idx})`} />
                    <ellipse cx="180" cy="355" rx="95" ry="6" fill="#000000" opacity="0.65" />

                    {/* --------------------------------------------------------
                        B. 3D CHUNKY TREAD LUGS (32 HEAVY PERIMETER BLOCKS)
                        -------------------------------------------------------- */}
                    {/* Deep Outer Tread Groove Foundation Ring */}
                    <circle cx="180" cy="180" r="175" fill="#030507" />

                    {/* 32 Dimensional Tread Blocks with Highlights & Sipes */}
                    {Array.from({ length: 32 }).map((_, t) => {
                      const angle = (t * (360 / 32) * Math.PI) / 180;
                      const nextAngle = ((t + 0.72) * (360 / 32) * Math.PI) / 180;
                      const cosA = Math.cos(angle);
                      const sinA = Math.sin(angle);
                      const cosB = Math.cos(nextAngle);
                      const sinB = Math.sin(nextAngle);

                      // 4 corners of the tread lug block
                      const p1x = r2(180 + 164 * cosA);
                      const p1y = r2(180 + 164 * sinA);
                      const p2x = r2(180 + 175 * cosA);
                      const p2y = r2(180 + 175 * sinA);
                      const p3x = r2(180 + 175 * cosB);
                      const p3y = r2(180 + 175 * sinB);
                      const p4x = r2(180 + 164 * cosB);
                      const p4y = r2(180 + 164 * sinB);

                      // Mid-block sipe cut
                      const midAngle = ((t + 0.36) * (360 / 32) * Math.PI) / 180;
                      const sx1 = r2(180 + 165 * Math.cos(midAngle));
                      const sy1 = r2(180 + 165 * Math.sin(midAngle));
                      const sx2 = r2(180 + 174 * Math.cos(midAngle));
                      const sy2 = r2(180 + 174 * Math.sin(midAngle));

                      return (
                        <g key={`lug-${t}`}>
                          {/* Tread Block Body */}
                          <polygon
                            points={`${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y} ${p4x},${p4y}`}
                            fill="#1C232B"
                            stroke="#0B0F14"
                            strokeWidth="1.2"
                          />
                          {/* Top Highlight on sunlit side */}
                          <line
                            x1={p2x}
                            y1={p2y}
                            x2={p3x}
                            y2={p3y}
                            stroke="#364250"
                            strokeWidth="1"
                            strokeLinecap="round"
                          />
                          {/* Lateral Tread Sipe (Micro-Groove) */}
                          <line
                            x1={sx1}
                            y1={sy1}
                            x2={sx2}
                            y2={sy2}
                            stroke="#080C10"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                        </g>
                      );
                    })}

                    {/* --------------------------------------------------------
                        C. 3D ROUNDED TOROIDAL TIRE SIDEWALL (RUBBER BULGE)
                        -------------------------------------------------------- */}
                    {/* Main Vulcanized Rubber Sidewall Body */}
                    <circle cx="180" cy="180" r="164" fill={`url(#rubber3D-${idx})`} stroke="#090D11" strokeWidth="2" />

                    {/* Toroidal Sidewall Bulge Highlight Ring (Simulates 3D Curvature) */}
                    <circle cx="180" cy="180" r="154" fill="none" stroke={`url(#sidewallSheen-${idx})`} strokeWidth="7" />
                    <circle cx="180" cy="180" r="158" fill="none" stroke="#252E38" strokeWidth="0.8" strokeDasharray="4 2.5" />
                    <circle cx="180" cy="180" r="148" fill="none" stroke="#090D11" strokeWidth="1.8" />
                    <circle cx="180" cy="180" r="144" fill="none" stroke="#1F2833" strokeWidth="1" />

                    {/* --------------------------------------------------------
                        D. EMBOSSED 3D MOLDED SIDEWALL LETTERING (WITH DROP SHADOW)
                        -------------------------------------------------------- */}
                    {/* Shadow Layer */}
                    <text dy="1.2">
                      <textPath
                        href={`#textPathTop-${idx}`}
                        startOffset="50%"
                        textAnchor="middle"
                        fill="#05080B"
                        fontSize="8.5"
                        fontFamily="var(--font-primary), sans-serif"
                        fontWeight="900"
                        letterSpacing="0.14em"
                      >
                        ★ {step.tireModel} ★
                      </textPath>
                    </text>
                    {/* Raised Rubber Highlight Layer */}
                    <text dy="0">
                      <textPath
                        href={`#textPathTop-${idx}`}
                        startOffset="50%"
                        textAnchor="middle"
                        fill="#8B98A5"
                        fontSize="8.5"
                        fontFamily="var(--font-primary), sans-serif"
                        fontWeight="900"
                        letterSpacing="0.14em"
                      >
                        ★ {step.tireModel} ★
                      </textPath>
                    </text>

                    {/* Lower Sidewall Specs */}
                    <text dy="1">
                      <textPath
                        href={`#textPathBottom-${idx}`}
                        startOffset="50%"
                        textAnchor="middle"
                        fill="#05080B"
                        fontSize="7.2"
                        fontFamily="var(--font-primary), sans-serif"
                        fontWeight="800"
                        letterSpacing="0.12em"
                      >
                        {step.tireSpec}
                      </textPath>
                    </text>
                    <text dy="0">
                      <textPath
                        href={`#textPathBottom-${idx}`}
                        startOffset="50%"
                        textAnchor="middle"
                        fill="#6B7887"
                        fontSize="7.2"
                        fontFamily="var(--font-primary), sans-serif"
                        fontWeight="800"
                        letterSpacing="0.12em"
                      >
                        {step.tireSpec}
                      </textPath>
                    </text>

                    {/* --------------------------------------------------------
                        E. POLISHED ALCOA DURA-BRIGHT FORGED ALLOY RIM
                        -------------------------------------------------------- */}
                    {/* Rim Outer Lip / Bead Seat Flange */}
                    <circle cx="180" cy="180" r="144" fill={`url(#rimAlloy3D-${idx})`} stroke="#1E293B" strokeWidth="2" />
                    <circle cx="180" cy="180" r="143" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.8" />
                    <circle cx="180" cy="180" r="138" fill="none" stroke="#475569" strokeWidth="1" />

                    {/* --------------------------------------------------------
                        F. 10 OVAL VENTILATION WINDOWS & VENTILATED ROTOR DISC
                        -------------------------------------------------------- */}
                    {Array.from({ length: 10 }).map((_, h) => {
                      const rad = (h * 36 * Math.PI) / 180;
                      const hx = r2(180 + 134 * Math.cos(rad));
                      const hy = r2(180 + 134 * Math.sin(rad));
                      const rot = r2(h * 36 + 90);

                      return (
                        <g key={`vent-hole-${h}`} transform={`rotate(${rot}, ${hx}, ${hy})`}>
                          {/* Inner Dark Brake Drum Cavity */}
                          <ellipse
                            cx={hx}
                            cy={hy}
                            rx="7"
                            ry="4"
                            fill={`url(#brakeRotorGrad-${idx})`}
                            stroke="#334155"
                            strokeWidth="1"
                          />
                          {/* Cast Iron Brake Disc Edge */}
                          <line
                            x1={r2(hx - 4)}
                            y1={hy}
                            x2={r2(hx + 4)}
                            y2={hy}
                            stroke="#475569"
                            strokeWidth="0.8"
                            strokeDasharray="2 1.5"
                          />
                          {/* Polished Rim Hole Inner Bevel Highlight */}
                          <path
                            d={`M ${r2(hx - 6)},${r2(hy - 2)} C ${r2(hx - 3.5)},${r2(hy - 3.5)} ${r2(hx + 3.5)},${r2(hy - 3.5)} ${r2(hx + 6)},${r2(hy - 2)}`}
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="0.8"
                            strokeOpacity="0.65"
                          />
                        </g>
                      );
                    })}

                    {/* --------------------------------------------------------
                        G. 10 CHROME HEXAGONAL WHEEL STUD LUG NUTS
                        -------------------------------------------------------- */}
                    {Array.from({ length: 10 }).map((_, n) => {
                      const nRad = ((n * 36 + 18) * Math.PI) / 180;
                      const nx = r2(180 + 125 * Math.cos(nRad));
                      const ny = r2(180 + 125 * Math.sin(nRad));

                      return (
                        <g key={`stud-${n}`}>
                          {/* Hexagonal Nut Body */}
                          <circle cx={nx} cy={ny} r="3.2" fill={`url(#chromeStud-${idx})`} stroke="#0F172A" strokeWidth="0.8" />
                          {/* Threaded Center Bolt Stud */}
                          <circle cx={nx} cy={ny} r="1.3" fill="#0A0F14" />
                          <circle cx={r2(nx - 0.5)} cy={r2(ny - 0.5)} r="0.5" fill="#FFFFFF" />
                        </g>
                      );
                    })}

                    {/* --------------------------------------------------------
                        H. PRECISION MACHINED GOLD ACCENT BEZEL RING
                        -------------------------------------------------------- */}
                    <circle cx="180" cy="180" r="118" fill="none" stroke={`url(#goldRingGrad-${idx})`} strokeWidth="2.5" />
                    <circle cx="180" cy="180" r="116" fill="none" stroke="#D49D28" strokeWidth="1" />
                    <circle cx="180" cy="180" r="114.5" fill="none" stroke="#FFFFFF" strokeWidth="0.6" strokeOpacity="0.7" />
                  </svg>

                  {/* ----------------------------------------------------------
                      10. CENTER WHEEL HUB DISC: Pure Focused Content
                      Deeply recessed in the rim with authentic depth!
                      ---------------------------------------------------------- */}
                  <div className="srtc-wheel-hub-content">
                    {/* Title */}
                    <h3 className="srtc-wheel-title">{step.title}</h3>

                    {/* Tagline */}
                    <p className="srtc-wheel-tagline">{step.tagline}</p>

                    {/* Description Paragraph */}
                    <p className="srtc-wheel-desc">{step.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ====================================================================
            CONTINUOUS ASPHALT HIGHWAY ROAD BASELINE
            The 4 heavy linehaul wheels roll directly on this highway surface!
            ==================================================================== */}
        <div className="srtc-highway-road" aria-hidden="true">
          <div className="srtc-highway-road__asphalt" />
          <div className="srtc-highway-road__lane-divider" />
        </div>
      </div>
    </section>
  );
}
