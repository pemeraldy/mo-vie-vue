import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBBdjlc5U050WNaxdy4hNtNkb7HTTN2pm8",
    authDomain: "movie-list-ab996.firebaseapp.com",
    databaseURL: "https://movie-list-ab996.firebaseio.com",
    projectId: "movie-list-ab996",
    storageBucket: "movie-list-ab996.appspot.com",
    messagingSenderId: "1068006773052",
    appId: "1:1068006773052:web:10485ac0d908c68ae14e39"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const auth = firebase.auth()
  const db = firebase.firestore()
  
  // collection references
  const usersCollection = db.collection('users')
  const movieListCollection = db.collection('movielists')
  const moviesCollection  = db.collection('movies')
   
  
  export default {
    auth,
    db,
    usersCollection,
    movieListCollection,
    moviesCollection
  }