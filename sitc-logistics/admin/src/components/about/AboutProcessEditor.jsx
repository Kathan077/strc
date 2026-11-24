import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Loader2, Sparkles, MoveUp, MoveDown } from 'lucide-react';

const ICON_OPTIONS = ['CalendarCheck', 'PackageCheck', 'Navigation', 'ShieldCheck', 'Route', 'Clock', 'CheckCircle2'];

export default function AboutProcessEditor({ initialData, onSave, isSaving }) {
  const [data, setData] = useState(
    initialData || {
      kicker: '',
      title: 'Simple, Transparent &',
      titleGold: 'Precision-Driven.',
      description:
        'From instant freight allocation to zero-demurrage gate delivery, our heavy linehaul fleet moves your cargo across 180+ express corridors with guaranteed SLA precision.',
      steps: [],
    }
  );

  useEffect(() => {
    if (initialData) setData(initialData);
  }, [initialData]);

  const handleFieldChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStepChange = (index, field, value) => {
    const updated = [...data.steps];
    updated[index] = { ...updated[index], [field]: value };
    setData((prev) => ({ ...prev, steps: updated }));
  };

  const addStep = () => {
    const stepNum = String(data.steps.length + 1).padStart(2, '0');
    const newStep = {
      number: stepNum,
      km: `KM ${data.steps.length * 300}`,
      terminal: 'TRANSIT HUB',
      icon: 'Navigation',
      badge: 'Active SLA',
      title: 'Highway Transit Step',
      tagline: 'Standard Operational Protocol',
      desc: 'Real-time telemetry and structured highway driver governance.',
      tireModel: 'SRTC RADIAL 295/80 R22.5',
      tireSpec: 'STEEL BELTED RADIAL • TUBELESS • 152/148M',
    };
    setData((prev) => ({ ...prev, steps: [...prev.steps, newStep] }));
  };

  const removeStep = (index) => {
    setData((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="card-box animate-fade-in">
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '20px',
          marginBottom: '24px',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-primary)' }}>
            4-Step Freight Wheel Process Lifecycle
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            Manage the headline, operational stages, CAD radial wheel tire specs, and terminal waypoints.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSave('process', data)}
          disabled={isSaving}
          className="btn-primary"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>{isSaving ? 'Saving to Atlas...' : 'Save Process Lifecycle'}</span>
        </button>
      </div>

      {/* Main Header Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '18px' }}>
        <div className="form-group">
          <label className="form-label">Micro-Kicker</label>
          <input
            type="text"
            className="input-field"
            value={data.kicker || ''}
            onChange={(e) => handleFieldChange('kicker', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Title Prefix</label>
          <input
            type="text"
            className="input-field"
            value={data.title || ''}
            onChange={(e) => handleFieldChange('title', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Title Gold Accent</label>
          <input
            type="text"
            className="input-field"
            value={data.titleGold || ''}
            onChange={(e) => handleFieldChange('titleGold', e.target.value)}
          />
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: '24px' }}>
        <label className="form-label">Lifecycle Description</label>
        <textarea
          className="input-field"
          rows={2}
          value={data.description || ''}
          onChange={(e) => handleFieldChange('description', e.target.value)}
        />
      </div>

      {/* Steps List */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
        }}
      >
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy-primary)' }}>
          Operational Wheel Stages ({data.steps?.length || 0})
        </h3>
        <button
          type="button"
          onClick={addStep}
          className="btn-secondary"
          style={{ fontSize: '0.8rem', padding: '7px 12px' }}
        >
          <Plus size={14} />
          <span>Add Stage</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {data.steps?.map((step, idx) => (
          <div
            key={idx}
            style={{
              padding: '18px',
              borderRadius: '12px',
              background: '#f8fafc',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    background: 'var(--navy-primary)',
                    color: 'var(--gold-primary)',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    padding: '3px 8px',
                    borderRadius: '6px',
                  }}
                >
                  STEP {step.number}
                </span>
                <span style={{ fontWeight: 700, color: 'var(--navy-primary)', fontSize: '0.94rem' }}>
                  {step.title}
                </span>
                <span
                  style={{
                    fontSize: '0.74rem',
                    color: 'var(--text-muted)',
                    background: '#ffffff',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  {step.terminal} • {step.km}
                </span>
              </div>

              <button
                type="button"
                onClick={() => removeStep(idx)}
                className="btn-danger"
                style={{ padding: '4px 8px', fontSize: '0.74rem' }}
              >
                <Trash2 size={12} />
                <span>Delete</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1fr 1.2fr 1fr 1fr', gap: '10px' }}>
              <div className="form-group">
                <label className="form-label">Step #</label>
                <input
                  type="text"
                  className="input-field"
                  value={step.number || ''}
                  onChange={(e) => handleStepChange(idx, 'number', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Distance</label>
                <input
                  type="text"
                  className="input-field"
                  value={step.km || ''}
                  onChange={(e) => handleStepChange(idx, 'km', e.target.value)}
                  placeholder="KM 00"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Terminal / Station</label>
                <input
                  type="text"
                  className="input-field"
                  value={step.terminal || ''}
                  onChange={(e) => handleStepChange(idx, 'terminal', e.target.value)}
                  placeholder="DISPATCH HUB"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Badge</label>
                <input
                  type="text"
                  className="input-field"
                  value={step.badge || ''}
                  onChange={(e) => handleStepChange(idx, 'badge', e.target.value)}
                  placeholder="15-Min Allocation"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Icon</label>
                <select
                  className="input-field"
                  value={step.icon || 'CalendarCheck'}
                  onChange={(e) => handleStepChange(idx, 'icon', e.target.value)}
                >
                  {ICON_OPTIONS.map((ico) => (
                    <option key={ico} value={ico}>
                      {ico}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.5fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Step Headline</label>
                <input
                  type="text"
                  className="input-field"
                  value={step.title || ''}
                  onChange={(e) => handleStepChange(idx, 'title', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Tagline</label>
                <input
                  type="text"
                  className="input-field"
                  value={step.tagline || ''}
                  onChange={(e) => handleStepChange(idx, 'tagline', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Step Description</label>
              <textarea
                className="input-field"
                rows={2}
                value={step.desc || ''}
                onChange={(e) => handleStepChange(idx, 'desc', e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.5fr', gap: '12px', background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div className="form-group">
                <label className="form-label">CAD Truck Tire Model</label>
                <input
                  type="text"
                  className="input-field"
                  value={step.tireModel || ''}
                  onChange={(e) => handleStepChange(idx, 'tireModel', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Radial Tire Specification</label>
                <input
                  type="text"
                  className="input-field"
                  value={step.tireSpec || ''}
                  onChange={(e) => handleStepChange(idx, 'tireSpec', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

