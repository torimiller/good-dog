import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types'
import { deleteGoalInProgress, updateEducation, addCompletedGoal } from '../../actions/profile';
import profile from '../../reducers/profile';

// education will be passed in from the parent component which is Dashboard.js
class GoalsInProgress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editGoal: false,
            viewProgress: false,
            goalsExist: false,
            clickedProgress: [],
            goalName: '',
            goalId: '',
            date: '',
            timepracticed: '',
            notes: ''
        }
        this.handleEditGoalClick = this.handleEditGoalClick.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleTimePracticed = this.handleTimePracticed.bind(this);
        this.handleNotes = this.handleNotes.bind(this);

        console.log('GoalsInProgress props:', props)

    }

    handleEditGoalClick(e) {
        this.setState({
            editGoal: true,
            goalId: ''
        })
    }

    handleDate(e) {
        this.setState({
            date: e.target.value
        })
    }

    handleTimePracticed(e) {
        this.setState({
            timepracticed: e.target.value
        })
    }

    handleNotes(e) {
        this.setState({
            notes: e.target.value
        })
    }

    render() {
        const goalArrayLength = this.props.education.length;
        console.log('GoalsInProgress this.props:', this.props)
        var { profile, education, deleteGoalInProgress, updateEducation, addCompletedGoal } = this.props;
        let currentGoalId;
        const educations = education.map(edu => {
            let date;
            let timepracticed;
            let notes;

            edu.progress.map(progress => {
                date = progress.date.toString().split('').slice(0, 10).join('');
                timepracticed = progress.timepracticed;
                notes = progress.notes;
            })

            return (
            <tr key={edu._id}>
                <td>{edu.goal}</td>
                <td>
                <button 
                    className='btn btn-success btn-goals' 
                    onClick={() => {
                        currentGoalId = edu._id;
                        this.setState({
                            editGoal: true,
                            goal: `${edu.goal}`,
                            goalId: `${edu._id}`
                        })
                    }}>Add Progress</button>
                </td>
                <td>
                <button 
                    className='btn btn-success btn-goals' 
                    onClick={() => {
                        edu.progress.map(progress => {
                            date = progress.date.toString().split('').slice(0, 10).join('');
                            timepracticed = progress.timepracticed;
                            notes = progress.notes;
                            let currentProgress = {date: date, timepracticed: timepracticed, notes: notes}
                            this.state.clickedProgress.push(currentProgress);
                        })

                        this.setState({
                            viewProgress: true,
                            goal: `${edu.goal}`,
                            goalId: `${edu._id}`
                        })
                    }}>View Progress</button>
                </td>
                <td>
                <button 
                    className='btn btn-success btn-goals' 
                    onClick={() => {
                        addCompletedGoal(edu, edu._id);
                    }}>Completed
                </button>
                </td>
                <td>
                    <button onClick={() => {
                        deleteGoalInProgress(edu._id)
                    }} className='btn btn-danger btn-goals'>Delete</button>
                </td>
            </tr>
        )});

        const progresses = this.state.clickedProgress.map((progress, index) => {
            console.log('progresses progress:', progress)
            return (
                <tr key={index} className="goal-progress">
                    <td className="td-20">{progress.date}</td>
                    <td className="td-20">{progress.timepracticed}</td>
                    <td className="td-60">{progress.notes}</td>
                </tr>
            )
        })

        return (
            <Fragment>
                <h2 className="my2 goals-h2">Goals In Progress for { this.props.profile.dogName }</h2>

                {this.state.goalName}

                <table className="table">
                    {(goalArrayLength === 0) && <p>You don't have any goals in progress.</p>}
                    {(goalArrayLength !== 0) && !this.state.viewProgress && (
                        <thead>
                            <tr>
                                <th>Skill</th>
                                <th className="hide-sm"></th>
                                <th className="hide-sm"></th>
                                <th className="hide-sm"></th>
                                <th />
                            </tr>
                        </thead>
                    )
                    }
                    

                    {/* Editing current goal */}
                    {this.state.editGoal && (
                    <div>
                    <h1>Add New Entry for {this.state.goal}</h1>
                    <tr>
                        <td>{this.state.goal}</td>
                    </tr>

                    <form class="form" onSubmit={e => {
                    e.preventDefault();
                    let id = this.state.goalId;
                    let progress = {date: this.state.date, timepracticed: this.state.timepracticed, notes: this.state.notes}
                    updateEducation(id, progress)
                    this.setState({
                        editGoal: false,
                        goalId: ''
                    })
                    }}>
        
                        <div class="form-group">
                            <input type="date" placeholder="Date" name="date" value={this.state.date} onChange={this.handleDate} />
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="Time Practiced" name="timepracticed" value={this.state.timepracticed} onChange={this.handleTimePracticed} />
                        </div>
                        <div class="form-group">
                            <textarea
                                name="notes"
                                cols="30"
                                rows="5"
                                placeholder="Notes"
                                value={this.state.notes} onChange={this.handleNotes}
                            ></textarea>
                        </div>
                        <input type="submit" class="btn btn-primary my-1" />
                        <Link className="btn btn-light my-1" to="/dashboard" onClick={() => {
                            this.setState({
                            editGoal: false,
                            goal: '',
                            goalId: ''
                        })
                        }}>Go Back</Link>
                    </form>
                    </div>
                    )}

                    {/* View current goal progress */}
                    {this.state.viewProgress && (
                        
                        <div>
                            <h1 className="view-progress-h1">View Progress for {this.state.goal}</h1>

                            {/* {this.state.clickedProgress.map(progress => {
                                return (
                                    <div className="goal-progress">
                                            <thead>
                                                <tr>Date</tr>
                                            </thead>
                                        <p>Date: {progress.date}</p>
                                        <p>Time Practiced: {progress.timepracticed}</p>
                                        <p>Notes: {progress.notes}</p>
                                    </div>
                                )
                            })} */}

                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Time Practiced</th>
                                        <th>Notes</th>
                                    </tr>
                                </thead>
                                <tbody>{progresses}</tbody>
                            </table>

                            <Link className="btn btn-light my-1" to="/dashboard" onClick={() => {
                                this.setState({
                                    editGoal: false,
                                    viewProgress: false,
                                    clickedProgress: [],
                                    goal: '',
                                    goalId: ''
                                })
                            }}>Go Back</Link>
                        </div>
                    )}

                    {!this.state.editGoal && !this.state.viewProgress && <tbody>{educations}</tbody>}
                </table>
            </Fragment>
        )
    }
}

GoalsInProgress.propTypes = {
    education: PropTypes.array.isRequired,
    deleteGoalInProgress: PropTypes.func.isRequired,
    updateEducation: PropTypes.func.isRequired,
    addCompletedGoal: PropTypes.func.isRequired
}

export default connect(null, { deleteGoalInProgress, updateEducation, addCompletedGoal })(GoalsInProgress);