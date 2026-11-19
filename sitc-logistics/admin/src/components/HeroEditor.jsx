import React, { useState } from 'react';
import { Plus, Trash2, Save, Image as ImageIcon, Sparkles, Loader2 } from 'lucide-react';
import ImageUploader from './ImageUploader';

export default function HeroEditor({ initialData, onSave, isSaving }) {
  const [data, setData] = useState(
    initialData || {
      slides: [],
    }
  );

  const handleSlideChange = (index, field, value) => {
    const newSlides = [...data.slides];
    newSlides[index] = { ...newSlides[index], [field]: value };
    setData({ ...data, slides: newSlides });
  };

  const handleCtaChange = (index, ctaType, field, value) => {
    const newSlides = [...data.slides];
    newSlides[index] = {
      ...newSlides[index],
      [ctaType]: { ...newSlides[index][ctaType], [field]: value },
    };
    setData({ ...data, slides: newSlides });
  };

  const handleStatChange = (slideIndex, statIndex, field, value) => {
    const newSlides = [...data.slides];
    const newStats = [...newSlides[slideIndex].stats];
    newStats[statIndex] = { ...newStats[statIndex], [field]: value };
    newSlides[slideIndex] = { ...newSlides[slideIndex], stats: newStats };
    setData({ ...data, slides: newSlides });
  };

  const addSlide = () => {
    const newSlide = {
      kicker: 'STRATEGIC LOGISTICS · EXPEDITED',
      titleLine1: 'NATIONWIDE',
      titleLine2: 'EXPRESS',
      titleLine3: 'CORRIDORS',
      description: 'Reliable point-to-point heavy container transit across all industrial corridors.',
      ctaPrimary: { text: 'Explore Transport Solutions', link: '/services' },
      ctaSecondary: { text: 'Request Linehaul Quote', link: '/contact' },
      image: '/images/hero-1.png',
      stats: [
        { num: '24/7', label: 'Telemetry Monitoring' },
        { num: '99.5%', label: 'Transit Reliability' },
        { num: 'Pan-India', label: 'Direct Corridors' },
      ],
    };
    setData({ ...data, slides: [...data.slides, newSlide] });
  };

  const removeSlide = (index) => {
    if (data.slides.length <= 1) {
      alert('You must have at least one hero slide.');
      return;
    }
    if (confirm(`Are you sure you want to delete Slide #${index + 1}?`)) {
      const newSlides = data.slides.filter((_, i) => i !== index);
      setData({ ...data, slides: newSlides });
    }
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
            Hero Showcase Section
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Manage homepage carousel slides, 3-line titles, call-to-action buttons, background images, and live telemetry stats.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="button" onClick={addSlide} className="btn-secondary">
            <Plus size={16} color="var(--gold-primary)" />
            <span>Add Slide</span>
          </button>
          <button
            type="button"
            onClick={() => onSave('hero', data)}
            disabled={isSaving}
            className="btn-gold"
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            <span>Save Hero Section</span>
          </button>
        </div>
      </div>

      {data.slides.map((slide, sIndex) => (
        <div
          key={sIndex}
          style={{
            background: '#ffffff',
            border: '1.5px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '22px',
            marginBottom: '24px',
            boxShadow: '0 2px 8px rgba(11, 47, 74, 0.04)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '18px',
              borderBottom: '1px dashed var(--border-subtle)',
              paddingBottom: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  background: 'var(--navy-primary)',
                  color: 'var(--gold-primary)',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                }}
              >
                SLIDE 0{sIndex + 1}
              </span>
              <strong style={{ fontSize: '1rem', color: 'var(--navy-primary)' }}>
                {slide.titleLine1} {slide.titleLine2}
              </strong>
            </div>

            <button
              type="button"
              onClick={() => removeSlide(sIndex)}
              className="btn-danger"
              title="Delete this slide"
            >
              <Trash2 size={14} />
              <span>Delete Slide</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', marginBottom: '18px' }}>
            <div>
              <label className="input-label">Top Kicker Badge</label>
              <input
                type="text"
                value={slide.kicker || ''}
                onChange={(e) => handleSlideChange(sIndex, 'kicker', e.target.value)}
                className="input-field"
                placeholder="STRATEGIC LINEHAUL INFRASTRUCTURE · EST. 2000"
              />
            </div>
            <div>
              <ImageUploader
                label="Slide Background Image"
                value={slide.image}
                onChange={(val) => handleSlideChange(sIndex, 'image', val)}
              />
            </div>
          </div>

          {/* 3 Title Lines */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '18px' }}>
            <div>
              <label className="input-label">Title Line 1</label>
              <input
                type="text"
                value={slide.titleLine1 || ''}
                onChange={(e) => handleSlideChange(sIndex, 'titleLine1', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label" style={{ color: 'var(--gold-primary)' }}>Title Line 2 (Highlighted)</label>
              <input
                type="text"
                value={slide.titleLine2 || ''}
                onChange={(e) => handleSlideChange(sIndex, 'titleLine2', e.target.value)}
                className="input-field"
                style={{ fontWeight: 700 }}
              />
            </div>
            <div>
              <label className="input-label">Title Line 3</label>
              <input
                type="text"
                value={slide.titleLine3 || ''}
                onChange={(e) => handleSlideChange(sIndex, 'titleLine3', e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '18px' }}>
            <label className="input-label">Description Paragraph</label>
            <textarea
              rows={3}
              value={slide.description || ''}
              onChange={(e) => handleSlideChange(sIndex, 'description', e.target.value)}
              className="input-field"
            />
          </div>

          {/* CTAs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '20px' }}>
            <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--navy-primary)', fontWeight: 800, display: 'block', marginBottom: '10px', textTransform: 'uppercase' }}>
                PRIMARY CTA BUTTON
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Button Text"
                  value={slide.ctaPrimary?.text || ''}
                  onChange={(e) => handleCtaChange(sIndex, 'ctaPrimary', 'text', e.target.value)}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Link URL"
                  value={slide.ctaPrimary?.link || ''}
                  onChange={(e) => handleCtaChange(sIndex, 'ctaPrimary', 'link', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 800, display: 'block', marginBottom: '10px', textTransform: 'uppercase' }}>
                SECONDARY CTA BUTTON
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Button Text"
                  value={slide.ctaSecondary?.text || ''}
                  onChange={(e) => handleCtaChange(sIndex, 'ctaSecondary', 'text', e.target.value)}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Link URL"
                  value={slide.ctaSecondary?.link || ''}
                  onChange={(e) => handleCtaChange(sIndex, 'ctaSecondary', 'link', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div>
            <span className="input-label">3 Slide Telemetry Stats</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
              {(slide.stats || []).map((stat, stIndex) => (
                <div key={stIndex} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="e.g. 23+"
                    value={stat.num || ''}
                    onChange={(e) => handleStatChange(sIndex, stIndex, 'num', e.target.value)}
                    className="input-field"
                    style={{ width: '42%', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--navy-primary)' }}
                  />
                  <input
                    type="text"
                    placeholder="e.g. Years Dominance"
                    value={stat.label || ''}
                    onChange={(e) => handleStatChange(sIndex, stIndex, 'label', e.target.value)}
                    className="input-field"
                    style={{ width: '58%' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
