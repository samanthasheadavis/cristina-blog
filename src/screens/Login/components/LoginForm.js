import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth } from "../../../services";

import { SignUpLink } from "../../SignUp/components/SignUpForm";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    event.preventDefault();
    auth
      .SignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        this.props.history.push("/dashboard");
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";
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
            value={password}
            onChange={event =>
              this.setState(byPropKey("password", event.target.value))
            }
            type="password"
            placeholder="Password"
          />
          <button disabled={isInvalid} type="submit">
            Sign In
          </button>

          {error && <p>{error.message}</p>}
        </form>
        <SignUpLink />
      </div>
    );
  }
}

const LoginLink = () => (
  <p>
    Already have an account? <Link to="/login">Log In</Link>
  </p>
);

export default withRouter(LoginForm);

export { LoginForm, LoginLink };
