export const metadata = {
  title: 'Contact Us – SRTC Logistics',
  description: 'Reach our 24/7 central dispatch and freight operations team.',
};

export default function ContactPage() {
  return (
    <div style={{ minHeight: '70vh', padding: '6rem 1.5rem', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <span style={{ color: '#E8B94F', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>
          Connect With Us
        </span>
        <h1 style={{ color: '#0B2F4A', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginTop: '0.5rem', marginBottom: '1rem' }}>
          24/7 Central Dispatch & Support
        </h1>
        <p style={{ color: '#263746', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Call +1 (800) 748-2564 or email dispatch@sitc-logistics.com to speak with our dedicated logistics planners.
        </p>
      </div>
    </div>
  );
}

