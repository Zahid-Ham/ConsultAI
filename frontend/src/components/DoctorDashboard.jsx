import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';

const DoctorDashboard = () => {
  const { user } = useAuthContext();
  const [isVerified, setIsVerified] = useState(false);
  
  useEffect(() => {
    // Check if the doctor is verified
    if (user && user.role === 'doctor') {
      setIsVerified(user.isVerified);
    }
  }, [user]);

  if (!isVerified) {
    return (
      <div className="dashboard-container">
        <div className="verification-pending">
          <h2>Verification Pending</h2>
          <p>Your doctor account is currently under review by our administrators.</p>
          <p>You will gain full access to the platform once your credentials are verified.</p>
          <div className="status-indicator pending">
            <span className="status-dot"></span>
            <span className="status-text">Pending Verification</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Doctor Dashboard</h1>
        <p>Welcome, Dr. {user?.name}</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Patients</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="stat-card">
          <h3>Consultations</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="stat-card">
          <h3>Upcoming</h3>
          <p className="stat-number">0</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <p className="no-data">No recent activity found.</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          <button className="btn btn-primary">View Schedule</button>
          <button className="btn btn-primary">Update Profile</button>
          <button className="btn btn-primary">Message Patients</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;