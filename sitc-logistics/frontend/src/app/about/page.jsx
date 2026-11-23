import AboutHero from '@/components/about/AboutHero';
import AboutStatsSection from '@/components/about/AboutStatsSection';
import AboutCompanySection from '@/components/about/AboutCompanySection';
import AboutVisionMission from '@/components/about/AboutVisionMission';
import AboutProcessSection from '@/components/about/AboutProcessSection';
import TruckContactCTA from '@/components/home/TruckContactCTA';
import LazySection from '@/components/common/LazySection';

// ISR Edge Caching (revalidates every 60s)
export const revalidate = 60;

export const metadata = {
  title: 'About Us | SRTC Logistics — Enterprise Industrial Linehaul & Supply Chain',
  description:
    'Established in 2003 by Mr. Menandbhai Odedara. Two decades of heavy freight transport, port evacuation, and guaranteed SLA logistics corridors.',
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function getAboutContent() {
  try {
    const res = await fetch(`${API_BASE}/api/about`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      console.error('[API Fetch Error] About endpoint responded with status:', res.status);
      return null;
    }
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    console.error('[API Fetch Error] Backend unreachable:', err.message);
    return null;
  }
}

export default async function AboutPage() {
  const content = await getAboutContent();

  return (
    <main className="srtc-about-page" style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      {/* 1. Header Hero Banner (Clean Reference Style with Navy & Gold Theme) — Eager */}
      <AboutHero data={content?.hero} />

      {/* 2. Digital & Trusted Transport Logistics (Chamfered Image & 2x2 Metric Cards) */}
      <LazySection minHeight="450px">
        <AboutStatsSection data={content?.stats} />
      </LazySection>

      {/* 3. Core Company Section: Visual Collage, Executive Heritage Milestones & Clients */}
      <LazySection minHeight="700px">
        <AboutCompanySection data={content?.company} />
      </LazySection>

      {/* 4. Strategic Compass: Vision & Mission Intermodal Container Architecture */}
      <LazySection minHeight="650px">
        <AboutVisionMission data={content?.visionMission} />
      </LazySection>

      {/* 5. How It Works: Simple & Creative 4-Step Freight Lifecycle */}
      <LazySection minHeight="550px">
        <AboutProcessSection data={content?.process} />
      </LazySection>

      {/* 6. Interactive Linehaul Fleet CTA: CAD Heavy-Haul Truck */}
      <LazySection minHeight="580px">
        <TruckContactCTA data={content?.truckContactCTA} />
      </LazySection>
    </main>
  );
}
