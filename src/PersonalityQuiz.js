import React, { useState } from 'react';

const questions = [
  // MCQs
  {
    type: 'mcq',
    text: 'You find it easy to introduce yourself to new people.',
    options: [
      { text: 'Strongly Agree', value: 2 },
      { text: 'Agree', value: 1 },
      { text: 'Neutral', value: 0 },
      { text: 'Disagree', value: -1 },
      { text: 'Strongly Disagree', value: -2 },
    ],
  },
  {
    type: 'mcq',
    text: 'You prefer to work alone rather than in a team.',
    options: [
      { text: 'Strongly Agree', value: 2 },
      { text: 'Agree', value: 1 },
      { text: 'Neutral', value: 0 },
      { text: 'Disagree', value: -1 },
      { text: 'Strongly Disagree', value: -2 },
    ],
  },
  {
    type: 'mcq',
    text: 'You often make plans and stick to them.',
    options: [
      { text: 'Always', value: 2 },
      { text: 'Usually', value: 1 },
      { text: 'Sometimes', value: 0 },
      { text: 'Rarely', value: -1 },
      { text: 'Never', value: -2 },
    ],
  },
  {
    type: 'mcq',
    text: 'You enjoy being the center of attention.',
    options: [
      { text: 'Yes, very much', value: 2 },
      { text: 'Sometimes', value: 1 },
      { text: 'Not really', value: 0 },
      { text: 'I avoid it', value: -1 },
    ],
  },
  {
    type: 'mcq',
    text: 'You are sensitive to the feelings of others.',
    options: [
      { text: 'Always', value: 2 },
      { text: 'Often', value: 1 },
      { text: 'Sometimes', value: 0 },
      { text: 'Rarely', value: -1 },
    ],
  },
  {
    type: 'mcq',
    text: 'You adapt quickly to new situations.',
    options: [
      { text: 'Strongly Agree', value: 2 },
      { text: 'Agree', value: 1 },
      { text: 'Neutral', value: 0 },
      { text: 'Disagree', value: -1 },
    ],
  },
  // Open-ended reflective questions
  {
    type: 'open',
    text: 'How do you feel today?',
  },
  {
    type: 'open',
    text: 'What is something that made you happy recently?',
  },
  {
    type: 'open',
    text: 'When you feel stressed, what do you usually do?',
  },
  {
    type: 'open',
    text: 'What is one thing you would like to improve about yourself?',
  },
  {
    type: 'open',
    text: 'Describe a recent challenge and how you handled it.',
  },
];

export default function PersonalityQuiz() {
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
    localStorage.setItem('personalityResult', resultForScore(totalScore()));
    localStorage.setItem('personalityReflection', JSON.stringify(reflectionAnswers()));
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
    // Return array of {question, answer} for open-ended
    return questions
      .map((q, idx) => (q.type === 'open' ? { question: q.text, answer: answers[idx] } : null))
      .filter(Boolean);
  }

  function resultForScore(total) {
    if (total >= 10) return 'You are outgoing, organized, and insightful!';
    else if (total >= 5) return 'You have a balanced and empathetic personality.';
    else return 'You are more introverted and flexible.';
  }

  return (
    <div className="page-container">
      <h2>Personality Test</h2>
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