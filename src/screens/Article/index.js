import React, { Component } from "react";
import { firebase } from "../../services";
import styles from "../../styles";
import { Typography } from "@material-ui/core";

const Spinner = require("react-spinkit");

class Article extends Component {
  state = {
    article: undefined
  };

  componentDidMount() {
    const articleId = this.props.match.params.articleId;
    firebase.db
      .collection("articles")
      .doc(articleId)
      .get()
      .then(article => {
        if (article.exists) {
          this.setState({
            article: {
              id: articleId,
              data: article.data()
            }
          });
        } else {
          alert("no document found matching ID" + articleId);
        }
      });
  }

  render() {
    if (this.state.article) {
      const { article } = this.state;
      return (
        <div style={styles.root}>
          <Typography variant="headline" component="h3">
            {article.data.title}
          </Typography>
        </div>
      );
    } else {
      return (
        <div style={styles.root}>
          <Spinner name="pacman" />
        </div>
      );
    }
  }
}

export default Article;
