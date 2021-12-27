/* Aqil Firebase

//import * as firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig={
    apiKey: "AIzaSyDXkmVlUygSU4QxrpcE5MYq85ZfNQX-Le4",
    authDomain: "tohum-3a8c8.firebaseapp.com",
    projectId: "tohum-3a8c8",
    storageBucket: "tohum-3a8c8.appspot.com",
    messagingSenderId: "129188277793",
    appId: "1:129188277793:web:87545a11e7568f5e113d60",
    measurementId: "G-NPHZTFCEB4"
}

if(!firebase.apps.length){
    app = firebase. initializeApp(firebaseConfig);
}else{
    app = firebase.app();
}

export {firebase}
*/

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB9_PPeP2ZftTKFYxxm7fzUUmjJlssXys0",
  authDomain: "tohum-4f961.firebaseapp.com",
  projectId: "tohum-4f961",
  storageBucket: "tohum-4f961.appspot.com",
  messagingSenderId: "324664514020",
  appId: "1:324664514020:web:f78a75c891fa61d0f523f1",
  measurementId: "G-VL83CHW7TE"
};


let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const firebaseAuth = firebase.auth;

export { db, auth , firebaseAuth};
firebase.firestore().settings({experimentalForceLongPolling: true, merge: true}); // android 10 seconds connection timeout