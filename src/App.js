import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./screens/Home";
import SignUp from "./screens/SignUp";
import AdminDashboard from "./screens/SignUp/AdminDashboard";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/sign-up">Sign Up</Link>
            </li>
          </ul>
          <hr />
          <Route exact path="/" component={Home} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/dashboard" component={AdminDashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
