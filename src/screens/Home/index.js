import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firebase } from "../../services";
import styles from "../../styles";

import { GridList, Grid } from "@material-ui/core";

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
      <Grid
        container
        spacing={16}
        style={{ paddingLeft: 100, paddingRight: 100 }}
      >
        <Grid item xs={6}>
          <h2>Home</h2>
        </Grid>
        <Grid item xs={6}>
          <Link to="/about">About</Link>
        </Grid>
        <Grid item xs={12}>
          <GridList cols={3}>{this.articlesIndex()}</GridList>
        </Grid>
      </Grid>
    );
  }
}

export default Home;
