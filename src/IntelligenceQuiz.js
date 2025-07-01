import React, { useState } from 'react';

const questions = [
  // MCQs (12)
  {
    type: 'mcq',
    text: 'You enjoy solving puzzles and logical problems.',
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
    text: 'You can easily spot patterns in data or information.',
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
    text: 'You are good at understanding abstract concepts.',
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
    text: 'You can perform mental calculations quickly.',
    options: [
      { text: 'Strongly Agree', value: 2 },
      { text: 'Agree', value: 1 },
      { text: 'Neutral', value: 0 },
      { text: 'Disagree', value: -1 },
    ],
  },
  {
    type: 'mcq',
    text: 'You can visualize objects and spaces in your mind easily.',
    options: [
      { text: 'Strongly Agree', value: 2 },
      { text: 'Agree', value: 1 },
      { text: 'Neutral', value: 0 },
      { text: 'Disagree', value: -1 },
    ],
  },
  {
    type: 'mcq',
    text: 'You can learn new languages or codes quickly.',
    options: [
      { text: 'Strongly Agree', value: 2 },
      { text: 'Agree', value: 1 },
      { text: 'Neutral', value: 0 },
      { text: 'Disagree', value: -1 },
    ],
  },
  {
    type: 'mcq',
    text: 'You enjoy brainstorming creative ideas.',
    options: [
      { text: 'Always', value: 2 },
      { text: 'Often', value: 1 },
      { text: 'Sometimes', value: 0 },
      { text: 'Rarely', value: -1 },
    ],
  },
  {
    type: 'mcq',
    text: 'You are comfortable with complex mathematical concepts.',
    options: [
      { text: 'Strongly Agree', value: 2 },
      { text: 'Agree', value: 1 },
      { text: 'Neutral', value: 0 },
      { text: 'Disagree', value: -1 },
    ],
  },
  {
    type: 'mcq',
    text: 'You can remember information easily.',
    options: [
      { text: 'Always', value: 2 },
      { text: 'Often', value: 1 },
      { text: 'Sometimes', value: 0 },
      { text: 'Rarely', value: -1 },
    ],
  },
  {
    type: 'mcq',
    text: 'You enjoy analyzing problems from different angles.',
    options: [
      { text: 'Always', value: 2 },
      { text: 'Often', value: 1 },
      { text: 'Sometimes', value: 0 },
      { text: 'Rarely', value: -1 },
    ],
  },
  {
    type: 'mcq',
    text: 'You are good at organizing information logically.',
    options: [
      { text: 'Strongly Agree', value: 2 },
      { text: 'Agree', value: 1 },
      { text: 'Neutral', value: 0 },
      { text: 'Disagree', value: -1 },
    ],
  },
  {
    type: 'mcq',
    text: 'You can focus on tasks for long periods without getting distracted.',
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
    text: 'Describe a time you solved a difficult problem.',
  },
  {
    type: 'open',
    text: 'What is your favorite way to learn something new?',
  },
  {
    type: 'open',
    text: 'How do you handle tasks that seem overwhelming at first?',
  },
  {
    type: 'open',
    text: 'What motivates you to keep learning?',
  },
  {
    type: 'open',
    text: 'Describe a situation where you had to think creatively.',
  },
  {
    type: 'open',
    text: 'How do you approach a problem you have never seen before?',
  },
  {
    type: 'open',
    text: 'What is a skill you would like to improve and why?',
  },
  {
    type: 'open',
    text: 'How do you feel when you accomplish a challenging task?',
  },
];

export default function IntelligenceQuiz() {
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
    localStorage.setItem('intelligenceResult', resultForScore(totalScore()));
    localStorage.setItem('intelligenceReflection', JSON.stringify(reflectionAnswers()));
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
    if (total >= 18) return 'You have exceptional analytical and creative intelligence!';
    else if (total >= 10) return 'You have a balanced and adaptable intelligence.';
    else return 'You may prefer practical or creative tasks.';
  }

  return (
    <div className="page-container">
      <h2>Intelligence & Aptitude Quiz</h2>
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