import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firebase } from "../../services";

class Home extends Component {
  componentDidMount() {
    const docRef = firebase.db
      .collection("articles")
      .doc("0JJRzFZIGnZeAnRGPIYF");

    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        <Link to="/about">About</Link>
      </div>
    );
  }
}

export default Home;
