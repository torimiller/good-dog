import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if(isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

    return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Good Dog</h1>
          <p className="lead">
            Keep track of your dog's training progress with <strong>Good Dog</strong>. Build a custom set of goals
            to teach your dog, either by choosing from our list of skills, or creating your own. Each 
            session of training can be logged for each goal. When your pup has mastered the skill,
            you can add it to your collection of completed goals!
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
            <Link to="/login-demo" className="btn btn-light">Try Demo</Link>
          </div>
        </div>
      </div>
    </section>
    )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);