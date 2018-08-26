import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { articleService } from "../../services";
import { firebase } from "../../services";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Input,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";

const INITIAL_STATE = {
  title: "",
  author: "",
  body: "",
  subtitle: "",
  language: "",
  tags: [],
  hidden: true,
  titleValid: false,
  authorValid: false,
  bodyValid: false,
  formValid: false
};

class Editor extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    const articleId = this.props.match.params.articleId;

    if (articleId) {
      firebase.db
        .collection("articles")
        .doc(articleId)
        .get()
        .then(article => {
          if (article.exists) {
            this.setState(article.data());
            this.setState({
              titleValid: true,
              authorValid: true,
              bodyValid: true,
              formValid: true
            });
          } else {
            alert("no document found matching ID" + articleId);
          }
        });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const articleId = this.props.match.params.articleId;
    const articleObj = {
      title: this.state.title,
      author: this.state.author,
      body: this.state.body
    };
    if (articleId) {
      articleService.UpdateArticle(articleObj, articleId).then(response => {
        this.props.history.push("/dashboard");
      });
    } else {
      articleService.AddArticle(articleObj).then(response => {
        this.props.history.push("/dashboard");
      });
    }
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

  deleteArticle(id) {
    articleService.DeleteArticle(id).then(response => {
      if (response != null) {
        alert(response);
      } else {
        this.props.history.push("/dashboard");
      }
    });
  }

  render() {
    const articleId = this.props.match.params.articleId;
    const {
      title,
      author,
      body,
      subtitle,
      language,
      hidden,
      tags
    } = this.state;
    return (
      <Paper
        elevation={1}
        style={{
          flex: 1,
          margin: 20,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 20,
          paddingTop: 10
        }}
      >
        <Typography variant="headline" component="h3">
          Article Editor
        </Typography>
        {articleId && (
          <button onClick={() => this.deleteArticle(articleId)}>
            <p>Delete</p>
          </button>
        )}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup>
            <TextField
              name="title"
              style={{ display: "block" }}
              id="with-placeholder"
              label="Title"
              placeholder="Title"
              margin="normal"
              value={title}
              onChange={this.handleChange.bind(this)}
            />
            <TextField
              name="subtitle"
              style={{ display: "block" }}
              id="with-placeholder"
              label="Subtitle"
              placeholder="Subtitle (optional)"
              margin="normal"
              value={subtitle}
              onChange={this.handleChange.bind(this)}
            />
            <TextField
              name="author"
              style={{ display: "block" }}
              id="with-placeholder"
              label="Author"
              placeholder="Author"
              margin="normal"
              value={author}
              onChange={this.handleChange.bind(this)}
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox value="antoine" />}
              label="Antoine Llorca"
            />
          </FormGroup>

          <FormGroup>
            <Paper
              elevation={2}
              style={{ marginTop: 20, padding: 10, flex: 1 }}
            >
              <Input
                disableUnderline={true}
                name="body"
                id="textarea"
                multiline
                margin="normal"
                fullWidth
                placeholder="Body"
                onChange={this.handleChange.bind(this)}
                value={body}
              />
            </Paper>
          </FormGroup>
          <Button
            style={{ marginTop: 20 }}
            variant="contained"
            color="primary"
            disabled={!this.state.formValid}
          >
            Save
          </Button>
        </form>
      </Paper>
    );
  }
}

export default withRouter(Editor);
