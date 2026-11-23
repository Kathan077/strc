export const metadata = {
  title: 'Tracking – SRTC Live Telemetry',
  description: 'Track your consignment live with real-time GPS telemetry.',
};

export default function TrackingPage() {
  return (
    <div style={{ minHeight: '70vh', padding: '6rem 1.5rem', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <span style={{ color: '#E8B94F', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>
          Live Fleet Telemetry
        </span>
        <h1 style={{ color: '#0B2F4A', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginTop: '0.5rem', marginBottom: '1rem' }}>
          Real-Time Cargo & Fleet Tracking
        </h1>
        <p style={{ color: '#263746', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Track active shipments, verify electronic seals, and monitor real-time highway cruise velocities across active highway routes.
        </p>
      </div>
    </div>
  );
}

