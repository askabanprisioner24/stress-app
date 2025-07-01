import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const quizKeys = [
  { key: 'personalityResult', label: 'Personality Test', icon: '🧠', color: '#6b8cff', route: '/assessments/personality' },
  { key: 'intelligenceResult', label: 'Intelligence & Aptitude Quiz', icon: '📊', color: '#ffe066', route: '/assessments/intelligence' },
  { key: 'learningStyleResult', label: 'Learning Style Inventory', icon: '📚', color: '#22d3ee', route: '/assessments/learning-style' },
  { key: 'stressResult', label: 'Stress Level Assessment', icon: '💪', color: '#f87171', route: '/assessments/stress' },
];

const dailyTips = [
  "You are stronger than you think. Take a deep breath and keep going!",
  "A 5-minute mindful break can reset your whole day.",
  "Progress, not perfection. Celebrate small wins!",
  "Talking to someone you trust can halve your stress.",
  "Engineers solve problems—start with your own well-being!",
  "Sleep is the best meditation. Prioritize rest tonight.",
  "Learning your stress triggers is the first step to mastering them.",
  "A positive mindset is a powerful engineering tool.",
  "You can't pour from an empty cup. Take care of yourself first.",
  "Every challenge is an opportunity to grow."
];

function getFirstName() {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.fullName) return user.fullName.split(' ')[0];
  } catch {}
  return 'User';
}

function getScore(result) {
  // Try to extract a number from the result string for demo bar chart
  if (!result) return 0;
  const match = result.match(/\d+/);
  if (match) return Math.min(100, parseInt(match[0], 10));
  // Fallback: assign a random score for demo
  return Math.floor(Math.random() * 100);
}

function getTodayTip() {
  const day = new Date().getDate();
  return dailyTips[day % dailyTips.length];
}

function getLowScoreQuiz(results) {
  for (const q of quizKeys) {
    const score = getScore(results[q.key]);
    if (results[q.key] && score < 20) {
      return { ...q, score };
    }
  }
  return null;
}

export default function Dashboard() {
  const [results, setResults] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const stored = {};
    quizKeys.forEach(q => {
      const val = localStorage.getItem(q.key);
      if (val) stored[q.key] = val;
    });
    setResults(stored);
  }, []);

  const completed = quizKeys.filter(q => results[q.key]);
  const notCompleted = quizKeys.filter(q => !results[q.key]);
  const lowScoreQuiz = getLowScoreQuiz(results);

  return (
    <div className="page-container">
      {/* Low Score Support Section */}
      {lowScoreQuiz && (
        <div style={{
          background: 'linear-gradient(90deg, #f87171 0%, #ffe066 100%)',
          color: '#232946',
          borderRadius: 18,
          boxShadow: '0 4px 24px #f8717144',
          padding: '1.5rem 2rem',
          marginBottom: 32,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
          maxWidth: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>💡 Support for You</div>
          <div style={{ fontSize: '1.08rem', marginBottom: 6, textAlign: 'center' }}>
            It's okay to have a low score in <b>{lowScoreQuiz.label}</b> ({lowScoreQuiz.score}%). This is just a starting point—growth is always possible!
          </div>
          {/* Encouragement Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 28 }}>🏅</span>
            <span style={{ fontWeight: 600, color: '#3c50ff' }}>Resilience Starter</span>
          </div>
          {/* Recommended Resource Card */}
          <div style={{
            background: '#232946',
            color: '#ffe066',
            borderRadius: 14,
            boxShadow: '0 2px 8px #23294655',
            padding: '1.1rem 1.5rem',
            marginBottom: 4,
            fontWeight: 500,
            fontSize: '1.05rem',
            textAlign: 'center',
            maxWidth: 420,
          }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Recommended for You</div>
            {lowScoreQuiz.key === 'stressResult' ? (
              <span>Try a <a href="/toolkit" style={{ color: '#22d3ee', textDecoration: 'underline' }}>stress management exercise</a> from the Toolkit!</span>
            ) : (
              <span>Check out our <a href="/resources" style={{ color: '#22d3ee', textDecoration: 'underline' }}>Resource Library</a> for tips and strategies.</span>
            )}
          </div>
          {/* Contact Counselor/Emergency */}
          <div style={{ marginTop: 8, fontSize: '1rem', color: '#232946', fontWeight: 600 }}>
            <span style={{ marginRight: 8 }}>Need support?</span>
            <a href={`tel:${localStorage.getItem('counsellorContactNumber') || ''}`} style={{ color: '#3c50ff', textDecoration: 'underline', marginRight: 12 }}>Call Counselor</a>
            <a href={`tel:${localStorage.getItem('emergencyContactNumber') || ''}`} style={{ color: '#f87171', textDecoration: 'underline' }}>Emergency Contact</a>
          </div>
        </div>
      )}
      {/* Daily Tip Card */}
      <div style={{
        background: 'linear-gradient(90deg, #ffe066 0%, #3c50ff 100%)',
        color: '#232946',
        borderRadius: 16,
        boxShadow: '0 4px 24px #3c50ff44',
        padding: '1.2rem 2rem',
        marginBottom: 28,
        fontWeight: 600,
        fontSize: '1.13rem',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        position: 'relative',
        zIndex: 2,
        maxWidth: 520,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <span style={{ fontSize: 28, marginRight: 10, filter: 'drop-shadow(0 0 8px #ffe066cc)' }}>🌟</span>
        <span>{getTodayTip()}</span>
      </div>
      <h2 style={{ color: '#ffe066' }}>Welcome, {getFirstName()}!</h2>
      <div style={{ fontSize: '1.1rem', color: '#f8fafd', marginBottom: 24 }}>
        Here's a snapshot of your psychological self-assessments and progress.
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'center', marginBottom: 32 }}>
        {quizKeys.map((q, idx) => (
          <div key={q.key} style={{
            background: 'rgba(30,34,44,0.98)',
            borderRadius: 20,
            boxShadow: `0 4px 24px 0 ${q.color}44` ,
            border: `2.5px solid ${q.color}`,
            minWidth: 260,
            maxWidth: 320,
            padding: '2rem 1.5rem',
            marginBottom: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>{q.icon}</div>
            <div style={{ fontWeight: 700, color: q.color, fontSize: '1.18rem', marginBottom: 12, textAlign: 'center' }}>{q.label}</div>
            {results[q.key] ? (
              <>
                <div style={{ color: '#fff', fontSize: '1.08rem', marginBottom: 10, textAlign: 'center' }}>{results[q.key]}</div>
                {/* Simple bar chart for score */}
                <div style={{ width: '100%', margin: '0.7rem 0 1.2rem 0', height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="90%" height="24">
                    <rect x="0" y="6" width="100%" height="12" rx="6" fill="#232946" />
                    <rect x="0" y="6" width={`${getScore(results[q.key])}%`} height="12" rx="6" fill={q.color} style={{ filter: 'drop-shadow(0 0 8px ' + q.color + '88)' }} />
                  </svg>
                  <span style={{ color: q.color, fontWeight: 700, marginLeft: 8 }}>{getScore(results[q.key])}%</span>
                </div>
                <button style={{ marginTop: 8, background: q.color, color: '#232946', fontWeight: 700, borderRadius: 10, fontSize: '1rem', padding: '0.5rem 1.5rem', boxShadow: `0 2px 8px ${q.color}44` }} onClick={() => navigate(q.route)}>Retake Assessment</button>
              </>
            ) : (
              <button style={{ marginTop: 8, background: q.color, color: '#232946', fontWeight: 700, borderRadius: 10, fontSize: '1rem', padding: '0.5rem 1.5rem', boxShadow: `0 2px 8px ${q.color}44` }} onClick={() => navigate(q.route)}>Take Assessment</button>
            )}
          </div>
        ))}
      </div>
      <div style={{ margin: '2.5rem 0 0 0', textAlign: 'center' }}>
        <h3 style={{ color: '#a3bffa', marginBottom: 12 }}>Recent Progress</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap' }}>
          <div style={{ background: '#232946', borderRadius: 16, padding: '1.2rem 2rem', boxShadow: '0 2px 8px #23294655', minWidth: 220 }}>
            <div style={{ color: '#ffe066', fontWeight: 600, fontSize: '1.1rem', marginBottom: 8 }}>Assessments Completed</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#22d3ee' }}>{completed.length} / {quizKeys.length}</div>
            <div style={{ color: '#f8fafd', fontSize: '0.98rem', marginTop: 4 }}>{completed.length === quizKeys.length ? 'All assessments completed!' : 'Complete all to unlock your full profile.'}</div>
          </div>
          <div style={{ background: '#232946', borderRadius: 16, padding: '1.2rem 2rem', boxShadow: '0 2px 8px #23294655', minWidth: 220 }}>
            <div style={{ color: '#ffe066', fontWeight: 600, fontSize: '1.1rem', marginBottom: 8 }}>Last Activity</div>
            <div style={{ color: '#f8fafd', fontSize: '1rem' }}>{completed.length > 0 ? `You last completed: ${completed[completed.length-1].label}` : 'No activity yet.'}</div>
          </div>
        </div>
      </div>
    </div>
  );
} 