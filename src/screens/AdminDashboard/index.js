import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firebase } from "../../services";

class AdminDashboard extends Component {
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
        <div key={article.id}>
          <p>{article.data.title}</p>
          <Link to={"/editor/" + article.id}>Edit</Link>
        </div>
      ));
    }
  }

  render() {
    return (
      <div>
        <h2>My Dashboard</h2>
        <Link to={"/editor"}>Create New Article</Link>
        {this.articlesIndex()}
      </div>
    );
  }
}

export default AdminDashboard;
