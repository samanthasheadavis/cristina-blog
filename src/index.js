import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAcg12gfZUQLZmaOdS1tHQqvA25_kbQNBc",
    authDomain: "cristina-blog.firebaseapp.com",
    databaseURL: "https://cristina-blog.firebaseio.com",
    projectId: "cristina-blog",
    storageBucket: "cristina-blog.appspot.com",
    messagingSenderId: "291038942755"
};

firebase.initializeApp(config);
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

