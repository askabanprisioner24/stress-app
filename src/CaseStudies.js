import React, { useState } from 'react';

const scenarios = [
  {
    title: 'Scenario 1: Team Conflict',
    desc: "You are working on a group project and two team members have a disagreement about how to proceed. The conflict is affecting the team's productivity.",
    question: 'How would you handle this situation as a team member?',
    analysis: 'This scenario involves interpersonal and conflict resolution skills. Applying humanistic and behavioral approaches, you could encourage open communication, active listening, and mediate a compromise. Understanding personality differences can also help.'
  },
  {
    title: 'Scenario 2: Tight Deadlines',
    desc: 'You have multiple assignments due in a short period. You feel stressed and overwhelmed.',
    question: 'What strategies would you use to manage your stress and workload?',
    analysis: 'This scenario highlights stress management and time management. Using cognitive-behavioral techniques, you could break tasks into smaller steps, prioritize, and use relaxation techniques. Seeking support and practicing self-care are also important.'
  },
  {
    title: 'Scenario 3: Presentation Anxiety',
    desc: 'You are required to give a presentation in front of your class. You feel nervous and anxious about public speaking.',
    question: 'How would you prepare yourself mentally and emotionally for the presentation?',
    analysis: 'This scenario involves performance anxiety. Techniques such as visualization, positive self-talk, and gradual exposure can help. Practicing in front of friends and focusing on the message rather than yourself are also effective.'
  },
  {
    title: 'Scenario 4: Adapting to Change',
    desc: 'Your college has switched to a new online learning platform. You find it difficult to adapt to the new system.',
    question: 'How do you cope with changes in your learning environment?',
    analysis: 'This scenario is about adaptability and resilience. Approaches include seeking help, exploring the new system step by step, and maintaining a positive attitude. Being open to change and learning from peers can ease the transition.'
  },
  {
    title: 'Scenario 5: Peer Pressure',
    desc: 'Your friends are encouraging you to skip a class to go out. You feel conflicted between joining them and attending the class.',
    question: 'How would you handle peer pressure in this situation?',
    analysis: "This scenario involves assertiveness and decision-making. Setting clear priorities, communicating your reasons, and suggesting alternatives can help. Remember, it's okay to say no to protect your goals."
  },
  {
    title: 'Scenario 6: Creative Block',
    desc: 'You are working on a project that requires creative ideas, but you feel stuck and uninspired.',
    question: 'What steps would you take to overcome a creative block?',
    analysis: 'This scenario is about creativity and problem-solving. Taking breaks, brainstorming with others, changing your environment, and allowing yourself to make mistakes can spark new ideas. Sometimes, inspiration comes when you least expect it.'
  }
];

const analysisColors = ['#6b8cff', '#ffe066', '#22d3ee', '#f87171', '#a3e635', '#f472b6'];
const analysisIcons = ['💡', '🧩', '🎤', '🔄', '🤝', '🎨'];

export default function CaseStudies() {
  const [showAnalysis, setShowAnalysis] = useState(Array(scenarios.length).fill(false));

  const handleShow = idx => {
    const updated = [...showAnalysis];
    updated[idx] = true;
    setShowAnalysis(updated);
  };

  return (
    <div className="page-container">
      <h2>Case Studies & Scenarios</h2>
      {scenarios.map((sc, idx) => (
        <div key={idx} style={{ margin: '2rem 0', padding: '1rem', background: '#f8fafc', borderRadius: '16px', boxShadow: `0 2px 12px ${analysisColors[idx % analysisColors.length]}33`, border: `2px solid ${analysisColors[idx % analysisColors.length]}` }}>
          <div style={{ fontWeight: 700, color: '#232946', fontSize: '1.15rem', marginBottom: 4 }}>{sc.title}</div>
          <div style={{ color: '#232946', margin: '0.5rem 0', fontSize: '1.05rem' }}>{sc.desc}</div>
          <div style={{ margin: '0.5rem 0', fontStyle: 'italic', color: '#6b7280' }}>{sc.question}</div>
          {!showAnalysis[idx] && <button onClick={() => handleShow(idx)} style={{ padding: '0.5rem 1.2rem', background: analysisColors[idx % analysisColors.length], color: '#232946', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '1rem', boxShadow: `0 2px 8px ${analysisColors[idx % analysisColors.length]}44`, cursor: 'pointer' }}>Show Analysis</button>}
          {showAnalysis[idx] && (
            <div style={{ marginTop: '1.2rem', color: analysisColors[idx % analysisColors.length], fontWeight: 600, fontSize: '1.08rem', display: 'flex', alignItems: 'center', gap: 10, animation: 'fadeIn 0.7s' }}>
              <span style={{ fontSize: 28 }}>{analysisIcons[idx % analysisIcons.length]}</span>
              <span>{sc.analysis}</span>
            </div>
          )}
        </div>
      ))}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
} 