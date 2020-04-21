import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types'
import { deleteGoalInProgress } from '../../actions/profile';

// goalsinprogress will be passed in from the parent component which is Dashboard.js
class GoalsCompleted extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewProgress: false,
            clickedProgress: [],
            goal: '',
            goalId: '',
            completedGoalsExist: false
        }
    }
    render() {
        const completedGoalArrayLength = this.props.completedGoals.length;
        console.log('GoalsCompleted this.props:', this.props)
        var {goalsinprogress, completedGoals, deleteGoalInProgress} = this.props;
        const goalsCompleted = completedGoals.map(goalCompleted => {
            let date;
            let timepracticed;
            let notes;
            //console.log('edu:', edu)
            // const date = edu.date.toString().split('').slice(0, 9).join('');
            //console.log('date:', date)
            return (
            <tr key={goalCompleted._id}>
                <td>{goalCompleted.goal}</td>
                {/* <td className="hide-sm">{edu.degree}</td> */}
                {/* <td>{date}</td>
                <td>{edu.timepracticed}</td>
                <td>{edu.notes}</td> */}
                <td>
                <button 
                    className='btn btn-success btn-goals' 
                    onClick={() => {
                        console.log('View Progress goalCompleted:', goalCompleted)

                        goalCompleted.progress.map(progress => {
                            date = progress.date.toString().split('').slice(0, 10).join('');
                            timepracticed = progress.timepracticed;
                            notes = progress.notes;
                            let currentProgress = {date: date, timepracticed: timepracticed, notes: notes}
                            console.log('currentProgress inside map function:', currentProgress)
                            this.state.clickedProgress.push(currentProgress);
                        })

                        this.setState({
                            viewProgress: true,
                            goal: `${goalCompleted.goal}`,
                            goalId: `${goalCompleted._id}`
                        })

                    }}>View Progress</button>
                </td>
                <td>
                    <button onClick={() => {
                        {/* deleteEducation(edu._id) */}
                    }} className='btn btn-danger'>Delete</button>
                </td>
            </tr>
        )});
    
        return (
            <Fragment>
                <h2 className="my2 goals-h2">Completed Goals for { this.props.profile.dogName }</h2>
                <table className="table">
                    {console.log('GoalsCompleted this.state:', this.state)}
                {(completedGoalArrayLength === 0) && <p>You don't have any completed goals.</p>}
                {(completedGoalArrayLength !== 0) && (
                    <thead>
                            <tr>
                                <th>Skill</th>
                                <th></th>
                                <th />
                            </tr>
                        </thead>
                )}
                        
                    {this.state.viewProgress && (
                        
                        <div>
                            <h1>View Progress for {this.state.goal}</h1>

                            {this.state.clickedProgress.map(progress => {
                                console.log('progress inside this.state.clickedProgress.map:', progress)
                                return (
                                    <div className="goal-progress">
                                        <p>Date: {progress.date}</p>
                                        <p>Time Practiced: {progress.timepracticed}</p>
                                        <p>Notes: {progress.notes}</p>
                                    </div>
                                )
                            })}

                            <Link className="btn btn-light my-1" to="/dashboard" onClick={() => {
                                this.setState({
                                    viewProgress: false,
                                    clickedProgress: [],
                                    goal: '',
                                    goalId: ''
                                })
                            }}>Go Back</Link>
                        </div>
                    )}

                    {!this.state.viewProgress && <tbody>{goalsCompleted}</tbody>}
                </table>
            </Fragment>
        )
    }

}

GoalsCompleted.propTypes = {
    goalsinprogress: PropTypes.array.isRequired,
    deleteGoalInProgress: PropTypes.func.isRequired
}

export default connect(null, { deleteGoalInProgress })(GoalsCompleted);