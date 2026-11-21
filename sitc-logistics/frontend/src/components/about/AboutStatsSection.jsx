'use client';

import Link from 'next/link';
import {
  History,
  Route,
  Truck,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import './AboutStatsSection.css';

const ICON_MAP = {
  History,
  Route,
  Truck,
  ShieldCheck,
};

const DEFAULT_STATS = [
  {
    id: 'experience',
    title: 'Years Of Experience',
    number: '23+',
    icon: 'History',
    description: 'Established in 2003 with over two decades of highway transport trust.',
  },
  {
    id: 'fleet',
    title: 'Privately Owned Fleet',
    number: 'Largest',
    icon: 'Truck',
    description: 'One of India’s largest privately owned fleets operating 24/7.',
  },
  {
    id: 'services',
    title: 'Specialized Offerings',
    number: '6 Core',
    icon: 'Route',
    description: 'FTL, PTL, small packages, superfast cargo, warehousing & contract logistics.',
  },
  {
    id: 'safety',
    title: 'Compliance & Safety',
    number: '100%',
    icon: 'ShieldCheck',
    description: 'Full traffic rule compliance with trained professional driver staff.',
  },
];

export default function AboutStatsSection({ data }) {
  // Guarantee exactly 4 valid stats even if backend returns incomplete array
  const rawCards = data?.statCards && data.statCards.length >= 4 
    ? data.statCards 
    : DEFAULT_STATS;

  const statCards = DEFAULT_STATS.map((defaultItem, idx) => ({
    ...defaultItem,
    ...(rawCards[idx] || {}),
  }));

  const imgUrl = data?.image || '/images/about/srtc-dryport-terminal.jpg';
  const imgAlt = data?.imageAlt || 'SRTC Inland Container Depot Dry Port Freight Logistics Terminal';
  const kicker = data?.kicker || 'PROVEN LINEHAUL EXCELLENCE';
  const title = data?.title || 'Digital & Trusted Transport Logistic Company';
  const desc =
    data?.description ||
    'Delivering high-quality, end-to-end logistics solutions to corporates and individuals nationwide with guaranteed on-time delivery.';
  const ctaText = data?.ctaText || 'Contact Us';
  const ctaLink = data?.ctaLink || '/contact';

  return (
    <section className="srtc-about-stats" aria-label="Digital &amp; Trusted Transport Logistic Company">
      <div className="srtc-about-stats__container">
        {/* ====================================================================
            LEFT COLUMN: Chamfered Hero Image + Headline + Action CTA
            ==================================================================== */}
        <div className="srtc-about-stats__left-col">
          <div className="srtc-stats-image-card">
            <img
              src={imgUrl}
              alt={imgAlt}
              className="srtc-stats-image"
            />
            <div className="srtc-stats-image-chamfer-edge" aria-hidden="true" />
          </div>

          <div className="srtc-about-stats__text-group">
            <div className="srtc-stats-kicker">
              <Sparkles size={13} className="srtc-stats-kicker__icon" />
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
            RIGHT COLUMN: Clean, Professional 2x2 Instrument Grid
            (Zero box clutter, no green dots, no WP tags, no + icons)
            ==================================================================== */}
        <div className="srtc-about-stats__right-col">
          <div className="srtc-pro-stats-panel">
            <div className="srtc-pro-stats-grid">
              {statCards.map((stat, idx) => {
                const IconComp = ICON_MAP[stat.icon] || Truck;
                return (
                  <div
                    key={stat.id || idx}
                    className={`srtc-pro-stat-item srtc-pro-stat-item--${idx + 1}`}
                  >
                    {/* Executive Icon Badge */}
                    <div className="srtc-pro-stat-item__icon-wrap">
                      <div className="srtc-pro-stat-item__icon-badge">
                        <IconComp size={20} strokeWidth={2.2} />
                      </div>
                    </div>

                    {/* Bold Metric Value */}
                    <div className="srtc-pro-stat-item__number">
                      {stat.number}
                    </div>

                    {/* Clean Professional Title */}
                    <h3 className="srtc-pro-stat-item__title">
                      {stat.title}
                    </h3>

                    {/* Elegant Gold Accent Line */}
                    <div className="srtc-pro-stat-item__accent-bar" />

                    {/* Informative Description */}
                    <p className="srtc-pro-stat-item__desc">
                      {stat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
