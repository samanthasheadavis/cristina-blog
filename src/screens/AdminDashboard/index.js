import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firebase } from "../../services";
import Moment from "react-moment";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button
} from "@material-ui/core";

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
        <TableRow key={article.id}>
          <TableCell>{article.data.title}</TableCell>
          <TableCell>{article.data.author}</TableCell>
          <TableCell>{article.data.language}</TableCell>
          <TableCell>
            <Moment format="llll">
              {article.data.created_at && article.data.created_at.toDate()}
            </Moment>
          </TableCell>
          <TableCell>
            <Moment format="llll">
              {article.data.updated_at && article.data.updated_at.toDate()}
            </Moment>
          </TableCell>
          <Button variant="contained" color="primary">
            Edit
          </Button>
        </TableRow>
      ));
    }
  }

  render() {
    return (
      <div>
        <h2>My Dashboard</h2>
        <Link to={"/editor"}>Create New Article</Link>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Updated</TableCell>
              <TableCell padding="checkbox" />
            </TableRow>
          </TableHead>
          <TableBody>{this.articlesIndex()}</TableBody>
        </Table>
      </div>
    );
  }
}

export default AdminDashboard;
