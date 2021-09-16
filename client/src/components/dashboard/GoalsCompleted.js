import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { deleteCompletedGoal } from '../../actions/profile';

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
        var {completedGoals, deleteCompletedGoal} = this.props;
        const goalsCompleted = completedGoals.map(goalCompleted => {
            let date;
            let timepracticed;
            let notes;
            return (
            <tr key={goalCompleted._id}>
                <td>{goalCompleted.goal}</td>
                <td>
                <button 
                    className='btn btn-goals' 
                    onClick={() => {
                        goalCompleted.progress.map(progress => {
                            date = progress.date.toString().split('').slice(0, 10).join('');
                            timepracticed = progress.timepracticed;
                            notes = progress.notes;
                            let currentProgress = {date: date, timepracticed: timepracticed, notes: notes}
                            return this.state.clickedProgress.push(currentProgress);
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
                        deleteCompletedGoal(goalCompleted._id)
                    }} className='btn btn-delete'>Delete</button>
                </td>
            </tr>
        )});
    
        return (
            <Fragment>
                <h2 className="my2 goals-h2">Completed Goals for { this.props.profile.dogName }</h2>
                <table className="table completed-table">
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
    deleteCompletedGoal: PropTypes.func.isRequired
}

export default connect(null, { deleteCompletedGoal })(GoalsCompleted);