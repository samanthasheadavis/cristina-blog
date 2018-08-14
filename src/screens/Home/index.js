import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firebase } from "../../services";

import { GridList } from "@material-ui/core";

import ArticlePreview from "./components/ArticlePreview";
class Home extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    firebase.db
      .collection("articles")
      .get()
      .then(articles => {
        // save articles to state
        articles.forEach(article => {
          this.setState({
            articles: [
              ...this.state.articles,
              {
                id: article.id,
                data: article.data()
              }
            ]
          });
        });
      });
  }

  articlesIndex() {
    if (this.state.articles && this.state.articles.length > 0) {
      return this.state.articles.map(article => (
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
