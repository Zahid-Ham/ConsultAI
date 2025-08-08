import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated, user, isDoctor, isPatient } = useAuthContext();

  return (
    <div className="home-container">
      <div className="welcome-card">
        <h1>Welcome to ConsultAI</h1>
        <p className="subtitle">Your trusted healthcare consultation platform</p>
        
        {!isAuthenticated() && (
          <div className="cta-buttons">
            <a href="/login" className="btn btn-primary">Sign In</a>
            <a href="/register" className="btn btn-secondary">Create Account</a>
          </div>
        )}

        {isAuthenticated() && (
          <div className="cta-buttons">
            <span className="welcome-user">Welcome, {user?.name}!</span>
            {isPatient() && (
              <a href="/dashboard" className="btn btn-primary">Go to Patient Dashboard</a>
            )}
            {isDoctor() && (
              <a href="/dashboard" className="btn btn-primary">Go to Doctor Dashboard</a>
            )}
          </div>
        )}
      </div>
      
      <div className="features">
        <div className="feature">
          <h3>Online Consultations</h3>
          <p>Connect with qualified doctors from the comfort of your home.</p>
        </div>
        <div className="feature">
          <h3>Secure & Private</h3>
          <p>Your health information is protected with industry-standard security.</p>
        </div>
        <div className="feature">
          <h3>24/7 Availability</h3>
          <p>Access healthcare services anytime, anywhere.</p>
        </div>
        <div className="feature">
          <h3>
            {isPatient() ? 'Chat with AI' : isDoctor() ? 'Chat with Patients' : 'AI Chat'}
          </h3>
          <p>
            {isPatient()
              ? 'Get instant answers and support from our AI health assistant.'
              : isDoctor()
              ? 'Communicate securely with your patients in real-time.'
              : 'Experience smart, interactive healthcare chat powered by AI.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;