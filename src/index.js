import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import * as firebase from "firebase";

var prodConfig = {
  apiKey: "AIzaSyAcg12gfZUQLZmaOdS1tHQqvA25_kbQNBc",
  authDomain: "cristina-blog.firebaseapp.com",
  databaseURL: "https://cristina-blog.firebaseio.com",
  projectId: "cristina-blog",
  storageBucket: "cristina-blog.appspot.com",
  messagingSenderId: "291038942755"
};

const devConfig = {
  apiKey: "AIzaSyDbJErOfcz6RV_XyRkds0XB1_P08tIn7Bg",
  authDomain: "cristina-blog-dev.firebaseapp.com",
  databaseURL: "https://cristina-blog-dev.firebaseio.com",
  projectId: "cristina-blog-dev",
  storageBucket: "",
  messagingSenderId: "863328781609"
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

firebase.initializeApp(config);

const auth = firebase.auth();

export { auth };
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
