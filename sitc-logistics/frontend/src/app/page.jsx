import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import OperationalSystemsSection from '../components/home/OperationalSystemsSection';
import FAQSection from '../components/home/FAQSection';
import ValuesSection from '../components/home/ValuesSection';
import TruckContactCTA from '../components/home/TruckContactCTA';

export const dynamic = 'force-dynamic';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function getHomepageContent() {
  try {
    const res = await fetch(`${API_BASE}/api/homepage`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(3500),
    });
    if (!res.ok) {
      console.error('[API Fetch Error] Homepage endpoint responded with status:', res.status);
      return null;
    }
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    console.error('[API Fetch Error] Backend unreachable:', err.message);
    return null;
  }
}

export default async function HomePage() {
  const content = await getHomepageContent();

  return (
    <>
      {/* 1. Ultra Pro-Level Animated Hero Showcase */}
      <Hero data={content?.hero} />

      {/* 2. Signature Sculpted Bento About Section */}
      <AboutSection data={content?.about} />

      {/* 3. Ultra-Unique Multi-Modal Services Command Console */}
      <ServicesSection data={content?.services} />

      {/* 4. Bespoke Solutions & End-to-End Operational System Integrations */}
      <OperationalSystemsSection data={content?.operationalSystems} />

      {/* 5. Commercial Freight & Linehaul FAQ Console (Container & Truck Themed) */}
      <FAQSection data={content?.faq} />

      {/* 6. The Principles That Drive Us (Signature Values Showcase) */}
      <ValuesSection data={content?.values} />

      {/* 7. Grand Finale Truck & Container Contact Us Showcase with Interactive Headlights */}
      <TruckContactCTA data={content?.truckContactCTA} />
    </>
  );
}
