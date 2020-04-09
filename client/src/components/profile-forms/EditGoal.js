import React, { Fragment, useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

//const EditGoal = ({ education: { goal, date, timepracticed, notes }, createProfile, getCurrentProfile, history }) => {
const EditGoal = ({ profile: { profile, loading } }) => {
    console.log('profile:', profile)
    // const education = props.profile.profile.education;
    // console.log('EditGoal education:', education);
    const [formData, setFormData] = useState({
        goal: '',
        date: '',
        timepracticed: '',
        notes: ''
    });


    //const [displaySocialInputs, toggleSocialInputs] = useState(false);

    // useEffect(() => {
    //     getCurrentProfile();

    //     setFormData({
    //         goal: loading || !education.goal ? '' : education.goal,
    //         date: loading || !education.date ? '' : education.date,
    //         timepracticed: loading || !education.timepracticed ? '' : education.timepracticed,
    //         notes: loading || !education.notes ? '' : education.notes
            
    //     });
    // }, [loading, getCurrentProfile]);

    // const {
    //     goal,
    //     date,
    //     timepracticed,
    //     notes
    // } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        //createProfile(formData, history, true);
    }

    return (
        <Fragment>
        <section className="container">
        <h1 className="large text-primary">
            Edit Current Goal
        </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Some text here
      </p>
      {/* <form className="form" onSubmit={e => onSubmit(e)}>
        <p><strong>Goal: </strong>{goal}</p>
        <div class="form-group">
                <input type="date" placeholder="Date" name="date" value={date} onChange={e => onChange(e)} />
                </div>
                <div class="form-group">
                <input type="text" placeholder="Time Practiced" name="timepracticed" value={timepracticed} onChange={e => onChange(e)} />
                </div>
                <div class="form-group">
                <textarea
                    name="notes"
                    cols="30"
                    rows="5"
                    placeholder="Notes"
                    value={notes} onChange={e => onChange(e)}
                ></textarea>
                </div>
        
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form> */}
      </section>
    </Fragment>
    )
}

EditGoal.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditGoal));