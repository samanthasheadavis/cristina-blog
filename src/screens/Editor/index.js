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
  Grid,
  FormControlLabel,
  Checkbox,
  FormLabel
} from "@material-ui/core";
import styles from "../../styles";

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
  languageValid: false,
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
              languageValid: true,
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
      subtitle: this.state.subtitle,
      author: this.state.author,
      body: this.state.body,
      language: this.state.language
    };
    console.log(articleObj);
    if (articleId) {
      articleService.UpdateArticle(articleObj, articleId).then(response => {
        // this.props.history.push("/dashboard");
      });
    } else {
      articleService.AddArticle(articleObj).then(response => {
        // this.props.history.push("/dashboard");
      });
    }
  }

  validateField(name, val) {
    let titleValid = this.state.titleValid;
    let authorValid = this.state.authorValid;
    let bodyValid = this.state.bodyValid;
    let languageValid = this.state.languageValid;

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
      case "language":
        languageValid = val === "" ? false : true;
        break;
    }
    this.setState({
      titleValid: titleValid,
      authorValid: authorValid,
      bodyValid: bodyValid,
      languageValid: languageValid,
      formValid: titleValid && authorValid && bodyValid && languageValid
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
      <div style={styles.root}>
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
          <Grid container direction={"column"}>
            <Grid container direction={"column"}>
              <Typography variant="headline" component="h3">
                Article Editor
              </Typography>
            </Grid>

            <form onSubmit={this.handleSubmit.bind(this)}>
              <Grid container direction={"row"} justify={"space-between"}>
                <Grid item xs={6}>
                  <TextField
                    name="title"
                    style={{ display: "block" }}
                    id="with-placeholder"
                    label="Title"
                    placeholder="Title"
                    value={title}
                    onChange={this.handleChange.bind(this)}
                  />
                  <TextField
                    name="subtitle"
                    style={{ display: "block" }}
                    id="with-placeholder"
                    label="Subtitle"
                    placeholder="Subtitle (optional)"
                    value={subtitle}
                    onChange={this.handleChange.bind(this)}
                  />
                  <TextField
                    name="author"
                    style={{ display: "block" }}
                    id="with-placeholder"
                    label="Author"
                    placeholder="Author"
                    value={author}
                    onChange={this.handleChange.bind(this)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormLabel component="legend">Language</FormLabel>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={language === "english"}
                        name="language"
                        value={"english"}
                        onChange={this.handleChange.bind(this)}
                      />
                    }
                    label="English"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={language === "spanish"}
                        name="language"
                        value={"spanish"}
                        onChange={this.handleChange.bind(this)}
                      />
                    }
                    label="Spanish"
                  />
                </Grid>
              </Grid>

              <Grid container direction={"column"}>
                <Paper
                  elevation={2}
                  style={{ marginTop: 20, padding: 10, flex: 1 }}
                >
                  <Input
                    disableUnderline={true}
                    name="body"
                    id="textarea"
                    multiline
                    fullWidth
                    placeholder="Body"
                    onChange={this.handleChange.bind(this)}
                    value={body}
                  />
                </Paper>
              </Grid>
              <Grid container direction={"row"}>
                <Button
                  style={{ marginTop: 20, marginRight: 20 }}
                  variant="contained"
                  color="primary"
                  disabled={!this.state.formValid}
                  type={"submit"}
                >
                  Save
                </Button>
                {articleId && (
                  <Button
                    style={{ marginTop: 20, backgroundColor: "red" }}
                    variant="contained"
                    onClick={() => this.deleteArticle(articleId)}
                    color="primary"
                  >
                    Delete
                  </Button>
                )}
              </Grid>
            </form>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withRouter(Editor);
