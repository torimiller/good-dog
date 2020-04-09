import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types'
import { deleteEducation } from '../../actions/profile';

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
        let goalName = e.target.parentElement.parentElement.firstChild.innerHTML;
        console.log('clicked goalName:', goalName)
        this.setState({
            editGoal: true,
            goalName: `${goalName}`,
            goalId: ''
        })

    }

    render() {
        var { education, deleteEducation } = this.props;
        const educations = education.map(edu => {
            //console.log('edu:', edu)
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
                <button className='btn btn-success' onClick={this.handleEditGoalClick, console.log('edit click this:', this)}>Edit</button>
                {/* </Link> */}
                    {/* <button onClick={() => {
                        deleteEducation(edu._id)
                    }} className='btn btn-success'>Edit</button> */}
                </td>
                <td>
                    <button onClick={() => {
                        console.log('Education delete onClick ran')
                        deleteEducation(edu._id)
                    }} className='btn btn-danger'>Delete</button>
                </td>
            </tr>
        )});
    
        console.log('GoalsInProgress this.state:', this.state)
        return (
            <Fragment>
                <h2 className="my2">Goals In Progress</h2>
                {this.state.editGoal && <p>CURRENT GOAL BEING EDITED:</p>}
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
                    {!this.state.editGoal && <tbody>{educations}</tbody>}
                    {console.log('educations:', educations)}
                </table>
            </Fragment>
        )
    }
}

GoalsInProgress.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(GoalsInProgress);



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