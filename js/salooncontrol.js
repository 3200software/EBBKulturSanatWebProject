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

onAuthStateChanged(auth, (user) => {
  if (user != null) {
  } else {
    window.location.href = "adminpanellogin.html";
  }
});

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

const programCancelButton = document.getElementById("programCancelButton");

const today = new Date();

var year = today.getFullYear();
var month = today.getMonth();
var dayToday = today.getDate();

var selectDate = new Date();

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

function getSaloonPrice() {
  const docRefsPrice = doc(db, "SaloonPrice", "FYXuqyPhmslWaY2ASu1r");

  getDoc(docRefsPrice)
    .then((docSnap) => {
      if (docSnap.exists()) {
        morningPrice = docSnap.data().morning;
        afternoonPrice = docSnap.data().afternon;
        nightPrice = docSnap.data().night;
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

  console.log(
    `Gün ${dayNum}, ${date.toLocaleDateString()} tarihine denk geliyor.`
  );
  return date;
}

var firstDayOfMonth = getFirstDayOfMonth(year, month);

// Ocak 0. İndexeSahiptir
var daysInMonth = getDaysInMonth(year, month);

var daysNumber = firstDayOfMonth + daysInMonth - 1;

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

      if (dayNum == dayToday) {
        $(`#${dayId}`).css("background-color", "#A2CDF2");
      }

      let proCode = `



      <div class="justify-content-between"> 
      
         <div class="text-bg-primary text-wrap m-1" id="customerAproveReasonForRejectionText" style="border-radius: 5px;">${
           dayNum + " " + monthName
         }</div>
      
         <div class="row m-1">
        
        <button type="button" data-key1="" data-key="${activity1DocId}" data-extra-key="${i}" data-third-key="${firstDayOfMonth}" data-daysDocId-key="${daysDocId}" class="btn ${btnStatus1} answerBtn border morningButton mt-1 p-1" style= "width: 155px; height:35px; white-space: nowrap;  overflow: hidden; text-overflow: ellipsis; text-align: center; " >${namestatus1} </button>
      
        <button type="button" data-key2="" data-key="${activity2DocId}" data-extra-key="${i}" data-third-key="${firstDayOfMonth}" data-daysDocId-key="${daysDocId}" class="btn ${btnStatus2} answerBtn border afternonButton mt-1" style= "width: 155px; height:35px; white-space: nowrap;  overflow: hidden; text-overflow: ellipsis; text-align: center;" >${namestatus2}</button>
      
        <button type="button" data-key3="" data-key="${activity3DocId}" data-extra-key="${i}" data-third-key="${firstDayOfMonth}" data-daysDocId-key="${daysDocId}" class="btn ${btnStatus3} answerBtn border nightButton mt-1" style= "width: 155px; height:35px; white-space: nowrap;  overflow: hidden; text-overflow: ellipsis; text-align: center;">${namestatus3}</button>
      
        </div>
        
        </div>
      
        `;

      products.innerHTML += proCode;
    }
  }
}

$("body").on("click", ".morningButton", async function () {
  var key1 = $(this).data("key");
  extraKey = $(this).data("extra-key");
  var firstDayOfMonthActual = $(this).data("third-key");
  venueDocId = $(this).data("daysdocidKey");

  console.log(venueDocId + "knsadms");

  selectDate = getDateForDay(extraKey, firstDayOfMonthActual, year, month);

  getSaloonPrice();

  var saloonSessionArrayList = [];

  const getData = query(
    collection(db, "ProgramList"),
    where("selectDate", "==", selectDate)
  );
  const querySnapshot = await getDocs(getData);

  querySnapshot.forEach((doc) => {
    const docum = doc.id;

    const sesArray = doc.data().programSessionArrayList;

    while (sesArray.length > 0) {
      saloonSessionArrayList.push(sesArray.splice(0, 1)[0]);
    }
  });

  if (key1 == "") {
    programTableContainer.style.display = "none";
    addEditProgramContainer.style.display = "";
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
  } else {
    programTableContainer.style.display = "none";
    addEditProgramContainer.style.display = "";
    addEditButtonStatus = "Edit";
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
          const programDate = docSnap.data().selectDate;
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

          priceInfoText.innerHTML = totalPrice + " TL";
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
  var key2 = $(this).data("key");
  extraKey = $(this).data("extra-key");
  var firstDayOfMonthActual = $(this).data("third-key");
  venueDocId = $(this).data("daysdocidKey");

  selectDate = getDateForDay(extraKey, firstDayOfMonthActual, year, month);

  getSaloonPrice();

  var saloonSessionArrayList = [];

  const getData = query(
    collection(db, "ProgramList"),
    where("selectDate", "==", selectDate)
  );
  const querySnapshot = await getDocs(getData);

  querySnapshot.forEach((doc) => {
    const docum = doc.id;

    const sesArray = doc.data().programSessionArrayList;

    while (sesArray.length > 0) {
      saloonSessionArrayList.push(sesArray.splice(0, 1)[0]);
    }
  });

  if (key2 == "") {
    programTableContainer.style.display = "none";
    addEditProgramContainer.style.display = "";
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
  } else {
    programTableContainer.style.display = "none";
    addEditProgramContainer.style.display = "";
    addEditButtonStatus = "Edit";
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
          const programDate = docSnap.data().selectDate;
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

          priceInfoText.innerHTML = totalPrice + " TL";
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
  var key3 = $(this).data("key");
  extraKey = $(this).data("extra-key");
  var firstDayOfMonthActual = $(this).data("third-key");
  venueDocId = $(this).data("daysdocidKey");

  selectDate = getDateForDay(extraKey, firstDayOfMonthActual, year, month);

  getSaloonPrice();

  var saloonSessionArrayList = [];

  const getData = query(
    collection(db, "ProgramList"),
    where("selectDate", "==", selectDate)
  );
  const querySnapshot = await getDocs(getData);

  querySnapshot.forEach((doc) => {
    const docum = doc.id;

    const sesArray = doc.data().programSessionArrayList;

    while (sesArray.length > 0) {
      saloonSessionArrayList.push(sesArray.splice(0, 1)[0]);
    }
  });

  if (key3 == "") {
    programTableContainer.style.display = "none";
    addEditProgramContainer.style.display = "";
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
  } else {
    programTableContainer.style.display = "none";
    addEditProgramContainer.style.display = "";
    addEditButtonStatus = "Edit";
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
          const programDate = docSnap.data().selectDate;
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

          priceInfoText.innerHTML = totalPrice + " TL";
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
});

$("#programCancelButton").on("click", async function () {
  const docRef = doc(db, "ProgramList", updateDocId);

  await deleteDoc(docRef)
    .then(() => {
      console.log("Belge başarıyla silindi!");
    })
    .catch((error) => {
      console.error("Belge silinirken hata oluştu: ", error);
    });

  console.log(programSessionArrayList + " " + venueDocId);
  if (programSessionArrayList.includes("1")) {
    const docRefUpdate = doc(db, "VenueTracking", venueDocId);

    updateDoc(docRefUpdate, {
      activity1DocId: "0",
      activity1Name: "",
    })
      .then(() => {
        console.log("Belge başarıyla güncellendi!");
      })
      .catch((error) => {
        console.error("Belge güncellenirken hata oluştu: ", error);
      });
  }

  if (programSessionArrayList.includes("2")) {
    const docRefUpdate = doc(db, "VenueTracking", venueDocId);

    updateDoc(docRefUpdate, {
      activity2DocId: "0",
      activity2Name: "",
    })
      .then(() => {
        console.log("Belge başarıyla güncellendi!");
      })
      .catch((error) => {
        console.error("Belge güncellenirken hata oluştu: ", error);
      });
  }

  if (programSessionArrayList.includes("3")) {
    const docRefUpdate = doc(db, "VenueTracking", venueDocId);

    updateDoc(docRefUpdate, {
      activity3DocId: "0",
      activity3Name: "",
    })
      .then(() => {
        console.log("Belge başarıyla güncellendi!");
      })
      .catch((error) => {
        console.error("Belge güncellenirken hata oluştu: ", error);
      });
  }
});

$("#programAddEditSuccessButton").on("click", async function () {
  var manageAprovalRequest = $("#managerAprovalRequestCheck").is(":checked");

  console.log(addEditButtonStatus);

  if (addEditButtonStatus == "Add") {
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
        selectDate: selectDate,
        saloon: saloonCode,
        price: totalPrice,
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

      let dayId = `day${extraKey}`;
      const docRefVenue = await addDoc(collection(db, "VenueTracking"), {
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
      });

      alert("Etkinlik başalı bir şekilde eklendi");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } else if (addEditButtonStatus == "Edit") {
  }
});

$("#programAddEditCancelButton").on("click", function () {
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
  priceInfoText.innerHTML = 0 + " TL";
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

    console.log(priceArrayList);

    morningButton.classList.remove("btn-danger");
    morningButton.classList.add("btn-light");

    let total = priceArrayList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    totalPrice = total;

    priceInfoText.innerHTML = totalPrice + " TL";
  } else {
    programSessionArrayList.push("1");
    priceArrayList.push(morningPrice);

    console.log(priceArrayList);

    morningButton.classList.add("btn-danger");
    morningButton.classList.remove("btn-light");

    let total = priceArrayList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    totalPrice = total;

    priceInfoText.innerHTML = totalPrice + " TL";
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

    console.log(priceArrayList);

    afternoonButton.classList.remove("btn-danger");
    afternoonButton.classList.add("btn-light");

    let total = priceArrayList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    totalPrice = total;
    priceInfoText.innerHTML = totalPrice + " TL";
  } else {
    programSessionArrayList.push("2");
    priceArrayList.push(afternoonPrice);

    console.log(priceArrayList);
    afternoonButton.classList.add("btn-danger");
    afternoonButton.classList.remove("btn-light");

    let total = priceArrayList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    totalPrice = total;
    priceInfoText.innerHTML = totalPrice + " TL";
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

    console.log(priceArrayList);

    nightButton.classList.remove("btn-danger");
    nightButton.classList.add("btn-light");

    let total = priceArrayList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    totalPrice = total;
    priceInfoText.innerHTML = totalPrice + " TL";
  } else {
    programSessionArrayList.push("3");
    priceArrayList.push(nightPrice);

    console.log(priceArrayList);

    nightButton.classList.add("btn-danger");
    nightButton.classList.remove("btn-light");

    let total = priceArrayList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    totalPrice = total;
    priceInfoText.innerHTML = totalPrice + " TL";
  }
});

$("#allDayButton").on("click", function () {
  if (programSessionArrayList.length > 0) {
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

    totalPrice = total;
    priceInfoText.innerHTML = totalPrice + " TL";
  } else {
    programSessionArrayList.push("1");
    programSessionArrayList.push("2");
    programSessionArrayList.push("3");

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

    totalPrice = total;
    priceInfoText.innerHTML = totalPrice + " TL";
  }
});
