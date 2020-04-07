import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const ProfileEducation = ({ education: {
    //school, degree, fieldofstudy, current, to, from, description
    goal, date, timepracticed, notes
} }) => {
    return (
        <div>
            <h3 className="text-dark">{goal}</h3>
            <p>
                <strong>Date: </strong> {date}
                {/* <Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? ' Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>} */}
            </p>
            <p>
                <strong>Time Practiced: </strong> {timepracticed}
            </p>
            <p>
                <strong>Notes: </strong> {notes}
            </p>
            {/* <p>
                <strong>Description: </strong> {description}
            </p> */}
        </div>
    )
}

ProfileEducation.propTypes = {
    education: PropTypes.array.isRequired
}

export default ProfileEducation;
