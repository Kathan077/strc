export const metadata = {
  title: 'Services – SRTC Logistics',
  description: 'Explore comprehensive freight and logistics services from SRTC.',
};

export default function ServicesPage() {
  return (
    <div style={{ minHeight: '70vh', padding: '6rem 1.5rem', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <span style={{ color: '#E8B94F', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>
          SRTC Freight Solutions
        </span>
        <h1 style={{ color: '#0B2F4A', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginTop: '0.5rem', marginBottom: '1rem' }}>
          Comprehensive Transport & Logistics Services
        </h1>
        <p style={{ color: '#263746', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Providing multimodal freight, heavy haulage, ocean cargo, and expedited transit corridors with guaranteed reliability.
        </p>
      </div>
    </div>
  );
}

