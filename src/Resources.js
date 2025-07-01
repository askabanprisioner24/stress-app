import React from 'react';

const resources = [
  {
    unit: 'Unit I: Introduction to Psychology',
    items: [
      { title: 'Definition & Goals', desc: 'Psychology is the scientific study of behavior and mental processes. Goals: describe, explain, predict, and control behavior.' },
      { title: 'Branches', desc: 'Clinical Psychology: deals with diagnosis and treatment of mental disorders. Industrial Psychology: applies psychology to workplace issues.' },
      { title: 'Research Methods', desc: 'Includes experimental, observation, questionnaire, and clinical methods.' },
    ]
  },
  {
    unit: 'Unit II: Intelligence and Aptitude',
    items: [
      { title: 'Intelligence', desc: 'The ability to learn, reason, and solve problems. Theories: Spearman (g factor), Thurston (primary abilities), Guilford (structure of intellect), Vernon (hierarchical).' },
      { title: 'IQ', desc: 'Intelligence Quotient, a measure of intelligence. Fluid intelligence: problem-solving. Crystallized intelligence: acquired knowledge.' },
    ]
  },
  {
    unit: 'Unit III: Personality',
    items: [
      { title: 'Personality', desc: 'Enduring patterns of thoughts, feelings, and behaviors. Approaches: psychoanalytical, socio-cultural, humanistic, trait, type.' },
      { title: 'Assessment', desc: 'Self-report, questionnaires, rating scales, projective techniques.' },
    ]
  },
  {
    unit: 'Unit IV: Learning',
    items: [
      { title: 'Classical Conditioning', desc: 'Learning by association (Pavlov). Extinction, discrimination, generalization.' },
      { title: 'Operant Conditioning', desc: 'Learning by consequences (Skinner). Reinforcement schedules.' },
      { title: 'Cognitive-Social', desc: 'Latent learning, observational learning, trial and error, insight.' },
    ]
  },
  {
    unit: 'Unit V: Application in Work',
    items: [
      { title: 'Stress', desc: 'Definition, symptoms, causes, workplace trauma, burnout, stress threshold, perceived control.' },
      { title: 'Counseling', desc: 'Types: directed, non-directed, participative. Need for counseling in workplace.' },
    ]
  },
];

const cardBg = 'rgba(35,41,70,0.98)';
const cardTitle = '#ffe066';
const cardText = '#f8fafd';
const unitHeader = '#a3bffa';

const Resources = () => (
  <div className="page-container">
    <h2>Resource Library</h2>
    {resources.map((unit, idx) => (
      <div key={idx} style={{ margin: '2rem 0' }}>
        <div style={{ fontWeight: 700, color: unitHeader, fontSize: '1.15rem', marginBottom: '0.7rem', letterSpacing: 0.5 }}>{unit.unit}</div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {unit.items.map((item, i) => (
            <li key={i} style={{ margin: '0.7rem 0', padding: '0.9rem', background: cardBg, borderRadius: '12px', boxShadow: '0 2px 8px #23294655', color: cardText }}>
              <div style={{ fontWeight: 600, color: cardTitle, fontSize: '1.08rem', marginBottom: 4 }}>{item.title}</div>
              <div style={{ color: cardText, fontSize: '1rem' }}>{item.desc}</div>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default Resources; 