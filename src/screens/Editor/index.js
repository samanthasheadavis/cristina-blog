import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { articleService } from "../../services";

const INITIAL_STATE = {
  title: "",
  author: "",
  body: "",
  titleValid: false,
  authorValid: false,
  bodyValid: false,
  formValid: false
};

class Editor extends Component {
  state = { ...INITIAL_STATE };

  handleSubmit(event) {
    event.preventDefault();
    const articleObj = {
      title: this.state.title,
      author: this.state.author,
      body: this.state.body
    };
    articleService.AddArticle(articleObj).then(response => {
      this.props.history.push("/dashboard");
    });
  }

  validateField(name, val) {
    let titleValid = this.state.titleValid;
    let authorValid = this.state.authorValid;
    let bodyValid = this.state.bodyValid;

    switch (name) {
      case "title":
        titleValid = val === "" ? false : true;
        break;
      case "author":
        authorValid = val === "" ? false : true;
        break;
      case "body":
        bodyValid = val === "" ? false : true;
        break;
    }
    this.setState({
      titleValid: titleValid,
      authorValid: authorValid,
      bodyValid: bodyValid,
      formValid: titleValid && authorValid && bodyValid
    });
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
    const { title, author, body } = this.state;
    return (
      <div>
        <h2>Article Editor</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange.bind(this)}
          />
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={this.handleChange.bind(this)}
          />
          <label>Body</label>
          <textarea
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

export default withRouter(Editor);
