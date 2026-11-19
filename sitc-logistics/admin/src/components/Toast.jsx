import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: '#ffffff',
        border: `1.5px solid ${isSuccess ? '#22c55e' : '#ef4444'}`,
        color: '#0b2f4a',
        padding: '14px 20px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(11, 47, 74, 0.15)',
        minWidth: '320px',
        maxWidth: '460px',
      }}
      className="animate-fade-in"
    >
      {isSuccess ? (
        <CheckCircle2 size={20} color="#22c55e" style={{ flexShrink: 0 }} />
      ) : (
        <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0 }} />
      )}
      <div style={{ flex: 1, fontSize: '0.88rem', fontWeight: 600 }}>
        {toast.message}
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: '#94a3b8',
          cursor: 'pointer',
          padding: '2px',
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
