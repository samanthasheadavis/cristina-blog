import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { auth } from "./services/firebase";

import Home from "./screens/Home";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import AdminDashboard from "./screens/AdminDashboard";
import Navigation from "./components/Navigation";
import Editor from "./screens/Editor";
import About from "./screens/About";
import Article from "./screens/Article";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null
    };
  }

  // Check whether user authenticated (i.e. logged in) and set session in state
  componentDidMount() {
    auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation authUser={this.state.authUser} />
          <hr />
          <Route exact path="/" component={Home} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/dashboard" component={AdminDashboard} />
          <Route path="/login" component={Login} />
          <Route path={"/editor"} component={Editor} />
          <Route path={"/about"} component={About} />
          <Route path={`/articles/:articleId`} component={Article} />
        </div>
      </Router>
    );
  }
}

export default App;
