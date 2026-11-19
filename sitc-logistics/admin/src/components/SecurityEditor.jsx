import React, { useState } from 'react';
import { Lock, Save, Loader2, KeyRound, ShieldAlert } from 'lucide-react';

export default function SecurityEditor({ onPasswordChanged }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ text: 'All fields are required.', type: 'error' });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ text: 'New password must be at least 6 characters.', type: 'error' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ text: 'New passwords do not match.', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('srtc_admin_token')}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ text: 'Password successfully updated!', type: 'success' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        if (onPasswordChanged) onPasswordChanged();
      } else {
        setMessage({ text: data.message || 'Failed to update password', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Network error updating password.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-box animate-fade-in" style={{ maxWidth: '600px' }}>
      <div
        style={{
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '20px',
          marginBottom: '26px',
        }}
      >
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <KeyRound size={22} color="var(--gold-primary)" />
          <span>Admin Security & Password Change</span>
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          Update the master password for the Central Administrator Account.
        </p>
      </div>

      {message.text && (
        <div
          style={{
            padding: '14px 18px',
            borderRadius: '10px',
            marginBottom: '22px',
            background: message.type === 'success' ? '#f0fdf4' : '#fff5f5',
            border: `1.5px solid ${message.type === 'success' ? '#86efac' : '#feb2b2'}`,
            color: message.type === 'success' ? '#15803d' : '#c53030',
            fontSize: '0.88rem',
            fontWeight: 600,
          }}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '18px' }}>
          <label className="input-label">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="input-field"
            placeholder="Enter current master password"
          />
        </div>

        <div style={{ marginBottom: '18px' }}>
          <label className="input-label">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input-field"
            placeholder="At least 6 characters"
          />
        </div>

        <div style={{ marginBottom: '26px' }}>
          <label className="input-label">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
            placeholder="Re-enter new password"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-gold">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>Update Password Now</span>
        </button>
      </form>
    </div>
  );
}
