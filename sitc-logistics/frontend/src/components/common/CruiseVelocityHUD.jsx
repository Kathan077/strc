'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import './CruiseVelocityHUD.css';

export default function CruiseVelocityHUD() {
  const pathname = usePathname();
  const [realSpeed, setRealSpeed] = useState(0);
  const [activeSection, setActiveSection] = useState('HERO SECTION');

  const lastScrollYRef = useRef(0);
  const lastTimeRef = useRef(0);
  const targetSpeedRef = useRef(0);
  const currentSpeedRef = useRef(0);
  const animFrameRef = useRef(null);
  const activeSectionRef = useRef('HERO SECTION');

  // Dynamic Section Detection
  useEffect(() => {
    // If on sub-pages (e.g. /services, /about, /fleet, /tracking), show current route name
    if (pathname && pathname !== '/') {
      const cleanPath = pathname.replace(/^\//, '').split('/')[0];
      const routeLabels = {
        about: 'ABOUT US',
        services: 'SERVICES',
        fleet: 'FLEET NETWORK',
        tracking: 'LIVE TRACKING',
        industries: 'INDUSTRIES',
        contact: 'CONTACT US',
        quote: 'GET A QUOTE',
        blog: 'BLOG & NEWS',
      };
      const label = routeLabels[cleanPath] || cleanPath.toUpperCase();
      setActiveSection(label);
      activeSectionRef.current = label;
      return;
    }

    // On homepage, track active section dynamically using viewport intersection
    const updateActiveSection = () => {
      // Near top of page always equals HERO SECTION
      if (window.scrollY < 220) {
        if (activeSectionRef.current !== 'HERO SECTION') {
          activeSectionRef.current = 'HERO SECTION';
          setActiveSection('HERO SECTION');
        }
        return;
      }

      const customSections = Array.from(document.querySelectorAll('[data-section-name]'));
      const triggerY = window.innerHeight * 0.45;

      let matched = null;

      // Scan in reverse order from bottom-most section upwards
      for (let i = customSections.length - 1; i >= 0; i--) {
        const el = customSections[i];
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY) {
          matched = el.getAttribute('data-section-name');
          break;
        }
      }

      if (matched && matched !== activeSectionRef.current) {
        activeSectionRef.current = matched;
        setActiveSection(matched);
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [pathname]);

  // Real-time Physics Speedometer Loop
  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    lastTimeRef.current = performance.now();

    const updatePhysics = () => {
      const diff = targetSpeedRef.current - currentSpeedRef.current;
      if (Math.abs(diff) > 0.4) {
        currentSpeedRef.current += diff * (targetSpeedRef.current > currentSpeedRef.current ? 0.35 : 0.16);
      } else {
        currentSpeedRef.current = targetSpeedRef.current;
      }

      setRealSpeed(Math.round(currentSpeedRef.current));

      // Natural friction decay when scrolling pauses
      targetSpeedRef.current = Math.max(0, targetSpeedRef.current * 0.88);
      if (targetSpeedRef.current < 0.5) {
        targetSpeedRef.current = 0;
      }

      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameRef.current = requestAnimationFrame(updatePhysics);

    const handleScroll = () => {
      const now = performance.now();
      const currentY = window.scrollY;
      const dt = Math.max(8, now - lastTimeRef.current);
      const dy = Math.abs(currentY - lastScrollYRef.current);

      // Instant scroll velocity: px per ms converted directly to KM/H
      const instantVelocity = Math.min(145, (dy / dt) * 24);
      targetSpeedRef.current = Math.max(targetSpeedRef.current, instantVelocity);

      lastScrollYRef.current = currentY;
      lastTimeRef.current = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const isMoving = realSpeed > 0;

  return (
    <aside className="sitc-global-hud hide-on-mobile" aria-label="Live Fleet GPS Dispatch Tag">
      <div className={`sitc-gps-tag ${isMoving ? 'is-moving' : ''}`}>
        {/* Radar beacon with radar ping animation */}
        <span className="sitc-gps-tag__beacon" aria-hidden="true">
          <span className="sitc-gps-tag__ping"></span>
          <span className="sitc-gps-tag__dot"></span>
        </span>

        {/* Clean GPS Speed Readout */}
        <div className="sitc-gps-tag__readout">
          <span className="sitc-gps-tag__label">LIVE GPS:</span>
          <span className="sitc-gps-tag__val">
            <strong>{realSpeed}</strong> <small>KM/H</small>
          </span>
        </div>

        {/* Translucent separator */}
        <span className="sitc-gps-tag__divider" aria-hidden="true"></span>

        {/* Dynamic Active Section Indicator (Hero Section, About Section, etc.) */}
        <span
          className={`sitc-gps-tag__status ${isMoving ? 'is-active' : ''}`}
          key={activeSection}
        >
          {activeSection}
        </span>
      </div>
    </aside>
  );
}
