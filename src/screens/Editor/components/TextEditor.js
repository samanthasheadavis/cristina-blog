import React from "react";
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from "draft-js";
import { Paper, FormLabel } from "@material-ui/core";
import { Editor } from "react-draft-wysiwyg";
import { wstyles } from "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class TextEditor extends React.Component {
  // Converts body text (if present) from raw DraftJS object into formatted text
  // Else creates new empty draft js object

  state = {
    uploadImages: [],
    editorState: this.props.self.state.body
      ? EditorState.createWithContent(
          convertFromRaw(this.props.self.state.body)
        )
      : EditorState.createEmpty()
  };

  // saving raw body to editor state
  // manually validating editor body
  onChange = editorState => {
    this.setState({ editorState });
    const body = convertToRaw(this.state.editorState.getCurrentContent());
    this.props.self.setState(
      { body: body },
      this.props.self.validateField("body", body)
    );
  };

  // Function to upload images locally to preview in editor
  _uploadImage(file) {
    console.log(this.state.uploadImages);
    const imageObject = { file: file, localSrc: URL.createObjectURL(file) };
    this.setState([...this.state.uploadImages, imageObject]);
    return new Promise((resolve, reject) => {
      resolve({ data: { link: imageObject.localSrc } });
    });
  }

  render() {
    return (
      <div className="editor" style={{ marginTop: 10 }}>
        <FormLabel component="legend">Body</FormLabel>

        <Paper elevation={2} style={{ padding: 10, flex: 1, marginTop: 5 }}>
          <Editor
            editorState={this.state.editorState}
            toolbar={{
              image: { uploadCallback: this._uploadImage.bind(this) }
            }}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            onEditorStateChange={this.onChange}
          />
        </Paper>
      </div>
    );
  }
}

export default TextEditor;
