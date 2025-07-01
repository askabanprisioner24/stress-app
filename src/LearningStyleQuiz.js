import React, { useState } from 'react';

const questions = [
  // MCQs (12)
  {
    type: 'mcq',
    text: 'I remember best by seeing pictures, diagrams, or charts.',
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
    text: 'I learn better when I listen to lectures or discussions.',
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
    text: 'I prefer hands-on activities and learning by doing.',
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
    text: 'I like to draw or doodle when learning.',
    options: [
      { text: 'Always', value: 2 },
      { text: 'Often', value: 1 },
      { text: 'Sometimes', value: 0 },
      { text: 'Rarely', value: -1 },
    ],
  },
  {
    type: 'mcq',
    text: 'I repeat information out loud to remember it.',
    options: [
      { text: 'Always', value: 2 },
      { text: 'Often', value: 1 },
      { text: 'Sometimes', value: 0 },
      { text: 'Rarely', value: -1 },
    ],
  },
  {
    type: 'mcq',
    text: 'I use gestures or move around when thinking.',
    options: [
      { text: 'Always', value: 2 },
      { text: 'Often', value: 1 },
      { text: 'Sometimes', value: 0 },
      { text: 'Rarely', value: -1 },
    ],
  },
  {
    type: 'mcq',
    text: 'I prefer to study in a quiet environment.',
    options: [
      { text: 'Strongly Agree', value: 2 },
      { text: 'Agree', value: 1 },
      { text: 'Neutral', value: 0 },
      { text: 'Disagree', value: -1 },
    ],
  },
  {
    type: 'mcq',
    text: 'I like to use color coding or highlighting when studying.',
    options: [
      { text: 'Always', value: 2 },
      { text: 'Often', value: 1 },
      { text: 'Sometimes', value: 0 },
      { text: 'Rarely', value: -1 },
    ],
  },
  {
    type: 'mcq',
    text: 'I enjoy group study sessions.',
    options: [
      { text: 'Strongly Agree', value: 2 },
      { text: 'Agree', value: 1 },
      { text: 'Neutral', value: 0 },
      { text: 'Disagree', value: -1 },
    ],
  },
  {
    type: 'mcq',
    text: 'I prefer to learn by reading and writing.',
    options: [
      { text: 'Strongly Agree', value: 2 },
      { text: 'Agree', value: 1 },
      { text: 'Neutral', value: 0 },
      { text: 'Disagree', value: -1 },
    ],
  },
  {
    type: 'mcq',
    text: 'I remember information better when I teach it to someone else.',
    options: [
      { text: 'Always', value: 2 },
      { text: 'Often', value: 1 },
      { text: 'Sometimes', value: 0 },
      { text: 'Rarely', value: -1 },
    ],
  },
  {
    type: 'mcq',
    text: 'I like to use apps or technology to help me learn.',
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
    text: 'Describe a time you learned something new quickly.',
  },
  {
    type: 'open',
    text: 'What is your favorite way to study?',
  },
  {
    type: 'open',
    text: 'How do you stay motivated when learning something challenging?',
  },
  {
    type: 'open',
    text: 'What helps you remember information best?',
  },
  {
    type: 'open',
    text: 'Describe a learning strategy that works well for you.',
  },
  {
    type: 'open',
    text: 'How do you handle distractions while studying?',
  },
  {
    type: 'open',
    text: 'What is a skill you want to learn and why?',
  },
  {
    type: 'open',
    text: 'How do you feel when you master a new topic?',
  },
];

export default function LearningStyleQuiz() {
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
    localStorage.setItem('learningStyleResult', resultForScore(totalScore()));
    localStorage.setItem('learningStyleReflection', JSON.stringify(reflectionAnswers()));
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
    if (total >= 18) return 'You are a highly adaptive and strategic learner!';
    else if (total >= 10) return 'You have a balanced and effective learning style.';
    else return 'You may benefit from exploring new learning strategies.';
  }

  return (
    <div className="page-container">
      <h2>Learning Style Inventory</h2>
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