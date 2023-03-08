import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';


const firebaseapp = initializeApp ({

    apiKey: "AIzaSyD978ixFjE9KVlNsm6-BYww3B6S4qPVLfQ",
    authDomain: "ebbkultursanatapp.firebaseapp.com",
    projectId: "ebbkultursanatapp",
    storageBucket: "ebbkultursanatapp.appspot.com",
    messagingSenderId: "540910775157",
    appId: "1:540910775157:web:4af35312414acf20bd013c",
    measurementId: "G-4JCKV13ER8"

});

const auth = getAuth(firebaseapp);

onAuthStateChanged(auth, user => {

    if (user != null) {

        console.log('logged in')
 
    } else {

        console.log('no user')

    };



} )