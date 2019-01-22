import React, { Component } from "react";
import { Link } from "react-router-dom";

import { GridListTile, GridListTileBar, Button } from "@material-ui/core";

class ArticlePreview extends Component {
  render() {
    const { article } = this.props;
    return (
      <Button component={Link} to={`/articles/${article.id}`}>
        <GridListTile style={{ margin: 10, padding: 10 }}>
          {article.data.coverPhotoURL && (
            <img
              alt={article.data.coverPhotoURL}
              src={article.data.coverPhotoURL}
            />
          )}
          <GridListTileBar title={article.data.title} />
        </GridListTile>
      </Button>
    );
  }
}

export default ArticlePreview;
