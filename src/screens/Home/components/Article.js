import React, { Component } from "react";

class Article extends Component {
  render() {
    const { article } = this.props;
    return (
      <div>
        <h1>{article.data.title}</h1>
        <h2>by {article.data.author}</h2>
        <p>{article.data.body}</p>
      </div>
    );
  }
}

export default Article;
