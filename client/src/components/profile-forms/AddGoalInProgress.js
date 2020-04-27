import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addGoalInProgress } from '../../actions/profile';

const AddGoalInProgress = ({ addGoalInProgress, history }) => {
    const [formData, setFormData] = useState({
        // school: '',
        // degree: '',
        // fieldofstudy: '',
        // from: '',
        // to: '',
        // current: false,
        // description: '',
        goal: '',
        progress: {
            date: '',
            timepracticed: '',
            notes: ''
        }
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { goal, progress: { date, timepracticed, notes } } = formData;

    const onChange = e => {
        console.log('onChange e.target:', e.target);
        console.log('onChange e.target.name:', e.target.name);
        console.log('onChange e.target.value:', e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onDateChange = e => {
        setFormData({
            ...formData, 
            progress: {
                ...formData.progress,
                date: e.target.value
            }
        })
    }

    const onTimeChange = e => {
        setFormData({
            ...formData, 
            progress: {
                ...formData.progress,
                timepracticed: e.target.value
            }
        })
    }

    const onNotesChange = e => {
        setFormData({
            ...formData, 
            progress: {
                ...formData.progress,
                notes: e.target.value
            }
        })
    }

    return (
        <Fragment>
            <h1 class="large text-primary">
                Add Your Training Goals
            </h1>
            {/* <p class="lead">
            <i class="fas fa-dog" alt=""></i> Add a skill you would like to teach your dog
            </p> */}
            
            <form className="form" onSubmit={e => {
                    e.preventDefault();
                    //setFormData({...formData, progress: date, timepracticed, notes})
                    addGoalInProgress(formData, history);
                }}>
                <fieldset className="form-fieldset">
                    <legend className="lead"><i className="fas fa-dog" alt=""></i> Add a skill you would like to teach your dog</legend>
                    <div className="form-group">
                <select name="goal" value={goal} onChange={e => onChange(e)}>
                    {console.log('goal:', goal)}
                    <option value="0">Choose from a list of skills</option>
                    <option value="Sit">Sit</option>
                    <option value="Stay">Stay</option>
                    <option value="Down">Down</option>
                    <option value="Come">Come</option>
                    <option value="Shake">Shake</option>
                    <option value="High Five">High Five</option>
                    <option value="Stand">Stand</option>
                    <option value="Heel">Heel</option>
                    <option value="Roll Over">Roll Over</option>
                    <option value="Fetch">Fetch</option>
                    <option value="Play Dead">Play Dead</option>
                    <option value="Drop It">Drop It</option>
                    <option value="Speak">Speak</option>
                    <option value="Create Your Own">Or Create Your Own!</option>
                </select>
                </div>
                {goal === 'Create Your Own!' ? <input type="text" placeholder="Goal" name="goal" /> : <input type="text" placeholder="Goal" name="goal" value={goal} onChange={e => onChange(e)} />}
                {/* <div class="form-group">
                <label for="date">Date</label>
                <input type="date" placeholder="Date" name="date" value={date} onChange={e => onDateChange(e)} />
                </div> */}
                {/* <div class="form-group">
                <label for="time-practiced">Time Practiced</label>
                <input type="text" placeholder="15 Minutes" name="timepracticed" value={timepracticed} onChange={e => onTimeChange(e)} />
                </div> */}
                {/* <div class="form-group">
                <label for="notes">Notes</label>
                <textarea
                    name="notes"
                    cols="30"
                    rows="5"
                    placeholder="Dog responded to command, but only when treat was in sight."
                    value={notes} onChange={e => onNotesChange(e)}
                ></textarea>
                </div> */}
                <input type="submit" class="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
                </fieldset>
                
            </form>
        </Fragment>
    )
}

AddGoalInProgress.propTypes = {
    addGoalInProgress: PropTypes.func.isRequired
}

export default connect(null, { addGoalInProgress })(withRouter(AddGoalInProgress));