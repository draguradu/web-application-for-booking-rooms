import React from 'react';
import { Route } from 'react-router-dom';
import LoginContainer from './pages/login/LoginContainer';
import SignUpContainer from './pages/signup/SignUpContainer';

export default [
    <Route key="login" path="/login" component={LoginContainer} />,
    <Route key="signup" path="/signup" component={SignUpContainer} />,
];
