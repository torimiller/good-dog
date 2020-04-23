import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
    return (
        <div class="dash-buttons">
        <Link to="/add-goal-in-progress" class="btn btn-light goal-btn"
          ><i class="fas fa-dog text-primary" alt=""></i> Add Goal</Link>
          <Link to='/edit-profile' class="btn btn-light goal-btn">
              <i className="fas fa-user-edit" alt=""></i> Edit Profile
          </Link>
      </div>
    )
};

export default DashboardActions;