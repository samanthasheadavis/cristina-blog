import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { articleService } from "../../services";
import { firebase } from "../../services";
import TextEditor from "./components/TextEditor";

import {
  TextField,
  Button,
  Paper,
  Typography,
  Input,
  Grid,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormHelperText,
  Chip,
  CircularProgress
} from "@material-ui/core";
import styles from "../../styles";

const INITIAL_STATE = {
  title: "",
  author: "",
  body: "",
  subtitle: "",
  language: "",
  tagsString: "",
  tags: [],
  hidden: true,
  titleValid: false,
  authorValid: false,
  bodyValid: false,
  languageValid: false,
  formValid: false,
  articleLoading: true
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
              formValid: true,
              articleLoading: false
            });
          } else {
            alert("no document found matching ID" + articleId);
          }
        });
    } else {
      this.setState({ articleLoading: false });
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
      language: this.state.language,
      hidden: this.state.hidden,
      tags: this.state.tags
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
      default:
        return null;
    }
    this.setState({
      titleValid: titleValid,
      authorValid: authorValid,
      bodyValid: bodyValid,
      languageValid: languageValid,
      formValid: titleValid && authorValid && languageValid
    });
  }

  handleChange(event) {
    if (event.target.name === "hidden") {
      this.setState({ hidden: !this.state.hidden });
    } else {
      this.setState(
        { [event.target.name]: event.target.value },
        this.validateField(event.target.name, event.target.value)
      );
    }
  }

  handleTagSubmit(event) {
    event.preventDefault();
    var code = event.keyCode || event.which;
    if (code === 13) {
      const str = this.state.tagsString;
      const noWhiteSpace = str.replace(/\s+/g, "");
      this.setState({
        tags: [...this.state.tags, noWhiteSpace],
        tagsString: ""
      });
    }
  }

  handleChipDelete(item) {
    const tags = [...this.state.tags];
    const index = tags.indexOf(item);
    tags.splice(index, 1);
    this.setState({ tags: tags });
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
      subtitle,
      language,
      tagsString,
      hidden,
      articleLoading
    } = this.state;
    if (articleLoading) {
      return (
        <div style={styles.root}>
          <CircularProgress />
        </div>
      );
    } else {
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
                  {/* ================================= BLOCK 1: TITLE, SUBTITLE, AUTHOR ==================================== */}
                  <Grid item xs={6} style={{ paddingRight: 20 }}>
                    <TextField
                      name="title"
                      style={{ display: "block" }}
                      id="with-placeholder"
                      fullWidth
                      label="Title"
                      placeholder="Title"
                      value={title}
                      onChange={this.handleChange.bind(this)}
                    />
                    <TextField
                      name="subtitle"
                      style={{ display: "block" }}
                      id="with-placeholder"
                      fullWidth
                      label="Subtitle"
                      placeholder="Subtitle (optional)"
                      value={subtitle}
                      onChange={this.handleChange.bind(this)}
                    />
                    <TextField
                      name="author"
                      style={{ display: "block" }}
                      id="with-placeholder"
                      fullWidth
                      label="Author"
                      placeholder="Author"
                      value={author}
                      onChange={this.handleChange.bind(this)}
                    />
                  </Grid>
                  {/* ================================= BLOCK 2: LANGUAGE, PRIVATE ==================================== */}

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
                    <FormLabel component="legend">Private</FormLabel>
                    <FormHelperText>
                      Private articles will not be displayed on the Baturra Blog
                      public page.
                    </FormHelperText>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={hidden === true}
                          name="hidden"
                          value={hidden.toString()}
                          onChange={this.handleChange.bind(this)}
                        />
                      }
                      label="Private"
                    />
                  </Grid>
                </Grid>
                {/* ================================= BLOCK 3: TAGS, BODY ==================================== */}
                <Grid container direction={"column"}>
                  <Paper
                    elevation={2}
                    style={{
                      marginTop: 20,
                      padding: 10,
                      flex: 1,
                      flexDirection: "row"
                    }}
                  >
                    {this.state.tags &&
                      this.state.tags.length > 0 &&
                      this.state.tags.map((tag, i) => (
                        <Chip
                          key={i}
                          style={{ marginRight: 10 }}
                          label={tag}
                          onDelete={() => this.handleChipDelete(tag)}
                        />
                      ))}
                    <Input
                      disableUnderline={true}
                      name="tagsString"
                      id="textarea"
                      placeholder="Tags (optional)"
                      onChange={this.handleChange.bind(this)}
                      onKeyPress={this.handleTagSubmit.bind(this)}
                      value={tagsString}
                    />
                  </Paper>
                  <FormHelperText>
                    Enter tags seperated by commas i.e. "education,
                    permaculture". Tags are not case sensitive.
                  </FormHelperText>

                  <TextEditor self={this} />
                </Grid>
                {/* ================================= BLOCK 4: SUBMIT, DELETE ==================================== */}

                <Grid container direction={"row"}>
                  <Button
                    style={{ marginTop: 20, marginRight: 20 }}
                    variant="contained"
                    color="primary"
                    disabled={!this.state.formValid}
                    type={"button"}
                    onClick={this.handleSubmit.bind(this)}
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
}

export default withRouter(Editor);
