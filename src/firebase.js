import firebase from 'firebase'
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyAiMju_bZCbUHMHaRkhASXbEu3lOXm_zI0",
    authDomain: "samess-48adc.firebaseapp.com",
    projectId: "samess-48adc",
    storageBucket: "samess-48adc.appspot.com",
    messagingSenderId: "16467954687",
    appId: "1:16467954687:web:1f687d78fcacc144e6f5ca",
    measurementId: "G-V1L3PSTXMH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
export default firebase