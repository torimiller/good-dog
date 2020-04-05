import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types'
import { deleteGoalInProgress } from '../../actions/profile';

// goalsinprogress will be passed in from the parent component which is Dashboard.js
const GoalsInProgress = (props) => {
    console.log('props:', props)
    // const goals = goalsinprogress.map(goal => (
    //     <tr key={goal._id}>
    //         <td>{goal.goal}</td>
    //         <td className="hide-sm"></td>
    //         {/* <td>
    //             <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {
    //                 exp.to === null ? (' Now') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)
    //             }
    //         </td> */}
    //         <td>
    //             <button onClick={() => deleteGoalInProgress(goal._id)} className='btn btn-danger'>Delete</button>
    //         </td>
    //     </tr>
    // ));

    return (
        <Fragment>
            <h2 className="my2">Goals In Progress</h2>
            <h3></h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                {/* <tbody>{goals}</tbody> */}
            </table>
        </Fragment>
    )
}

GoalsInProgress.propTypes = {
    goalsinprogress: PropTypes.array.isRequired,
    //deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteGoalInProgress })(GoalsInProgress);