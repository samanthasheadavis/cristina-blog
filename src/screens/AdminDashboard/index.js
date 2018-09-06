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
  Button,
  Typography,
  Grid
} from "@material-ui/core";
import styles from "../../styles";

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
          <TableCell>
            <Link to={`/articles/${article.id}`}>{article.data.title}</Link>
          </TableCell>
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
          <TableCell>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/editor/${article.id}`}
            >
              Edit
            </Button>
          </TableCell>
        </TableRow>
      ));
    }
  }

  render() {
    return (
      <div style={styles.root}>
        <Grid container direction={"row"} justify={"space-between"}>
          <Typography variant="headline" component="h3">
            My Dashboard
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/editor`}
          >
            Create New Article
          </Button>
        </Grid>

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
