import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "./SignOut";

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={"/dashboard"}>Dashboard</Link>
    </li>
    <li>
      <Link to={"/"}>Blog</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={"/"}>Blog</Link>
    </li>
    <li>
      <Link to={"/login"}>Log In</Link>
    </li>
  </ul>
);

export default Navigation;
