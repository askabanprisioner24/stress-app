import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Assessments from './Assessments';
import PersonalityQuiz from './PersonalityQuiz';
import IntelligenceQuiz from './IntelligenceQuiz';
import LearningStyleQuiz from './LearningStyleQuiz';
import StressQuiz from './StressQuiz';
import Dashboard from './Dashboard';
import Toolkit from './Toolkit';
import CaseStudies from './CaseStudies';
import Resources from './Resources';
import Login from './Login';
import Signup from './Signup';
import { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext';

const testimonials = [
  {
    quote: "The greatest weapon against stress is our ability to choose one thought over another.",
    author: "William James (Father of American psychology)"
  },
  {
    quote: "Knowing yourself is the beginning of all wisdom.",
    author: "Aristotle"
  },
  {
    quote: "Self-care is not a luxury, it is a necessity.",
    author: "Audre Lorde"
  },
  {
    quote: "This app helped me understand my stress triggers and manage them better!",
    author: "Student User"
  },
  {
    quote: "Taking the quizzes made me more aware of my learning style. Highly recommended!",
    author: "Engineering Student"
  },
  {
    quote: "Sometimes asking for help is the bravest move you can make.",
    author: "Unknown"
  },
  {
    quote: "Mental health is just as important as physical health.",
    author: "World Health Organization"
  }
];

function TestimonialCarousel() {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const timer = setTimeout(() => setIdx((idx + 1) % testimonials.length), 6000);
    return () => clearTimeout(timer);
  }, [idx]);
  return (
    <div style={{
      background: 'linear-gradient(90deg, #3c50ff 0%, #ffe066 100%)',
      color: '#232946',
      borderRadius: 16,
      boxShadow: '0 4px 24px #3c50ff44',
      padding: '1.5rem 2.2rem',
      margin: '2.5rem auto 0 auto',
      maxWidth: 600,
      minHeight: 120,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      fontSize: '1.18rem',
      fontWeight: 500,
      transition: 'box-shadow 0.3s',
    }}>
      <span style={{ fontSize: 32, marginBottom: 10, filter: 'drop-shadow(0 0 8px #ffe066cc)' }}>❝</span>
      <span style={{ textAlign: 'center', marginBottom: 12 }}>{testimonials[idx].quote}</span>
      <span style={{ fontSize: '1rem', color: '#232946cc', fontWeight: 700, marginBottom: 4 }}>— {testimonials[idx].author}</span>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        {testimonials.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{
            width: 12, height: 12, borderRadius: '50%', border: 'none', background: i === idx ? '#232946' : '#ffe066', cursor: 'pointer', transition: 'background 0.2s',
            boxShadow: i === idx ? '0 0 8px #23294688' : 'none',
            margin: 0, padding: 0
          }} aria-label={`Go to testimonial ${i+1}`}></button>
        ))}
      </div>
    </div>
  );
}

const Home = () => {
  const [showChat, setShowChat] = useState(false);
  return (
    <div className="page-container" style={{ position: 'relative', minHeight: '80vh' }}>
      <h2>Welcome to Psyche360</h2>
      <p>Your portal for Applied Psychology self-assessment and stress management.</p>
      <TestimonialCarousel />
      {/* Chatbot Button */}
      <button
        onClick={() => setShowChat(true)}
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1000,
          background: '#ffe066',
          color: '#232946',
          border: 'none',
          borderRadius: '50%',
          width: 60,
          height: 60,
          boxShadow: '0 4px 16px #23294644',
          fontSize: 32,
          cursor: 'pointer',
          display: showChat ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Open Chatbot"
      >💬</button>
      {/* Chatbot Popup */}
      {showChat && (
        <div
          style={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            zIndex: 1100,
            width: 400,
            maxWidth: '95vw',
            height: 600,
            background: '#181c24',
            borderRadius: 16,
            boxShadow: '0 8px 32px #23294699',
            border: '2px solid #ffe066',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 8 }}>
            <button
              onClick={() => setShowChat(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffe066',
                fontSize: 28,
                fontWeight: 'bold',
                cursor: 'pointer',
                marginRight: 4,
              }}
              aria-label="Close Chatbot"
            >×</button>
          </div>
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/yfjRdj6_aH5pqelenb0P6"
            width="100%"
            style={{ flex: 1, border: 'none', borderRadius: '0 0 16px 16px', background: '#fff' }}
            frameBorder="0"
            title="Chatbot"
            allow="clipboard-write"
          ></iframe>
        </div>
      )}
    </div>
  );
};

function PrivateRoute({ children }) {
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();
  if (!isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function AppContent() {
  const { isLoggedIn, logout } = useAuth();
  const loggedIn = isLoggedIn();
  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#232946', marginBottom: '2rem' }}>
        {loggedIn && <>
          <Link to="/" style={{ margin: '0 1rem' }}>Home</Link>
          <Link to="/assessments" style={{ margin: '0 1rem' }}>Assessments</Link>
          <Link to="/dashboard" style={{ margin: '0 1rem' }}>Dashboard</Link>
          <Link to="/toolkit" style={{ margin: '0 1rem' }}>Toolkit</Link>
          <Link to="/case-studies" style={{ margin: '0 1rem' }}>Case Studies</Link>
          <Link to="/resources" style={{ margin: '0 1rem' }}>Resources</Link>
        </>}
        {!loggedIn && <>
          <Link to="/login" style={{ margin: '0 1rem', float: 'right' }}>Login</Link>
          <Link to="/signup" style={{ margin: '0 1rem', float: 'right' }}>Sign Up</Link>
        </>}
        {loggedIn && <Link to="#" style={{ margin: '0 1rem', float: 'right' }} onClick={() => { logout(); }}>Logout</Link>}
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/assessments" element={<PrivateRoute><Assessments /></PrivateRoute>} />
        <Route path="/assessments/personality" element={<PrivateRoute><PersonalityQuiz /></PrivateRoute>} />
        <Route path="/assessments/intelligence" element={<PrivateRoute><IntelligenceQuiz /></PrivateRoute>} />
        <Route path="/assessments/learning-style" element={<PrivateRoute><LearningStyleQuiz /></PrivateRoute>} />
        <Route path="/assessments/stress" element={<PrivateRoute><StressQuiz /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/toolkit" element={<PrivateRoute><Toolkit /></PrivateRoute>} />
        <Route path="/case-studies" element={<PrivateRoute><CaseStudies /></PrivateRoute>} />
        <Route path="/resources" element={<PrivateRoute><Resources /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
