import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  query,
  where,
  deleteDoc,
  orderBy,
  limit,
  getDocs,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseapp = initializeApp({
  apiKey: "AIzaSyD978ixFjE9KVlNsm6-BYww3B6S4qPVLfQ",
  authDomain: "ebbkultursanatapp.firebaseapp.com",
  projectId: "ebbkultursanatapp",
  storageBucket: "ebbkultursanatapp.appspot.com",
  messagingSenderId: "540910775157",
  appId: "1:540910775157:web:4af35312414acf20bd013c",
  measurementId: "G-4JCKV13ER8",
});

const auth = getAuth();
const db = getFirestore(firebaseapp);

var myModal = new bootstrap.Modal(document.getElementById("newPasswordModal"));

const noEditPasswordButton = document.getElementById("noEditPasswordButton");
const editPasswordButtonButton = document.getElementById("editPasswordButton");

var passwordEditStatus;
var userDoc;
onAuthStateChanged(auth, async (user) => {
  if (user != null) {
    const getData = query(
      collection(db, "Users"),
      where("userEmail", "==", user.email)
    );
    const querySnapshot = await getDocs(getData);

    querySnapshot.forEach((doc) => {
      userDoc = doc.id;
      passwordEditStatus = doc.data().passwordEdit;
    });

    if (passwordEditStatus == false) {
      myModal.show();
    } else {
      window.location.href = "activity.html";
      const user = userCredential.user;
    }
  } else {
    console.log("no user");
  }
});

$("#editPasswordButton").on("click", function () {
  const auth = getAuth();
  const user = auth.currentUser;

  const newPassword = document.getElementById("newPaswordInPut");
  const confirmPassword = document.getElementById("newPaswordAgainInPut");

  if (newPassword.value == confirmPassword.value) {
    if (user) {
      updatePassword(user, newPassword.value)
        .then(() => {
          const docRefUpdate = doc(db, "Users", userDoc);

          updateDoc(docRefUpdate, {
            passwordEdit: true,
          })
            .then(() => {
              window.location.href = "activity.html";
            })
            .catch((error) => {
              console.error("Belge güncellenirken hata oluştu: ", error);
            });
        })
        .catch((error) => {
          console.error("Şifre güncellenirken hata oluştu:", error);
          alert("Şifre güncellenirken hata oluştu: " + error.message);
        });
    } else {
      console.error("Kullanıcı oturumu kapalı.");
      alert("Lütfen önce giriş yapın.");
    }
  } else {
    alert("Şifreler eşleşmiyor.");
  }
});

$("#noEditPasswordButton").on("click", function () {
  signOut(auth)
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      // An error happened.
    });
});

let btnlogin = document.getElementById("loginButton");

btnlogin.addEventListener("click", function (events) {
  let email = document.getElementById("InputEmail1").value;
  let password = document.getElementById("InputPassword1").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(
        "internet bağlatısında bir problem var. Lütfen bağlantınızı kontrol edin. "
      );
    });

  events.preventDefault();
});
