'use client';

import React from 'react';

export default function ProcessTruckBlueprint() {
  return (
    <div className="sitc-proc-truck-bg" aria-hidden="true">
      {/* Soft Ambient Depth Halos */}
      <div className="sitc-proc-ambient-glow sitc-proc-ambient-glow--top" />
      <div className="sitc-proc-ambient-glow sitc-proc-ambient-glow--bottom" />

      {/* Technical CAD Blueprint Vector: Commercial Heavy Haulage 6x4 Tractor-Trailer */}
      <svg
        viewBox="0 0 1600 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="sitc-proc-truck-svg"
        preserveAspectRatio="xMidYBottom slice"
      >
        <defs>
          {/* Subtle Technical Blueprint Dot-Grid */}
          <pattern id="srtc-cad-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.9" fill="currentColor" fillOpacity="0.35" />
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.18" />
          </pattern>

          {/* Linear Highway Gradient Fade */}
          <linearGradient id="srtc-road-fade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
            <stop offset="15%" stopColor="currentColor" stopOpacity="0.6" />
            <stop offset="85%" stopColor="currentColor" stopOpacity="0.6" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
          </linearGradient>

          {/* Transit Pulse Glow */}
          <radialGradient id="srtc-transit-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1769D2" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1769D2" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* CAD Grid Background Layer */}
        <rect x="0" y="20" width="1600" height="450" fill="url(#srtc-cad-grid)" />

        {/* ===================================================================
            1. HIGHWAY TRANSIT CORRIDOR & ROAD BASELINE
            =================================================================== */}
        {/* Road Surface Line */}
        <line x1="20" y1="420" x2="1580" y2="420" stroke="url(#srtc-road-fade)" strokeWidth="1.5" />
        {/* Highway Lane Demarcation (Dashed) */}
        <line x1="20" y1="434" x2="1580" y2="434" stroke="url(#srtc-road-fade)" strokeWidth="1.2" strokeDasharray="14 10" />

        {/* Milestone Distance Ticks */}
        <g transform="translate(100, 420)">
          <line x1="0" y1="-5" x2="0" y2="12" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="0" cy="0" r="2.5" fill="currentColor" fillOpacity="0.7" />
          <text x="6" y="10" fill="currentColor" fillOpacity="0.55" fontSize="8.5" fontFamily="monospace" fontWeight="600">KM 000 • ORIGIN TERMINAL</text>
        </g>
        <g transform="translate(420, 420)">
          <line x1="0" y1="-5" x2="0" y2="12" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="0" cy="0" r="2.5" fill="currentColor" fillOpacity="0.7" />
          <text x="6" y="10" fill="currentColor" fillOpacity="0.55" fontSize="8.5" fontFamily="monospace" fontWeight="600">KM 280 • TOLL & WEIGH BRIDGE</text>
        </g>
        <g transform="translate(800, 420)">
          <line x1="0" y1="-5" x2="0" y2="12" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="0" cy="0" r="2.5" fill="currentColor" fillOpacity="0.7" />
          <text x="6" y="10" fill="currentColor" fillOpacity="0.55" fontSize="8.5" fontFamily="monospace" fontWeight="600">KM 560 • INTERSTATE CORRIDOR</text>
        </g>
        <g transform="translate(1180, 420)">
          <line x1="0" y1="-5" x2="0" y2="12" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="0" cy="0" r="2.5" fill="currentColor" fillOpacity="0.7" />
          <text x="6" y="10" fill="currentColor" fillOpacity="0.55" fontSize="8.5" fontFamily="monospace" fontWeight="600">KM 840 • HIGHWAY TRANSIT CORRIDOR</text>
        </g>
        <g transform="translate(1460, 420)">
          <line x1="0" y1="-5" x2="0" y2="12" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="0" cy="0" r="2.5" fill="currentColor" fillOpacity="0.7" />
          <text x="6" y="10" fill="currentColor" fillOpacity="0.55" fontSize="8.5" fontFamily="monospace" fontWeight="600">KM 1120 • CFS GATE</text>
        </g>

        {/* Active Highway Transit Pulse Packet (Native Smooth SVG Animation) */}
        <g className="sitc-proc-telemetry-ping">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="40 0; 1560 0"
            dur="12s"
            repeatCount="indefinite"
          />
          <circle cx="0" cy="420" r="14" fill="url(#srtc-transit-glow)" />
          <circle cx="0" cy="420" r="3.5" fill="#1769D2" />
        </g>

        {/* ===================================================================
            2. COMMERCIAL FREIGHT TRACTOR CAB (PRIME MOVER - 6x4)
            =================================================================== */}
        {/* Cab Main Profile Outline */}
        <path
          d="
            M 145 378
            L 145 408
            L 192 408
            L 196 385
            A 38 38 0 0 1 268 385
            L 278 385
            L 278 402
            L 388 402
            L 388 385
            L 408 385
            A 38 38 0 0 1 480 385
            L 490 385
            A 38 38 0 0 1 562 385
            L 572 385
            L 572 408
            L 560 408
            L 560 365
            L 435 365
            L 435 115
            L 345 115
            C 295 115 258 128 226 154
            L 155 255
            L 145 285
            L 145 378
            Z
          "
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* Windshield & A-Pillar */}
        <path
          d="M 160 252 L 222 160 L 280 160 L 280 248 L 168 248 Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeOpacity="0.8"
        />
        {/* Aerodynamic Sun Visor */}
        <line x1="148" y1="246" x2="168" y2="216" stroke="currentColor" strokeWidth="2" />

        {/* Front Grille Louvers */}
        <line x1="145" y1="298" x2="185" y2="298" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="145" y1="316" x2="188" y2="316" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="145" y1="334" x2="190" y2="334" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="145" y1="352" x2="190" y2="352" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />

        {/* Headlight Cluster */}
        <rect x="146" y="358" width="12" height="15" rx="2" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.85" />
        <line x1="149" y1="365" x2="155" y2="365" stroke="currentColor" strokeWidth="1" />

        {/* Driver Cab Door Seam */}
        <path
          d="M 168 252 L 286 252 L 286 374 L 202 374"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeDasharray="4 2"
          strokeOpacity="0.7"
        />
        {/* Door Handle */}
        <rect x="268" y="270" width="10" height="3" rx="1.5" stroke="currentColor" strokeWidth="1" />

        {/* Side Mirror Assembly */}
        <rect x="156" y="210" width="6" height="26" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <line x1="162" y1="216" x2="170" y2="216" stroke="currentColor" strokeWidth="1" />
        <line x1="162" y1="232" x2="172" y2="232" stroke="currentColor" strokeWidth="1" />

        {/* Aluminum Fuel Tank with Mounting Straps */}
        <rect x="284" y="362" width="98" height="36" rx="10" stroke="currentColor" strokeWidth="1.4" />
        <line x1="304" y1="362" x2="304" y2="398" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7" />
        <line x1="362" y1="362" x2="362" y2="398" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7" />
        <circle cx="333" cy="372" r="3.5" stroke="currentColor" strokeWidth="1" />

        {/* Fifth Wheel Coupling (Turntable Hitch) */}
        <path d="M 462 350 L 515 350 L 522 358 L 455 358 Z" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="488" cy="354" r="3" stroke="currentColor" strokeWidth="1" />

        {/* Exhaust Stack / Catalyst Column */}
        <rect x="424" y="145" width="8" height="180" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
        <path d="M 424 145 C 424 135 432 130 436 130" stroke="currentColor" strokeWidth="1.2" />

        {/* Mudflaps on Tractor Drives */}
        <line x1="568" y1="370" x2="572" y2="412" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.75" />

        {/* Tractor Wheels */}
        {/* Steer Axle Wheel at 232, 385 */}
        <g transform="translate(232, 385)">
          <circle r="34" stroke="currentColor" strokeWidth="2" />
          <circle r="22" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
          <circle r="12" stroke="currentColor" strokeWidth="1.4" />
          <circle r="5" stroke="currentColor" strokeWidth="1" />
          <circle cx="0" cy="-9" r="1.3" fill="currentColor" />
          <circle cx="7.8" cy="-4.5" r="1.3" fill="currentColor" />
          <circle cx="7.8" cy="4.5" r="1.3" fill="currentColor" />
          <circle cx="0" cy="9" r="1.3" fill="currentColor" />
          <circle cx="-7.8" cy="4.5" r="1.3" fill="currentColor" />
          <circle cx="-7.8" cy="-4.5" r="1.3" fill="currentColor" />
        </g>

        {/* Drive Axle 1 Wheel at 444, 385 */}
        <g transform="translate(444, 385)">
          <circle r="34" stroke="currentColor" strokeWidth="2" />
          <circle r="22" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
          <circle r="12" stroke="currentColor" strokeWidth="1.4" />
          <circle r="5" stroke="currentColor" strokeWidth="1" />
          <circle cx="0" cy="-9" r="1.3" fill="currentColor" />
          <circle cx="7.8" cy="-4.5" r="1.3" fill="currentColor" />
          <circle cx="7.8" cy="4.5" r="1.3" fill="currentColor" />
          <circle cx="0" cy="9" r="1.3" fill="currentColor" />
          <circle cx="-7.8" cy="4.5" r="1.3" fill="currentColor" />
          <circle cx="-7.8" cy="-4.5" r="1.3" fill="currentColor" />
        </g>

        {/* Drive Axle 2 Wheel at 526, 385 */}
        <g transform="translate(526, 385)">
          <circle r="34" stroke="currentColor" strokeWidth="2" />
          <circle r="22" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
          <circle r="12" stroke="currentColor" strokeWidth="1.4" />
          <circle r="5" stroke="currentColor" strokeWidth="1" />
          <circle cx="0" cy="-9" r="1.3" fill="currentColor" />
          <circle cx="7.8" cy="-4.5" r="1.3" fill="currentColor" />
          <circle cx="7.8" cy="4.5" r="1.3" fill="currentColor" />
          <circle cx="0" cy="9" r="1.3" fill="currentColor" />
          <circle cx="-7.8" cy="4.5" r="1.3" fill="currentColor" />
          <circle cx="-7.8" cy="-4.5" r="1.3" fill="currentColor" />
        </g>

        {/* ===================================================================
            3. 40FT HIGH-CUBE INTERMODAL FREIGHT TRAILER
            =================================================================== */}
        {/* Trailer Outer Perimeter Frame */}
        <rect
          x="465"
          y="88"
          width="1035"
          height="264"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        {/* Top Header Rail & Bottom Sill Rail */}
        <line x1="465" y1="102" x2="1500" y2="102" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.75" />
        <line x1="465" y1="338" x2="1500" y2="338" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.75" />

        {/* ISO Corner Castings (Authentic Twist-Lock Corners) */}
        <rect x="466" y="89" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="473" cy="96" r="3" stroke="currentColor" strokeWidth="1" />
        <rect x="1485" y="89" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="1492" cy="96" r="3" stroke="currentColor" strokeWidth="1" />
        <rect x="466" y="337" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="473" cy="344" r="3" stroke="currentColor" strokeWidth="1" />
        <rect x="1485" y="337" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="1492" cy="344" r="3" stroke="currentColor" strokeWidth="1" />

        {/* Structural Trailer Ribs (Precise CAD Hairline Seams) */}
        {[
          510, 555, 600, 645, 690, 735, 780, 825, 870, 915, 960,
          1005, 1050, 1095, 1140, 1185, 1230, 1275, 1320, 1365, 1410, 1455
        ].map((xPos) => (
          <line
            key={xPos}
            x1={xPos}
            y1="102"
            x2={xPos}
            y2="338"
            stroke="currentColor"
            strokeWidth="0.85"
            strokeOpacity="0.38"
          />
        ))}

        {/* Rear Door Dual Lock Rods & Cam Hardware */}
        <line x1="1478" y1="102" x2="1478" y2="338" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.8" />
        <line x1="1484" y1="102" x2="1484" y2="338" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.8" />
        <rect x="1475" y="240" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1" strokeOpacity="0.8" />

        {/* Chassis I-Beam Under Trailer */}
        <rect x="520" y="352" width="975" height="14" stroke="currentColor" strokeWidth="1.4" />
        <line x1="520" y1="359" x2="1495" y2="359" stroke="currentColor" strokeWidth="0.8" strokeDasharray="6 3" strokeOpacity="0.6" />

        {/* Landing Gear (Dual Telescopic Support Legs & Diagonal Strut) */}
        <g transform="translate(620, 366)">
          <rect x="0" y="0" width="12" height="42" stroke="currentColor" strokeWidth="1.4" />
          <line x1="-15" y1="0" x2="6" y2="38" stroke="currentColor" strokeWidth="1.2" />
          <rect x="-4" y="42" width="20" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <line x1="12" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1" />
        </g>

        {/* Trailer Tri-Axle Suspension & Mudguard Arch */}
        <path
          d="
            M 1210 376
            L 1220 385
            A 38 38 0 0 1 1292 385
            L 1302 385
            A 38 38 0 0 1 1374 385
            L 1384 385
            A 38 38 0 0 1 1456 385
            L 1475 385
            L 1475 410
            L 1468 410
            L 1468 376
            Z
          "
          stroke="currentColor"
          strokeWidth="1.4"
        />

        {/* Trailer Wheels (Tri-Axle Heavy Haulage) */}
        {/* Axle 1 Wheel at 1256, 385 */}
        <g transform="translate(1256, 385)">
          <circle r="34" stroke="currentColor" strokeWidth="2" />
          <circle r="22" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
          <circle r="12" stroke="currentColor" strokeWidth="1.4" />
          <circle r="5" stroke="currentColor" strokeWidth="1" />
          <circle cx="0" cy="-9" r="1.3" fill="currentColor" />
          <circle cx="7.8" cy="-4.5" r="1.3" fill="currentColor" />
          <circle cx="7.8" cy="4.5" r="1.3" fill="currentColor" />
          <circle cx="0" cy="9" r="1.3" fill="currentColor" />
          <circle cx="-7.8" cy="4.5" r="1.3" fill="currentColor" />
          <circle cx="-7.8" cy="-4.5" r="1.3" fill="currentColor" />
        </g>

        {/* Axle 2 Wheel at 1338, 385 */}
        <g transform="translate(1338, 385)">
          <circle r="34" stroke="currentColor" strokeWidth="2" />
          <circle r="22" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
          <circle r="12" stroke="currentColor" strokeWidth="1.4" />
          <circle r="5" stroke="currentColor" strokeWidth="1" />
          <circle cx="0" cy="-9" r="1.3" fill="currentColor" />
          <circle cx="7.8" cy="-4.5" r="1.3" fill="currentColor" />
          <circle cx="7.8" cy="4.5" r="1.3" fill="currentColor" />
          <circle cx="0" cy="9" r="1.3" fill="currentColor" />
          <circle cx="-7.8" cy="4.5" r="1.3" fill="currentColor" />
          <circle cx="-7.8" cy="-4.5" r="1.3" fill="currentColor" />
        </g>

        {/* Axle 3 Wheel at 1420, 385 */}
        <g transform="translate(1420, 385)">
          <circle r="34" stroke="currentColor" strokeWidth="2" />
          <circle r="22" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
          <circle r="12" stroke="currentColor" strokeWidth="1.4" />
          <circle r="5" stroke="currentColor" strokeWidth="1" />
          <circle cx="0" cy="-9" r="1.3" fill="currentColor" />
          <circle cx="7.8" cy="-4.5" r="1.3" fill="currentColor" />
          <circle cx="7.8" cy="4.5" r="1.3" fill="currentColor" />
          <circle cx="0" cy="9" r="1.3" fill="currentColor" />
          <circle cx="-7.8" cy="4.5" r="1.3" fill="currentColor" />
          <circle cx="-7.8" cy="-4.5" r="1.3" fill="currentColor" />
        </g>

        {/* Rear Underride Guard (ICC Safety Bumper) */}
        <rect x="1486" y="378" width="12" height="34" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <line x1="1486" y1="395" x2="1498" y2="395" stroke="currentColor" strokeWidth="1" />
        <line x1="1476" y1="372" x2="1478" y2="414" stroke="currentColor" strokeWidth="2" strokeOpacity="0.8" />

        {/* ===================================================================
            4. CAD ENGINEERING DIMENSION CALLOUTS & RIG SPECIFICATIONS
            =================================================================== */}
        {/* Top Overall Length Dimension Line */}
        <line x1="145" y1="52" x2="1500" y2="52" stroke="currentColor" strokeWidth="0.9" strokeDasharray="4 3" strokeOpacity="0.55" />
        <line x1="145" y1="46" x2="145" y2="58" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.75" />
        <line x1="1500" y1="46" x2="1500" y2="58" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.75" />
        <text
          x="822"
          y="48"
          fill="currentColor"
          fillOpacity="0.75"
          fontSize="10"
          fontFamily="monospace"
          fontWeight="700"
          textAnchor="middle"
          letterSpacing="0.1em"
        >
          ◄── 16,500 mm OVERALL ROAD COMBINATION LENGTH ──►
        </text>

        {/* Rear Height Clearance Dimension Line */}
        <line x1="1530" y1="88" x2="1530" y2="420" stroke="currentColor" strokeWidth="0.9" strokeDasharray="4 3" strokeOpacity="0.55" />
        <line x1="1524" y1="88" x2="1536" y2="88" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.75" />
        <line x1="1524" y1="420" x2="1536" y2="420" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.75" />
        <text
          x="1542"
          y="256"
          fill="currentColor"
          fillOpacity="0.75"
          fontSize="9.5"
          fontFamily="monospace"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          4,150 mm HC
        </text>

        {/* Wheelbase Dimension Line Under Chassis */}
        <line x1="232" y1="452" x2="1256" y2="452" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 3" strokeOpacity="0.45" />
        <line x1="232" y1="447" x2="232" y2="457" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="1256" y1="447" x2="1256" y2="457" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
        <text
          x="744"
          y="464"
          fill="currentColor"
          fillOpacity="0.6"
          fontSize="8.5"
          fontFamily="monospace"
          fontWeight="600"
          textAnchor="middle"
        >
          ◄── 7,650 mm KINGPIN TO TANDEM WHEELBASE ──►
        </text>

        {/* CAD Blueprint Specification Block (Top Left) */}
        <g transform="translate(60, 42)">
          <rect
            x="0"
            y="0"
            width="250"
            height="58"
            rx="4"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeOpacity="0.4"
            fill="none"
          />
          <text x="12" y="16" fill="currentColor" fillOpacity="0.8" fontSize="8.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.06em">
            SRTC FLEET SPEC // 6x4 HEAVY HAULAGE
          </text>
          <text x="12" y="30" fill="currentColor" fillOpacity="0.6" fontSize="7.5" fontFamily="monospace" fontWeight="600">
            TRACTOR: 460 HP EURO-VI AMT PRIME MOVER
          </text>
          <text x="12" y="42" fill="currentColor" fillOpacity="0.6" fontSize="7.5" fontFamily="monospace" fontWeight="600">
            TRAILER: 40FT HIGH CUBE • PAYLOAD 32,000 KG
          </text>
          <text x="12" y="52" fill="currentColor" fillOpacity="0.6" fontSize="7" fontFamily="monospace" fontWeight="500">
            TELEMETRICS: ACTIVE DUAL-BAND GPS (24/7)
          </text>
        </g>
      </svg>
    </div>
  );
}
