import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types'
import { deleteEducation } from '../../actions/profile';

// education will be passed in from the parent component which is Dashboard.js
const GoalsInProgress = ({ education, deleteEducation }) => {
    console.log('education:', education)
    const educations = education.map(edu => {
        console.log('edu:', edu)
        const date = edu.date.toString().split('').slice(0, 9).join('');
        console.log('date:', date)
        return (
        <tr key={edu._id}>
            <td>{edu.goal}</td>
            {/* <td className="hide-sm">{edu.degree}</td> */}
            <td>{date}</td>
            <td>{edu.timepracticed}</td>
            <td>{edu.notes}</td>
            <td>
                <button onClick={() => {
                    console.log('Education delete onClick ran')
                    deleteEducation(edu._id)
                }} className='btn btn-danger'>Delete</button>
            </td>
        </tr>
    )});

    return (
        <Fragment>
            <h2 className="my2">Goals In Progress</h2>
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
                <tbody>{educations}</tbody>
            </table>
        </Fragment>
    )
}

GoalsInProgress.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(GoalsInProgress);