'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  X,
  Phone,
  Mail,
  ArrowRight,
  ChevronRight,
  Home,
  Boxes,
  Building2,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import './MobileMenu.css';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About Us', href: '/about', icon: Building2 },
  { label: 'Services', href: '/services', icon: Boxes },
  { label: 'Blog', href: '/blog', icon: FileText },
  { label: 'Contact Us', href: '/contact', icon: Phone },
];

export default function MobileMenu({ isOpen, onClose }) {
  const pathname = usePathname();
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    fetch('/api/contact')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setContactData(json.data);
      })
      .catch(() => {});
  }, []);

  const phone = contactData?.vaultPhone?.phone || '+91 94266 46095';
  const phoneTel = contactData?.vaultPhone?.ctaLink || 'tel:+919426646095';
  const email = contactData?.vaultEmail?.email || 'srtcpvtltd09@gmail.com';

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  if (!isOpen) return null;

  return (
    <div className="sitc-mobile-menu">
      {/* Backdrop */}
      <div className="sitc-mobile-menu__backdrop" onClick={onClose} aria-hidden="true" />

      {/* Slide-out Drawer */}
      <div
        className="sitc-mobile-menu__drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        {/* Top Header */}
        <div className="sitc-mobile-menu__header">
          <Link href="/" className="sitc-mobile-menu__brand" onClick={onClose}>
            <img
              src="/images/logo/srtc-logo.png"
              alt="SRTC - Fastest, Secured, Trustable"
              className="sitc-mobile-menu__brand-img"
            />
          </Link>
          <button
            type="button"
            className="sitc-mobile-menu__close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation List */}
        <div className="sitc-mobile-menu__body">
          <ul className="sitc-mobile-menu__nav">
            {navItems.map((item, index) => {
              const active = isActive(item.href);
              const ItemIcon = item.icon;

              return (
                <li
                  key={item.label}
                  className="sitc-mobile-menu__item"
                  style={{ animationDelay: `${index * 45}ms` }}
                >
                  <Link
                    href={item.href}
                    className={`sitc-mobile-pill ${active ? 'sitc-mobile-pill--active' : ''}`}
                    onClick={onClose}
                  >
                    <div className="sitc-mobile-pill__left">
                      <span className="sitc-mobile-pill__icon-wrap">
                        <ItemIcon size={17} />
                      </span>
                      <span className="sitc-mobile-pill__label">{item.label}</span>
                    </div>
                    <ChevronRight size={16} className="sitc-mobile-pill__arrow" />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Action Button: Single Contact Us CTA */}
          <div className="sitc-mobile-menu__cta-wrapper">
            <Link
              href="/contact"
              className="sitc-mobile-cta-btn"
              onClick={onClose}
            >
              <span>Book Linehaul / Contact</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Quick Contact Box */}
          <div className="sitc-mobile-menu__contact-box">
            <div className="sitc-mobile-dispatch-top">
              <span className="sitc-mobile-live-dot" />
              <span className="sitc-mobile-menu__contact-title">CENTRAL DISPATCH 24/7</span>
            </div>

            <a href={phoneTel} className="sitc-mobile-contact-row">
              <span className="sitc-mobile-contact-icon-badge">
                <Phone size={14} />
              </span>
              <div className="sitc-mobile-contact-data">
                <span className="sitc-mobile-contact-lbl">Hotline Linehaul</span>
                <span className="sitc-mobile-contact-val">{phone}</span>
              </div>
            </a>

            <a href={`mailto:${email}`} className="sitc-mobile-contact-row">
              <span className="sitc-mobile-contact-icon-badge">
                <Mail size={14} />
              </span>
              <div className="sitc-mobile-contact-data">
                <span className="sitc-mobile-contact-lbl">Corridor Booking Desk</span>
                <span className="sitc-mobile-contact-val">{email}</span>
              </div>
            </a>

            <div className="sitc-mobile-contact-trust">
              <ShieldCheck size={14} color="#E8B94F" />
              <span>Fastest • Secured • Trustable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
