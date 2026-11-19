import React, { useState } from 'react';
import { Save, Plus, Trash2, Loader2, Sparkles, Boxes } from 'lucide-react';

const ICON_OPTIONS = ['Layers', 'Utensils', 'Thermometer', 'Factory', 'Boxes', 'ShoppingBag', 'Truck', 'ShieldCheck'];

export default function ServicesIndustryEditor({ initialData, onSave, isSaving }) {
  const [data, setData] = useState(
    initialData || {
      kicker: 'ENGINEERED CONTAINER ARCHITECTURE',
      title: 'Vertical Industry Container Solutions',
      subtitle:
        'From high-cube food-grade dry vans to temperature-monitored reefers, our equipment is certified and configured for India’s premier industrial cargo corridors.',
      industryCards: [],
    }
  );

  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleFieldChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCardChange = (cardIdx, field, value) => {
    const updated = [...data.industryCards];
    updated[cardIdx] = { ...updated[cardIdx], [field]: value };
    setData((prev) => ({ ...prev, industryCards: updated }));
  };

  const handleSpecChange = (cardIdx, specIdx, field, value) => {
    const updated = [...data.industryCards];
    const updatedSpecs = [...updated[cardIdx].specs];
    updatedSpecs[specIdx] = { ...updatedSpecs[specIdx], [field]: value };
    updated[cardIdx].specs = updatedSpecs;
    setData((prev) => ({ ...prev, industryCards: updated }));
  };

  const addSpec = (cardIdx) => {
    const updated = [...data.industryCards];
    updated[cardIdx].specs = [...(updated[cardIdx].specs || []), { label: 'Spec Name', val: 'Specification' }];
    setData((prev) => ({ ...prev, industryCards: updated }));
  };

  const removeSpec = (cardIdx, specIdx) => {
    const updated = [...data.industryCards];
    updated[cardIdx].specs = updated[cardIdx].specs.filter((_, i) => i !== specIdx);
    setData((prev) => ({ ...prev, industryCards: updated }));
  };

  const addIndustryCard = () => {
    const newCard = {
      id: `ind-${Date.now()}`,
      serial: 'SRTC-NEW-CORRIDOR',
      isoCode: 'ISO 40HC STD',
      title: 'New Industry Sector',
      badge: 'CUSTOM SPEC',
      icon: 'Boxes',
      clients: 'ENTERPRISE PARTNERS',
      description: 'Engineered transport solution for specialized cargo linehaul.',
      specs: [
        { label: 'Container Size', val: '40ft High Cube' },
        { label: 'Payload Rating', val: '24 Metric Tons' },
      ],
      highlight: 'Direct corridor delivery with real-time GPS tracking.',
      isFeatured: false,
    };
    setData((prev) => ({ ...prev, industryCards: [...prev.industryCards, newCard] }));
    setActiveCardIndex(data.industryCards.length);
  };

  const removeIndustryCard = (cardIdx) => {
    setData((prev) => ({
      ...prev,
      industryCards: prev.industryCards.filter((_, i) => i !== cardIdx),
    }));
    setActiveCardIndex(0);
  };

  const activeCard = data.industryCards?.[activeCardIndex];

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
            Specialized Industry Containers (6 Verticals)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            Manage vertical sector container solutions, ISO codes, client references, and corridor specs.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSave('industries', data)}
          disabled={isSaving}
          className="btn-primary"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>{isSaving ? 'Saving to Atlas...' : 'Save Industry Containers'}</span>
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
        <label className="form-label">Subtitle Description</label>
        <textarea
          className="input-field"
          rows={2}
          value={data.subtitle || ''}
          onChange={(e) => handleFieldChange('subtitle', e.target.value)}
        />
      </div>

      {/* Industry Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1.5px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {data.industryCards?.map((card, idx) => (
            <button
              key={card.id || idx}
              type="button"
              onClick={() => setActiveCardIndex(idx)}
              className="btn-secondary"
              style={{
                background: activeCardIndex === idx ? 'var(--navy-primary)' : '#ffffff',
                color: activeCardIndex === idx ? '#ffffff' : 'var(--navy-primary)',
                borderColor: activeCardIndex === idx ? 'var(--navy-primary)' : 'var(--border-subtle)',
                fontSize: '0.82rem',
                padding: '7px 14px',
              }}
            >
              <span>{card.title?.split(' ')[0] || `Sector #${idx + 1}`}</span>
              {card.isFeatured && (
                <span style={{ fontSize: '0.64rem', background: 'var(--gold-primary)', color: '#0b2f4a', padding: '1px 5px', borderRadius: '4px', fontWeight: 800 }}>
                  FEATURED
                </span>
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={addIndustryCard}
          className="btn-secondary"
          style={{ fontSize: '0.8rem', padding: '6px 12px', flexShrink: 0 }}
        >
          <Plus size={14} />
          <span>Add Sector</span>
        </button>
      </div>

      {/* Active Industry Card Editor */}
      {activeCard && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--navy-primary)' }}>
              Editing: {activeCard.title}
            </span>
            <button
              type="button"
              onClick={() => removeIndustryCard(activeCardIndex)}
              className="btn-danger"
              style={{ padding: '4px 10px', fontSize: '0.76rem' }}
            >
              <Trash2 size={13} />
              <span>Delete This Sector</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Sector Title</label>
              <input
                type="text"
                className="input-field"
                value={activeCard.title || ''}
                onChange={(e) => handleCardChange(activeCardIndex, 'title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Container Serial</label>
              <input
                type="text"
                className="input-field"
                value={activeCard.serial || ''}
                onChange={(e) => handleCardChange(activeCardIndex, 'serial', e.target.value)}
                placeholder="SRTC-32FT-POLYMERS"
              />
            </div>
            <div className="form-group">
              <label className="form-label">ISO Code</label>
              <input
                type="text"
                className="input-field"
                value={activeCard.isoCode || ''}
                onChange={(e) => handleCardChange(activeCardIndex, 'isoCode', e.target.value)}
                placeholder="ISO 22G1 BULK"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Badge Tag</label>
              <input
                type="text"
                className="input-field"
                value={activeCard.badge || ''}
                onChange={(e) => handleCardChange(activeCardIndex, 'badge', e.target.value)}
                placeholder="HIGH-VOLUME BULK"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Client Logos / Partners Label</label>
              <input
                type="text"
                className="input-field"
                value={activeCard.clients || ''}
                onChange={(e) => handleCardChange(activeCardIndex, 'clients', e.target.value)}
                placeholder="IOCL / NAYARA / RELIANCE / OPAL"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Icon</label>
              <select
                className="input-field"
                value={activeCard.icon || 'Layers'}
                onChange={(e) => handleCardChange(activeCardIndex, 'icon', e.target.value)}
              >
                {ICON_OPTIONS.map((ico) => (
                  <option key={ico} value={ico}>
                    {ico}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="input-field"
              rows={3}
              value={activeCard.description || ''}
              onChange={(e) => handleCardChange(activeCardIndex, 'description', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Corridor Operational Highlight</label>
            <input
              type="text"
              className="input-field"
              value={activeCard.highlight || ''}
              onChange={(e) => handleCardChange(activeCardIndex, 'highlight', e.target.value)}
            />
          </div>

          {/* Specs */}
          <div style={{ padding: '14px', borderRadius: '10px', background: '#f8fafc', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--navy-primary)', textTransform: 'uppercase' }}>
                Container Technical Specs ({activeCard.specs?.length || 0})
              </span>
              <button
                type="button"
                onClick={() => addSpec(activeCardIndex)}
                className="btn-secondary"
                style={{ fontSize: '0.74rem', padding: '4px 8px' }}
              >
                <Plus size={12} />
                <span>Add Spec</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activeCard.specs?.map((sp, sIdx) => (
                <div key={sIdx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    className="input-field"
                    style={{ flex: 1 }}
                    placeholder="Spec Name"
                    value={sp.label || ''}
                    onChange={(e) => handleSpecChange(activeCardIndex, sIdx, 'label', e.target.value)}
                  />
                  <input
                    type="text"
                    className="input-field"
                    style={{ flex: 1.5 }}
                    placeholder="Specification Value"
                    value={sp.val || ''}
                    onChange={(e) => handleSpecChange(activeCardIndex, sIdx, 'val', e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeSpec(activeCardIndex, sIdx)}
                    className="btn-danger"
                    style={{ padding: '6px' }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

