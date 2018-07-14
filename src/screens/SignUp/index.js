import React, { Component } from "react";
import SignUpForm from "./components/SignUpForm";

class SignUp extends Component {
  render() {
    return (
      <div>
        <h2>Creat an Account</h2>
        <SignUpForm />
      </div>
    );
  }
}

export default SignUp;
