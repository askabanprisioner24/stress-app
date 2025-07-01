import React, { useState } from 'react';
import API_BASE_URL from './config';

const initialState = {
  fullName: '',
  email: '',
  phone: '',
  emergencyContactName: '',
  emergencyContactNumber: '',
  counsellorName: '',
  counsellorContactNumber: '',
  password: '',
};

export default function Signup() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Signup successful! You can now log in.');
        setForm(initialState);
      } else {
        setError(data.error || 'Signup failed.');
      }
    } catch (err) {
      setError('Network error.');
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
        <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 600, fontSize: '1.08rem', color: '#fff', gap: '0.4rem' }}>Full Name
          <input name="fullName" value={form.fullName} onChange={handleChange} required style={{ marginTop: 4, padding: '0.6rem 0.9rem', borderRadius: 8, border: '1.5px solid #3c50ff', fontSize: '1rem', background: '#181c24', color: '#fff', outline: 'none' }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 600, fontSize: '1.08rem', color: '#fff', gap: '0.4rem' }}>Email Address
          <input name="email" type="email" value={form.email} onChange={handleChange} required style={{ marginTop: 4, padding: '0.6rem 0.9rem', borderRadius: 8, border: '1.5px solid #3c50ff', fontSize: '1rem', background: '#181c24', color: '#fff', outline: 'none' }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 600, fontSize: '1.08rem', color: '#fff', gap: '0.4rem' }}>Phone Number
          <input name="phone" value={form.phone} onChange={handleChange} required style={{ marginTop: 4, padding: '0.6rem 0.9rem', borderRadius: 8, border: '1.5px solid #3c50ff', fontSize: '1rem', background: '#181c24', color: '#fff', outline: 'none' }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 600, fontSize: '1.08rem', color: '#fff', gap: '0.4rem' }}>Emergency Contact Name
          <input name="emergencyContactName" value={form.emergencyContactName} onChange={handleChange} required style={{ marginTop: 4, padding: '0.6rem 0.9rem', borderRadius: 8, border: '1.5px solid #3c50ff', fontSize: '1rem', background: '#181c24', color: '#fff', outline: 'none' }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 600, fontSize: '1.08rem', color: '#fff', gap: '0.4rem' }}>Emergency Contact Number
          <input name="emergencyContactNumber" value={form.emergencyContactNumber} onChange={handleChange} required style={{ marginTop: 4, padding: '0.6rem 0.9rem', borderRadius: 8, border: '1.5px solid #3c50ff', fontSize: '1rem', background: '#181c24', color: '#fff', outline: 'none' }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 600, fontSize: '1.08rem', color: '#fff', gap: '0.4rem' }}>Counsellor Name
          <input name="counsellorName" value={form.counsellorName} onChange={handleChange} required style={{ marginTop: 4, padding: '0.6rem 0.9rem', borderRadius: 8, border: '1.5px solid #3c50ff', fontSize: '1rem', background: '#181c24', color: '#fff', outline: 'none' }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 600, fontSize: '1.08rem', color: '#fff', gap: '0.4rem' }}>Counsellor Contact Number
          <input name="counsellorContactNumber" value={form.counsellorContactNumber} onChange={handleChange} required style={{ marginTop: 4, padding: '0.6rem 0.9rem', borderRadius: 8, border: '1.5px solid #3c50ff', fontSize: '1rem', background: '#181c24', color: '#fff', outline: 'none' }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 600, fontSize: '1.08rem', color: '#fff', gap: '0.4rem' }}>Password
          <input name="password" type="password" value={form.password} onChange={handleChange} required style={{ marginTop: 4, padding: '0.6rem 0.9rem', borderRadius: 8, border: '1.5px solid #3c50ff', fontSize: '1rem', background: '#181c24', color: '#fff', outline: 'none' }} />
        </label>
        <button type="submit" disabled={loading} style={{ marginTop: '0.7rem' }}>{loading ? 'Signing up...' : 'Sign Up'}</button>
      </form>
      {message && <div style={{ color: '#22c55e', marginTop: 16 }}>{message}</div>}
      {error && <div style={{ color: '#ef4444', marginTop: 16 }}>{error}</div>}
    </div>
  );
} 