import React, {Fragment,useContext, useEffect}from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import AlertContext from '../../context/alert/alertContext';
import AuthContext from "../../context/auth/authContext";

const Navbar = ({title, icon}) =>{
    const authContext = useContext(AuthContext);
    const { logout, isAuthenticated, user } = authContext;

    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li><a href="#!">
                <i className="fa fa-sign-out-alt"/>{''}
                <span className='hide-sm'>LogOut</span>
            </a>
            </li>
        </Fragment>
    );
    const guestLink = (
        <Fragment>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </Fragment>

    );
        return (
           <div className="navbar bg-primary">
               <h1>
                   <i className={icon}/> {title}
               </h1>
               <ul>
                   {isAuthenticated ? authLinks : guestLink}
               </ul>

           </div>
        );
};
Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon : PropTypes.string
};
Navbar.defaultProps = {
    title: 'Contact-React',
    icon: 'fa fa-pencil'
};
export default Navbar;
