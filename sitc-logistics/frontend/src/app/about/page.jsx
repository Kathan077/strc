import AboutHero from '@/components/about/AboutHero';
import AboutStatsSection from '@/components/about/AboutStatsSection';
import AboutCompanySection from '@/components/about/AboutCompanySection';
import AboutVisionMission from '@/components/about/AboutVisionMission';
import AboutProcessSection from '@/components/about/AboutProcessSection';
import TruckContactCTA from '@/components/home/TruckContactCTA';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'About Us | SRTC Logistics — Pan-India Industrial Linehaul & Supply Chain',
  description:
    'Established in 2003 by Mr. Menandbhai Odedara. Two decades of heavy freight transport, port evacuation, and guaranteed SLA logistics corridors across India.',
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function getAboutContent() {
  try {
    const res = await fetch(`${API_BASE}/api/about`, {
      cache: 'no-store',
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
      {/* 1. Header Hero Banner (Clean Reference Style with Navy & Gold Theme) */}
      <AboutHero data={content?.hero} />

      {/* 2. Digital & Trusted Transport Logistics (Chamfered Image & 2x2 Metric Cards) */}
      <AboutStatsSection data={content?.stats} />

      {/* 3. Core Company Section: Visual Collage, Executive Heritage Milestones & Clients */}
      <AboutCompanySection data={content?.company} />

      {/* 4. Strategic Compass: Vision & Mission Intermodal Container Architecture */}
      <AboutVisionMission data={content?.visionMission} />

      {/* 5. How It Works: Simple & Creative 4-Step Freight Lifecycle */}
      <AboutProcessSection data={content?.process} />

      {/* 6. Interactive Linehaul Fleet CTA: CAD Heavy-Haul Truck */}
      <TruckContactCTA data={content?.truckContactCTA} />
    </main>
  );
}
