import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
//import Experience from './Experience';
import GoalsInProgress from './GoalsInProgress';
import GoalsCompleted from './GoalsCompleted';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading }, deleteAccount }, props) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    //console.log('Dashboard props:', props)


    // If the profile is null and it's still loading, we want to show the spinner
    //console.log('Dashboard profile:', profile)

    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary header-h1">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome { user && user.name }!
            {console.log('Dashboard user:', user)}
            {console.log('Dashboard profile:', profile)}
        </p>
        {profile !== null ? (
            <Fragment>
                <DashboardActions />
                <p className="dashboard-intro"><Link to='/add-education'><strong>Add a goal</strong></Link> to start training your pup. 
                Keep track of your training progress in the <strong>Goals In Progress</strong> section. Each time you work on a 
                skill, click <strong>Add Progress</strong> to log your training progress. Once you and your pup 
                have mastered a goal, click the <strong>Completed</strong> button to add it to your collection of completed skills.</p>
                {/* <Experience experience={profile.experience} /> */}
                <GoalsInProgress education={profile.education} profile={profile} />
                <GoalsCompleted education={profile.education} completedGoals={profile.completedgoals} profile={profile} />
                <divmy-2 className="delete-account-btn-container">
                    <button className="btn btn-dange delete-account-btn" onClick={() => deleteAccount()}>
                        <i className="fas fa-user-minus"></i> Delete My Account
                    </button>
                </divmy-2>
            </Fragment>
        ) : (
            <Fragment>
                <p>You have not yet setup a profile. Please add some info.</p>
                <Link to='/create-profile' className="btn btn-primary my-1">
                    Create Profile
                </Link>
            </Fragment>
        )}
    </Fragment>;
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
