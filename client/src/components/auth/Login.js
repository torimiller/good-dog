import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
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
        console.log('Success')

    }

    return <Fragment>
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
}

export default Login;