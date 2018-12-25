import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Switch, HashRouter, Route} from 'react-router-dom';
import Login from './LoginComponent';
import AppReducer from './reducers/AppReducer';
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

const store = createStore(AppReducer, {});

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>
    , document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
