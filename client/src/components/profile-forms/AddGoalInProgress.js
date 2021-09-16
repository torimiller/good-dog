import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addGoalInProgress } from '../../actions/profile';

const AddGoalInProgress = ({ addGoalInProgress, history }) => {
    const [formData, setFormData] = useState({
        goal: '',
        progress: []
    });

    const { goal } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }


    return (
        <Fragment>
            <h1 className="large text-primary">
                Add Your Training Goals
            </h1>
            
            <form className="form" onSubmit={e => {
                    e.preventDefault();
                    addGoalInProgress(formData, history);
                }}>
                <fieldset className="form-fieldset">
                    <legend className="lead"><i className="fas fa-dog" alt=""></i> Add a skill you would like to teach your dog</legend>
                    <div className="form-group">
                <select name="goal" value={goal} onChange={e => onChange(e)}>
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
                <input type="submit" className="btn btn-primary my-1" />
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