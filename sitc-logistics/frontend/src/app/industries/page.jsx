export const metadata = {
  title: 'Industries – SRTC Supply Chain',
  description: 'Specialized supply chain solutions across 6 brochure industry verticals.',
};

export default function IndustriesPage() {
  const industries = [
    { title: 'D to C & B to B', desc: 'Direct-to-consumer and business-to-business distribution networks.' },
    { title: 'Manufacturer', desc: 'Raw material procurement, plant infeed, and finished goods movement.' },
    { title: 'Industrial', desc: 'Heavy industrial consignments, machinery, and equipment linehaul.' },
    { title: 'Pharmaceuticals', desc: 'Careful handling, temperature integrity, and secure medicine transit.' },
    { title: 'Food & Beverages', desc: 'Clean, hygienic, and food-grade carriage for consumer edibles.' },
    { title: 'Polymers', desc: 'Specialized bulk polymer pellets, resins, and petrochemical transit.' },
  ];

  return (
    <div style={{ minHeight: '70vh', padding: '6rem 1.5rem', backgroundColor: '#FFFFFF' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
        <span style={{ color: '#E8B94F', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>
          Industry Verticals • Official Brochure
        </span>
        <h1 style={{ color: '#0B2F4A', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginTop: '0.5rem', marginBottom: '1rem' }}>
          Specialized Logistics For 6 Core Industries
        </h1>
        <p style={{ color: '#263746', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '720px', margin: '0 auto 3rem auto' }}>
          SRTC delivers proprietary, easy, and convenient freight solutions tailored for enterprise clients across India.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
          {industries.map((ind, idx) => (
            <div
              key={idx}
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderTop: '3px solid #E8B94F',
                borderRadius: '8px',
                padding: '1.5rem',
              }}
            >
              <h3 style={{ color: '#0B2F4A', fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                {ind.title}
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>
                {ind.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

