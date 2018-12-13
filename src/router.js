import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Login from './Login';
import App from './App';
import JobManagement from './component/JobManagement';
import JobDependencyManagement from './component/JobDependencyManagement';

export const PageRouter = ()=> (
    <HashRouter>
        <Switch>
            <Route exact path="/"  render={()=>{
                return false ? <App/> : <Login />;
            }} />
            <Route exact path="/detail" component={Login}/>
        </Switch>
    </HashRouter>
);