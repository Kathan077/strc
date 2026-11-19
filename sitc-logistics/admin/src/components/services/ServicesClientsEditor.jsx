import React, { useState } from 'react';
import {
  Save,
  Plus,
  Trash2,
  Loader2,
  Truck,
  ArrowRight,
  ArrowLeft,
  Building2,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import ImageUploader from '../ImageUploader';

export default function ServicesClientsEditor({ initialData, onSave, isSaving }) {
  const [data, setData] = useState(() => ({
    kicker: initialData?.kicker || 'PDF BROCHURE: OUR TOP CLIENTS',
    title: initialData?.title || 'Pan-India Highway Conveyor: Trusted By Industrial Giants',
    subtitle:
      initialData?.subtitle ||
      'SRTC’s compact commercial linehaul fleet in continuous motion across National Highways. Dedicated container trucks transporting petrochemicals, polymers, agro commodities, and heavy industrial freight.',
    stats: initialData?.stats || [
      { num: '23+', lbl: 'Years Industry Legacy' },
      { num: '100%', lbl: 'Insured Cargo Transit' },
      { num: '840+', lbl: 'Commercial Linehaul Fleet' },
      { num: '99.8%', lbl: 'On-Time SLA Delivery' },
    ],
    laneEast: initialData?.laneEast || [],
    laneWest: initialData?.laneWest || [],
  }));

  const [activeLaneTab, setActiveLaneTab] = useState('east'); // 'east' (Lane 1) or 'west' (Lane 2)

  const handleFieldChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStatChange = (index, field, value) => {
    setData((prev) => {
      const newStats = [...prev.stats];
      newStats[index] = { ...newStats[index], [field]: value };
      return { ...prev, stats: newStats };
    });
  };

  const handleTruckChange = (laneKey, index, field, value) => {
    setData((prev) => {
      const newLane = [...prev[laneKey]];
      newLane[index] = { ...newLane[index], [field]: value };
      return { ...prev, [laneKey]: newLane };
    });
  };

  const addTruck = (laneKey) => {
    const isEast = laneKey === 'laneEast';
    const newTruck = {
      id: `client-${Date.now()}`,
      name: 'New Corporate Partner Ltd',
      displayName: 'New Partner',
      logo: '',
      primaryColor: isEast ? '#003366' : '#154284',
      accentColor: '#E8B94F',
      truckModel: isEast ? 'Volvo FM 420 Cute Express' : 'Tata Ultra T.16 High Cube',
      trailerType: isEast ? '28ft Express Container' : '24ft Weatherproof Container',
      cargoType: 'Industrial Heavy Freight & Commodities',
      corridor: 'Ahmedabad HQ ➔ National Highway Corridors',
      verifiedSince: '2020',
      slaScore: '99.8%',
    };

    setData((prev) => ({
      ...prev,
      [laneKey]: [...prev[laneKey], newTruck],
    }));
  };

  const removeTruck = (laneKey, index) => {
    const truck = data[laneKey][index];
    const clientName = truck?.displayName || truck?.name || 'this client truck';
    if (confirm(`Are you sure you want to remove "${clientName}" from this highway lane?`)) {
      setData((prev) => ({
        ...prev,
        [laneKey]: prev[laneKey].filter((_, i) => i !== index),
      }));
    }
  };

  const activeLaneKey = activeLaneTab === 'east' ? 'laneEast' : 'laneWest';
  const activeTrucks = data[activeLaneKey] || [];

  return (
    <div className="card-box animate-fade-in">
      {/* Top Header & Save Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '20px',
          marginBottom: '26px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                background: 'rgba(232, 185, 79, 0.15)',
                color: 'var(--navy-primary)',
                border: '1px solid var(--gold-border)',
                fontWeight: 800,
                fontSize: '0.72rem',
                padding: '3px 10px',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              SECTION 05 • HIGHWAY FLEET
            </span>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy-primary)', margin: 0 }}>
              Highway Client Trucks & Moving Container Fleet
            </h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px', margin: 0 }}>
            Manage the dual-lane moving semi-trucks, upload authentic client logos, configure company display names, and customize highway telemetry cards.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="button"
            onClick={() => addTruck(activeLaneKey)}
            className="btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={16} color="var(--gold-primary)" />
            <span>Add Client Truck to {activeLaneTab === 'east' ? 'Lane 1' : 'Lane 2'}</span>
          </button>

          <button
            type="button"
            onClick={() => onSave('trustClients', data)}
            disabled={isSaving}
            className="btn-gold"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            <span>Save Client Fleet</span>
          </button>
        </div>
      </div>

      {/* 1. Section Header Details Card */}
      <div
        style={{
          background: '#ffffff',
          border: '1.5px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(11, 47, 74, 0.04)',
        }}
      >
        <h3
          style={{
            fontSize: '0.98rem',
            fontWeight: 800,
            color: 'var(--navy-primary)',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Building2 size={16} color="var(--gold-primary)" />
          <span>Section Headings & Descriptions</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label className="input-label">Kicker Badge</label>
            <input
              type="text"
              value={data.kicker || ''}
              onChange={(e) => handleFieldChange('kicker', e.target.value)}
              className="input-field"
              placeholder="e.g. PDF BROCHURE: OUR TOP CLIENTS"
            />
          </div>

          <div>
            <label className="input-label">Main Section Title</label>
            <input
              type="text"
              value={data.title || ''}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              className="input-field"
              placeholder="e.g. Pan-India Highway Conveyor: Trusted By Industrial Giants"
            />
          </div>
        </div>

        <div>
          <label className="input-label">Subtitle Description</label>
          <textarea
            rows={2}
            value={data.subtitle || ''}
            onChange={(e) => handleFieldChange('subtitle', e.target.value)}
            className="input-field"
            placeholder="Description explaining SRTC's dedicated linehaul fleet for corporate clients..."
          />
        </div>
      </div>

      {/* 2. Dual Highway Lane Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          borderBottom: '2px solid var(--border-subtle)',
          paddingBottom: '2px',
          marginBottom: '20px',
        }}
      >
        <button
          type="button"
          onClick={() => setActiveLaneTab('east')}
          style={{
            padding: '10px 18px',
            fontSize: '0.88rem',
            fontWeight: 800,
            borderRadius: '8px 8px 0 0',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: activeLaneTab === 'east' ? 'var(--navy-primary)' : 'transparent',
            color: activeLaneTab === 'east' ? 'var(--gold-primary)' : 'var(--text-muted)',
            transition: 'all 0.2s ease',
          }}
        >
          <ArrowRight size={15} />
          <span>Lane 1: Eastbound Highway (Top Lane)</span>
          <span
            style={{
              background: activeLaneTab === 'east' ? 'rgba(232, 185, 79, 0.25)' : 'rgba(15, 23, 42, 0.08)',
              color: activeLaneTab === 'east' ? '#ffffff' : 'var(--navy-primary)',
              fontSize: '0.74rem',
              padding: '2px 8px',
              borderRadius: '999px',
              fontWeight: 800,
            }}
          >
            {data.laneEast?.length || 0} Trucks
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveLaneTab('west')}
          style={{
            padding: '10px 18px',
            fontSize: '0.88rem',
            fontWeight: 800,
            borderRadius: '8px 8px 0 0',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: activeLaneTab === 'west' ? 'var(--navy-primary)' : 'transparent',
            color: activeLaneTab === 'west' ? 'var(--gold-primary)' : 'var(--text-muted)',
            transition: 'all 0.2s ease',
          }}
        >
          <ArrowLeft size={15} />
          <span>Lane 2: Westbound Highway (Bottom Lane)</span>
          <span
            style={{
              background: activeLaneTab === 'west' ? 'rgba(232, 185, 79, 0.25)' : 'rgba(15, 23, 42, 0.08)',
              color: activeLaneTab === 'west' ? '#ffffff' : 'var(--navy-primary)',
              fontSize: '0.74rem',
              padding: '2px 8px',
              borderRadius: '999px',
              fontWeight: 800,
            }}
          >
            {data.laneWest?.length || 0} Trucks
          </span>
        </button>
      </div>

      {/* 3. Client Trucks List */}
      <div style={{ marginBottom: '28px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy-primary)', margin: 0 }}>
            {activeLaneTab === 'east' ? 'Eastbound (Left-to-Right)' : 'Westbound (Right-to-Left)'} Client Trucks ({activeTrucks.length})
          </h3>
          <button
            type="button"
            onClick={() => addTruck(activeLaneKey)}
            className="btn-secondary"
            style={{ fontSize: '0.82rem', padding: '6px 14px' }}
          >
            <Plus size={14} color="var(--gold-primary)" />
            <span>Add Truck to this Lane</span>
          </button>
        </div>

        {activeTrucks.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '40px 20px',
              background: '#f8fafc',
              border: '1.5px dashed var(--border-subtle)',
              borderRadius: '12px',
              color: 'var(--text-muted)',
            }}
          >
            <Truck size={36} style={{ margin: '0 auto 10px', opacity: 0.4 }} />
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>No client trucks in this lane yet</div>
            <p style={{ fontSize: '0.82rem', marginTop: '4px' }}>Click "Add Client Truck" above to add your first commercial client truck.</p>
          </div>
        ) : (
          activeTrucks.map((truck, tIndex) => (
            <div
              key={truck.id || `truck-${tIndex}`}
              style={{
                background: '#ffffff',
                border: '1.5px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '18px',
                boxShadow: '0 2px 8px rgba(11, 47, 74, 0.04)',
              }}
            >
              {/* Truck Header Row */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px dashed var(--border-subtle)',
                  paddingBottom: '12px',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      background: 'rgba(7, 85, 122, 0.1)',
                      color: 'var(--navy-light)',
                      border: '1px solid rgba(7, 85, 122, 0.25)',
                      fontWeight: 800,
                      fontSize: '0.76rem',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    TRUCK 0{tIndex + 1}
                  </span>
                  <strong style={{ fontSize: '1.02rem', color: 'var(--navy-primary)' }}>
                    {truck.displayName || truck.name || 'Unnamed Client'}
                  </strong>
                  {truck.primaryColor && (
                    <span
                      style={{
                        display: 'inline-block',
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        backgroundColor: truck.primaryColor,
                        border: '1px solid rgba(0,0,0,0.15)',
                      }}
                      title={`Brand color: ${truck.primaryColor}`}
                    />
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeTruck(activeLaneKey, tIndex)}
                  className="btn-danger"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px' }}
                >
                  <Trash2 size={14} />
                  <span>Delete Truck</span>
                </button>
              </div>

              {/* Truck Logo Uploader (Real time preview on container) */}
              <div style={{ marginBottom: '16px' }}>
                <ImageUploader
                  label="Client Brand Logo (PNG, JPG, SVG with transparent/white background)"
                  value={truck.logo}
                  onChange={(val) => handleTruckChange(activeLaneKey, tIndex, 'logo', val)}
                  placeholder="e.g. /images/clients/real/reliance.png or Cloudinary URL"
                />
              </div>

              {/* Company & Display Name Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '16px',
                  marginBottom: '16px',
                }}
              >
                <div>
                  <label className="input-label">Full Official Company Name</label>
                  <input
                    type="text"
                    value={truck.name || ''}
                    onChange={(e) => handleTruckChange(activeLaneKey, tIndex, 'name', e.target.value)}
                    className="input-field"
                    placeholder="e.g. Reliance Industries Limited"
                  />
                </div>

                <div>
                  <label className="input-label">Short Display Name (Visible on Truck Container)</label>
                  <input
                    type="text"
                    value={truck.displayName || ''}
                    onChange={(e) => handleTruckChange(activeLaneKey, tIndex, 'displayName', e.target.value)}
                    className="input-field"
                    placeholder="e.g. Reliance Industries"
                  />
                </div>

                <div>
                  <label className="input-label">Container Border Color (Hex Code)</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={truck.primaryColor || '#003366'}
                      onChange={(e) => handleTruckChange(activeLaneKey, tIndex, 'primaryColor', e.target.value)}
                      style={{
                        width: '38px',
                        height: '38px',
                        padding: '2px',
                        borderRadius: '6px',
                        border: '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                      }}
                    />
                    <input
                      type="text"
                      value={truck.primaryColor || '#003366'}
                      onChange={(e) => handleTruckChange(activeLaneKey, tIndex, 'primaryColor', e.target.value)}
                      className="input-field"
                      placeholder="#003366"
                    />
                  </div>
                </div>
              </div>

              {/* Telematics & Technical Details Grid (Shown when clicking truck) */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '16px',
                }}
              >
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--navy-primary)', marginBottom: '12px' }}>
                  Technical Telematics Specification (Displayed when clicking this truck)
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '14px',
                    marginBottom: '14px',
                  }}
                >
                  <div>
                    <label className="input-label">Truck Cab Model</label>
                    <input
                      type="text"
                      value={truck.truckModel || ''}
                      onChange={(e) => handleTruckChange(activeLaneKey, tIndex, 'truckModel', e.target.value)}
                      className="input-field"
                      placeholder="e.g. Volvo FM 420 Cute Express"
                    />
                  </div>

                  <div>
                    <label className="input-label">Trailer Container Type</label>
                    <input
                      type="text"
                      value={truck.trailerType || ''}
                      onChange={(e) => handleTruckChange(activeLaneKey, tIndex, 'trailerType', e.target.value)}
                      className="input-field"
                      placeholder="e.g. 28ft Express Container"
                    />
                  </div>

                  <div>
                    <label className="input-label">Cargo Manifest Type</label>
                    <input
                      type="text"
                      value={truck.cargoType || ''}
                      onChange={(e) => handleTruckChange(activeLaneKey, tIndex, 'cargoType', e.target.value)}
                      className="input-field"
                      placeholder="e.g. Polymer Pellets & Petrochemical Freight"
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '14px',
                  }}
                >
                  <div>
                    <label className="input-label">Active Route Corridor</label>
                    <input
                      type="text"
                      value={truck.corridor || ''}
                      onChange={(e) => handleTruckChange(activeLaneKey, tIndex, 'corridor', e.target.value)}
                      className="input-field"
                      placeholder="e.g. Jamnagar Petrochem Belt ➔ Hazira Port"
                    />
                  </div>

                  <div>
                    <label className="input-label">Verified Client Since Year</label>
                    <input
                      type="text"
                      value={truck.verifiedSince || ''}
                      onChange={(e) => handleTruckChange(activeLaneKey, tIndex, 'verifiedSince', e.target.value)}
                      className="input-field"
                      placeholder="e.g. 2008"
                    />
                  </div>

                  <div>
                    <label className="input-label">Guaranteed SLA Delivery Score</label>
                    <input
                      type="text"
                      value={truck.slaScore || ''}
                      onChange={(e) => handleTruckChange(activeLaneKey, tIndex, 'slaScore', e.target.value)}
                      className="input-field"
                      placeholder="e.g. 99.9%"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 4. KPI Stats Bar Section */}
      <div
        style={{
          background: '#ffffff',
          border: '1.5px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '26px',
        }}
      >
        <h3
          style={{
            fontSize: '0.98rem',
            fontWeight: 800,
            color: 'var(--navy-primary)',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <ShieldCheck size={16} color="var(--gold-primary)" />
          <span>Footer Highway Stats Strip (4 KPI Counters)</span>
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
          }}
        >
          {(data.stats || []).map((st, sIndex) => (
            <div
              key={sIndex}
              style={{
                background: '#f8fafc',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '14px',
              }}
            >
              <div style={{ marginBottom: '8px' }}>
                <label className="input-label">Metric Value #{sIndex + 1}</label>
                <input
                  type="text"
                  value={st.num || ''}
                  onChange={(e) => handleStatChange(sIndex, 'num', e.target.value)}
                  className="input-field"
                  placeholder="e.g. 23+"
                />
              </div>

              <div>
                <label className="input-label">Metric Label</label>
                <input
                  type="text"
                  value={st.lbl || ''}
                  onChange={(e) => handleStatChange(sIndex, 'lbl', e.target.value)}
                  className="input-field"
                  placeholder="e.g. Years Industry Legacy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Save Button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '20px',
        }}
      >
        <button
          type="button"
          onClick={() => onSave('trustClients', data)}
          disabled={isSaving}
          className="btn-gold"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px' }}
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>Save Highway Client Fleet</span>
        </button>
      </div>
    </div>
  );
}

