import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types'
import { deleteEducation, editEducation } from '../../actions/profile';

// education will be passed in from the parent component which is Dashboard.js
class GoalsInProgress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editGoal: false,
            goalName: ''
        }
        this.handleEditGoalClick = this.handleEditGoalClick.bind(this);
    }

    handleEditGoalClick(e) {
        // let goalName = e.target.parentElement.parentElement.firstChild.innerHTML;
        // console.log('clicked goalName:', goalName)
        this.setState({
            editGoal: true,
            goalId: ''
        })

    }

    render() {
        var { education, deleteEducation, editEducation } = this.props;
        const educations = education.map(edu => {
            console.log('edu:', edu)
            const date = edu.date.toString().split('').slice(0, 9).join('');
            //console.log('date:', date)
            return (
            <tr key={edu._id}>
                <td>{edu.goal}</td>
                {/* <td className="hide-sm">{edu.degree}</td> */}
                <td>{date}</td>
                <td>{edu.timepracticed}</td>
                <td>{edu.notes}</td>
                <td>
                {/* <Link to="/edit-goal"> */}
                <button 
                    className='btn btn-success' 
                    onClick={() => {
                        console.log('edit click this:', this)
                        //this.handleEditGoalClick();
                        console.log('editEducation edu._id:', edu._id)
                        this.setState({
                            editGoal: true,
                            goal: `${edu.goal}`,
                            goalId: `${edu._id}`
                        })
                        console.log('this.state:', this.state)
                        //editEducation(edu._id)
                    }}>Edit</button>
                {/* </Link> */}
                    {/* <button onClick={() => {
                        deleteEducation(edu._id)
                    }} className='btn btn-success'>Edit</button> */}
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
                    {this.state.editGoal && (
                    <div>
                    <h1>Edit {this.state.goal}</h1>
                    <tr>
                        <td>{this.state.goal}</td>
                    </tr>
                    <form>
                    <div class="form-group">
                        <input type="date" placeholder="Date" name="date" />
                        </div>
                        <div class="form-group">
                        <input type="text" placeholder="Time Practiced" name="timepracticed" />
                        </div>
                        <div class="form-group">
                        <textarea
                            name="notes"
                            cols="30"
                            rows="5"
                            placeholder="Notes"
                        ></textarea>
                        </div>
                        <input type="submit" class="btn btn-primary my-1" />
                        <Link className="btn btn-light my-1" to="/dashboard" onClick={() => {
                            this.setState({
                            editGoal: false,
                            goalId: '',
                            goal: ''
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
    editEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation, editEducation })(GoalsInProgress);



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