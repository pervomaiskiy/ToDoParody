// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBuh7g8YstqpPx4dai81XhOcJ3_e9_xypE",
  authDomain: "todo-dfae4.firebaseapp.com",
  projectId: "todo-dfae4",
  storageBucket: "todo-dfae4.appspot.com",
  messagingSenderId: "114807610314",
  appId: "1:114807610314:web:64c314a3aa0030832a0d33",
  measurementId: "G-ZDFBLTZV2G"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.FacebookAuthProvider()


export {auth, provider}
export default db