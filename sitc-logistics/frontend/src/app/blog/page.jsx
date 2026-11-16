export const metadata = {
  title: 'Blog & News – SRTC Logistics',
  description: 'Latest supply chain insights, fleet updates, and industry intelligence.',
};

export default function BlogPage() {
  return (
    <div style={{ minHeight: '70vh', padding: '6rem 1.5rem', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <span style={{ color: '#E8B94F', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>
          Insights & Updates
        </span>
        <h1 style={{ color: '#0B2F4A', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginTop: '0.5rem', marginBottom: '1rem' }}>
          Logistics Knowledge Hub
        </h1>
        <p style={{ color: '#263746', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Expert articles on supply chain resilience, intermodal speed optimizations, and modern transport telematics.
        </p>
      </div>
    </div>
  );
}

