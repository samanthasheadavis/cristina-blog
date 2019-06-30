import React, { Component } from "react";
import { firebase } from "../../services";
import styles from "../../styles";

import { Grid, Paper, Typography } from "@material-ui/core";

import ArticlePreview from "./components/ArticlePreview";
import FeaturedArticle from "./components/FeaturedArticle";

class Home extends Component {
  state = {
    articles: [],
    featuredArticle: undefined,
    lastArticle: undefined
  };

  componentDidMount() {
    // Add scroll event listener for infinite scroll functionality
    window.addEventListener("scroll", this.onScroll, false);
    const articlesRef = firebase.db
      .collection("articles")
      .orderBy("created_at", "desc")
      .limit(6);
    // Load articles and save first as featured article for display purposes
    this.loadArticles(articlesRef).then(() => {
      this.setState({ featuredArticle: this.state.articles[0] });
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  loadArticles = articlesRef => {
    return articlesRef.get().then(articles => {
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

  // Function to load next batch of articles
  loadMore() {
    if (this.state.lastArticle !== undefined) {
      const articlesRef = firebase.db
        .collection("articles")
        .orderBy("created_at", "desc")
        .limit(6)
        .startAfter(this.state.lastArticle);
      this.loadArticles(articlesRef);
    }
  }

  onScroll = () => {
    // If end of page reached, load next batch of articles
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.loadMore();
    }
  };

  articlesIndex() {
    if (this.state.articles && this.state.articles.length > 0) {
      return this.state.articles.map((article, i) => (
        <ArticlePreview key={article.id} article={article} />
      ));
    } else {
      return <div />;
    }
  }

  render() {
    return (
      <div style={styles.root}>
        <Grid container>
          {this.state.featuredArticle !== undefined && (
            <FeaturedArticle article={this.state.featuredArticle.data} n />
          )}
          {this.articlesIndex()}
        </Grid>
      </div>
    );
  }
}

export default Home;
