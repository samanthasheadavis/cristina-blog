import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

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
  storageBucket: "cristina-blog-dev.appspot.com",
  messagingSenderId: "863328781609"
};

// If environment production, using firebase prod database, else use dev database
const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

// If firebase database found, init config
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

// init firebase auth and export
const auth = firebase.auth();

// init firebase storage (for image files) and export
const storage = firebase.storage();

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export { auth, db, storage };
