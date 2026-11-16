'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  X,
  ChevronDown,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Home,
  Boxes,
  Building2,
  Truck,
  Compass,
  FileText,
  Anchor,
  Plane,
  Warehouse,
  Network,
} from 'lucide-react';
import './MobileMenu.css';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  {
    label: 'Services',
    href: '/services',
    icon: Boxes,
    subItems: [
      { label: 'Ocean Freight Forwarding', href: '/services/ocean-freight', icon: Anchor },
      { label: 'Air Freight Solutions', href: '/services/air-freight', icon: Plane },
      { label: 'Road Transportation', href: '/services/road-transport', icon: Truck },
      { label: 'Warehousing & Storage', href: '/services/warehousing', icon: Warehouse },
      { label: 'Supply Chain Management', href: '/services/supply-chain', icon: Network },
    ],
  },
  { label: 'Industries', href: '/industries', icon: Building2 },
  { label: 'Fleet & Equipment', href: '/fleet', icon: Truck },
  { label: 'Shipment Tracking', href: '/tracking', icon: Compass },
  { label: 'Blog & Insights', href: '/blog', icon: FileText },
  { label: 'Contact Us', href: '/contact', icon: Phone },
];

export default function MobileMenu({ isOpen, onClose }) {
  const pathname = usePathname();
  const [servicesExpanded, setServicesExpanded] = useState(false);

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
              style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
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
            {navItems.map((item) => {
              const active = isActive(item.href);
              const ItemIcon = item.icon;

              if (item.subItems) {
                return (
                  <li key={item.label} className="sitc-mobile-menu__item">
                    <div className="sitc-mobile-menu__item-group">
                      <Link
                        href={item.href}
                        className={`sitc-mobile-pill ${active ? 'sitc-mobile-pill--active' : ''}`}
                        onClick={onClose}
                      >
                        <ItemIcon size={16} />
                        <span>{item.label}</span>
                      </Link>
                      <button
                        type="button"
                        className="sitc-mobile-menu__expand-btn"
                        onClick={() => setServicesExpanded(!servicesExpanded)}
                        aria-label="Toggle services list"
                      >
                        <ChevronDown
                          size={18}
                          className={`sitc-mobile-menu__expand-icon ${
                            servicesExpanded ? 'is-rotated' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {servicesExpanded && (
                      <ul className="sitc-mobile-menu__subnav">
                        {item.subItems.map((sub) => {
                          const SubIcon = sub.icon;
                          return (
                            <li key={sub.label} className="sitc-mobile-menu__subitem">
                              <Link
                                href={sub.href}
                                className={`sitc-mobile-menu__sublink ${
                                  pathname === sub.href ? 'is-active' : ''
                                }`}
                                onClick={onClose}
                              >
                                <SubIcon size={14} className="sitc-mobile-menu__sub-icon" />
                                <span>{sub.label}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.label} className="sitc-mobile-menu__item">
                  <Link
                    href={item.href}
                    className={`sitc-mobile-pill ${active ? 'sitc-mobile-pill--active' : ''}`}
                    onClick={onClose}
                  >
                    <ItemIcon size={16} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Action Buttons */}
          <div className="sitc-mobile-menu__cta-wrapper">
            <Link
              href="/quote"
              className="sitc-btn-pill sitc-btn-pill--primary"
              style={{ width: '100%', padding: '0.75rem 1.5rem' }}
              onClick={onClose}
            >
              <span>Request a Quote</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/contact"
              className="sitc-btn-pill sitc-btn-pill--secondary"
              style={{ width: '100%', padding: '0.75rem 1.5rem' }}
              onClick={onClose}
            >
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Quick Contact Box */}
          <div className="sitc-mobile-menu__contact-box">
            <span className="sitc-mobile-menu__contact-title">SRTC Supply Chain Dispatch</span>
            <div className="sitc-mobile-menu__contact-line">
              <Phone size={14} className="sitc-mobile-menu__contact-icon" />
              <a href="tel:+919426646095">+91 9426646095</a>
            </div>
            <div className="sitc-mobile-menu__contact-line">
              <Mail size={14} className="sitc-mobile-menu__contact-icon" />
              <a href="mailto:srtcpvtltd09@gmail.com">srtcpvtltd09@gmail.com</a>
            </div>
            <div className="sitc-mobile-menu__contact-line">
              <Clock size={14} className="sitc-mobile-menu__contact-icon" />
              <span>Fastest • Secured • Trustable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
