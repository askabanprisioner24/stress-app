import React, { useState } from 'react';

const questions = [
  // MCQs (12)
  {
    type: 'mcq',
    text: 'I often feel overwhelmed by my workload.',
    options: [
      { text: 'Very Often', value: 2 },
      { text: 'Often', value: 1 },
      { text: 'Sometimes', value: 0 },
      { text: 'Rarely', value: -1 },
      { text: 'Never', value: -2 },
    ],
  },
  {
    type: 'mcq',
    text: 'I have trouble relaxing after a busy day.',
    options: [
      { text: 'Very Often', value: 2 },
      { text: 'Often', value: 1 },
      { text: 'Sometimes', value: 0 },
      { text: 'Rarely', value: -1 },
      { text: 'Never', value: -2 },
    ],
  },
  {
    type: 'mcq',
    text: 'I experience headaches, fatigue, or sleep problems.',
    options: [
      { text: 'Very Often', value: 2 },
      { text: 'Often', value: 1 },
      { text: 'Sometimes', value: 0 },
      { text: 'Rarely', value: -1 },
      { text: 'Never', value: -2 },
    ],
  },
  {
    type: 'mcq',
    text: 'I find it hard to concentrate on tasks.',
    options: [
      { text: 'Very Often', value: 2 },
      { text: 'Often', value: 1 },
      { text: 'Sometimes', value: 0 },
      { text: 'Rarely', value: -1 },
      { text: 'Never', value: -2 },
    ],
  },
  {
    type: 'mcq',
    text: 'I feel irritable or impatient frequently.',
    options: [
      { text: 'Very Often', value: 2 },
      { text: 'Often', value: 1 },
      { text: 'Sometimes', value: 0 },
      { text: 'Rarely', value: -1 },
      { text: 'Never', value: -2 },
    ],
  },
  {
    type: 'mcq',
    text: 'I avoid social situations because of stress.',
    options: [
      { text: 'Very Often', value: 2 },
      { text: 'Often', value: 1 },
      { text: 'Sometimes', value: 0 },
      { text: 'Rarely', value: -1 },
      { text: 'Never', value: -2 },
    ],
  },
  {
    type: 'mcq',
    text: 'I use relaxation techniques (e.g., deep breathing, meditation) to manage stress.',
    options: [
      { text: 'Always', value: 2 },
      { text: 'Often', value: 1 },
      { text: 'Sometimes', value: 0 },
      { text: 'Rarely', value: -1 },
    ],
  },
  {
    type: 'mcq',
    text: 'I talk to friends or family when I feel stressed.',
    options: [
      { text: 'Always', value: 2 },
      { text: 'Often', value: 1 },
      { text: 'Sometimes', value: 0 },
      { text: 'Rarely', value: -1 },
    ],
  },
  {
    type: 'mcq',
    text: 'I am able to stay positive even in stressful situations.',
    options: [
      { text: 'Always', value: 2 },
      { text: 'Often', value: 1 },
      { text: 'Sometimes', value: 0 },
      { text: 'Rarely', value: -1 },
    ],
  },
  {
    type: 'mcq',
    text: 'I am able to manage my time effectively.',
    options: [
      { text: 'Always', value: 2 },
      { text: 'Often', value: 1 },
      { text: 'Sometimes', value: 0 },
      { text: 'Rarely', value: -1 },
    ],
  },
  {
    type: 'mcq',
    text: 'I feel confident in my ability to cope with stress.',
    options: [
      { text: 'Always', value: 2 },
      { text: 'Often', value: 1 },
      { text: 'Sometimes', value: 0 },
      { text: 'Rarely', value: -1 },
    ],
  },
  {
    type: 'mcq',
    text: 'I am able to recognize when I need a break.',
    options: [
      { text: 'Always', value: 2 },
      { text: 'Often', value: 1 },
      { text: 'Sometimes', value: 0 },
      { text: 'Rarely', value: -1 },
    ],
  },
  // Open-ended (8)
  {
    type: 'open',
    text: 'Describe a recent stressful situation and how you managed it.',
  },
  {
    type: 'open',
    text: 'What are your favorite ways to relax?',
  },
  {
    type: 'open',
    text: 'How do you know when you are feeling stressed?',
  },
  {
    type: 'open',
    text: 'What support systems do you rely on during stressful times?',
  },
  {
    type: 'open',
    text: 'Describe a time you overcame a stressful challenge.',
  },
  {
    type: 'open',
    text: 'What advice would you give to someone feeling stressed?',
  },
  {
    type: 'open',
    text: 'How do you balance work, study, and relaxation?',
  },
  {
    type: 'open',
    text: 'How do you feel after successfully managing a stressful situation?',
  },
];

export default function StressQuiz() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (qIdx, value) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = value;
    setAnswers(newAnswers);
  };

  const handleOpenChange = (qIdx, value) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    localStorage.setItem('stressResult', resultForScore(totalScore()));
    localStorage.setItem('stressReflection', JSON.stringify(reflectionAnswers()));
  };

  function totalScore() {
    let score = 0;
    questions.forEach((q, idx) => {
      if (q.type === 'mcq') {
        score += Number(answers[idx] || 0);
      }
    });
    return score;
  }

  function reflectionAnswers() {
    return questions
      .map((q, idx) => (q.type === 'open' ? { question: q.text, answer: answers[idx] } : null))
      .filter(Boolean);
  }

  function resultForScore(total) {
    if (total >= 18) return 'You are highly resilient and manage stress well!';
    else if (total >= 10) return 'You have a balanced approach to stress.';
    else return 'You may benefit from new stress management strategies.';
  }

  return (
    <div className="page-container">
      <h2>Stress Level Assessment</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((q, idx) => (
          <div key={idx} style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontWeight: 500 }}>{q.text}</div>
            {q.type === 'mcq' ? (
              q.options.map((opt, oIdx) => (
                <label key={oIdx} style={{ marginRight: '1.5rem', display: 'inline-block' }}>
                  <input
                    type="radio"
                    name={`q${idx}`}
                    value={opt.value}
                    checked={answers[idx] === opt.value}
                    onChange={() => handleChange(idx, opt.value)}
                    required
                  />{' '}
                  <span>{opt.text}</span>
                </label>
              ))
            ) : (
              <textarea
                value={answers[idx] || ''}
                onChange={e => handleOpenChange(idx, e.target.value)}
                placeholder="Type your answer..."
                style={{
                  padding: '0.5rem',
                  borderRadius: '6px',
                  border: '1.5px solid #ffe066',
                  background: '#232946',
                  color: '#ffe066',
                  fontSize: '1rem',
                  marginTop: '0.5rem',
                  width: '90%',
                  minHeight: '2.5em',
                  resize: 'vertical',
                }}
                required
              />
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {submitted && (
        <div style={{ marginTop: '2rem', fontSize: '1.2rem', color: '#2563eb', fontWeight: 600 }}>
          <div>{resultForScore(totalScore())}</div>
          <div style={{ marginTop: '1.5rem', color: '#ffe066', fontWeight: 500 }}>
            <div>Your Reflections:</div>
            <ul style={{ color: '#e0e6f7', marginTop: '0.5rem' }}>
              {reflectionAnswers().map((r, i) => (
                <li key={i} style={{ marginBottom: '0.7rem' }}>
                  <span style={{ color: '#ffe066' }}>{r.question}</span>
                  <br />
                  <span style={{ color: '#e0e6f7' }}>{r.answer}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
} 