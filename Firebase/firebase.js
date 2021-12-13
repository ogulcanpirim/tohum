import * as firebase from 'firebase';
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
    firebase. initializeApp(firebaseConfig);
}

export {firebase}