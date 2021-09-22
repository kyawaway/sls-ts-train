import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import GetButton from './components/GetButton';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar /><hr/>
            <Route exact path='/' component={Home}/>
            <Route exact path='/signup' render={() => <Login title={"Sign Up"}/>}/>
            <Route exact path='/login' render={() => <Login title={"Sign In"}/>}/>
            <Route exact path='/get-users' component={GetButton}/>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
