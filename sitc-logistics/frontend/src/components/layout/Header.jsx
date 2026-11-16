'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, ShieldCheck, Compass, ArrowUpRight, Menu } from 'lucide-react';
import Navbar from './Navbar';
import MobileMenu from './MobileMenu';
import './Header.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sitc-main-header ${isScrolled ? 'sitc-main-header--scrolled' : ''}`}>
      {/* 1. Top Utility Micro-Bar with Connecting Horizontal Line */}
      <div className="sitc-header-topbar">
        <div className="sitc-header-container sitc-header-topbar__inner">
          <div className="sitc-header-topbar__left">
            <a href="tel:+919426646095" className="sitc-header-topbar__link">
              <Phone size={12} className="sitc-header-topbar__icon" />
              <span>+91 9426646095</span>
            </a>
            <span className="sitc-header-topbar__sep" />
            <a href="mailto:srtcpvtltd09@gmail.com" className="sitc-header-topbar__link">
              <Mail size={12} className="sitc-header-topbar__icon" />
              <span>srtcpvtltd09@gmail.com</span>
            </a>
          </div>

          <div className="sitc-header-topbar__right">
            <div className="sitc-header-topbar__badge">
              <ShieldCheck size={12} />
              <span>Fastest • Secured • Trustable</span>
            </div>
            <span className="sitc-header-topbar__sep" />
            <Link href="/tracking" className="sitc-header-topbar__link">
              <Compass size={12} className="sitc-header-topbar__icon" />
              <span>24/7 Cargo Tracker</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Header Bar */}
      <div className="sitc-header-main">
        <div className="sitc-header-container sitc-header-main__inner">
          {/* Left: Brand Logo (Prominent & Larger) */}
          <div className="sitc-header-brand-wrap">
            <Link href="/" className="sitc-header-brand" aria-label="SRTC Logistics Home">
              <img
                src="/images/logo/srtc-logo.png"
                alt="SRTC - Fastest, Secured, Trustable"
                className="sitc-header-brand__img"
              />
            </Link>
          </div>

          {/* Center: Capsule Navigation Dock (100% Dead Center) */}
          <div className="sitc-header-nav-center">
            <Navbar />
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="sitc-header-actions">
            {/* Tracking Pill Button */}
            <Link href="/tracking" className="sitc-btn-pill sitc-btn-pill--white hide-on-mobile">
              <span>Tracking</span>
              <span className="sitc-btn-pill__circle sitc-btn-pill__circle--navy">
                <ArrowUpRight size={13} strokeWidth={2.5} />
              </span>
            </Link>

            {/* Primary CTA: Get a Quote */}
            <Link href="/quote" className="sitc-btn-pill sitc-btn-pill--gold hide-on-mobile">
              <span>Get a Quote</span>
              <span className="sitc-btn-pill__circle sitc-btn-pill__circle--dark">
                <ArrowUpRight size={13} strokeWidth={2.5} />
              </span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="sitc-header-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
