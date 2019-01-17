import React, { Component } from "react";
import { firebase } from "../../services";
import styles from "../../styles";
import { Typography, CircularProgress } from "@material-ui/core";

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
          {/* <p>{article.data.body}</p> */}
        </div>
      );
    } else {
      return (
        <div style={styles.root}>
          <CircularProgress />
        </div>
      );
    }
  }
}

export default Article;
