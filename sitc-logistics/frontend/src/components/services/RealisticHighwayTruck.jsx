'use client';

import React from 'react';

/**
 * RealisticHighwayTruck - Cute & Compact Commercial Truck
 * Zero Clutter: ONLY the real official brand logo and company name.
 * Displays the authentic corporate logo image from the official PDF brochure.
 * Symmetrically flawless in both Eastbound (Right) and Westbound (Left) directions.
 */
export default function RealisticHighwayTruck({
  client,
  direction = 'right', // 'right' (moving eastward, cab on right) or 'left' (moving westward, cab on left)
  isSelected = false,
  onClick,
}) {
  const isRight = direction === 'right';

  // Cute, compact dimensions with generous room for real branding
  const width = 296;
  const height = 90;

  // Container geometry
  const contX = 8;
  const contY = 16;
  const contW = 210;
  const contH = 56;

  // Tractor Cab geometry
  const cabStartX = contX + contW + 4; // 222 (4px snug joint)
  const cabW = 64;
  const cabEndX = cabStartX + cabW; // 286 (leaves 10px margin for bumper/headlight flare)
  const cabTopY = 20;
  const cabBaseY = 72;

  // Wheels (Chunky & Cute, perfectly aligned)
  const wheelY = 74;
  const wheelR = 8.5;
  const rimR = 5.8;
  const trailerWheels = [32, 64, 96]; // 3 cute bogie wheels
  const tractorWheels = [cabStartX + 18, cabEndX - 10]; // 2 cab wheels
  const allWheels = [...trailerWheels, ...tractorWheels];

  // Colors
  const primaryBrand = client.primaryColor || '#0B2F4A';
  const accentBrand = client.accentColor || '#E8B94F';

  // Placard position in normal un-flipped screen coordinates
  // Guaranteed generous padding so text never touches or cuts through the border!
  const placardMarginX = 8;
  const placardMarginY = 6;
  const placardW = contW - placardMarginX * 2; // 194px
  const placardH = contH - placardMarginY * 2; // 44px
  const placardY = contY + placardMarginY; // 22px
  const placardX = isRight
    ? contX + placardMarginX
    : (width - contX - contW) + placardMarginX;

  // Dynamic font sizing for company names to ensure 100% safe margin
  const displayName = client.displayName || client.name;
  const fontSize = displayName.length > 17 ? '10.5' : displayName.length > 13 ? '11.5' : '12';

  // Real logo path (Dynamic upload from admin or brochure static asset)
  const realLogoSrc = client.logo || (client.id ? `/images/clients/real/${client.id}.png` : '');

  return (
    <div
      className={`srtc-cute-truck srtc-cute-truck--${direction} ${isSelected ? 'srtc-cute-truck--selected' : ''}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${displayName} SRTC Commercial Truck`}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="srtc-cute-truck-svg"
      >
        <defs>
          {/* Wheel Rim Metallic Gradient */}
          <radialGradient id={`cuteRimGrad-${client.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#E2E8F0" />
            <stop offset="75%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#334155" />
          </radialGradient>

          {/* Chunky Rubber Tire Gradient */}
          <radialGradient id={`cuteTireGrad-${client.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="#334155" />
            <stop offset="85%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>

          {/* Cute Cab Body Gradient */}
          <linearGradient id={`cuteCabGrad-${client.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A5F" />
            <stop offset="50%" stopColor="#0B2F4A" />
            <stop offset="100%" stopColor="#061B2B" />
          </linearGradient>

          {/* Container Body Gradient */}
          <linearGradient id={`cuteContGrad-${client.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="20%" stopColor="#F8FAFC" />
            <stop offset="85%" stopColor="#EEF2F6" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* Friendly Headlight Beam Flare */}
          <linearGradient id={`cuteBeamGrad-${client.id}`} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="25%" stopColor="#38BDF8" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ===================================================================
            LAYER 0: CUTE SOFT GROUND SHADOW
            =================================================================== */}
        <ellipse
          cx={width / 2}
          cy={height - 7}
          rx={width * 0.45}
          ry={5}
          fill="#000000"
          opacity="0.45"
          filter="blur(1.5px)"
        />

        {/* ===================================================================
            LAYER 1: MECHANICAL TRUCK SHELL (Symmetrically Flipped when facing left)
            Facing East (Right) by default.
            =================================================================== */}
        <g transform={!isRight ? `translate(${width}, 0) scale(-1, 1)` : undefined}>
          {/* Headlamp Light Beam Flare onto Highway */}
          <polygon
            points={`${cabEndX - 2},${cabBaseY - 10} ${cabEndX + 70},${cabBaseY - 24} ${cabEndX + 80},${cabBaseY + 10} ${cabEndX},${cabBaseY + 2}`}
            fill={`url(#cuteBeamGrad-${client.id})`}
            className="srtc-truck-light-beam"
          />

          {/* Under-chassis frame rail */}
          <rect
            x={contX}
            y={cabBaseY - 6}
            width={cabEndX - contX - 2}
            height="5"
            rx="2"
            fill="#071F33"
          />

          {/* Cute Cylindrical Chrome Fuel Tank */}
          <rect
            x={contX + 115}
            y={cabBaseY - 8}
            width="46"
            height="11"
            rx="5.5"
            fill="#CBD5E1"
            stroke="#64748B"
            strokeWidth="0.8"
          />
          {/* Fuel Tank Mounting Straps */}
          <rect x={contX + 124} y={cabBaseY - 9} width="2" height="13" fill="#0B2F4A" />
          <rect x={contX + 150} y={cabBaseY - 9} width="2" height="13" fill="#0B2F4A" />

          {/* Cute Mudguards over Trailer Wheels */}
          {trailerWheels.map((twx, idx) => (
            <path
              key={`mudguard-${idx}`}
              d={`M ${twx - 11},${wheelY + 1} A 11,11 0 0 1 ${twx + 11},${wheelY + 1}`}
              fill="none"
              stroke="#071F33"
              strokeWidth="2.5"
            />
          ))}

          {/* Cute Mudguard over Tractor Steer Wheel */}
          <path
            d={`M ${tractorWheels[1] - 11},${wheelY + 1} A 11,11 0 0 1 ${tractorWheels[1] + 11},${wheelY + 1}`}
            fill="none"
            stroke="#071F33"
            strokeWidth="2.5"
          />

          {/* ---------------------------------------------------------------
              CUTE CONTAINER BODY (Clean, smooth & unobstructed)
              --------------------------------------------------------------- */}
          {/* Main Container Shell */}
          <rect
            x={contX}
            y={contY}
            width={contW}
            height={contH}
            rx="7"
            fill={`url(#cuteContGrad-${client.id})`}
            stroke="#0B2F4A"
            strokeWidth="1.8"
          />

          {/* Top & Bottom Trim Rails */}
          <rect x={contX} y={contY} width={contW} height="4.5" rx="2" fill="#0B2F4A" />
          <rect x={contX} y={contY + contH - 4.5} width={contW} height="4.5" rx="2" fill="#0B2F4A" />

          {/* Top Gold Accent Line */}
          <line x1={contX + 4} y1={contY + 4.5} x2={contX + contW - 4} y2={contY + 4.5} stroke="#E8B94F" strokeWidth="1" />

          {/* ISO Corner Castings */}
          <rect x={contX + 1} y={contY + 1} width="6" height="6" rx="1.5" fill="#071F33" stroke="#E8B94F" strokeWidth="0.6" />
          <rect x={contX + contW - 7} y={contY + 1} width="6" height="6" rx="1.5" fill="#071F33" stroke="#E8B94F" strokeWidth="0.6" />
          <rect x={contX + 1} y={contY + contH - 7} width="6" height="6" rx="1.5" fill="#071F33" stroke="#E8B94F" strokeWidth="0.6" />
          <rect x={contX + contW - 7} y={contY + contH - 7} width="6" height="6" rx="1.5" fill="#071F33" stroke="#E8B94F" strokeWidth="0.6" />

          {/* ---------------------------------------------------------------
              CUTE & SLEEK TRACTOR CAB
              --------------------------------------------------------------- */}
          {/* Fifth Wheel Snug Joint */}
          <rect x={cabStartX - 6} y={cabBaseY - 6} width="8" height="4" rx="1" fill="#1E293B" />

          {/* Cute Rounded Aerodynamic Cab Outer Body */}
          <path
            d={`M ${cabStartX},${cabTopY + 14} 
               Q ${cabStartX + 2},${cabTopY} ${cabStartX + 16},${cabTopY - 2} 
               L ${cabStartX + 34},${cabTopY - 1} 
               Q ${cabStartX + 48},${cabTopY + 1} ${cabEndX - 6},${cabTopY + 22} 
               L ${cabEndX},${cabBaseY - 12} 
               Q ${cabEndX},${cabBaseY} ${cabEndX - 4},${cabBaseY} 
               L ${cabStartX},${cabBaseY} Z`}
            fill={`url(#cuteCabGrad-${client.id})`}
            stroke="#0B2F4A"
            strokeWidth="1.8"
          />

          {/* Cute Aerodynamic Roof Cap with Gold Pinstripe */}
          <path
            d={`M ${cabStartX + 8},${cabTopY + 8} 
               Q ${cabStartX + 18},${cabTopY - 3} ${cabStartX + 34},${cabTopY - 3} 
               L ${cabStartX + 42},${cabTopY + 4} 
               L ${cabStartX + 8},${cabTopY + 8} Z`}
            fill="#0B2F4A"
            stroke="#E8B94F"
            strokeWidth="1"
          />

          {/* Amber Roof Marker Light */}
          <circle cx={cabStartX + 36} cy={cabTopY - 1} r="1.3" fill="#F59E0B" />

          {/* Cute Curved Windshield */}
          <path
            d={`M ${cabStartX + 30},${cabTopY + 3} 
               L ${cabStartX + 44},${cabTopY + 4} 
               L ${cabEndX - 8},${cabTopY + 24} 
               L ${cabStartX + 32},${cabTopY + 24} Z`}
            fill="#071F33"
            stroke="#38BDF8"
            strokeWidth="0.8"
          />
          {/* Windshield Glare Reflection */}
          <polygon
            points={`${cabStartX + 32},${cabTopY + 6} ${cabStartX + 41},${cabTopY + 7} ${cabEndX - 16},${cabTopY + 22} ${cabEndX - 24},${cabTopY + 22}`}
            fill="#FFFFFF"
            opacity="0.3"
          />

          {/* Cute Side Window */}
          <rect
            x={cabStartX + 10}
            y={cabTopY + 10}
            width="15"
            height="14"
            rx="2.5"
            fill="#071F33"
            stroke="#475569"
            strokeWidth="0.8"
          />
          <rect
            x={cabStartX + 12}
            y={cabTopY + 11.5}
            width="5"
            height="11"
            rx="1"
            fill="#FFFFFF"
            opacity="0.25"
          />

          {/* Cute Rearview Side Mirror */}
          <rect
            x={cabEndX - 10}
            y={cabTopY + 10}
            width="3"
            height="14"
            rx="1.5"
            fill="#071F33"
            stroke="#E8B94F"
            strokeWidth="0.8"
          />

          {/* Front Chrome Smile Grille */}
          <rect
            x={cabEndX - 5}
            y={cabTopY + 28}
            width="4"
            height="14"
            rx="1.5"
            fill="#071F33"
          />
          <line x1={cabEndX - 5} y1={cabTopY + 32} x2={cabEndX - 1} y2={cabTopY + 32} stroke="#CBD5E1" strokeWidth="1" />
          <line x1={cabEndX - 5} y1={cabTopY + 36} x2={cabEndX - 1} y2={cabTopY + 36} stroke="#E8B94F" strokeWidth="1" />
          <line x1={cabEndX - 5} y1={cabTopY + 40} x2={cabEndX - 1} y2={cabTopY + 40} stroke="#CBD5E1" strokeWidth="1" />

          {/* Cute Round LED Headlight Lens */}
          <circle
            cx={cabEndX - 4}
            cy={cabBaseY - 10}
            r="3.2"
            fill="#38BDF8"
            className="srtc-headlight-lens"
          />
          <circle cx={cabEndX - 4} cy={cabBaseY - 10} r="1.5" fill="#FFFFFF" />

          {/* Cute Front Bumper */}
          <rect
            x={cabEndX - 8}
            y={cabBaseY - 4}
            width="9"
            height="4"
            rx="1.5"
            fill="#0B2F4A"
            stroke="#E8B94F"
            strokeWidth="0.8"
          />

          {/* ---------------------------------------------------------------
              CUTE CHUNKY WHEELS WITH SPINNING RIMS
              --------------------------------------------------------------- */}
          {allWheels.map((wx, wIdx) => (
            <g key={`wheel-${wIdx}`} transform={`translate(${wx}, ${wheelY})`}>
              {/* Rubber Tire */}
              <circle cx="0" cy="0" r={wheelR} fill={`url(#cuteTireGrad-${client.id})`} />
              <circle cx="0" cy="0" r={wheelR} stroke="#071F33" strokeWidth="0.8" fill="none" />

              {/* Rotating Alloy Rim */}
              <g className="srtc-wheel-spin-cw">
                <circle cx="0" cy="0" r={rimR} fill={`url(#cuteRimGrad-${client.id})`} />
                <circle cx="0" cy="0" r={rimR * 0.4} fill="#1E293B" stroke="#CBD5E1" strokeWidth="0.6" />

                {/* 5 Wheel Lug Dots */}
                {Array.from({ length: 5 }).map((_, lIdx) => {
                  const angle = (lIdx * 72 * Math.PI) / 180;
                  return (
                    <circle
                      key={`lug-${lIdx}`}
                      cx={Math.cos(angle) * (rimR * 0.65)}
                      cy={Math.sin(angle) * (rimR * 0.65)}
                      r="0.75"
                      fill="#FFFFFF"
                    />
                  );
                })}
              </g>
            </g>
          ))}
        </g>

        {/* ===================================================================
            LAYER 2: ONLY REAL OFFICIAL LOGO & COMPANY NAME
            Rendered in normal screen coordinates so it is ALWAYS upright,
            never backwards, with generous padding so text NEVER cuts!
            =================================================================== */}
        <g id={`placard-${client.id}`} transform={`translate(${placardX}, ${placardY})`}>
          {/* White Glossy Backing Card */}
          <rect
            x="0"
            y="0"
            width={placardW}
            height={placardH}
            rx="6"
            fill="#FFFFFF"
            stroke={primaryBrand}
            strokeWidth="1.4"
            filter="drop-shadow(0 2px 5px rgba(11, 47, 74, 0.12))"
          />

          {/* Left Brand Color Accent Strip */}
          <rect x="0" y="0" width="4.5" height={placardH} rx="2" fill={primaryBrand} />

          {/* ONLY 1: OFFICIAL REAL CLIENT LOGO (Dynamic Upload or PDF Brochure Asset) */}
          {realLogoSrc ? (
            <image
              href={realLogoSrc}
              x="10"
              y={(placardH - 32) / 2}
              width="36"
              height="32"
              preserveAspectRatio="xMidYMid meet"
            />
          ) : (
            <g transform={`translate(10, ${(placardH - 30) / 2})`}>
              <rect width="30" height="30" rx="6" fill={primaryBrand} opacity="0.12" />
              <text
                x="15"
                y="16"
                dominantBaseline="central"
                textAnchor="middle"
                fontFamily="sans-serif"
                fontSize="13"
                fontWeight="900"
                fill={primaryBrand}
              >
                {(displayName || 'C').charAt(0).toUpperCase()}
              </text>
            </g>
          )}

          {/* ONLY 2: COMPANY NAME - Perfectly aligned with generous right margin */}
          <text
            x="52"
            y={placardH / 2 + 0.5}
            dominantBaseline="central"
            textAnchor="start"
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontSize={fontSize}
            fontWeight="900"
            fill={primaryBrand}
            letterSpacing="-0.015em"
          >
            {displayName}
          </text>
        </g>
      </svg>
    </div>
  );
}
