import React, { useState } from 'react';
import { Save, Plus, Trash2, Loader2, Sparkles, Phone, Send, Mail, MapPin, X } from 'lucide-react';

export default function ContactVaultsEditor({ initialData, onSave, isSaving }) {
  const [phoneData, setPhoneData] = useState(
    initialData?.vaultPhone || {
      unitCode: 'SRTC-LINE-01',
      tag: 'VOICE CONTROL',
      kicker: '24/7 CENTRAL DISPATCH HOTLINE',
      phone: '+91 9426646095',
      description:
        'Speak directly with our heavy linehaul controllers. Instant rate quote and vehicle dispatch across 180+ express corridors.',
      ctaText: 'CALL DISPATCH DESK NOW',
      ctaLink: 'tel:+919426646095',
    }
  );

  const [waData, setWaData] = useState(
    initialData?.vaultWhatsApp || {
      unitCode: 'SRTC-LINE-02',
      tag: 'WHATSAPP CHAT',
      kicker: 'INSTANT WHATSAPP FREIGHT DESK',
      phone: '+91 9426646095',
      description:
        'Send pickup/drop pincodes and container requirements. Receive corridor tariffs, transit SLA, and vehicle allocation in minutes.',
      ctaText: 'CHAT ON WHATSAPP DISPATCH',
      waLink:
        'https://wa.me/919426646095?text=Hello%20SRTC%20Logistics%2C%20I%20need%20a%20freight%20quote%20for%20my%20shipment.',
    }
  );

  const [emailData, setEmailData] = useState(
    initialData?.vaultEmail || {
      unitCode: 'SRTC-HQ-03',
      tag: 'EDI & CORPORATE HQ',
      kicker: 'ENTERPRISE EDI & INQUIRIES',
      email: 'srtcpvtltd09@gmail.com',
      hqAddress:
        'Gujarat, India (Multimodal Hubs across Porbandar, Ahmedabad, Mundra & Mumbai)',
      operationsHours: '24 Hours • 365 Days Non-Stop Dispatch Coverage',
    }
  );

  const [hubsData, setHubsData] = useState(
    initialData?.vaultHubs || {
      unitCode: 'SRTC-YARD-04',
      tag: 'PORT & TRANSIT YARDS',
      kicker: 'KEY PAN-INDIA CORRIDOR HUBS',
      title: 'Strategic Gateway Terminals',
      hubsList: [
        'Mundra & Kandla Port',
        'Nhava Sheva (JNPT)',
        'Delhi-NCR Corridor',
        'Pune / Chakan Industrial',
        'Ahmedabad Logistics Hub',
        'Vapi / Surat Chemical Belt',
      ],
    }
  );

  const [newHubInput, setNewHubInput] = useState('');
  const [activeTab, setActiveTab] = useState('phone'); // 'phone' | 'whatsapp' | 'email' | 'hubs'

  const addHub = () => {
    if (!newHubInput.trim()) return;
    if (hubsData.hubsList.includes(newHubInput.trim())) return;
    setHubsData((prev) => ({ ...prev, hubsList: [...prev.hubsList, newHubInput.trim()] }));
    setNewHubInput('');
  };

  const removeHub = (hub) => {
    setHubsData((prev) => ({
      ...prev,
      hubsList: prev.hubsList.filter((h) => h !== hub),
    }));
  };

  const handleSaveAllVaults = () => {
    onSave('vaultPhone', phoneData);
    onSave('vaultWhatsApp', waData);
    onSave('vaultEmail', emailData);
    onSave('vaultHubs', hubsData);
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
            4 Dispatch Container Vaults (Hotline, WhatsApp, HQ, Hubs)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            Manage the direct voice hotline, WhatsApp freight desk, EDI corporate headquarters, and gateway port hubs.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveAllVaults}
          disabled={isSaving}
          className="btn-primary"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>{isSaving ? 'Saving to Atlas...' : 'Save All 4 Vaults'}</span>
        </button>
      </div>

      {/* Vault Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1.5px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '24px' }}>
        <button
          type="button"
          onClick={() => setActiveTab('phone')}
          className="btn-secondary"
          style={{
            background: activeTab === 'phone' ? 'var(--navy-primary)' : '#ffffff',
            color: activeTab === 'phone' ? '#ffffff' : 'var(--navy-primary)',
            borderColor: activeTab === 'phone' ? 'var(--navy-primary)' : 'var(--border-subtle)',
            fontSize: '0.84rem',
            padding: '8px 16px',
          }}
        >
          <Phone size={15} color={activeTab === 'phone' ? 'var(--gold-primary)' : 'currentColor'} />
          <span>Vault 1: 24/7 Hotline</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('whatsapp')}
          className="btn-secondary"
          style={{
            background: activeTab === 'whatsapp' ? 'var(--navy-primary)' : '#ffffff',
            color: activeTab === 'whatsapp' ? '#ffffff' : 'var(--navy-primary)',
            borderColor: activeTab === 'whatsapp' ? 'var(--navy-primary)' : 'var(--border-subtle)',
            fontSize: '0.84rem',
            padding: '8px 16px',
          }}
        >
          <Send size={15} color={activeTab === 'whatsapp' ? 'var(--gold-primary)' : 'currentColor'} />
          <span>Vault 2: WhatsApp Desk</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('email')}
          className="btn-secondary"
          style={{
            background: activeTab === 'email' ? 'var(--navy-primary)' : '#ffffff',
            color: activeTab === 'email' ? '#ffffff' : 'var(--navy-primary)',
            borderColor: activeTab === 'email' ? 'var(--navy-primary)' : 'var(--border-subtle)',
            fontSize: '0.84rem',
            padding: '8px 16px',
          }}
        >
          <Mail size={15} color={activeTab === 'email' ? 'var(--gold-primary)' : 'currentColor'} />
          <span>Vault 3: Corporate HQ</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hubs')}
          className="btn-secondary"
          style={{
            background: activeTab === 'hubs' ? 'var(--navy-primary)' : '#ffffff',
            color: activeTab === 'hubs' ? '#ffffff' : 'var(--navy-primary)',
            borderColor: activeTab === 'hubs' ? 'var(--navy-primary)' : 'var(--border-subtle)',
            fontSize: '0.84rem',
            padding: '8px 16px',
          }}
        >
          <MapPin size={15} color={activeTab === 'hubs' ? 'var(--gold-primary)' : 'currentColor'} />
          <span>Vault 4: Gateway Hubs</span>
        </button>
      </div>

      {/* ================= VAULT 1: 24/7 HOTLINE ================= */}
      {activeTab === 'phone' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Unit Code</label>
              <input
                type="text"
                className="input-field"
                value={phoneData.unitCode || ''}
                onChange={(e) => setPhoneData({ ...phoneData, unitCode: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Axle Tag</label>
              <input
                type="text"
                className="input-field"
                value={phoneData.tag || ''}
                onChange={(e) => setPhoneData({ ...phoneData, tag: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Micro-Kicker</label>
              <input
                type="text"
                className="input-field"
                value={phoneData.kicker || ''}
                onChange={(e) => setPhoneData({ ...phoneData, kicker: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Dispatch Phone Number</label>
              <input
                type="text"
                className="input-field"
                value={phoneData.phone || ''}
                onChange={(e) =>
                  setPhoneData({
                    ...phoneData,
                    phone: e.target.value,
                    ctaLink: `tel:${e.target.value.replace(/\s+/g, '')}`,
                  })
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="input-field"
              rows={3}
              value={phoneData.description || ''}
              onChange={(e) => setPhoneData({ ...phoneData, description: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">CTA Text</label>
              <input
                type="text"
                className="input-field"
                value={phoneData.ctaText || ''}
                onChange={(e) => setPhoneData({ ...phoneData, ctaText: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">CTA Link (tel:)</label>
              <input
                type="text"
                className="input-field"
                value={phoneData.ctaLink || ''}
                onChange={(e) => setPhoneData({ ...phoneData, ctaLink: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= VAULT 2: WHATSAPP FREIGHT DESK ================= */}
      {activeTab === 'whatsapp' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Unit Code</label>
              <input
                type="text"
                className="input-field"
                value={waData.unitCode || ''}
                onChange={(e) => setWaData({ ...waData, unitCode: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Axle Tag</label>
              <input
                type="text"
                className="input-field"
                value={waData.tag || ''}
                onChange={(e) => setWaData({ ...waData, tag: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Micro-Kicker</label>
              <input
                type="text"
                className="input-field"
                value={waData.kicker || ''}
                onChange={(e) => setWaData({ ...waData, kicker: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">WhatsApp Number Display</label>
              <input
                type="text"
                className="input-field"
                value={waData.phone || ''}
                onChange={(e) => setWaData({ ...waData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="input-field"
              rows={3}
              value={waData.description || ''}
              onChange={(e) => setWaData({ ...waData, description: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">WhatsApp Direct Link URL</label>
            <input
              type="text"
              className="input-field"
              value={waData.waLink || ''}
              onChange={(e) => setWaData({ ...waData, waLink: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">CTA Text</label>
            <input
              type="text"
              className="input-field"
              value={waData.ctaText || ''}
              onChange={(e) => setWaData({ ...waData, ctaText: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* ================= VAULT 3: CORPORATE HQ ================= */}
      {activeTab === 'email' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Unit Code</label>
              <input
                type="text"
                className="input-field"
                value={emailData.unitCode || ''}
                onChange={(e) => setEmailData({ ...emailData, unitCode: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Axle Tag</label>
              <input
                type="text"
                className="input-field"
                value={emailData.tag || ''}
                onChange={(e) => setEmailData({ ...emailData, tag: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Micro-Kicker</label>
              <input
                type="text"
                className="input-field"
                value={emailData.kicker || ''}
                onChange={(e) => setEmailData({ ...emailData, kicker: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Official Email Address</label>
              <input
                type="text"
                className="input-field"
                value={emailData.email || ''}
                onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Corporate Headquarters Address</label>
            <textarea
              className="input-field"
              rows={2}
              value={emailData.hqAddress || ''}
              onChange={(e) => setEmailData({ ...emailData, hqAddress: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Operating Hours Coverage</label>
            <input
              type="text"
              className="input-field"
              value={emailData.operationsHours || ''}
              onChange={(e) => setEmailData({ ...emailData, operationsHours: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* ================= VAULT 4: GATEWAY HUBS ================= */}
      {activeTab === 'hubs' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Unit Code</label>
              <input
                type="text"
                className="input-field"
                value={hubsData.unitCode || ''}
                onChange={(e) => setHubsData({ ...hubsData, unitCode: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Axle Tag</label>
              <input
                type="text"
                className="input-field"
                value={hubsData.tag || ''}
                onChange={(e) => setHubsData({ ...hubsData, tag: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Micro-Kicker</label>
              <input
                type="text"
                className="input-field"
                value={hubsData.kicker || ''}
                onChange={(e) => setHubsData({ ...hubsData, kicker: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Headline</label>
              <input
                type="text"
                className="input-field"
                value={hubsData.title || ''}
                onChange={(e) => setHubsData({ ...hubsData, title: e.target.value })}
              />
            </div>
          </div>

          {/* Hub Chips */}
          <div style={{ padding: '16px', borderRadius: '12px', background: '#f8fafc', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--navy-primary)', textTransform: 'uppercase' }}>
              Gateway Terminals & Port Yards ({hubsData.hubsList?.length || 0})
            </span>

            <div style={{ display: 'flex', gap: '8px', marginTop: '10px', marginBottom: '14px' }}>
              <input
                type="text"
                className="input-field"
                placeholder="Type new hub name (e.g. Mundra & Kandla Port)..."
                value={newHubInput}
                onChange={(e) => setNewHubInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addHub();
                  }
                }}
              />
              <button
                type="button"
                onClick={addHub}
                className="btn-secondary"
                style={{ flexShrink: 0, padding: '0 16px' }}
              >
                <Plus size={14} />
                <span>Add Hub</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {hubsData.hubsList?.map((hub, idx) => (
                <span
                  key={idx}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: '#ffffff',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--navy-primary)',
                  }}
                >
                  <span>{hub}</span>
                  <button
                    type="button"
                    onClick={() => removeHub(hub)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#94a3b8',
                      padding: 0,
                      display: 'flex',
                    }}
                    title="Remove Hub"
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

