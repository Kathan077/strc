'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import './SRTCPreloader.css';

export default function SRTCPreloader({ forceShow = false }) {
  const pathname = usePathname();
  const [phase, setPhase] = useState('done');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Only run on root homepage '/'
    if (pathname !== '/' && !forceShow) {
      setPhase('done');
      document.body.style.overflow = '';
      document.body.classList.remove('srtc-preloader-active');
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);

    // 2. Query param skip=1
    if (urlParams.get('skip') === '1') {
      setPhase('done');
      try {
        sessionStorage.setItem('srtc_visited', 'true');
      } catch (e) {}
      document.body.style.overflow = '';
      document.body.classList.remove('srtc-preloader-active');
      return;
    }

    // 3. Remove any lingering freeze parameter from history to prevent freeze traps
    if (urlParams.has('freeze')) {
      urlParams.delete('freeze');
      const cleanSearch = urlParams.toString();
      const cleanUrl = window.location.pathname + (cleanSearch ? `?${cleanSearch}` : '');
      window.history.replaceState({}, '', cleanUrl);
    }

    // 4. Session Storage check: play ONCE per browser session
    const isReplay = urlParams.get('replay') === '1' || forceShow;
    try {
      const alreadyVisited = sessionStorage.getItem('srtc_visited');
      if (alreadyVisited === 'true' && !isReplay) {
        setPhase('done');
        document.body.style.overflow = '';
        document.body.classList.remove('srtc-preloader-active');
        return;
      }
    } catch (e) {
      // Ignore sessionStorage access errors
    }

    // Mark visited immediately so subsequent re-renders/subpages never show it
    try {
      sessionStorage.setItem('srtc_visited', 'true');
    } catch (e) {}

    // Initialize intro animation
    setPhase('wheel');
    setProgress(0);
    document.body.style.overflow = 'hidden';
    document.body.classList.add('srtc-preloader-active');

    // Drive progress bar smoothly 0 -> 100 in ~1.1s
    let cur = 0;
    const iv = setInterval(() => {
      cur += Math.floor(Math.random() * 10) + 8;
      if (cur >= 100) {
        cur = 100;
        clearInterval(iv);
      }
      setProgress(cur);
    }, 28);

    const safeCleanup = () => {
      setPhase('exit');
      setTimeout(() => {
        setPhase('done');
        if (typeof window !== 'undefined') {
          document.body.style.overflow = '';
          document.body.classList.remove('srtc-preloader-active');
        }
      }, 350);
    };

    // Crisp, fast, cinematic timeline:
    // 0-1.1s: Wheel spin
    // 1.1s-2.1s: Realistic truck sweep
    // 2.1s: Exit fade out
    // 2.45s: Completely done & unmounted
    const t1 = setTimeout(() => setPhase('truckSweep'), 1100);
    const t2 = setTimeout(() => setPhase('exit'), 2100);
    const t3 = setTimeout(() => safeCleanup(), 2450);
    // Hard emergency fallback timeout (max 3.2s)
    const tf = setTimeout(() => {
      setPhase('done');
      if (typeof window !== 'undefined') {
        document.body.style.overflow = '';
        document.body.classList.remove('srtc-preloader-active');
      }
    }, 3200);

    const onKey = (e) => {
      if (e.key === 'Escape') safeCleanup();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      clearInterval(iv);
      [t1, t2, t3, tf].forEach(clearTimeout);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      document.body.classList.remove('srtc-preloader-active');
    };
  }, [pathname, forceShow]);

  const handleSkip = () => {
    try {
      sessionStorage.setItem('srtc_visited', 'true');
    } catch (e) {}
    setPhase('exit');
    setTimeout(() => {
      setPhase('done');
      if (typeof window !== 'undefined') {
        document.body.style.overflow = '';
        document.body.classList.remove('srtc-preloader-active');
      }
    }, 300);
  };

  if (phase === 'done') return null;

  return (
    <div
      className={`srtc-preloader srtc-phase--${phase}`}
      role="status"
      aria-label="SRTC Logistics Loading"
    >
      {/* Skip button */}
      <button className="srtc-skip" onClick={handleSkip} type="button">
        SKIP <span>✕</span>
      </button>

      {/* Ambient background glow orbs */}
      <div className="srtc-orb srtc-orb--1" aria-hidden="true" />
      <div className="srtc-orb srtc-orb--2" aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════
          ACT 1 — SPINNING WHEEL (Heavy Truck Tire with Gold SRTC Hub)
          ═══════════════════════════════════════════════════════ */}
      <div className="srtc-wheel-stage" aria-hidden="true">
        {/* Brand Name Header matching reference */}
        <div className="srtc-brand-wrap">
          <h1 className="srtc-brand-title">
            <span className="srtc-brand-navy">SRTC</span>
            <span className="srtc-brand-gold">LOGISTICS</span>
          </h1>
          <div className="srtc-brand-tagline">FASTEST • SECURED • TRUSTABLE</div>
        </div>

        {/* Realistic Heavy Tire with Centered Hub Logo */}
        <div className="srtc-wheel-wrap">
          <div className="srtc-wheel-shadow" />
          <svg
            className="srtc-wheel-svg"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="tireTreadGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2c3038" />
                <stop offset="70%" stopColor="#181b20" />
                <stop offset="92%" stopColor="#0d0f12" />
                <stop offset="100%" stopColor="#060708" />
              </radialGradient>

              <radialGradient id="rimDeepDish" cx="42%" cy="38%" r="65%">
                <stop offset="0%" stopColor="#3d4b5c" />
                <stop offset="45%" stopColor="#1e2632" />
                <stop offset="85%" stopColor="#0f151c" />
                <stop offset="100%" stopColor="#080b0f" />
              </radialGradient>

              <linearGradient id="chromeBevel" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="25%" stopColor="#94a3b8" />
                <stop offset="50%" stopColor="#f8fafc" />
                <stop offset="75%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>

              <linearGradient id="goldRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff7c2" />
                <stop offset="30%" stopColor="#f5c842" />
                <stop offset="70%" stopColor="#d49b28" />
                <stop offset="100%" stopColor="#7a5108" />
              </linearGradient>

              <radialGradient id="hubCenterDark" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#0d2844" />
                <stop offset="60%" stopColor="#061626" />
                <stop offset="100%" stopColor="#020810" />
              </radialGradient>

              <filter id="hubGoldGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feFlood floodColor="#f5c842" floodOpacity="0.45" result="glowCol" />
                <feComposite in="glowCol" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <path
                id="sidewallArc"
                d="M250,250 m-202,0 a202,202 0 1,1 404,0 a202,202 0 1,1 -404,0"
              />
            </defs>

            {/* ── ROTATING TIRE & WHEEL RIM ── */}
            <g className="srtc-wheel-spin-group">
              {/* Outer Rubber Tire */}
              <circle cx="250" cy="250" r="246" fill="url(#tireTreadGrad)" />

              {/* 32 Heavy-Duty Radial Tread Lugs */}
              {Array.from({ length: 32 }).map((_, i) => {
                const angle = i * (360 / 32);
                return (
                  <g key={`tread-${i}`} transform={`rotate(${angle} 250 250)`}>
                    <rect x="243" y="4" width="14" height="24" rx="3.5" fill="#2d333d" />
                    <rect x="246" y="7" width="8" height="18" rx="2" fill="#15181d" />
                    <line x1="250" y1="4" x2="250" y2="28" stroke="#080a0c" strokeWidth="1.5" />
                    <rect x="244" y="29" width="12" height="11" rx="2" fill="#20252d" />
                  </g>
                );
              })}

              {/* Sidewall Mold Lines */}
              <circle cx="250" cy="250" r="224" fill="none" stroke="#2a3340" strokeWidth="2.5" opacity="0.75" />
              <circle cx="250" cy="250" r="214" fill="none" stroke="#141a22" strokeWidth="1.5" />

              {/* Sidewall Embossed Markings */}
              <text
                fill="#4a5d75"
                fontSize="9.5"
                fontFamily="'Segoe UI', Arial, sans-serif"
                fontWeight="800"
                letterSpacing="3.5"
                opacity="0.95"
              >
                <textPath href="#sidewallArc" startOffset="1%">
                  ★ SRTC LINEHAUL ★ 295/80 R22.5 ★ RADIAL TUBELESS ★ MAX LOAD 3750 KG ★ HIGHWAY FLEET ★
                </textPath>
              </text>

              {/* Polished Chrome Alloy Rim Lip */}
              <circle cx="250" cy="250" r="186" fill="url(#chromeBevel)" />
              <circle cx="250" cy="250" r="177" fill="url(#rimDeepDish)" />
              <circle cx="250" cy="250" r="169" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />

              {/* 10 Contoured Wheel Spokes / Vent Openings */}
              {Array.from({ length: 10 }).map((_, i) => {
                const a = i * 36;
                return (
                  <g key={`spoke-${i}`} transform={`rotate(${a} 250 250)`}>
                    {/* Alloy Spoke Body */}
                    <path
                      d="M 242 96 Q 246 88 250 86 Q 254 88 258 96 L 263 175 Q 250 171 237 175 Z"
                      fill="url(#chromeBevel)"
                      stroke="rgba(0,0,0,0.35)"
                      strokeWidth="0.8"
                    />
                    {/* Spoke Vent Cutout */}
                    <path
                      d="M 230 102 Q 250 92 270 102 L 275 120 Q 250 113 225 120 Z"
                      fill="#060c14"
                      stroke="#1e2c3c"
                      strokeWidth="0.8"
                    />
                  </g>
                );
              })}

              {/* 10 Heavy Commercial Lug Nuts */}
              {Array.from({ length: 10 }).map((_, i) => {
                const a = i * 36 + 18;
                return (
                  <g key={`lug-${i}`} transform={`rotate(${a} 250 250)`}>
                    <circle cx="250" cy="142" r="8.5" fill="url(#chromeBevel)" stroke="#0b131c" strokeWidth="1.5" />
                    <circle cx="250" cy="142" r="3.8" fill="#04080e" />
                    <circle cx="250" cy="142" r="1.5" fill="rgba(255,255,255,0.6)" />
                  </g>
                );
              })}

              {/* ── CENTRAL HUB (Polished Gold Ring + Dark Navy Face) ── */}
              {/* Outer 24K Gold Ring matching reference image */}
              <circle cx="250" cy="250" r="67" fill="url(#goldRingGrad)" filter="url(#hubGoldGlow)" />
              <circle cx="250" cy="250" r="61" fill="#030b14" />
              <circle cx="250" cy="250" r="57" fill="url(#hubCenterDark)" stroke="url(#goldRingGrad)" strokeWidth="2.5" />
              <circle cx="250" cy="250" r="50" fill="none" stroke="rgba(245,200,66,0.3)" strokeWidth="1" />

              {/* Official SRTC Falcon Crest / Emblem in Center of Hub */}
              <g transform="translate(250, 250)">
                <image
                  href="/images/logo/srtc-logo.png"
                  x="-38"
                  y="-40"
                  width="76"
                  height="76"
                  preserveAspectRatio="xMidYMid meet"
                />
              </g>
            </g>
          </svg>
        </div>

        {/* Minimal Progress Bar (NO NUMBERS as requested) */}
        <div className="srtc-hud">
          <div className="srtc-hud-bar">
            <div className="srtc-hud-fill" style={{ width: `${progress}%` }} />
            <div className="srtc-hud-glow" style={{ left: `${progress}%` }} />
          </div>
          <div className="srtc-hud-status">HIGHWAY TELEMETRY • INITIALIZING FLEET</div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          ACT 2 — TRUCK STAGE (Ultra-Realistic 18-Wheeler Semi Truck)
          ═══════════════════════════════════════════════════════ */}
      <div className="srtc-truck-stage" aria-hidden="true">
        {/* Realistic Modern Highway with Scrolling Dashed Lanes */}
        <div className="srtc-road">
          <div className="srtc-road-surface">
            <div className="srtc-road-dash-wrap">
              {Array.from({ length: 26 }).map((_, i) => (
                <div key={`dash-${i}`} className="srtc-road-dash" />
              ))}
            </div>
          </div>
        </div>

        {/* ── TRUCK VIEWPORT & SVG ── */}
        <div className="srtc-truck-viewport">
          <svg
            className="srtc-truck-svg"
            viewBox="0 0 1400 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Container Exterior Gradients */}
              <linearGradient id="containerBody" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f3454" />
                <stop offset="35%" stopColor="#0a2540" />
                <stop offset="80%" stopColor="#061a2e" />
                <stop offset="100%" stopColor="#030e1c" />
              </linearGradient>

              {/* Cab Gradient */}
              <linearGradient id="cabBody" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#184b75" />
                <stop offset="30%" stopColor="#0d3559" />
                <stop offset="75%" stopColor="#08223a" />
                <stop offset="100%" stopColor="#041220" />
              </linearGradient>

              {/* Pure Metallic Chrome */}
              <linearGradient id="truckChrome" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="25%" stopColor="#cbd5e1" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="75%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>

              {/* Gold Lettering Gradient */}
              <linearGradient id="truckGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fff7c2" />
                <stop offset="30%" stopColor="#f5c842" />
                <stop offset="70%" stopColor="#d49b28" />
                <stop offset="100%" stopColor="#8c5806" />
              </linearGradient>

              {/* Glass Windshield */}
              <linearGradient id="windshieldGlass" x1="0%" y1="0%" x2="30%" y2="100%">
                <stop offset="0%" stopColor="#14466d" />
                <stop offset="45%" stopColor="#09253d" />
                <stop offset="100%" stopColor="#03101c" />
              </linearGradient>

              {/* Heavy Truck Tire Radial (Smooth Authentic Rubber) */}
              <radialGradient id="sideTire" cx="44%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#2e333d" />
                <stop offset="65%" stopColor="#171a20" />
                <stop offset="92%" stopColor="#0c0d10" />
                <stop offset="100%" stopColor="#050608" />
              </radialGradient>

              {/* Alcoa Alloy Wheel Rim */}
              <linearGradient id="alcoaRim" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f1f5f9" />
                <stop offset="35%" stopColor="#94a3b8" />
                <stop offset="70%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>

              {/* Wheel Contact Patch Blur */}
              <filter id="groundBlur" x="-10%" y="-30%" width="120%" height="160%">
                <feGaussianBlur stdDeviation="6" />
              </filter>

              {/* Headlight Projector Glow */}
              <filter id="headlightBeamGlow">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feFlood floodColor="#fff8db" floodOpacity="0.85" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ── GROUND CONTACT SHADOWS (Locks wheels to road) ── */}
            <ellipse cx="680" cy="281" rx="630" ry="10" fill="rgba(0,0,0,0.45)" filter="url(#groundBlur)" />
            {/* Wheel Contact Occlusion Patches */}
            {[125, 215, 305, 935, 1030, 1225].map((cx, i) => (
              <ellipse key={`patch-${i}`} cx={cx} cy="280" rx="28" ry="3.5" fill="rgba(0,0,0,0.95)" />
            ))}

            {/* ═══════════════════════════════════════════════════
                PART A: 40FT CONTAINER SEMI-TRAILER
                ═══════════════════════════════════════════════════ */}
            <g id="srtc-trailer-group">
              {/* Rear ICC Underrun Bumper & Mudflaps */}
              <rect x="42" y="246" width="10" height="30" rx="2" fill="#2d3748" />
              <rect x="44" y="254" width="6" height="24" rx="1.5" fill="#0f172a" />
              <rect x="40" y="250" width="3" height="12" rx="1" fill="#ef4444" />

              {/* Main Container Body */}
              <rect x="55" y="48" width="815" height="188" rx="3" fill="url(#containerBody)" />
              {/* Container Top & Bottom Reinforcement Rails */}
              <rect x="55" y="48" width="815" height="7" rx="1.5" fill="url(#truckChrome)" opacity="0.3" />
              <rect x="55" y="229" width="815" height="7" fill="url(#truckChrome)" opacity="0.25" />

              {/* Steel Corrugated Side Panels (Every 22px) */}
              {Array.from({ length: 33 }).map((_, i) => {
                const rx = 80 + i * 22;
                return (
                  <g key={`corrugation-${i}`}>
                    <line x1={rx} y1="55" x2={rx} y2="229" stroke="#040f1a" strokeWidth="4.5" />
                    <line x1={rx + 1.5} y1="55" x2={rx + 1.5} y2="229" stroke="rgba(255,255,255,0.06)" strokeWidth="1.2" />
                  </g>
                );
              })}

              {/* Cast Steel Corner Castings (with twistlocks) */}
              {/* Top Left */}
              <rect x="55" y="48" width="20" height="24" rx="2" fill="#030b14" stroke="#1e293b" strokeWidth="1" />
              <ellipse cx="65" cy="60" rx="4.5" ry="3" fill="#0e1726" />
              {/* Top Right */}
              <rect x="850" y="48" width="20" height="24" rx="2" fill="#030b14" stroke="#1e293b" strokeWidth="1" />
              <ellipse cx="860" cy="60" rx="4.5" ry="3" fill="#0e1726" />
              {/* Bottom Left */}
              <rect x="55" y="212" width="20" height="24" rx="2" fill="#030b14" stroke="#1e293b" strokeWidth="1" />
              <ellipse cx="65" cy="224" rx="4.5" ry="3" fill="#0e1726" />
              {/* Bottom Right */}
              <rect x="850" y="212" width="20" height="24" rx="2" fill="#030b14" stroke="#1e293b" strokeWidth="1" />
              <ellipse cx="860" cy="224" rx="4.5" ry="3" fill="#0e1726" />

              {/* ── OFFICIAL SRTC CONTAINER BRANDING (PROPORTIONED & CLEAN) ── */}
              {/* Left Logo Emblem */}
              <g transform="translate(85, 78)">
                <circle cx="55" cy="55" r="50" fill="#05172a" stroke="url(#truckGold)" strokeWidth="2.5" />
                <circle cx="55" cy="55" r="44" fill="none" stroke="rgba(245,200,66,0.3)" strokeWidth="1" />
                <image
                  href="/images/logo/srtc-logo.png"
                  x="18"
                  y="12"
                  width="74"
                  height="74"
                  preserveAspectRatio="xMidYMid meet"
                />
              </g>

              {/* Right Branding Text Panel (x=210 to 830) */}
              <line x1="215" y1="88" x2="830" y2="88" stroke="rgba(245,200,66,0.4)" strokeWidth="1.8" />
              <line x1="215" y1="182" x2="830" y2="182" stroke="rgba(245,200,66,0.4)" strokeWidth="1.8" />

              {/* SRTC LOGISTICS (Primary Header) */}
              <text
                x="525"
                y="140"
                textAnchor="middle"
                fill="url(#truckGold)"
                fontFamily="'Arial Black', 'Segoe UI Black', Impact, sans-serif"
                fontWeight="900"
                fontSize="50"
                letterSpacing="6"
              >
                SRTC LOGISTICS
              </text>

              {/* Taglines */}
              <text
                x="525"
                y="166"
                textAnchor="middle"
                fill="#b8d2eb"
                fontFamily="'Segoe UI', Arial, sans-serif"
                fontWeight="700"
                fontSize="12.5"
                letterSpacing="4"
              >
                PAN-INDIA LINEHAUL  •  48-HR EXPRESS  •  HIGHWAY TELEMETRY
              </text>

              <text
                x="525"
                y="202"
                textAnchor="middle"
                fill="rgba(245,200,66,0.55)"
                fontFamily="'Segoe UI', monospace"
                fontWeight="700"
                fontSize="9.5"
                letterSpacing="3"
              >
                SHREE RAM TRANSPORTATION CORP.  •  EST. 2003
              </text>

              {/* Conspicuity Reflective Safety Tape (Red & White) */}
              {Array.from({ length: 38 }).map((_, i) => (
                <rect
                  key={`tape-${i}`}
                  x={58 + i * 21}
                  y="233"
                  width="13"
                  height="5.5"
                  rx="0.8"
                  fill={i % 2 === 0 ? '#ef4444' : '#f8fafc'}
                  opacity="0.95"
                />
              ))}

              {/* Trailer Chassis I-Beam Frame */}
              <rect x="50" y="238" width="825" height="11" rx="1.5" fill="#091420" />
              <rect x="50" y="238" width="825" height="3" fill="#1e2c3d" opacity="0.6" />

              {/* Trailer Landing Gear with Crank Handle */}
              <g id="landing-gear" transform="translate(730, 246)">
                <rect x="0" y="0" width="12" height="28" rx="1.5" fill="#1e293b" />
                <rect x="-6" y="27" width="24" height="4.5" rx="1" fill="#0f172a" />
                <line x1="6" y1="6" x2="-14" y2="18" stroke="#475569" strokeWidth="2.5" />
              </g>

              {/* Mudguard Arch Over 3 Trailer Axles */}
              <path
                d="M 85 248 Q 130 220 215 220 Q 300 220 345 248"
                fill="none"
                stroke="#040a12"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </g>

            {/* ═══════════════════════════════════════════════════
                PART B: PRIME MOVER TRACTOR CAB (Authentic Architectural Layout)
                ═══════════════════════════════════════════════════ */}
            <g id="srtc-tractor-group">
              {/* Fifth Wheel Trailer Hitch Coupling */}
              <rect x="850" y="236" width="38" height="9" rx="2" fill="#1a2533" />
              <ellipse cx="870" cy="240" rx="15" ry="4" fill="#334155" />

              {/* Dual Vertical Polished Chrome Exhaust Stacks */}
              <rect x="878" y="20" width="10" height="226" rx="3" fill="url(#truckChrome)" />
              <rect x="886" y="28" width="6" height="218" rx="2" fill="url(#truckChrome)" opacity="0.6" />
              {/* Curved Exhaust Stack Tip */}
              <path
                d="M 878 20 Q 878 8 894 8"
                fill="none"
                stroke="url(#truckChrome)"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <ellipse cx="895" cy="8" rx="5" ry="2.5" fill="#475569" />

              {/* Cab Main Body (Aerodynamic High-Roof Heavy Tractor) */}
              <path
                d="M 895 190
                   L 895 50
                   L 1150 44
                   Q 1195 48 1215 85
                   L 1255 160
                   L 1272 235
                   L 1272 275
                   L 895 275
                   Z"
                fill="url(#cabBody)"
                stroke="#06192a"
                strokeWidth="2"
              />

              {/* High-Roof Aerodynamic Air Deflector Fairing */}
              <path
                d="M 895 50
                   L 1150 44
                   L 1180 82
                   L 895 82
                   Z"
                fill="#164870"
                opacity="0.85"
              />
              <path
                d="M 900 54 L 1140 48 L 1165 76 L 900 76 Z"
                fill="rgba(255,255,255,0.06)"
              />

              {/* Aerodynamic Sun Visor with Amber LED Clearance Markers */}
              <path
                d="M 1180 82 L 1258 82 L 1252 92 L 1180 92 Z"
                fill="url(#truckGold)"
              />
              {[1192, 1206, 1220, 1234, 1248].map((lx, li) => (
                <circle key={`marker-${li}`} cx={lx} cy="87" r="2.8" fill="#fbbf24" />
              ))}

              {/* Angled Windshield Glass (Front-facing) */}
              <path
                d="M 1188 92
                   L 1242 92
                   L 1256 160
                   L 1198 160
                   Z"
                fill="url(#windshieldGlass)"
                stroke="#38bdf8"
                strokeWidth="1.5"
              />
              {/* Windshield Glare Reflection */}
              <path
                d="M 1200 98 L 1222 98 L 1228 126 L 1206 126 Z"
                fill="rgba(255,255,255,0.09)"
              />
              {/* Windshield Wiper */}
              <line x1="1208" y1="156" x2="1252" y2="156" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />

              {/* ── DRIVER CABIN DOOR & WINDOW (Directly behind windshield) ── */}
              {/* Driver Side Window */}
              <path
                d="M 1105 96
                   L 1182 96
                   L 1192 160
                   L 1105 160
                   Z"
                fill="url(#windshieldGlass)"
                stroke="#38bdf8"
                strokeWidth="1.2"
              />
              {/* Driver Silhouette Inside */}
              <ellipse cx="1145" cy="128" rx="11" ry="14" fill="#040e18" opacity="0.85" />
              <path d="M 1128 160 Q 1145 146 1162 160" fill="#040e18" opacity="0.85" />

              {/* Door Panel Outline */}
              <rect x="1100" y="92" width="96" height="150" rx="3" fill="none" stroke="#041220" strokeWidth="2" />
              {/* Chrome Door Pull Handle */}
              <rect x="1110" y="172" width="20" height="5" rx="2" fill="url(#truckChrome)" />

              {/* Aerodynamic Side Mirror Bracket & Tall Mirror */}
              <g id="side-mirror" transform="translate(1248, 108)">
                <rect x="0" y="0" width="8" height="44" rx="2.5" fill="url(#truckChrome)" />
                <line x1="-10" y1="8" x2="0" y2="8" stroke="#1e293b" strokeWidth="3" />
                <line x1="-8" y1="36" x2="0" y2="36" stroke="#1e293b" strokeWidth="2.5" />
              </g>

              {/* ── SLEEPER BERTH COMPARTMENT (x=895 to 1100) ── */}
              {/* Sleeper Window */}
              <rect x="945" y="106" width="62" height="42" rx="4" fill="url(#windshieldGlass)" stroke="#38bdf8" strokeWidth="1" />
              {/* Sleeper Air Vent Louvers */}
              {[158, 166, 174].map((ly, li) => (
                <line key={`vent-${li}`} x1="950" y1={ly} x2="1000" y2={ly} stroke="#091b2c" strokeWidth="2" />
              ))}

              {/* Golden Cab Body Stripe */}
              <line x1="895" y1="228" x2="1272" y2="228" stroke="url(#truckGold)" strokeWidth="3.5" />

              {/* Golden "SRTC" Insignia on Sleeper */}
              <text
                x="980"
                y="218"
                textAnchor="middle"
                fill="url(#truckGold)"
                fontFamily="'Arial Black', sans-serif"
                fontWeight="900"
                fontSize="16"
                letterSpacing="2.5"
              >
                SRTC
              </text>

              {/* Cylindrical Aluminum Fuel Tank with Chrome Straps */}
              <g id="fuel-tank" transform="translate(1070, 240)">
                <rect x="0" y="0" width="85" height="34" rx="7" fill="#13212e" stroke="#2c4257" strokeWidth="1.5" />
                <line x1="22" y1="0" x2="22" y2="34" stroke="url(#truckChrome)" strokeWidth="3" />
                <line x1="63" y1="0" x2="63" y2="34" stroke="url(#truckChrome)" strokeWidth="3" />
                <circle cx="14" cy="3" r="4" fill="url(#truckChrome)" />
              </g>

              {/* Driver Access Steps (Perforated Aluminum Ladder) */}
              <g id="cab-steps" transform="translate(1160, 248)">
                <rect x="0" y="0" width="22" height="4.5" rx="1" fill="url(#truckChrome)" />
                <rect x="0" y="14" width="22" height="4.5" rx="1" fill="url(#truckChrome)" />
              </g>

              {/* Curved Wheel Arch Mudguards over Drive Wheels and Front Wheel */}
              <path
                d="M 900 248 Q 935 220 985 220 Q 1035 220 1070 248"
                fill="none"
                stroke="#040a12"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M 1188 248 Q 1225 220 1262 248"
                fill="none"
                stroke="#040a12"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Front Aerodynamic Sculpted Bumper & Chrome Grille */}
              <path
                d="M 1250 240
                   L 1282 240
                   L 1284 276
                   L 1245 276
                   Z"
                fill="#071829"
                stroke="url(#truckGold)"
                strokeWidth="1.5"
              />
              {/* Chrome Grille Slats */}
              <rect x="1264" y="212" width="16" height="62" rx="3" fill="#040c14" stroke="#1e344f" strokeWidth="1.5" />
              {[220, 230, 240, 250, 260].map((gy, gi) => (
                <line key={`grille-${gi}`} x1="1266" y1={gy} x2="1278" y2={gy} stroke="url(#truckChrome)" strokeWidth="2" />
              ))}

              {/* Projector LED Headlights & Beam */}
              <rect x="1264" y="206" width="16" height="4" rx="1.5" fill="#93c5fd" opacity="0.9" />
              <rect
                x="1264"
                y="214"
                width="18"
                height="16"
                rx="3"
                fill="#fffde0"
                filter="url(#headlightBeamGlow)"
              />
              <rect x="1264" y="234" width="16" height="5" rx="1" fill="#f59e0b" />
            </g>

            {/* ═══════════════════════════════════════════════════
                PART C: 6 COMMERCIAL 22.5" WHEELS (3 Trailer + 3 Tractor)
                Each Wheel has Smooth Authentic Rubber Tire, Alcoa Rim, Rotating Spoke/Vent Group, Hub
                ═══════════════════════════════════════════════════ */}
            {[125, 215, 305, 935, 1030, 1225].map((cx, wi) => (
              <g key={`truck-wheel-${wi}`} transform={`translate(${cx}, 246)`}>
                {/* 1. Heavy Rubber Tire (cy=246, r=34 => bottom touches ground at 280) */}
                <circle cx="0" cy="0" r="34" fill="url(#sideTire)" />
                <circle cx="0" cy="0" r="34" fill="none" stroke="#05070a" strokeWidth="2" />
                {/* Authentic Radial Sidewall Grooves */}
                <circle cx="0" cy="0" r="32" fill="none" stroke="#252b36" strokeWidth="1.8" />
                <circle cx="0" cy="0" r="28" fill="none" stroke="#10141a" strokeWidth="1" />

                {/* 2. Alcoa Forged Alloy Rim */}
                <circle cx="0" cy="0" r="23" fill="url(#alcoaRim)" />
                <circle cx="0" cy="0" r="21" fill="#1e2733" />

                {/* 3. ROTATING SPOKE & VENT HOLE GROUP (Rolls at vehicle speed) */}
                <g className="srtc-truck-wheel-spin">
                  {/* 10 Circular Vent Holes */}
                  {Array.from({ length: 10 }).map((_, vi) => {
                    const va = (vi * 36 * Math.PI) / 180;
                    const vx = (Math.cos(va) * 14.5).toFixed(1);
                    const vy = (Math.sin(va) * 14.5).toFixed(1);
                    return <circle key={`vent-${vi}`} cx={vx} cy={vy} r="2.6" fill="#0b1118" stroke="#334155" strokeWidth="0.8" />;
                  })}

                  {/* 10 Chrome Studs / Lug Nuts */}
                  {Array.from({ length: 10 }).map((_, li) => {
                    const la = ((li * 36 + 18) * Math.PI) / 180;
                    const lx = (Math.cos(la) * 8.5).toFixed(1);
                    const ly = (Math.sin(la) * 8.5).toFixed(1);
                    return <circle key={`lug-${li}`} cx={lx} cy={ly} r="1.4" fill="url(#truckChrome)" />;
                  })}

                  {/* Central Heavy Hub Oil Cap */}
                  <circle cx="0" cy="0" r="5.5" fill="#071320" stroke="url(#truckGold)" strokeWidth="1.2" />
                  <circle cx="0" cy="0" r="2.2" fill="url(#truckGold)" />
                </g>
              </g>
            ))}

            {/* Ground Line Reference (Matches road top) */}
            <line x1="0" y1="280" x2="1400" y2="280" stroke="rgba(245,200,66,0.3)" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Ambient speed flare */}
        <div className="srtc-speed-flare" aria-hidden="true" />
      </div>
    </div>
  );
}
