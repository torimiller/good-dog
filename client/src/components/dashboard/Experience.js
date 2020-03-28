import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import Moment from 'react-redux';
import PropTypes from 'prop-types'

// experiences will be passed in from the parent component which is Dashboard.js
const Experience = ({ experience }) => {
    const experiences = experience.map();

    return (
        <Fragment>
            <h2 className="my2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {

}

export default Experience
