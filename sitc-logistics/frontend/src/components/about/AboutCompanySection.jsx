'use client';

import Link from 'next/link';
import {
  Truck,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Building2,
  History,
} from 'lucide-react';
import './AboutCompanySection.css';

const ICON_MAP = {
  Calendar,
  Truck,
  ShieldCheck,
  History,
  Building2,
};

export default function AboutCompanySection({ data }) {
  const corporateMilestones = data?.milestones || [];
  const topClients = data?.topClients || [];

  const imgSupervisor = data?.imgSupervisor || '/images/about/operations-supervisor.jpg';
  const imgTruck = data?.imgTruck || '/images/about/srtc-highway-truck.jpg';

  const eyebrowText = data?.eyebrowText || 'ABOUT OUR COMPANY & HERITAGE';
  const title = data?.title || 'Delivering reliability, speed, and';
  const titleAccent = data?.titleAccent || 'value every single time';
  const titleSuffix = data?.titleSuffix || 'our trucks hit the highway.';
  const leadText =
    data?.leadText ||
    'Shree Ram Transportation Corporation, founded in 2003 by Mr. Menandbhai Odedara, has set road logistics benchmarks across Gujarat and Pan-India for over two decades. Building on this legacy, SRTC Supply Chain Pvt. Ltd. commands 840+ heavy commercial vehicles delivering scalable FTL, container haulage, and warehouse handling for India’s premier industrial leaders.';

  const actionBtnText = data?.actionBtnText || 'Explore Our Services';
  const actionBtnLink = data?.actionBtnLink || '/services';
  const phoneLabel = data?.phoneLabel || 'Direct Linehaul Hotline:';
  const phoneNumber = data?.phoneNumber || '+91 9426646095';
  const phoneTel = data?.phoneTel || 'tel:+919426646095';

  return (
    <section className="srtc-about-company" aria-label="About SRTC Supply Chain Company">
      {/* Background Highway Transit Animation Canvas */}
      <div className="srtc-bg-animation-canvas" aria-hidden="true">
        <svg
          className="srtc-highway-flow-svg"
          viewBox="0 0 1440 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-50,220 C320,120 620,380 1020,240 C1220,170 1380,260 1500,210"
            className="srtc-highway-path srtc-highway-path--gold"
          />
          <path
            d="M-50,480 C260,560 640,360 1080,500 C1260,560 1420,440 1500,470"
            className="srtc-highway-path srtc-highway-path--navy"
          />
        </svg>

        <div className="srtc-ambient-orb srtc-ambient-orb--gold" />
        <div className="srtc-ambient-orb srtc-ambient-orb--navy" />
      </div>

      <div className="srtc-about-company__container">
        {/* ====================================================================
            LEFT COLUMN: Refined Dual-Media Collage
            - Round circle image removed completely
            - Square truck image aligned cleanly in bottom-left
            - Badges positioned cleanly with ZERO image cutoff or obstruction
            ==================================================================== */}
        <div className="srtc-about-company__media-col">
          <div className="srtc-about-company__collage">
            {/* Top Main Card: Operations Supervisor / Founder */}
            <div className="srtc-about-company__card-top">
              <img
                src={imgSupervisor}
                alt="Mr. Menand Balubhai Odedara, Founder of Shree Ram Transportation Corporation"
                className="srtc-about-company__img-supervisor"
              />
            </div>

            {/* Bottom-Left Card: Square Commercial Heavy Blue Rig */}
            <div className="srtc-about-company__card-truck">
              <img
                src={imgTruck}
                alt="SRTC Modern Blue Container Rig on Open Highway"
                className="srtc-about-company__img-truck"
              />
            </div>
          </div>
        </div>

        {/* ====================================================================
            RIGHT COLUMN: Content Column (100% Preserved Styles & Class Names)
            ==================================================================== */}
        <div className="srtc-about-company__content-col">
          {/* Eyebrow Micro-Kicker */}
          <div className="srtc-about-company__eyebrow">
            <span className="srtc-about-company__eyebrow-icon-wrap">
              <Truck size={15} />
            </span>
            <span className="srtc-about-company__eyebrow-text">{eyebrowText}</span>
          </div>

          {/* Main Headline */}
          <h2 className="srtc-about-company__title">
            {title} <span className="srtc-title-accent">{titleAccent}</span> {titleSuffix}
          </h2>

          {/* Core Historical Narrative */}
          <p className="srtc-about-company__lead">
            {leadText}
          </p>

          {/* Structured History & Milestone Cards (Staggered Animation) */}
          <div className="srtc-about-company__history-grid">
            {corporateMilestones.map((item, idx) => {
              const IconComp = ICON_MAP[item.icon] || Calendar;
              return (
                <div
                  key={item._id || item.year || idx}
                  className="srtc-history-card"
                  style={{ '--milestone-delay': item.delay || `${(idx + 1) * 80}ms` }}
                >
                  <div className="srtc-history-card__header">
                    <span className="srtc-history-card__badge">{item.year}</span>
                    <span className="srtc-history-card__icon-wrap">
                      <IconComp size={15} />
                    </span>
                  </div>
                  <h4 className="srtc-history-card__title">{item.title}</h4>
                  <span className="srtc-history-card__highlight">{item.highlight}</span>
                  <p className="srtc-history-card__desc">{item.description}</p>
                </div>
              );
            })}
          </div>

          {/* Trusted Industrial Clients Ribbon */}
          {topClients && topClients.length > 0 && (
            <div className="srtc-about-company__clients-bar">
              <div className="srtc-clients-bar__label">
                <Building2 size={13} className="srtc-clients-bar__icon" />
                <span>TRUSTED PARTNER FOR INDUSTRY LEADERS:</span>
              </div>
              <div className="srtc-clients-bar__pills">
                {topClients.map((client, idx) => (
                  <span key={client._id || idx} className="srtc-client-tag">
                    {typeof client === 'string' ? client : client.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action Row: Action Button + Call Helpline */}
          <div className="srtc-about-company__actions-row">
            <Link href={actionBtnLink} className="srtc-action-btn">
              <span>{actionBtnText}</span>
              <span className="srtc-action-btn__circle">
                <ArrowRight size={14} strokeWidth={2.5} />
              </span>
            </Link>

            <a href={phoneTel} className="srtc-phone-action">
              <span className="srtc-phone-action__circle">
                <PhoneCall size={17} />
              </span>
              <div className="srtc-phone-action__text">
                <span className="srtc-phone-action__label">{phoneLabel}</span>
                <span className="srtc-phone-action__number">{phoneNumber}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
