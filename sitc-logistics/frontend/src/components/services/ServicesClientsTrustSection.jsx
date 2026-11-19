'use client';

import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  X,
  Truck,
  ArrowRight,
} from 'lucide-react';
import RealisticHighwayTruck from './RealisticHighwayTruck';
import './ServicesClientsTrustSection.css';

// ============================================================================
// CLIENT DEFINITIONS - CLEAN: ONLY VECTOR LOGO + OFFICIAL COMPANY NAME
// ============================================================================
const CLIENTS_LANE_EAST = [
  {
    id: 'reliance',
    name: 'Reliance Industries Limited',
    displayName: 'Reliance Industries',
    primaryColor: '#003366',
    accentColor: '#D32F2F',
    truckModel: 'Volvo FM 420 Cute Express',
    trailerType: '28ft Express Container',
    cargoType: 'Polymer Pellets & Petrochemical Freight',
    corridor: 'Jamnagar Petrochem Belt ➔ Hazira Port',
    verifiedSince: '2008',
    slaScore: '99.9%',
    renderLogo: (size = 28) => (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="7" fill="#003366" />
        <circle cx="16" cy="16" r="11" fill="#002244" stroke="#E8B94F" strokeWidth="1" />
        <polygon points="16,8 19,14 16,18 13,14" fill="#E8B94F" />
        <polygon points="16,18 20,22 16,25 12,22" fill="#D32F2F" />
        <circle cx="16" cy="16" r="2" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: 'indianoil',
    name: 'Indian Oil Corporation',
    displayName: 'IndianOil (IOCL)',
    primaryColor: '#F37021',
    accentColor: '#0B2545',
    truckModel: 'Tata Signa City Express',
    trailerType: '24ft Weatherproof Container',
    cargoType: 'Refined Bulk Polymers & Industrial Lube Packs',
    corridor: 'Koyali Refinery ➔ Pan-India Regional Depots',
    verifiedSince: '2011',
    slaScore: '99.8%',
    renderLogo: (size = 28) => (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="15" fill="#FFFFFF" stroke="#0B2545" strokeWidth="1.2" />
        <circle cx="16" cy="16" r="13.5" fill="#F37021" />
        <rect x="2.5" y="11" width="27" height="10" fill="#0B2545" />
        <text
          x="16"
          y="18"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="5.2"
          fontWeight="900"
          fontFamily="sans-serif"
          letterSpacing="0.04em"
        >
          इंडियनऑयल
        </text>
      </svg>
    ),
  },
  {
    id: 'nayara',
    name: 'Nayara Energy',
    displayName: 'Nayara Energy',
    primaryColor: '#004F71',
    accentColor: '#00A3E0',
    truckModel: 'Scania P360 Urban Hauler',
    trailerType: '28ft High Cube Container',
    cargoType: 'Specialized Polymers & Downstream Energy',
    corridor: 'Vadinar Refinery ➔ Hazira SEZ',
    verifiedSince: '2014',
    slaScore: '99.7%',
    renderLogo: (size = 28) => (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="7" fill="#004F71" />
        <circle cx="16" cy="16" r="11" fill="#003952" />
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 60 * Math.PI) / 180;
          return (
            <ellipse
              key={`nayara-blossom-${i}`}
              cx={16 + Math.cos(angle) * 5.5}
              cy={16 + Math.sin(angle) * 5.5}
              rx="3.2"
              ry="1.8"
              transform={`rotate(${i * 60}, ${16 + Math.cos(angle) * 5.5}, ${16 + Math.sin(angle) * 5.5})`}
              fill="#00A3E0"
            />
          );
        })}
        <circle cx="16" cy="16" r="2.5" fill="#E8B94F" />
      </svg>
    ),
  },
  {
    id: 'ongc',
    name: 'Oil & Natural Gas Corporation',
    displayName: 'ONGC',
    primaryColor: '#A72B2A',
    accentColor: '#F59E0B',
    truckModel: 'BharatBenz 2823R Energy Liner',
    trailerType: '26ft Industrial Rig Container',
    cargoType: 'Industrial Valves & Energy Hardware',
    corridor: 'Ankleshwar Assets ➔ Hazira Logistics Base',
    verifiedSince: '2009',
    slaScore: '99.8%',
    renderLogo: (size = 28) => (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="7" fill="#A72B2A" />
        <circle cx="16" cy="16" r="11.5" fill="#881E1E" />
        <polygon points="16,8 18,22 14,22" fill="#FFFFFF" />
        <line x1="13" y1="15" x2="19" y2="15" stroke="#FFFFFF" strokeWidth="1" />
        <line x1="11" y1="19" x2="21" y2="19" stroke="#FFFFFF" strokeWidth="1.2" />
        <ellipse cx="16" cy="7.5" rx="2" ry="2.8" fill="#F59E0B" />
        <circle cx="16" cy="7.5" r="1" fill="#FFE082" />
      </svg>
    ),
  },
];

const CLIENTS_LANE_WEST = [
  {
    id: 'gaay-besan',
    name: 'Gaay Chhap Besan',
    displayName: 'Gaay Chhap Besan',
    primaryColor: '#D32F2F',
    accentColor: '#F59E0B',
    truckModel: 'Eicher Pro 3019 Clean Food Carrier',
    trailerType: '24ft Food-Grade FMCG Container',
    cargoType: 'Packaged Food Grade Besan & Flour Distribution',
    corridor: 'Ahmedabad Hub ➔ Interstate Retail Corridors',
    verifiedSince: '2005',
    slaScore: '99.9%',
    renderLogo: (size = 28) => (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="7" fill="#D32F2F" />
        <circle cx="16" cy="16" r="12" fill="#FFFBEB" stroke="#E8B94F" strokeWidth="1" />
        <path
          d="M 11,20 L 11,16 Q 11,13 15,13 L 19,13 Q 21,13 21,15 L 21,20 Z"
          fill="#D97706"
        />
        <circle cx="20" cy="12" r="2" fill="#D97706" />
        <rect x="7" y="21.5" width="18" height="5.5" rx="1.5" fill="#D32F2F" />
        <text
          x="16"
          y="25.5"
          textAnchor="middle"
          fill="#FFE082"
          fontSize="4"
          fontWeight="900"
          fontFamily="sans-serif"
        >
          गाय छाप
        </text>
      </svg>
    ),
  },
  {
    id: 'hpcl',
    name: 'Hindustan Petroleum Corporation',
    displayName: 'Hindustan Petroleum',
    primaryColor: '#154284',
    accentColor: '#DE2010',
    truckModel: 'Volvo FM 380 Clean Linehaul',
    trailerType: '28ft Insulated Lube Container',
    cargoType: 'Packed Industrial Lubricants & Petroleum Goods',
    corridor: 'Mumbai / Vadodara ➔ Gujarat Industrial Belts',
    verifiedSince: '2007',
    slaScore: '99.8%',
    renderLogo: (size = 28) => (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="15" fill="#FFFFFF" stroke="#154284" strokeWidth="1.2" />
        <circle cx="16" cy="16" r="13" fill="#154284" />
        <path
          d="M 16,6 C 19.5,11 21,13.5 21,16.5 C 21,19.5 18.8,21.5 16,21.5 C 13.2,21.5 11,19.5 11,16.5 C 11,13.5 12.5,11 16,6 Z"
          fill="#DE2010"
        />
        <circle cx="16" cy="17" r="2.2" fill="#FFFFFF" />
        <text
          x="16"
          y="28"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="5"
          fontWeight="900"
          fontFamily="sans-serif"
          letterSpacing="0.08em"
        >
          HP
        </text>
      </svg>
    ),
  },
  {
    id: 'opal',
    name: 'ONGC Petro additions Limited',
    displayName: 'OPaL',
    primaryColor: '#851A1D',
    accentColor: '#0D9488',
    truckModel: 'Tata Ultra T.16 High Cube',
    trailerType: '24ft Polymer Heavy Container',
    cargoType: 'High-Density Polyethylene & Polypropylene',
    corridor: 'Dahej SEZ Complex ➔ Pan-India Belts',
    verifiedSince: '2015',
    slaScore: '99.9%',
    renderLogo: (size = 28) => (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="7" fill="#851A1D" />
        <polygon
          points="16,8 23,12 23,20 16,24 9,20 9,12"
          fill="none"
          stroke="#0D9488"
          strokeWidth="1.8"
        />
        <circle cx="16" cy="8" r="2" fill="#FFFFFF" />
        <circle cx="23" cy="12" r="2" fill="#FFFFFF" />
        <circle cx="23" cy="20" r="2" fill="#FFFFFF" />
        <circle cx="16" cy="24" r="2" fill="#FFFFFF" />
        <circle cx="9" cy="20" r="2" fill="#FFFFFF" />
        <circle cx="9" cy="12" r="2" fill="#FFFFFF" />
        <circle cx="16" cy="16" r="3" fill="#0D9488" />
      </svg>
    ),
  },
  {
    id: 'hmel',
    name: 'HPCL-Mittal Energy Limited',
    displayName: 'HMEL',
    primaryColor: '#1B4D3E',
    accentColor: '#0A2540',
    truckModel: 'Scania G410 Cute Liner',
    trailerType: '28ft High Cube Specialized Liner',
    cargoType: 'Petrochemical Polymers & Specialty Plastics',
    corridor: 'Bathinda Refinery / Gujarat ➔ Export Ports',
    verifiedSince: '2013',
    slaScore: '99.8%',
    renderLogo: (size = 28) => (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="7" fill="#1B4D3E" />
        <circle cx="16" cy="16" r="11" fill="#12382D" stroke="#00A3E0" strokeWidth="0.8" />
        <ellipse cx="14" cy="14" rx="6" ry="3" transform="rotate(-30, 14, 14)" fill="none" stroke="#22C55E" strokeWidth="1.5" />
        <ellipse cx="18" cy="18" rx="6" ry="3" transform="rotate(30, 18, 18)" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="2" fill="#E8B94F" />
      </svg>
    ),
  },
];

export default function ServicesClientsTrustSection({ data }) {
  const [selectedTruck, setSelectedTruck] = useState(null);
  const kicker = data?.kicker || 'PDF BROCHURE: OUR TOP CLIENTS';
  const title = data?.title || 'Pan-India Highway Conveyor: Trusted By Industrial Giants';
  const subtitle =
    data?.subtitle ||
    'SRTC’s compact commercial linehaul fleet in continuous motion across National Highways. Dedicated container trucks transporting petrochemicals, polymers, agro commodities, and heavy industrial freight.';

  // Dynamic client trucks from MongoDB Atlas or brochure fallbacks
  const laneEastTrucks =
    data?.laneEast && data.laneEast.length > 0 ? data.laneEast : CLIENTS_LANE_EAST;
  const laneWestTrucks =
    data?.laneWest && data.laneWest.length > 0 ? data.laneWest : CLIENTS_LANE_WEST;

  // Dynamic stats
  const stats =
    data?.stats && data.stats.length > 0
      ? data.stats
      : [
          { num: '23+', lbl: 'Years Industry Legacy' },
          { num: '100%', lbl: 'Insured Cargo Transit' },
          { num: '840+', lbl: 'Commercial Linehaul Fleet' },
          { num: '99.8%', lbl: 'On-Time SLA Delivery' },
        ];

  return (
    <section className="srtc-clients-trust-section" aria-label="Our Esteemed Enterprise Clients Fleet in Motion">
      <div className="srtc-clients-container">
        {/* Section Header */}
        <div className="srtc-clients-header">
          <div className="srtc-clients-kicker">
            <Building2 size={14} className="srtc-clients-kicker-icon" />
            <span>{kicker}</span>
          </div>

          <h2 className="srtc-clients-title">
            {title}
          </h2>

          <p className="srtc-clients-subtitle">
            {subtitle}
          </p>
        </div>

        {/* ===================================================================
            HIGHWAY SURFACE & DUAL-LANE CUTE TRUCK CONVEYOR (Clean & Modern)
            =================================================================== */}
        <div className="srtc-highway-corridor">
          {/* ---------------------------------------------------------------
              LANE 1 (EASTBOUND: LEFT TO RIGHT, CUTE TRUCKS)
              --------------------------------------------------------------- */}
          <div className="srtc-highway-lane srtc-highway-lane--east">
            <div className="srtc-truck-track srtc-truck-track--east">
              {/* Set 1: Original */}
              <div className="srtc-truck-group">
                {laneEastTrucks.map((client) => (
                  <RealisticHighwayTruck
                    key={`east-set1-${client.id}`}
                    client={client}
                    direction="right"
                    isSelected={selectedTruck?.id === client.id}
                    onClick={() => setSelectedTruck(client)}
                  />
                ))}
              </div>

              {/* Set 2: Duplicate for Infinite Seamless Marquee Loop */}
              <div className="srtc-truck-group" aria-hidden="true">
                {laneEastTrucks.map((client) => (
                  <RealisticHighwayTruck
                    key={`east-set2-${client.id}`}
                    client={client}
                    direction="right"
                    isSelected={selectedTruck?.id === client.id}
                    onClick={() => setSelectedTruck(client)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Highway Median & Yellow Divider Line with Road Studs */}
          <div className="srtc-highway-median">
            <div className="srtc-highway-catseye-row">
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={`catseye-${i}`} className="srtc-highway-catseye" />
              ))}
            </div>
          </div>

          {/* ---------------------------------------------------------------
              LANE 2 (WESTBOUND: RIGHT TO LEFT, CUTE TRUCKS)
              --------------------------------------------------------------- */}
          <div className="srtc-highway-lane srtc-highway-lane--west">
            <div className="srtc-truck-track srtc-truck-track--west">
              {/* Set 1: Original */}
              <div className="srtc-truck-group">
                {laneWestTrucks.map((client) => (
                  <RealisticHighwayTruck
                    key={`west-set1-${client.id}`}
                    client={client}
                    direction="left"
                    isSelected={selectedTruck?.id === client.id}
                    onClick={() => setSelectedTruck(client)}
                  />
                ))}
              </div>

              {/* Set 2: Duplicate for Infinite Seamless Marquee Loop */}
              <div className="srtc-truck-group" aria-hidden="true">
                {laneWestTrucks.map((client) => (
                  <RealisticHighwayTruck
                    key={`west-set2-${client.id}`}
                    client={client}
                    direction="left"
                    isSelected={selectedTruck?.id === client.id}
                    onClick={() => setSelectedTruck(client)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            OPTIONAL TELEMATICS MODAL (When clicking a truck)
            =================================================================== */}
        {selectedTruck && (
          <div className="srtc-telematics-modal-overlay" onClick={() => setSelectedTruck(null)}>
            <div
              className="srtc-telematics-modal-card"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <button
                type="button"
                className="srtc-telematics-close-btn"
                onClick={() => setSelectedTruck(null)}
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="srtc-telematics-header">
                <div className="srtc-telematics-logo-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedTruck.logo || `/images/clients/real/${selectedTruck.id}.png`}
                    alt={selectedTruck.displayName}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div className="srtc-telematics-title-group">
                  <div className="srtc-telematics-badge">
                    <ShieldCheck size={13} />
                    <span>VERIFIED CONTRACT CLIENT SINCE {selectedTruck.verifiedSince}</span>
                  </div>
                  <h3 className="srtc-telematics-name">{selectedTruck.name}</h3>
                </div>
              </div>

              <div className="srtc-telematics-grid">
                <div className="srtc-telematics-item">
                  <span className="srtc-telematics-lbl">Vehicle Configuration</span>
                  <strong className="srtc-telematics-val">{selectedTruck.truckModel}</strong>
                </div>

                <div className="srtc-telematics-item">
                  <span className="srtc-telematics-lbl">Container Specification</span>
                  <strong className="srtc-telematics-val">{selectedTruck.trailerType}</strong>
                </div>

                <div className="srtc-telematics-item">
                  <span className="srtc-telematics-lbl">Cargo Manifest</span>
                  <strong className="srtc-telematics-val">{selectedTruck.cargoType}</strong>
                </div>

                <div className="srtc-telematics-item">
                  <span className="srtc-telematics-lbl">Active Route Corridor</span>
                  <strong className="srtc-telematics-val">{selectedTruck.corridor}</strong>
                </div>

                <div className="srtc-telematics-item">
                  <span className="srtc-telematics-lbl">GPS Telematics</span>
                  <strong className="srtc-telematics-val" style={{ color: '#10B981' }}>
                    AIS-140 Verified · Electronic Tamper Seal Active
                  </strong>
                </div>

                <div className="srtc-telematics-item">
                  <span className="srtc-telematics-lbl">On-Time SLA Delivery</span>
                  <strong className="srtc-telematics-val" style={{ color: '#E8B94F' }}>
                    {selectedTruck.slaScore} Guaranteed Arrival
                  </strong>
                </div>
              </div>

              <div className="srtc-telematics-footer">
                <a
                  href="#contact-quote-section"
                  className="srtc-telematics-cta"
                  onClick={() => setSelectedTruck(null)}
                >
                  <Truck size={15} />
                  <span>Book Dedicated Linehaul Fleet</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Trust Credentials Bar */}
        <div className="srtc-clients-stats-bar">
          {stats.map((st, i) => (
            <React.Fragment key={`stat-${i}`}>
              <div className="srtc-clients-stat-box">
                <span className="srtc-clients-stat-num">{st.num}</span>
                <span className="srtc-clients-stat-lbl">{st.lbl}</span>
              </div>
              {i < stats.length - 1 && <div className="srtc-clients-stat-sep" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
