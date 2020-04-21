import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
    return (
        <div class="dash-buttons">
        <Link to="/add-education" class="btn btn-light goal-btn"
          ><i class="fas fa-dog text-primary"></i> Add Goal</Link>
      </div>
    )
};

export default DashboardActions;