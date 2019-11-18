import React from 'react';
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
// import aws_exports from "./aws-exports";
import { createBrowserHistory } from 'history';
import { Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Register from './components/auth/Register';

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: process.env.REACT_APP_REGION,

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.REACT_APP_USER_POOL_ID,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.REACT_APP_CLIENT_ID,

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true
  }
});

const currentConfig = Auth.configure();
console.log(currentConfig);
const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
       <Switch>
          <Route path = '/register' component={ Register } />
          <Route path = '/login' component={ Login } />
          <Route path = '/logout' component={ Logout } />
          <Route path = '/' component={ Home } />

      </Switch>
    </Router>
  );
}

export default App;
