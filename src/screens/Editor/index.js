import React, { Component } from "react";
import { firebase } from "../../services";

const INITIAL_STATE = {
  title: "",
  author: "",
  body: "",
  error: null
};

class Editor extends Component {
  state = { ...INITIAL_STATE };

  handleSubmit(event) {
    console.log("form submitted!");
  }

  validateForm(event) {
    event.preventDefault();
    if (this.state.title && this.state.author && this.state.body) {
      this.setState({ ...INITIAL_STATE });
      this.handleSubmit();
    } else {
      if (!this.state.title) {
        this.setState({ error: { ...this.state.error, title: true } });
      }
      if (!this.state.author) {
        this.setState({ error: { ...this.state.error, author: true } });
      }
      if (!this.state.body) {
        this.setState({ error: { ...this.state.error, body: true } });
      }
    }
    console.log(this.state.error);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { title, author, body, error } = this.state;
    return (
      <div>
        <h2>Article Editor</h2>
        <form onSubmit={this.validateForm.bind(this)}>
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
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Editor;
