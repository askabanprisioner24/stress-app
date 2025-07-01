import React from 'react';

const tips = [
  {
    title: 'Deep Breathing Exercise',
    desc: 'Take a slow, deep breath in for 4 seconds, hold for 4 seconds, and exhale for 4 seconds. Repeat 5 times.'
  },
  {
    title: 'Take a Short Walk',
    desc: 'A 5-minute walk can help clear your mind and reduce stress.'
  },
  {
    title: 'Time Management',
    desc: 'Break tasks into smaller steps and prioritize them. Use a to-do list to stay organized.'
  },
  {
    title: 'Talk to Someone',
    desc: 'Share your feelings with a friend, family member, or counselor.'
  },
  {
    title: 'Practice Mindfulness',
    desc: 'Spend a few minutes focusing on your breath or surroundings to ground yourself in the present.'
  },
];

const Toolkit = () => (
  <div className="page-container">
    <h2>Stress Management Toolkit</h2>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tips.map((tip, idx) => (
        <li key={idx} style={{ margin: '1.2rem 0', padding: '1rem', background: '#f4f7fa', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ fontWeight: 600, color: '#3b4a6b', fontSize: '1.1rem' }}>{tip.title}</div>
          <div style={{ color: '#4b5563', marginTop: '0.3rem', fontSize: '1rem' }}>{tip.desc}</div>
        </li>
      ))}
    </ul>
    <p style={{ marginTop: '2rem', color: '#2563eb' }}>Try these strategies whenever you feel stressed!</p>
  </div>
);

export default Toolkit; 