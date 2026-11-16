export const metadata = {
  title: 'Get a Freight Quote – SRTC Logistics',
  description: 'Calculate fast, insured shipping rates for nationwide cargo movements.',
};

export default function QuotePage() {
  return (
    <div style={{ minHeight: '70vh', padding: '6rem 1.5rem', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <span style={{ color: '#E8B94F', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>
          Instant Rate Estimator
        </span>
        <h1 style={{ color: '#0B2F4A', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginTop: '0.5rem', marginBottom: '1rem' }}>
          Request a Transparent Freight Quote
        </h1>
        <p style={{ color: '#263746', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Fast turnaround on heavy haulage, LTL, FTL, and enterprise freight contracts.
        </p>
      </div>
    </div>
  );
}

