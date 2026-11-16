export const metadata = {
  title: 'Fleet – SRTC Transport Units',
  description: 'Explore the modern, high-capacity SRTC transport fleet.',
};

export default function FleetPage() {
  return (
    <div style={{ minHeight: '70vh', padding: '6rem 1.5rem', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <span style={{ color: '#E8B94F', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>
          Modern Heavy Fleet
        </span>
        <h1 style={{ color: '#0B2F4A', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginTop: '0.5rem', marginBottom: '1rem' }}>
          500+ Active Transport Units
        </h1>
        <p style={{ color: '#263746', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Multi-axle container carriers, temperature-controlled reefers, and high-cube trailers maintaining peak highway performance.
        </p>
      </div>
    </div>
  );
}

