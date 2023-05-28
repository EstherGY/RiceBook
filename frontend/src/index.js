import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
//import App from './App';
//import reportWebVitals from './reportWebVitals';
import Landing from './LandingView';
import Main from './MainView'
import Profile from './ProfileView';


const App = () => (
    <Router>
        <div>
            <Route exact path='/' component={Landing}></Route>
            <Route exact path='/landing' component={Landing}></Route>
            <Route path='/main' component={Main}></Route>
            <Route path='/profile' component={Profile}></Route>
        </div>
    </Router>
)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);