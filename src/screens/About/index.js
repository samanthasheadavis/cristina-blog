import React, { Component } from "react";
import styles from "../../styles";
import { Typography } from "@material-ui/core";

class About extends Component {
  render() {
    return (
      <div style={styles.root}>
        <Typography variant="headline" component="h3">
          About
        </Typography>
      </div>
    );
  }
}

export default About;
