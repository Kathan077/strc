import React, { useState } from 'react';
import { Save, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';
import ImageUploader from '../ImageUploader';

export default function AboutHeroEditor({ initialData, onSave, isSaving }) {
  const [data, setData] = useState(
    initialData || {
      backgroundImage: '/images/hero/hero-truck-cinematic.jpg',
      title: 'About',
      titleGold: 'SRTC Logistics',
      subtitle:
        'Two Decades of Heavy Freight Mastery, Port Evacuation & Guaranteed SLA Industrial Corridors.',
      breadcrumbHome: 'Home',
      breadcrumbCurrent: 'About Us',
    }
  );

  const handleFieldChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
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
            About Page Hero Banner
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            Configure the cinematic highway background, main display heading, and breadcrumb navigation.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSave('hero', data)}
          disabled={isSaving}
          className="btn-primary"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>{isSaving ? 'Saving to Atlas...' : 'Save Hero Banner'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        {/* Left Column: Headings & Subtitles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Title Prefix</label>
              <input
                type="text"
                className="input-field"
                value={data.title || ''}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                placeholder="About"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Title Gold Accent</label>
              <input
                type="text"
                className="input-field"
                value={data.titleGold || ''}
                onChange={(e) => handleFieldChange('titleGold', e.target.value)}
                placeholder="SRTC Logistics"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Subtitle / Corporate Purpose</label>
            <textarea
              className="input-field"
              rows={3}
              value={data.subtitle || ''}
              onChange={(e) => handleFieldChange('subtitle', e.target.value)}
              placeholder="Two Decades of Heavy Freight Mastery..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Breadcrumb Home Label</label>
              <input
                type="text"
                className="input-field"
                value={data.breadcrumbHome || ''}
                onChange={(e) => handleFieldChange('breadcrumbHome', e.target.value)}
                placeholder="Home"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Breadcrumb Current Label</label>
              <input
                type="text"
                className="input-field"
                value={data.breadcrumbCurrent || ''}
                onChange={(e) => handleFieldChange('breadcrumbCurrent', e.target.value)}
                placeholder="About Us"
              />
            </div>
          </div>

          {/* Live Preview Box */}
          <div
            style={{
              padding: '18px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #071f33 0%, #0b2f4a 100%)',
              border: '1px solid rgba(232, 185, 79, 0.3)',
              color: '#ffffff',
            }}
          >
            <div
              style={{
                fontSize: '0.7rem',
                color: 'var(--gold-primary)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '8px',
              }}
            >
              Live Banner Preview
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
              {data.title}{' '}
              <span style={{ color: 'var(--gold-primary)' }}>{data.titleGold}</span>
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.82rem', marginTop: '6px', lineHeight: 1.5 }}>
              {data.subtitle}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.74rem',
                color: '#94a3b8',
                marginTop: '12px',
                paddingTop: '10px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <span>{data.breadcrumbHome}</span>
              <span>/</span>
              <span style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>
                {data.breadcrumbCurrent}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Cinematic Background Image */}
        <div>
          <div className="form-group">
            <label className="form-label">Cinematic Hero Background Image</label>
            <ImageUploader
              value={data.backgroundImage || ''}
              onChange={(url) => handleFieldChange('backgroundImage', url)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

