import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';

const PatientDashboard = () => {
  const { user } = useAuthContext();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Patient Dashboard</h1>
        <p>Welcome, {user?.name}</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Appointments</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="stat-card">
          <h3>Consultations</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="stat-card">
          <h3>Prescriptions</h3>
          <p className="stat-number">0</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Upcoming Appointments</h2>
        <div className="appointments-list">
          <p className="no-data">No upcoming appointments found.</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Find a Doctor</h2>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search by specialty, name, or condition"
            className="search-input"
          />
          <button className="btn btn-primary">Search</button>
        </div>
        <div className="doctors-list">
          <p className="no-data">No doctors found. Try searching for a specialty.</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          <button className="btn btn-primary">Book Appointment</button>
          <button className="btn btn-primary">View Medical Records</button>
          <button className="btn btn-primary">Message Doctor</button>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;