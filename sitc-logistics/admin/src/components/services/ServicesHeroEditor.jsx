import React, { useState } from 'react';
import { Save, Loader2, Sparkles } from 'lucide-react';
import ImageUploader from '../ImageUploader';

export default function ServicesHeroEditor({ initialData, onSave, isSaving }) {
  const [data, setData] = useState(
    initialData || {
      backgroundImage: '/images/hero/hero-truck-cinematic.jpg',
      title: 'Our',
      titleGold: 'Services',
      subtitle:
        'Comprehensive Transport, Container Linehaul & Scalable Warehouse Solutions Across India.',
      breadcrumbHome: 'Home',
      breadcrumbCurrent: 'Our Services',
    }
  );

  const handleFieldChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
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
            Services Page Hero Banner
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            Configure the cinematic background image, main title with gold accent, and navigation breadcrumbs.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSave('hero', data)}
          disabled={isSaving}
          className="btn-primary"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>{isSaving ? 'Saving to Atlas...' : 'Save Services Hero'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Title Prefix</label>
              <input
                type="text"
                className="input-field"
                value={data.title || ''}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                placeholder="Our"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Title Gold Accent</label>
              <input
                type="text"
                className="input-field"
                value={data.titleGold || ''}
                onChange={(e) => handleFieldChange('titleGold', e.target.value)}
                placeholder="Services"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Subtitle / Description</label>
            <textarea
              className="input-field"
              rows={3}
              value={data.subtitle || ''}
              onChange={(e) => handleFieldChange('subtitle', e.target.value)}
              placeholder="Comprehensive Transport, Container Linehaul..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Breadcrumb Home</label>
              <input
                type="text"
                className="input-field"
                value={data.breadcrumbHome || ''}
                onChange={(e) => handleFieldChange('breadcrumbHome', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Breadcrumb Current</label>
              <input
                type="text"
                className="input-field"
                value={data.breadcrumbCurrent || ''}
                onChange={(e) => handleFieldChange('breadcrumbCurrent', e.target.value)}
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
              Services Banner Preview
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
              {data.title}{' '}
              <span style={{ color: 'var(--gold-primary)' }}>{data.titleGold}</span>
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.82rem', marginTop: '6px', lineHeight: 1.5 }}>
              {data.subtitle}
            </p>
          </div>
        </div>

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

