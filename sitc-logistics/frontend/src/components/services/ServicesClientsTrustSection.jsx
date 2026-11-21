'use client';

import React from 'react';
import './ServicesClientsTrustSection.css';

// ============================================================================
// 8 ESTEEMED CORPORATE CLIENTS - 100% ALIGNED WITH OFFICIAL BROCHURE PAGE 5
// ============================================================================
const TOP_CLIENTS = [
  {
    id: 'gaay-besan',
    name: 'Gaay Chhap Besan',
    logo: '/images/clients/real/gaay-besan.png',
  },
  {
    id: 'indianoil',
    name: 'IndianOil',
    logo: '/images/clients/real/indianoil.png',
  },
  {
    id: 'opal',
    name: 'OPaL',
    logo: '/images/clients/real/opal.png',
  },
  {
    id: 'hpcl',
    name: 'Hindustan Petroleum',
    logo: '/images/clients/real/hpcl.png',
  },
  {
    id: 'reliance',
    name: 'Reliance Industries Limited',
    logo: '/images/clients/real/reliance.png',
  },
  {
    id: 'nayara',
    name: 'Nayara Energy',
    logo: '/images/clients/real/nayara.png',
  },
  {
    id: 'ongc',
    name: 'ONGC',
    logo: '/images/clients/real/ongc.png',
  },
  {
    id: 'hmel',
    name: 'HMEL',
    logo: '/images/clients/real/hmel.png',
  },
];

export default function ServicesClientsTrustSection({ data }) {
  const title = data?.title || 'Trusted By Industry Leaders';
  const subtitle =
    data?.subtitle ||
    'Proudly partnering with India’s foremost public and private sector enterprises across energy, petrochemicals, manufacturing, and FMCG sectors.';

  return (
    <section className="srtc-clients-trust-section" aria-label="Our Top Clients">
      <div className="srtc-clients-container">
        {/* Section Header */}
        <div className="srtc-clients-header">
          <h2 className="srtc-clients-title">
            {title}
          </h2>

          <p className="srtc-clients-subtitle">
            {subtitle}
          </p>
        </div>

        {/* ===================================================================
            OFFICIAL BROCHURE CLIENT CARDS (White Rounded Cards with Gold Border)
            =================================================================== */}
        <div className="srtc-brochure-clients-grid">
          {TOP_CLIENTS.map((client) => (
            <div key={client.id} className="srtc-brochure-client-card" title={client.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={client.logo}
                alt={client.name}
                className="srtc-brochure-client-logo"
                onError={(e) => {
                  e.currentTarget.src = `/images/clients/client-${client.id}.png`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
