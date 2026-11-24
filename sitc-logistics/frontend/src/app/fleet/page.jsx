import ServicesFleetSpecSection from '@/components/services/ServicesFleetSpecSection';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Commercial Fleet & Container Specs – SRTC Supply Chain',
  description: 'Explore the modern, high-capacity SRTC commercial road transport fleet, container specifications, and payload ratings.',
};

export default function FleetPage() {
  return (
    <main style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', paddingTop: '1.5rem' }}>
      <ServicesFleetSpecSection />
    </main>
  );
}


