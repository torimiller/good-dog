import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types'
import { deleteEducation, updateEducation } from '../../actions/profile';

// education will be passed in from the parent component which is Dashboard.js
class GoalsInProgress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editGoal: false,
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
        // let goalName = e.target.parentElement.parentElement.firstChild.innerHTML;
        // console.log('clicked goalName:', goalName)
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
        var { education, deleteEducation, updateEducation } = this.props;
        let currentGoalId;
        const educations = education.map(edu => {
            console.log('edu:', edu)
            console.log('edu.progress:', edu.progress)
            console.log('edu.progress.length:', edu.progress.length)
            // let date;
            // for (var i=0; i < edu.progress.length; i++) {
            //     date = edu.progress[i].date.toString().split('').slice(0, 9).join('');
            //     console.log('date:', date) 
            // }

            let date;
            let timepracticed;
            let notes;

            edu.progress.map(progress => {
                console.log('mapped progress:', progress)
                date = progress.date.toString().split('').slice(0, 9).join('');
                timepracticed = progress.timepracticed;
                notes = progress.notes;
            })

            console.log('timepracticed:', timepracticed)
            //const date = edu.date.toString().split('').slice(0, 9).join('');
            //console.log('date:', date)
            return (
            <tr key={edu._id}>
                <td>{edu.goal}</td>
                <td>{date}</td>
                <td>{timepracticed}</td>
                <td>{notes}</td>
                {/* <td className="hide-sm">{edu.degree}</td> */}
                {/* <td>{date}</td>
                <td>{edu.timepracticed}</td>
                <td>{edu.notes}</td> */}
                <td>
                {/* <Link to="/edit-goal"> */}
                <button 
                    className='btn btn-success' 
                    onClick={() => {
                        //this.handleEditGoalClick();
                        console.log('Edit button edu._id:', edu._id)
                        currentGoalId = edu._id;
                        this.setState({
                            editGoal: true,
                            goal: `${edu.goal}`,
                            goalId: `${edu._id}`
                        })
                        console.log('this.state:', this.state)
                    }}>Edit</button>
                {/* </Link> */}
                </td>
                <td>
                    <button onClick={() => {
                        console.log('Education delete onClick ran')
                        console.log('Education delete edu._id:', edu._id)
                        deleteEducation(edu._id)
                    }} className='btn btn-danger'>Delete</button>
                </td>
            </tr>
        )});
    
        console.log('GoalsInProgress this.state:', this.state)
        return (
            <Fragment>
                <h2 className="my2">Goals In Progress</h2>
                
                {this.state.goalName}
                <table className="table">
                    <thead>
                        <tr>
                            <th>Goal</th>
                            <th className="hide-sm">Date</th>
                            <th className="hide-sm">Time Practiced</th>
                            <th className="hide-sm">Notes</th>
                            <th />
                        </tr>
                    </thead>

                    {/* Editing current goal */}
                    {this.state.editGoal && (
                    <div>
                    <h1>Add New Entry for {this.state.goal}</h1>
                    <tr>
                        <td>{this.state.goal}</td>
                    </tr>
                    <form class="form" onSubmit={e => {
                    e.preventDefault();
                    //setFormData({...formData, progress: date, timepracticed, notes})
                    console.log('updateEducation id:', this.state.goalId);
                    let id = this.state.goalId;
                    let progress = {date: this.state.date, timepracticed: this.state.timepracticed, notes: this.state.notes}
                    console.log('updateEducation progress:', progress);
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

                    {!this.state.editGoal && <tbody>{educations}</tbody>}
                    {console.log('educations:', educations)}
                </table>
            </Fragment>
        )
    }
}

GoalsInProgress.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
    updateEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation, updateEducation })(GoalsInProgress);



// import React, { Fragment } from 'react'
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import Moment from 'react-moment';
// import PropTypes from 'prop-types'
// import { deleteEducation } from '../../actions/profile';

// // education will be passed in from the parent component which is Dashboard.js
// const GoalsInProgress = ({ education, deleteEducation }) => {
//     console.log('education:', education)
//     const educations = education.map(edu => {
//         console.log('edu:', edu)
//         const date = edu.date.toString().split('').slice(0, 9).join('');
//         console.log('date:', date)
//         return (
//         <tr key={edu._id}>
//             <td>{edu.goal}</td>
//             {/* <td className="hide-sm">{edu.degree}</td> */}
//             <td>{date}</td>
//             <td>{edu.timepracticed}</td>
//             <td>{edu.notes}</td>
//             <td>
//             {/* <Link to="/edit-goal"> */}
//             <button className='btn btn-success'>Edit</button>
//             {/* </Link> */}
//                 {/* <button onClick={() => {
//                     deleteEducation(edu._id)
//                 }} className='btn btn-success'>Edit</button> */}
//             </td>
//             <td>
//                 <button onClick={() => {
//                     console.log('Education delete onClick ran')
//                     deleteEducation(edu._id)
//                 }} className='btn btn-danger'>Delete</button>
//             </td>
//         </tr>
//     )});

//     return (
//         <Fragment>
//             <h2 className="my2">Goals In Progress</h2>
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th>Goal</th>
//                         <th className="hide-sm">Date</th>
//                         <th className="hide-sm">Time Practiced</th>
//                         <th className="hide-sm">Notes</th>
//                         <th />
//                     </tr>
//                 </thead>
//                 <tbody>{educations}</tbody>
//                 {console.log('educations:', educations)}
//             </table>
//         </Fragment>
//     )
// }

// GoalsInProgress.propTypes = {
//     education: PropTypes.array.isRequired,
//     deleteEducation: PropTypes.func.isRequired
// }

// export default connect(null, { deleteEducation })(GoalsInProgress);