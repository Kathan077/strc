import React, { useState } from 'react';
import { Save, Loader2, Phone, Mail, FileText } from 'lucide-react';

export default function CtaEditor({ initialData, onSave, isSaving }) {
  const [data, setData] = useState(
    initialData || {
      statusText: '',
      buttonText: '',
      buttonLink: '',
      contactInfo: { phone: '', email: '', tagline: '' },
    }
  );

  const handleFieldChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleContactChange = (field, value) => {
    setData({
      ...data,
      contactInfo: { ...data.contactInfo, [field]: value },
    });
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
            Highway Truck CTA & Dispatch Footer Callout
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Configure live corridor convoy broadcast message, dispatch hotline, email desk, and primary booking button.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onSave('truckContactCTA', data)}
          disabled={isSaving}
          className="btn-gold"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>Save CTA Section</span>
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label className="input-label">Highway Broadcast Status Bar Text</label>
        <input
          type="text"
          value={data.statusText || ''}
          onChange={(e) => handleFieldChange('statusText', e.target.value)}
          className="input-field"
          placeholder="HIGHWAY DISPATCH DESK ACTIVE - 24/7 DEDICATED LINEHAUL SUPPORT"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '26px' }}>
        <div>
          <label className="input-label">CTA Button Text</label>
          <input
            type="text"
            value={data.buttonText || ''}
            onChange={(e) => handleFieldChange('buttonText', e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="input-label">CTA Button Link</label>
          <input
            type="text"
            value={data.buttonLink || ''}
            onChange={(e) => handleFieldChange('buttonLink', e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      {/* Central Dispatch Contact Desk */}
      <div
        style={{
          background: '#f8fafc',
          border: '1.5px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '22px',
        }}
      >
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy-primary)', marginBottom: '18px' }}>
          Central Dispatch Desk Info
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
          <div>
            <label className="input-label">
              <Phone size={13} style={{ display: 'inline', marginRight: '6px' }} color="var(--gold-primary)" />
              Dispatch Phone Hotline
            </label>
            <input
              type="text"
              value={data.contactInfo?.phone || ''}
              onChange={(e) => handleContactChange('phone', e.target.value)}
              className="input-field"
              placeholder="+91 98251 64095"
            />
          </div>
          <div>
            <label className="input-label">
              <Mail size={13} style={{ display: 'inline', marginRight: '6px' }} color="var(--gold-primary)" />
              Dispatch Email Desk
            </label>
            <input
              type="email"
              value={data.contactInfo?.email || ''}
              onChange={(e) => handleContactChange('email', e.target.value)}
              className="input-field"
              placeholder="dispatch@srtclogistics.com"
            />
          </div>
        </div>

        <div>
          <label className="input-label">Dispatch Desk Tagline / SLA Note</label>
          <input
            type="text"
            value={data.contactInfo?.tagline || ''}
            onChange={(e) => handleContactChange('tagline', e.target.value)}
            className="input-field"
            placeholder="Enterprise logistics contracts and scheduled linehaul inquiries answered within 15 minutes."
          />
        </div>
      </div>
    </div>
  );
}
