import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { getStorage, ref, uploadBytes, getDownloadURL  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
import { getFirestore, collection, addDoc, doc, query, where, orderBy, limit, getDocs, updateDoc,  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

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
const storage = getStorage(firebaseapp);
const db = getFirestore(firebaseapp);



onAuthStateChanged(auth, user => {

  if (user != null) {

    

      } else {

      window.location.href = "adminpanellogin.html" 

    };

 
} );

let mainActivityContainer = document.getElementById("mainContainer");  
let addEditBookontainer = document.getElementById("addEditContainer");


const btnBookAdd = document.getElementById("bookAddButton");

btnBookAdd.addEventListener("click",()=> {

    if (addEditBookontainer.style.display == "none") {

        
        addEditBookontainer.style.display =""
        btnBookAdd.style.visibility ="hidden"

      
        
    } 
})