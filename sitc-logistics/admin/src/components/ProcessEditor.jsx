import React, { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';

export default function ProcessEditor({ initialData, onSave, isSaving }) {
  const [data, setData] = useState(
    initialData || {
      kicker: '',
      title: '',
      subtitle: '',
      steps: [],
    }
  );

  useEffect(() => {
    if (initialData) setData(initialData);
  }, [initialData]);

  const handleFieldChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleStepChange = (index, field, value) => {
    const newSteps = [...data.steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setData({ ...data, steps: newSteps });
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
            Process Workflow ("How We Deliver")
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Configure headings and the 4-step streamlined logistics process timeline.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onSave('process', data)}
          disabled={isSaving}
          className="btn-gold"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>Save Process</span>
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
        {data.steps.map((step, sIndex) => (
          <div
            key={sIndex}
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
                STEP {step.stepNum || `0${sIndex + 1}`}
              </span>
              <input
                type="text"
                value={step.pill || ''}
                onChange={(e) => handleStepChange(sIndex, 'pill', e.target.value)}
                className="input-field"
                placeholder="15-MIN SLA"
                style={{ width: '120px', padding: '4px 8px', fontSize: '0.78rem', textAlign: 'center', fontWeight: 700 }}
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label className="input-label">Step Title</label>
              <input
                type="text"
                value={step.title || ''}
                onChange={(e) => handleStepChange(sIndex, 'title', e.target.value)}
                className="input-field"
                style={{ fontWeight: 700 }}
              />
            </div>

            <div>
              <label className="input-label">Description</label>
              <textarea
                rows={3}
                value={step.desc || ''}
                onChange={(e) => handleStepChange(sIndex, 'desc', e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
