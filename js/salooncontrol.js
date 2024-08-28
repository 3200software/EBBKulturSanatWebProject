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
  orderBy,
  limit,
  getDocs,
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
const managerAprovalCheck = document.getElementById("managerAprovalCheck");

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

const today = new Date();

var year = today.getFullYear();
var month = today.getMonth();
var dayToday = today.getDate();

$("#monthFormSelect").val(month);
$("#yearFormSelect").val(year);

var addEditButtonStatus = "";

var saloonCode = "1";

var programSessionArrayList = [];

// 2025 Ocak ayının ilk gününü hesaplayalım (Ocak ayı 0. indekse sahiptir)

function getDaysInMonth(year, month) {
  const montsdate = new Date(year, month + 1, 0).getDate();

  console.log(montsdate + "  günn");
  // Bir sonraki ayın ilk gününden bir gün geriye giderek o ayın son gününü hesapla
  return montsdate;
}

function getFirstDayOfMonth(year, month) {
  // Belirtilen yıl ve ay için ilk günü hesapla
  const firstDay = new Date(year, month, 1).getDay();

  console.log("Ayın ilk günü:", firstDay);
  // Hafta günlerini isimlendirmek için bir dizi

  // İlk günün haftanın hangi gününe denk geldiğini göster
  return firstDay;
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
      where("years", "==", year),
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

      if (dayNum == dayToday) {
        console.log("looo" + dayId + " " + dayNum + " " + dayToday);
        $(`#${dayId}`).css("background-color", "#A2CDF2");
      }

      let proCode = `



      <div class="justify-content-between"> 
      
         <div class="text-bg-primary text-wrap m-1" id="customerAproveReasonForRejectionText" style="border-radius: 5px;">${
           dayNum + " " + monthName
         }</div>
      
         <div class="row m-1">
        
        <button type="button" data-key1="" data-key="${activity1DocId}"" class="btn ${btnStatus1} answerBtn border morningButton mt-1 p-1" style= "width: 155px; height:35px; white-space: nowrap;  overflow: hidden; text-overflow: ellipsis; text-align: center; " >${namestatus1} </button>
      
        <button type="button" data-key2="" data-key="${activity2DocId}"" class="btn ${btnStatus2} answerBtn border afternonButton mt-1" style= "width: 155px; height:35px; white-space: nowrap;  overflow: hidden; text-overflow: ellipsis; text-align: center;" >${namestatus2}</button>
      
        <button type="button" data-key3="" data-key="${activity3DocId}" class="btn ${btnStatus3}  answerBtn border nightButton mt-1" style= "width: 155px; height:35px; white-space: nowrap;  overflow: hidden; text-overflow: ellipsis; text-align: center;">${namestatus3}</button>
      
        </div>
        
        </div>
      
        `;

      products.innerHTML += proCode;
    }
  }
}

$("body").on("click", ".morningButton", async function () {
  var key1 = $(this).data("key");

  if (key1 == "") {
    programTableContainer.style.display = "none";
    addEditProgramContainer.style.display = "";
    addEditButtonStatus = "Add";
  } else {
    programTableContainer.style.display = "none";
    addEditProgramContainer.style.display = "";
    addEditButtonStatus = "Edit";
  }
});

$("body").on("click", ".afternonButton", async function () {
  var key2 = $(this).data("key");

  if (key2 == "") {
    programTableContainer.style.display = "none";
    addEditProgramContainer.style.display = "";
    addEditButtonStatus = "Add";
  } else {
    programTableContainer.style.display = "none";
    addEditProgramContainer.style.display = "";
    addEditButtonStatus = "Edit";
  }
});

$("body").on("click", ".nightButton", async function () {
  var key3 = $(this).data("key");

  if (key3 == "") {
    programTableContainer.style.display = "none";
    addEditProgramContainer.style.display = "";
    addEditButtonStatus = "Add";
  } else {
    programTableContainer.style.display = "none";
    addEditProgramContainer.style.display = "";
    addEditButtonStatus = "Edit";
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

  console.log(year + month + "  2");
  var firstDayOfMonth = getFirstDayOfMonth(year, month);
  // Ocak 0. İndexeSahiptir

  console.log(year + month + "  3");
  var daysInMonth = getDaysInMonth(year, month);

  console.log(daysInMonth + "    sdaks");

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
        where("years", "==", year),
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
          
          <button type="button" data-key1="" data-key="${activity1DocId}"" class="btn ${btnStatus1} answerBtn border morningButton mt-1 p-1" style= "width: 155px; height:35px; white-space: nowrap;  overflow: hidden; text-overflow: ellipsis; text-align: center;" >${namestatus1} </button>
        
          <button type="button" data-key2="" data-key="${activity2DocId}"" class="btn ${btnStatus2} answerBtn border afternonButton mt-1" style= "width: 155px; height:35px; white-space: nowrap;  overflow: hidden; text-overflow: ellipsis; text-align: center;" >${namestatus2}</button>
        
          <button type="button" data-key3="" data-key="${activity3DocId}" class="btn ${btnStatus3}  answerBtn border nightButton mt-1" style= "width: 155px; height:35px; white-space: nowrap;  overflow: hidden; text-overflow: ellipsis; text-align: center;">${namestatus3}</button>
        
          </div>
          
          </div>
        
          `;

        products.innerHTML += proCode;
      }
    }
  }
});

$("programAddEditSuccessButton").on("click", function () {
  var manageAprovalStatus = false;

  if ($("#managemanagerAprovalCheck").isChecked) {
    manageAprovalStatus = true;
    console.log("manageAproval " + manageAprovalStatus);
  } else {
    manageAprovalStatus = false;
    console.log("manageAproval " + manageAprovalStatus);
  }

  if (addEditButtonStatus == "Add") {
    try {
      const docRefProgram = addDoc(collection(db, "HomeBanner"), {
        programSessionArrayList: programSessionArrayList,
        reservationStatus: reservationStatusSelect.value,
        paymentInfo: paymentInfoSelect.value,
        managerAproval: manageAprovalStatus,
        category: programCategorySelect.value,
        corporation: programCorporationText.value,
        name: programNameText.value,
        description: programDescriptionText.value,
        contactNameSurname: programNameSurNameText.value,
        contactTelephone: programTelephonenumberText.value,
        contactEmail: programEmailText.value,
        notes: programNotesText.value,
        tecnicalNotes: programTecnicalNotesText.value,
      });

      console.log("Document written with ID: ", docRefProgram.id);

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
});
