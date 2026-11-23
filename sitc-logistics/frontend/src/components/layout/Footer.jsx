'use client';

import React from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight,
  ArrowUp,
  Truck,
  Boxes,
  Award,
  Globe2,
  CheckCircle2,
  Send,
} from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="sitc-footer-root" role="contentinfo" aria-label="SRTC Logistics Corporate Footer">
      {/* Dynamic Top Ambient Horizon & Telemetry Beam */}
      <div className="sitc-footer-beam" aria-hidden="true" />
      <div className="sitc-footer-glow-top" aria-hidden="true" />

      {/* ===================================================================
          MAIN FOOTER CONTENT: FULL-WIDTH 5-COLUMN ENTERPRISE ARCHITECTURE
          =================================================================== */}
      <div className="sitc-footer-main">
        <div className="sitc-footer-container">
          <div className="sitc-footer-columns-grid">
            {/* -------------------------------------------------------------
                COLUMN 1: THE BRAND ANCHOR & ACCREDITATIONS
                ------------------------------------------------------------- */}
            <div className="sitc-footer-col sitc-footer-col--brand">
              <Link href="/" className="sitc-footer-logo-link" aria-label="SRTC Logistics Home">
                <img
                  src="/images/logo/srtc-logo.png"
                  alt="SRTC - Fastest, Secured, Trustable"
                  className="sitc-footer-logo-img"
                  style={{ height: '60px', width: 'auto', maxHeight: '60px', objectFit: 'contain' }}
                  loading="lazy"
                />
              </Link>

              <div className="sitc-footer-brand-motto">
                <span className="sitc-motto-star">★</span>
                <span>FASTEST &bull; SECURED &bull; TRUSTABLE</span>
                <span className="sitc-motto-star">★</span>
              </div>

              <p className="sitc-footer-about-text">
                Shree Ram Transportation Corporation (founded in 2003 by Mr. Menand Balubhai Odedara) and SRTC Supply Chain Pvt. Ltd. deliver premier multimodal logistics, specializing in Full Truck Load (FTL), Part Truck Load (PTL) &amp; Superfast Cargo, and 3PL Warehousing &amp; Multimodal Freight Services.
              </p>

              {/* Trust Badges & Accreditations */}
              <div className="sitc-footer-trust-strip">
                <div className="sitc-trust-badge">
                  <Award size={15} className="sitc-trust-icon" />
                  <span>ESTD. 2003</span>
                </div>
                <div className="sitc-trust-badge">
                  <ShieldCheck size={15} className="sitc-trust-icon" />
                  <span>FASTEST • SECURED • TRUSTABLE</span>
                </div>
                <div className="sitc-trust-badge">
                  <CheckCircle2 size={15} className="sitc-trust-icon" />
                  <span>GST &amp; e-Way COMPLIANT</span>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------
                COLUMN 2: CORE FREIGHT SERVICES
                ------------------------------------------------------------- */}
            <div className="sitc-footer-col">
              <div className="sitc-footer-col-header">
                <Truck size={17} className="sitc-col-header-icon" />
                <h4 className="sitc-footer-col-title">Freight Solutions</h4>
              </div>
              <ul className="sitc-footer-links-list">
                <li>
                  <Link href="/services" className="sitc-footer-link">
                    Full Truck Load (FTL) Freight
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="sitc-footer-link">
                    Part Truck Load (PTL) Cargo
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="sitc-footer-link">
                    Superfast Cargo &amp; Small Parcels
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="sitc-footer-link">
                    Warehousing &amp; Handling Services
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="sitc-footer-link">
                    Contract Logistics &amp; Storage
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="sitc-footer-link">
                    Dedicated Industrial Corridors
                  </Link>
                </li>
              </ul>
            </div>

            {/* -------------------------------------------------------------
                COLUMN 3: INDUSTRIES SERVED
                ------------------------------------------------------------- */}
            <div className="sitc-footer-col">
              <div className="sitc-footer-col-header">
                <Boxes size={17} className="sitc-col-header-icon" />
                <h4 className="sitc-footer-col-title">Industry Sectors</h4>
              </div>
              <ul className="sitc-footer-links-list">
                <li>
                  <Link href="/services#industry-containers" className="sitc-footer-link">
                    Engineering
                  </Link>
                </li>
                <li>
                  <Link href="/services#industry-containers" className="sitc-footer-link">
                    Manufacturer
                  </Link>
                </li>
                <li>
                  <Link href="/services#industry-containers" className="sitc-footer-link">
                    Industrial
                  </Link>
                </li>
                <li>
                  <Link href="/services#industry-containers" className="sitc-footer-link">
                    Chemical
                  </Link>
                </li>
                <li>
                  <Link href="/services#industry-containers" className="sitc-footer-link">
                    Pharmaceuticals
                  </Link>
                </li>
                <li>
                  <Link href="/services#industry-containers" className="sitc-footer-link">
                    Food &amp; Beverages
                  </Link>
                </li>
                <li>
                  <Link href="/services#industry-containers" className="sitc-footer-link">
                    Polymers
                  </Link>
                </li>
                <li>
                  <Link href="/services#industry-containers" className="sitc-footer-link">
                    Furniture
                  </Link>
                </li>
                <li>
                  <Link href="/services#industry-containers" className="sitc-footer-link">
                    Cosmetics
                  </Link>
                </li>
              </ul>
            </div>

            {/* -------------------------------------------------------------
                COLUMN 4: QUICK PORTALS & COMPANY
                ------------------------------------------------------------- */}
            <div className="sitc-footer-col">
              <div className="sitc-footer-col-header">
                <Globe2 size={17} className="sitc-col-header-icon" />
                <h4 className="sitc-footer-col-title">Navigation &amp; Portals</h4>
              </div>
              <ul className="sitc-footer-links-list">
                <li>
                  <Link href="/" className="sitc-footer-link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="sitc-footer-link">
                    About Corporate SRTC
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="sitc-footer-link">
                    Transportation &amp; Warehousing
                  </Link>
                </li>
                <li>
                  <Link href="/technology" className="sitc-footer-link">
                    Technology &amp; Fleet Software
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="sitc-footer-link">
                    Supply Chain News &amp; Insights
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="sitc-footer-link">
                    Central Dispatch &amp; Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* -------------------------------------------------------------
                COLUMN 5: CENTRAL DISPATCH & 24/7 OPERATIONS DESK
                ------------------------------------------------------------- */}
            <div className="sitc-footer-col sitc-footer-col--contact">
              <div className="sitc-footer-col-header">
                <Phone size={17} className="sitc-col-header-icon" />
                <h4 className="sitc-footer-col-title">Central Dispatch</h4>
              </div>

              <div className="sitc-footer-contact-stack">
                {/* 24/7 Phone */}
                <a href="tel:+919426646095" className="sitc-contact-pill-item" aria-label="Call Dispatch Operations">
                  <div className="sitc-contact-pill-icon-wrap">
                    <Phone size={15} className="sitc-contact-pill-icon" />
                  </div>
                  <div className="sitc-contact-pill-details">
                    <span className="sitc-contact-pill-label">DIRECT DISPATCH 24/7</span>
                    <strong className="sitc-contact-pill-val">+91 9426646095 / +91 9825646095</strong>
                  </div>
                </a>

                {/* Operations Email */}
                <a href="mailto:srtcpvtltd09@gmail.com" className="sitc-contact-pill-item" aria-label="Email Dispatch Desk">
                  <div className="sitc-contact-pill-icon-wrap">
                    <Mail size={15} className="sitc-contact-pill-icon" />
                  </div>
                  <div className="sitc-contact-pill-details">
                    <span className="sitc-contact-pill-label">OFFICIAL INQUIRIES</span>
                    <strong className="sitc-contact-pill-val">srtcpvtltd09@gmail.com</strong>
                  </div>
                </a>

                {/* Operations Hours */}
                <div className="sitc-contact-info-block">
                  <Clock size={15} className="sitc-contact-info-icon" />
                  <span>365 Days &bull; Non-Stop Dispatch Coverage</span>
                </div>

                {/* Location / Hubs */}
                <div className="sitc-contact-info-block">
                  <MapPin size={15} className="sitc-contact-info-icon" />
                  <span>D/1101, 11th Floor, PNTC, Times Of India Press Road, Vejalpur, Ahmedabad - 380015</span>
                </div>

                {/* WhatsApp Dispatch Direct Button */}
                <a
                  href="https://wa.me/919426646095?text=Hello%20SRTC%20Logistics%2C%20I%20need%20a%20freight%20quote%20for%20my%20shipment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sitc-footer-whatsapp-btn"
                  aria-label="Chat on WhatsApp with SRTC Dispatch"
                >
                  <Send size={15} />
                  <span>CONNECT ON WHATSAPP</span>
                  <ArrowRight size={14} className="sitc-wa-arrow" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          COMMERCIAL FREIGHT CORRIDOR DISPATCH TICKER
          =================================================================== */}
    
      {/* ===================================================================
          SUB-FOOTER LEGAL & COPYRIGHT ROW WITH SMOOTH BACK-TO-TOP
          =================================================================== */}
      <div className="sitc-footer-bottom">
        <div className="sitc-footer-container sitc-footer-bottom-inner">
          <p className="sitc-footer-copy">
            &copy; {new Date().getFullYear()} <strong>Shree Ram Transportation Corporation</strong> (SRTC Supply Chain Pvt. Ltd. | Estd. 2003). All rights reserved.
          </p>

      

          <button
            type="button"
            className="sitc-back-to-top"
            onClick={scrollToTop}
            aria-label="Scroll back to top of the page"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={15} className="sitc-top-arrow" />
          </button>
        </div>
      </div>
    </footer>
  );
}
