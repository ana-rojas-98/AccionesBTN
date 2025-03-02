import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';
import './diseño.css'

export class Register extends Component {


    state = {
        username: '',
        email: '',
        password: '',
        password2: '',
      }; 

      static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
      };

    onSubmit = (e) => {
        e.preventDefault();
        const { username, email, password, password2 } = this.state;
        if (password !== password2) {
          this.props.createMessage({ passwordNotMatch: 'Passwords do not match' });
        } else {
          const newUser = {
            username,
            password,
            email,
          };
          this.props.register(newUser);
        }
    };
    
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
      
    render() {
      if (this.props.isAuthenticated) {
        return <Redirect to="/" />;
      }
        const { username, email, password, password2 } = this.state;
        return (

            <div class="container">
             <div class="row  register-page">
	            <div class="col-md-12 login-form">
          <h2 className="text-center">Registrarse</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Nombre de usuario</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>
            <div className="form-group">
              <label>Correo</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-group">
              <label>Confirmar comtraseña</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={this.onChange}
                value={password2}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-dark btn-lg btn-block">
                 Aceptar
              </button>
            </div>
            <p className="text-right">
              ¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link>
            </p>
          </form>
        </div>
      </div>
      </div>
        )
    }
}


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(Register);
