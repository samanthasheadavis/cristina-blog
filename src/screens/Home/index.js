import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firebase } from "../../services";

import ArticlePreview from "./components/ArticlePreview";
class Home extends Component {
  articlesIndex() {
    if (this.props.articles && this.props.articles.length > 0) {
      return this.props.articles.map(article => (
        <ArticlePreview key={article.id} article={article} />
      ));
    }
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        <Link to="/about">About</Link>
        {this.articlesIndex()}
      </div>
    );
  }
}

export default Home;
