import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { Loader2 } from 'lucide-react';
import { apiUrl } from './config/api';

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('srtc_admin_token');
    const savedUser = localStorage.getItem('srtc_admin_user');

    if (!savedToken) {
      setInitializing(false);
      return;
    }

    // Verify token with backend
    fetch(apiUrl('/api/auth/me'), {
      headers: { Authorization: `Bearer ${savedToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          setUser(data.user);
          setToken(savedToken);
        } else {
          localStorage.removeItem('srtc_admin_token');
          localStorage.removeItem('srtc_admin_user');
          setUser(null);
          setToken(null);
        }
      })
      .catch(() => {
        // Fallback to saved local user if server temporarily unreachable
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
          } catch (e) {}
        }
      })
      .finally(() => {
        setInitializing(false);
      });
  }, []);

  const handleLoginSuccess = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('srtc_admin_token');
    localStorage.removeItem('srtc_admin_user');
    setUser(null);
    setToken(null);
  };

  if (initializing) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-deep)',
          gap: '16px',
        }}
      >
        <Loader2 size={36} color="var(--gold-primary)" className="animate-spin" />
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Loading Central Admin Console...
        </div>
      </div>
    );
  }

  if (!user || !token) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}

