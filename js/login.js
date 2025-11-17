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

const PAGE_PRIORITY = [
  { url: "activity.html", codes: ["1", "1a", "2", "2a"] },
  { url: "staff.html", codes: ["1", "1a", "10", "10a"] },
  { url: "salooncontrol.html", codes: ["1", "1a", "3", "3a"] },
  { url: "news.html", codes: ["1", "1a", "5", "5a"] },
  { url: "costume.html", codes: ["1", "1a", "9", "9a"] },
  { url: "library.html", codes: ["1", "1a", "8", "8a"] },
  { url: "messages.html", codes: ["1", "1a", "2", "2a"] },
];

const GLOBAL_VIEW_CODES = new Set(["1", "1a"]);

var myModal = new bootstrap.Modal(document.getElementById("newPasswordModal"));

const noEditPasswordButton = document.getElementById("noEditPasswordButton");
const editPasswordButtonButton = document.getElementById("editPasswordButton");

var passwordEditStatus;
var userDoc;
var userPermissions = [];

function hasPageAccess(permissions = [], codes = []) {
  if (!codes || codes.length === 0) return true;
  if (!Array.isArray(permissions)) return false;
  if (permissions.some((code) => GLOBAL_VIEW_CODES.has(code))) return true;
  return codes.some((code) => permissions.includes(code));
}

function resolveLandingPage(permissions = []) {
  for (const page of PAGE_PRIORITY) {
    if (hasPageAccess(permissions, page.codes)) {
      return page.url;
    }
  }
  return null;
}

function redirectToAuthorisedPage(permissions = []) {
  const target = resolveLandingPage(permissions);
  if (target) {
    window.location.href = target;
    return;
  }
  alert(
    "Hesabınız için erişebileceğiniz yönetim sayfası bulunamadı. Lütfen sistem yöneticinizle iletişime geçin."
  );
  signOut(auth).finally(() => {
    window.location.href = "adminpanellogin.html";
  });
}

onAuthStateChanged(auth, async (user) => {
  if (user != null) {
    const getData = query(
      collection(db, "Users"),
      where("userEmail", "==", user.email)
    );
    const querySnapshot = await getDocs(getData);

    querySnapshot.forEach((doc) => {
      userDoc = doc.id;
      const data = doc.data();
      passwordEditStatus = data.passwordEdit;
      userPermissions = Array.isArray(data.userAuthority)
        ? data.userAuthority
        : [];
    });

    if (passwordEditStatus == false) {
      myModal.show();
    } else {
      redirectToAuthorisedPage(userPermissions);
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
              redirectToAuthorisedPage(userPermissions);
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
