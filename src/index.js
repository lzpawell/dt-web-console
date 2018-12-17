import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Switch, HashRouter, Route} from 'react-router-dom';
import Login from './LoginComponent';
import {isLogin, login} from './service/login';

import * as serviceWorker from './serviceWorker';


const Router = () => (<HashRouter>
    <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/**" render={() => {
            return true ? <App /> : <Login />;
        }} />

    </Switch>
</HashRouter>)

ReactDOM.render(<Router />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
