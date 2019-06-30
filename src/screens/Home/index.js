import React, { Component } from "react";
import { firebase } from "../../services";
import styles from "../../styles";

import { GridList, Grid } from "@material-ui/core";

import ArticlePreview from "./components/ArticlePreview";
class Home extends Component {
  state = {
    articles: [],
    lastArticle: undefined
  };

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll, false);
    const articlesRef = firebase.db
      .collection("articles")
      .orderBy("created_at", "desc")
      .limit(3);
    this.loadArticles(articlesRef);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  loadArticles = articlesRef => {
    articlesRef.get().then(articles => {
      var lastArticle = articles.docs[articles.docs.length - 1];
      this.setState({ lastArticle: lastArticle });
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
  };

  loadMore() {
    const articlesRef = firebase.db
      .collection("articles")
      .orderBy("created_at", "desc")
      .limit(3)
      .startAfter(this.state.lastArticle);
    this.loadArticles(articlesRef);
  }

  onScroll = () => {
    // If end of page reached, load next batch of articles
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.loadMore();
    }
  };

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
