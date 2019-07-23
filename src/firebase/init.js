import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBnfw8ZbLH6HDx37XOBnZMG4oz4ykrq9_s",
    authDomain: "book-b3c70.firebaseapp.com",
    databaseURL: "https://book-b3c70.firebaseio.com",
    projectId: "book-b3c70",
    storageBucket: "book-b3c70.appspot.com",
    messagingSenderId: "705685024005",
    appId: "1:705685024005:web:0c7bd700f8601419"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebaseApp.firestore().settings({timestampsInSnapshots: true })
  //export firestore database
  export default firebaseApp.firestore()