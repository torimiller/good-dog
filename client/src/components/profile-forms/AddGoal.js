import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { addExperience } from '../../actions/profile';
import { addGoalInProgress } from '../../actions/profile';

const AddGoalInProgress = ({ addGoalInProgress, history }) => {
    const [formData, setFormData] = useState({
        goal: '',
        progress: {
            date: '',
            timepracticed: '',
            notes: ''
        }
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { goal, date, timepracticed, notes } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            <h1 class="large text-primary">
                Add A Goal
            </h1>
            <p class="lead">
            Choose a skill to add to your training goals, or create your own!
            </p>
            <small>* = required field</small>
            <form class="form" onSubmit={e => {
                    e.preventDefault();
                    addGoalInProgress(formData, history);
                }}>
                <div class="form-group">
                <input type="text" placeholder="Goal" name="goal" value={goal} onChange={e => onChange(e)} required />
                </div>
                <div class="form-group">
                <input type="date" placeholder="* Date" name="date" value={date} onChange={e => onChange(e)} required />
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
                <input type="submit" class="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddGoalInProgress.propTypes = {
    addGoalInProgress: PropTypes.func.isRequired
}

export default connect(null, { addGoalInProgress })(withRouter(AddGoalInProgress));