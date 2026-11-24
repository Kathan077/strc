import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { apiUrl } from '../config/api';
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
  currentImage,
  image,
  onChange,
  onImageUploaded,
  token,
  placeholder = '/images/... or https://res.cloudinary.com/...',
}) {
  const actualValue = value || currentImage || image || '';
  const triggerChange = (newVal) => {
    if (onChange) onChange(newVal);
    if (onImageUploaded) onImageUploaded(newVal);
  };

  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Close modal on Escape key
  useEffect(() => {
    if (!showModal) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

  // Determine image source type for status badges
  const isCloudinary = Boolean(
    actualValue && (actualValue.includes('cloudinary.com') || actualValue.includes('res.cloudinary'))
  );
  const isLocalAsset = Boolean(
    actualValue && (actualValue.startsWith('/images') || actualValue.startsWith('/uploads'))
  );
  const isExternal = Boolean(actualValue && actualValue.startsWith('http') && !isCloudinary);

  const handleUploadFile = async (file) => {
    if (!file) return;

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
      let res = await fetch(apiUrl('/api/upload'), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (!res.ok && res.status === 404) {
        res = await fetch(apiUrl('/api/homepage/upload'), {
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
        triggerChange(uploadedUrl);
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
    if (!actualValue) return;
    navigator.clipboard.writeText(actualValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    if (confirm('Clear this image?')) {
      triggerChange('');
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
        {actualValue && (
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
                title="Stored in local project public assets folder"
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
                <ExternalLink size={11} /> External URL
              </span>
            )}
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

      {/* Main Input Field + Upload / Action Bar */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            className="input-field"
            value={actualValue}
            onChange={(e) => {
              triggerChange(e.target.value);
              setImageError(false);
            }}
            placeholder={placeholder}
            style={{
              paddingRight: actualValue ? '36px' : '14px',
              fontFamily: actualValue ? 'var(--font-mono)' : 'inherit',
              fontSize: '0.84rem',
            }}
          />
          {actualValue && (
            <button
              type="button"
              onClick={handleCopy}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: copied ? '#22c55e' : 'var(--text-muted)',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s ease',
              }}
              title="Copy URL"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          )}
        </div>

        {/* Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="btn-gold"
          style={{
            flexShrink: 0,
            padding: '9px 16px',
            fontSize: '0.82rem',
          }}
          title="Upload image from computer to Cloudinary CDN"
        >
          {uploading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload size={14} />
              <span>Upload Image</span>
            </>
          )}
        </button>

        {/* Clear Button */}
        {actualValue && (
          <button
            type="button"
            onClick={handleClear}
            className="btn-danger"
            style={{ padding: '9px 12px', flexShrink: 0 }}
            title="Remove image"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      {/* =========================================================================
          LIVE EMBEDDED PREVIEW CARD (Shown when actualValue is present)
          ========================================================================= */}
      {actualValue ? (
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
              : '1.5px solid var(--border-subtle)',
            background: isDragOver ? 'rgba(232, 185, 79, 0.08)' : '#ffffff',
            boxShadow: '0 4px 18px rgba(7, 31, 51, 0.06)',
            transition: 'all 0.2s ease',
          }}
        >
          {/* Preview Canvas Container - Spacious & High-Definition */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '180px',
              maxHeight: '220px',
              background: 'linear-gradient(180deg, #071f33 0%, #0b2f4a 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              padding: '16px',
              boxSizing: 'border-box',
            }}
          >
            {/* Subtle background checker for transparency check */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.12,
                backgroundImage:
                  'linear-gradient(45deg, #1e293b 25%, transparent 25%), linear-gradient(-45deg, #1e293b 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1e293b 75%), linear-gradient(-45deg, transparent 75%, #1e293b 75%)',
                backgroundSize: '16px 16px',
                backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
              }}
            />

            {!imageError ? (
              <img
                src={actualValue}
                alt="Admin Image Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '190px',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  position: 'relative',
                  zIndex: 1,
                  display: 'block',
                  margin: 'auto',
                  borderRadius: '6px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
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
                  {actualValue}
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
                  top: '10px',
                  right: '10px',
                  display: 'flex',
                  gap: '6px',
                  zIndex: 3,
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  style={{
                    background: 'rgba(7, 31, 51, 0.85)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    border: '1px solid rgba(232, 185, 79, 0.4)',
                    borderRadius: '7px',
                    padding: '6px 12px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.35)',
                    transition: 'all 0.2s ease',
                  }}
                  title="View High Resolution Full Image"
                >
                  <Maximize2 size={13} color="var(--gold-primary)" />
                  <span>Full View</span>
                </button>

                <a
                  href={actualValue}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'rgba(7, 31, 51, 0.85)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '7px',
                    padding: '6px 9px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.35)',
                  }}
                  title="Open URL in New Tab"
                >
                  <ExternalLink size={13} color="#ffffff" />
                </a>
              </div>
            )}
          </div>

          {/* Bottom Card Footer Details */}
          <div
            style={{
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#f8fafc',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.76rem',
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
              <ImageIcon size={14} color="var(--gold-primary)" />
              <span
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontWeight: 650,
                  color: 'var(--navy-primary)',
                  maxWidth: '380px',
                }}
              >
                {actualValue}
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
                  fontWeight: 750,
                  fontSize: '0.74rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}
              >
                <RefreshCw size={12} color="var(--gold-primary)" /> Replace Image
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
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            background: isDragOver ? 'rgba(232, 185, 79, 0.08)' : '#fafbfc',
            transition: 'all 0.2s ease',
          }}
        >
          <Upload
            size={24}
            color={isDragOver ? 'var(--gold-primary)' : '#94a3b8'}
            style={{ margin: '0 auto 8px' }}
          />
          <div style={{ fontSize: '0.84rem', fontWeight: 650, color: 'var(--navy-primary)' }}>
            Click to upload or drag & drop image here
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '3px' }}>
            Supports JPG, PNG, WebP, SVG (Auto-uploaded to Cloudinary CDN)
          </div>
        </div>
      )}

      {/* ================= FULL SCREEN LIGHTBOX MODAL (RENDERED VIA PORTAL) ================= */}
      {showModal && typeof document !== 'undefined' && createPortal(
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 22, 36, 0.94)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            zIndex: 999999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          {/* Modal Header Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '1100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px',
              color: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  background: 'var(--gold-primary)',
                  color: '#071f33',
                  fontWeight: 800,
                  fontSize: '0.74rem',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  letterSpacing: '0.04em',
                }}
              >
                HIGH-RES PREVIEW
              </span>
              <span
                style={{
                  fontSize: '0.85rem',
                  color: '#cbd5e1',
                  maxWidth: '550px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {actualValue}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <a
                href={actualValue}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  borderRadius: '8px',
                  padding: '7px 14px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 650,
                  fontSize: '0.8rem',
                  transition: 'all 0.2s ease',
                }}
              >
                <ExternalLink size={14} color="var(--gold-primary)" />
                <span>Open in Tab</span>
              </a>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="btn-gold"
                style={{
                  padding: '7px 16px',
                  fontSize: '0.8rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <X size={16} />
                <span>Close</span>
              </button>
            </div>
          </div>

          {/* Modal Image Box with high-res display */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '1100px',
              height: 'calc(85vh - 50px)',
              background: '#071f33',
              borderRadius: '16px',
              border: '1.5px solid rgba(232, 185, 79, 0.5)',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.65)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              boxSizing: 'border-box',
              position: 'relative',
            }}
          >
            {/* Subtle transparency grid */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.1,
                backgroundImage:
                  'linear-gradient(45deg, #1e293b 25%, transparent 25%), linear-gradient(-45deg, #1e293b 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1e293b 75%), linear-gradient(-45deg, transparent 75%, #1e293b 75%)',
                backgroundSize: '20px 20px',
              }}
            />

            <img
              src={actualValue}
              alt="High Resolution Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                position: 'relative',
                zIndex: 2,
                borderRadius: '8px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
              }}
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
