import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBfpi4rGv4WpjhwPHNqg-F-ynCyMugYu0g",
    authDomain: "muuuvy.firebaseapp.com",
    projectId: "muuuvy",
    storageBucket: "muuuvy.appspot.com",
    messagingSenderId: "708271132615",
    appId: "1:708271132615:web:0079887a0568081c6d13e2",
    measurementId: "G-RKM6P39WDX"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebaseApp.storage();
  
  export { auth, storage, provider };
  export default db;