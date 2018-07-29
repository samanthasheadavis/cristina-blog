import React, { Component } from "react";
import { firebase } from "../../services";
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
        <div>
          <h1>{article.data.title}</h1>
          <h2>by {article.data.author}</h2>
          <p>{article.data.body}</p>
        </div>
      );
    } else {
      return (
        <div>
          <Spinner name="pacman" />
        </div>
      );
    }
  }
}

export default Article;
