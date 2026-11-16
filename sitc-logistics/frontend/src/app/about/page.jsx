export const metadata = {
  title: 'About Us – SRTC Logistics',
  description: '25+ years of trusted logistics excellence and nationwide transport leadership.',
};

export default function AboutPage() {
  return (
    <div style={{ minHeight: '70vh', padding: '6rem 1.5rem', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <span style={{ color: '#E8B94F', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>
          Our Heritage & Mission
        </span>
        <h1 style={{ color: '#0B2F4A', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginTop: '0.5rem', marginBottom: '1rem' }}>
          About SRTC Logistics
        </h1>
        <p style={{ color: '#263746', fontSize: '1.05rem', lineHeight: 1.6 }}>
          With 25+ years of operational dominance and 1.2M+ successful cargo movements, SRTC delivers unmatched velocity and precision.
        </p>
      </div>
    </div>
  );
}

