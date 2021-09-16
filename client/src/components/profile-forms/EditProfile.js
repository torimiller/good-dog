import React, { Fragment, useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';


const EditProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {
    const [formData, setFormData] = useState({
        dogName: ''
    });

    useEffect(() => {
        getCurrentProfile();
    }, [loading, getCurrentProfile]);

    const {
        dogName
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true);
    }

    return (
        <Fragment>
        <section className="container">
        <h1 className="large text-primary">
            Edit Your Profile
        </h1>
        <p className="lead">
            What's your pup's name?
        </p>
        <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
            <input type="text" placeholder="Dog's Name" name="dogName" value={dogName} onChange={e => onChange(e)} />
            </div>        
            <input type="submit" className="btn btn-primary my-1" />
            <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
        </form>
      </section>
    </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));