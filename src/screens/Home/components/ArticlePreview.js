import React, { Component } from "react";
import { Link } from "react-router-dom";

import { GridListTile } from "@material-ui/core";

class ArticlePreview extends Component {
  render() {
    const { article } = this.props;
    return (
      <GridListTile>
        <h1>{article.data.title}</h1>
        <h2>by {article.data.author}</h2>
        <p>{article.data.body}</p>
        <Link to={`/articles/${article.id}`}>View</Link>
      </GridListTile>
    );
  }
}

export default ArticlePreview;
