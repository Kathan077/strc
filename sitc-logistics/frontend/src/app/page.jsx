import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import OperationalSystemsSection from '../components/home/OperationalSystemsSection';
import FAQSection from '../components/home/FAQSection';
import ValuesSection from '../components/home/ValuesSection';
import TruckContactCTA from '../components/home/TruckContactCTA';
import LazySection from '../components/common/LazySection';

// ISR Edge Caching (revalidates every 60s for ultra-fast <50ms first loads)
export const revalidate = 60;

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function getHomepageContent() {
  try {
    const res = await fetch(`${API_BASE}/api/homepage`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
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
      {/* 1. Ultra Pro-Level Animated Hero Showcase — Kept Eager for instant FCP */}
      <Hero data={content?.hero} />

      {/* 2. Signature Sculpted Bento About Section — Progressive Chunk Loading */}
      <LazySection minHeight="720px">
        <AboutSection data={content?.about} />
      </LazySection>

      {/* 3. Ultra-Unique Multi-Modal Services Command Console */}
      <LazySection minHeight="850px">
        <ServicesSection data={content?.services} />
      </LazySection>

      {/* 4. Bespoke Solutions & End-to-End Operational System Integrations */}
      <LazySection minHeight="800px">
        <OperationalSystemsSection data={content?.operationalSystems} />
      </LazySection>

      {/* 5. Commercial Freight & Linehaul FAQ Console (Container & Truck Themed) */}
      <LazySection minHeight="650px">
        <FAQSection data={content?.faq} />
      </LazySection>

      {/* 6. The Principles That Drive Us (Signature Values Showcase) */}
      <LazySection minHeight="700px">
        <ValuesSection data={content?.values} />
      </LazySection>

      {/* 7. Grand Finale Truck & Container Contact Us Showcase with Interactive Headlights */}
      <LazySection minHeight="580px">
        <TruckContactCTA data={content?.truckContactCTA} />
      </LazySection>
    </>
  );
}
