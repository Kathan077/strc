import React, { useState } from 'react';
import { Save, Plus, Trash2, Loader2, Sparkles, Target, Eye, Compass, Award, UserCheck } from 'lucide-react';
import ImageUploader from '../ImageUploader';

const ICON_OPTIONS = ['Leaf', 'ShieldCheck', 'Cpu', 'Award', 'Zap', 'TrendingUp', 'Truck', 'Target', 'Compass'];

export default function AboutVisionMissionEditor({ initialData, onSave, isSaving }) {
  const [data, setData] = useState(
    initialData || {
      kicker: 'STRATEGIC COMPASS & CORPORATE PURPOSE',
      title: 'Driven by Mission, Powered by Vision',
      subtitle:
        'Founded on two decades of heavy highway transit leadership, our corporate compass guides every haul, secures every industrial cargo, and powers supply chains across India.',
      mission: {
        docId: 'DOC: MSN-2003 / REV-04',
        barcodeText: '||||||| 2003 840 994',
        badge: 'OPERATIONAL ROADMAP',
        seal: 'SEAL: SRTC-MSN-2003',
        title: 'Our Mission',
        tagline: "Revolutionizing India's Transportation Landscape",
        paragraph: '',
        pillars: [],
        specs: { payload: '32,500 KG', corridors: '180+ EXPRESS', compliance: '100% REGULATORY' },
      },
      vision: {
        docId: 'DOC: VSN-2030 / REV-02',
        barcodeText: '||||||| 2030 180 001',
        badge: 'STRATEGIC HORIZON',
        seal: 'SEAL: SRTC-VSN-2030',
        title: 'Our Vision',
        tagline: 'Foremost & Most Preferred Transportation Enterprise',
        paragraph: '',
        pillars: [],
        specs: { horizon: 'PAN-INDIA LEAD', activeFleet: '840+ HEAVY TRUCKS', reliability: '23+ YEARS PROVEN' },
      },
      chassisCommitments: [],
      founderStrip: {
        avatar: '/images/about/menand-odedara-founder.jpg',
        badge: 'FOUNDER',
        quote: '',
        name: 'MENAND BALUBHAI ODEDARA',
        role: 'Founder & Managing Director — Shree Ram Transportation Corporation',
        btnText: 'View Haulage Services',
        btnLink: '/services',
      },
    }
  );

  const [activeTab, setActiveTab] = useState('mission'); // 'mission' | 'vision' | 'founder'

  const handleFieldChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContainerChange = (type, field, value) => {
    setData((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value },
    }));
  };

  const handleSpecChange = (type, specKey, value) => {
    setData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        specs: { ...prev[type].specs, [specKey]: value },
      },
    }));
  };

  const handlePillarChange = (type, index, field, value) => {
    const updated = [...data[type].pillars];
    updated[index] = { ...updated[index], [field]: value };
    setData((prev) => ({
      ...prev,
      [type]: { ...prev[type], pillars: updated },
    }));
  };

  const addPillar = (type) => {
    const newPillar = {
      icon: type === 'mission' ? 'ShieldCheck' : 'TrendingUp',
      title: 'Strategic Strategic Pillar',
      desc: 'Operational details and execution protocols.',
    };
    setData((prev) => ({
      ...prev,
      [type]: { ...prev[type], pillars: [...prev[type].pillars, newPillar] },
    }));
  };

  const removePillar = (type, index) => {
    setData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        pillars: prev[type].pillars.filter((_, i) => i !== index),
      },
    }));
  };

  const handleFounderChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      founderStrip: { ...prev.founderStrip, [field]: value },
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
            Strategic Vision, Mission & Founder Strip
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            Configure both intermodal container manifest vaults, strategic action pillars, and the founder anchor quote strip.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSave('visionMission', data)}
          disabled={isSaving}
          className="btn-primary"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>{isSaving ? 'Saving to Atlas...' : 'Save Vision & Mission'}</span>
        </button>
      </div>

      {/* Top Level Section Headers */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
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
      </div>

      <div className="form-group" style={{ marginBottom: '24px' }}>
        <label className="form-label">Section Subtitle</label>
        <textarea
          className="input-field"
          rows={2}
          value={data.subtitle || ''}
          onChange={(e) => handleFieldChange('subtitle', e.target.value)}
        />
      </div>

      {/* Internal Navigation Tabs: Mission | Vision | Founder Strip */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1.5px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '24px' }}>
        <button
          type="button"
          onClick={() => setActiveTab('mission')}
          className="btn-secondary"
          style={{
            background: activeTab === 'mission' ? 'var(--navy-primary)' : '#ffffff',
            color: activeTab === 'mission' ? '#ffffff' : 'var(--navy-primary)',
            borderColor: activeTab === 'mission' ? 'var(--navy-primary)' : 'var(--border-subtle)',
            fontSize: '0.84rem',
            padding: '8px 16px',
          }}
        >
          <Target size={15} color={activeTab === 'mission' ? 'var(--gold-primary)' : 'currentColor'} />
          <span>Mission Container Vault</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('vision')}
          className="btn-secondary"
          style={{
            background: activeTab === 'vision' ? 'var(--navy-primary)' : '#ffffff',
            color: activeTab === 'vision' ? '#ffffff' : 'var(--navy-primary)',
            borderColor: activeTab === 'vision' ? 'var(--navy-primary)' : 'var(--border-subtle)',
            fontSize: '0.84rem',
            padding: '8px 16px',
          }}
        >
          <Eye size={15} color={activeTab === 'vision' ? 'var(--gold-primary)' : 'currentColor'} />
          <span>Vision Container Vault</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('founder')}
          className="btn-secondary"
          style={{
            background: activeTab === 'founder' ? 'var(--navy-primary)' : '#ffffff',
            color: activeTab === 'founder' ? '#ffffff' : 'var(--navy-primary)',
            borderColor: activeTab === 'founder' ? 'var(--navy-primary)' : 'var(--border-subtle)',
            fontSize: '0.84rem',
            padding: '8px 16px',
          }}
        >
          <UserCheck size={15} color={activeTab === 'founder' ? 'var(--gold-primary)' : 'currentColor'} />
          <span>Founder Anchor Strip</span>
        </button>
      </div>

      {/* ================= TAB 1: MISSION CONTAINER ================= */}
      {activeTab === 'mission' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Manifest Doc ID</label>
              <input
                type="text"
                className="input-field"
                value={data.mission?.docId || ''}
                onChange={(e) => handleContainerChange('mission', 'docId', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Barcode Serial</label>
              <input
                type="text"
                className="input-field"
                value={data.mission?.barcodeText || ''}
                onChange={(e) => handleContainerChange('mission', 'barcodeText', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Badge Tag</label>
              <input
                type="text"
                className="input-field"
                value={data.mission?.badge || ''}
                onChange={(e) => handleContainerChange('mission', 'badge', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Lock Seal Label</label>
              <input
                type="text"
                className="input-field"
                value={data.mission?.seal || ''}
                onChange={(e) => handleContainerChange('mission', 'seal', e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Main Heading</label>
              <input
                type="text"
                className="input-field"
                value={data.mission?.title || ''}
                onChange={(e) => handleContainerChange('mission', 'title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Tagline</label>
              <input
                type="text"
                className="input-field"
                value={data.mission?.tagline || ''}
                onChange={(e) => handleContainerChange('mission', 'tagline', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Official Brochure Mission Paragraph</label>
            <textarea
              className="input-field"
              rows={3}
              value={data.mission?.paragraph || ''}
              onChange={(e) => handleContainerChange('mission', 'paragraph', e.target.value)}
            />
          </div>

          {/* Mission Specs */}
          <div style={{ padding: '14px', borderRadius: '10px', background: '#f8fafc', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--navy-primary)', textTransform: 'uppercase' }}>
              Mission Technical Specs
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '8px' }}>
              <div className="form-group">
                <label className="form-label">Max Payload</label>
                <input
                  type="text"
                  className="input-field"
                  value={data.mission?.specs?.payload || ''}
                  onChange={(e) => handleSpecChange('mission', 'payload', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Corridors</label>
                <input
                  type="text"
                  className="input-field"
                  value={data.mission?.specs?.corridors || ''}
                  onChange={(e) => handleSpecChange('mission', 'corridors', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Compliance</label>
                <input
                  type="text"
                  className="input-field"
                  value={data.mission?.specs?.compliance || ''}
                  onChange={(e) => handleSpecChange('mission', 'compliance', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Mission Pillars */}
          <div style={{ padding: '16px', borderRadius: '12px', background: '#f8fafc', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--navy-primary)', margin: 0 }}>
                Mission Action Pillars ({data.mission?.pillars?.length || 0})
              </h4>
              <button
                type="button"
                onClick={() => addPillar('mission')}
                className="btn-secondary"
                style={{ fontSize: '0.78rem', padding: '6px 10px' }}
              >
                <Plus size={13} />
                <span>Add Pillar</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.mission?.pillars?.map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    background: '#ffffff',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--gold-primary)' }}>
                      Pillar #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removePillar('mission', idx)}
                      className="btn-danger"
                      style={{ padding: '3px 7px', fontSize: '0.72rem' }}
                    >
                      <Trash2 size={11} />
                      <span>Delete</span>
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '10px' }}>
                    <div className="form-group">
                      <label className="form-label">Pillar Title</label>
                      <input
                        type="text"
                        className="input-field"
                        value={p.title || ''}
                        onChange={(e) => handlePillarChange('mission', idx, 'title', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Icon</label>
                      <select
                        className="input-field"
                        value={p.icon || 'Leaf'}
                        onChange={(e) => handlePillarChange('mission', idx, 'icon', e.target.value)}
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
                      rows={2}
                      value={p.desc || ''}
                      onChange={(e) => handlePillarChange('mission', idx, 'desc', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: VISION CONTAINER ================= */}
      {activeTab === 'vision' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Manifest Doc ID</label>
              <input
                type="text"
                className="input-field"
                value={data.vision?.docId || ''}
                onChange={(e) => handleContainerChange('vision', 'docId', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Barcode Serial</label>
              <input
                type="text"
                className="input-field"
                value={data.vision?.barcodeText || ''}
                onChange={(e) => handleContainerChange('vision', 'barcodeText', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Badge Tag</label>
              <input
                type="text"
                className="input-field"
                value={data.vision?.badge || ''}
                onChange={(e) => handleContainerChange('vision', 'badge', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Lock Seal Label</label>
              <input
                type="text"
                className="input-field"
                value={data.vision?.seal || ''}
                onChange={(e) => handleContainerChange('vision', 'seal', e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Main Heading</label>
              <input
                type="text"
                className="input-field"
                value={data.vision?.title || ''}
                onChange={(e) => handleContainerChange('vision', 'title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Tagline</label>
              <input
                type="text"
                className="input-field"
                value={data.vision?.tagline || ''}
                onChange={(e) => handleContainerChange('vision', 'tagline', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Official Brochure Vision Paragraph</label>
            <textarea
              className="input-field"
              rows={3}
              value={data.vision?.paragraph || ''}
              onChange={(e) => handleContainerChange('vision', 'paragraph', e.target.value)}
            />
          </div>

          {/* Vision Specs */}
          <div style={{ padding: '14px', borderRadius: '10px', background: '#f8fafc', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--navy-primary)', textTransform: 'uppercase' }}>
              Vision Horizon Specs
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '8px' }}>
              <div className="form-group">
                <label className="form-label">Target Horizon</label>
                <input
                  type="text"
                  className="input-field"
                  value={data.vision?.specs?.horizon || ''}
                  onChange={(e) => handleSpecChange('vision', 'horizon', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Active Fleet</label>
                <input
                  type="text"
                  className="input-field"
                  value={data.vision?.specs?.activeFleet || ''}
                  onChange={(e) => handleSpecChange('vision', 'activeFleet', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Reliability Track</label>
                <input
                  type="text"
                  className="input-field"
                  value={data.vision?.specs?.reliability || ''}
                  onChange={(e) => handleSpecChange('vision', 'reliability', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Vision Pillars */}
          <div style={{ padding: '16px', borderRadius: '12px', background: '#f8fafc', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--navy-primary)', margin: 0 }}>
                Vision Strategic Pillars ({data.vision?.pillars?.length || 0})
              </h4>
              <button
                type="button"
                onClick={() => addPillar('vision')}
                className="btn-secondary"
                style={{ fontSize: '0.78rem', padding: '6px 10px' }}
              >
                <Plus size={13} />
                <span>Add Pillar</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.vision?.pillars?.map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    background: '#ffffff',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--gold-primary)' }}>
                      Pillar #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removePillar('vision', idx)}
                      className="btn-danger"
                      style={{ padding: '3px 7px', fontSize: '0.72rem' }}
                    >
                      <Trash2 size={11} />
                      <span>Delete</span>
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '10px' }}>
                    <div className="form-group">
                      <label className="form-label">Pillar Title</label>
                      <input
                        type="text"
                        className="input-field"
                        value={p.title || ''}
                        onChange={(e) => handlePillarChange('vision', idx, 'title', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Icon</label>
                      <select
                        className="input-field"
                        value={p.icon || 'Award'}
                        onChange={(e) => handlePillarChange('vision', idx, 'icon', e.target.value)}
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
                      rows={2}
                      value={p.desc || ''}
                      onChange={(e) => handlePillarChange('vision', idx, 'desc', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: FOUNDER ANCHOR STRIP ================= */}
      {activeTab === 'founder' && (
        <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '24px' }}>
          {/* Avatar Photo */}
          <div>
            <div className="form-group">
              <label className="form-label">Founder Portrait Photo</label>
              <ImageUploader
                value={data.founderStrip?.avatar || ''}
                onChange={(url) => handleFounderChange('avatar', url)}
              />
            </div>
            <div className="form-group" style={{ marginTop: '12px' }}>
              <label className="form-label">Founder Badge Label</label>
              <input
                type="text"
                className="input-field"
                value={data.founderStrip?.badge || ''}
                onChange={(e) => handleFounderChange('badge', e.target.value)}
              />
            </div>
          </div>

          {/* Details & Quote */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Founder Full Name</label>
              <input
                type="text"
                className="input-field"
                value={data.founderStrip?.name || ''}
                onChange={(e) => handleFounderChange('name', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Founder Role & Designation</label>
              <input
                type="text"
                className="input-field"
                value={data.founderStrip?.role || ''}
                onChange={(e) => handleFounderChange('role', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Anchor Quote</label>
              <textarea
                className="input-field"
                rows={4}
                value={data.founderStrip?.quote || ''}
                onChange={(e) => handleFounderChange('quote', e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Action Button Text</label>
                <input
                  type="text"
                  className="input-field"
                  value={data.founderStrip?.btnText || ''}
                  onChange={(e) => handleFounderChange('btnText', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Action Button Link</label>
                <input
                  type="text"
                  className="input-field"
                  value={data.founderStrip?.btnLink || ''}
                  onChange={(e) => handleFounderChange('btnLink', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

