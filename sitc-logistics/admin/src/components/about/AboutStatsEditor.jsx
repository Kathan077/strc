import React, { useState } from 'react';
import { Save, Plus, Trash2, Loader2, Sparkles, MoveUp, MoveDown } from 'lucide-react';
import ImageUploader from '../ImageUploader';

const ICON_OPTIONS = ['History', 'Route', 'Truck', 'ShieldCheck', 'Calendar', 'Building2', 'Zap', 'Target'];
const VARIANT_OPTIONS = [
  { value: 'white', label: 'White Glass' },
  { value: 'gold', label: 'Gold Ambient' },
  { value: 'navy', label: 'Deep Navy' },
];

export default function AboutStatsEditor({ initialData, onSave, isSaving }) {
  const [data, setData] = useState(
    initialData || {
      kicker: 'HIGH-VELOCITY ROAD FREIGHT',
      title: 'Digital & Trusted Transport Logistic Company',
      description:
        'Pioneering technology-driven road transport, real-time GPS tracking, and guaranteed zero-demurrage turnaround across key corridors.',
      image: '/images/about/srtc-dryport-terminal.jpg',
      imageAlt: 'SRTC Inland Container Depot Dry Port Freight Logistics Terminal',
      ctaText: 'Request A Quote!',
      ctaLink: '/contact',
      statCards: [],
    }
  );

  const handleFieldChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCardChange = (index, field, value) => {
    const updated = [...data.statCards];
    updated[index] = { ...updated[index], [field]: value };
    setData((prev) => ({ ...prev, statCards: updated }));
  };

  const addStatCard = () => {
    const newCard = {
      id: `stat-${Date.now()}`,
      title: 'New Metric',
      number: '100+',
      icon: 'Truck',
      description: 'Metric description and operational impact detail.',
      variant: 'white',
      delay: `${(data.statCards.length + 1) * 80}ms`,
    };
    setData((prev) => ({ ...prev, statCards: [...prev.statCards, newCard] }));
  };

  const removeStatCard = (index) => {
    setData((prev) => ({
      ...prev,
      statCards: prev.statCards.filter((_, i) => i !== index),
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
            Transport Stats & Metric Cards
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            Manage the chamfered terminal image, lead copy, action CTA, and the 2x2 metric cards.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSave('stats', data)}
          disabled={isSaving}
          className="btn-primary"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>{isSaving ? 'Saving to Atlas...' : 'Save Stats Section'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '28px' }}>
        {/* Left Column: Terminal Image & Lead Copy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="form-group">
            <label className="form-label">Chamfered Terminal Image</label>
            <ImageUploader
              value={data.image || ''}
              onChange={(url) => handleFieldChange('image', url)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Image Alt Text (SEO)</label>
            <input
              type="text"
              className="input-field"
              value={data.imageAlt || ''}
              onChange={(e) => handleFieldChange('imageAlt', e.target.value)}
            />
          </div>

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
            <label className="form-label">Headline</label>
            <input
              type="text"
              className="input-field"
              value={data.title || ''}
              onChange={(e) => handleFieldChange('title', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Lead Narrative Description</label>
            <textarea
              className="input-field"
              rows={3}
              value={data.description || ''}
              onChange={(e) => handleFieldChange('description', e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">CTA Button Text</label>
              <input
                type="text"
                className="input-field"
                value={data.ctaText || ''}
                onChange={(e) => handleFieldChange('ctaText', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">CTA Button Link</label>
              <input
                type="text"
                className="input-field"
                value={data.ctaLink || ''}
                onChange={(e) => handleFieldChange('ctaLink', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Right Column: 2x2 Metric Cards Manager */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy-primary)' }}>
                Metric Cards ({data.statCards?.length || 0})
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                Cards render as a synchronized 2x2 grid matching the left image height.
              </p>
            </div>
            <button
              type="button"
              onClick={addStatCard}
              className="btn-secondary"
              style={{ fontSize: '0.8rem', padding: '7px 12px' }}
            >
              <Plus size={14} />
              <span>Add Metric Card</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {data.statCards?.map((card, idx) => (
              <div
                key={card.id || idx}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: card.variant === 'gold' ? 'rgba(232, 185, 79, 0.08)' : card.variant === 'navy' ? '#071f33' : '#f8fafc',
                  border: card.variant === 'gold' ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                  color: card.variant === 'navy' ? '#ffffff' : 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      color: card.variant === 'navy' ? 'var(--gold-primary)' : 'var(--navy-primary)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Card #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeStatCard(idx)}
                    className="btn-danger"
                    style={{ padding: '4px 8px', fontSize: '0.74rem' }}
                  >
                    <Trash2 size={12} />
                    <span>Delete</span>
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ color: card.variant === 'navy' ? '#cbd5e1' : undefined }}>
                      Title
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      value={card.title || ''}
                      onChange={(e) => handleCardChange(idx, 'title', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: card.variant === 'navy' ? '#cbd5e1' : undefined }}>
                      Big Number
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      value={card.number || ''}
                      onChange={(e) => handleCardChange(idx, 'number', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: card.variant === 'navy' ? '#cbd5e1' : undefined }}>
                      Icon
                    </label>
                    <select
                      className="input-field"
                      value={card.icon || 'History'}
                      onChange={(e) => handleCardChange(idx, 'icon', e.target.value)}
                    >
                      {ICON_OPTIONS.map((ico) => (
                        <option key={ico} value={ico}>
                          {ico}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: card.variant === 'navy' ? '#cbd5e1' : undefined }}>
                      Variant
                    </label>
                    <select
                      className="input-field"
                      value={card.variant || 'white'}
                      onChange={(e) => handleCardChange(idx, 'variant', e.target.value)}
                    >
                      {VARIANT_OPTIONS.map((v) => (
                        <option key={v.value} value={v.value}>
                          {v.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: card.variant === 'navy' ? '#cbd5e1' : undefined }}>
                    Card Description
                  </label>
                  <textarea
                    className="input-field"
                    rows={2}
                    value={card.description || ''}
                    onChange={(e) => handleCardChange(idx, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

