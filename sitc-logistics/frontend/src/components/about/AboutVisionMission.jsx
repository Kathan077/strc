'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Target,
  Eye,
  ShieldCheck,
  Leaf,
  Cpu,
  Award,
  Zap,
  Truck,
  Lock,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Barcode,
} from 'lucide-react';
import './AboutVisionMission.css';

const ICON_MAP = {
  Leaf,
  ShieldCheck,
  Cpu,
  Award,
  Zap,
  TrendingUp,
  Truck,
  Target,
  Compass,
  Eye,
};

export default function AboutVisionMission({ data }) {
  const [activeTab, setActiveTab] = useState('both'); // 'both' | 'mission' | 'vision'

  const kicker = data?.kicker || 'STRATEGIC COMPASS & CORPORATE PURPOSE';
  const title = data?.title || 'Driven by Mission, Powered by Vision';
  const subtitle =
    data?.subtitle ||
    'Founded on two decades of heavy highway transit leadership, our corporate compass guides every haul, secures every industrial cargo, and powers supply chains across India.';

  const mission = data?.mission || {};
  const missionPillars = mission.pillars || [];
  const missionSpecs = mission.specs || {
    payload: '32,500 KG',
    corridors: '180+ EXPRESS',
    compliance: '100% REGULATORY',
  };

  const vision = data?.vision || {};
  const visionPillars = vision.pillars || [];
  const visionSpecs = vision.specs || {
    horizon: 'PAN-INDIA LEAD',
    activeFleet: '840+ HEAVY TRUCKS',
    reliability: '23+ YEARS PROVEN',
  };

  const chassisCommitments = data?.chassisCommitments || [];
  const founderStrip = data?.founderStrip || {
    avatar: '/images/about/menand-odedara-founder.jpg',
    badge: 'FOUNDER',
    quote:
      '“Our commitment is simple yet unwavering: to deliver reliability, speed, and tangible value every single time our trucks hit the highway. Technology empowers our drivers, and trust drives our journey.”',
    name: 'MENAND BALUBHAI ODEDARA',
    role: 'Founder & Managing Director — Shree Ram Transportation Corporation',
    btnText: 'View Haulage Services',
    btnLink: '/services',
  };

  return (
    <section className="srtc-vm-section" aria-label="SRTC Vision and Mission">
      {/* Subtle Highway CAD Blueprint & Ambient Lighting */}
      <div className="srtc-vm-bg" aria-hidden="true">
        <div className="srtc-vm-bg__grid" />
        <div className="srtc-vm-bg__radial srtc-vm-bg__radial--gold" />
        <div className="srtc-vm-bg__radial srtc-vm-bg__radial--navy" />
      </div>

      <div className="srtc-vm-container">
        {/* ====================================================================
            HEADER: Strategic Compass & Purpose
            ==================================================================== */}
        <div className="srtc-vm-header">
          <div className="srtc-vm-kicker">
            <Compass size={14} className="srtc-vm-kicker__icon" />
            <span>{kicker}</span>
          </div>

          <h2 className="srtc-vm-title">
            {title.includes('Mission') && title.includes('Vision') ? (
              <>
                Driven by <span className="srtc-vm-title--gold">Mission</span>, Powered by{' '}
                <span className="srtc-vm-title--gold">Vision</span>
              </>
            ) : (
              title
            )}
          </h2>

          <p className="srtc-vm-subtitle">{subtitle}</p>

          {/* Quick Filter Switcher for Mobile & Desktop */}
          <div className="srtc-vm-filter-bar" role="tablist" aria-label="Vision Mission Selector">
            <button
              type="button"
              className={`srtc-vm-filter-btn ${activeTab === 'both' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('both')}
            >
              Dual Container View
            </button>
            <button
              type="button"
              className={`srtc-vm-filter-btn ${activeTab === 'mission' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('mission')}
            >
              Our Mission
            </button>
            <button
              type="button"
              className={`srtc-vm-filter-btn ${activeTab === 'vision' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('vision')}
            >
              Our Vision
            </button>
          </div>
        </div>

        {/* ====================================================================
            INTERMODAL CONTAINER CARGO VAULTS: REALISTIC THICK DORI SUSPENSION
            ==================================================================== */}
        <div className={`srtc-vm-grid srtc-vm-grid--${activeTab}`}>
          {/* ------------------------------------------------------------------
              VAULT 1: THE MISSION CONTAINER (Deep Imperial Navy with Corrugated Steel)
              ------------------------------------------------------------------ */}
          {(activeTab === 'both' || activeTab === 'mission') && (
            <article className="srtc-container-vault srtc-container-vault--mission">
              {/* Container Top Casting Header Frame */}
              <div className="srtc-vault-header-frame">
                <div className="srtc-vault-casting srtc-vault-casting--left">
                  <div className="srtc-vault-twistlock" />
                  <span className="srtc-vault-bolt" />
                </div>
                <div className="srtc-vault-roof-rim">
                  <span className="srtc-vault-iso-mark">SRTCU • 200309-8</span>
                  <span className="srtc-vault-iso-type">45G1 • HIGH-CUBE ISO</span>
                </div>
                <div className="srtc-vault-casting srtc-vault-casting--right">
                  <div className="srtc-vault-twistlock" />
                  <span className="srtc-vault-bolt" />
                </div>
              </div>

              {/* Realistic Corrugated Steel Ribs */}
              <div className="srtc-vault-corrugated-body" aria-hidden="true">
                <div className="srtc-steel-rib" />
                <div className="srtc-steel-rib" />
                <div className="srtc-steel-rib" />
                <div className="srtc-steel-rib" />
                <div className="srtc-steel-rib" />
                <div className="srtc-steel-rib" />
                <div className="srtc-steel-rib" />
                <div className="srtc-steel-rib" />
                <div className="srtc-steel-rib" />
                <div className="srtc-steel-rib" />
              </div>

              {/* Industrial Locking Rods & Door Hardware */}
              <div className="srtc-vault-hardware" aria-hidden="true">
                <div className="srtc-locking-bar srtc-locking-bar--left">
                  <span className="srtc-cam-keeper srtc-cam-keeper--top" />
                  <span className="srtc-lock-handle" />
                  <span className="srtc-cam-keeper srtc-cam-keeper--bottom" />
                </div>
                <div className="srtc-locking-bar srtc-locking-bar--right">
                  <span className="srtc-cam-keeper srtc-cam-keeper--top" />
                  <span className="srtc-lock-handle" />
                  <span className="srtc-cam-keeper srtc-cam-keeper--bottom" />
                </div>
              </div>

              {/* Unified Hanging Assembly: Thick Dori + Poster */}
              <div className="srtc-hanging-assembly srtc-hanging-assembly--mission">
                <div className="srtc-dori-harness" aria-hidden="true">
                  <div className="srtc-dori-strand srtc-dori-strand--left">
                    <div className="srtc-dori-bracket">
                      <span className="srtc-dori-bolt" />
                    </div>
                    <div className="srtc-dori-cord" />
                  </div>
                  <div className="srtc-dori-strand srtc-dori-strand--right">
                    <div className="srtc-dori-bracket">
                      <span className="srtc-dori-bolt" />
                    </div>
                    <div className="srtc-dori-cord" />
                  </div>
                </div>

                <div className="srtc-container-poster srtc-container-poster--mission">
                  <div className="srtc-poster-hole srtc-poster-hole--left" aria-hidden="true">
                    <div className="srtc-grommet-ring">
                      <div className="srtc-grommet-core" />
                    </div>
                    <div className="srtc-dori-knot" />
                  </div>
                  <div className="srtc-poster-hole srtc-poster-hole--right" aria-hidden="true">
                    <div className="srtc-grommet-ring">
                      <div className="srtc-grommet-core" />
                    </div>
                    <div className="srtc-dori-knot" />
                  </div>

                  <div className="srtc-poster-manifest">
                    <div className="srtc-poster-manifest__left">
                      <span className="srtc-poster-stamp">
                        <FileCheck2 size={12} />
                        SRTC OFFICIAL MANIFEST
                      </span>
                      <span className="srtc-poster-doc-id">{mission.docId || 'DOC: MSN-2003 / REV-04'}</span>
                    </div>
                    <div className="srtc-poster-manifest__barcode" aria-hidden="true">
                      <Barcode size={28} className="srtc-barcode-icon" />
                      <span className="srtc-barcode-text">{mission.barcodeText || '||||||| 2003 840 994'}</span>
                    </div>
                  </div>

                  <div className="srtc-poster-meta">
                    <div className="srtc-poster-badge srtc-poster-badge--mission">
                      <Target size={14} className="srtc-poster-badge__icon" />
                      <span>{mission.badge || 'OPERATIONAL ROADMAP'}</span>
                    </div>
                    <div className="srtc-poster-seal">
                      <Lock size={12} />
                      <span>{mission.seal || 'SEAL: SRTC-MSN-2003'}</span>
                    </div>
                  </div>

                  <h3 className="srtc-poster-title">
                    Our <span className="srtc-poster-highlight">Mission</span>
                  </h3>
                  <h4 className="srtc-poster-tagline">
                    {mission.tagline || "Revolutionizing India's Transportation Landscape"}
                  </h4>
                  <hr className="srtc-poster-divider" />

                  <p className="srtc-poster-paragraph">
                    {mission.paragraph ||
                      'Our mission is to revolutionize the transportation landscape by delivering seamless, eco-friendly, and technology-advanced transport solutions.'}
                  </p>

                  <div className="srtc-poster-pillars">
                    {missionPillars.map((pillar, idx) => {
                      const IconComponent = ICON_MAP[pillar.icon] || Leaf;
                      return (
                        <div key={idx} className="srtc-poster-pillar-card">
                          <div className="srtc-poster-pillar-card__icon-box srtc-poster-pillar-card__icon-box--gold">
                            <IconComponent size={18} />
                          </div>
                          <div className="srtc-poster-pillar-card__body">
                            <h5 className="srtc-poster-pillar-card__title">{pillar.title}</h5>
                            <p className="srtc-poster-pillar-card__desc">{pillar.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="srtc-poster-spec-footer">
                    <div className="srtc-poster-spec-cell">
                      <span className="srtc-poster-spec-cell__label">COMPLIANCE</span>
                      <span className="srtc-poster-spec-cell__val">{missionSpecs.compliance || '100% REGULATORY'}</span>
                    </div>
                    <div className="srtc-poster-spec-cell">
                      <span className="srtc-poster-spec-cell__label">SAFETY MANDATE</span>
                      <span className="srtc-poster-spec-cell__val">{missionSpecs.safety || 'ZERO-HARM STANDARD'}</span>
                    </div>
                    <div className="srtc-poster-spec-cell">
                      <span className="srtc-poster-spec-cell__label">DRIVERS</span>
                      <span className="srtc-poster-spec-cell__val">{missionSpecs.drivers || 'PROFESSIONAL STAFF'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="srtc-vault-bottom-frame">
                <div className="srtc-vault-casting srtc-vault-casting--left">
                  <div className="srtc-vault-twistlock" />
                  <span className="srtc-vault-bolt" />
                </div>
                <div className="srtc-vault-bottom-bar">
                  <span>HEAVY ROAD CARGO CONTAINER • SHREE RAM TRANSPORTATION</span>
                </div>
                <div className="srtc-vault-casting srtc-vault-casting--right">
                  <div className="srtc-vault-twistlock" />
                  <span className="srtc-vault-bolt" />
                </div>
              </div>
            </article>
          )}

          {/* ------------------------------------------------------------------
              VAULT 2: THE VISION CONTAINER (Imperial Navy with Corrugated Steel)
              ------------------------------------------------------------------ */}
          {(activeTab === 'both' || activeTab === 'vision') && (
            <article className="srtc-container-vault srtc-container-vault--vision">
              <div className="srtc-vault-header-frame">
                <div className="srtc-vault-casting srtc-vault-casting--left">
                  <div className="srtc-vault-twistlock" />
                  <span className="srtc-vault-bolt" />
                </div>
                <div className="srtc-vault-roof-rim">
                  <span className="srtc-vault-iso-mark">SRTCU • 203009-4</span>
                  <span className="srtc-vault-iso-type">45G1 • HIGH-CUBE ISO</span>
                </div>
                <div className="srtc-vault-casting srtc-vault-casting--right">
                  <div className="srtc-vault-twistlock" />
                  <span className="srtc-vault-bolt" />
                </div>
              </div>

              <div className="srtc-vault-corrugated-body" aria-hidden="true">
                <div className="srtc-steel-rib" />
                <div className="srtc-steel-rib" />
                <div className="srtc-steel-rib" />
                <div className="srtc-steel-rib" />
                <div className="srtc-steel-rib" />
                <div className="srtc-steel-rib" />
                <div className="srtc-steel-rib" />
                <div className="srtc-steel-rib" />
                <div className="srtc-steel-rib" />
                <div className="srtc-steel-rib" />
              </div>

              <div className="srtc-vault-hardware" aria-hidden="true">
                <div className="srtc-locking-bar srtc-locking-bar--left">
                  <span className="srtc-cam-keeper srtc-cam-keeper--top" />
                  <span className="srtc-lock-handle" />
                  <span className="srtc-cam-keeper srtc-cam-keeper--bottom" />
                </div>
                <div className="srtc-locking-bar srtc-locking-bar--right">
                  <span className="srtc-cam-keeper srtc-cam-keeper--top" />
                  <span className="srtc-lock-handle" />
                  <span className="srtc-cam-keeper srtc-cam-keeper--bottom" />
                </div>
              </div>

              <div className="srtc-hanging-assembly srtc-hanging-assembly--vision">
                <div className="srtc-dori-harness" aria-hidden="true">
                  <div className="srtc-dori-strand srtc-dori-strand--left">
                    <div className="srtc-dori-bracket">
                      <span className="srtc-dori-bolt" />
                    </div>
                    <div className="srtc-dori-cord" />
                  </div>
                  <div className="srtc-dori-strand srtc-dori-strand--right">
                    <div className="srtc-dori-bracket">
                      <span className="srtc-dori-bolt" />
                    </div>
                    <div className="srtc-dori-cord" />
                  </div>
                </div>

                <div className="srtc-container-poster srtc-container-poster--vision">
                  <div className="srtc-poster-hole srtc-poster-hole--left" aria-hidden="true">
                    <div className="srtc-grommet-ring">
                      <div className="srtc-grommet-core" />
                    </div>
                    <div className="srtc-dori-knot" />
                  </div>
                  <div className="srtc-poster-hole srtc-poster-hole--right" aria-hidden="true">
                    <div className="srtc-grommet-ring">
                      <div className="srtc-grommet-core" />
                    </div>
                    <div className="srtc-dori-knot" />
                  </div>

                  <div className="srtc-poster-manifest">
                    <div className="srtc-poster-manifest__left">
                      <span className="srtc-poster-stamp srtc-poster-stamp--vision">
                        <FileCheck2 size={12} />
                        SRTC STRATEGIC CHARTER
                      </span>
                      <span className="srtc-poster-doc-id">{vision.docId || 'DOC: VSN-2030 / REV-02'}</span>
                    </div>
                    <div className="srtc-poster-manifest__barcode" aria-hidden="true">
                      <Barcode size={28} className="srtc-barcode-icon" />
                      <span className="srtc-barcode-text">{vision.barcodeText || '||||||| 2030 180 001'}</span>
                    </div>
                  </div>

                  <div className="srtc-poster-meta">
                    <div className="srtc-poster-badge srtc-poster-badge--vision">
                      <Eye size={14} className="srtc-poster-badge__icon" />
                      <span>{vision.badge || 'STRATEGIC HORIZON'}</span>
                    </div>
                    <div className="srtc-poster-seal">
                      <Lock size={12} />
                      <span>{vision.seal || 'SEAL: SRTC-VSN-2030'}</span>
                    </div>
                  </div>

                  <h3 className="srtc-poster-title">
                    Our <span className="srtc-poster-highlight">Vision</span>
                  </h3>
                  <h4 className="srtc-poster-tagline">
                    {vision.tagline || 'Foremost & Most Preferred Transportation Enterprise'}
                  </h4>
                  <hr className="srtc-poster-divider" />

                  <p className="srtc-poster-paragraph">
                    {vision.paragraph ||
                      "Our vision and dream is to become Gujarat’s foremost and India's most promising transport service with cutting-edge digital technology."}
                  </p>

                  <div className="srtc-poster-pillars">
                    {visionPillars.map((pillar, idx) => {
                      const IconComponent = ICON_MAP[pillar.icon] || Award;
                      return (
                        <div key={idx} className="srtc-poster-pillar-card">
                          <div className="srtc-poster-pillar-card__icon-box srtc-poster-pillar-card__icon-box--blue">
                            <IconComponent size={18} />
                          </div>
                          <div className="srtc-poster-pillar-card__body">
                            <h5 className="srtc-poster-pillar-card__title">{pillar.title}</h5>
                            <p className="srtc-poster-pillar-card__desc">{pillar.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="srtc-poster-spec-footer">
                    <div className="srtc-poster-spec-cell">
                      <span className="srtc-poster-spec-cell__label">TARGET POSITION</span>
                      <span className="srtc-poster-spec-cell__val">{visionSpecs.position || visionSpecs.horizon || 'GUJARAT FOREMOST'}</span>
                    </div>
                    <div className="srtc-poster-spec-cell">
                      <span className="srtc-poster-spec-cell__label">TECHNOLOGY</span>
                      <span className="srtc-poster-spec-cell__val">{visionSpecs.tech || visionSpecs.activeFleet || 'DIGITAL LOGISTICS'}</span>
                    </div>
                    <div className="srtc-poster-spec-cell">
                      <span className="srtc-poster-spec-cell__label">CUSTOMER TRUST</span>
                      <span className="srtc-poster-spec-cell__val">{visionSpecs.trust || visionSpecs.reliability || 'PREFERRED PARTNER'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="srtc-vault-bottom-frame">
                <div className="srtc-vault-casting srtc-vault-casting--left">
                  <div className="srtc-vault-twistlock" />
                  <span className="srtc-vault-bolt" />
                </div>
                <div className="srtc-vault-bottom-bar">
                  <span>HIGHWAY LINEHAUL LEADERSHIP • SRTC SUPPLY CHAIN PVT. LTD.</span>
                </div>
                <div className="srtc-vault-casting srtc-vault-casting--right">
                  <div className="srtc-vault-twistlock" />
                  <span className="srtc-vault-bolt" />
                </div>
              </div>
            </article>
          )}
        </div>

        {/* ====================================================================
            CHASSIS BRIDGE: 4 Core Intermodal Highway Commitments
            ==================================================================== */}
        <div className="srtc-chassis-bridge" aria-label="Core Transport Commitments">
          <div className="srtc-chassis-bridge__track" />
          <div className="srtc-chassis-bridge__grid">
            {chassisCommitments.map((item, idx) => {
              const IconComponent = ICON_MAP[item.icon] || Truck;
              return (
                <div key={idx} className="srtc-chassis-pillar">
                  <div className="srtc-chassis-pillar__icon-ring">
                    <IconComponent size={20} className="srtc-chassis-pillar__icon" />
                  </div>
                  <div className="srtc-chassis-pillar__info">
                    <span className="srtc-chassis-pillar__label">{item.label}</span>
                    <span className="srtc-chassis-pillar__sub">{item.sub}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ====================================================================
            FOUNDER ANCHOR QUOTE STRIP (From Brochure Page 6)
            ==================================================================== */}
        <div className="srtc-vm-founder-strip">
          <div className="srtc-vm-founder-strip__avatar-box">
            <img
              src={founderStrip.avatar || '/images/about/menand-odedara-founder.jpg'}
              alt={founderStrip.name ? `${founderStrip.name}, Founder of SRTC` : 'SRTC Founder'}
              className="srtc-vm-founder-strip__avatar"
            />
            <div className="srtc-vm-founder-strip__badge">{founderStrip.badge || 'FOUNDER'}</div>
          </div>
          <div className="srtc-vm-founder-strip__content">
            <p className="srtc-vm-founder-strip__quote">
              {founderStrip.quote ||
                '“Our commitment is simple yet unwavering: to deliver reliability, speed, and tangible value every single time our trucks hit the highway.”'}
            </p>
            <div className="srtc-vm-founder-strip__meta">
              <span className="srtc-vm-founder-strip__name">{founderStrip.name}</span>
              <span className="srtc-vm-founder-strip__role">{founderStrip.role}</span>
            </div>
          </div>
          <div className="srtc-vm-founder-strip__action">
            <Link href={founderStrip.btnLink || '/services'} className="srtc-vm-founder-strip__btn">
              <span>{founderStrip.btnText || 'View Haulage Services'}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
