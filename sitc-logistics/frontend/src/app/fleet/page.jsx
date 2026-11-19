export const metadata = {
  title: 'Fleet – SRTC Supply Chain',
  description: 'One of India’s largest privately owned commercial road transport fleets.',
};

export default function FleetPage() {
  return (
    <div style={{ minHeight: '70vh', padding: '6rem 1.5rem', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <span style={{ color: '#E8B94F', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>
          Privately Owned Fleet • Estd. 2003
        </span>
        <h1 style={{ color: '#0B2F4A', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginTop: '0.5rem', marginBottom: '1rem' }}>
          Commercial Road Logistics Fleet
        </h1>
        <p style={{ color: '#263746', fontSize: '1.05rem', lineHeight: 1.6 }}>
          One of India’s largest privately owned fleets. Dedicated point-to-point Full Truck Load (FTL) linehaul, Part Truck Load (PTL) superfast cargo, and modern warehouse handling with 100% traffic compliance and professional driver staff.
        </p>
      </div>
    </div>
  );
}

