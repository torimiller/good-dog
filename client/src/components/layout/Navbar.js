import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import logo from '../../img/dog-logo-2.svg';
import '../../App.css';


const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
        <i className="fas fa-user" alt=""></i>{' '}
        <span className="hide-sm">Dashboard</span></Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" alt=""></i>{' '}
          <span className="hide-sm">Logout</span></a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );

  const logoStyle = {
    width: "40px",
    filter: "invert(100%)",
    color: "white",
    marginTop: "5px",
    marginRight: "10px",
  }

    return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/'>
        <img style={logoStyle} className="dog-logo" src={logo} alt="dog-icon"/>
            Good Dog
        </Link>
      </h1>
      { !loading && (<Fragment>{ isAuthenticated ? authLinks: guestLinks }</Fragment>) }
    </nav>
    )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);