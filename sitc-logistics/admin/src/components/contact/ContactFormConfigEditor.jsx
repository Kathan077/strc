import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Loader2, Sparkles, X, FileText } from 'lucide-react';

export default function ContactFormConfigEditor({ initialData, onSave, isSaving }) {
  const [data, setData] = useState(
    initialData || {
      terminalUnit: 'SRTC-45G1-HC',
      maxGvw: '49,000 KG',
      fleetRating: 'IBA APPROVED',
      customsStatus: '100% e-WAY SYNC',
      servicesList: [
        '40ft High-Cube Container',
        '20ft Intermodal Container',
        'Full Truckload (FTL) Freight',
        'Over-Dimensional Cargo (ODC)',
        'Port to CFS Drayage',
        'General Inquiry / Rate Advisory',
      ],
      submitBtnText: 'GENERATE INSTANT DISPATCH MANIFEST',
    }
  );

  const [newServiceInput, setNewServiceInput] = useState('');

  useEffect(() => {
    if (initialData) setData(initialData);
  }, [initialData]);

  const handleFieldChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const addService = () => {
    if (!newServiceInput.trim()) return;
    if (data.servicesList.includes(newServiceInput.trim())) return;
    setData((prev) => ({ ...prev, servicesList: [...prev.servicesList, newServiceInput.trim()] }));
    setNewServiceInput('');
  };

  const removeService = (service) => {
    setData((prev) => ({
      ...prev,
      servicesList: prev.servicesList.filter((s) => s !== service),
    }));
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
            Booking Form & CSC Plate Configuration
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            Configure the CSC Safety Approval Plate technical ratings, dropdown service options, and submission button text.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSave('bookingFormConfig', data)}
          disabled={isSaving}
          className="btn-primary"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>{isSaving ? 'Saving to Atlas...' : 'Save Form Settings'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '26px' }}>
        {/* Left Column: CSC Metal Data Plate Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--navy-primary)' }}>
            1. CSC Safety Approval Data Plate
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Terminal Unit Code</label>
              <input
                type="text"
                className="input-field"
                value={data.terminalUnit || ''}
                onChange={(e) => handleFieldChange('terminalUnit', e.target.value)}
                placeholder="SRTC-45G1-HC"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Max Highway GVW</label>
              <input
                type="text"
                className="input-field"
                value={data.maxGvw || ''}
                onChange={(e) => handleFieldChange('maxGvw', e.target.value)}
                placeholder="49,000 KG"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Fleet Compliance Rating</label>
              <input
                type="text"
                className="input-field"
                value={data.fleetRating || ''}
                onChange={(e) => handleFieldChange('fleetRating', e.target.value)}
                placeholder="IBA APPROVED"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Customs & Portal Sync</label>
              <input
                type="text"
                className="input-field"
                value={data.customsStatus || ''}
                onChange={(e) => handleFieldChange('customsStatus', e.target.value)}
                placeholder="100% e-WAY SYNC"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '8px' }}>
            <label className="form-label">Form Submit CTA Button Text</label>
            <input
              type="text"
              className="input-field"
              value={data.submitBtnText || ''}
              onChange={(e) => handleFieldChange('submitBtnText', e.target.value)}
              placeholder="GENERATE INSTANT DISPATCH MANIFEST"
            />
          </div>

          {/* CSC Plate Live Preview */}
          <div
            style={{
              padding: '16px',
              borderRadius: '10px',
              background: '#071f33',
              border: '1.5px solid var(--gold-primary)',
              color: '#ffffff',
              marginTop: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(232, 185, 79, 0.4)', paddingBottom: '6px', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--gold-primary)' }}>CSC SAFETY APPROVAL</span>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>IND/SRTC/DISPATCH-2026</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.78rem' }}>
              <div>
                <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>TERMINAL: </span>
                <strong>{data.terminalUnit}</strong>
              </div>
              <div>
                <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>MAX GVW: </span>
                <strong>{data.maxGvw}</strong>
              </div>
              <div>
                <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>RATING: </span>
                <strong>{data.fleetRating}</strong>
              </div>
              <div>
                <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>CUSTOMS: </span>
                <strong>{data.customsStatus}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Service Types Dropdown Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--navy-primary)' }}>
            2. Booking Dropdown Service Options ({data.servicesList?.length || 0})
          </h3>

          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              className="input-field"
              placeholder="Add service option (e.g. 40ft High-Cube Container)..."
              value={newServiceInput}
              onChange={(e) => setNewServiceInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addService();
                }
              }}
            />
            <button
              type="button"
              onClick={addService}
              className="btn-secondary"
              style={{ flexShrink: 0, padding: '0 16px' }}
            >
              <Plus size={14} />
              <span>Add</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.servicesList?.map((svc, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: '#f8fafc',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--gold-primary)' }}>
                    #{idx + 1}
                  </span>
                  <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--navy-primary)' }}>
                    {svc}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeService(svc)}
                  className="btn-danger"
                  style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                >
                  <Trash2 size={12} />
                  <span>Remove</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

