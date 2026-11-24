import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Loader2 } from 'lucide-react';
import ImageUploader from './ImageUploader';

export default function AboutEditor({ initialData, onSave, isSaving }) {
  const [data, setData] = useState(
    initialData || {
      kicker: '',
      titleLine1: '',
      highlightText: '',
      titleLine2: '',
      description: '',
      image: '/images/about/srtc-blue-container-truck.jpg',
      ctaText: '',
      ctaLink: '',
      tabCard1: { label: 'Industry Experience', stat: '23+ Years', sub: 'Est. 2003 by Menandbhai' },
      tabCard2: { label: 'Freight Network', stat: 'Largest', sub: 'Privately Owned Fleets' },
      stats: { shipments: 1.2, corridors: 180, fleet: 840, sla: 99.4 },
      capabilities: [],
    }
  );

  useEffect(() => {
    if (initialData) setData(initialData);
  }, [initialData]);

  const handleFieldChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTabCardChange = (cardKey, field, value) => {
    setData((prev) => ({
      ...prev,
      [cardKey]: {
        ...(prev[cardKey] || {}),
        [field]: value,
      },
    }));
  };

  const handleStatChange = (statField, value) => {
    setData({
      ...data,
      stats: { ...data.stats, [statField]: Number(value) || 0 },
    });
  };

  const handleCapChange = (index, field, value) => {
    const newCaps = [...data.capabilities];
    newCaps[index] = { ...newCaps[index], [field]: value };
    setData({ ...data, capabilities: newCaps });
  };

  const addCapability = () => {
    const nextId = String(data.capabilities.length + 1).padStart(2, '0');
    setData({
      ...data,
      capabilities: [
        ...data.capabilities,
        {
          id: nextId,
          title: 'New Industrial Capability',
          detail: 'Comprehensive logistics specifications and management.',
          tag: 'Direct Corridor',
        },
      ],
    });
  };

  const removeCapability = (index) => {
    const newCaps = data.capabilities.filter((_, i) => i !== index);
    setData({ ...data, capabilities: newCaps });
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
            About & Corporate Story Section
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Edit corporate narrative, highlight words, animated performance counter targets, and capabilities bento items.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onSave('about', data)}
          disabled={isSaving}
          className="btn-gold"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>Save About Section</span>
        </button>
      </div>

      {/* Header & Typography */}
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
          <label className="input-label">Title Line 1</label>
          <input
            type="text"
            value={data.titleLine1 || ''}
            onChange={(e) => handleFieldChange('titleLine1', e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
        <div>
          <label className="input-label" style={{ color: 'var(--gold-primary)' }}>Highlighted Text (Gold Shimmer)</label>
          <input
            type="text"
            value={data.highlightText || ''}
            onChange={(e) => handleFieldChange('highlightText', e.target.value)}
            className="input-field"
            style={{ fontWeight: 700 }}
          />
        </div>
        <div>
          <label className="input-label">Title Line 2</label>
          <input
            type="text"
            value={data.titleLine2 || ''}
            onChange={(e) => handleFieldChange('titleLine2', e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      <div style={{ marginBottom: '18px' }}>
        <label className="input-label">Corporate Narrative Description</label>
        <textarea
          rows={3}
          value={data.description || ''}
          onChange={(e) => handleFieldChange('description', e.target.value)}
          className="input-field"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '26px' }}>
        <div>
          <label className="input-label">Button Text</label>
          <input
            type="text"
            value={data.ctaText || ''}
            onChange={(e) => handleFieldChange('ctaText', e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="input-label">Button Target Link</label>
          <input
            type="text"
            value={data.ctaLink || ''}
            onChange={(e) => handleFieldChange('ctaLink', e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      {/* Featured About Truck Image Canvas */}
      <div style={{ marginBottom: '26px' }}>
        <ImageUploader
          label="Featured About Truck / Logistics Image (Shown on Bento Left)"
          currentImage={data.image || '/images/about/srtc-blue-container-truck.jpg'}
          onImageUploaded={(url) => handleFieldChange('image', url)}
          folder="srtc_logistics/about"
        />
      </div>

      {/* 2 Floating Stepped Badge Cards on Top of Truck Image */}
      <div
        style={{
          background: '#f8fafc',
          border: '1.5px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '22px',
          marginBottom: '26px',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--navy-primary)', margin: 0 }}>
            Overlapping Truck Metric Badges (Cards Shown on Top of Truck Image)
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            Directly customize the gold badge and white badge overlaid on the blue truck photo.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Card 1: Gold Badge */}
          <div
            style={{
              padding: '16px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(232, 185, 79, 0.15) 0%, rgba(232, 185, 79, 0.05) 100%)',
              border: '1px solid rgba(232, 185, 79, 0.4)',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '0.84rem', color: '#8a6509', marginBottom: '12px' }}>
              Gold Badge (Left Card)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label className="input-label" style={{ fontSize: '0.75rem' }}>Top Label</label>
                <input
                  type="text"
                  value={data.tabCard1?.label ?? 'Industry Experience'}
                  onChange={(e) => handleTabCardChange('tabCard1', 'label', e.target.value)}
                  className="input-field"
                  placeholder="e.g. Industry Experience"
                />
              </div>
              <div>
                <label className="input-label" style={{ fontSize: '0.75rem' }}>Big Stat (Highlighted)</label>
                <input
                  type="text"
                  value={data.tabCard1?.stat ?? '23+ Years'}
                  onChange={(e) => handleTabCardChange('tabCard1', 'stat', e.target.value)}
                  className="input-field"
                  style={{ fontWeight: 800, color: 'var(--navy-primary)' }}
                  placeholder="e.g. 23+ Years"
                />
              </div>
              <div>
                <label className="input-label" style={{ fontSize: '0.75rem' }}>Subtitle</label>
                <input
                  type="text"
                  value={data.tabCard1?.sub ?? 'Est. 2003 by Menandbhai'}
                  onChange={(e) => handleTabCardChange('tabCard1', 'sub', e.target.value)}
                  className="input-field"
                  placeholder="e.g. Est. 2003 by Menandbhai"
                />
              </div>
            </div>
          </div>

          {/* Card 2: White Badge */}
          <div
            style={{
              padding: '16px',
              borderRadius: '10px',
              background: '#ffffff',
              border: '1px solid var(--border-subtle)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '0.84rem', color: 'var(--navy-primary)', marginBottom: '12px' }}>
              White Badge (Right Card)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label className="input-label" style={{ fontSize: '0.75rem' }}>Top Label</label>
                <input
                  type="text"
                  value={data.tabCard2?.label ?? 'Freight Network'}
                  onChange={(e) => handleTabCardChange('tabCard2', 'label', e.target.value)}
                  className="input-field"
                  placeholder="e.g. Freight Network"
                />
              </div>
              <div>
                <label className="input-label" style={{ fontSize: '0.75rem' }}>Big Stat (Highlighted)</label>
                <input
                  type="text"
                  value={data.tabCard2?.stat ?? 'Largest'}
                  onChange={(e) => handleTabCardChange('tabCard2', 'stat', e.target.value)}
                  className="input-field"
                  style={{ fontWeight: 800, color: 'var(--navy-primary)' }}
                  placeholder="e.g. Largest"
                />
              </div>
              <div>
                <label className="input-label" style={{ fontSize: '0.75rem' }}>Subtitle</label>
                <input
                  type="text"
                  value={data.tabCard2?.sub ?? 'Privately Owned Fleets'}
                  onChange={(e) => handleTabCardChange('tabCard2', 'sub', e.target.value)}
                  className="input-field"
                  placeholder="e.g. Privately Owned Fleets"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Animated Performance Counters */}
      <div
        style={{
          background: '#f8fafc',
          border: '1.5px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '22px',
          marginBottom: '26px',
        }}
      >
        <h3 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--navy-primary)', marginBottom: '16px' }}>
          4 Live Stepped Tab Counters (Animated Physics Targets)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          <div>
            <label className="input-label">Shipments Counter (Lakhs)</label>
            <input
              type="number"
              step="0.1"
              value={data.stats?.shipments || 0}
              onChange={(e) => handleStatChange('shipments', e.target.value)}
              className="input-field"
              style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}
            />
          </div>
          <div>
            <label className="input-label">Corridors Counter</label>
            <input
              type="number"
              value={data.stats?.corridors || 0}
              onChange={(e) => handleStatChange('corridors', e.target.value)}
              className="input-field"
              style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}
            />
          </div>
          <div>
            <label className="input-label">Fleet Count</label>
            <input
              type="number"
              value={data.stats?.fleet || 0}
              onChange={(e) => handleStatChange('fleet', e.target.value)}
              className="input-field"
              style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}
            />
          </div>
          <div>
            <label className="input-label">On-Time SLA %</label>
            <input
              type="number"
              step="0.1"
              value={data.stats?.sla || 0}
              onChange={(e) => handleStatChange('sla', e.target.value)}
              className="input-field"
              style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}
            />
          </div>
        </div>
      </div>

      {/* Capabilities List */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--navy-primary)' }}>
            Enterprise Capabilities List ({data.capabilities?.length || 0})
          </h3>
          <button type="button" onClick={addCapability} className="btn-secondary" style={{ padding: '7px 14px', fontSize: '0.82rem' }}>
            <Plus size={14} color="var(--gold-primary)" />
            <span>Add Capability</span>
          </button>
        </div>

        {(data.capabilities || []).map((cap, cIndex) => (
          <div
            key={cIndex}
            style={{
              display: 'grid',
              gridTemplateColumns: '70px 1.5fr 2fr 1.2fr 40px',
              gap: '12px',
              alignItems: 'center',
              padding: '12px',
              background: '#ffffff',
              borderRadius: '10px',
              border: '1px solid var(--border-subtle)',
              marginBottom: '10px',
              boxShadow: '0 1px 3px rgba(11, 47, 74, 0.04)',
            }}
          >
            <input
              type="text"
              value={cap.id}
              onChange={(e) => handleCapChange(cIndex, 'id', e.target.value)}
              className="input-field"
              placeholder="01"
              style={{ textAlign: 'center', fontWeight: 800, fontFamily: 'var(--font-mono)', background: '#f8fafc' }}
            />
            <input
              type="text"
              value={cap.title}
              onChange={(e) => handleCapChange(cIndex, 'title', e.target.value)}
              className="input-field"
              placeholder="Title"
              style={{ fontWeight: 600 }}
            />
            <input
              type="text"
              value={cap.detail}
              onChange={(e) => handleCapChange(cIndex, 'detail', e.target.value)}
              className="input-field"
              placeholder="Detail narrative"
            />
            <input
              type="text"
              value={cap.tag}
              onChange={(e) => handleCapChange(cIndex, 'tag', e.target.value)}
              className="input-field"
              placeholder="Tag Badge"
            />
            <button
              type="button"
              onClick={() => removeCapability(cIndex)}
              style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '6px',
                color: '#dc2626',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
