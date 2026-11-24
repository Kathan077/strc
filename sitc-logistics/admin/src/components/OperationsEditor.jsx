import React, { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';

export default function OperationsEditor({ initialData, onSave, isSaving }) {
  const [data, setData] = useState(
    initialData || {
      kicker: '',
      title: '',
      subtitle: '',
      stages: [],
    }
  );

  useEffect(() => {
    if (initialData) setData(initialData);
  }, [initialData]);

  const handleFieldChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleStageChange = (index, field, value) => {
    const newStages = [...data.stages];
    newStages[index] = { ...newStages[index], [field]: value };
    setData({ ...data, stages: newStages });
  };

  const handleMetaChange = (index, metaField, value) => {
    const newStages = [...data.stages];
    newStages[index] = {
      ...newStages[index],
      cardMeta: { ...newStages[index].cardMeta, [metaField]: value },
    };
    setData({ ...data, stages: newStages });
  };

  const handleSpecsChange = (index, text) => {
    const specsArr = text.split('\n').filter((l) => l.trim().length > 0);
    const newStages = [...data.stages];
    newStages[index] = { ...newStages[index], specs: specsArr };
    setData({ ...data, stages: newStages });
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
            Operational Systems & Lifecycle Section
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Edit the 4 interactive end-to-end operational lifecycle stages (Order Allocation, Highway Transit, Plant Dock, e-POD Closure).
          </p>
        </div>
        <button
          type="button"
          onClick={() => onSave('operationalSystems', data)}
          disabled={isSaving}
          className="btn-gold"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>Save Operational Systems</span>
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

      {/* 4 Stages */}
      {data.stages.map((stage, sIndex) => (
        <div
          key={sIndex}
          style={{
            background: '#ffffff',
            border: '1.5px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '22px',
            marginBottom: '22px',
            boxShadow: '0 2px 8px rgba(11, 47, 74, 0.04)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              borderBottom: '1px dashed var(--border-subtle)',
              paddingBottom: '14px',
              marginBottom: '18px',
            }}
          >
            <span
              style={{
                background: 'var(--navy-primary)',
                color: 'var(--gold-primary)',
                fontWeight: 800,
                fontSize: '0.8rem',
                padding: '4px 12px',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              STAGE {stage.number || `0${sIndex + 1}`}
            </span>
            <strong style={{ fontSize: '1.05rem', color: 'var(--navy-primary)' }}>
              {stage.title}
            </strong>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label className="input-label">Category Subheading</label>
              <input
                type="text"
                value={stage.category || ''}
                onChange={(e) => handleStageChange(sIndex, 'category', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Stage Title</label>
              <input
                type="text"
                value={stage.title || ''}
                onChange={(e) => handleStageChange(sIndex, 'title', e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label className="input-label">Stage Subtitle</label>
            <input
              type="text"
              value={stage.subtitle || ''}
              onChange={(e) => handleStageChange(sIndex, 'subtitle', e.target.value)}
              className="input-field"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div style={{ padding: '14px', background: '#fff5f5', borderRadius: '10px', border: '1px solid #fed7d7' }}>
              <label className="input-label" style={{ color: '#c53030' }}>Client Pain Point (Red Callout)</label>
              <textarea
                rows={3}
                value={stage.clientPain || ''}
                onChange={(e) => handleStageChange(sIndex, 'clientPain', e.target.value)}
                className="input-field"
                style={{ background: '#ffffff', borderColor: '#feb2b2' }}
              />
            </div>
            <div style={{ padding: '14px', background: '#f0fdf4', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
              <label className="input-label" style={{ color: '#15803d' }}>SRTC Solution Protocol (Green Callout)</label>
              <textarea
                rows={3}
                value={stage.srtcSolution || ''}
                onChange={(e) => handleStageChange(sIndex, 'srtcSolution', e.target.value)}
                className="input-field"
                style={{ background: '#ffffff', borderColor: '#86efac' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label className="input-label">Key Specifications (One item per line)</label>
            <textarea
              rows={3}
              value={(stage.specs || []).join('\n')}
              onChange={(e) => handleSpecsChange(sIndex, e.target.value)}
              className="input-field"
              placeholder="e.g. Vehicle Assignment SLA: < 15 Minutes"
            />
          </div>

          {/* HUD Metadata */}
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <span className="input-label" style={{ marginBottom: '10px', display: 'block' }}>Card HUD Telemetry Details</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>Status Label</label>
                <input
                  type="text"
                  value={stage.cardMeta?.label || ''}
                  onChange={(e) => handleMetaChange(sIndex, 'label', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>Route / Bay info</label>
                <input
                  type="text"
                  value={stage.cardMeta?.route || ''}
                  onChange={(e) => handleMetaChange(sIndex, 'route', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>Docket / Tracking ID</label>
                <input
                  type="text"
                  value={stage.cardMeta?.docket || ''}
                  onChange={(e) => handleMetaChange(sIndex, 'docket', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>Key Metric Badge</label>
                <input
                  type="text"
                  value={stage.cardMeta?.metric || ''}
                  onChange={(e) => handleMetaChange(sIndex, 'metric', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
