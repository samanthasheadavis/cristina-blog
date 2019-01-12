import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../services";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="title" color="inherit" style={{ flexGrow: 1 }}>
        Baturra
      </Typography>
      <Button color="inherit" component={Link} to="/about">
        About
      </Button>
      <Button color="inherit" component={Link} to="/">
        BLOG
      </Button>
      <Button color="inherit" component={Link} to="/dashboard">
        MY DASHBOARD
      </Button>
      <Button color="inherit" onClick={auth.SignOut}>
        Sign Out
      </Button>
    </Toolbar>
  </AppBar>
);

const NavigationNonAuth = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography
        variant="title"
        color="inherit"
        component={Link}
        to="/"
        style={{ flexGrow: 1, textDecoration: "none" }}
      >
        Baturra
      </Typography>
      <Button color="inherit" component={Link} to="/">
        BLOG
      </Button>
      <Button color="inherit" component={Link} to="/about">
        About
      </Button>
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
    </Toolbar>
  </AppBar>
);

export default Navigation;
