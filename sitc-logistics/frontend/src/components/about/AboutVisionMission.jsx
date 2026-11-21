'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import './AboutVisionMission.css';

export default function AboutVisionMission({ data }) {
  const title = data?.title || 'Driven by Mission, Powered by Vision';
  const subtitle =
    data?.subtitle ||
    'Rooted in two decades of leadership, dedicated to revolutionizing transportation through eco-friendly, technology-driven solutions.';

  const mission = data?.mission || {};
  const vision = data?.vision || {};

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
      {/* Clean Subtle Ambient Lighting (Box Grid Removed) */}
      <div className="srtc-vm-bg" aria-hidden="true">
        <div className="srtc-vm-bg__radial srtc-vm-bg__radial--gold" />
        <div className="srtc-vm-bg__radial srtc-vm-bg__radial--navy" />
      </div>

      <div className="srtc-vm-container">
        {/* ====================================================================
            HEADER: Title & Subtitle (Kicker & Filter Bar Removed)
            ==================================================================== */}
        <div className="srtc-vm-header">
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
        </div>

        {/* ====================================================================
            INTERMODAL CONTAINER CARGO VAULTS: DUAL CONTAINER VIEW
            ==================================================================== */}
        <div className="srtc-vm-grid">
          {/* ------------------------------------------------------------------
              VAULT 1: THE MISSION CONTAINER (Deep Imperial Navy with Corrugated Steel)
              ------------------------------------------------------------------ */}
          <article className="srtc-container-vault srtc-container-vault--mission">
            {/* Container Top Casting Header Frame */}
            <div className="srtc-vault-header-frame">
              <div className="srtc-vault-casting srtc-vault-casting--left">
                <div className="srtc-vault-twistlock" />
                <span className="srtc-vault-bolt" />
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

                <h3 className="srtc-poster-title">
                  Our <span className="srtc-poster-highlight">Mission</span>
                </h3>
                <hr className="srtc-poster-divider" />

                <p className="srtc-poster-paragraph">
                  {mission.paragraph ||
                    'Our mission is to revolutionize the transportation landscape by delivering seamless, eco-friendly, and technology-advanced transport solutions. We are dedicated to enhancing mobility, reducing environmental impact, and providing exceptional service across all our operations. We ensure the ability to transport in full compliance with traffic rules, supported by a team of well-trained and professional driver staff.'}
                </p>
              </div>
            </div>

            <div className="srtc-vault-bottom-frame">
              <div className="srtc-vault-casting srtc-vault-casting--left">
                <div className="srtc-vault-twistlock" />
                <span className="srtc-vault-bolt" />
              </div>
              <div className="srtc-vault-casting srtc-vault-casting--right">
                <div className="srtc-vault-twistlock" />
                <span className="srtc-vault-bolt" />
              </div>
            </div>
          </article>

          {/* ------------------------------------------------------------------
              VAULT 2: THE VISION CONTAINER (Imperial Navy with Corrugated Steel)
              ------------------------------------------------------------------ */}
          <article className="srtc-container-vault srtc-container-vault--vision">
            <div className="srtc-vault-header-frame">
              <div className="srtc-vault-casting srtc-vault-casting--left">
                <div className="srtc-vault-twistlock" />
                <span className="srtc-vault-bolt" />
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

                <h3 className="srtc-poster-title">
                  Our <span className="srtc-poster-highlight">Vision</span>
                </h3>
                <hr className="srtc-poster-divider" />

                <p className="srtc-poster-paragraph">
                  {vision.paragraph ||
                    "Our vision and Dream to become Gujarat’s Foremost and promising Transport Service, with cutting edge and Digital Technology. But core visionis to Enlighted Customer and become most preferred Transportation"}
                </p>
              </div>
            </div>

            <div className="srtc-vault-bottom-frame">
              <div className="srtc-vault-casting srtc-vault-casting--left">
                <div className="srtc-vault-twistlock" />
                <span className="srtc-vault-bolt" />
              </div>
              <div className="srtc-vault-casting srtc-vault-casting--right">
                <div className="srtc-vault-twistlock" />
                <span className="srtc-vault-bolt" />
              </div>
            </div>
          </article>
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
