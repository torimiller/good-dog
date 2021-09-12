import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
    return (
        <div className="dash-buttons">
        <Link to="/add-goal-in-progress" className="btn btn-light goal-btn"
          ><i className="fas fa-dog text-primary" alt=""></i> Add Goal</Link>
          <Link to='/edit-profile' className="btn btn-light goal-btn">
              <i className="fas fa-user-edit text-primary" alt=""></i> Edit Profile
          </Link>
      </div>
    )
};

export default DashboardActions;