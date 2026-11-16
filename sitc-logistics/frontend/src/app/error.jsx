'use client';

import { useEffect } from 'react';
import Button from '../components/common/Button';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: 'var(--color-white)',
      }}
    >
      <span className="badge-label" style={{ marginBottom: '1rem' }}>
        System Notice
      </span>
      <h2 style={{ color: 'var(--color-navy)', marginBottom: '1rem' }}>
        Unable to Load Logistics Module
      </h2>
      <p
        className="text-secondary"
        style={{ maxWidth: '480px', marginBottom: '1.5rem' }}
      >
        We encountered a temporary network or application issue. Please try refreshing or reach out to 24/7 SITC dispatch.
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button variant="primary" onClick={() => reset()}>
          Try Again
        </Button>
        <Button variant="secondary" href="/">
          Return Home
        </Button>
      </div>
    </div>
  );
}

