'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Boxes,
  Building2,
  FileText,
  Phone,
  Cpu,
} from 'lucide-react';
import './Navbar.css';

/* ==========================================================================
   Seamless Continuous River / Ocean Wave (100% Mathematical Infinite Loop)
   ========================================================================== */

function LowOpacityWaves({ isActive }) {
  return (
    <div
      className={`sitc-pill-waves ${isActive ? 'sitc-pill-waves--active' : ''}`}
      aria-hidden="true"
    >
      <div className="sitc-pill-waves__track">
        <svg
          viewBox="0 0 400 16"
          fill="none"
          preserveAspectRatio="none"
          className="sitc-pill-waves__svg"
        >
          {/* Mathematically seamless infinite river wave (Two identical 200-unit cycles) */}
          <path
            d="M0 8 C30 3, 70 3, 100 8 C130 13, 170 13, 200 8 C230 3, 270 3, 300 8 C330 13, 370 13, 400 8 V16 H0 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}

/* ==========================================================================
   Cruising Miniature Toys - Facing Left & Sailing Right-to-Left Forward
   ========================================================================== */

function MiniToyShip() {
  return (
    <div className="sitc-toy" aria-hidden="true">
      {/* Ocean Wake Ripples Behind Stern (Right) */}
      <div className="sitc-toy__wake">
        <span className="sitc-toy-wake-ring sitc-toy-wake-ring--1" />
        <span className="sitc-toy-wake-ring sitc-toy-wake-ring--2" />
      </div>

      {/* Miniature SITC Cargo Container Vessel (Bow Facing Left) */}
      <svg
        width="36"
        height="22"
        viewBox="0 0 36 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="sitc-toy__svg sitc-toy__svg--ship"
      >
        {/* Pilot House / Bridge at Stern (Right) */}
        <rect x="23" y="5" width="7" height="8" rx="1.5" fill="#FFFFFF" stroke="#102D50" strokeWidth="1" />
        <rect x="24.5" y="7" width="4" height="2" rx="0.5" fill="#1769D2" />
        {/* Radar Mast & Blinking Signal Beacon */}
        <line x1="26.5" y1="5" x2="26.5" y2="1.5" stroke="#102D50" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="26.5" cy="1.5" r="1.5" fill="#00f0ff" className="sitc-toy-beacon" />

        {/* Stacked Cargo Containers in Midship */}
        <rect x="14" y="7" width="7" height="6" rx="1" fill="#1769D2" />
        <rect x="6" y="7" width="7" height="6" rx="1" fill="#2856A3" />
        <rect x="10" y="2.5" width="8" height="5" rx="1" fill="#102D50" />
        <line x1="9.5" y1="7" x2="9.5" y2="13" stroke="#FFFFFF" strokeWidth="0.6" strokeOpacity="0.4" />
        <line x1="17.5" y1="7" x2="17.5" y2="13" stroke="#FFFFFF" strokeWidth="0.6" strokeOpacity="0.4" />

        {/* Ship Hull (Hydrodynamic Angled Bow Pointing Left) */}
        <path d="M2 13H34L30 20H6L2 13Z" fill="#102D50" />
        {/* Waterline Stripe in Primary Brand Blue */}
        <path d="M3.5 15.5H32.5L31.2 17.5H4.8L3.5 15.5Z" fill="#1769D2" />
        {/* Anchor Hawsehole on Left Bow */}
        <circle cx="5" cy="14.5" r="1" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

function MiniToyTruck() {
  return (
    <div className="sitc-toy" aria-hidden="true">
      {/* Miniature SRTC Heavy Haulage Transport Truck (Facing Left - Crisp White Cab & Branded Gold Trailer) */}
      <svg
        width="38"
        height="22"
        viewBox="0 0 38 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="sitc-toy__svg sitc-toy__svg--truck"
      >
        {/* Truck Cabin (Crisp Pure White Cab with Gold Stroke - 100% Visible on Navy) */}
        <path
          d="M3 9C3 7.8 3.8 7 5 7H8.5L12 11V17H3V9Z"
          fill="#FFFFFF"
          stroke="#E8B94F"
          strokeWidth="0.8"
        />
        {/* Windshield Glass (Deep Logistics Navy Tint) */}
        <path d="M5.5 8.5H8L10.5 11H5.5V8.5Z" fill="#07557A" />

        {/* Front Chrome Bumper & Headlight */}
        <rect x="2.5" y="13" width="1.2" height="4" rx="0.4" fill="#E8B94F" />
        <circle cx="3" cy="14" r="0.9" fill="#FFF1A8" />

        {/* Chrome/Gold Exhaust Stack behind Cab */}
        <rect x="11.8" y="3" width="1.5" height="5" rx="0.5" fill="#E8B94F" />

        {/* Cargo Trailer in Branded Premium Gold #E8B94F */}
        <rect
          x="13.5"
          y="4"
          width="21"
          height="13"
          rx="1.5"
          fill="#E8B94F"
          stroke="#FFF1A8"
          strokeWidth="0.6"
        />
        {/* Container Corrugated Rib Lines */}
        <line x1="19" y1="4" x2="19" y2="17" stroke="#0B2F4A" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="25" y1="4" x2="25" y2="17" stroke="#0B2F4A" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="30.5" y1="4" x2="30.5" y2="17" stroke="#0B2F4A" strokeWidth="0.8" strokeOpacity="0.4" />

        {/* Heavy Duty Wheels with Silver Rims & Gold Hubs */}
        <circle cx="7" cy="17.5" r="2.8" fill="#071F33" stroke="#FFFFFF" strokeWidth="1" />
        <circle cx="7" cy="17.5" r="1" fill="#E8B94F" />

        <circle cx="18.5" cy="17.5" r="2.8" fill="#071F33" stroke="#FFFFFF" strokeWidth="1" />
        <circle cx="18.5" cy="17.5" r="1" fill="#E8B94F" />

        <circle cx="29" cy="17.5" r="2.8" fill="#071F33" stroke="#FFFFFF" strokeWidth="1" />
        <circle cx="29" cy="17.5" r="1" fill="#E8B94F" />
      </svg>
    </div>
  );
}

function MiniToyRadarShip() {
  return (
    <div className="sitc-toy" aria-hidden="true">
      <div className="sitc-toy__radar">
        <span className="sitc-toy-radar-ping sitc-toy-radar-ping--1" />
        <span className="sitc-toy-radar-ping sitc-toy-radar-ping--2" />
      </div>

      {/* Radar Ship (Facing Left) */}
      <svg
        width="36"
        height="22"
        viewBox="0 0 36 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="sitc-toy__svg sitc-toy__svg--ship"
      >
        <rect x="23" y="5" width="7" height="8" rx="1.5" fill="#FFFFFF" stroke="#102D50" strokeWidth="1" />
        <rect x="24.5" y="7" width="4" height="2" rx="0.5" fill="#1769D2" />
        <circle cx="26.5" cy="2" r="1.8" fill="#00f0ff" className="sitc-toy-radar-dish" />

        <rect x="14" y="7" width="7" height="6" rx="1" fill="#1769D2" />
        <rect x="6" y="7" width="7" height="6" rx="1" fill="#2856A3" />
        <rect x="10" y="2.5" width="8" height="5" rx="1" fill="#102D50" />

        <path d="M2 13H34L30 20H6L2 13Z" fill="#102D50" />
        <path d="M3.5 15.5H32.5L31.2 17.5H4.8L3.5 15.5Z" fill="#1769D2" />
        <circle cx="5" cy="14.5" r="1" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

const navItems = [
  { label: 'Home', href: '/', icon: Home, toy: MiniToyTruck },
  { label: 'About Us', href: '/about', icon: Building2, toy: MiniToyTruck },
  { label: 'Services', href: '/services', icon: Boxes, toy: MiniToyTruck },
  { label: 'Technology', href: '/technology', icon: Cpu, toy: MiniToyTruck },
  { label: 'Blog', href: '/blog', icon: FileText, toy: MiniToyTruck },
  { label: 'Contact Us', href: '/contact', icon: Phone, toy: MiniToyTruck },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="sitc-capsule-nav" aria-label="Main Navigation">
      {/* Luxury Capsule Dock Track - Restored Outer Line */}
      <div className="sitc-capsule-dock">
        <ul className="sitc-capsule-nav__list">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const IconComponent = item.icon;
            const ToyComponent = item.toy;

            return (
              <li key={item.label} className="sitc-capsule-nav__item">
                <Link
                  href={item.href}
                  className={`sitc-pill-btn ${active ? 'sitc-pill-btn--active' : ''}`}
                >
                  {/* Cruising Miniature Animated Toy (Sails Forward Right-to-Left) */}
                  <ToyComponent />

                  {/* Seamless Continuous Low-Opacity River Waves */}
                  <LowOpacityWaves isActive={active} />

                  <IconComponent size={15} className="sitc-pill-btn__icon" />
                  <span className="sitc-pill-btn__label">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
