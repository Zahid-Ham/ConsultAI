import React from 'react';

const Home = () => {
  return (
    <div className="home-container">
      <div className="welcome-card">
        <h1>Welcome to ConsultAI</h1>
        <p className="subtitle">Your trusted healthcare consultation platform</p>
        
        <div className="cta-buttons">
          <a href="/login" className="btn btn-primary">Sign In</a>
          <a href="/register" className="btn btn-secondary">Create Account</a>
        </div>
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
      </div>
    </div>
  );
};

export default Home;