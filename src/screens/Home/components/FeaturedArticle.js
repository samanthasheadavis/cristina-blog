import React, { Component } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

class FeaturedArticle extends Component {
  render() {
    const { title, subtitle, coverPhotoURL } = this.props.article;
    return (
      <Grid
        item
        xs={12}
        style={{
          marginBottom: 10,
          marginLeft: 10,
          marginRight: 10
        }}
      >
        <Paper elevation={2}>
          <Grid container>
            <Grid item md={6} style={{ padding: 20 }}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {title !== undefined ? title : "Untitled"}
              </Typography>
              {subtitle !== undefined && (
                <Typography variant="h5" color="inherit" paragraph>
                  {subtitle}
                </Typography>
              )}
            </Grid>
            <Grid item md={6}>
              {coverPhotoURL !== undefined && coverPhotoURL !== "" && (
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover"
                  }}
                  src={coverPhotoURL}
                />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

export default FeaturedArticle;
