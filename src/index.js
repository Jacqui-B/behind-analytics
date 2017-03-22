import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import App from './App';
import Recipe from './components/recipe-details';
import './index.css';

ReactDOM.render((
 <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/recipe-details/:id" component={Recipe} />
</Router>
 ),document.getElementById('root'));

