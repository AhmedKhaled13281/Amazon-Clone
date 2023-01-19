import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBK-SsrK0M-W6yV5sMKLATwtGhzUjIEb8I",
    authDomain: "clone-2ad37.firebaseapp.com",
    projectId: "clone-2ad37",
    storageBucket: "clone-2ad37.appspot.com",
    messagingSenderId: "1042695921949",
    appId: "1:1042695921949:web:4758a18695d9427933c1f4"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore()
  const auth = firebaseApp.auth()

  export {db , auth}