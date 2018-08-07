import React, { Component } from "react";
import { Link } from "react-router-dom";

class AdminDashboard extends Component {
  articlesIndex() {
    if (this.props.articles && this.props.articles.length > 0) {
      return this.props.articles.map(article => (
        <div key={article.id}>
          <p>{article.id}</p>
          <Link to={"/editor"} params={article}>
            Edit
          </Link>
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
