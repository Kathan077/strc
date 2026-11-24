import React, { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';

export default function ValuesEditor({ initialData, onSave, isSaving }) {
  const [data, setData] = useState(
    initialData || {
      kicker: '',
      title: '',
      subtitle: '',
      pillars: [],
    }
  );

  useEffect(() => {
    if (initialData) setData(initialData);
  }, [initialData]);

  const handleFieldChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handlePillarChange = (index, field, value) => {
    const newPillars = [...data.pillars];
    newPillars[index] = { ...newPillars[index], [field]: value };
    setData({ ...data, pillars: newPillars });
  };

  return (
    <div className="card-box animate-fade-in">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '20px',
          marginBottom: '26px',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy-primary)' }}>
            Corporate Values & Fleet Trust Pillars
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Configure headings and the 4 trust & quality pillars (Safety, Customer, Green Sustainability, Operational Excellence).
          </p>
        </div>
        <button
          type="button"
          onClick={() => onSave('values', data)}
          disabled={isSaving}
          className="btn-gold"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>Save Values Section</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '18px', marginBottom: '18px' }}>
        <div>
          <label className="input-label">Kicker Badge</label>
          <input
            type="text"
            value={data.kicker || ''}
            onChange={(e) => handleFieldChange('kicker', e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="input-label">Section Title</label>
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      <div style={{ marginBottom: '26px' }}>
        <label className="input-label">Subtitle Description</label>
        <textarea
          rows={2}
          value={data.subtitle || ''}
          onChange={(e) => handleFieldChange('subtitle', e.target.value)}
          className="input-field"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
        {data.pillars.map((pillar, pIndex) => (
          <div
            key={pIndex}
            style={{
              background: '#ffffff',
              border: '1.5px solid var(--border-subtle)',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(11, 47, 74, 0.04)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                borderBottom: '1px dashed var(--border-subtle)',
                paddingBottom: '10px',
              }}
            >
              <span
                style={{
                  background: 'rgba(232, 185, 79, 0.15)',
                  color: 'var(--navy-primary)',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-mono)',
                  border: '1px solid var(--gold-border)',
                }}
              >
                PILLAR 0{pillar.stepNumber || pIndex + 1}: {pillar.stepLabel}
              </span>
              <input
                type="text"
                value={pillar.metric || ''}
                onChange={(e) => handlePillarChange(pIndex, 'metric', e.target.value)}
                className="input-field"
                placeholder="100% Insured"
                style={{ width: '120px', padding: '4px 8px', fontSize: '0.78rem', textAlign: 'center', fontWeight: 700 }}
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label className="input-label">Pillar Title</label>
              <input
                type="text"
                value={pillar.title || ''}
                onChange={(e) => handlePillarChange(pIndex, 'title', e.target.value)}
                className="input-field"
                style={{ fontWeight: 700 }}
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label className="input-label">Badge Label</label>
              <input
                type="text"
                value={pillar.badge || ''}
                onChange={(e) => handlePillarChange(pIndex, 'badge', e.target.value)}
                className="input-field"
                placeholder="ZERO-HARM STANDARD"
              />
            </div>

            <div>
              <label className="input-label">Description</label>
              <textarea
                rows={3}
                value={pillar.desc || ''}
                onChange={(e) => handlePillarChange(pIndex, 'desc', e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
