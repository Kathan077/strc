import React, { useState } from 'react';
import { Save, Plus, Trash2, Loader2, Sparkles, X } from 'lucide-react';
import ImageUploader from '../ImageUploader';

const ICON_OPTIONS = ['Truck', 'Package', 'Warehouse', 'ShieldCheck', 'Boxes', 'Layers', 'Clock'];

export default function ServicesCoreEditor({ initialData, onSave, isSaving }) {
  const [data, setData] = useState(
    initialData || {
      kicker: 'ENGINEERED FREIGHT ARCHITECTURE',
      title: 'Core Transportation & Warehouse Solutions',
      description:
        'Built upon two decades of logistical leadership, SRTC delivers high-velocity road freight with purpose-built equipment and guaranteed SLA precision.',
      coreServices: [],
    }
  );

  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleFieldChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCardChange = (cardIdx, field, value) => {
    const updated = [...data.coreServices];
    updated[cardIdx] = { ...updated[cardIdx], [field]: value };
    setData((prev) => ({ ...prev, coreServices: updated }));
  };

  const handleSpecChange = (cardIdx, specIdx, field, value) => {
    const updated = [...data.coreServices];
    const updatedSpecs = [...updated[cardIdx].specs];
    updatedSpecs[specIdx] = { ...updatedSpecs[specIdx], [field]: value };
    updated[cardIdx].specs = updatedSpecs;
    setData((prev) => ({ ...prev, coreServices: updated }));
  };

  const addSpec = (cardIdx) => {
    const updated = [...data.coreServices];
    updated[cardIdx].specs = [...(updated[cardIdx].specs || []), { label: 'SPEC LABEL', val: 'Value' }];
    setData((prev) => ({ ...prev, coreServices: updated }));
  };

  const removeSpec = (cardIdx, specIdx) => {
    const updated = [...data.coreServices];
    updated[cardIdx].specs = updated[cardIdx].specs.filter((_, i) => i !== specIdx);
    setData((prev) => ({ ...prev, coreServices: updated }));
  };

  const handleFeatureChange = (cardIdx, featIdx, value) => {
    const updated = [...data.coreServices];
    const updatedFeats = [...updated[cardIdx].features];
    updatedFeats[featIdx] = value;
    updated[cardIdx].features = updatedFeats;
    setData((prev) => ({ ...prev, coreServices: updated }));
  };

  const addFeature = (cardIdx) => {
    const updated = [...data.coreServices];
    updated[cardIdx].features = [...(updated[cardIdx].features || []), 'New operational capability or compliance guarantee'];
    setData((prev) => ({ ...prev, coreServices: updated }));
  };

  const removeFeature = (cardIdx, featIdx) => {
    const updated = [...data.coreServices];
    updated[cardIdx].features = updated[cardIdx].features.filter((_, i) => i !== featIdx);
    setData((prev) => ({ ...prev, coreServices: updated }));
  };

  const activeCard = data.coreServices?.[activeCardIndex];

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
            Core Transportation Pillars (FTL, PTL & Warehousing)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            Manage the flagship multi-modal services, technical payload specs, key features, and imagery.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSave('core', data)}
          disabled={isSaving}
          className="btn-primary"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>{isSaving ? 'Saving to Atlas...' : 'Save Core Services'}</span>
        </button>
      </div>

      {/* Main Section Header Fields */}
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
        <label className="form-label">Narrative Description</label>
        <textarea
          className="input-field"
          rows={2}
          value={data.description || ''}
          onChange={(e) => handleFieldChange('description', e.target.value)}
        />
      </div>

      {/* Service Selector Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1.5px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '24px' }}>
        {data.coreServices?.map((card, idx) => (
          <button
            key={card.id || idx}
            type="button"
            onClick={() => setActiveCardIndex(idx)}
            className="btn-secondary"
            style={{
              background: activeCardIndex === idx ? 'var(--navy-primary)' : '#ffffff',
              color: activeCardIndex === idx ? '#ffffff' : 'var(--navy-primary)',
              borderColor: activeCardIndex === idx ? 'var(--navy-primary)' : 'var(--border-subtle)',
              fontSize: '0.84rem',
              padding: '8px 16px',
            }}
          >
            <span>{card.title || `Service #${idx + 1}`}</span>
            {card.isFeatured && (
              <span style={{ fontSize: '0.66rem', background: 'var(--gold-primary)', color: '#0b2f4a', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                POPULAR
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Active Service Card Editor */}
      {activeCard && (
        <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '26px' }}>
          {/* Left Column: Details, Specs, Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Service Title</label>
                <input
                  type="text"
                  className="input-field"
                  value={activeCard.title || ''}
                  onChange={(e) => handleCardChange(activeCardIndex, 'title', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Category Subtitle</label>
                <input
                  type="text"
                  className="input-field"
                  value={activeCard.category || ''}
                  onChange={(e) => handleCardChange(activeCardIndex, 'category', e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Unit Code</label>
                <input
                  type="text"
                  className="input-field"
                  value={activeCard.unitCode || ''}
                  onChange={(e) => handleCardChange(activeCardIndex, 'unitCode', e.target.value)}
                  placeholder="SRTC // UNIT-01"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Unit Type</label>
                <input
                  type="text"
                  className="input-field"
                  value={activeCard.unitType || ''}
                  onChange={(e) => handleCardChange(activeCardIndex, 'unitType', e.target.value)}
                  placeholder="FTL LINEHAUL"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Metric Badge</label>
                <input
                  type="text"
                  className="input-field"
                  value={activeCard.metricBadge || ''}
                  onChange={(e) => handleCardChange(activeCardIndex, 'metricBadge', e.target.value)}
                  placeholder="42 TONS MAX"
                />
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

            {/* Technical Specifications */}
            <div style={{ padding: '14px', borderRadius: '10px', background: '#f8fafc', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--navy-primary)', textTransform: 'uppercase' }}>
                  Technical Specs ({activeCard.specs?.length || 0})
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
                      placeholder="Label"
                      value={sp.label || ''}
                      onChange={(e) => handleSpecChange(activeCardIndex, sIdx, 'label', e.target.value)}
                    />
                    <input
                      type="text"
                      className="input-field"
                      style={{ flex: 1.5 }}
                      placeholder="Value"
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

            {/* Feature Bullets */}
            <div style={{ padding: '14px', borderRadius: '10px', background: '#f8fafc', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--navy-primary)', textTransform: 'uppercase' }}>
                  Feature Bullet Points ({activeCard.features?.length || 0})
                </span>
                <button
                  type="button"
                  onClick={() => addFeature(activeCardIndex)}
                  className="btn-secondary"
                  style={{ fontSize: '0.74rem', padding: '4px 8px' }}
                >
                  <Plus size={12} />
                  <span>Add Feature</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {activeCard.features?.map((feat, fIdx) => (
                  <div key={fIdx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="text"
                      className="input-field"
                      value={feat || ''}
                      onChange={(e) => handleFeatureChange(activeCardIndex, fIdx, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(activeCardIndex, fIdx)}
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

          {/* Right Column: Image, CTA, Featured toggle */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Service Truck / Facility Photo</label>
              <ImageUploader
                value={activeCard.image || ''}
                onChange={(url) => handleCardChange(activeCardIndex, 'image', url)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">CTA Text</label>
                <input
                  type="text"
                  className="input-field"
                  value={activeCard.ctaText || ''}
                  onChange={(e) => handleCardChange(activeCardIndex, 'ctaText', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">CTA Link</label>
                <input
                  type="text"
                  className="input-field"
                  value={activeCard.ctaHref || ''}
                  onChange={(e) => handleCardChange(activeCardIndex, 'ctaHref', e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Icon</label>
                <select
                  className="input-field"
                  value={activeCard.icon || 'Truck'}
                  onChange={(e) => handleCardChange(activeCardIndex, 'icon', e.target.value)}
                >
                  {ICON_OPTIONS.map((ico) => (
                    <option key={ico} value={ico}>
                      {ico}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Status Tag</label>
                <input
                  type="text"
                  className="input-field"
                  value={activeCard.statusTag || ''}
                  onChange={(e) => handleCardChange(activeCardIndex, 'statusTag', e.target.value)}
                />
              </div>
            </div>

            <div style={{ padding: '14px', borderRadius: '10px', background: '#f8fafc', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="checkbox"
                id="isFeaturedToggle"
                checked={!!activeCard.isFeatured}
                onChange={(e) => handleCardChange(activeCardIndex, 'isFeatured', e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <label htmlFor="isFeaturedToggle" style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--navy-primary)', cursor: 'pointer' }}>
                Mark as Featured / Most Popular Choice
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

