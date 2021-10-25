import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import './diseño.css'

export class Login extends Component {

    state = {
        username: '',
        password: '',
      };

      static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
      };

      onSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
      };
    
      onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    
      render() {
        if (this.props.isAuthenticated) {
          return <Redirect to="/" />;
        }
        const { username, password } = this.state;
        return (

          
          <div class="container">
             <div class="row  login-page">
	            <div class="col-md-12 login-form">
          
          
            
             
              <h2 className="text-center">Iniciar sesión</h2>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    onChange={this.onChange}
                    value={username}
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
                  <button type="submit" className="btn btn-dark btn-lg btn-block">
                    Iniciar sesión
                  </button>
                </div>
                <p className="text-right">
                  ¿Aún no tienes cuenta? <Link to="/register">Registrarse</Link>
                </p>
              </form>
              </div>
              </div>
              </div>
           
        );
      }
    }
    
    const mapStateToProps = (state) => ({
      isAuthenticated: state.auth.isAuthenticated,
    });
    
    
    export default connect(mapStateToProps, { login })(Login);
