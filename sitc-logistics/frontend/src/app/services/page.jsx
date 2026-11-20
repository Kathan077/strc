import ServicesHero from '@/components/services/ServicesHero';
import ServicesCoreSection from '@/components/services/ServicesCoreSection';
import ServicesIndustryContainerSection from '@/components/services/ServicesIndustryContainerSection';
import ServicesProcessWorkflowSection from '@/components/services/ServicesProcessWorkflowSection';
import ServicesClientsTrustSection from '@/components/services/ServicesClientsTrustSection';
import TruckContactCTA from '@/components/home/TruckContactCTA';
import LazySection from '@/components/common/LazySection';

// ISR Edge Caching (revalidates every 60s)
export const revalidate = 60;

export const metadata = {
  title: 'Logistics & Warehouse Handling Services | SRTC Supply Chain',
  description:
    'Two decades of freight mastery. Full Truck Load (FTL), Part Truck Load (PTL), Superfast Cargo, 3PL Warehousing & specialized Intermodal Container solutions for Polymers, Agro, Pharma, and Industrial enterprises across India.',
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function getServicesContent() {
  try {
    const res = await fetch(`${API_BASE}/api/services`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
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
      {/* 1. Header Hero Banner — Eager */}
      <ServicesHero data={content?.hero} />

      {/* 2. Core Service Pillars: FTL, PTL & Superfast Cargo, Warehousing */}
      <LazySection minHeight="650px">
        <ServicesCoreSection data={content?.core} />
      </LazySection>

      {/* 3. Specialized Intermodal Container Architecture (6 Vertical Industry Solutions) */}
      <LazySection minHeight="750px">
        <ServicesIndustryContainerSection data={content?.industries} />
      </LazySection>

      {/* 4. 4-Step Pan-India Freight Execution Pipeline & Quality Compliance */}
      <LazySection minHeight="600px">
        <ServicesProcessWorkflowSection data={content?.workflow} />
      </LazySection>

      {/* 5. Enterprise Client Trust & Verified Corporate Corridors */}
      <LazySection minHeight="550px">
        <ServicesClientsTrustSection data={content?.trustClients} />
      </LazySection>

      {/* 6. Grand Finale Interactive Highway Container Truck Contact CTA */}
      <LazySection minHeight="580px">
        <TruckContactCTA data={content?.truckContactCTA} />
      </LazySection>
    </main>
  );
}
