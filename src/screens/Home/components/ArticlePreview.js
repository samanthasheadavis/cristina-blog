import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

class ArticlePreview extends Component {
  render() {
    const { article } = this.props;
    return (
      <div>
        <h1>{article.data.title}</h1>
        <h2>by {article.data.author}</h2>
        <p>{article.data.body}</p>
        <Link to={`/articles/${article.id}`}>View</Link>
      </div>
    );
  }
}

export default ArticlePreview;
