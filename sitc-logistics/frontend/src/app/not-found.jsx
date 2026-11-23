'use client';

import Link from 'next/link';
import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '65vh',
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: 'var(--color-white)',
      }}
    >
      <span className="badge-label" style={{ marginBottom: '1rem' }}>
        404 – Route Not Found
      </span>
      <h1
        style={{
          color: 'var(--color-navy)',
          fontSize: '4rem',
          fontWeight: 800,
          marginBottom: '0.5rem',
        }}
      >
        404
      </h1>
      <h2 style={{ color: 'var(--color-navy)', marginBottom: '1rem' }}>
        Page or Waybill Not Located
      </h2>
      <p
        className="text-secondary"
        style={{ maxWidth: '480px', marginBottom: '2rem' }}
      >
        The page or cargo portal you are trying to reach does not exist or has been relocated to another shipping hub.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button variant="primary" href="/">
          Return to Home
        </Button>
        <Button variant="secondary" href="/tracking">
          Track Cargo
        </Button>
      </div>
    </div>
  );
}

