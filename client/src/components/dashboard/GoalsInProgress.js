import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//import Moment from 'react-moment';
import PropTypes from 'prop-types'
import { deleteGoalInProgress, updateGoalInProgress, addCompletedGoal } from '../../actions/profile';
// import profile from '../../reducers/profile';

// goalsinprogress will be passed in from the parent component which is Dashboard.js
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
        const goalArrayLength = this.props.goalsinprogress.length;
        var { profile, goalsinprogress, deleteGoalInProgress, updateGoalInProgress, addCompletedGoal } = this.props;
        let currentGoalId;
        const educations = goalsinprogress.map(edu => {
            let date;
            let timepracticed;
            let notes;

            edu.progress.map(progress => {
                if (progress.date !== null) {
                    date = progress.date.toString().split('').slice(0, 10).join('');
                }
                timepracticed = progress.timepracticed;
                notes = progress.notes;
            })

            return (
            <tr key={edu._id}>
                <td>{edu.goal}</td>
                <td>
                <button 
                    className='btn btn-success btn-goals' 
                    onClick={(event) => {
                        event.preventDefault();
                        currentGoalId = edu._id;
                        this.setState({
                            editGoal: true,
                            goal: `${edu.goal}`,
                            goalId: `${edu._id}`
                        });
                    }}>Add Progress</button>
                </td>
                <td>
                <button 
                    className='btn btn-success btn-goals' 
                    onClick={() => {
                        edu.progress.map(progress => {
                            if (progress.date !== null) {
                                date = progress.date.toString().split('').slice(0, 10).join('');
                            }
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
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });
                    }}>Completed
                </button>
                </td>
                <td>
                    <button onClick={() => {
                        deleteGoalInProgress(edu._id)
                    }} className='btn btn-delete btn-goals'>Delete</button>
                </td>
            </tr>
        )});

        let progresses;

        progresses = this.state.clickedProgress.map((progress, index) => {
            return (
                <tr key={index} className="goal-progress">
                    <td className="td-20">{progress.date}</td>
                    <td className="td-20">{progress.timepracticed}</td>
                    <td className="td-60">{progress.notes}</td>
                </tr>
            )
        })

        progresses.shift();

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
                    <form class="form" onSubmit={e => {
                        e.preventDefault();
                        let id = this.state.goalId;
                        let progress = {date: this.state.date, timepracticed: this.state.timepracticed, notes: this.state.notes}
                        updateGoalInProgress(id, progress)
                        this.setState({
                            editGoal: false,
                            goalId: ''
                        });
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });
                    }}>

                        <fieldset className="form-fieldset">
                        <legend className="lead"><i className="fas fa-dog" alt=""></i> Add New Progress Entry for {this.state.goal}</legend>
                            <div class="form-group">
                                <label for="date">Today's Date</label>
                                <input type="date" placeholder="Date" name="date" value={this.state.date} onChange={this.handleDate} />
                            </div>
                            <div class="form-group">
                                <label for="time-practiced">Time Practiced</label>
                                <input type="text" placeholder="Example: 20 minutes" name="timepracticed" value={this.state.timepracticed} onChange={this.handleTimePracticed} />
                            </div>
                            <div class="form-group">
                                <label for="notes">Notes</label>
                                <textarea
                                    name="notes"
                                    cols="30"
                                    rows="5"
                                    placeholder="Example: Dog responded to command, but only when treat was in sight."
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
                        </fieldset>                
                    </form>
                    </div>
                    )}

                    {/* View current goal progress */}
                    {this.state.viewProgress && (
                        
                        <div>
                            <h3 className="view-progress-h3">View Progress for {this.state.goal}</h3>
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
    goalsinprogress: PropTypes.array.isRequired,
    deleteGoalInProgress: PropTypes.func.isRequired,
    updateGoalInProgress: PropTypes.func.isRequired,
    addCompletedGoal: PropTypes.func.isRequired
}

export default connect(null, { deleteGoalInProgress, updateGoalInProgress, addCompletedGoal })(GoalsInProgress);