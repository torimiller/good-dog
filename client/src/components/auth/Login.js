import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

// since the action is a prop, we're going to destructure it so we don't have to do props.login
const Login = ({ login, isAuthenticated }) => {
    // the useState hook: formData is going to be the state, just like:
    // state = { formData: {
    //  } }
    // setFormData is basically like this.setState and passing the form values in
    const [formData, setFormData] = useState({
        // this is our initial state
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    };

    // Redirect if logged in
    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" value={email} 
                    onChange={e => onChange(e)} required />
            </div>
            <div className="form-group">
                <input
                type="password"
                placeholder="Password"
                name="password"
                minLength="6"
                value={password} 
                onChange={e => onChange(e)}
                />
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
            Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
        </Fragment>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);