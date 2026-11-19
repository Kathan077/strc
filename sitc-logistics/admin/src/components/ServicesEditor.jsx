import React, { useState } from 'react';
import { Save, Plus, Trash2, Loader2, Truck } from 'lucide-react';
import ImageUploader from './ImageUploader';

export default function ServicesEditor({ initialData, onSave, isSaving }) {
  const [data, setData] = useState(
    initialData || {
      kicker: '',
      title: '',
      subtitle: '',
      serviceCards: [],
    }
  );

  const handleFieldChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleCardChange = (index, field, value) => {
    const newCards = [...data.serviceCards];
    newCards[index] = { ...newCards[index], [field]: value };
    setData({ ...data, serviceCards: newCards });
  };

  const handleSpecsChange = (index, specStr) => {
    const specsArray = specStr.split(',').map((s) => s.trim()).filter(Boolean);
    const newCards = [...data.serviceCards];
    newCards[index] = { ...newCards[index], specs: specsArray };
    setData({ ...data, serviceCards: newCards });
  };

  const addCard = () => {
    const newCard = {
      id: `service-${Date.now()}`,
      category: 'Linehaul Special',
      title: 'New Transport Category',
      description: 'Dedicated high-capacity transportation solutions engineered for enterprise clients.',
      badge: 'SRTC-CUSTOM-SPEC',
      image: '',
      specs: ['Pre-Planned Corridors', 'Dedicated GPS'],
      ctaText: 'Explore System Spec',
      ctaLink: '/services',
    };
    setData({ ...data, serviceCards: [...data.serviceCards, newCard] });
  };

  const removeCard = (index) => {
    if (confirm('Delete this service card?')) {
      const newCards = data.serviceCards.filter((_, i) => i !== index);
      setData({ ...data, serviceCards: newCards });
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
            Multi-Modal Services & Fleet Grid
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Configure headings, top 3 flagship transport cards (FTL, PTL, Warehousing), and specialized industrial container pods.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="button" onClick={addCard} className="btn-secondary">
            <Plus size={16} color="var(--gold-primary)" />
            <span>Add Service Card</span>
          </button>
          <button
            type="button"
            onClick={() => onSave('services', data)}
            disabled={isSaving}
            className="btn-gold"
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            <span>Save Services</span>
          </button>
        </div>
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
          <label className="input-label">Section Main Title</label>
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

      {/* Cards List */}
      <div>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy-primary)', marginBottom: '18px' }}>
          Service & Container Cards ({data.serviceCards?.length || 0})
        </h3>

        {data.serviceCards.map((card, cIndex) => (
          <div
            key={cIndex}
            style={{
              background: '#ffffff',
              border: '1.5px solid var(--border-subtle)',
              borderRadius: '12px',
              padding: '22px',
              marginBottom: '18px',
              boxShadow: '0 2px 8px rgba(11, 47, 74, 0.04)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px dashed var(--border-subtle)',
                paddingBottom: '12px',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    background: card.badge?.startsWith('SRTC') ? 'rgba(7, 85, 122, 0.1)' : 'rgba(232, 185, 79, 0.15)',
                    color: card.badge?.startsWith('SRTC') ? 'var(--navy-light)' : 'var(--navy-primary)',
                    border: `1px solid ${card.badge?.startsWith('SRTC') ? 'rgba(7, 85, 122, 0.25)' : 'var(--gold-border)'}`,
                    fontWeight: 800,
                    fontSize: '0.76rem',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {card.badge || `CARD 0${cIndex + 1}`}
                </span>
                <strong style={{ fontSize: '1rem', color: 'var(--navy-primary)' }}>{card.title}</strong>
              </div>
              <button
                type="button"
                onClick={() => removeCard(cIndex)}
                className="btn-danger"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '14px' }}>
              <div>
                <label className="input-label">Card Title</label>
                <input
                  type="text"
                  value={card.title || ''}
                  onChange={(e) => handleCardChange(cIndex, 'title', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="input-label">Category / Badge Serial</label>
                <input
                  type="text"
                  value={card.badge || ''}
                  onChange={(e) => handleCardChange(cIndex, 'badge', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label className="input-label">Card Description</label>
              <textarea
                rows={2}
                value={card.description || ''}
                onChange={(e) => handleCardChange(cIndex, 'description', e.target.value)}
                className="input-field"
              />
            </div>

            {/* Optional Image for Flagship Cards */}
            <div style={{ marginBottom: '14px' }}>
              <ImageUploader
                label="Card Image (Optional - For Top 3 Flagship Cards)"
                value={card.image}
                onChange={(val) => handleCardChange(cIndex, 'image', val)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '14px' }}>
              <div>
                <label className="input-label">Specs / Client Tags (comma-separated)</label>
                <input
                  type="text"
                  value={(card.specs || []).join(', ')}
                  onChange={(e) => handleSpecsChange(cIndex, e.target.value)}
                  className="input-field"
                  placeholder="e.g. Multi-Axle Trailers, Zero Transshipment"
                />
              </div>
              <div>
                <label className="input-label">CTA Text</label>
                <input
                  type="text"
                  value={card.ctaText || 'Explore System Spec'}
                  onChange={(e) => handleCardChange(cIndex, 'ctaText', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="input-label">CTA Link</label>
                <input
                  type="text"
                  value={card.ctaLink || '/services'}
                  onChange={(e) => handleCardChange(cIndex, 'ctaLink', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
