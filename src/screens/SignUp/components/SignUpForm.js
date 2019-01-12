import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth, firebase } from "../../../services";

import { LoginLink } from "../../Login/components/LoginForm";

const INITIAL_STATE = {
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class SignUpForm extends Component {
  state = INITIAL_STATE;

  // Check whether user authenticated (i.e. logged in) and set session in state
  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  onSubmit = event => {
    const { email, passwordOne } = this.state;
    event.preventDefault();
    auth
      .CreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
        this.props.history.push("/dashboard");
      })
      .catch(e => {
        this.setState(byPropKey("error", e));
      });
  };

  render() {
    const { email, passwordOne, passwordTwo, error, authUser } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === "" || email === "";
    if (authUser) {
      return (
        <div>
          <form onSubmit={this.onSubmit}>
            <input
              value={email}
              onChange={event =>
                this.setState(byPropKey("email", event.target.value))
              }
              type="text"
              placeholder="Email Address"
            />
            <input
              value={passwordOne}
              onChange={event =>
                this.setState(byPropKey("passwordOne", event.target.value))
              }
              type="password"
              placeholder="Password"
            />
            <input
              value={passwordTwo}
              onChange={event =>
                this.setState(byPropKey("passwordTwo", event.target.value))
              }
              type="password"
              placeholder="Confirm Password"
            />
            <button disabled={isInvalid} type="submit">
              Sign Up
            </button>

            {error && <p>{error.message}</p>}
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <p>You are not authorized to create admin accounts.</p>
        </div>
      );
    }
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to="/sign-up">Sign Up</Link>
  </p>
);

export default withRouter(SignUpForm);

export { SignUpForm, SignUpLink };
