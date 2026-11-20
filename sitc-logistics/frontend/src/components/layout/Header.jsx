'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Menu } from 'lucide-react';
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
      {/* Main Navigation Header Bar */}
      <div className="sitc-header-main">
        <div className="sitc-header-container sitc-header-main__inner">
          {/* Left: Brand Logo (Prominent & Larger) */}
          <div className="sitc-header-brand-wrap">
            <Link href="/" className="sitc-header-brand" aria-label="SRTC Logistics Home">
              <img
                src="/images/logo/srtc-logo.png"
                alt="SRTC - Fastest, Secured, Trustable"
                className="sitc-header-brand__img"
                style={{ height: '72px', width: 'auto', maxHeight: '72px', objectFit: 'contain' }}
              />
            </Link>
          </div>

          {/* Center: Capsule Navigation Dock (100% Dead Center) */}
          <div className="sitc-header-nav-center">
            <Navbar />
          </div>

          {/* Right: Quick Action Button (Single Contact Us CTA) */}
          <div className="sitc-header-actions">
            <Link href="/contact" className="sitc-btn-pill sitc-btn-pill--gold hide-on-mobile">
              <span>Contact Us</span>
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
