import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import GoalsInProgress from './GoalsInProgress';
import GoalsCompleted from './GoalsCompleted';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary header-h1">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user" alt=""></i> Welcome { user && user.name }!
        </p>
        {profile !== null ? (
            <Fragment>
                <DashboardActions />
                <p className="dashboard-intro"><Link to='/add-goal-in-progress'><strong>Add a goal</strong></Link> to start training your pup. 
                Keep track of your training progress in the <strong>Goals In Progress</strong> section. Each time you work on a 
                skill, click <strong>Add Progress</strong> to log your training progress. To view the progress of a single goal, click <strong>View Progress</strong>. Once you and your pup 
                have mastered a goal, click the <strong>Completed</strong> button to add it to your collection of completed skills.</p>
                <GoalsInProgress goalsinprogress={profile.goalsinprogress} profile={profile} />
                <GoalsCompleted goalsinprogress={profile.goalsinprogress} completedGoals={profile.completedgoals} profile={profile} />
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
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
