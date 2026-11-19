import ServicesHero from '@/components/services/ServicesHero';
import ServicesCoreSection from '@/components/services/ServicesCoreSection';
import ServicesIndustryContainerSection from '@/components/services/ServicesIndustryContainerSection';
import ServicesProcessWorkflowSection from '@/components/services/ServicesProcessWorkflowSection';
import ServicesClientsTrustSection from '@/components/services/ServicesClientsTrustSection';
import TruckContactCTA from '@/components/home/TruckContactCTA';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Logistics & Warehouse Handling Services | SRTC Supply Chain',
  description:
    'Two decades of freight mastery. Full Truck Load (FTL), Part Truck Load (PTL), Superfast Cargo, 3PL Warehousing & specialized Intermodal Container solutions for Polymers, Agro, Pharma, and Industrial enterprises across India.',
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function getServicesContent() {
  try {
    const res = await fetch(`${API_BASE}/api/services`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error('[API Fetch Error] Services endpoint responded with status:', res.status);
      return null;
    }
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    console.error('[API Fetch Error] Backend unreachable:', err.message);
    return null;
  }
}

export default async function ServicesPage() {
  const content = await getServicesContent();

  return (
    <main className="srtc-services-page" style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      {/* 1. Header Hero Banner */}
      <ServicesHero data={content?.hero} />

      {/* 2. Core Service Pillars: FTL, PTL & Superfast Cargo, Warehousing */}
      <ServicesCoreSection data={content?.core} />

      {/* 3. Specialized Intermodal Container Architecture (6 Vertical Industry Solutions) */}
      <ServicesIndustryContainerSection data={content?.industries} />

      {/* 4. 4-Step Pan-India Freight Execution Pipeline & Quality Compliance */}
      <ServicesProcessWorkflowSection data={content?.workflow} />

      {/* 5. Enterprise Client Trust & Verified Corporate Corridors */}
      <ServicesClientsTrustSection data={content?.trustClients} />

      {/* 6. Grand Finale Interactive Highway Container Truck Contact CTA */}
      <TruckContactCTA data={content?.truckContactCTA} />
    </main>
  );
}
