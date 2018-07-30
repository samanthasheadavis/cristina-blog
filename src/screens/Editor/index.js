import React, { Component } from "react";
import { firebase } from "../../services";

const INITIAL_STATE = {
  title: "",
  author: "",
  body: "",
  formErrors: { title: "", author: "", body: "" },
  titleValid: false,
  authorValid: false,
  bodyValid: false,
  formValid: false
};

class Editor extends Component {
  state = { ...INITIAL_STATE };

  handleSubmit(event) {
    console.log("form submitted!");
  }

  validateField(name, val) {
    console.log("in");
    let fieldValidationErrors = this.state.formErrors;
    let titleValid = this.state.titleValid;
    let authorValid = this.state.authorValid;
    let bodyValid = this.state.bodyValid;

    switch (name) {
      case "title":
        titleValid = true;
        fieldValidationErrors.title = titleValid ? "" : " is required.";
        break;
      case "author":
        authorValid = true;
        fieldValidationErrors.author = authorValid ? "" : " is required.";
        break;
      case "body":
        bodyValid = true;
        fieldValidationErrors.body = bodyValid ? "" : " is required.";
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        titleValid: titleValid,
        authorValid: authorValid,
        bodyValid: bodyValid
      },
      this.setState({
        formValid:
          this.state.titleValid &&
          this.state.authorValid &&
          this.state.bodyValid
      })
    );
    console.log(this.state);
  }

  handleChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      this.validateField(event.target.name, event.target.value)
    );
  }

  render() {
    const { title, author, body, error } = this.state;
    return (
      <div>
        <h2>Article Editor</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Title</label>
          <input
            style={{ borderColor: error && error.title ? "red" : "none" }}
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange.bind(this)}
          />
          <label>Author</label>
          <input
            style={{ borderColor: error && error.author ? "red" : "none" }}
            type="text"
            name="author"
            value={author}
            onChange={this.handleChange.bind(this)}
          />
          <label>Body</label>
          <textarea
            style={{ borderColor: error && error.body ? "red" : "none" }}
            value={body}
            name="body"
            onChange={this.handleChange.bind(this)}
          />
          <input
            type="submit"
            value="Submit"
            disabled={!this.state.formValid}
          />
        </form>
      </div>
    );
  }
}

export default Editor;
