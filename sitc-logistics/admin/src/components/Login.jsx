import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, Loader2, Sparkles } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success && data.token) {
        localStorage.setItem('srtc_admin_token', data.token);
        localStorage.setItem('srtc_admin_user', JSON.stringify(data.user));
        onLoginSuccess(data.user, data.token);
      } else {
        setError(data.message || 'Invalid administrator credentials.');
      }
    } catch (err) {
      setError('Cannot connect to backend server. Please verify port 5000 is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleUseDefault = () => {
    setEmail('admin@srtclogistics.com');
    setPassword('SRTC@Admin#2026!Secure');
    setError('');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        /* Pure, seamless luxury white backdrop - absolutely ZERO box lines / grid */
        background: 'radial-gradient(circle at 50% 25%, #ffffff 0%, #f8fafc 55%, #edf2f7 100%)',
        padding: '24px 16px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft Ambient Luminous Warm Glow Orbs behind the Glass Card (Zero lines) */}
      <div
        style={{
          position: 'absolute',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232, 185, 79, 0.22) 0%, rgba(232, 185, 79, 0) 70%)',
          top: '10%',
          left: '32%',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(7, 85, 122, 0.12) 0%, rgba(7, 85, 122, 0) 70%)',
          bottom: '8%',
          right: '28%',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* =========================================================================
          PRO-LEVEL ULTRA-FROSTED WHITE CRYSTAL GLASS CARD
          ========================================================================= */}
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          background: 'rgba(255, 255, 255, 0.78)',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          borderRadius: '24px',
          border: '1.5px solid rgba(232, 185, 79, 0.45)',
          boxShadow:
            'inset 0 1px 2px #ffffff, 0 25px 60px rgba(11, 47, 74, 0.09), 0 6px 22px rgba(232, 185, 79, 0.18)',
          padding: '40px 34px',
          position: 'relative',
          zIndex: 10,
        }}
        className="animate-fade-in"
      >
        {/* Specular Rim Light */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '12%',
            right: '12%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(232, 185, 79, 0.7) 50%, transparent 100%)',
          }}
        />

        {/* Brand Crest Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 16px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, rgba(232, 185, 79, 0.22) 0%, rgba(255, 255, 255, 0.95) 100%)',
              border: '1.5px solid var(--gold-primary)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(232, 185, 79, 0.25), inset 0 1px 2px #ffffff',
            }}
          >
            <ShieldCheck size={34} color="#e8b94f" strokeWidth={2.2} />
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.55rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              color: 'var(--navy-primary)',
              marginBottom: '4px',
            }}
          >
            SRTC LOGISTICS
          </h1>
          <p
            style={{
              fontSize: '0.74rem',
              fontWeight: 800,
              color: '#c4962c',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            Central CMS & Administration Console
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div
            style={{
              marginBottom: '20px',
              padding: '12px 16px',
              background: '#fff5f5',
              border: '1.5px solid #feb2b2',
              borderRadius: '10px',
              color: '#c53030',
              fontSize: '0.84rem',
              fontWeight: 600,
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.08)',
            }}
          >
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div style={{ marginBottom: '18px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.74rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--navy-primary)',
                marginBottom: '8px',
              }}
            >
              Administrator Email
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@srtclogistics.com"
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '12px 14px 12px 42px',
                  color: 'var(--navy-primary)',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: 'inset 0 1px 2px rgba(11, 47, 74, 0.03)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--gold-primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(232, 185, 79, 0.22)';
                  e.target.style.background = '#ffffff';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'inset 0 1px 2px rgba(11, 47, 74, 0.03)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                }}
                autoComplete="email"
              />
              <Mail
                size={18}
                color="#e8b94f"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '22px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.74rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--navy-primary)',
                marginBottom: '8px',
              }}
            >
              Master Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••"
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '12px 42px',
                  color: 'var(--navy-primary)',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: 'inset 0 1px 2px rgba(11, 47, 74, 0.03)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--gold-primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(232, 185, 79, 0.22)';
                  e.target.style.background = '#ffffff';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'inset 0 1px 2px rgba(11, 47, 74, 0.03)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                }}
                autoComplete="current-password"
              />
              <Lock
                size={18}
                color="#e8b94f"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-gold"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '13px',
              fontSize: '0.96rem',
              borderRadius: '12px',
              marginBottom: '18px',
              fontWeight: 800,
              boxShadow: '0 4px 18px rgba(232, 185, 79, 0.35)',
            }}
          >
            {loading ? (
              <>
                <Loader2 size={19} className="animate-spin" />
                <span>Authenticating Console...</span>
              </>
            ) : (
              <>
                <span>Sign In To Admin Console</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Refined Frosted Auto-Fill Credentials Pill */}
        <div
          style={{
            padding: '14px',
            background: 'rgba(232, 185, 79, 0.08)',
            border: '1.5px dashed rgba(232, 185, 79, 0.5)',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '0.74rem', color: '#5a6e82', fontWeight: 600, marginBottom: '6px' }}>
            Default Administrator Credentials:
          </div>
          <div
            style={{
              fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              color: 'var(--navy-primary)',
              marginBottom: '10px',
            }}
          >
            admin@srtclogistics.com / SRTC@Admin#2026!Secure
          </div>
          <button
            type="button"
            onClick={handleUseDefault}
            style={{
              width: '100%',
              padding: '9px 12px',
              background: '#ffffff',
              border: '1.5px solid var(--gold-border)',
              borderRadius: '8px',
              color: 'var(--navy-primary)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 3px rgba(11, 47, 74, 0.05)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--gold-primary)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(232, 185, 79, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--gold-border)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(11, 47, 74, 0.05)';
            }}
          >
            <Sparkles size={14} color="#e8b94f" />
            <span>Auto-Fill Credentials</span>
          </button>
        </div>
      </div>
    </div>
  );
}
