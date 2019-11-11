import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    /*apiKey: "AIzaSyCJxkqx-6PMJrZ7ACkrgbO55b5wmJdop1Y",
    authDomain: "todo-rrf-316.firebaseapp.com",
    databaseURL: "https://todo-rrf-316.firebaseio.com",
    projectId: "todo-rrf-316",
    storageBucket: "todo-rrf-316.appspot.com",
    messagingSenderId: "892398996038",
    appId: "1:892398996038:web:1fb9157fc6c5d266e01847",
    measurementId: "G-TEGQB3MZ23"*/
    apiKey: "AIzaSyCxLJ0BITA91OitygXdyqGrwkFXatGB-LI",
    authDomain: "todo-rrf-316-d2ba2.firebaseapp.com",
    databaseURL: "https://todo-rrf-316-d2ba2.firebaseio.com",
    projectId: "todo-rrf-316-d2ba2",
    storageBucket: "todo-rrf-316-d2ba2.appspot.com",
    messagingSenderId: "372522698009",
    appId: "1:372522698009:web:7488bb9ceaabcfa0f0f188",
    measurementId: "G-289P8BP5CV"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;


/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.2.3/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.2.3/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCxLJ0BITA91OitygXdyqGrwkFXatGB-LI",
    authDomain: "todo-rrf-316-d2ba2.firebaseapp.com",
    databaseURL: "https://todo-rrf-316-d2ba2.firebaseio.com",
    projectId: "todo-rrf-316-d2ba2",
    storageBucket: "todo-rrf-316-d2ba2.appspot.com",
    messagingSenderId: "372522698009",
    appId: "1:372522698009:web:7488bb9ceaabcfa0f0f188",
    measurementId: "G-289P8BP5CV"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>
*/