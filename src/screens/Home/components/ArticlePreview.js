import React, { Component } from "react";
import {
  Card,
  CardActionArea,
  Typography,
  CardContent,
  CardMedia,
  Grid
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { GridListTile, GridListTileBar, Button } from "@material-ui/core";
import styles from "../../../styles";

class ArticlePreview extends Component {
  render() {
    const { article } = this.props;
    return (
      <Grid item key={article.data.title} xs={12} md={4}>
        <Card raised style={{ margin: 10, display: "flex" }}>
          <CardActionArea component="a" href={`/articles/${article.id}`}>
            {article.data.coverPhotoURL !== undefined &&
              article.data.coverPhotoURL !== "" && (
                <img
                  style={{
                    height: 200,
                    width: "100%",
                    objectFit: "cover"
                  }}
                  src={article.data.coverPhotoURL}
                />
              )}
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {article.data.title !== undefined
                  ? article.data.title
                  : "Untitled"}
              </Typography>
              {article.data.subtitle !== undefined && (
                <Typography variant="body2" color="textSecondary" component="p">
                  {article.data.subtitle}
                </Typography>
              )}
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  }
}

export default ArticlePreview;
