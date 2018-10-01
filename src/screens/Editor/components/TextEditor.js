import React from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import { Paper, FormLabel } from "@material-ui/core";

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => {
      this.setState({ editorState });
      const body = convertToRaw(this.state.editorState.getCurrentContent());
      this.props.self.setState(
        { body: body },
        this.props.self.validateField("body", body)
      );
    };

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  }

  render() {
    console.log(this.props.self);
    return (
      <div className="editor" style={{ marginTop: 10 }}>
        <FormLabel component="legend">Body</FormLabel>

        <Paper elevation={2} style={{ padding: 10, flex: 1, marginTop: 5 }}>
          <Editor
            handleKeyCommand={this.handleKeyCommand}
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </Paper>
      </div>
    );
  }
}

export default TextEditor;
