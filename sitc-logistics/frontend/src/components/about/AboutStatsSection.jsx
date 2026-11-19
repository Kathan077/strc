'use client';

import Link from 'next/link';
import {
  History,
  Route,
  Truck,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Calendar,
  Building2,
  Zap,
  Target,
} from 'lucide-react';
import './AboutStatsSection.css';

const ICON_MAP = {
  History,
  Route,
  Truck,
  ShieldCheck,
  Calendar,
  Building2,
  Zap,
  Target,
};

export default function AboutStatsSection({ data }) {
  const statCards = data?.statCards || [];
  const imgUrl = data?.image || '/images/about/srtc-dryport-terminal.jpg';
  const imgAlt = data?.imageAlt || 'SRTC Inland Container Depot Dry Port Freight Logistics Terminal';
  const kicker = data?.kicker || 'HIGH-VELOCITY ROAD FREIGHT';
  const title = data?.title || 'Digital & Trusted Transport Logistic Company';
  const desc =
    data?.description ||
    'Pioneering technology-driven road transport, real-time GPS tracking, and guaranteed zero-demurrage turnaround nationwide.';
  const ctaText = data?.ctaText || 'Request A Quote!';
  const ctaLink = data?.ctaLink || '/contact';

  return (
    <section className="srtc-about-stats" aria-label="Digital &amp; Trusted Transport Logistic Company">
      <div className="srtc-about-stats__container">
        {/* ====================================================================
            LEFT COLUMN: Chamfered Hero Image + Headline + Action CTA
            Synchronized to EXACT SAME HEIGHT as the 2x2 stat cards
            ==================================================================== */}
        <div className="srtc-about-stats__left-col">
          {/* Top Image with Chamfered Top-Right Corner */}
          <div className="srtc-stats-image-card">
            <img
              src={imgUrl}
              alt={imgAlt}
              className="srtc-stats-image"
            />
            {/* Chamfer Accent Cut Line */}
            <div className="srtc-stats-image-chamfer-edge" aria-hidden="true" />
          </div>

          {/* Bottom Headline and CTA Button */}
          <div className="srtc-about-stats__text-group">
            <div className="srtc-stats-kicker">
              <Sparkles size={12} className="srtc-stats-kicker__icon" />
              <span>{kicker}</span>
            </div>

            <h2 className="srtc-about-stats__title">
              {title}
            </h2>

            <p className="srtc-about-stats__desc">
              {desc}
            </p>

            <Link href={ctaLink} className="srtc-stats-cta-btn">
              <span>{ctaText}</span>
              <span className="srtc-stats-cta-btn__circle">
                <ArrowRight size={13} strokeWidth={2.5} />
              </span>
            </Link>
          </div>
        </div>

        {/* ====================================================================
            RIGHT COLUMN: 2x2 Grid of 4 Compact Chamfered Stat Cards
            ==================================================================== */}
        <div className="srtc-about-stats__right-col">
          <div className="srtc-stats-grid">
            {statCards.map((card, idx) => {
              const IconComp = ICON_MAP[card.icon] || Truck;
              return (
                <div
                  key={card.id || idx}
                  className={`srtc-stat-card srtc-stat-card--${card.variant || 'white'}`}
                  style={{ '--card-delay': card.delay || `${(idx + 1) * 80}ms` }}
                >
                  {/* Decorative Chamfered Corner Accent */}
                  <div className="srtc-stat-card__chamfer-line" aria-hidden="true" />

                  {/* Card Title */}
                  <h3 className="srtc-stat-card__title">{card.title}</h3>

                  {/* Center Stat Row: Icon + Proportional Big Number */}
                  <div className="srtc-stat-card__stat-row">
                    <div className="srtc-stat-card__icon-box">
                      <IconComp size={22} strokeWidth={1.9} />
                    </div>
                    <span className="srtc-stat-card__number">{card.number}</span>
                  </div>

                  {/* Subtle Separator Line */}
                  <div className="srtc-stat-card__divider" />

                  {/* Card Description */}
                  <p className="srtc-stat-card__desc">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
