import React, { Component } from "react";
import { firebase } from "../../services";
import styles from "../../styles";
import { CircularProgress, Grid, Typography, Paper } from "@material-ui/core";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { wstyles } from "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Moment from "react-moment";

class Article extends Component {
  state = {
    editorState: undefined
  };

  componentDidMount() {
    const articleId = this.props.match.params.articleId;
    firebase.db
      .collection("articles")
      .doc(articleId)
      .get()
      .then(article => {
        if (article.exists) {
          // Save article data and body seperately to state, since body must be converted from raw first
          const articleData = { ...article.data() };
          delete articleData.body;
          this.setState({
            editorState: EditorState.createWithContent(
              convertFromRaw(article.data().body)
            ),
            articleData: articleData
          });
        } else {
          alert("no document found matching ID" + articleId);
        }
      });
  }

  render() {
    const { articleData, editorState } = this.state;
    if (editorState && articleData) {
      return (
        <Grid container spacing={8} style={styles.mainGridContainer}>
          <Grid item xs={2} />
          <Grid item xs={8} style={{ flex: 1 }}>
            {/* ====================== Title ====================== */}
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {articleData.title !== undefined ? articleData.title : "No Title"}
            </Typography>
            {/* ====================== Subtitle ====================== */}
            {articleData.subtitle !== undefined && (
              <Typography variant="h5" color="inherit" paragraph>
                {articleData.subtitle}
              </Typography>
            )}
            {/* ====================== Date and Author ====================== */}
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              {articleData.created_at !== undefined && (
                <Moment format="llll">{articleData.created_at.toDate()}</Moment>
              )}
              {articleData.author !== undefined && ` by ${articleData.author}`}
            </Typography>
            {/* ====================== Image if present ====================== */}
            {articleData.coverPhotoURL !== undefined &&
              articleData.coverPhotoURL !== "" && (
                <Grid
                  item
                  xs={12}
                  style={{
                    ...styles.articleHeroImg,
                    backgroundImage: `url(${articleData.coverPhotoURL})`
                  }}
                />
              )}
            {/* ====================== Body ====================== */}
            <Editor toolbarHidden editorState={editorState} readOnly={true} />
          </Grid>
          <Grid item xs={2} />
        </Grid>
      );
    } else {
      return (
        <div style={styles.root}>
          <CircularProgress />
        </div>
      );
    }
  }
}

export default Article;
