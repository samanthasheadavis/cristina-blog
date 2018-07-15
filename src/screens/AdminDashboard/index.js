import React, { Component } from "react";
import { Link } from "react-router-dom";

class AdminDashboard extends Component {
  render() {
    return (
      <div>
        <h2>My Dashboard</h2>
        <Link to={"/editor"}>Create New Article</Link>
      </div>
    );
  }
}

export default AdminDashboard;
