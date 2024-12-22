import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
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

const auth = getAuth(firebaseapp);
const storage = getStorage(firebaseapp);
const db = getFirestore(firebaseapp);

var userAuthorityArray = [];
var paswordEditStatus;

var currentUser;

onAuthStateChanged(auth, async (user) => {
  if (user != null) {
    currentUser = auth.currentUser;
    const getData = query(
      collection(db, "Users"),
      where("userEmail", "==", user.email)
    );
    const querySnapshot = await getDocs(getData);

    querySnapshot.forEach((doc) => {
      const daysDocument = doc.id;

      userAuthorityArray = doc.data().userAuthority;
    });

    if (userAuthorityArray.includes("22")) {
      morningButton.disabled = true;
      afternoonButton.disabled = true;
      nightButton.disabled = true;
      allDayButton.disabled = true;

      programAddEditSuccessButton.disabled = true;
      programCancelButton.disabled = true;
      programAddEditSuccessButton.style.display = "none";

      programAddEditCancelButton.innerHTML = "Geri Dön";
    }
  } else {
    window.location.href = "adminpanellogin.html";
  }
});

// Off Canvas

const programTableContainer = document.getElementById("programTableContainer");
const addEditProgramContainer = document.getElementById(
  "addEditProgramContainer"
);

const morningButton = document.getElementById("morningButton");
const afternoonButton = document.getElementById("afternoonButton");
const nightButton = document.getElementById("nightButton");
const allDayButton = document.getElementById("allDayButton");
const priceInfoText = document.getElementById("priceInfoText");

const reservationStatusSelect = document.getElementById(
  "reservationStatusSelect"
);
const paymentInfoSelect = document.getElementById("paymentInfoSelect");
const managerAprovalCheck = document.getElementById(
  "managerAprovalRequestCheck"
);

const programCategorySelect = document.getElementById("programCategorySelect");
const programCorporationText = document.getElementById(
  "programCorporationText"
);
const programNameText = document.getElementById("programNameText");
const programDescriptionText = document.getElementById(
  "programDescriptionText"
);

const programNameSurNameText = document.getElementById(
  "programNameSurNameText"
);
const programTelephonenumberText = document.getElementById(
  "programTelephonenumberText"
);
const programEmailText = document.getElementById("programEmailText");
const programNotesText = document.getElementById("programNotesText");
const programTecnicalNotesText = document.getElementById(
  "programTecnicalNotesText"
);

const programAddEditCancelButton = document.getElementById(
  "programAddEditCancelButton"
);
const programAddEditSuccessButton = document.getElementById(
  "programAddEditSuccessButton"
);

const freeRequestCheck = document.getElementById("freeRequestCheck");

const programCancelButton = document.getElementById("programCancelButton");

const today = new Date();

var year = today.getFullYear();
var month = today.getMonth();
var dayToday = today.getDate();

var programDate = new Date();

var extraKey = "";

$("#monthFormSelect").val(month);
$("#yearFormSelect").val(year);

var addEditButtonStatus = "";

var saloonCode = "1";

var programSessionArrayList = [];

var price = 0.0;

var firstDayOfMonthActualDay;

var morningPrice = 0;
var afternoonPrice = 0;
var nightPrice = 0;

var totalPrice = 0;
var priceArrayList = [];

var updateDocId = "";
var venueDocId = "";
var publicDayId = "";

function getSaloonPrice() {
  var saloonDocId = "";

  if ($("#saloonFormSelect").val() == "1") {
    saloonDocId = "FYXuqyPhmslWaY2ASu1r";
  } else if ($("#saloonFormSelect").val() == "2") {
    saloonDocId = "hjUZLD5OWWLXRYK6DkIt";
  } else if ($("#saloonFormSelect").val() == "3") {
    saloonDocId = "r6xDofNYMy7AmEaBiJW6";
  } else if ($("#saloonFormSelect").val() == "4") {
    saloonDocId = "wnsuA9oTU3rwGN7vTLr4";
  } else if ($("#saloonFormSelect").val() == "5") {
    saloonDocId = "HLE54ES3AYpXeMK55YMa";
  } else if ($("#saloonFormSelect").val() == "6") {
    saloonDocId = "RGPi4hPJQjRJNudXjRmh";
  } else if ($("#saloonFormSelect").val() == "7") {
    saloonDocId = "RGPi4hPJQjRJNudXjRmh";
  }

  const docRefsPrice = doc(db, "SaloonPrice", saloonDocId);

  getDoc(docRefsPrice)
    .then((docSnap) => {
      if (docSnap.exists()) {
        var morningPriceStr = docSnap.data().morning;
        var afternoonPriceStr = docSnap.data().afternon;
        var nightPriceStr = docSnap.data().night;

        if (freeRequestCheck.checked) {
          morningPrice = 0;
          afternoonPrice = 0;
          nightPrice = 0;
          paymentInfoSelect.style.display = "none";
        } else {
          morningPrice = parseFloat(
            morningPriceStr.replace(/\./g, "").replace(",", ".")
          );
          afternoonPrice = parseFloat(
            afternoonPriceStr.replace(/\./g, "").replace(",", ".")
          );
          nightPrice = parseFloat(
            nightPriceStr.replace(/\./g, "").replace(",", ".")
          );

          paymentInfoSelect.style.display = "";
        }

        morningButton.innerText = "08-12 / (" + morningPrice + " TL)";
        afternoonButton.innerText = "13-17 / (" + afternoonPrice + " TL)";
        nightButton.innerText = "18-23 / (" + nightPrice + " TL )";
      } else {
        console.error("Belge alınırken hata oluştu:", error);
      }
    })
    .catch((error) => {
      console.error("Belge alınırken hata oluştu:", error);
    });
}

function getDaysInMonth(year, month) {
  const montsdate = new Date(year, month + 1, 0).getDate();

  return montsdate;
}

function getFirstDayOfMonth(year, month) {
  console.log("aa" + year + month);

  var firstDay = new Date(year, month, 1).getDay();

  if (firstDay == 0) {
    firstDay = 7;
  }

  console.log("Ayın ilk günü:", firstDay);
  // Hafta günlerini isimlendirmek için bir dizi

  // İlk günün haftanın hangi gününe denk geldiğini göster
  return firstDay;
}

function getDateForDay(dayNum, firstDayOfMonth, year, month) {
  // dayNum ayın kaçıncı günü olduğunu temsil eder
  // firstDayOfMonth ayın ilk gününün haftanın hangi günü olduğunu belirtir
  const actualDay = dayNum - firstDayOfMonth + 1; // Ay içindeki gerçek gün numarasını bul

  if (actualDay < 1 || actualDay > getDaysInMonth(year, month)) {
    // Eğer hesaplanan gün numarası ayın sınırları dışındaysa
    console.log("Geçersiz gün numarası");
    return null;
  }

  // Gerçek tarihi oluştur
  const date = new Date(year, month, actualDay);

  date.setHours(23, 59, 0, 0);

  console.log(
    `Gün ${dayNum}, ${date.toLocaleDateString()} ${date.toLocaleTimeString()} tarihine denk geliyor.`
  );
  return date;
}

freeRequestCheck.addEventListener("change", () => {
  if (freeRequestCheck.checked) {
    getSaloonPrice();
    paymentInfoSelect.style.display = "none";
  } else {
    getSaloonPrice();
    paymentInfoSelect.style.display = "";
  }
});

var firstDayOfMonth = getFirstDayOfMonth(year, month);

// Ocak 0. İndexeSahiptir
var daysInMonth = getDaysInMonth(year, month);

var daysNumber = firstDayOfMonth + daysInMonth - 1;

$("#goButton").prop("disabled", true);
$("#warningTitleBack").css("display", "");
$("#warningTitle").html("Salon takip yüklenirken lütfen bekleyin!");

processDaysInMonth(firstDayOfMonth, daysNumber, month, year, saloonCode);

$("#goButton").prop("disabled", false);
$("#warningTitleBack").css("display", "none");

$("body").on("click", ".morningButton", async function () {
  saloonCode = $("#saloonFormSelect").val();

  year = parseInt($("#yearFormSelect").val());

  month = parseInt($("#monthFormSelect").val());

  var key1 = $(this).data("key");
  extraKey = $(this).data("extra-key");
  var firstDayOfMonthActual = $(this).data("third-key");
  venueDocId = $(this).data("daysdocidKey");

  publicDayId = `day${extraKey}`;

  console.log(venueDocId + "knsadms");

  freeRequestCheck.checked = false;

  programDate = getDateForDay(extraKey, firstDayOfMonthActual, year, month);

  getSaloonPrice();

  var saloonSessionArrayList = [];

  const getData = query(
    collection(db, "ProgramList"),
    where("programDate", "==", programDate),
    where("programStatus", "==", true)
  );
  const querySnapshot = await getDocs(getData);

  querySnapshot.forEach((doc) => {
    const docum = doc.id;

    const sesArray = doc.data().programSessionArrayList;

    while (sesArray.length > 0) {
      saloonSessionArrayList.push(sesArray.splice(0, 1)[0]);
    }
  });

  if (key1 == "0") {
    reservationStatusSelect.value = "0";
    paymentInfoSelect.value = "0";
    managerAprovalCheck.checked = false;
    programCategorySelect.value = "0";
    programCorporationText.value = "";
    programNameText.value = "";
    programDescriptionText.value = "";
    programNameSurNameText.value = "";
    programTelephonenumberText.value = "";
    programEmailText.value = "";
    programNotesText.value = "";
    programTecnicalNotesText.value = "";
    if (userAuthorityArray.includes("22")) {
      alert("Program oluşturma yetkiniz yok!");
    } else {
      if (programDate < new Date()) {
        alert("Geçmiş bir tarihe program oluşturamazsınız!!");
      } else {
        $("#programTableContainer").hide();
        $("#addEditProgramContainer").show();
        addEditButtonStatus = "Add";

        if (saloonSessionArrayList.includes("1")) {
          morningButton.classList.remove("btn-light");
          morningButton.classList.add("btn-danger");
          allDayButton.classList.remove("btn-light");
          allDayButton.classList.add("btn-danger");
          morningButton.disabled = true;
          allDayButton.disabled = true;
        }

        if (saloonSessionArrayList.includes("2")) {
          afternoonButton.classList.remove("btn-light");
          afternoonButton.classList.add("btn-danger");
          allDayButton.classList.remove("btn-light");
          allDayButton.classList.add("btn-danger");
          afternoonButton.disabled = true;
          allDayButton.disabled = true;
        }

        if (saloonSessionArrayList.includes("3")) {
          nightButton.classList.remove("btn-light");
          nightButton.classList.add("btn-danger");
          allDayButton.classList.remove("btn-light");
          allDayButton.classList.add("btn-danger");
          nightButton.disabled = true;
          allDayButton.disabled = true;
        }
      }
    }
  } else {
    $("#programTableContainer").hide();
    $("#addEditProgramContainer").show();
    addEditButtonStatus = "Edit";
    programAddEditSuccessButton.innerHTML = "Güncelle";
    programCancelButton.style.display = "";

    updateDocId = key1;

    if (saloonSessionArrayList.includes("1")) {
      morningButton.classList.remove("btn-light");
      morningButton.classList.add("btn-danger");
      allDayButton.classList.remove("btn-light");
      allDayButton.classList.add("btn-danger");
    }

    if (saloonSessionArrayList.includes("2")) {
      afternoonButton.classList.remove("btn-light");
      afternoonButton.classList.add("btn-danger");
      allDayButton.classList.remove("btn-light");
      allDayButton.classList.add("btn-danger");
    }

    if (saloonSessionArrayList.includes("3")) {
      nightButton.classList.remove("btn-light");
      nightButton.classList.add("btn-danger");
      allDayButton.classList.remove("btn-light");
      allDayButton.classList.add("btn-danger");
    }

    morningButton.disabled = true;
    afternoonButton.disabled = true;
    nightButton.disabled = true;
    allDayButton.disabled = true;

    const docRefs = doc(db, "ProgramList", key1);

    getDoc(docRefs)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const programSessionArrayListFirebase =
            docSnap.data().programSessionArrayList;
          const reservationStatus = docSnap.data().reservationStatus;
          const paymentInfo = docSnap.data().paymentInfo;
          const managerAprovalRequest = docSnap.data().managerAprovalRequest;
          const category = docSnap.data().category;
          const corporation = docSnap.data().corporation;
          const name = docSnap.data().name;
          const description = docSnap.data().description;
          const contactNameSurname = docSnap.data().contactNameSurname;
          const contactTelephone = docSnap.data().contactTelephone;
          const contactEmail = docSnap.data().contactEmail;
          const notes = docSnap.data().notes;
          const tecnicalNotes = docSnap.data().tecnicalNotes;
          const programDate = docSnap.data().programDate;
          const saloon = docSnap.data().saloon;
          const totalPrice = docSnap.data().price;

          programSessionArrayList = programSessionArrayListFirebase;
          reservationStatusSelect.value = reservationStatus;
          paymentInfoSelect.value = paymentInfo;
          managerAprovalCheck.checked = managerAprovalRequest;

          programCategorySelect.value = category;
          programCorporationText.value = corporation;
          programNameText.value = name;
          programDescriptionText.value = description;
          programNameSurNameText.value = contactNameSurname;
          programTelephonenumberText.value = contactTelephone;
          programEmailText.value = contactEmail;

          programNotesText.value = notes;
          programTecnicalNotesText.value = tecnicalNotes;

          priceInfoText.value = totalPrice + " TL";
        } else {
          // Belge yoksa
        }
      })
      .catch((error) => {
        console.error("Belge alınırken hata oluştu:", error);
      });
  }
});

$("body").on("click", ".afternonButton", async function () {
  saloonCode = $("#saloonFormSelect").val();

  year = parseInt($("#yearFormSelect").val());

  month = parseInt($("#monthFormSelect").val());
  var key2 = $(this).data("key");
  extraKey = $(this).data("extra-key");
  var firstDayOfMonthActual = $(this).data("third-key");
  venueDocId = $(this).data("daysdocidKey");

  publicDayId = `day${extraKey}`;

  programDate = getDateForDay(extraKey, firstDayOfMonthActual, year, month);

  getSaloonPrice();

  freeRequestCheck.checked = false;

  var saloonSessionArrayList = [];

  const getData = query(
    collection(db, "ProgramList"),
    where("programDate", "==", programDate),
    where("programStatus", "==", true)
  );
  const querySnapshot = await getDocs(getData);

  querySnapshot.forEach((doc) => {
    const docum = doc.id;

    const sesArray = doc.data().programSessionArrayList;

    while (sesArray.length > 0) {
      saloonSessionArrayList.push(sesArray.splice(0, 1)[0]);
    }
  });

  if (key2 == "0") {
    reservationStatusSelect.value = "0";
    paymentInfoSelect.value = "0";
    managerAprovalCheck.checked = false;
    programCategorySelect.value = "0";
    programCorporationText.value = "";
    programNameText.value = "";
    programDescriptionText.value = "";
    programNameSurNameText.value = "";
    programTelephonenumberText.value = "";
    programEmailText.value = "";
    programNotesText.value = "";
    programTecnicalNotesText.value = "";
    if (userAuthorityArray.includes("22")) {
      alert("Program oluşturma yetkiniz yok!");
    } else {
      if (programDate < new Date()) {
        alert("Geçmiş bir tarihe program oluşturamazsınız!!");
      } else {
        $("#programTableContainer").hide();
        $("#addEditProgramContainer").show();
        addEditButtonStatus = "Add";
        if (saloonSessionArrayList.includes("1")) {
          morningButton.classList.remove("btn-light");
          morningButton.classList.add("btn-danger");
          allDayButton.classList.remove("btn-light");
          allDayButton.classList.add("btn-danger");
          morningButton.disabled = true;
          allDayButton.disabled = true;
        }

        if (saloonSessionArrayList.includes("2")) {
          afternoonButton.classList.remove("btn-light");
          afternoonButton.classList.add("btn-danger");
          allDayButton.classList.remove("btn-light");
          allDayButton.classList.add("btn-danger");
          afternoonButton.disabled = true;
          allDayButton.disabled = true;
        }

        if (saloonSessionArrayList.includes("3")) {
          nightButton.classList.remove("btn-light");
          nightButton.classList.add("btn-danger");
          allDayButton.classList.remove("btn-light");
          allDayButton.classList.add("btn-danger");
          nightButton.disabled = true;
          allDayButton.disabled = true;
        }
      }
    }
  } else {
    $("#programTableContainer").hide();
    $("#addEditProgramContainer").show();
    addEditButtonStatus = "Edit";
    programAddEditSuccessButton.innerHTML = "Güncelle";
    programCancelButton.style.display = "";

    updateDocId = key2;

    if (saloonSessionArrayList.includes("1")) {
      morningButton.classList.remove("btn-light");
      morningButton.classList.add("btn-danger");
      allDayButton.classList.remove("btn-light");
      allDayButton.classList.add("btn-danger");
    }

    if (saloonSessionArrayList.includes("2")) {
      afternoonButton.classList.remove("btn-light");
      afternoonButton.classList.add("btn-danger");
      allDayButton.classList.remove("btn-light");
      allDayButton.classList.add("btn-danger");
    }

    if (saloonSessionArrayList.includes("3")) {
      nightButton.classList.remove("btn-light");
      nightButton.classList.add("btn-danger");
      allDayButton.classList.remove("btn-light");
      allDayButton.classList.add("btn-danger");
    }

    morningButton.disabled = true;
    afternoonButton.disabled = true;
    nightButton.disabled = true;
    allDayButton.disabled = true;

    const docRefs = doc(db, "ProgramList", key2);

    getDoc(docRefs)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const programSessionArrayListFirebase =
            docSnap.data().programSessionArrayList;
          const reservationStatus = docSnap.data().reservationStatus;
          const paymentInfo = docSnap.data().paymentInfo;
          const managerAprovalRequest = docSnap.data().managerAprovalRequest;
          const category = docSnap.data().category;
          const corporation = docSnap.data().corporation;
          const name = docSnap.data().name;
          const description = docSnap.data().description;
          const contactNameSurname = docSnap.data().contactNameSurname;
          const contactTelephone = docSnap.data().contactTelephone;
          const contactEmail = docSnap.data().contactEmail;
          const notes = docSnap.data().notes;
          const tecnicalNotes = docSnap.data().tecnicalNotes;
          const programDate = docSnap.data().programDate;
          const saloon = docSnap.data().saloon;
          const totalPrice = docSnap.data().price;

          programSessionArrayList = programSessionArrayListFirebase;
          reservationStatusSelect.value = reservationStatus;
          paymentInfoSelect.value = paymentInfo;
          managerAprovalCheck.checked = managerAprovalRequest;

          programCategorySelect.value = category;
          programCorporationText.value = corporation;
          programNameText.value = name;
          programDescriptionText.value = description;
          programNameSurNameText.value = contactNameSurname;
          programTelephonenumberText.value = contactTelephone;
          programEmailText.value = contactEmail;

          programNotesText.value = notes;
          programTecnicalNotesText.value = tecnicalNotes;

          priceInfoText.value = totalPrice + " TL";
        } else {
          // Belge yoksa
        }
      })
      .catch((error) => {
        console.error("Belge alınırken hata oluştu:", error);
      });
  }
});

$("body").on("click", ".nightButton", async function () {
  saloonCode = $("#saloonFormSelect").val();

  year = parseInt($("#yearFormSelect").val());

  month = parseInt($("#monthFormSelect").val());
  var key3 = $(this).data("key");
  extraKey = $(this).data("extra-key");
  var firstDayOfMonthActual = $(this).data("third-key");
  venueDocId = $(this).data("daysdocidKey");

  publicDayId = `day${extraKey}`;

  programDate = getDateForDay(extraKey, firstDayOfMonthActual, year, month);

  getSaloonPrice();

  freeRequestCheck.checked = false;

  var saloonSessionArrayList = [];

  const getData = query(
    collection(db, "ProgramList"),
    where("programDate", "==", programDate),
    where("programStatus", "==", true)
  );
  const querySnapshot = await getDocs(getData);

  querySnapshot.forEach((doc) => {
    const docum = doc.id;

    const sesArray = doc.data().programSessionArrayList;

    while (sesArray.length > 0) {
      saloonSessionArrayList.push(sesArray.splice(0, 1)[0]);
    }
  });

  if (key3 == "0") {
    reservationStatusSelect.value = "0";
    paymentInfoSelect.value = "0";
    managerAprovalCheck.checked = false;
    programCategorySelect.value = "0";
    programCorporationText.value = "";
    programNameText.value = "";
    programDescriptionText.value = "";
    programNameSurNameText.value = "";
    programTelephonenumberText.value = "";
    programEmailText.value = "";
    programNotesText.value = "";
    programTecnicalNotesText.value = "";

    if (userAuthorityArray.includes("22")) {
      alert("Program oluşturma yetkiniz yok!");
    } else {
      if (programDate < new Date()) {
        console.log(programDate + " " + new Date());
        alert("Geçmiş bir tarihe program oluşturamazsınız!!");
      } else {
        $("#programTableContainer").hide();
        $("#addEditProgramContainer").show();
        addEditButtonStatus = "Add";
        if (saloonSessionArrayList.includes("1")) {
          morningButton.classList.remove("btn-light");
          morningButton.classList.add("btn-danger");
          allDayButton.classList.remove("btn-light");
          allDayButton.classList.add("btn-danger");
          morningButton.disabled = true;
          allDayButton.disabled = true;
        }

        if (saloonSessionArrayList.includes("2")) {
          afternoonButton.classList.remove("btn-light");
          afternoonButton.classList.add("btn-danger");
          allDayButton.classList.remove("btn-light");
          allDayButton.classList.add("btn-danger");
          afternoonButton.disabled = true;
          allDayButton.disabled = true;
        }

        if (saloonSessionArrayList.includes("3")) {
          nightButton.classList.remove("btn-light");
          nightButton.classList.add("btn-danger");
          allDayButton.classList.remove("btn-light");
          allDayButton.classList.add("btn-danger");
          nightButton.disabled = true;
          allDayButton.disabled = true;
        }
      }
    }
  } else {
    $("#programTableContainer").hide();
    $("#addEditProgramContainer").show();
    addEditButtonStatus = "Edit";
    programAddEditSuccessButton.innerHTML = "Güncelle";
    programCancelButton.style.display = "";

    updateDocId = key3;

    if (saloonSessionArrayList.includes("1")) {
      morningButton.classList.remove("btn-light");
      morningButton.classList.add("btn-danger");
      allDayButton.classList.remove("btn-light");
      allDayButton.classList.add("btn-danger");
    }

    if (saloonSessionArrayList.includes("2")) {
      afternoonButton.classList.remove("btn-light");
      afternoonButton.classList.add("btn-danger");
      allDayButton.classList.remove("btn-light");
      allDayButton.classList.add("btn-danger");
    }

    if (saloonSessionArrayList.includes("3")) {
      nightButton.classList.remove("btn-light");
      nightButton.classList.add("btn-danger");
      allDayButton.classList.remove("btn-light");
      allDayButton.classList.add("btn-danger");
    }

    morningButton.disabled = true;
    afternoonButton.disabled = true;
    nightButton.disabled = true;
    allDayButton.disabled = true;

    const docRefs = doc(db, "ProgramList", key3);

    getDoc(docRefs)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const programSessionArrayListFirebase =
            docSnap.data().programSessionArrayList;
          const reservationStatus = docSnap.data().reservationStatus;
          const paymentInfo = docSnap.data().paymentInfo;
          const managerAprovalRequest = docSnap.data().managerAprovalRequest;
          const category = docSnap.data().category;
          const corporation = docSnap.data().corporation;
          const name = docSnap.data().name;
          const description = docSnap.data().description;
          const contactNameSurname = docSnap.data().contactNameSurname;
          const contactTelephone = docSnap.data().contactTelephone;
          const contactEmail = docSnap.data().contactEmail;
          const notes = docSnap.data().notes;
          const tecnicalNotes = docSnap.data().tecnicalNotes;
          const programDate = docSnap.data().programDate;
          const saloon = docSnap.data().saloon;
          const totalPrice = docSnap.data().price;

          programSessionArrayList = programSessionArrayListFirebase;
          reservationStatusSelect.value = reservationStatus;
          paymentInfoSelect.value = paymentInfo;
          managerAprovalCheck.checked = managerAprovalRequest;

          programCategorySelect.value = category;
          programCorporationText.value = corporation;
          programNameText.value = name;
          programDescriptionText.value = description;
          programNameSurNameText.value = contactNameSurname;
          programTelephonenumberText.value = contactTelephone;
          programEmailText.value = contactEmail;

          programNotesText.value = notes;
          programTecnicalNotesText.value = tecnicalNotes;

          priceInfoText.value = totalPrice + " TL";
        } else {
          // Belge yoksa
        }
      })
      .catch((error) => {
        console.error("Belge alınırken hata oluştu:", error);
      });
  }
});

$("#saloonFormSelect").on("change", function () {
  saloonCode = $("#saloonFormSelect").val();

  console.log(saloonCode);
});

$("#yearFormSelect").on("change", function () {
  year = parseInt($("#yearFormSelect").val());

  console.log(year);
});

$("#monthFormSelect").on("change", function () {
  month = parseInt($("#monthFormSelect").val());

  console.log(month);
});

$("#goButton").on("click", async function () {
  $(`td`).css("background-color", "White");

  for (let i = 1; i <= 42; i++) {
    let dayId = `day${i}`;

    const products = document.querySelector(`#${dayId}`);
    products.innerHTML = "";
  }

  var firstDayOfMonth = getFirstDayOfMonth(year, month);
  // Ocak 0. İndexeSahiptir

  var daysInMonth = getDaysInMonth(year, month);

  var daysNumber = firstDayOfMonth + daysInMonth - 1;

  $("#goButton").prop("disabled", true);
  $("#warningTitleBack").css("display", "");
  $("#warningTitle").html("Seçtiğiniz tarih yüklenirken lütfen bekleyin!");

  // Önce tüm satırları görünür yap
  for (let row = 1; row <= 6; row++) {
    const rowElement = document.querySelector(
      `#calendar tbody tr:nth-child(${row})`
    );
    if (rowElement) {
      rowElement.style.display = "";
    }
  }

  for (let i = firstDayOfMonth; i <= daysNumber; i++) {
    let dayId = `day${i}`;

    const products = document.querySelector(`#${dayId}`);

    let dayNum = i - firstDayOfMonth + 1;
    var daysDocId = "0";
    var firebaseDay = "0";
    var activity1Name = "";
    var activity1DocId = "0";
    var activity2Name = "";
    var activity2DocId = "0";
    var activity3Name = "";
    var activity3DocId = "0";

    const monthArray = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ];

    var monthName = monthArray[month];

    let InvWritingItem = [];

    if (!products) {
      continue;
    } else {
      InvWritingItem = [
        daysDocId,
        activity1DocId,
        activity2DocId,
        activity3DocId,
        activity1Name,
        activity2Name,
        activity3Name,
      ];
      const getData = query(
        collection(db, "VenueTracking"),
        where("year", "==", year),
        where("month", "==", month),
        where("day", "==", dayId),
        where("saloon", "==", saloonCode)
      );

      const querySnapshot = await getDocs(getData);

      querySnapshot.forEach((doc) => {
        const daysDocument = doc.id;

        daysDocId = daysDocument;
        activity1DocId = doc.data().activity1DocId;
        activity1Name = doc.data().activity1Name;

        activity2DocId = doc.data().activity2DocId;
        activity2Name = doc.data().activity2Name;

        activity3DocId = doc.data().activity3DocId;
        activity3Name = doc.data().activity3Name;

        InvWritingItem = [
          daysDocId,
          activity1DocId,
          activity2DocId,
          activity3DocId,
          activity1Name,
          activity2Name,
          activity3Name,
        ];
      });

      createInvWritingArray(InvWritingItem);

      function createInvWritingArray([
        daysDocId,
        activity1DocId,
        activity2DocId,
        activity3DocId,
        activity1Name,
        activity2Name,
        activity3Name,
      ]) {
        var btnStatus1 = "";
        var btnStatus2 = "";
        var btnStatus3 = "";
        var namestatus1 = "";
        var namestatus2 = "";
        var namestatus3 = "";

        if (activity1DocId == "0") {
          btnStatus1 = "btn-light";
          namestatus1 = "09 - 12";
        } else {
          btnStatus1 = "btn-danger";
          namestatus1 = activity1Name;
        }

        if (activity2DocId == "0") {
          btnStatus2 = "btn-light";
          namestatus2 = "13 - 17";
        } else {
          btnStatus2 = "btn-danger";
          namestatus2 = activity2Name;
        }

        if (activity3DocId == "0") {
          btnStatus3 = "btn-light";
          namestatus3 = "19 - 23";
        } else {
          btnStatus3 = "btn-danger";
          namestatus3 = activity3Name;
        }

        if (
          dayNum == dayToday &&
          parseInt($("#monthFormSelect").val()) == new Date().getMonth() &&
          parseInt($("#yearFormSelect").val()) == new Date().getFullYear()
        ) {
          $(`#${dayId}`).css("background-color", "#A2CDF2");
        }

        let proCode = `
          <div class="justify-content-between"> 
            <div class="text-bg-primary text-wrap m-1" id="customerAproveReasonForRejectionText" style="border-radius: 5px;">
              ${dayNum + " " + monthName}
            </div>
            <div class="row m-1">
              <button type="button" data-key1="" data-key="${activity1DocId}" data-extra-key="${i}" data-third-key="${firstDayOfMonth}" data-daysDocId-key="${daysDocId}" class="btn ${btnStatus1} answerBtn border morningButton mt-1 p-1" style="width: 100%; height:35px; table-layout: fixed; white-space: pre; overflow: hidden; text-overflow: ellipsis; text-align: center; vertical-align: middle;">${namestatus1}</button>
              <button type="button" data-key2="" data-key="${activity2DocId}" data-extra-key="${i}" data-third-key="${firstDayOfMonth}" data-daysDocId-key="${daysDocId}" class="btn ${btnStatus2} answerBtn border afternonButton mt-1" style="width: 100%; height:35px; table-layout: fixed; white-space: pre; overflow: hidden; text-overflow: ellipsis; text-align: center; vertical-align: middle;">${namestatus2}</button>
              <button type="button" data-key3="" data-key="${activity3DocId}" data-extra-key="${i}" data-third-key="${firstDayOfMonth}" data-daysDocId-key="${daysDocId}" class="btn ${btnStatus3} answerBtn border nightButton mt-1" style="width: 100%; height:35px; table-layout: fixed; white-space: pre; overflow: hidden; text-overflow: ellipsis; text-align: center; vertical-align: middle;">${namestatus3}</button>
            </div>
          </div>
        `;

        products.innerHTML += proCode;
      }
    }
  }

  // Boş satırları kontrol et ve gizle
  for (let row = 6; row >= 1; row--) {
    const rowElement = document.querySelector(
      `#calendar tbody tr:nth-child(${row})`
    );
    if (rowElement) {
      const cells = rowElement.querySelectorAll("td");
      let isEmpty = true;

      cells.forEach((cell) => {
        if (cell.querySelector(".text-bg-primary")) {
          isEmpty = false;
        }
      });

      if (isEmpty) {
        rowElement.style.display = "none";
      } else {
        break; // İçi dolu bir satır bulunca döngüyü sonlandır
      }
    }
  }

  $("#goButton").prop("disabled", false);
  $("#warningTitleBack").css("display", "none");
});

$("#programCancelButton").on("click", async function () {
  try {
    const docRef = doc(db, "ProgramList", updateDocId);

    updateDoc(docRef, {
      programStatus: false,
      cancelUser: currentUser.email,
      cancelDAte: new Date(),
    });

    const updatePromises = [];

    if (programSessionArrayList.includes("1")) {
      const docRefUpdate = doc(db, "VenueTracking", venueDocId);

      updatePromises.push(
        updateDoc(docRefUpdate, {
          activity1DocId: "0",
          activity1Name: "",
        })
      );
    }

    if (programSessionArrayList.includes("2")) {
      const docRefUpdate = doc(db, "VenueTracking", venueDocId);

      updatePromises.push(
        updateDoc(docRefUpdate, {
          activity2DocId: "0",
          activity2Name: "",
        })
      );
    }

    if (programSessionArrayList.includes("3")) {
      const docRefUpdate = doc(db, "VenueTracking", venueDocId);

      updatePromises.push(
        updateDoc(docRefUpdate, {
          activity3DocId: "0",
          activity3Name: "",
        })
      );
    }

    await Promise.all(updatePromises);

    programTableContainer.style.display = "";
    addEditProgramContainer.style.display = "none";
    addEditButtonStatus = "";

    morningButton.classList.add("btn-light");
    morningButton.classList.remove("btn-danger");

    afternoonButton.classList.add("btn-light");
    afternoonButton.classList.remove("btn-danger");

    nightButton.classList.add("btn-light");
    nightButton.classList.remove("btn-danger");

    allDayButton.classList.add("btn-light");
    allDayButton.classList.remove("btn-danger");

    morningButton.disabled = false;
    afternoonButton.disabled = false;
    nightButton.disabled = false;
    allDayButton.disabled = false;

    totalPrice = 0;
    priceInfoText.value = 0 + " TL";
    priceArrayList.length = 0;
    programSessionArrayList.length = 0;
    console.log(priceArrayList.length + " sadas");
    programCancelButton.style.display = "none";

    $(`td`).css("background-color", "White");

    for (let i = 1; i <= 42; i++) {
      let dayId = `day${i}`;

      const products = document.querySelector(`#${dayId}`);
      products.innerHTML = "";
    }

    var firstDayOfMonth = getFirstDayOfMonth(year, month);
    // Ocak 0. İndexeSahiptir

    var daysInMonth = getDaysInMonth(year, month);

    var daysNumber = firstDayOfMonth + daysInMonth - 1;

    $("#goButton").prop("disabled", true);
    $("#warningTitleBack").css("display", "");
    $("#warningTitle").html("Liste Güncelleniyor! Lütfen Bekleyin!");

    for (let i = firstDayOfMonth; i <= daysNumber; i++) {
      let dayId = `day${i}`;

      const products = document.querySelector(`#${dayId}`);

      let dayNum = i - firstDayOfMonth + 1;
      var daysDocId = "0";
      var firebaseDay = "0";
      var activity1Name = "";
      var activity1DocId = "0";
      var activity2Name = "";
      var activity2DocId = "0";
      var activity3Name = "";
      var activity3DocId = "0";

      const monthArray = [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık",
      ];

      var monthName = monthArray[month];

      let InvWritingItem = [];

      if (!products) {
        continue;
      } else {
        InvWritingItem = [
          daysDocId,
          activity1DocId,
          activity2DocId,
          activity3DocId,
          activity1Name,
          activity2Name,
          activity3Name,
        ];
        const getData = query(
          collection(db, "VenueTracking"),
          where("year", "==", year),
          where("month", "==", month),
          where("day", "==", dayId),
          where("saloon", "==", saloonCode)
        );

        const querySnapshot = await getDocs(getData);

        querySnapshot.forEach((doc) => {
          const daysDocument = doc.id;

          daysDocId = daysDocument;
          activity1DocId = doc.data().activity1DocId;
          activity1Name = doc.data().activity1Name;

          activity2DocId = doc.data().activity2DocId;
          activity2Name = doc.data().activity2Name;

          activity3DocId = doc.data().activity3DocId;
          activity3Name = doc.data().activity3Name;

          console.log(activity3DocId + " dasa");

          InvWritingItem = [
            daysDocId,
            activity1DocId,
            activity2DocId,
            activity3DocId,
            activity1Name,
            activity2Name,
            activity3Name,
          ];
        });

        createInvWritingArray(InvWritingItem);

        function createInvWritingArray([
          daysDocId,
          activity1DocId,
          activity2DocId,
          activity3DocId,
          activity1Name,
          activity2Name,
          activity3Name,
        ]) {
          let btnStatus1 = activity1DocId === "0" ? "btn-light" : "btn-danger";
          let namestatus1 = activity1DocId === "0" ? "09 - 12" : activity1Name;

          let btnStatus2 = activity2DocId === "0" ? "btn-light" : "btn-danger";
          let namestatus2 = activity2DocId === "0" ? "13 - 17" : activity2Name;

          let btnStatus3 = activity3DocId === "0" ? "btn-light" : "btn-danger";
          let namestatus3 = activity3DocId === "0" ? "19 - 23" : activity3Name;

          if (dayNum === dayToday) {
            $(`#${dayId}`).css("background-color", "#A2CDF2");
          }

          let proCode = `
            <div class="justify-content-between"> 
              <div class="text-bg-primary text-wrap m-1" id="customerAproveReasonForRejectionText" style="border-radius: 5px;">
                ${dayNum + " " + monthName}
              </div>
              <div class="row m-1">
                <button type="button" data-key1="" data-key="${activity1DocId}" data-extra-key="${i}" data-third-key="${firstDayOfMonth}" data-daysDocId-key="${daysDocId}" class="btn ${btnStatus1} answerBtn border morningButton mt-1 p-1" style="width: 100%; height:35px; table-layout: fixed; white-space: pre; overflow: hidden; text-overflow: ellipsis; text-align: center; vertical-align: middle;">${namestatus1}</button>
                <button type="button" data-key2="" data-key="${activity2DocId}" data-extra-key="${i}" data-third-key="${firstDayOfMonth}" data-daysDocId-key="${daysDocId}" class="btn ${btnStatus2} answerBtn border afternonButton mt-1" style="width: 100%; height:35px; table-layout: fixed; white-space: pre; overflow: hidden; text-overflow: ellipsis; text-align: center; vertical-align: middle;">${namestatus2}</button>
                <button type="button" data-key3="" data-key="${activity3DocId}" data-extra-key="${i}" data-third-key="${firstDayOfMonth}" data-daysDocId-key="${daysDocId}" class="btn ${btnStatus3} answerBtn border nightButton mt-1" style="width: 100%; height:35px; table-layout: fixed; white-space: pre; overflow: hidden; text-overflow: ellipsis; text-align: center; vertical-align: middle;">${namestatus3}</button>
              </div>
            </div>
          `;

          products.innerHTML += proCode;
        }
      }
    }

    // Boş satırları kontrol et ve gizle
    for (let row = 6; row >= 1; row--) {
      const rowElement = document.querySelector(
        `#calendar tbody tr:nth-child(${row})`
      );
      if (rowElement) {
        const cells = rowElement.querySelectorAll("td");
        let isEmpty = true;

        cells.forEach((cell) => {
          if (cell.querySelector(".text-bg-primary")) {
            isEmpty = false;
          }
        });

        if (isEmpty) {
          rowElement.style.display = "none";
        } else {
          break; // İçi dolu bir satır bulunca döngüyü sonlandır
        }
      }
    }

    $("#goButton").prop("disabled", false);
    $("#warningTitleBack").css("display", "none");

    alert("Program başarılı bir şekilde iptal edildi.");
  } catch (error) {}
});

$("#programAddEditSuccessButton").on("click", async function () {
  var dayAddAddDocument = "";

  const getData = query(
    collection(db, "VenueTracking"),
    where("year", "==", year),
    where("month", "==", month),
    where("day", "==", publicDayId),
    where("saloon", "==", saloonCode)
  );
  const querySnapshot = await getDocs(getData);

  querySnapshot.forEach((doc) => {
    dayAddAddDocument = doc.id;
  });

  var manageAprovalRequest = $("#managerAprovalRequestCheck").is(":checked");

  if (addEditButtonStatus == "Add") {
    if (programSessionArrayList.length == 0) {
      alert("Lütfen program için seans seçin!!");
    } else {
      if (freeRequestCheck.checked) {
        if (
          reservationStatusSelect.value == "0" ||
          programCategorySelect.value == "" ||
          programCorporationText.value == "" ||
          programNameText.value == "" ||
          programNameSurNameText.value == "" ||
          programTelephonenumberText.value == ""
        ) {
          alert("Lütfen tüm alanları doldurun.");

          if (reservationStatusSelect.value == "0") {
            reservationStatusSelect.classList.add("is-invalid");
          } else {
            reservationStatusSelect.classList.remove("is-invalid");
          }

          if (paymentInfoSelect.value == "0") {
            paymentInfoSelect.classList.add("is-invalid");
          } else {
            paymentInfoSelect.classList.remove("is-invalid");
          }

          if (programCategorySelect.value == "0") {
            programCategorySelect.classList.add("is-invalid");
          } else {
            programCategorySelect.classList.remove("is-invalid");
          }

          if (programCorporationText.value == "") {
            programCorporationText.classList.add("is-invalid");
          } else {
            programCorporationText.classList.remove("is-invalid");
          }

          if (programNameText.value == "") {
            programNameText.classList.add("is-invalid");
          } else {
            programNameText.classList.remove("is-invalid");
          }

          if (programNameSurNameText.value == "") {
            programNameSurNameText.classList.add("is-invalid");
          } else {
            programNameSurNameText.classList.remove("is-invalid");
          }

          if (programTelephonenumberText.value == "") {
            programTelephonenumberText.classList.add("is-invalid");
          } else {
            programTelephonenumberText.classList.remove("is-invalid");
          }
        } else {
          var docIdAdd = "";
          try {
            const docRefProgram = await addDoc(collection(db, "ProgramList"), {
              programSessionArrayList: programSessionArrayList,
              reservationStatus: reservationStatusSelect.value,
              paymentInfo: paymentInfoSelect.value,
              managerAprovalRequest: manageAprovalRequest,
              category: programCategorySelect.value,
              corporation: programCorporationText.value,
              name: programNameText.value,
              description: programDescriptionText.value,
              contactNameSurname: programNameSurNameText.value,
              contactTelephone: programTelephonenumberText.value,
              contactEmail: programEmailText.value,
              notes: programNotesText.value,
              tecnicalNotes: programTecnicalNotesText.value,
              programDate: programDate,
              saloon: saloonCode,
              price: totalPrice,
              programStatus: true,
              addUser: currentUser.email,
              addDate: new Date(),
              editUser: "",
              editDate: new Date(),
              cancelUser: "",
              cancelDAte: new Date(),
            });

            docIdAdd = docRefProgram.id;

            var activityDocId1 = "";
            var activityDocId2 = "";
            var activityDocId3 = "";

            if (programSessionArrayList.includes("1")) {
              activityDocId1 = docIdAdd;
              activity1Name = programCorporationText.value;
            } else {
              activityDocId1 = "0";
              activity1Name = "";
            }

            if (programSessionArrayList.includes("2")) {
              activityDocId2 = docIdAdd;
              activity2Name = programCorporationText.value;
            } else {
              activityDocId2 = "0";
              activity2Name = "";
            }

            if (programSessionArrayList.includes("3")) {
              activityDocId3 = docIdAdd;
              activity3Name = programCorporationText.value;
            } else {
              activityDocId3 = "0";
              activity3Name = "";
            }

            if (dayAddAddDocument == "") {
              let dayId = `day${extraKey}`;
              const docRefVenue = await addDoc(
                collection(db, "VenueTracking"),
                {
                  activity1DocId: activityDocId1,
                  activity1Name: activity1Name,
                  activity2DocId: activityDocId2,
                  activity2Name: activity2Name,
                  activity3DocId: activityDocId3,
                  activity3Name: activity3Name,
                  saloon: saloonCode,
                  day: dayId,
                  month: month,
                  year: year,
                }
              );
            } else {
              const updatePromises = [];

              if (programSessionArrayList.includes("1")) {
                const docRefUpdate = doc(
                  db,
                  "VenueTracking",
                  dayAddAddDocument
                );

                updatePromises.push(
                  updateDoc(docRefUpdate, {
                    activity1DocId: activityDocId1,
                    activity1Name: activity1Name,
                  })
                );
              }

              if (programSessionArrayList.includes("2")) {
                const docRefUpdate = doc(
                  db,
                  "VenueTracking",
                  dayAddAddDocument
                );

                updatePromises.push(
                  updateDoc(docRefUpdate, {
                    activity2DocId: activityDocId2,
                    activity2Name: activity2Name,
                  })
                );
              }

              if (programSessionArrayList.includes("3")) {
                const docRefUpdate = doc(
                  db,
                  "VenueTracking",
                  dayAddAddDocument
                );

                updatePromises.push(
                  updateDoc(docRefUpdate, {
                    activity3DocId: activityDocId3,
                    activity3Name: activity3Name,
                  })
                );
              }

              await Promise.all(updatePromises);
            }

            programTableContainer.style.display = "";
            addEditProgramContainer.style.display = "none";
            addEditButtonStatus = "";

            morningButton.classList.add("btn-light");
            morningButton.classList.remove("btn-danger");

            afternoonButton.classList.add("btn-light");
            afternoonButton.classList.remove("btn-danger");

            nightButton.classList.add("btn-light");
            nightButton.classList.remove("btn-danger");

            allDayButton.classList.add("btn-light");
            allDayButton.classList.remove("btn-danger");

            morningButton.disabled = false;
            afternoonButton.disabled = false;
            nightButton.disabled = false;
            allDayButton.disabled = false;

            totalPrice = 0;
            priceInfoText.value = 0 + " TL";
            priceArrayList.length = 0;
            programSessionArrayList.length = 0;
            console.log(priceArrayList.length + " sadas");
            programCancelButton.style.display = "none";

            $(`td`).css("background-color", "White");

            for (let i = 1; i <= 42; i++) {
              let dayId = `day${i}`;

              const products = document.querySelector(`#${dayId}`);
              products.innerHTML = "";
            }

            var firstDayOfMonth = getFirstDayOfMonth(year, month);
            // Ocak 0. İndexeSahiptir

            var daysInMonth = getDaysInMonth(year, month);

            var daysNumber = firstDayOfMonth + daysInMonth - 1;

            $("#goButton").prop("disabled", true);
            $("#warningTitleBack").css("display", "");
            $("#warningTitle").html("Liste Güncelleniyor! Lütfen Bekleyin!");

            for (let i = firstDayOfMonth; i <= daysNumber; i++) {
              let dayId = `day${i}`;

              const products = document.querySelector(`#${dayId}`);

              let dayNum = i - firstDayOfMonth + 1;
              var daysDocId = "0";
              var firebaseDay = "0";
              var activity1Name = "";
              var activity1DocId = "0";
              var activity2Name = "";
              var activity2DocId = "0";
              var activity3Name = "";
              var activity3DocId = "0";

              const monthArray = [
                "Ocak",
                "Şubat",
                "Mart",
                "Nisan",
                "Mayıs",
                "Haziran",
                "Temmuz",
                "Ağustos",
                "Eylül",
                "Ekim",
                "Kasım",
                "Aralık",
              ];

              var monthName = monthArray[month];

              let InvWritingItem = [];

              if (!products) {
                continue;
              } else {
                InvWritingItem = [
                  daysDocId,
                  activity1DocId,
                  activity2DocId,
                  activity3DocId,
                  activity1Name,
                  activity2Name,
                  activity3Name,
                ];
                const getData = query(
                  collection(db, "VenueTracking"),
                  where("year", "==", year),
                  where("month", "==", month),
                  where("day", "==", dayId),
                  where("saloon", "==", saloonCode)
                );

                const querySnapshot = await getDocs(getData);

                querySnapshot.forEach((doc) => {
                  const daysDocument = doc.id;

                  daysDocId = daysDocument;
                  activity1DocId = doc.data().activity1DocId;
                  activity1Name = doc.data().activity1Name;

                  activity2DocId = doc.data().activity2DocId;
                  activity2Name = doc.data().activity2Name;

                  activity3DocId = doc.data().activity3DocId;
                  activity3Name = doc.data().activity3Name;

                  console.log(activity3DocId + " dasa");

                  InvWritingItem = [
                    daysDocId,
                    activity1DocId,
                    activity2DocId,
                    activity3DocId,
                    activity1Name,
                    activity2Name,
                    activity3Name,
                  ];
                });

                createInvWritingArray(InvWritingItem);

                function createInvWritingArray([
                  daysDocId,
                  activity1DocId,
                  activity2DocId,
                  activity3DocId,
                  activity1Name,
                  activity2Name,
                  activity3Name,
                ]) {
                  var btnStatus1 = "";
                  var btnStatus2 = "";
                  var btnStatus3 = "";
                  var namestatus1 = "";
                  var namestatus2 = "";
                  var namestatus3 = "";

                  console.log(activity3DocId);

                  if (activity1DocId == "0") {
                    btnStatus1 = "btn-light";
                    namestatus1 = "09 - 12";
                  } else {
                    btnStatus1 = "btn-danger";
                    namestatus1 = activity1Name;
                  }

                  if (activity2DocId == "0") {
                    btnStatus2 = "btn-light";
                    namestatus2 = "13 - 17";
                  } else {
                    btnStatus2 = "btn-danger";
                    namestatus2 = activity2Name;
                  }

                  if (activity3DocId == "0") {
                    btnStatus3 = "btn-light";
                    namestatus3 = "19 - 23";
                  } else {
                    btnStatus3 = "btn-danger";
                    namestatus3 = activity3Name;
                  }

                  console.log(
                    $("#monthFormSelect").val() +
                      $("#yearFormSelect").val() +
                      new Date().getMonth() +
                      new Date().getFullYear()
                  );
                  if (
                    dayNum == dayToday &&
                    parseInt($("#monthFormSelect").val()) ==
                      new Date().getMonth() &&
                    parseInt($("#yearFormSelect").val()) ==
                      new Date().getFullYear()
                  ) {
                    $(`#${dayId}`).css("background-color", "#A2CDF2");
                  }

                  let proCode = `
            
                    <div class="justify-content-between"> 
                  
                     <div class="text-bg-primary text-wrap m-1" id="customerAproveReasonForRejectionText" style="border-radius: 5px;">${
                       dayNum + " " + monthName
                     }</div>
                  
                     <div class="row m-1">
                    
                    <button type="button" data-key1="" data-key="${activity1DocId}" data-extra-key="${i}" data-third-key="${firstDayOfMonth}" data-daysDocId-key="${daysDocId}" class="btn ${btnStatus1} answerBtn border morningButton mt-1 p-1" style= "width: 155px; height:35px; white-space: nowrap;  overflow: hidden; text-overflow: ellipsis; text-align: center;" >${namestatus1} </button>
                  
                    <button type="button" data-key2="" data-key="${activity2DocId}" data-extra-key="${i}" data-third-key="${firstDayOfMonth}" data-daysDocId-key="${daysDocId}" class="btn ${btnStatus2} answerBtn border afternonButton mt-1" style= "width: 155px; height:35px; white-space: nowrap;  overflow: hidden; text-overflow: ellipsis; text-align: center;" >${namestatus2}</button>
                  
                    <button type="button" data-key3="" data-key="${activity3DocId}" data-extra-key="${i}" data-third-key="${firstDayOfMonth}" data-daysDocId-key="${daysDocId}" class="btn ${btnStatus3}  answerBtn border nightButton mt-1" style= "width: 155px; height:35px; white-space: nowrap;  overflow: hidden; text-overflow: ellipsis; text-align: center;">${namestatus3}</button>
                  
                    </div>
                    
                    </div>
                  
                    `;

                  products.innerHTML += proCode;
                }
              }
            }

            $("#goButton").prop("disabled", false);
            $("#warningTitleBack").css("display", "none");

            alert("Program başarılı bir şekilde eklendi");
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
      } else {
        if (
          reservationStatusSelect.value == "0" ||
          paymentInfoSelect.value == "0" ||
          programCategorySelect.value == "" ||
          programCorporationText.value == "" ||
          programNameText.value == "" ||
          programNameSurNameText.value == "" ||
          programTelephonenumberText.value == ""
        ) {
          alert("Lütfen tüm alanları doldurun.");

          if (reservationStatusSelect.value == "0") {
            reservationStatusSelect.classList.add("is-invalid");
          } else {
            reservationStatusSelect.classList.remove("is-invalid");
          }

          if (paymentInfoSelect.value == "0") {
            paymentInfoSelect.classList.add("is-invalid");
          } else {
            paymentInfoSelect.classList.remove("is-invalid");
          }

          if (programCategorySelect.value == "0") {
            programCategorySelect.classList.add("is-invalid");
          } else {
            programCategorySelect.classList.remove("is-invalid");
          }

          if (programCorporationText.value == "") {
            programCorporationText.classList.add("is-invalid");
          } else {
            programCorporationText.classList.remove("is-invalid");
          }

          if (programNameText.value == "") {
            programNameText.classList.add("is-invalid");
          } else {
            programNameText.classList.remove("is-invalid");
          }

          if (programNameSurNameText.value == "") {
            programNameSurNameText.classList.add("is-invalid");
          } else {
            programNameSurNameText.classList.remove("is-invalid");
          }

          if (programTelephonenumberText.value == "") {
            programTelephonenumberText.classList.add("is-invalid");
          } else {
            programTelephonenumberText.classList.remove("is-invalid");
          }
        } else {
          var docIdAdd = "";
          try {
            const docRefProgram = await addDoc(collection(db, "ProgramList"), {
              programSessionArrayList: programSessionArrayList,
              reservationStatus: reservationStatusSelect.value,
              paymentInfo: paymentInfoSelect.value,
              managerAprovalRequest: manageAprovalRequest,
              category: programCategorySelect.value,
              corporation: programCorporationText.value,
              name: programNameText.value,
              description: programDescriptionText.value,
              contactNameSurname: programNameSurNameText.value,
              contactTelephone: programTelephonenumberText.value,
              contactEmail: programEmailText.value,
              notes: programNotesText.value,
              tecnicalNotes: programTecnicalNotesText.value,
              programDate: programDate,
              saloon: saloonCode,
              price: totalPrice,
              programStatus: true,
              addUser: currentUser.email,
              addDate: new Date(),
              editUser: "",
              editDate: new Date(),
              cancelUser: "",
              cancelDAte: new Date(),
            });

            docIdAdd = docRefProgram.id;

            var activityDocId1 = "";
            var activityDocId2 = "";
            var activityDocId3 = "";

            if (programSessionArrayList.includes("1")) {
              activityDocId1 = docIdAdd;
              activity1Name = programCorporationText.value;
            } else {
              activityDocId1 = "0";
              activity1Name = "";
            }

            if (programSessionArrayList.includes("2")) {
              activityDocId2 = docIdAdd;
              activity2Name = programCorporationText.value;
            } else {
              activityDocId2 = "0";
              activity2Name = "";
            }

            if (programSessionArrayList.includes("3")) {
              activityDocId3 = docIdAdd;
              activity3Name = programCorporationText.value;
            } else {
              activityDocId3 = "0";
              activity3Name = "";
            }

            if (dayAddAddDocument == "") {
              let dayId = `day${extraKey}`;
              const docRefVenue = await addDoc(
                collection(db, "VenueTracking"),
                {
                  activity1DocId: activityDocId1,
                  activity1Name: activity1Name,
                  activity2DocId: activityDocId2,
                  activity2Name: activity2Name,
                  activity3DocId: activityDocId3,
                  activity3Name: activity3Name,
                  saloon: saloonCode,
                  day: dayId,
                  month: month,
                  year: year,
                }
              );
            } else {
              const updatePromises = [];

              if (programSessionArrayList.includes("1")) {
                const docRefUpdate = doc(
                  db,
                  "VenueTracking",
                  dayAddAddDocument
                );

                updatePromises.push(
                  updateDoc(docRefUpdate, {
                    activity1DocId: activityDocId1,
                    activity1Name: activity1Name,
                  })
                );
              }

              if (programSessionArrayList.includes("2")) {
                const docRefUpdate = doc(
                  db,
                  "VenueTracking",
                  dayAddAddDocument
                );

                updatePromises.push(
                  updateDoc(docRefUpdate, {
                    activity2DocId: activityDocId2,
                    activity2Name: activity2Name,
                  })
                );
              }

              if (programSessionArrayList.includes("3")) {
                const docRefUpdate = doc(
                  db,
                  "VenueTracking",
                  dayAddAddDocument
                );

                updatePromises.push(
                  updateDoc(docRefUpdate, {
                    activity3DocId: activityDocId3,
                    activity3Name: activity3Name,
                  })
                );
              }

              await Promise.all(updatePromises);
            }

            programTableContainer.style.display = "";
            addEditProgramContainer.style.display = "none";
            addEditButtonStatus = "";

            morningButton.classList.add("btn-light");
            morningButton.classList.remove("btn-danger");

            afternoonButton.classList.add("btn-light");
            afternoonButton.classList.remove("btn-danger");

            nightButton.classList.add("btn-light");
            nightButton.classList.remove("btn-danger");

            allDayButton.classList.add("btn-light");
            allDayButton.classList.remove("btn-danger");

            morningButton.disabled = false;
            afternoonButton.disabled = false;
            nightButton.disabled = false;
            allDayButton.disabled = false;

            totalPrice = 0;
            priceInfoText.value = 0 + " TL";
            priceArrayList.length = 0;
            programSessionArrayList.length = 0;
            console.log(priceArrayList.length + " sadas");
            programCancelButton.style.display = "none";

            $(`td`).css("background-color", "White");

            for (let i = 1; i <= 42; i++) {
              let dayId = `day${i}`;

              const products = document.querySelector(`#${dayId}`);
              products.innerHTML = "";
            }

            var firstDayOfMonth = getFirstDayOfMonth(year, month);
            // Ocak 0. İndexeSahiptir

            var daysInMonth = getDaysInMonth(year, month);

            var daysNumber = firstDayOfMonth + daysInMonth - 1;

            $("#goButton").prop("disabled", true);
            $("#warningTitleBack").css("display", "");
            $("#warningTitle").html("Liste Güncelleniyor! Lütfen Bekleyin!");

            for (let i = firstDayOfMonth; i <= daysNumber; i++) {
              let dayId = `day${i}`;

              const products = document.querySelector(`#${dayId}`);

              let dayNum = i - firstDayOfMonth + 1;
              var daysDocId = "0";
              var firebaseDay = "0";
              var activity1Name = "";
              var activity1DocId = "0";
              var activity2Name = "";
              var activity2DocId = "0";
              var activity3Name = "";
              var activity3DocId = "0";

              const monthArray = [
                "Ocak",
                "Şubat",
                "Mart",
                "Nisan",
                "Mayıs",
                "Haziran",
                "Temmuz",
                "Ağustos",
                "Eylül",
                "Ekim",
                "Kasım",
                "Aralık",
              ];

              var monthName = monthArray[month];

              let InvWritingItem = [];

              if (!products) {
                continue;
              } else {
                InvWritingItem = [
                  daysDocId,
                  activity1DocId,
                  activity2DocId,
                  activity3DocId,
                  activity1Name,
                  activity2Name,
                  activity3Name,
                ];
                const getData = query(
                  collection(db, "VenueTracking"),
                  where("year", "==", year),
                  where("month", "==", month),
                  where("day", "==", dayId),
                  where("saloon", "==", saloonCode)
                );

                const querySnapshot = await getDocs(getData);

                querySnapshot.forEach((doc) => {
                  const daysDocument = doc.id;

                  daysDocId = daysDocument;
                  activity1DocId = doc.data().activity1DocId;
                  activity1Name = doc.data().activity1Name;

                  activity2DocId = doc.data().activity2DocId;
                  activity2Name = doc.data().activity2Name;

                  activity3DocId = doc.data().activity3DocId;
                  activity3Name = doc.data().activity3Name;

                  console.log(activity3DocId + " dasa");

                  InvWritingItem = [
                    daysDocId,
                    activity1DocId,
                    activity2DocId,
                    activity3DocId,
                    activity1Name,
                    activity2Name,
                    activity3Name,
                  ];
                });

                createInvWritingArray(InvWritingItem);

                function createInvWritingArray([
                  daysDocId,
                  activity1DocId,
                  activity2DocId,
                  activity3DocId,
                  activity1Name,
                  activity2Name,
                  activity3Name,
                ]) {
                  var btnStatus1 = "";
                  var btnStatus2 = "";
                  var btnStatus3 = "";
                  var namestatus1 = "";
                  var namestatus2 = "";
                  var namestatus3 = "";

                  console.log(activity3DocId);

                  if (activity1DocId == "0") {
                    btnStatus1 = "btn-light";
                    namestatus1 = "09 - 12";
                  } else {
                    btnStatus1 = "btn-danger";
                    namestatus1 = activity1Name;
                  }

                  if (activity2DocId == "0") {
                    btnStatus2 = "btn-light";
                    namestatus2 = "13 - 17";
                  } else {
                    btnStatus2 = "btn-danger";
                    namestatus2 = activity2Name;
                  }

                  if (activity3DocId == "0") {
                    btnStatus3 = "btn-light";
                    namestatus3 = "19 - 23";
                  } else {
                    btnStatus3 = "btn-danger";
                    namestatus3 = activity3Name;
                  }

                  console.log(
                    $("#monthFormSelect").val() +
                      $("#yearFormSelect").val() +
                      new Date().getMonth() +
                      new Date().getFullYear()
                  );
                  if (
                    dayNum == dayToday &&
                    parseInt($("#monthFormSelect").val()) ==
                      new Date().getMonth() &&
                    parseInt($("#yearFormSelect").val()) ==
                      new Date().getFullYear()
                  ) {
                    $(`#${dayId}`).css("background-color", "#A2CDF2");
                  }

                  let proCode = `
            
                    <div class="justify-content-between"> 
                  
                     <div class="text-bg-primary text-wrap m-1" id="customerAproveReasonForRejectionText" style="border-radius: 5px;">${
                       dayNum + " " + monthName
                     }</div>
                  
                     <div class="row m-1">
                    
                    <button type="button" data-key1="" data-key="${activity1DocId}" data-extra-key="${i}" data-third-key="${firstDayOfMonth}" data-daysDocId-key="${daysDocId}" class="btn ${btnStatus1} answerBtn border morningButton mt-1 p-1" style= "width: 155px; height:35px; white-space: nowrap;  overflow: hidden; text-overflow: ellipsis; text-align: center;" >${namestatus1} </button>
                  
                    <button type="button" data-key2="" data-key="${activity2DocId}" data-extra-key="${i}" data-third-key="${firstDayOfMonth}" data-daysDocId-key="${daysDocId}" class="btn ${btnStatus2} answerBtn border afternonButton mt-1" style= "width: 155px; height:35px; white-space: nowrap;  overflow: hidden; text-overflow: ellipsis; text-align: center;" >${namestatus2}</button>
                  
                    <button type="button" data-key3="" data-key="${activity3DocId}" data-extra-key="${i}" data-third-key="${firstDayOfMonth}" data-daysDocId-key="${daysDocId}" class="btn ${btnStatus3}  answerBtn border nightButton mt-1" style= "width: 155px; height:35px; white-space: nowrap;  overflow: hidden; text-overflow: ellipsis; text-align: center;">${namestatus3}</button>
                  
                    </div>
                    
                    </div>
                  
                    `;

                  products.innerHTML += proCode;
                }
              }
            }

            $("#goButton").prop("disabled", false);
            $("#warningTitleBack").css("display", "none");

            alert("Program başarılı bir şekilde eklendi");
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
      }
    }
  } else if (addEditButtonStatus == "Edit") {
    const docRef = doc(db, "ProgramList", updateDocId);

    updateDoc(docRef, {
      reservationStatus: reservationStatusSelect.value,
      paymentInfo: paymentInfoSelect.value,
      managerAprovalRequest: manageAprovalRequest,
      category: programCategorySelect.value,
      corporation: programCorporationText.value,
      name: programNameText.value,
      description: programDescriptionText.value,
      contactNameSurname: programNameSurNameText.value,
      contactTelephone: programTelephonenumberText.value,
      contactEmail: programEmailText.value,
      notes: programNotesText.value,
      tecnicalNotes: programTecnicalNotesText.value,

      editUser: currentUser.email,
      editDate: new Date(),
    });
    alert("Program başarılı bir şekilde güncellendi");
  }
});

priceInfoText.onchange = function () {
  totalPrice = priceInfoText.value;

  priceInfoText.value = totalPrice + " TL";
};

$("#programAddEditCancelButton").on("click", function () {
  $("#programTableContainer").show();
  $("#addEditProgramContainer").hide();
  addEditButtonStatus = "";

  morningButton.classList.add("btn-light");
  morningButton.classList.remove("btn-danger");

  afternoonButton.classList.add("btn-light");
  afternoonButton.classList.remove("btn-danger");

  nightButton.classList.add("btn-light");
  nightButton.classList.remove("btn-danger");

  allDayButton.classList.add("btn-light");
  allDayButton.classList.remove("btn-danger");

  morningButton.disabled = false;
  afternoonButton.disabled = false;
  nightButton.disabled = false;
  allDayButton.disabled = false;

  totalPrice = 0;
  priceInfoText.value = 0 + " TL";
  priceArrayList.length = 0;
  programSessionArrayList.length = 0;
  console.log(priceArrayList.length + " sadas");
  programCancelButton.style.display = "none";
});

$("#backButton").on("click", function () {
  $("#programTableContainer").show();
  $("#addEditProgramContainer").hide();
  addEditButtonStatus = "";

  morningButton.classList.add("btn-light");
  morningButton.classList.remove("btn-danger");

  afternoonButton.classList.add("btn-light");
  afternoonButton.classList.remove("btn-danger");

  nightButton.classList.add("btn-light");
  nightButton.classList.remove("btn-danger");

  allDayButton.classList.add("btn-light");
  allDayButton.classList.remove("btn-danger");

  morningButton.disabled = false;
  afternoonButton.disabled = false;
  nightButton.disabled = false;
  allDayButton.disabled = false;

  totalPrice = 0;
  priceInfoText.value = 0 + " TL";
  priceArrayList.length = 0;
  programSessionArrayList.length = 0;
  console.log(priceArrayList.length + " sadas");
  programCancelButton.style.display = "none";
});

$("#morningButton").on("click", function () {
  if (programSessionArrayList.includes("1")) {
    programSessionArrayList = programSessionArrayList.filter(function (item) {
      return item !== "1";
    });

    priceArrayList = priceArrayList.filter(function (item) {
      return item !== morningPrice;
    });

    if (programSessionArrayList.length < 3) {
      allDayButton.classList.add("btn-light");
      allDayButton.classList.remove("btn-danger");
    }

    console.log(priceArrayList + " " + programSessionArrayList);

    morningButton.classList.remove("btn-danger");
    morningButton.classList.add("btn-light");

    let total = priceArrayList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    totalPrice = Math.round(total * 100) / 100;

    priceInfoText.value = totalPrice + " TL";
  } else {
    programSessionArrayList.push("1");
    priceArrayList.push(morningPrice);

    if (programSessionArrayList.length == 3) {
      allDayButton.classList.remove("btn-light");
      allDayButton.classList.add("btn-danger");
    }

    console.log(priceArrayList + " " + programSessionArrayList);

    morningButton.classList.add("btn-danger");
    morningButton.classList.remove("btn-light");

    let total = priceArrayList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    totalPrice = Math.round(total * 100) / 100;

    priceInfoText.value = totalPrice + " TL";
  }
});

$("#afternoonButton").on("click", function () {
  if (programSessionArrayList.includes("2")) {
    programSessionArrayList = programSessionArrayList.filter(function (item) {
      return item !== "2";
    });

    priceArrayList = priceArrayList.filter(function (item) {
      return item !== afternoonPrice;
    });

    if (programSessionArrayList.length < 3) {
      allDayButton.classList.add("btn-light");
      allDayButton.classList.remove("btn-danger");
    }

    console.log(priceArrayList + " " + programSessionArrayList);

    afternoonButton.classList.remove("btn-danger");
    afternoonButton.classList.add("btn-light");

    let total = priceArrayList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    totalPrice = Math.round(total * 100) / 100;
    priceInfoText.value = totalPrice + " TL";
  } else {
    programSessionArrayList.push("2");
    priceArrayList.push(afternoonPrice);

    if (programSessionArrayList.length == 3) {
      allDayButton.classList.remove("btn-light");
      allDayButton.classList.add("btn-danger");
    }

    console.log(priceArrayList + " " + programSessionArrayList);
    afternoonButton.classList.add("btn-danger");
    afternoonButton.classList.remove("btn-light");

    let total = priceArrayList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    totalPrice = Math.round(total * 100) / 100;
    priceInfoText.value = totalPrice + " TL";
  }
});

$("#nightButton").on("click", function () {
  if (programSessionArrayList.includes("3")) {
    programSessionArrayList = programSessionArrayList.filter(function (item) {
      return item !== "3";
    });

    priceArrayList = priceArrayList.filter(function (item) {
      return item !== nightPrice;
    });

    if (programSessionArrayList.length < 3) {
      allDayButton.classList.add("btn-light");
      allDayButton.classList.remove("btn-danger");
    }

    console.log(priceArrayList + " " + programSessionArrayList);

    nightButton.classList.remove("btn-danger");
    nightButton.classList.add("btn-light");

    let total = priceArrayList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    totalPrice = Math.round(total * 100) / 100;
    priceInfoText.value = totalPrice + " TL";
  } else {
    programSessionArrayList.push("3");
    priceArrayList.push(nightPrice);

    if (programSessionArrayList.length == 3) {
      allDayButton.classList.remove("btn-light");
      allDayButton.classList.add("btn-danger");
    }

    console.log(priceArrayList + " " + programSessionArrayList);

    nightButton.classList.add("btn-danger");
    nightButton.classList.remove("btn-light");

    let total = priceArrayList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    totalPrice = Math.round(total * 100) / 100;
    priceInfoText.value = totalPrice + " TL";
  }
});

$("#allDayButton").on("click", function () {
  if (
    programSessionArrayList.length >= 0 &&
    programSessionArrayList.length < 3
  ) {
    programSessionArrayList.length = 0;
    programSessionArrayList.push("1");
    programSessionArrayList.push("2");
    programSessionArrayList.push("3");

    priceArrayList.length = 0;
    priceArrayList.push(morningPrice);
    priceArrayList.push(afternoonPrice);
    priceArrayList.push(nightPrice);

    morningButton.classList.remove("btn-light");
    afternoonButton.classList.remove("btn-light");
    nightButton.classList.remove("btn-light");
    allDayButton.classList.remove("btn-light");

    morningButton.classList.add("btn-danger");
    afternoonButton.classList.add("btn-danger");
    nightButton.classList.add("btn-danger");
    allDayButton.classList.add("btn-danger");

    let total = priceArrayList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    totalPrice = Math.round(total * 100) / 100;
    priceInfoText.value = totalPrice + " TL";
  } else if (programSessionArrayList.length == 3) {
    programSessionArrayList = [];

    priceArrayList = [];

    morningButton.classList.add("btn-light");
    afternoonButton.classList.add("btn-light");
    nightButton.classList.add("btn-light");
    allDayButton.classList.add("btn-light");

    morningButton.classList.remove("btn-danger");
    afternoonButton.classList.remove("btn-danger");
    nightButton.classList.remove("btn-danger");
    allDayButton.classList.remove("btn-danger");

    let total = priceArrayList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    totalPrice = Math.round(total * 100) / 100;
    priceInfoText.value = totalPrice + " TL";
  }
});

// her sayfada olacak Kodlar

const autoLogoutTime = 300000; // 5 dakika

let logoutTimer;

function startLogoutTimer() {
  logoutTimer = setTimeout(() => {
    // Oturum açmış olan kullanıcıyı çıkış yap
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        window.location.href = "adminpanellogin.html";
      })
      .catch((error) => {
        // An error happened.
      });
  }, autoLogoutTime);
}

function resetLogoutTimer() {
  clearTimeout(logoutTimer);
  startLogoutTimer();
}

window.onload = resetLogoutTimer;
document.onmousemove = resetLogoutTimer;
document.onkeypress = resetLogoutTimer;
document.onclick = resetLogoutTimer;
document.onscroll = resetLogoutTimer;

auth.onAuthStateChanged((user) => {
  if (user) {
    startLogoutTimer();
  } else {
    clearTimeout(logoutTimer); // Kullanıcı çıkış yaptıysa zamanlayıcıyı durdur
  }
});

$("#logoutButton").on("click", function () {
  console.log("tık ");

  const auth = getAuth();

  signOut(auth)
    .then(() => {
      window.location.href = "adminpanellogin.html";
    })
    .catch((error) => {
      // An error happened.
    });
});

async function processDaysInMonth(
  firstDayOfMonth,
  daysNumber,
  month,
  year,
  saloonCode
) {
  try {
    const monthArray = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ];

    const monthName = monthArray[month];
    const dayToday = new Date().getDate();

    // Önce tüm satırları görünür yap
    for (let row = 1; row <= 6; row++) {
      const rowElement = document.querySelector(
        `#calendar tbody tr:nth-child(${row})`
      );
      if (rowElement) {
        rowElement.style.display = "";
      }
    }

    // Takvimi oluştur
    for (let i = firstDayOfMonth; i <= daysNumber; i++) {
      try {
        let dayId = `day${i}`;
        const products = document.querySelector(`#${dayId}`);
        if (!products) {
          continue;
        }

        let dayNum = i - firstDayOfMonth + 1;
        let daysDocId = "0";
        let activity1Name = "";
        let activity1DocId = "0";
        let activity2Name = "";
        let activity2DocId = "0";
        let activity3Name = "";
        let activity3DocId = "0";

        const getData = query(
          collection(db, "VenueTracking"),
          where("year", "==", year),
          where("month", "==", month),
          where("day", "==", dayId),
          where("saloon", "==", saloonCode)
        );

        const querySnapshot = await getDocs(getData);

        querySnapshot.forEach((doc) => {
          const daysDocument = doc.id;
          daysDocId = daysDocument;
          activity1DocId = doc.data().activity1DocId;
          activity1Name = doc.data().activity1Name;
          activity2DocId = doc.data().activity2DocId;
          activity2Name = doc.data().activity2Name;
          activity3DocId = doc.data().activity3DocId;
          activity3Name = doc.data().activity3Name;
        });

        createInvWritingArray([
          daysDocId,
          activity1DocId,
          activity2DocId,
          activity3DocId,
          activity1Name,
          activity2Name,
          activity3Name,
        ]);

        function createInvWritingArray([
          daysDocId,
          activity1DocId,
          activity2DocId,
          activity3DocId,
          activity1Name,
          activity2Name,
          activity3Name,
        ]) {
          let btnStatus1 = activity1DocId === "0" ? "btn-light" : "btn-danger";
          let namestatus1 = activity1DocId === "0" ? "09 - 12" : activity1Name;

          let btnStatus2 = activity2DocId === "0" ? "btn-light" : "btn-danger";
          let namestatus2 = activity2DocId === "0" ? "13 - 17" : activity2Name;

          let btnStatus3 = activity3DocId === "0" ? "btn-light" : "btn-danger";
          let namestatus3 = activity3DocId === "0" ? "19 - 23" : activity3Name;

          if (dayNum === dayToday) {
            $(`#${dayId}`).css("background-color", "#A2CDF2");
          }

          let proCode = `
            <div class="justify-content-between"> 
              <div class="text-bg-primary text-wrap m-1" id="customerAproveReasonForRejectionText" style="border-radius: 5px;">
                ${dayNum + " " + monthName}
              </div>
              <div class="row m-1">
                <button type="button" data-key1="" data-key="${activity1DocId}" data-extra-key="${i}" data-third-key="${firstDayOfMonth}" data-daysDocId-key="${daysDocId}" class="btn ${btnStatus1} answerBtn border morningButton mt-1 p-1" style="width: 100%; height:35px; table-layout: fixed; white-space: pre; overflow: hidden; text-overflow: ellipsis; text-align: center; vertical-align: middle;">${namestatus1}</button>
                <button type="button" data-key2="" data-key="${activity2DocId}" data-extra-key="${i}" data-third-key="${firstDayOfMonth}" data-daysDocId-key="${daysDocId}" class="btn ${btnStatus2} answerBtn border afternonButton mt-1" style="width: 100%; height:35px; table-layout: fixed; white-space: pre; overflow: hidden; text-overflow: ellipsis; text-align: center; vertical-align: middle;">${namestatus2}</button>
                <button type="button" data-key3="" data-key="${activity3DocId}" data-extra-key="${i}" data-third-key="${firstDayOfMonth}" data-daysDocId-key="${daysDocId}" class="btn ${btnStatus3} answerBtn border nightButton mt-1" style="width: 100%; height:35px; table-layout: fixed; white-space: pre; overflow: hidden; text-overflow: ellipsis; text-align: center; vertical-align: middle;">${namestatus3}</button>
              </div>
            </div>
          `;

          products.innerHTML += proCode;
        }
      } catch (innerError) {
        console.error(`Hata oluştu (dayId: day${i}):`, innerError);
      }
    }

    // Boş satırları kontrol et ve gizle
    for (let row = 6; row >= 1; row--) {
      const rowElement = document.querySelector(
        `#calendar tbody tr:nth-child(${row})`
      );
      if (rowElement) {
        const cells = rowElement.querySelectorAll("td");
        let isEmpty = true;

        cells.forEach((cell) => {
          if (cell.querySelector(".text-bg-primary")) {
            isEmpty = false;
          }
        });

        if (isEmpty) {
          rowElement.style.display = "none";
        } else {
          break; // İçi dolu bir satır bulunca döngüyü sonlandır
        }
      }
    }
  } catch (error) {
    console.error("Genel hata:", error);
  }
}

function hideEmptyLastRow() {
  // Son satırın hücrelerini seç (day36-day42)
  const lastRowCells = Array.from({ length: 7 }, (_, i) =>
    document.getElementById(`day${36 + i}`)
  );

  // Tüm hücrelerin boş olup olmadığını kontrol et
  const allEmpty = lastRowCells.every((cell) => !cell.textContent.trim());

  // Eğer tüm hücreler boşsa
  if (allEmpty) {
    // Son satırı bul ve gizle
    const lastRow = lastRowCells[0].parentElement;
    lastRow.style.display = "none";
  }
}

// Takvim oluşturulduktan sonra bu fonksiyonu çağır
function createCalendar() {
  // ... existing calendar creation code ...

  // Takvim oluşturulduktan sonra son satırı kontrol et
  hideEmptyLastRow();
}

async function createCalendarTable() {
  // ... existing calendar creation code ...

  // Takvim oluşturulduktan sonra son satırı kontrol et
  hideEmptyLastRow();
}
