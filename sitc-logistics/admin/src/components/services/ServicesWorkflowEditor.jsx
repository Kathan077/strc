import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Loader2, Sparkles } from 'lucide-react';

const ICON_OPTIONS = ['FileText', 'Lock', 'Navigation', 'CheckCircle', 'ShieldCheck', 'Truck', 'Zap'];

export default function ServicesWorkflowEditor({ initialData, onSave, isSaving }) {
  const [data, setData] = useState(
    initialData || {
      kicker: '',
      title: 'Streamlined 4-Step Industrial Freight Execution Pipeline',
      description:
        'From instant algorithmic vehicle allocation to geo-fenced electronic seal verification, our operating lifecycle ensures zero demurrage and maximum transit velocity.',
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
      stepNum,
      plateCode: `GJ-01-SRTC-${stepNum}`,
      title: 'Execution Stage',
      tag: 'OPERATIONAL PROTOCOL',
      desc: 'Stage description, safety verification, and operational guidelines.',
      icon: 'Navigation',
      metric: 'Real-time SLA',
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
            4-Step Freight Execution Pipeline
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            Configure the 4 execution stages, registration plate tags, telematics metrics, and workflow details.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSave('workflow', data)}
          disabled={isSaving}
          className="btn-primary"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>{isSaving ? 'Saving to Atlas...' : 'Save Workflow Pipeline'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px', marginBottom: '18px' }}>
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
          <label className="form-label">Section Headline</label>
          <input
            type="text"
            className="input-field"
            value={data.title || ''}
            onChange={(e) => handleFieldChange('title', e.target.value)}
          />
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: '24px' }}>
        <label className="form-label">Pipeline Narrative</label>
        <textarea
          className="input-field"
          rows={2}
          value={data.description || ''}
          onChange={(e) => handleFieldChange('description', e.target.value)}
        />
      </div>

      {/* Steps List */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy-primary)' }}>
          Execution Steps ({data.steps?.length || 0})
        </h3>
        <button
          type="button"
          onClick={addStep}
          className="btn-secondary"
          style={{ fontSize: '0.8rem', padding: '7px 12px' }}
        >
          <Plus size={14} />
          <span>Add Step</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {data.steps?.map((step, idx) => (
          <div
            key={idx}
            style={{
              padding: '16px',
              borderRadius: '12px',
              background: '#f8fafc',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    background: 'var(--navy-primary)',
                    color: 'var(--gold-primary)',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    padding: '3px 8px',
                    borderRadius: '6px',
                  }}
                >
                  STAGE {step.stepNum}
                </span>
                <span style={{ fontWeight: 700, color: 'var(--navy-primary)', fontSize: '0.92rem' }}>
                  {step.title}
                </span>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{step.plateCode}</span>
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

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Step Title</label>
                <input
                  type="text"
                  className="input-field"
                  value={step.title || ''}
                  onChange={(e) => handleStepChange(idx, 'title', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Plate Code Tag</label>
                <input
                  type="text"
                  className="input-field"
                  value={step.plateCode || ''}
                  onChange={(e) => handleStepChange(idx, 'plateCode', e.target.value)}
                  placeholder="GJ-01-SRTC-01"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Stage Tag</label>
                <input
                  type="text"
                  className="input-field"
                  value={step.tag || ''}
                  onChange={(e) => handleStepChange(idx, 'tag', e.target.value)}
                  placeholder="DISPATCH PLANNING"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Metric Badge</label>
                <input
                  type="text"
                  className="input-field"
                  value={step.metric || ''}
                  onChange={(e) => handleStepChange(idx, 'metric', e.target.value)}
                  placeholder="< 15 Mins"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Icon</label>
                <select
                  className="input-field"
                  value={step.icon || 'FileText'}
                  onChange={(e) => handleStepChange(idx, 'icon', e.target.value)}
                >
                  {ICON_OPTIONS.map((ico) => (
                    <option key={ico} value={ico}>
                      {ico}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="input-field"
                  value={step.desc || ''}
                  onChange={(e) => handleStepChange(idx, 'desc', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

