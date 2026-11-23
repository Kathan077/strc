import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Loader2,
  ExternalLink,
  Copy,
  Check,
  Trash2,
  Cloud,
  Folder,
  AlertTriangle,
  Maximize2,
  X,
  RefreshCw,
} from 'lucide-react';

export default function ImageUploader({
  label,
  value,
  onChange,
  token,
  placeholder = '/images/... or https://res.cloudinary.com/...',
}) {
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Determine image source type for status badges
  const isCloudinary = Boolean(
    value && (value.includes('cloudinary.com') || value.includes('res.cloudinary'))
  );
  const isLocalAsset = Boolean(
    value && (value.startsWith('/images') || value.startsWith('/uploads'))
  );
  const isExternal = Boolean(value && value.startsWith('http') && !isCloudinary);

  const handleUploadFile = async (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPEG, PNG, WebP, SVG, AVIF, GIF).');
      return;
    }

    setUploading(true);
    setImageError(false);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', 'srtc_logistics');

    const authToken = token || localStorage.getItem('srtc_admin_token');

    try {
      // Primary: try Cloudinary upload endpoint
      let res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      // Fallback: try homepage upload endpoint if 404
      if (!res.ok && res.status === 404) {
        res = await fetch('/api/homepage/upload', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        });
      }

      const data = await res.json();
      if (data.success && (data.path || data.url)) {
        const uploadedUrl = data.path || data.url;
        onChange(uploadedUrl);
        setImageError(false);
      } else {
        alert(data.message || 'Image upload failed. Please try again.');
      }
    } catch (err) {
      alert('Upload error: ' + err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleUploadFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUploadFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    if (confirm('Clear this image?')) {
      onChange('');
      setImageError(false);
    }
  };

  return (
    <div className="image-uploader-wrapper" style={{ marginBottom: '18px' }}>
      {/* Label and Badge Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '6px',
        }}
      >
        {label && <label className="input-label" style={{ marginBottom: 0 }}>{label}</label>}
        {value && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {isCloudinary && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#059669',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '2px 8px',
                  borderRadius: '12px',
                }}
                title="Hosted on Cloudinary CDN for ultra-fast worldwide delivery"
              >
                <Cloud size={11} /> Cloudinary CDN
              </span>
            )}
            {isLocalAsset && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#0284c7',
                  background: 'rgba(14, 165, 233, 0.1)',
                  border: '1px solid rgba(14, 165, 233, 0.25)',
                  padding: '2px 8px',
                  borderRadius: '12px',
                }}
                title="Local static asset in /public/images"
              >
                <Folder size={11} /> Local Asset
              </span>
            )}
            {isExternal && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#854d0e',
                  background: 'rgba(234, 179, 8, 0.12)',
                  border: '1px solid rgba(234, 179, 8, 0.3)',
                  padding: '2px 8px',
                  borderRadius: '12px',
                }}
              >
                <ExternalLink size={11} /> Web URL
              </span>
            )}
          </div>
        )}
      </div>

      {/* Main Input Row */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            value={value || ''}
            onChange={(e) => {
              onChange(e.target.value);
              setImageError(false);
            }}
            placeholder={placeholder}
            className="input-field"
            style={{
              paddingRight: value ? '70px' : '14px',
            }}
          />
          {value && (
            <div
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <button
                type="button"
                onClick={handleCopy}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  padding: '4px',
                  color: copied ? '#10b981' : '#64748b',
                  borderRadius: '4px',
                }}
                title={copied ? 'Copied!' : 'Copy Image URL'}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
              <button
                type="button"
                onClick={handleClear}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  padding: '4px',
                  color: '#ef4444',
                  borderRadius: '4px',
                }}
                title="Clear image"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/webp,image/svg+xml,image/avif,image/gif"
          style={{ display: 'none' }}
        />

        {/* Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="btn-gold"
          style={{
            whiteSpace: 'nowrap',
            padding: '9px 16px',
            fontSize: '0.84rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
          title="Upload new image to Cloudinary CDN"
        >
          {uploading ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Upload size={15} />
          )}
          <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
        </button>
      </div>

      {/* Drag & Drop Visual Zone / Preview Card */}
      {value ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{
            marginTop: '10px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: isDragOver
              ? '2px dashed var(--gold-primary)'
              : '1px solid var(--border-subtle)',
            background: isDragOver ? 'rgba(232, 185, 79, 0.08)' : '#ffffff',
            boxShadow: '0 4px 14px rgba(7, 31, 51, 0.05)',
            transition: 'all 0.2s ease',
          }}
        >
          {/* Preview Canvas Container */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '140px',
              background: '#071f33',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              padding: '12px',
              boxSizing: 'border-box',
            }}
          >
            {/* Subtle background checker for transparency check */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.15,
                backgroundImage:
                  'linear-gradient(45deg, #1e293b 25%, transparent 25%), linear-gradient(-45deg, #1e293b 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1e293b 75%), linear-gradient(-45deg, transparent 75%, #1e293b 75%)',
                backgroundSize: '16px 16px',
                backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
              }}
            />

            {!imageError ? (
              <img
                src={value}
                alt="Admin Image Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  position: 'relative',
                  zIndex: 1,
                  display: 'block',
                  margin: 'auto',
                  transition: 'transform 0.3s ease',
                }}
                onError={() => setImageError(true)}
              />
            ) : (
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  textAlign: 'center',
                  padding: '16px',
                  color: '#f87171',
                }}
              >
                <AlertTriangle size={24} style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                  Image Could Not Be Loaded
                </div>
                <div
                  style={{
                    fontSize: '0.7rem',
                    color: '#cbd5e1',
                    marginTop: '2px',
                    maxWidth: '300px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {value}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    marginTop: '8px',
                    background: 'rgba(232, 185, 79, 0.2)',
                    color: 'var(--gold-primary)',
                    border: '1px solid var(--gold-primary)',
                    borderRadius: '6px',
                    padding: '4px 10px',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                >
                  Upload Replacement to Cloudinary
                </button>
              </div>
            )}

            {/* Overlay Action Buttons on Top Right */}
            {!imageError && (
              <div
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  display: 'flex',
                  gap: '6px',
                  zIndex: 3,
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  style={{
                    background: 'rgba(7, 31, 51, 0.75)',
                    backdropFilter: 'blur(6px)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}
                  title="View High Resolution Full Image"
                >
                  <Maximize2 size={12} color="var(--gold-primary)" />
                  <span>Full View</span>
                </button>

                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'rgba(7, 31, 51, 0.75)',
                    backdropFilter: 'blur(6px)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '6px',
                    padding: '6px 8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}
                  title="Open URL in New Tab"
                >
                  <ExternalLink size={12} color="#ffffff" />
                </a>
              </div>
            )}
          </div>

          {/* Bottom Card Footer Details */}
          <div
            style={{
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#f8fafc',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.74rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                overflow: 'hidden',
                color: 'var(--text-muted)',
              }}
            >
              <ImageIcon size={13} color="var(--gold-primary)" />
              <span
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontWeight: 600,
                  color: 'var(--navy-primary)',
                }}
              >
                {value}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--navy-primary)',
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <RefreshCw size={11} /> Replace
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Dropzone Card */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          style={{
            marginTop: '8px',
            border: isDragOver
              ? '2px dashed var(--gold-primary)'
              : '1.5px dashed var(--border-subtle)',
            borderRadius: '10px',
            padding: '16px',
            textAlign: 'center',
            cursor: 'pointer',
            background: isDragOver ? 'rgba(232, 185, 79, 0.08)' : '#fafbfc',
            transition: 'all 0.2s ease',
          }}
        >
          <Upload
            size={22}
            color={isDragOver ? 'var(--gold-primary)' : '#94a3b8'}
            style={{ margin: '0 auto 6px' }}
          />
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-primary)' }}>
            Click to upload or drag & drop image here
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Supports JPG, PNG, WebP, SVG (Auto-uploaded to Cloudinary CDN)
          </div>
        </div>
      )}

      {/* ================= FULL SCREEN LIGHTBOX MODAL ================= */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(7, 31, 51, 0.88)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          {/* Modal Header */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '900px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
              color: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  background: 'var(--gold-primary)',
                  color: '#071f33',
                  fontWeight: 800,
                  fontSize: '0.72rem',
                  padding: '3px 8px',
                  borderRadius: '4px',
                }}
              >
                IMAGE PREVIEW
              </span>
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{value}</span>
            </div>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                borderRadius: '8px',
                padding: '6px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 700,
                fontSize: '0.8rem',
              }}
            >
              <X size={16} /> Close
            </button>
          </div>

          {/* Modal Image Box */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '900px',
              maxHeight: '80vh',
              background: '#071f33',
              borderRadius: '12px',
              border: '1.5px solid var(--gold-primary)',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              boxSizing: 'border-box',
            }}
          >
            <img
              src={value}
              alt="High Resolution Preview"
              style={{
                maxWidth: '100%',
                maxHeight: 'calc(80vh - 40px)',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
