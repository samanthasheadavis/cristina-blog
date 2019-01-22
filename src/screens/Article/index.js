import React, { Component } from "react";
import { firebase } from "../../services";
import styles from "../../styles";
import { CircularProgress } from "@material-ui/core";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { wstyles } from "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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
          this.setState({
            editorState: EditorState.createWithContent(
              convertFromRaw(article.data().body)
            )
          });
        } else {
          alert("no document found matching ID" + articleId);
        }
      });
  }

  render() {
    if (this.state.editorState) {
      return (
        <div style={{ flex: 1, padding: 20 }}>
          <Editor
            toolbarHidden
            editorState={this.state.editorState}
            readOnly={true}
          />
        </div>
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
