
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


import Header from './layout/Header';
import Dashboard from './leads/Dashboard';
import DashboardApi from './apis/DashboardApi';

import Alerts from './layout/Alerts';
import Register from './accounts/Register';
import Login from './accounts/Login';
import PrivateRoute from './common/PrivateRoute';


import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { Provider } from 'react-redux';
import store from '../store';

import { loadUser } from '../actions/auth';


const alertOptions = {
  timeout: 3000,
  position: 'top center',
};


class App extends Component {
    componentDidMount() {
    store.dispatch(loadUser());
   }

    render() {
        return (
         <Provider store={store}>
           <AlertProvider template={AlertTemplate} {...alertOptions}>
             <Router>
             <Fragment>
             <Header></Header>
             <Alerts></Alerts>
             <div className="container">
            
                  
                  <PrivateRoute exact path="/" component={DashboardApi} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
              
             </div>
         </Fragment>
         </Router>
         </AlertProvider>
         </Provider> 
        )
    }
    
}
  



ReactDOM.render(<App />, document.getElementById('app'));