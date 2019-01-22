import React, { Component } from "react";
import { Typography } from "@material-ui/core";

class About extends Component {
  render() {
    return (
      <div style={{ flex: 1, padding: 20 }}>
        <Typography variant="h2" gutterBottom>
          About
        </Typography>
        <Typography variant="h5" gutterBottom>
          Hi, I'm Samantha
        </Typography>
        <p>
          Here is some more info about me: I love lo mein, I am currently eating
          lo mein, I just spilled noodles on my laptop.
        </p>
      </div>
    );
  }
}

export default About;
