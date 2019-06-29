import React, { Component } from "react";
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
    } else {
      return <div />;
    }
  }

  render() {
    return (
      <div style={styles.root}>
        <Grid container>{this.articlesIndex()}</Grid>
      </div>
    );
  }
}

export default Home;
