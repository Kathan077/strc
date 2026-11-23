import React from 'react';
import TechHero from '@/components/technology/TechHero';
import TechMockupsSection from '@/components/technology/TechMockupsSection';
import TechModulesGrid from '@/components/technology/TechModulesGrid';
import TechCTAStrip from '@/components/technology/TechCTAStrip';

export const metadata = {
  title: 'Technology & Logistics Software Engineering | SRTC Supply Chain',
  description:
    'Discover SRTC FleetCore: our custom-engineered proprietary software managing commercial freight dispatching, container allocations, E-Way bills, Bilty LR, and digital e-POD across Gujarat industrial corridors.',
};

export default function TechnologyPage() {
  return (
    <main className="srtc-technology-page">
      {/* 1. Hero: Custom-Engineered Software Platform */}
      <TechHero />

      {/* 2. Dual Mockups Showcase: Central Dispatch Console (Laptop) & Field App (Phone) */}
      <TechMockupsSection />

      {/* 3. Four Core Operational Modules (Container-Themed Grid) */}
      <TechModulesGrid />

      {/* 4. Bottom Action & Freight Booking Strip */}
      <TechCTAStrip />
    </main>
  );
}

