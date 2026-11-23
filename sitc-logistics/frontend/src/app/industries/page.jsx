export const metadata = {
  title: 'Industries – SRTC Supply Chain',
  description: 'Specialized supply chain solutions across 9 industry verticals.',
};

export default function IndustriesPage() {
  const industries = [
    { title: 'Engineering', desc: 'Specialized heavy-duty road haulage for precision engineering assemblies, plant machinery, turbines, and turnkey project cargo.' },
    { title: 'Manufacturer', desc: 'Raw material procurement, production line infeed, and finished goods factory dock evacuation.' },
    { title: 'Industrial', desc: 'Engineered transport for industrial equipment, precision engineering assemblies, and structural steel across key corridors.' },
    { title: 'Chemical', desc: 'Safety-certified transportation for specialty chemicals, pigments, dyes, and bulk chemical containers.' },
    { title: 'Pharmaceuticals', desc: 'High-security, weather-sealed cargo transit for active pharmaceutical ingredients (APIs) and healthcare supplies.' },
    { title: 'Food & Beverages', desc: 'Hygiene-compliant, food-grade carriage for consumer edibles, spices, flour, and Gaay Chhap Besan.' },
    { title: 'Polymers', desc: 'High-capacity bulk polymer pellets, resins, and petrochemical supply chains from premier refinery complexes.' },
    { title: 'Furniture', desc: 'High-volume volumetric transport for modular office furniture, luxury furnishings, and commercial fixtures.' },
    { title: 'Cosmetics', desc: 'Clean, moisture-sealed container logistics for premium skincare, personal care formulations, and beauty retail goods.' },
  ];

  return (
    <div style={{ minHeight: '70vh', padding: '6rem 1.5rem', backgroundColor: '#FFFFFF' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
        <span style={{ color: '#E8B94F', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>
          Industry Verticals • Specialized Solutions
        </span>
        <h1 style={{ color: '#0B2F4A', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginTop: '0.5rem', marginBottom: '1rem' }}>
          Specialized Logistics For 9 Core Industries
        </h1>
        <p style={{ color: '#263746', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '720px', margin: '0 auto 3rem auto' }}>
          SRTC delivers dedicated, reliable freight solutions tailored for enterprise industrial clients.
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

