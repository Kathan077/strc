import React, { useState, useEffect } from 'react';
import { Save, Loader2, Video, Sparkles } from 'lucide-react';

export default function HeroEditor({ initialData, onSave, isSaving }) {
  const [data, setData] = useState(
    initialData || {
      videoUrl: '/videos/video_no_logo_clean.mp4',
    }
  );

  useEffect(() => {
    if (initialData) setData(initialData);
  }, [initialData]);

  const handleVideoUrlChange = (value) => {
    setData((prev) => ({ ...prev, videoUrl: value }));
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
            Cinematic Hero Video Section
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Control the full-bleed cinematic video background displayed on the homepage. Changes apply instantly.
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => onSave('hero', data)}
            disabled={isSaving}
            className="btn-gold"
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            <span>Save Hero Video</span>
          </button>
        </div>
      </div>

      {/* ===================================================================
          CINEMATIC HERO VIDEO CONTROLLER (100% Dynamic Direct Video Feed)
          =================================================================== */}
      <div
        style={{
          background: 'linear-gradient(135deg, #071F33 0%, #0B2F4A 100%)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '28px',
          color: '#ffffff',
          boxShadow: '0 4px 20px rgba(7, 31, 51, 0.18)',
          border: '1px solid rgba(232, 185, 79, 0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(232, 185, 79, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold-primary)',
              }}
            >
              <Video size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                Full-Bleed Cinematic Hero Video
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
                Directly feeds the full-screen looping background video on the homepage.
              </p>
            </div>
          </div>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: '20px',
              background: data.videoUrl ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              color: data.videoUrl ? '#4ade80' : '#f87171',
              border: `1px solid ${data.videoUrl ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
            }}
          >
            {data.videoUrl ? 'ACTIVE VIDEO CONFIGURED' : 'NO VIDEO CONFIGURED'}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', alignItems: 'center' }}>
          {/* Left Column: Input and Quick Preset Selectors */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
              Video Source URL (Local Path or Cloudinary / MP4 URL)
            </label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <input
                type="text"
                className="input-field"
                style={{
                  background: '#071F33',
                  color: '#ffffff',
                  borderColor: 'rgba(232, 185, 79, 0.4)',
                  fontSize: '0.88rem',
                }}
                value={data.videoUrl || ''}
                onChange={(e) => handleVideoUrlChange(e.target.value)}
                placeholder="/videos/video_no_logo_clean.mp4"
              />
            </div>

            {/* Quick Preset Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', alignSelf: 'center', marginRight: '4px' }}>
                Quick Presets:
              </span>
              <button
                type="button"
                onClick={() => handleVideoUrlChange('/videos/video_no_logo_clean.mp4')}
                className="btn-secondary"
                style={{
                  fontSize: '0.74rem',
                  padding: '4px 10px',
                  background: data.videoUrl === '/videos/video_no_logo_clean.mp4' ? 'var(--gold-primary)' : 'rgba(255,255,255,0.08)',
                  color: data.videoUrl === '/videos/video_no_logo_clean.mp4' ? '#071F33' : '#e2e8f0',
                  borderColor: 'rgba(255,255,255,0.15)',
                  fontWeight: 700,
                }}
              >
                Clean Video (No Logo)
              </button>
              <button
                type="button"
                onClick={() => handleVideoUrlChange('/videos/1000414365_gwr_video_mvp.mp4')}
                className="btn-secondary"
                style={{
                  fontSize: '0.74rem',
                  padding: '4px 10px',
                  background: data.videoUrl === '/videos/1000414365_gwr_video_mvp.mp4' ? 'var(--gold-primary)' : 'rgba(255,255,255,0.08)',
                  color: data.videoUrl === '/videos/1000414365_gwr_video_mvp.mp4' ? '#071F33' : '#e2e8f0',
                  borderColor: 'rgba(255,255,255,0.15)',
                  fontWeight: 700,
                }}
              >
                GWR MVP Video
              </button>
            </div>

            {/* Information Notice */}
            <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ fontSize: '0.78rem', color: '#cbd5e1', margin: 0, lineHeight: 1.4 }}>
                ℹ️ <strong>Note:</strong> The homepage hero exclusively displays this cinematic video for maximum visual impact. The old carousel slides have been removed to keep your console clean and fast.
              </p>
            </div>
          </div>

          {/* Right Column: Live In-Admin Video Preview */}
          <div
            style={{
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              background: '#000000',
              border: '1.5px solid rgba(232, 185, 79, 0.4)',
              aspectRatio: '16/9',
              maxHeight: '220px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {data.videoUrl ? (
              <video
                key={data.videoUrl}
                src={data.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{ color: '#64748b', fontSize: '0.8rem', textAlign: 'center', padding: '12px' }}>
                <Video size={24} style={{ margin: '0 auto 6px auto', opacity: 0.5 }} />
                <span>Enter a valid video URL above to preview</span>
              </div>
            )}
            <div
              style={{
                position: 'absolute',
                bottom: '6px',
                right: '8px',
                background: 'rgba(0,0,0,0.6)',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.65rem',
                color: '#e2e8f0',
                fontWeight: 700,
              }}
            >
              LIVE PREVIEW
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
