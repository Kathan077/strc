'use client';

import React, { useState, useEffect, useRef, memo } from 'react';

// Helper to prevent floating-point SSR hydration mismatch
const r2 = (num) => Math.round(num * 100) / 100;

function CodedTruckRealistic({ isDipper = false }) {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(true);

  // Auto-pause heavy GPU SVG animations when truck is offscreen
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '120px' }
    );
    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  // 28 Vertical corrugation ribs for the 40ft container (100% untouched)
  const containerRibs = Array.from({ length: 28 }, (_, i) => 105 + i * 28);

  // Wheel configurations (6 Axles: 3 Trailer + 2 Tractor Drive + 1 Tractor Steer)
  const wheelPositions = [
    { cx: 160, cy: 372 }, // Trailer Axle 1 (100% Untouched)
    { cx: 250, cy: 372 }, // Trailer Axle 2 (100% Untouched)
    { cx: 340, cy: 372 }, // Trailer Axle 3 (100% Untouched)
    { cx: 975, cy: 372 }, // Tractor Drive Axle 1 (Tandem)
    { cx: 1065, cy: 372 }, // Tractor Drive Axle 2 (Tandem)
    { cx: 1230, cy: 372 }, // Tractor Steer Axle (Centered in front steer wheel well)
  ];

  return (
    <div
      ref={containerRef}
      className={`sitc-coded-truck-wrap ${isDipper ? 'is-dipper-active' : ''} ${!isInView ? 'is-truck-paused' : ''}`}
    >
      <svg
        viewBox="0 0 1440 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="sitc-truck-svg"
        aria-label="SRTC Logistics Heavy Commercial Highway Container Truck"
      >
        <defs>
          {/* ===============================================================
              INLINE ANIMATION STYLES (Self-contained, cross-browser bulletproof)
              =============================================================== */}
          <style>{`
            .is-truck-paused * {
              animation-play-state: paused !important;
            }
            @keyframes sitcWheelSpinClockwise {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .sitc-wheel-spin {
              animation: sitcWheelSpinClockwise 0.8s linear infinite;
              transform-box: view-box;
            }
            @keyframes sitcHighwayDashScroll {
              0% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: 240px; }
            }
            .sitc-highway-road-dashes {
              animation: sitcHighwayDashScroll 0.8s linear infinite;
            }
            .sitc-highway-shoulder-dashes {
              animation: sitcHighwayDashScroll 0.8s linear infinite;
            }
            @keyframes sitcAirflowSpeedStreak {
              0% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: 480px; }
            }
            .sitc-speed-streak-1 { animation: sitcAirflowSpeedStreak 0.7s linear infinite; }
            .sitc-speed-streak-2 { animation: sitcAirflowSpeedStreak 0.9s linear infinite; }
            .sitc-speed-streak-3 { animation: sitcAirflowSpeedStreak 0.55s linear infinite; }
            @keyframes sitcDustPlume {
              0% {
                transform: translate(0, 0) scale(0.6);
                opacity: 0;
              }
              20% {
                opacity: 0.55;
              }
              60% {
                opacity: 0.35;
                transform: translate(-35px, -6px) scale(1.35);
              }
              100% {
                transform: translate(-75px, -12px) scale(2.2);
                opacity: 0;
              }
            }
            .sitc-dust-puff {
              animation: sitcDustPlume 0.9s cubic-bezier(0.2, 0.6, 0.4, 1) infinite;
              transform-box: view-box;
              transform-origin: center center;
            }
            .sitc-dust-puff-1 { animation-delay: 0s; }
            .sitc-dust-puff-2 { animation-delay: 0.22s; }
            .sitc-dust-puff-3 { animation-delay: 0.45s; }
            .sitc-dust-puff-4 { animation-delay: 0.68s; }
            .sitc-dust-tractor-1 { animation-delay: 0.15s; }
            .sitc-dust-tractor-2 { animation-delay: 0.58s; }
            @keyframes sitcRoadDroplet {
              0% { transform: translate(0, 0); opacity: 0.8; }
              100% { transform: translate(-60px, -4px); opacity: 0; }
            }
            .sitc-spray-drop {
              animation: sitcRoadDroplet 0.45s linear infinite;
              transform-box: view-box;
            }
            .sitc-spray-drop-1 { animation-delay: 0s; }
            .sitc-spray-drop-2 { animation-delay: 0.15s; }
            .sitc-spray-drop-3 { animation-delay: 0.3s; }
            @keyframes sitcChassisMicroRumble {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-0.45px); }
            }
            .sitc-truck-cruising-body {
              animation: sitcChassisMicroRumble 0.22s ease-in-out infinite;
              transform-origin: center center;
            }
          `}</style>

          {/* ===============================================================
              GRADIENTS & FILTERS
              =============================================================== */}
          {/* Prime Mover Cabin Deep Navy Automotive Metallic Gradient */}
          <linearGradient id="cabMetallicNavy" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#1E527B" />
            <stop offset="25%" stopColor="#0F3859" />
            <stop offset="60%" stopColor="#0B2F4A" />
            <stop offset="90%" stopColor="#072033" />
            <stop offset="100%" stopColor="#03111C" />
          </linearGradient>

          {/* Cabin Side Panel Highlight (Adds 3D Curvature to Doors & Cab Wall) */}
          <linearGradient id="cabPanelShading" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1B4D73" />
            <stop offset="35%" stopColor="#0B2F4A" />
            <stop offset="80%" stopColor="#061D2E" />
            <stop offset="100%" stopColor="#030E17" />
          </linearGradient>

          {/* High-Roof Aerodynamic Wind Deflector Crown Gradient */}
          <linearGradient id="roofDeflectorGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#072033" />
            <stop offset="50%" stopColor="#0B2F4A" />
            <stop offset="100%" stopColor="#1E5D8E" />
          </linearGradient>

          {/* Heavy Commercial Bumper Metallic Industrial Charcoal */}
          <linearGradient id="bumperIndustrialGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="35%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Acoustic Tinted Automotive Windshield Glass */}
          <linearGradient id="windshieldGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#081E2E" stopOpacity="0.96" />
            <stop offset="45%" stopColor="#0E324C" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#051622" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#020A10" stopOpacity="1" />
          </linearGradient>

          {/* Windshield Daylight Glare Reflection Streak */}
          <linearGradient id="windshieldStreakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.65" />
            <stop offset="28%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>

          {/* Side Driver Window Glass Tint */}
          <linearGradient id="sideWindowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0D2E47" />
            <stop offset="55%" stopColor="#072033" />
            <stop offset="100%" stopColor="#020A10" />
          </linearGradient>

          {/* Ultra-Reflective Polished Chrome (Louvers, Mirrors, Door Handles) */}
          <linearGradient id="chromeUltraGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#F1F5F9" />
            <stop offset="48%" stopColor="#CBD5E1" />
            <stop offset="52%" stopColor="#94A3B8" />
            <stop offset="78%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* Golden Fleet Corporate Accent Pinstripe */}
          <linearGradient id="goldSpeedlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="50%" stopColor="#E8B94F" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>

          {/* White Container Fluted Steel Panel Gradient (Untouched) */}
          <linearGradient id="containerWhiteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="15%" stopColor="#FAFAFC" />
            <stop offset="85%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* Container Rails & Hardware Deep Navy (Untouched) */}
          <linearGradient id="containerRailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#071F33" />
            <stop offset="50%" stopColor="#0B2F4A" />
            <stop offset="100%" stopColor="#071F33" />
          </linearGradient>

          {/* Polished Aluminum Fuel Tank Gradient (Untouched) */}
          <linearGradient id="fuelTankGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="25%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#94A3B8" />
            <stop offset="85%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Alcoa Polished Alloy Rim Metallic Radial */}
          <radialGradient id="alloyRimGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="45%" stopColor="#E2E8F0" />
            <stop offset="75%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </radialGradient>

          {/* Heavy Radial Highway Tire Rubber */}
          <radialGradient id="tireRubberGrad" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="#1E293B" />
            <stop offset="85%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>

          {/* Highway Road Dust Plume Gradient */}
          <radialGradient id="dustCloudGrad" cx="60%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#CBD5E1" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#94A3B8" stopOpacity="0.25" />
            <stop offset="80%" stopColor="#94A3B8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#94A3B8" stopOpacity="0" />
          </radialGradient>

          {/* Headlight Low-Beam Light Cone */}
          <linearGradient id="headlightLowBeamGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
            <stop offset="15%" stopColor="#E0F2FE" stopOpacity="0.65" />
            <stop offset="55%" stopColor="#38BDF8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>

          {/* Headlight High-Beam Dipper Cone */}
          <linearGradient id="dipperBeamGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="12%" stopColor="#FFF1A8" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#E8B94F" stopOpacity="0.75" />
            <stop offset="65%" stopColor="#38BDF8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>

          {/* Headlight Road Reflection Glow */}
          <radialGradient id="roadLightPuddleGrad" cx="20%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#FFF1A8" stopOpacity={isDipper ? '0.75' : '0.35'} />
            <stop offset="40%" stopColor="#38BDF8" stopOpacity={isDipper ? '0.45' : '0.15'} />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </radialGradient>

          {/* Soft Ground Ambient Occlusion Shadow */}
          <radialGradient id="wheelGroundShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0B2F4A" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#0F172A" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Projector Lens Glow Filter */}
          <filter id="lensGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation={isDipper ? '10' : '4'} result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ===================================================================
            LAYER 0: HIGHWAY ROAD SURFACE, SCENIC MOTION & DASHED MARKINGS
            (Animated in physical sync with wheel RPM for genuine driving feel)
            =================================================================== */}
        {/* Subtle Atmospheric High-Speed Airflow Streaks in Background */}
        <g id="highway-speed-streaks" opacity="0.32">
          <line x1="-120" y1="65" x2="1560" y2="65" stroke="#38BDF8" strokeWidth="1" strokeDasharray="60 180" className="sitc-speed-streak-1" />
          <line x1="-120" y1="82" x2="1560" y2="82" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="40 220" className="sitc-speed-streak-2" />
          <line x1="-120" y1="398" x2="1560" y2="398" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="50 150" className="sitc-speed-streak-3" />
        </g>

        {/* Solid Highway Guide Surface Line */}
        <line
          x1="-100"
          y1="412"
          x2="1540"
          y2="412"
          stroke="#E2E8F0"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* High-Velocity Scrolling Highway Dashed Center Line */}
        <line
          x1="-100"
          y1="412"
          x2="1540"
          y2="412"
          stroke="#94A3B8"
          strokeWidth="2.5"
          strokeDasharray="45 35"
          strokeLinecap="round"
          className="sitc-highway-road-dashes"
          opacity="0.85"
        />

        {/* Lower Shoulder Rumble Strip / Road Edge Markings */}
        <line
          x1="-100"
          y1="417"
          x2="1540"
          y2="417"
          stroke="#CBD5E1"
          strokeWidth="1.2"
          strokeDasharray="18 22"
          strokeLinecap="round"
          className="sitc-highway-shoulder-dashes"
          opacity="0.6"
        />

        {/* Road Surface Light Puddle Illuminated by Headlights */}
        <ellipse cx="1340" cy="412" rx="140" ry="14" fill="url(#roadLightPuddleGrad)" />

        {/* ===================================================================
            LAYER 1: VOLUMETRIC HEADLIGHT BEAM CONE
            =================================================================== */}
        <polygon
          points="1295,335 1440,250 1440,412 1295,350"
          fill="url(#headlightLowBeamGrad)"
          opacity="0.75"
        />

        {isDipper && (
          <g className="sitc-dipper-cone-burst">
            <polygon
              points="1295,330 1440,190 1440,432 1295,355"
              fill="url(#dipperBeamGrad)"
            />
            <polygon
              points="1295,336 1440,280 1440,365 1295,348"
              fill="#FFFFFF"
              opacity="0.9"
            />
          </g>
        )}

        {/* ===================================================================
            LAYER 2: UNDERBODY GROUND SHADOWS & REALISTIC HIGHWAY DUST SPRAY
            =================================================================== */}
        <ellipse cx="710" cy="410" rx="630" ry="11" fill="url(#wheelGroundShadow)" opacity="0.65" />
        <ellipse cx="1110" cy="410" rx="230" ry="13" fill="url(#wheelGroundShadow)" opacity="0.85" />

        {wheelPositions.map((pos, idx) => (
          <ellipse
            key={`shadow-${idx}`}
            cx={pos.cx}
            cy="411"
            rx="46"
            ry="7.5"
            fill="url(#wheelGroundShadow)"
            opacity="0.95"
          />
        ))}

        {/* -------------------------------------------------------------
            AUTHENTIC HIGHWAY DUST & ROAD SPRAY PLUMES
            (Subtle highway mist & road kick-up behind spinning tires)
            ------------------------------------------------------------- */}
        <g id="highway-road-dust">
          {/* Dust Plumes Behind Trailer Wheels (x: 50 to 130) */}
          <ellipse cx="105" cy="404" rx="14" ry="7" fill="url(#dustCloudGrad)" className="sitc-dust-puff sitc-dust-puff-1" />
          <ellipse cx="118" cy="407" rx="11" ry="5.5" fill="url(#dustCloudGrad)" className="sitc-dust-puff sitc-dust-puff-2" />
          <ellipse cx="94" cy="402" rx="16" ry="8" fill="url(#dustCloudGrad)" className="sitc-dust-puff sitc-dust-puff-3" />
          <ellipse cx="126" cy="406" rx="12" ry="6" fill="url(#dustCloudGrad)" className="sitc-dust-puff sitc-dust-puff-4" />

          {/* High-Velocity Droplets / Road Mist Streaks from Trailer Tires */}
          <ellipse cx="98" cy="409" rx="3.5" ry="1.2" fill="#94A3B8" className="sitc-spray-drop sitc-spray-drop-1" />
          <ellipse cx="88" cy="410.5" rx="4.5" ry="1" fill="#CBD5E1" className="sitc-spray-drop sitc-spray-drop-2" />
          <ellipse cx="108" cy="408.5" rx="2.5" ry="1" fill="#94A3B8" className="sitc-spray-drop sitc-spray-drop-3" />

          {/* Underbody Road Spray Behind Tractor Tandem Mudflaps */}
          <ellipse cx="920" cy="405" rx="12" ry="6" fill="url(#dustCloudGrad)" className="sitc-dust-puff sitc-dust-tractor-1" />
          <ellipse cx="932" cy="407" rx="10" ry="5" fill="url(#dustCloudGrad)" className="sitc-dust-puff sitc-dust-tractor-2" />
        </g>

        {/* ===================================================================
            LAYER 3, 4, 5: TRUCK CHASSIS, CONTAINER & CABIN
            (Subtle organic diesel chassis suspension micro-rumble)
            =================================================================== */}
        <g id="truck-main-cruising-body" className="sitc-truck-cruising-body">
          {/* ===============================================================
              LAYER 3: CHASSIS, FUEL TANK & TRAILER MECHANICALS (100% UNTOUCHED)
              =============================================================== */}
          {/* Heavy Steel I-Beam Chassis Rail */}
          <rect x="80" y="325" width="840" height="14" fill="#071F33" rx="2" />
          <line x1="80" y1="332" x2="920" y2="332" stroke="#1E3A54" strokeWidth="2" />

          {/* Dual Jost-Style Landing Gear Legs */}
          <g id="landing-gear">
            <rect x="448" y="335" width="10" height="42" fill="#0B2F4A" rx="2" />
            <rect x="466" y="335" width="10" height="42" fill="#071F33" rx="2" />
            <line x1="448" y1="340" x2="476" y2="370" stroke="#1E4E79" strokeWidth="3" />
            <rect x="442" y="374" width="22" height="6" fill="#1E293B" rx="1.5" />
            <rect x="460" y="374" width="22" height="6" fill="#0F172A" rx="1.5" />
          </g>

          {/* Polished Aluminum Cylindrical Fuel Tank */}
          <g id="diesel-fuel-tank">
            <rect
              x="510"
              y="332"
              width="125"
              height="38"
              rx="12"
              fill="url(#fuelTankGrad)"
              stroke="#64748B"
              strokeWidth="1.5"
            />
            <ellipse cx="522" cy="351" rx="10" ry="17" fill="#E2E8F0" stroke="#94A3B8" />
            <ellipse cx="522" cy="351" rx="6" ry="12" fill="#CBD5E1" />
            <rect x="540" y="330" width="5" height="42" fill="#0B2F4A" rx="1" />
            <rect x="600" y="330" width="5" height="42" fill="#0B2F4A" rx="1" />
            <rect x="580" y="327" width="9" height="6" fill="url(#chromeUltraGrad)" rx="1.5" />
          </g>

          {/* Air Brake Pressure Reservoirs */}
          <g id="air-tanks">
            <rect x="655" y="336" width="60" height="18" rx="8" fill="url(#fuelTankGrad)" stroke="#475569" />
            <rect x="670" y="334" width="3" height="22" fill="#0B2F4A" />
            <rect x="700" y="334" width="3" height="22" fill="#0B2F4A" />
          </g>

          {/* Trailer Axles Composite Curved Mudguards */}
          <path
            d="M 105,372 C 105,322 170,320 200,320 L 310,320 C 340,320 405,322 405,372 L 392,372 C 392,332 340,330 310,330 L 200,330 C 170,330 118,332 118,372 Z"
            fill="#071F33"
          />
          <rect x="100" y="358" width="6" height="26" fill="#0F172A" rx="1.5" />

          {/* ===============================================================
              LAYER 4: THE 40FT INTERMODAL SHIPPING CONTAINER (100% UNTOUCHED)
              =============================================================== */}
          <g id="intermodal-container">
            {/* Main White Container Body Box */}
            <rect
              x="65"
              y="95"
              width="845"
              height="234"
              fill="url(#containerWhiteGrad)"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />

            {/* 28 Vertical Corrugated Steel Ribs */}
            {containerRibs.map((xPos, idx) => (
              <g key={`rib-${idx}`}>
                <line
                  x1={xPos}
                  y1="109"
                  x2={xPos}
                  y2="315"
                  stroke="#0B2F4A"
                  strokeWidth="2.5"
                  opacity="0.08"
                />
                <line
                  x1={xPos + 2.5}
                  y1="109"
                  x2={xPos + 2.5}
                  y2="315"
                  stroke="#FFFFFF"
                  strokeWidth="1.8"
                  opacity="0.9"
                />
              </g>
            ))}

            {/* Top Heavy Steel Rail with Rivet Accents */}
            <rect x="65" y="95" width="845" height="15" fill="url(#containerRailGrad)" />
            {Array.from({ length: 24 }).map((_, i) => (
              <circle
                key={`rivet-top-${i}`}
                cx={95 + i * 34}
                cy="102.5"
                r="2"
                fill="#E8B94F"
                opacity="0.8"
              />
            ))}

            {/* Bottom Heavy Steel Rail with Rivet Accents */}
            <rect x="65" y="315" width="845" height="14" fill="url(#containerRailGrad)" />
            {Array.from({ length: 24 }).map((_, i) => (
              <circle
                key={`rivet-bot-${i}`}
                cx={95 + i * 34}
                cy="322"
                r="2"
                fill="#E8B94F"
                opacity="0.8"
              />
            ))}

            {/* 4 Heavy Industrial ISO Corner Castings */}
            <rect x="65" y="95" width="22" height="22" fill="#071F33" stroke="#0B2F4A" strokeWidth="2" />
            <ellipse cx="76" cy="106" rx="4.5" ry="6.5" fill="#FFFFFF" />
            <rect x="888" y="95" width="22" height="22" fill="#071F33" stroke="#0B2F4A" strokeWidth="2" />
            <ellipse cx="899" cy="106" rx="4.5" ry="6.5" fill="#FFFFFF" />
            <rect x="65" y="307" width="22" height="22" fill="#071F33" stroke="#0B2F4A" strokeWidth="2" />
            <ellipse cx="76" cy="318" rx="4.5" ry="6.5" fill="#FFFFFF" />
            <rect x="888" y="307" width="22" height="22" fill="#071F33" stroke="#0B2F4A" strokeWidth="2" />
            <ellipse cx="899" cy="318" rx="4.5" ry="6.5" fill="#FFFFFF" />

            {/* Container Rear Door Hardware */}
            <g id="door-lock-rods">
              <rect x="82" y="104" width="4" height="215" fill="url(#chromeUltraGrad)" rx="1.5" />
              <rect x="79" y="195" width="10" height="14" fill="#0B2F4A" rx="2" />
              <rect x="94" y="104" width="4" height="215" fill="url(#chromeUltraGrad)" rx="1.5" />
              <rect x="91" y="195" width="10" height="14" fill="#0B2F4A" rx="2" />
              <rect x="89" y="218" width="6" height="12" fill="#10B981" rx="1.5" />
            </g>

            {/* Container Stencils & Markings */}
            <text
              x="115"
              y="130"
              fontFamily="Consolas, monospace"
              fontSize="8"
              fontWeight="800"
              letterSpacing="0.12em"
              fill="#0B2F4A"
            >
              SRTC-U 940215 [7] &bull; 45G1 HC
            </text>
            <text
              x="115"
              y="142"
              fontFamily="Consolas, monospace"
              fontSize="6.8"
              fontWeight="700"
              letterSpacing="0.06em"
              fill="#64748B"
            >
              MAX. GR. 32,500 KG &bull; PAYLOAD 28,680 KG
            </text>
            <text
              x="865"
              y="130"
              fontFamily="Consolas, monospace"
              fontSize="7.5"
              fontWeight="800"
              letterSpacing="0.08em"
              fill="#0B2F4A"
              textAnchor="end"
            >
              ISO 6346 / CSC SAFETY APPROVAL
            </text>
            <text
              x="865"
              y="142"
              fontFamily="Consolas, monospace"
              fontSize="6.8"
              fontWeight="700"
              letterSpacing="0.06em"
              fill="#64748B"
              textAnchor="end"
            >
              ALL-INDIA HIGHWAY EXPRESS CORRIDOR
            </text>

            {/* Central CONTACT US Display */}
            <rect x="360" y="148" width="250" height="24" rx="12" fill="#0B2F4A" stroke="#E8B94F" strokeWidth="1.5" />
            <circle cx="376" cy="160" r="4.5" fill="#10B981" />
            <text
              x="485"
              y="164"
              fontFamily="Consolas, monospace"
              fontSize="8.5"
              fontWeight="800"
              letterSpacing="0.14em"
              fill="#FFFFFF"
              textAnchor="middle"
            >
              24/7 CENTRAL FREIGHT DISPATCH
            </text>

            <text
              x="485"
              y="218"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="48"
              fontWeight="900"
              letterSpacing="0.08em"
              fill="#0B2F4A"
              textAnchor="middle"
            >
              CONTACT US
            </text>

            <text
              x="485"
              y="238"
              fontFamily="Consolas, monospace"
              fontSize="9"
              fontWeight="800"
              letterSpacing="0.18em"
              fill="#0284C7"
              textAnchor="middle"
            >
              IMMEDIATE ROUTE ASSIGNMENT &bull; PAN-INDIA FLEET
            </text>

            <rect
              x="355"
              y="254"
              width="260"
              height="30"
              rx="7"
              fill="url(#chromeUltraGrad)"
              stroke="#D99B16"
              strokeWidth="1.8"
            />
            <rect x="357" y="256" width="256" height="26" rx="5" fill="#E8B94F" />
            <text
              x="485"
              y="273"
              fontFamily="Consolas, monospace"
              fontSize="9.5"
              fontWeight="900"
              letterSpacing="0.1em"
              fill="#071F33"
              textAnchor="middle"
            >
              INITIATE FREIGHT SHIPMENT &rarr;
            </text>
          </g>

          {/* ===============================================================
              LAYER 5: RE-ENGINEERED 100% REALISTIC HIGHWAY CABOVER TRACTOR
              (BharatBenz / Volvo FH / Scania Heavy Commercial Port Haulage Spec)
              ZERO WHITE GAPS • ZERO BUGS • ZERO SNOUT • 100% GAPLESS FOUNDATION
              =============================================================== */}
          <g id="realistic-cabover-tractor">
            {/* -------------------------------------------------------------
                A. GAPLESS UNDERBODY FOUNDATION (Zero White Background Bleed)
                ------------------------------------------------------------- */}
            {/* Solid Heavy Chassis Foundation Beam (from Container to Bumper) */}
            <rect x="910" y="328" width="375" height="14" fill="#040F18" />
            <line x1="910" y1="334" x2="1285" y2="334" stroke="#0B2F4A" strokeWidth="2" />

            {/* Solid Black Inner Wheel Wells (Guarantees NO white showing behind tires) */}
            {/* Drive Axles Inner Wheel Well */}
            <path
              d="M 928,372 
                 L 928,340 
                 C 928,318 948,312 975,312 
                 C 1002,312 1020,320 1020,340 
                 C 1020,320 1038,312 1065,312 
                 C 1092,312 1112,318 1112,340 
                 L 1112,372 
                 Z"
              fill="#02070C"
            />

            {/* Steer Axle Inner Wheel Well Cavity (cx: 1230, r: 38) */}
            <path
              d="M 1175,372 
                 L 1175,342 
                 C 1175,308 1200,302 1230,302 
                 C 1260,302 1285,308 1285,342 
                 L 1285,372 
                 Z"
              fill="#02070C"
            />

            {/* Mid-Chassis Aerodynamic Side Fairing Panel */}
            <path
              d="M 1110,328 
                 L 1178,328 
                 L 1178,368 
                 L 1110,368 
                 Z"
              fill="#072033"
              stroke="#0B2F4A"
              strokeWidth="1.2"
            />
            {/* Aluminum Auxiliary Battery/DEF Tank Access Hatch */}
            <rect x="1118" y="335" width="52" height="24" rx="3" fill="#04121D" stroke="#0E3859" strokeWidth="1" />
            <circle cx="1125" cy="347" r="1.8" fill="#94A3B8" />
            <circle cx="1163" cy="347" r="1.8" fill="#94A3B8" />
            <rect x="1132" y="342" width="24" height="10" rx="1.5" fill="#E8B94F" opacity="0.85" />
            <text x="1144" y="349.5" fontFamily="Consolas, monospace" fontSize="4.5" fontWeight="900" fill="#071F33" textAnchor="middle">
              DEF
            </text>

            {/* -------------------------------------------------------------
                B. DRIVE AXLES TANDEM MUDGUARDS & QUARTER FENDERS (cx: 975, 1065)
                ------------------------------------------------------------- */}
            <path
              d="M 928,370 
                 L 928,345 
                 C 928,320 948,314 975,314 
                 C 1002,314 1020,322 1020,345 
                 C 1020,322 1038,314 1065,314 
                 C 1092,314 1112,320 1112,345 
                 L 1112,370 
                 L 1105,370 
                 C 1105,326 1088,320 1065,320 
                 C 1042,320 1026,326 1026,350 
                 L 1014,350 
                 C 1014,326 998,320 975,320 
                 C 952,320 935,326 935,370 
                 Z"
              fill="#030A10"
              stroke="#0B2F4A"
              strokeWidth="1.2"
            />
            {/* Heavy Rear Rubber Mudflap with DOT Red Reflector */}
            <rect x="923" y="348" width="5" height="34" fill="#02060A" rx="1" />
            <rect x="923" y="372" width="5" height="4" fill="#EF4444" />

            {/* -------------------------------------------------------------
                C. MAIN WATERTIGHT CABOVER CABIN BODY (Zero Gaps, 100% Solid)
                ------------------------------------------------------------- */}
            {/* Master Cabin Shell Polygon (Completely fills cab from 914 to 1292) */}
            <path
              d="M 914,94 
                 L 1080,86 
                 C 1140,84 1210,84 1242,88 
                 C 1252,90 1258,96 1262,106 
                 L 1286,215 
                 C 1289,222 1290,230 1290,240 
                 L 1290,320 
                 L 1292,364 
                 C 1292,366 1288,368 1282,368 
                 L 1282,342 
                 C 1282,308 1258,304 1230,304 
                 C 1202,304 1178,308 1178,342 
                 L 1178,328 
                 L 914,328 
                 Z"
              fill="url(#cabMetallicNavy)"
              stroke="#071F33"
              strokeWidth="1.5"
            />

            {/* Aerodynamic Cab Collar / Container Rubber Seal (Bridges 910 to 918) */}
            <rect x="910" y="94" width="8" height="234" fill="#030A10" stroke="#071F33" strokeWidth="0.8" />
            <line x1="914" y1="96" x2="914" y2="326" stroke="#0B2F4A" strokeWidth="1" strokeDasharray="3 3" />

            {/* -------------------------------------------------------------
                D. AERODYNAMIC ROOF DEFLECTOR & CLEARANCE LIGHTING
                ------------------------------------------------------------- */}
            {/* Streamlined High-Roof Air Deflector Cap */}
            <path
              d="M 914,95 
                 C 940,88 1020,84 1120,84 
                 L 1240,84 
                 C 1252,84 1260,88 1265,96 
                 L 1254,106 
                 L 922,106 
                 Z"
              fill="url(#roofDeflectorGrad)"
              stroke="#072033"
              strokeWidth="1"
            />

            {/* 5 Heavy Commercial Highway Amber Bullet Clearance Lights */}
            <ellipse cx="1140" cy="87" rx="3.5" ry="1.8" fill="#F59E0B" />
            <ellipse cx="1168" cy="87" rx="3.5" ry="1.8" fill="#F59E0B" />
            <ellipse cx="1195" cy="87" rx="3.5" ry="1.8" fill="#F59E0B" />
            <ellipse cx="1222" cy="87" rx="3.5" ry="1.8" fill="#F59E0B" />
            <ellipse cx="1248" cy="89" rx="3.5" ry="1.8" fill="#F59E0B" />

            {/* Dual Chrome Roof Air Horns */}
            <path d="M 1080,80 L 1130,79 L 1132,82 L 1080,82 Z" fill="url(#chromeUltraGrad)" />
            <ellipse cx="1131" cy="80.5" rx="2" ry="3.5" fill="#CBD5E1" stroke="#64748B" strokeWidth="0.5" />
            <path d="M 1090,83 L 1140,82 L 1142,85 L 1090,85 Z" fill="url(#chromeUltraGrad)" />
            <ellipse cx="1141" cy="83.5" rx="2" ry="3.5" fill="#CBD5E1" stroke="#64748B" strokeWidth="0.5" />

            {/* -------------------------------------------------------------
                E. PANORAMIC RAKED WINDSHIELD & VISOR (True Cabover Scale)
                ------------------------------------------------------------- */}
            {/* Matte Black Tinted Sun-Visor Strip with Chrome Brow */}
            <path
              d="M 1248,96 
                 L 1274,103 
                 C 1278,104 1278,109 1274,111 
                 L 1250,107 
                 Z"
              fill="#02080D"
              stroke="url(#chromeUltraGrad)"
              strokeWidth="0.8"
            />
            <circle cx="1268" cy="106" r="1.6" fill="#F59E0B" />

            {/* Large Raked Windshield Glass (10° - 15° European Cabover Rake) */}
            <path
              d="M 1252,106 
                 L 1283,214 
                 C 1284,218 1280,222 1272,222 
                 L 1228,222 
                 C 1220,182 1214,142 1208,106 
                 Z"
              fill="url(#windshieldGlassGrad)"
              stroke="#030A10"
              strokeWidth="2.5"
            />

            {/* Windshield Daylight Glare Reflection Streak */}
            <path
              d="M 1254,110 
                 L 1282,212 
                 L 1268,220 
                 L 1238,126 
                 Z"
              fill="url(#windshieldStreakGrad)"
            />

            {/* Dual Articulated Heavy-Duty Black Windshield Wipers */}
            <line x1="1242" y1="220" x2="1268" y2="162" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="1268" y1="162" x2="1278" y2="160" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="1255" y1="220" x2="1276" y2="170" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />

            {/* -------------------------------------------------------------
                F. DRIVER SIDE DOOR, WINDOW & LUXURY CABIN DETAILS
                ------------------------------------------------------------- */}
            {/* Driver Door Outer Perimeter Shutline */}
            <path
              d="M 1030,105 
                 L 1215,105 
                 L 1228,222 
                 L 1222,318 
                 L 1175,318 
                 L 1175,328 
                 L 1030,328 
                 Z"
              fill="url(#cabPanelShading)"
              stroke="#051522"
              strokeWidth="1.5"
            />

            {/* Side Driver Window (Volvo / Scania Iconic Dipped Mirror Notch) */}
            <path
              d="M 1045,114 
                 L 1206,114 
                 L 1216,182 
                 C 1216,186 1210,190 1200,190 
                 L 1045,190 
                 Z"
              fill="url(#sideWindowGrad)"
              stroke="#040F18"
              strokeWidth="2"
            />
            {/* Window Specular Highlight */}
            <line x1="1055" y1="118" x2="1195" y2="182" stroke="#38BDF8" strokeWidth="2" opacity="0.35" />

            {/* Interior Driver Seat & Steering Wheel Depth */}
            <g id="driver-interior-silhouette" opacity="0.8">
              {/* Captain Seat Headrest */}
              <rect x="1065" y="126" width="16" height="22" rx="5" fill="#02080D" />
              {/* Driver Shoulder Profile */}
              <path d="M 1055,185 C 1055,155 1072,148 1092,148 C 1112,148 1124,155 1124,185 Z" fill="#030C14" />
              {/* Steering Wheel Rim */}
              <ellipse cx="1182" cy="172" rx="4.5" ry="9" fill="none" stroke="#04121D" strokeWidth="2.5" transform="rotate(-15 1182 172)" />
            </g>

            {/* Flush Polished Chrome Exterior Door Handle */}
            <rect
              x="1052"
              y="218"
              width="26"
              height="7"
              rx="3"
              fill="url(#chromeUltraGrad)"
              stroke="#475569"
              strokeWidth="0.8"
            />
            <circle cx="1072" cy="221.5" r="1.2" fill="#0F172A" />

            {/* Premium Fleet Badging */}
            <text
              x="1052"
              y="242"
              fontFamily="Consolas, monospace"
              fontSize="6.8"
              fontWeight="900"
              letterSpacing="0.1em"
              fill="#E8B94F"
            >
              SRTC 5528 T
            </text>
            <text
              x="1052"
              y="253"
              fontFamily="Consolas, monospace"
              fontSize="5.2"
              fontWeight="800"
              letterSpacing="0.08em"
              fill="#94A3B8"
            >
              POWERLINE V8 &bull; EURO-VI
            </text>

            {/* Sleeper Window with Chrome Bezel (Rear Cab Section) */}
            <rect
              x="946"
              y="142"
              width="52"
              height="28"
              rx="6"
              fill="#030C14"
              stroke="url(#chromeUltraGrad)"
              strokeWidth="1.8"
            />
            <rect x="950" y="146" width="44" height="20" rx="4" fill="url(#sideWindowGrad)" />
            <line x1="954" y1="148" x2="986" y2="162" stroke="#38BDF8" strokeWidth="1.2" opacity="0.45" />

            {/* Sleeper Under-Bunk Exterior Tool / Luggage Locker Hatch */}
            <rect
              x="942"
              y="245"
              width="60"
              height="40"
              rx="3"
              fill="#051928"
              stroke="#030E17"
              strokeWidth="1.5"
            />
            <circle cx="994" cy="265" r="2.5" fill="url(#chromeUltraGrad)" />
            <line x1="942" y1="285" x2="1002" y2="285" stroke="#0B2F4A" strokeWidth="1" />

            {/* Golden Fleet Waistline Pinstripe Across Entire Cabin */}
            <line
              x1="918"
              y1="202"
              x2="1285"
              y2="202"
              stroke="url(#goldSpeedlineGrad)"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <line
              x1="918"
              y1="205"
              x2="1285"
              y2="205"
              stroke="#0B2F4A"
              strokeWidth="0.8"
            />

            {/* -------------------------------------------------------------
                G. INTEGRATED DRIVER INGRESS BOARDING STEPS
                ------------------------------------------------------------- */}
            <g id="boarding-ladder-steps">
              {/* Recessed Step Well Cavity */}
              <path
                d="M 1175,270 
                   L 1215,270 
                   L 1215,320 
                   L 1175,320 
                   Z"
                fill="#030A10"
                stroke="#071F33"
                strokeWidth="1"
              />
              {/* Step 1 */}
              <rect x="1178" y="278" width="34" height="5" rx="1" fill="url(#chromeUltraGrad)" stroke="#475569" strokeWidth="0.5" />
              {/* Step 2 */}
              <rect x="1178" y="294" width="34" height="5" rx="1" fill="url(#chromeUltraGrad)" stroke="#475569" strokeWidth="0.5" />
              {/* Step 3 */}
              <rect x="1178" y="310" width="34" height="5" rx="1" fill="url(#chromeUltraGrad)" stroke="#475569" strokeWidth="0.5" />
              {/* Anti-Slip Perforated Slots */}
              {Array.from({ length: 4 }).map((_, i) => (
                <circle key={`step-hole-1-${i}`} cx={1184 + i * 8} cy="280.5" r="1" fill="#0F172A" />
              ))}
              {Array.from({ length: 4 }).map((_, i) => (
                <circle key={`step-hole-2-${i}`} cx={1184 + i * 8} cy="296.5" r="1" fill="#0F172A" />
              ))}
              {Array.from({ length: 4 }).map((_, i) => (
                <circle key={`step-hole-3-${i}`} cx={1184 + i * 8} cy="312.5" r="1" fill="#0F172A" />
              ))}
            </g>

            {/* -------------------------------------------------------------
                H. DUAL-ARM AERODYNAMIC HIGHWAY MIRRORS (Scania / Volvo Spec)
                ------------------------------------------------------------- */}
            <g id="side-mirror-assembly">
              {/* Top & Bottom Mounting Brackets */}
              <line x1="1218" y1="128" x2="1234" y2="132" stroke="#02060A" strokeWidth="3" strokeLinecap="round" />
              <line x1="1224" y1="188" x2="1236" y2="182" stroke="#02060A" strokeWidth="3" strokeLinecap="round" />
              {/* Main Aerodynamic Mirror Housing Shell */}
              <rect
                x="1232"
                y="124"
                width="15"
                height="68"
                rx="6"
                fill="#061D2E"
                stroke="#02080D"
                strokeWidth="1.5"
              />
              {/* Primary Flat Mirror Glass */}
              <rect x="1234" y="128" width="4.5" height="40" rx="1.5" fill="#38BDF8" opacity="0.65" />
              {/* Lower Wide-Angle Convex Spotter Glass */}
              <rect x="1234" y="172" width="4.5" height="16" rx="1.5" fill="#38BDF8" opacity="0.45" />
              {/* Outer Amber LED Side Turn Indicator Repeater Bar */}
              <rect x="1243" y="146" width="3" height="20" rx="1.5" fill="#F59E0B" />
            </g>

            {/* -------------------------------------------------------------
                I. FRONT FASCIA & RADIATOR GRILLE (The Bold Face of the Truck)
                ------------------------------------------------------------- */}
            <g id="front-radiator-grille">
              {/* Front Grille Recessed Cavity with Honeycomb Texture Backing */}
              <path
                d="M 1282,222 
                   L 1290,222 
                   L 1290,320 
                   L 1276,320 
                   Z"
                fill="#01060A"
                stroke="#072033"
                strokeWidth="1"
              />

              {/* Corner Aerodynamic Air Deflector Vanes */}
              <path
                d="M 1278,222 
                   C 1284,250 1282,290 1276,318 
                   L 1272,318 
                   C 1278,290 1280,250 1274,222 
                   Z"
                fill="#164E78"
              />

              {/* 6 Horizontal Polished Chrome Radiator Louvers */}
              <line x1="1278" y1="234" x2="1290" y2="234" stroke="url(#chromeUltraGrad)" strokeWidth="3" strokeLinecap="round" />
              <line x1="1277" y1="248" x2="1290" y2="248" stroke="url(#chromeUltraGrad)" strokeWidth="3" strokeLinecap="round" />
              <line x1="1276" y1="262" x2="1290" y2="262" stroke="url(#chromeUltraGrad)" strokeWidth="3" strokeLinecap="round" />
              <line x1="1275" y1="276" x2="1290" y2="276" stroke="url(#chromeUltraGrad)" strokeWidth="3" strokeLinecap="round" />
              <line x1="1274" y1="290" x2="1290" y2="290" stroke="url(#chromeUltraGrad)" strokeWidth="3" strokeLinecap="round" />
              <line x1="1273" y1="304" x2="1290" y2="304" stroke="url(#chromeUltraGrad)" strokeWidth="3" strokeLinecap="round" />

              {/* Signature Golden SRTC Eagle Medallion at Grille Center */}
              <rect x="1282" y="258" width="10" height="12" rx="2" fill="#0B2F4A" stroke="#E8B94F" strokeWidth="1.2" />
              <circle cx="1287" cy="264" r="3" fill="#E8B94F" />
              <text
                x="1287"
                y="266.5"
                fontFamily="Consolas, monospace"
                fontSize="4"
                fontWeight="900"
                fill="#071F33"
                textAnchor="middle"
              >
                ★
              </text>
            </g>

            {/* -------------------------------------------------------------
                J. STEER AXLE CONCENTRIC FLARED FENDER ARCH (cx: 1230)
                ------------------------------------------------------------- */}
            {/* Flared Molded Composite Wheel Arch Over Steer Wheel */}
            <path
              d="M 1175,368 
                 C 1175,312 1200,306 1230,306 
                 C 1260,306 1285,312 1285,368 
                 L 1290,368 
                 C 1290,304 1262,298 1230,298 
                 C 1198,298 1170,304 1170,368 
                 Z"
              fill="#12446A"
              stroke="#072033"
              strokeWidth="1"
            />
            {/* Steer Wheel Mudflap */}
            <rect x="1168" y="346" width="5" height="26" fill="#030A10" rx="1" />

            {/* -------------------------------------------------------------
                K. HEAVY INDUSTRIAL COMMERCIAL BUMPER & LED HEADLAMPS
                ------------------------------------------------------------- */}
            <g id="front-bumper-assembly">
              {/* Heavy-Duty Sculpted Bumper Shell */}
              <path
                d="M 1268,320 
                   L 1292,320 
                   C 1296,320 1298,326 1298,332 
                   L 1295,356 
                   C 1293,364 1288,368 1280,368 
                   L 1268,368 
                   Z"
                fill="url(#bumperIndustrialGrad)"
                stroke="#0B2F4A"
                strokeWidth="1.5"
              />

              {/* Lower Aerodynamic Air Dam / Road Splitter Chin */}
              <rect x="1272" y="364" width="24" height="4.5" rx="1.5" fill="#02060A" />

              {/* Front License Plate (Indian Highway Specification) */}
              <rect x="1275" y="352" width="20" height="9.5" rx="1.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="0.8" />
              <rect x="1275.8" y="352.8" width="2.5" height="8" fill="#0284C7" />
              <text
                x="1286"
                y="359.5"
                fontFamily="Consolas, monospace"
                fontSize="4.8"
                fontWeight="900"
                fill="#0F172A"
                textAnchor="middle"
              >
                GJ-06
              </text>

              {/* High-Tech Projector LED Headlamp Cluster */}
              <g id="headlight-cluster">
                {/* Outer Polycarbonate Housing */}
                <path
                  d="M 1286,326 
                     L 1296,326 
                     L 1294,348 
                     L 1284,348 
                     Z"
                  fill="#02080D"
                  stroke="#38BDF8"
                  strokeWidth="1.2"
                  rx="2"
                />

                {/* L-Shaped Cyan Daytime Running Light (DRL) LED Tube */}
                <path
                  d="M 1288,328 L 1294,328 L 1293,344"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Primary High-Intensity Projector LED Lens with Dynamic Glow */}
                <circle
                  cx="1290"
                  cy="337"
                  r="5.5"
                  fill={isDipper ? '#FFFFFF' : '#38BDF8'}
                  filter="url(#lensGlowFilter)"
                />
                <circle cx="1290" cy="337" r="2.8" fill="#FFFFFF" />

                {/* Lower Auxiliary Fog Light Projector */}
                <circle cx="1288" cy="344" r="2.2" fill="#38BDF8" opacity="0.85" />
              </g>
            </g>
          </g>
        </g>

        {/* ===================================================================
            LAYER 6: 6 REALISTIC MULTI-AXLE ALCOA ALLOY WHEELS
            (Rotates smoothly around each wheel's exact center coordinates)
            =================================================================== */}
        <g id="all-wheels">
          {wheelPositions.map((wh, idx) => (
            <g
              key={`wheel-${idx}`}
              className="sitc-wheel-spin"
              style={{
                transformOrigin: `${wh.cx}px ${wh.cy}px`,
              }}
            >
              {/* Outer Heavy Rubber Radial Tire */}
              <circle
                cx={wh.cx}
                cy={wh.cy}
                r="38"
                fill="url(#tireRubberGrad)"
                stroke="#020617"
                strokeWidth="2"
              />
              {/* Radial Tread Depth Ring */}
              <circle
                cx={wh.cx}
                cy={wh.cy}
                r="35"
                fill="none"
                stroke="#334155"
                strokeWidth="1"
                strokeDasharray="4 2.5"
              />
              {/* Sidewall Bevel Highlight */}
              <circle cx={wh.cx} cy={wh.cy} r="28" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />

              {/* Polished Alcoa 10-Hole Forged Alloy Rim */}
              <circle
                cx={wh.cx}
                cy={wh.cy}
                r="24"
                fill="url(#alloyRimGrad)"
                stroke="#64748B"
                strokeWidth="1.5"
              />

              {/* 10 Circular Rim Ventilation Holes */}
              {Array.from({ length: 10 }).map((_, hIdx) => {
                const angle = (hIdx * 36 * Math.PI) / 180;
                const holeX = r2(wh.cx + 16 * Math.cos(angle));
                const holeY = r2(wh.cy + 16 * Math.sin(angle));
                return (
                  <circle
                    key={`hole-${idx}-${hIdx}`}
                    cx={holeX}
                    cy={holeY}
                    r="2.8"
                    fill="#0F172A"
                  />
                );
              })}

              {/* Center Chrome Hubcap Housing */}
              <circle
                cx={wh.cx}
                cy={wh.cy}
                r="10.5"
                fill="url(#chromeUltraGrad)"
                stroke="#475569"
                strokeWidth="1"
              />

              {/* 8 Chrome Lug Nut Bolts */}
              {Array.from({ length: 8 }).map((_, nIdx) => {
                const nutAngle = (nIdx * 45 * Math.PI) / 180;
                const nutX = r2(wh.cx + 7.5 * Math.cos(nutAngle));
                const nutY = r2(wh.cy + 7.5 * Math.sin(nutAngle));
                return (
                  <circle
                    key={`nut-${idx}-${nIdx}`}
                    cx={nutX}
                    cy={nutY}
                    r="1.2"
                    fill="#FFFFFF"
                  />
                );
              })}

              {/* Center SRTC Corporate Medallion */}
              <circle cx={wh.cx} cy={wh.cy} r="4" fill="#0B2F4A" />
              <circle cx={wh.cx} cy={wh.cy} r="2" fill="#E8B94F" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

export default memo(CodedTruckRealistic);
