'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Truck, Gauge, Warehouse, Thermometer, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import './ServicesSection.css';

export default function ServicesSection({ data }) {
  const allCards = data?.serviceCards || [];
  const card1 = allCards.find((c) => c.id === 'truck-1') || allCards[0] || {};
  const card2 = allCards.find((c) => c.id === 'truck-2') || allCards[1] || {};
  const card3 = allCards.find((c) => c.id === 'truck-3') || allCards[2] || {};
  const containerCards = allCards.filter(
    (c) =>
      c.id?.startsWith('container') ||
      (!c.id?.startsWith('truck') && c !== card1 && c !== card2 && c !== card3)
  );

  const [revealed, setRevealed] = useState({
    'services-header': true,
    'truck-1': true,
    'truck-2': true,
    'truck-3': true,
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1025) {
      setRevealed({
        'services-header': true,
        'truck-1': true,
        'truck-2': true,
        'truck-3': true,
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-reveal-id');
            if (id) {
              setRevealed((prev) => ({ ...prev, [id]: true }));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '60px 0px 60px 0px',
      }
    );

    const elements = document.querySelectorAll('#services-section [data-reveal-id]');
    elements.forEach((el) => {
      observer.observe(el);
    });

    const timer = setTimeout(() => {
      setRevealed((prev) => {
        const next = { ...prev, 'services-header': true, 'truck-1': true, 'truck-2': true, 'truck-3': true };
        containerCards.forEach((_, i) => {
          next[`container-${i + 1}`] = true;
        });
        return next;
      });
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [containerCards.length]);

  const getContainerIcon = (idx) => {
    switch (idx % 6) {
      case 0:
        return <Truck size={19} className="sitc-container-card__icon" />;
      case 1:
        return <Gauge size={19} className="sitc-container-card__icon" />;
      case 2:
        return <Thermometer size={19} className="sitc-container-card__icon" />;
      case 3:
        return <ShieldCheck size={19} className="sitc-container-card__icon" />;
      case 4:
        return <Zap size={19} className="sitc-container-card__icon" />;
      case 5:
      default:
        return <Warehouse size={19} className="sitc-container-card__icon" />;
    }
  };

  return (
    <section
      id="services-section"
      data-section-name="SERVICES SECTION"
      className="sitc-services-section"
      aria-label="Custom Logistics Solutions for Your Business"
    >
      {/* Background Stage */}
      <div className="sitc-services-bg-stage" aria-hidden="true">
        <div className="sitc-services-bg-grid" />
        <div className="sitc-services-glow sitc-services-glow--gold" />
        <div className="sitc-services-glow sitc-services-glow--navy" />
        <div className="sitc-services-glow sitc-services-glow--cyan" />

        <svg
          className="sitc-services-transit-svg"
          viewBox="0 0 1600 1000"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="svcGoldFlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E8B94F" stopOpacity="0" />
              <stop offset="30%" stopColor="#E8B94F" stopOpacity="0.32" />
              <stop offset="70%" stopColor="#FFF1A8" stopOpacity="0.48" />
              <stop offset="100%" stopColor="#E8B94F" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="svcNavyFlow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B2F4A" stopOpacity="0" />
              <stop offset="40%" stopColor="#07557A" stopOpacity="0.22" />
              <stop offset="80%" stopColor="#0B2F4A" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0B2F4A" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="M -80,280 C 420,120 780,480 1680,240"
            stroke="url(#svcGoldFlow)"
            strokeWidth="2.2"
            strokeDasharray="12 16"
            className="sitc-svc-transit-flow sitc-svc-transit-flow--1"
          />
          <path
            d="M 60,-60 C 240,420 840,640 1640,960"
            stroke="url(#svcNavyFlow)"
            strokeWidth="2"
            strokeDasharray="14 20"
            className="sitc-svc-transit-flow sitc-svc-transit-flow--2"
          />

          <circle cx="520" cy="225" r="4.5" fill="#E8B94F" className="sitc-svc-beacon" />
          <circle cx="520" cy="225" r="16" fill="none" stroke="#E8B94F" strokeWidth="1" className="sitc-svc-radar-ring" />
          <circle cx="1040" cy="410" r="4.5" fill="#07557A" className="sitc-svc-beacon sitc-svc-beacon--cyan" />
          <circle cx="1040" cy="410" r="16" fill="none" stroke="#07557A" strokeWidth="1" className="sitc-svc-radar-ring" />
          <circle cx="1380" cy="280" r="4.5" fill="#E8B94F" className="sitc-svc-beacon" />
          <circle cx="1380" cy="280" r="16" fill="none" stroke="#E8B94F" strokeWidth="1" className="sitc-svc-radar-ring" />
        </svg>

        <div className="sitc-services-watermark">
          SRTC SERVICES // INDUSTRIAL CORRIDOR LOGISTICS // HIGH-VELOCITY LINEHAUL
        </div>
      </div>

      <div className="sitc-services-container">
        {/* Header */}
          <header
            data-reveal-id="services-header"
            className={`sitc-services-header ${revealed['services-header'] ? 'is-revealed' : ''}`}
          >
            <div className="sitc-services-header__left">
              <div className="sitc-services-kicker-capsule">
                <Truck size={14} className="sitc-services-kicker__icon" />
                <span className="sitc-services-kicker__text">{data?.kicker || 'SRTC Supply Chain Services'}</span>
                <span className="sitc-services-kicker__shimmer" aria-hidden="true" />
              </div>

              <h2 className="sitc-services-title">
                {data?.title || 'Logistics & Warehouse Handling Services'}
              </h2>
            </div>

            <div className="sitc-services-header__right">
              <p className="sitc-services-desc">
                {data?.subtitle ||
                  'Proprietary, Easy, Convenient. Tailored logistics solutions driven by our commitment to deliver reliability, speed, and value every single time.'}
              </p>
            </div>
          </header>

          {/* Row 1: Top 3 Signature Truck Cards */}
          <div className="sitc-services-cards-grid">
            {/* Card 1 */}
            <article
              data-reveal-id="truck-1"
              className={`sitc-svc-card sitc-svc-card--text-top sitc-reveal-card sitc-reveal-card--1 ${
                revealed['truck-1'] ? 'is-revealed' : ''
              }`}
            >
              <div className="sitc-svc-card__text-block">
                <h3 className="sitc-svc-card__title">{card1.title || 'Full Truck Load (FTL)'}</h3>
                <p className="sitc-svc-card__subtitle">
                {card1.description ||
                  'Dedicated point-to-point fleet deployment for heavy, bulk, and industrial cargo across Gujarat and nationwide corridors.'}
              </p>
            </div>

            <div className="sitc-svc-card__img-frame sitc-svc-card__img-frame--bottom-sculpt">
              <img
                src={card1.image || '/images/services/service-truck-1.jpg'}
                alt={card1.title || 'Full Truckload FTL Logistics Fleet'}
                className="sitc-svc-card__img"
                loading="lazy"
              />
            </div>
          </article>

          {/* Card 2 */}
          <article
            data-reveal-id="truck-2"
            className={`sitc-svc-card sitc-svc-card--full-bleed sitc-reveal-card sitc-reveal-card--2 ${
              revealed['truck-2'] ? 'is-revealed' : ''
            }`}
          >
            <div className="sitc-svc-card__bg-frame">
              <img
                src={card2.image || '/images/services/service-truck-2.jpg'}
                alt={card2.title || 'Express Cargo and JIT Linehaul Truck'}
                className="sitc-svc-card__img"
                loading="lazy"
              />
              <div className="sitc-svc-card__gradient-overlay" />
            </div>

            <div className="sitc-svc-card__overlay-text-block">
              <h3 className="sitc-svc-card__title sitc-svc-card__title--white">
                {card2.title || 'Part Truck Load (PTL) & Superfast Cargo'}
              </h3>
              <p className="sitc-svc-card__subtitle sitc-svc-card__subtitle--white">
                {card2.description ||
                  'Cost-effective consolidated transit for partial truck loads and urgent small packages with reliable, guaranteed on-time delivery.'}
              </p>
            </div>
          </article>

          {/* Card 3 */}
          <article
            data-reveal-id="truck-3"
            className={`sitc-svc-card sitc-svc-card--text-bottom sitc-reveal-card sitc-reveal-card--3 ${
              revealed['truck-3'] ? 'is-revealed' : ''
            }`}
          >
            <div className="sitc-svc-card__img-frame sitc-svc-card__img-frame--top-sculpt">
              <img
                src={card3.image || '/images/services/service-truck-3.jpg'}
                alt={card3.title || 'Heavy and Project Ground Freight'}
                className="sitc-svc-card__img"
                loading="lazy"
              />
            </div>

            <div className="sitc-svc-card__text-block sitc-svc-card__text-block--bottom">
              <h3 className="sitc-svc-card__title">
                {card3.title || 'Warehousing & Handling Services'}
              </h3>
              <p className="sitc-svc-card__subtitle">
                {card3.description ||
                  'Scalable modern storage facilities, contract logistics, and inventory management designed for corporates and manufacturing hubs.'}
              </p>
            </div>
          </article>
        </div>

        {/* Rows 2 & 3: Container Cards */}
        {containerCards.length > 0 && (
          <div className="sitc-container-cards-grid">
            {containerCards.map((card, cIdx) => {
              const revealKey = `container-${cIdx + 1}`;
              const isFeatured = cIdx === 1;
              return (
                <article
                  key={card.id || cIdx}
                  data-reveal-id={revealKey}
                  className={`sitc-container-card ${isFeatured ? 'sitc-container-card--featured' : ''} sitc-reveal-container sitc-reveal-container--${(cIdx % 6) + 1} ${
                    revealed[revealKey] ? 'is-revealed' : ''
                  }`}
                >
                  <span className="sitc-casting sitc-casting--tl" aria-hidden="true" />
                  <span className="sitc-casting sitc-casting--tr" aria-hidden="true" />
                  <span className="sitc-casting sitc-casting--bl" aria-hidden="true" />
                  <span className="sitc-casting sitc-casting--br" aria-hidden="true" />

                  <div className="sitc-container-card__top">
                    <div className={`sitc-container-card__icon-wrap ${isFeatured ? 'sitc-container-card__icon-wrap--gold' : ''}`}>
                      {getContainerIcon(cIdx)}
                    </div>
                    <span className={`sitc-container-serial ${isFeatured ? 'sitc-container-serial--featured' : ''}`}>
                      {card.badge || `SRTC-LANE-${cIdx + 1}`}
                    </span>
                  </div>

                  <div className="sitc-container-card__body">
                    <h4 className="sitc-container-card__title">{card.title}</h4>
                    <p className="sitc-container-card__desc">{card.description}</p>
                  </div>

                  <div className="sitc-container-card__bottom">
                    <span className="sitc-container-spec-tag">
                      {card.specs?.[0] ? `CLIENTS / SPEC: ${card.specs[0]}` : 'INDUSTRIAL SPEC'}
                    </span>
                    <Link href={card.ctaLink || '/services'} className="sitc-container-card__link">
                      <span>{card.ctaText || 'EXPLORE SYSTEM SPEC'}</span>
                      <span className="sitc-container-card__arrow">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
