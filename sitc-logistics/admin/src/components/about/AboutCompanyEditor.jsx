import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Loader2, Sparkles, X, PhoneCall } from 'lucide-react';
import ImageUploader from '../ImageUploader';

const ICON_OPTIONS = ['Calendar', 'Truck', 'ShieldCheck', 'History', 'Award', 'Building2'];

export default function AboutCompanyEditor({ initialData, onSave, isSaving }) {
  const [data, setData] = useState(
    initialData || {
      eyebrowText: '',
      title: 'Our services increase the',
      titleAccent: 'velocity & productivity',
      titleSuffix: 'of your supply chain.',
      leadText:
        'Shree Ram Transportation Corporation, founded in 2003 by Mr. Menandbhai Odedara, has set road logistics benchmarks across major industrial corridors for over two decades. Building on this legacy, SRTC Supply Chain Pvt. Ltd. commands 840+ heavy commercial vehicles delivering scalable FTL, container haulage, and warehouse handling for premier industrial leaders.',
      imgSupervisor: '/images/about/operations-supervisor.jpg',
      ribbonTag: 'ESTD. 2003',
      ribbonText: '23+ Years Experience',
      imgTruck: '/images/about/srtc-highway-truck.jpg',
      sealLabel: 'BEST ROAD FREIGHT',
      sealSub: 'SRTC FLEET',
      imgDetail: '/images/about/highway-truck-detail.jpg',
      milestones: [],
      topClients: [],
      actionBtnText: 'Explore Fleet Services',
      actionBtnLink: '/services',
      phoneLabel: 'Call Central Dispatch:',
      phoneNumber: '+91 9426646095',
      phoneTel: 'tel:+919426646095',
    }
  );

  const [newClientInput, setNewClientInput] = useState('');

  useEffect(() => {
    if (initialData) setData(initialData);
  }, [initialData]);

  const handleFieldChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMilestoneChange = (index, field, value) => {
    const updated = [...data.milestones];
    updated[index] = { ...updated[index], [field]: value };
    setData((prev) => ({ ...prev, milestones: updated }));
  };

  const addMilestone = () => {
    const newM = {
      year: '2026',
      title: 'Corporate Milestone',
      icon: 'ShieldCheck',
      highlight: 'Operational Achievement',
      description: 'Milestone narrative and impact detail on highway corridors.',
      delay: `${(data.milestones.length + 1) * 80}ms`,
    };
    setData((prev) => ({ ...prev, milestones: [...prev.milestones, newM] }));
  };

  const removeMilestone = (index) => {
    setData((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index),
    }));
  };

  const addClient = () => {
    if (!newClientInput.trim()) return;
    if (data.topClients.includes(newClientInput.trim())) return;
    setData((prev) => ({ ...prev, topClients: [...prev.topClients, newClientInput.trim()] }));
    setNewClientInput('');
  };

  const removeClient = (clientName) => {
    setData((prev) => ({
      ...prev,
      topClients: prev.topClients.filter((c) => c !== clientName),
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
            Company Heritage, Collage & Industrial Clients
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            Manage the visual 3-image collage, historical milestones, corporate lead copy, and client partners.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSave('company', data)}
          disabled={isSaving}
          className="btn-primary"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>{isSaving ? 'Saving to Atlas...' : 'Save Company Section'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* ================= LEFT COLUMN: Visual Collage & Branding ================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy-primary)' }}>
            1. Visual Collage Images & Ribbons
          </h3>

          {/* Supervisor Card */}
          <div style={{ padding: '16px', borderRadius: '12px', background: '#f8fafc', border: '1px solid var(--border-subtle)' }}>
            <div className="form-group">
              <label className="form-label">Top Card Image (Operations Supervisor)</label>
              <ImageUploader
                value={data.imgSupervisor || ''}
                onChange={(url) => handleFieldChange('imgSupervisor', url)}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
              <div className="form-group">
                <label className="form-label">Ribbon Tag</label>
                <input
                  type="text"
                  className="input-field"
                  value={data.ribbonTag || ''}
                  onChange={(e) => handleFieldChange('ribbonTag', e.target.value)}
                  placeholder="ESTD. 2003"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Ribbon Subtext</label>
                <input
                  type="text"
                  className="input-field"
                  value={data.ribbonText || ''}
                  onChange={(e) => handleFieldChange('ribbonText', e.target.value)}
                  placeholder="23+ Years Experience"
                />
              </div>
            </div>
          </div>

          {/* Truck Card & Seal */}
          <div style={{ padding: '16px', borderRadius: '12px', background: '#f8fafc', border: '1px solid var(--border-subtle)' }}>
            <div className="form-group">
              <label className="form-label">Bottom-Left Truck Image</label>
              <ImageUploader
                value={data.imgTruck || ''}
                onChange={(url) => handleFieldChange('imgTruck', url)}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
              <div className="form-group">
                <label className="form-label">Metallic Seal Label</label>
                <input
                  type="text"
                  className="input-field"
                  value={data.sealLabel || ''}
                  onChange={(e) => handleFieldChange('sealLabel', e.target.value)}
                  placeholder="BEST ROAD FREIGHT"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Metallic Seal Sub</label>
                <input
                  type="text"
                  className="input-field"
                  value={data.sealSub || ''}
                  onChange={(e) => handleFieldChange('sealSub', e.target.value)}
                  placeholder="SRTC FLEET"
                />
              </div>
            </div>
          </div>

          {/* Circular Chrome Detail Image */}
          <div style={{ padding: '16px', borderRadius: '12px', background: '#f8fafc', border: '1px solid var(--border-subtle)' }}>
            <div className="form-group">
              <label className="form-label">Circular Grille / Detail Image</label>
              <ImageUploader
                value={data.imgDetail || ''}
                onChange={(url) => handleFieldChange('imgDetail', url)}
              />
            </div>
          </div>

          {/* Action Row & Phone */}
          <div style={{ padding: '16px', borderRadius: '12px', background: '#f8fafc', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--navy-primary)', marginBottom: '12px' }}>
              Bottom Action Button & Phone Helpline
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Action Button Text</label>
                <input
                  type="text"
                  className="input-field"
                  value={data.actionBtnText || ''}
                  onChange={(e) => handleFieldChange('actionBtnText', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Action Button Link</label>
                <input
                  type="text"
                  className="input-field"
                  value={data.actionBtnLink || ''}
                  onChange={(e) => handleFieldChange('actionBtnLink', e.target.value)}
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px', marginTop: '12px' }}>
              <div className="form-group">
                <label className="form-label">Phone Label</label>
                <input
                  type="text"
                  className="input-field"
                  value={data.phoneLabel || ''}
                  onChange={(e) => handleFieldChange('phoneLabel', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="input-field"
                  value={data.phoneNumber || ''}
                  onChange={(e) => {
                    handleFieldChange('phoneNumber', e.target.value);
                    handleFieldChange('phoneTel', `tel:${e.target.value.replace(/\s+/g, '')}`);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: Narrative, Milestones & Clients ================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy-primary)' }}>
            2. Narrative, Milestones & Industrial Partners
          </h3>

          <div className="form-group">
            <label className="form-label">Eyebrow Kicker</label>
            <input
              type="text"
              className="input-field"
              value={data.eyebrowText || ''}
              onChange={(e) => handleFieldChange('eyebrowText', e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: '10px' }}>
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
                value={data.titleAccent || ''}
                onChange={(e) => handleFieldChange('titleAccent', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Title Suffix</label>
              <input
                type="text"
                className="input-field"
                value={data.titleSuffix || ''}
                onChange={(e) => handleFieldChange('titleSuffix', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Core Historical Narrative</label>
            <textarea
              className="input-field"
              rows={4}
              value={data.leadText || ''}
              onChange={(e) => handleFieldChange('leadText', e.target.value)}
            />
          </div>

          {/* Corporate Milestones */}
          <div style={{ padding: '16px', borderRadius: '12px', background: '#f8fafc', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--navy-primary)', margin: 0 }}>
                Corporate Milestones ({data.milestones?.length || 0})
              </h4>
              <button
                type="button"
                onClick={addMilestone}
                className="btn-secondary"
                style={{ fontSize: '0.78rem', padding: '6px 10px' }}
              >
                <Plus size={13} />
                <span>Add Milestone</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {data.milestones?.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '14px',
                    borderRadius: '10px',
                    background: '#ffffff',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--gold-primary)' }}>
                      Milestone #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeMilestone(idx)}
                      className="btn-danger"
                      style={{ padding: '3px 7px', fontSize: '0.72rem' }}
                    >
                      <Trash2 size={11} />
                      <span>Delete</span>
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: '10px' }}>
                    <div className="form-group">
                      <label className="form-label">Year / Big Tag</label>
                      <input
                        type="text"
                        className="input-field"
                        value={m.year || ''}
                        onChange={(e) => handleMilestoneChange(idx, 'year', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="input-field"
                        value={m.title || ''}
                        onChange={(e) => handleMilestoneChange(idx, 'title', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Icon</label>
                      <select
                        className="input-field"
                        value={m.icon || 'Calendar'}
                        onChange={(e) => handleMilestoneChange(idx, 'icon', e.target.value)}
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
                    <label className="form-label">Highlight Subtitle</label>
                    <input
                      type="text"
                      className="input-field"
                      value={m.highlight || ''}
                      onChange={(e) => handleMilestoneChange(idx, 'highlight', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      className="input-field"
                      rows={2}
                      value={m.description || ''}
                      onChange={(e) => handleMilestoneChange(idx, 'description', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trusted Industrial Clients */}
          <div style={{ padding: '16px', borderRadius: '12px', background: '#f8fafc', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--navy-primary)', marginBottom: '10px' }}>
              Trusted Industrial Clients ({data.topClients?.length || 0})
            </h4>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <input
                type="text"
                className="input-field"
                placeholder="Type client name (e.g. Indian Oil)..."
                value={newClientInput}
                onChange={(e) => setNewClientInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addClient();
                  }
                }}
              />
              <button
                type="button"
                onClick={addClient}
                className="btn-secondary"
                style={{ flexShrink: 0, padding: '0 16px' }}
              >
                <Plus size={14} />
                <span>Add</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {data.topClients?.map((client, idx) => (
                <span
                  key={idx}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 10px',
                    borderRadius: '6px',
                    background: '#ffffff',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--navy-primary)',
                  }}
                >
                  <span>{client}</span>
                  <button
                    type="button"
                    onClick={() => removeClient(client)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#94a3b8',
                      padding: 0,
                      display: 'flex',
                    }}
                    title="Remove client"
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

