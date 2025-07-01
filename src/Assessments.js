import React from 'react';
import { Link } from 'react-router-dom';

const quizList = [
  { name: 'Personality Test', path: '/assessments/personality', desc: 'Discover your personality traits and type.' },
  { name: 'Intelligence & Aptitude Quiz', path: '/assessments/intelligence', desc: 'Gauge your intelligence and aptitude.' },
  { name: 'Learning Style Inventory', path: '/assessments/learning-style', desc: 'Find out how you learn best.' },
  { name: 'Stress Level Assessment', path: '/assessments/stress', desc: 'Check your current stress level.' },
];

const Assessments = () => (
  <div className="page-container">
    <h2>Self-Assessment Quizzes</h2>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {quizList.map(q => (
        <li key={q.path} style={{ margin: '1.5rem 0', padding: '1rem', background: '#f4f7fa', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <Link to={q.path} style={{ fontSize: '1.15rem', color: '#3b4a6b', textDecoration: 'underline', fontWeight: 600 }}>{q.name}</Link>
          <div style={{ color: '#4b5563', marginTop: '0.3rem', fontSize: '1rem' }}>{q.desc}</div>
        </li>
      ))}
    </ul>
    <p>Take these quizzes to learn more about yourself and get personalized feedback!</p>
  </div>
);

export default Assessments; 