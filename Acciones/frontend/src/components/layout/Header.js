import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {PropTypes } from 'prop-types';
import { logout } from '../../actions/auth';
import './diseño.css'

export class Header extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
      };


      
    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <div className="container">
          <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="#"></a>
          
          </div>
          </div>
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <span className="navbar-text mr-3">
              <strong>{user ? `Hola ${user.username}` : ''}</strong>
            </span>
            <li className="nav-item">
              <button onClick={this.props.logout} className="nav-link btn btn-info btn-sm text-light">
                Cerrar sesión
              </button>
            </li>
          </ul>
          </div>
          </nav>
          );
        return (
        <div className="color-body">

           {isAuthenticated ? authLinks: ""}
           
        </div>
        )
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth,
  });

export default connect(mapStateToProps, { logout })(Header);
