import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import API_BASE_URL from './config';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token, data.user);
        setMessage('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/');
        }, 700);
      } else {
        setError(data.error || 'Login failed.');
      }
    } catch (err) {
      setError('Network error.');
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
        <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 600, fontSize: '1.08rem', color: '#fff', gap: '0.4rem' }}>Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required style={{ marginTop: 4, padding: '0.6rem 0.9rem', borderRadius: 8, border: '1.5px solid #3c50ff', fontSize: '1rem', background: '#181c24', color: '#fff', outline: 'none' }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 600, fontSize: '1.08rem', color: '#fff', gap: '0.4rem' }}>Password
          <input name="password" type="password" value={form.password} onChange={handleChange} required style={{ marginTop: 4, padding: '0.6rem 0.9rem', borderRadius: 8, border: '1.5px solid #3c50ff', fontSize: '1rem', background: '#181c24', color: '#fff', outline: 'none' }} />
        </label>
        <button type="submit" disabled={loading} style={{ marginTop: '0.7rem' }}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
      {message && <div style={{ color: '#22c55e', marginTop: 16 }}>{message}</div>}
      {error && <div style={{ color: '#ef4444', marginTop: 16 }}>{error}</div>}
    </div>
  );
} 