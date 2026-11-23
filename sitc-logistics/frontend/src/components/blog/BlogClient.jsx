'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Clock,
  Calendar,
  Truck,
  Award,
  Layers,
} from 'lucide-react';

/**
 * Industrial Rivet Line (Row of high-tensile steel rivets along container structural beams)
 */
function ContainerRivetLine({ count = 28 }) {
  return (
    <div className="srtc-container-rivet-line" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span key={`rivet-${i}`} className="srtc-rivet-head" />
      ))}
    </div>
  );
}

/**
 * CSC Safety Approval Data Plate (The iconic metal certification plate on intermodal containers)
 */
function CscSafetyPlate({ containerId, maxGross = '32,500 KG' }) {
  return (
    <div className="srtc-csc-data-plate" aria-label="CSC Safety Approval Plate">
      <div className="srtc-csc-header">
        <span>CSC SAFETY APPROVAL</span>
        <span className="srtc-csc-id">IND/SRTC/{containerId?.replace(/[^0-9]/g, '').slice(0, 4) || '9402'}</span>
      </div>
      <div className="srtc-csc-grid">
        <div className="srtc-csc-cell">
          <span className="srtc-csc-lbl">DATE MANUF.</span>
          <span className="srtc-csc-val">2026 / 04</span>
        </div>
        <div className="srtc-csc-cell">
          <span className="srtc-csc-lbl">MAX GROSS WT</span>
          <span className="srtc-csc-val">{maxGross}</span>
        </div>
        <div className="srtc-csc-cell">
          <span className="srtc-csc-lbl">ALLOW. STACK</span>
          <span className="srtc-csc-val">192,000 KG</span>
        </div>
        <div className="srtc-csc-cell">
          <span className="srtc-csc-lbl">TRANSIT VERIFIED</span>
          <span className="srtc-csc-val">SRTC 100%</span>
        </div>
      </div>
    </div>
  );
}

export default function BlogClient({ posts }) {
  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const regularPosts = posts.filter((p) => p.slug !== featuredPost?.slug);

  return (
    <section className="srtc-blog-content-section" aria-label="Container Linehaul Intelligence & Blogs">
      {/* ==================================================================
          1. FLAGSHIP 40-FOOT HIGH-CUBE INTERMODAL CONTAINER VAULT
          Authentic Corten Steel Container Architecture:
          ISO Corner Castings • Rivet Lines • Fluted Corrugated Sheet • Stencil Specs
          ================================================================== */}
      {featuredPost && (
        <div className="srtc-container-showcase-wrap">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="srtc-container-vault srtc-container-vault--featured"
            aria-label={`Read featured dispatch: ${featuredPost.title}`}
          >
            {/* 4 Forged ISO 1161 Corner Castings with Oval Twist-Lock Sockets */}
            <div className="srtc-iso-casting srtc-iso-tl" aria-hidden="true" />
            <div className="srtc-iso-casting srtc-iso-tr" aria-hidden="true" />
            <div className="srtc-iso-casting srtc-iso-bl" aria-hidden="true" />
            <div className="srtc-iso-casting srtc-iso-br" aria-hidden="true" />

            {/* Top Structural Steel Header Rail with Rivets */}
            <div className="srtc-container-top-rail">
              <ContainerRivetLine count={32} />
            </div>

            {/* Main Container Card Grid */}
            <div className="srtc-featured-grid">
              {/* Media with Container Inspection Frame */}
              <div className="srtc-container-media-frame">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  width={800}
                  height={500}
                  className="srtc-container-img"
                  priority
                />
                {/* 3D Corrugated Flute Shadow Overlay */}
                <div className="srtc-corrugated-flute-depth" aria-hidden="true" />

                {/* Highway Corridor Location GPS Stamp */}
                <div className="srtc-corridor-stamp srtc-corridor-stamp--featured">
                  <span>WESTERN EXPRESSWAY &bull; HIGH-CUBE CORRIDOR</span>
                </div>
              </div>

              {/* Dossier Body with Hyper-Realistic Corrugated Sheet Texture */}
              <div className="srtc-container-body srtc-container-corrugated-wall">
                <div>
                  <div className="srtc-post-meta-top">
                    <span className="srtc-post-category-tag">{featuredPost.category}</span>
                    <span>•</span>
                    <span className="srtc-meta-inline">
                      <Calendar size={13} color="#E8B94F" /> {featuredPost.publishedDate}
                    </span>
                    <span>•</span>
                    <span className="srtc-meta-inline">
                      <Clock size={13} color="#E8B94F" /> {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="srtc-container-title srtc-container-title--featured">
                    {featuredPost.title}
                  </h2>
                  <p className="srtc-container-excerpt">{featuredPost.excerpt}</p>
                </div>

                {/* Industrial Telemetry Dashboard Cockpit Gauges */}
                {featuredPost.metrics && (
                  <div className="srtc-telemetry-strip">
                    {featuredPost.metrics.map((m) => (
                      <div key={m.label} className="srtc-telemetry-gauge">
                        <span className="srtc-telemetry-val">{m.value}</span>
                        <span className="srtc-telemetry-lbl">{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer Action: Heavy Duty Dispatch Manifest Button */}
                <div className="srtc-container-footer">
                  <span className="srtc-route-dispatch-info">
                    <Truck size={15} color="#D49D28" />
                    <span>INTERMODAL 40FT HIGH-CUBE</span>
                  </span>

                  <span className="srtc-dispatch-cta-btn">
                    <span>ACCESS FREIGHT DOSSIER</span>
                    <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Structural Sill Rail with Rivets & Hazard Tape */}
            <div className="srtc-container-bottom-rail">
              <div className="srtc-container-hazard-strip" aria-hidden="true" />
              <ContainerRivetLine count={32} />
            </div>
          </Link>
        </div>
      )}

      {/* ==================================================================
          2. THREE 20-FOOT INTERMODAL CONTAINER UNITS (FLEET GRID)
          Each card is a clean, realistic 20-foot shipping container!
          ================================================================== */}
      {regularPosts.length > 0 && (
        <div className="srtc-fleet-container-block">
          {/* Section Kicker Bar */}
          <div className="srtc-convoy-header-bar">
            <div className="srtc-convoy-kicker">
              <span className="srtc-convoy-live-dot" />
              <span>INTERMODAL CONTAINER FLEET // 20-FOOT HEAVY FREIGHT UNITS</span>
            </div>
            <div className="srtc-convoy-route-indicator">
              <span>HIGH-VELOCITY CORRIDOR COMPLIANT &bull; ISO 6346</span>
            </div>
          </div>

          {/* 3 Container Cards Grid */}
          <div className="srtc-container-fleet-grid">
            {regularPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="srtc-container-vault srtc-container-vault--standard"
                aria-label={`Read article: ${post.title}`}
              >
                {/* 4 ISO Corner Castings */}
                <div className="srtc-iso-casting srtc-iso-tl" aria-hidden="true" />
                <div className="srtc-iso-casting srtc-iso-tr" aria-hidden="true" />
                <div className="srtc-iso-casting srtc-iso-bl" aria-hidden="true" />
                <div className="srtc-iso-casting srtc-iso-br" aria-hidden="true" />

                {/* Top Rivet Line */}
                <div className="srtc-container-top-rail srtc-top-rail--compact">
                  <ContainerRivetLine count={18} />
                </div>

                {/* Card Media with Stamped Photo Border */}
                <div className="srtc-container-media-frame srtc-media-standard">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={500}
                    height={300}
                    className="srtc-container-img"
                  />
                  <div className="srtc-corrugated-flute-depth" aria-hidden="true" />

                  <div className="srtc-corridor-stamp">
                    <span>{post.corridor}</span>
                  </div>
                </div>

                {/* Body Content with Corrugated Sheet Texture */}
                <div className="srtc-container-body srtc-body-standard srtc-container-corrugated-wall">
                  <div>
                    <div className="srtc-post-meta-top">
                      <span className="srtc-post-category-tag">{post.category}</span>
                      <span>•</span>
                      <span className="srtc-meta-inline">
                        <Clock size={12} color="#D49D28" /> {post.readTime}
                      </span>
                    </div>

                    <h3 className="srtc-container-title srtc-container-title--standard">
                      {post.title}
                    </h3>
                    <p className="srtc-container-excerpt srtc-excerpt--clamped">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Metal CSC Data Plate / Weight Stencil */}
                  <CscSafetyPlate containerId={post.containerId} maxGross={post.maxGross} />

                  {/* Clean Footer Action */}
                  <div className="srtc-container-footer srtc-footer--compact">
                    <span className="srtc-date-label">
                      <Calendar size={13} color="#D49D28" /> {post.publishedDate}
                    </span>

                    <span className="srtc-dispatch-cta-btn srtc-cta-compact">
                      <span>READ ARTICLE</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>

                {/* Bottom Structural Sill Rail with Rivets & Hazard Tape */}
                <div className="srtc-container-bottom-rail srtc-bottom-rail--compact">
                  <div className="srtc-container-hazard-strip srtc-hazard-strip--compact" aria-hidden="true" />
                  <ContainerRivetLine count={18} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
