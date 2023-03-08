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
let addEditActivityContainer = document.getElementById('addEditContainer');


const activityNameTextView = document.getElementById("activityName");
const activityCategoryFormSelect = document.getElementById("activityCategory");
const activityDescriptionTextView = document.getElementById("activityDescription");
const activityWideImageInput = document.getElementById("image1Input");
const activityProtectImageInput = document.getElementById("image2Input");
const activitySaloonFormSelect = document.getElementById("activitySaloon");
const activityOrganisationTextView = document.getElementById("activityorganisation");
const activityTelephoneTextView = document.getElementById("activityTelephonenumber");
const activityDateContainer = document.getElementById("datecontainer");
const activityBeginDateContainer = document.getElementById("beginDateContainer");
const activityEndDateContainer = document.getElementById("endDateContainer");
const activityDateInput = document.getElementById("activityDate");
const activityBeginDateInput = document.getElementById("activityBeginDate");
const activityEndDateInput = document.getElementById("activityEndDate");
const activityTicketFormSelect = document.getElementById("activityticket");
const ticketContainer1 = document.getElementById("ticketContainer1");
const activityTicketName1TextView = document.getElementById("ticketName1");
const activityTicketPrice1TextView = document.getElementById("ticketprice1");
const activtyTicketName2TextView = document.getElementById("ticketName2");
const activityTicketPrice2TextView = document.getElementById("ticketprice2");
const activityTicketName3TextView = document.getElementById("ticketName3");
const activityTicketPrice3TextView = document.getElementById("ticketprice3");
const activtyTicketName4TextView = document.getElementById("ticketName4");
const activityTicketPrice4TextView = document.getElementById("ticketprice4");
const activityProtocolCheckBox = document.getElementById("protocolCheckBox");
const activityProtocolSeatTextView = document.getElementById("protocolSeatText");


activityTicketFormSelect.style.display = "none";
activityTicketName1TextView.style.display = "none";
activityTicketPrice1TextView.style.display = "none"; 
activtyTicketName2TextView.style.display = "none";
activityTicketPrice2TextView.style.display = "none";
activityTicketName3TextView.style.display = "none";
activityTicketPrice3TextView.style.display = "none";
activtyTicketName4TextView.style.display = "none";
activityTicketPrice4TextView.style.display = "none";
activityProtocolSeatTextView.style.display = "none";
activityBeginDateContainer.style.display = "none";
activityEndDateContainer.style.display = "none";






const btnActivityAdd = document.getElementById("activityaddButton");
const btnLogout = document.getElementById("logoutButton");
const btnActivityAddCancel = document.getElementById("activityaddCancelButton");
const btnAddActivitySuccess = document.getElementById("activityaddSuccessButton");

var categoryValue = activityCategoryFormSelect.value;
var ticketValue = "0";
var ticketName1; var ticketprice1 = 0; 
var ticketName2; var ticketprice2 = 0; 
var ticketName3; var ticketprice3 = 0; 
var ticketName4; var ticketprice4 = 0; 
var ticketInfo;



activityCategoryFormSelect.onchange = function(){

    categoryValue = activityCategoryFormSelect.value;

    if (categoryValue === "1" || categoryValue === "2") {

    console.log(categoryValue);
    activityDateContainer.style.display = "";
    activityBeginDateContainer.style.display = "none";
    activityEndDateContainer.style.display = "none";
  
  } else if (categoryValue === "3") {
  
    activityDateContainer.style.display = "none";
    activityBeginDateContainer.style.display = "";
    activityEndDateContainer.style.display = "";
  
  }

};

activityTicketFormSelect.onchange = function(){

  ticketValue = activityTicketFormSelect.value;


   if (ticketValue === "1") {

    
    activityTicketName1TextView.style.display = "none";
    activityTicketPrice1TextView.style.display = "none"; 
    activtyTicketName2TextView.style.display = "none";
    activityTicketPrice2TextView.style.display = "none";
    activityTicketName3TextView.style.display = "none";
    activityTicketPrice3TextView.style.display = "none";
    activtyTicketName4TextView.style.display = "none";
    activityTicketPrice4TextView.style.display = "none";

    
  
  } else if (ticketValue === "2") {
  
    
    ticketContainer1.style.display = "none" 
    activityTicketName1TextView.style.display = "";
    activityTicketPrice1TextView.style.display = "";
    activityTicketName1TextView.value = "Bilet"
    activityTicketName1TextView.disabled = true; 
    activtyTicketName2TextView.style.display = "none";
    activityTicketPrice2TextView.style.display = "none";
    activityTicketName3TextView.style.display = "none";
    activityTicketPrice3TextView.style.display = "none";
    activtyTicketName4TextView.style.display = "none";
    activityTicketPrice4TextView.style.display = "none";

    
  } else if (ticketValue === "3") {
   
    activityTicketName1TextView.style.display = "";
    activityTicketPrice1TextView.style.display = ""; 
    activtyTicketName2TextView.style.display = "";
    activityTicketPrice2TextView.style.display = "";
    activityTicketName3TextView.style.display = "none";
    activityTicketPrice3TextView.style.display = "none";
    activtyTicketName4TextView.style.display = "none";
    activityTicketPrice4TextView.style.display = "none";

    activityTicketName1TextView.value =  "Tam Bilet";
    activityTicketName1TextView.disabled = true;

    activtyTicketName2TextView.value = "Öğrenci Bilet";
    activtyTicketName2TextView.disabled= true;

  } else if (ticketValue === "4") {
  
    activityTicketName1TextView.style.display = "";
    activityTicketPrice1TextView.style.display = ""; 
    activtyTicketName2TextView.style.display = "none";
    activityTicketPrice2TextView.style.display = "none";
    activityTicketName3TextView.style.display = "none";
    activityTicketPrice3TextView.style.display = "none";
    activtyTicketName4TextView.style.display = "none";
    activityTicketPrice4TextView.style.display = "none";

    activityTicketName1TextView.value = "";
    activityTicketName1TextView.disabled = false;
    activityTicketName1TextView.placeholder =  "Bilet Adı";
    
  } else if (ticketValue === "5") {
  
    activityTicketName1TextView.style.display = "";
    activityTicketPrice1TextView.style.display = ""; 
    activtyTicketName2TextView.style.display = "";
    activityTicketPrice2TextView.style.display = "";
    activityTicketName3TextView.style.display = "none";
    activityTicketPrice3TextView.style.display = "none";
    activtyTicketName4TextView.style.display = "none";
    activityTicketPrice4TextView.style.display = "none";

    activityTicketName1TextView.value = "";
    activityTicketName1TextView.disabled = false;

    activtyTicketName2TextView.value = "";
    activtyTicketName2TextView.disabled = false;

    activityTicketName1TextView.placeholder =  "Bilet Adı";
    activtyTicketName2TextView.placeholder =  "Bilet Adı";

    
  } else if (ticketValue === "6") {
  
    activityTicketName1TextView.style.display = "";
    activityTicketPrice1TextView.style.display = ""; 
    activtyTicketName2TextView.style.display = "";
    activityTicketPrice2TextView.style.display = "";
    activityTicketName3TextView.style.display = "";
    activityTicketPrice3TextView.style.display = "";
    activtyTicketName4TextView.style.display = "none";
    activityTicketPrice4TextView.style.display = "none";

    activityTicketName1TextView.value = "";
    activityTicketName1TextView.disabled = false;

    activtyTicketName2TextView.value = "";
    activtyTicketName2TextView.disabled = false;
    activityTicketName1TextView.placeholder =  "Bilet Adı";
    activtyTicketName2TextView.placeholder =  "Bilet Adı";
    activityTicketName3TextView.placeholder =  "Bilet Adı";
    
  } else if (ticketValue === "7") {
  
    activityTicketName1TextView.style.display = "";
    activityTicketPrice1TextView.style.display = ""; 
    activtyTicketName2TextView.style.display = "";
    activityTicketPrice2TextView.style.display = "";
    activityTicketName3TextView.style.display = "";
    activityTicketPrice3TextView.style.display = "";
    activtyTicketName4TextView.style.display = "";
    activityTicketPrice4TextView.style.display = "";

    activityTicketName1TextView.value = "";
    activityTicketName1TextView.disabled = false;

    activtyTicketName2TextView.value = "";
    activtyTicketName2TextView.disabled = false;
    activityTicketName1TextView.placeholder =  "Bilet Adı";
    activtyTicketName2TextView.placeholder =  "Bilet Adı";
    activityTicketName3TextView.placeholder =  "Bilet Adı";
    activtyTicketName4TextView.placeholder =  "Bilet Adı";

    activityTicketName1TextView.value = "";
    activityTicketPrice1TextView.value = ""; 
    activtyTicketName2TextView.value = "";
    activityTicketPrice2TextView.value = "";
    activityTicketName3TextView.value = "";
    activityTicketPrice3TextView.value = "";
    activtyTicketName4TextView.value = "";
    activityTicketPrice4TextView.value= "";
    


    
  } else if (ticketValue == "0") {

    activityTicketName1TextView.style.display = "none";
    activityTicketPrice1TextView.style.display = "none"; 
    activtyTicketName2TextView.style.display = "none";
    activityTicketPrice2TextView.style.display = "none";
    activityTicketName3TextView.style.display = "none";
    activityTicketPrice3TextView.style.display = "none";
    activtyTicketName4TextView.style.display = "none";
    activityTicketPrice4TextView.style.display = "none";



  }

};




activityProtocolCheckBox.addEventListener("change", (event) => {

  if (event.currentTarget.checked) {

  
    activityProtocolSeatTextView.style.display = "";


  } else {

    activityProtocolSeatTextView.style.display = "none";


  }



});


btnAddActivitySuccess.addEventListener("click",async ()=> {



  ticketName1 = activityTicketName1TextView.value; ticketprice1 = parseFloat(activityTicketPrice1TextView.value);  
  ticketName2 = activtyTicketName2TextView.value; ticketprice2 = parseFloat(activityTicketPrice2TextView.value);  
  ticketName3 = activityTicketName3TextView.value; ticketprice3 = parseFloat(activityTicketPrice3TextView.value);  
  ticketName4 = activtyTicketName4TextView.value ; ticketprice4 = parseFloat(activityTicketPrice4TextView.value); 


  console.log(activityDateInput.value)
 
  
  if (activityNameTextView.value == "" || categoryValue == "Kategori" || activitySaloonFormSelect.value == "Salon" || activityDescriptionTextView.value == "" || activityWideImageInput.value == "" || activityProtectImageInput.value == "" || activityOrganisationTextView.value == "" || activityTelephoneTextView.value == "") {

    alert("Lütfen bütün alanları doldurunuz!")

  } else {

    if (categoryValue == "1" && activityDateInput.value == ""){


      alert("Lütfen tarih giriniz!")

     
    } else if ( categoryValue == "2" && activityDateInput.value == "" ) {  

      alert("Lütfen tarih giriniz!")


    } else if (categoryValue == "3" && activityBeginDateInput.value == "" && activityEndDateInput.value == "") {


      alert("Lütfen başlangıç ve bitiş tarihlerini giriniz!")


    } else {

      if (ticketValue == "0") {

        alert("Lütfen bilet fiyatı seçiniz.")

      } else {

        if (ticketValue == "2" && ticketprice1 == "") {

          alert("Lütfen bilet fiyatı giriniz!")
            
        } else if (ticketValue == "3" && ticketprice1 == "" && ticketprice2 == "") {
        
          alert("Lütfen bilet fiyatlarını giriniz!")
          
        } else if (ticketValue == "4" && ticketName1 == "" && ticketprice1 == "") {
     
          alert("Lütfen bilet adı ve bilet fiyatı alanlarını boş bırakmayınız!")
      
        } else if (ticketValue == "5" && ticketName1 == "" && ticketprice1 == "" && ticketName2 == "" && ticketprice2 == "" ) {
        
          alert("Lütfen bilet adı ve bilet fiyatı alanlarını boş bırakmayınız!")
          
        } else if (ticketValue == "6" && ticketName1 == "" && ticketprice1 == "" && ticketName2 == "" && ticketprice2 == "" && ticketName3 == "" && ticketprice3 == "") {
      
          alert("Lütfen bilet adı ve bilet fiyatı alanlarını boş bırakmayınız!")
          
        } else if (ticketValue == "7" && ticketName1 == "" && ticketprice1 == "" && ticketName2 == "" && ticketprice2 == "" && ticketName3 == "" && ticketprice3 == "" && ticketName4 == "" && ticketprice4 == "") {

          alert("Lütfen bilet adı ve bilet fiyatı alanlarını boş bırakmayınız!")
          
        } else {

          if (activityProtocolCheckBox.checked == false) {

            var fileItem = activityWideImageInput.files[0];
          var fileItem2 = activityProtectImageInput.files[0];
        
         
          var filename = "image1" + Math.floor(Math.random() * (100000000 - 1000000)) + ".jpg";
          var filename2 = "image2" + Math.floor(Math.random() * (100000000 - 1000000))+ ".jpg";
        
          var image1url;
          var image2url;
        
          let storageRef1 = ref(storage, "images/"+filename);
          uploadBytes(storageRef1, fileItem).then((snapshot) =>{
        
          console.log("upload");
        
               getDownloadURL(ref(storage,"images/"+filename)).then((url)=> {
        
              image1url = url;  
              console.log(url);
        
              let storageRef2 = ref(storage, "images/"+filename2);
              uploadBytes(storageRef2, fileItem2).then((snapshot) =>{
            
                console.log("upload");
              
                     getDownloadURL(ref(storage,"images/"+filename2)).then(async (url)=> {
              
                    image2url = url;  
                    console.log(url);
                    console.log(categoryValue);
        
                   
                    var datetimestamp;
                    var beginDatetimeStamp;
                    var endDateTimeStamp;

                    var dateOld = new Date();
        
                    if (categoryValue == 1 || categoryValue == 2) {
        
                      var date = new Date(activityDateInput.value);

                      console.log(date)

                     datetimestamp = date;
                     beginDatetimeStamp = dateOld;
                     endDateTimeStamp = dateOld;
                     console.log(datetimestamp)
        
        
                    } else if (categoryValue == 3){
        
                      datetimestamp = dateOld;
                      var beginDate = new Date(activityBeginDateInput.value);
                      beginDatetimeStamp = beginDate;
                      var endDate = new Date(activityEndDateInput.value);
                      endDateTimeStamp = endDate;
                    
                    }
        
                    var activityLocationValue = activitySaloonFormSelect.value;
                    var activityLocationStr;
                    var activityLocationAdressDetail;
                    var activityLocationLatitude;
                    var activityLocationLongitude;
        
                    if (activityLocationValue == 1) {
        
                      activityLocationStr = "İbrahim Erkal Kültür Merkezi"
                      activityLocationAdressDetail = "Muratpaşa, Kuloğlu, Bahçe Sk. No:4, 25100 Yakutiye/Erzurum"
        
                      activityLocationLatitude = 39.90536
                      activityLocationLongitude = 41.27130
        
                     }

                     var activityCategoryValue =  activityCategoryFormSelect.value;
                     var activityCategoryStr;

                     if (activityCategoryValue == "1") {

                      activityCategoryStr = "Tiyatro"
                    
                    } else if (activityCategoryValue == "2") {

                      activityCategoryStr = "Konser"

                    } else if (activityCategoryValue == "3") {

                      activityCategoryStr = "Sergi"

                    }

        
                    try {


                        const docRef = await addDoc(collection(db,"Events"), {
        
                          activityName: activityNameTextView.value,
                          activityCategory: activityCategoryStr,
                          activityLocation: activityLocationStr,
        
                          activityDate: datetimestamp,
                          activityBeginDate: beginDatetimeStamp,
                          activityEndDate: endDateTimeStamp,
                          activityDescription: activityDescriptionTextView.value,
                          
                          activityImgUrl: image1url,
                          activityImgUr2: image2url,
                          
                          activityLocationAdressDetail: activityLocationAdressDetail,
                          activityLocationLatitude: activityLocationLatitude,
                          activityLocationLongitude: activityLocationLongitude,
                          
                          activityOrganization: activityOrganisationTextView.value,
                          activityTelephoneNumberTitle: activityTelephoneTextView.value,
        
                          activityTicketInfo: ticketValue,
                          activityTicketClass1Name: ticketName1,
                          activityTicketClass1Price: ticketprice1,
                          activityTicketClass2name: ticketName2,
                          activityTicketClass2Price: ticketprice2,
                          activityTicketClass3Name: ticketName3,
                          activityTicketClass3Price: ticketprice3,
                          activityTicketClass4Name: ticketName4,
                          activityTicketClass4Price: ticketprice4,
                          
                        });
        
                        if (activityLocationValue === "1") {
        
                          seatAddIbrahimErkal(1,"NA",docRef),seatAddIbrahimErkal(2,"NA",docRef),seatAddIbrahimErkal(3,"A1",docRef),seatAddIbrahimErkal(4,"A2",docRef),seatAddIbrahimErkal(5,"A3",docRef),seatAddIbrahimErkal(6,"A4",docRef),seatAddIbrahimErkal(7,"A5",docRef),seatAddIbrahimErkal(8,"A6",docRef),seatAddIbrahimErkal(9,"A7",docRef),seatAddIbrahimErkal(10,"A8",docRef),seatAddIbrahimErkal(11,"A9",docRef),seatAddIbrahimErkal(12,"A10",docRef),seatAddIbrahimErkal(13,"A11",docRef),seatAddIbrahimErkal(14,"A12",docRef),seatAddIbrahimErkal(15,"A13",docRef),seatAddIbrahimErkal(16,"A14",docRef),seatAddIbrahimErkal(17,"A15",docRef),seatAddIbrahimErkal(18,"A16",docRef),seatAddIbrahimErkal(19,"A17",docRef),seatAddIbrahimErkal(20,"A18",docRef),seatAddIbrahimErkal(21,"A19,",docRef),seatAddIbrahimErkal(22,"A20",docRef),seatAddIbrahimErkal(23,"A21",docRef),seatAddIbrahimErkal(24,"A22",docRef),seatAddIbrahimErkal(25,"A23",docRef),seatAddIbrahimErkal(26,"A24",docRef),seatAddIbrahimErkal(27,"NA",docRef),seatAddIbrahimErkal(28,"NA",docRef),seatAddIbrahimErkal(29,"NA",docRef)
                          seatAddIbrahimErkal(30,"NA",docRef),seatAddIbrahimErkal(31,"NA",docRef),seatAddIbrahimErkal(32,"B1",docRef),seatAddIbrahimErkal(33,"B2",docRef),seatAddIbrahimErkal(34,"B3",docRef),seatAddIbrahimErkal(35,"B4",docRef),seatAddIbrahimErkal(36,"B5",docRef),seatAddIbrahimErkal(37,"B6",docRef),seatAddIbrahimErkal(38,"B7",docRef),seatAddIbrahimErkal(39,"B8",docRef),seatAddIbrahimErkal(40,"B9",docRef),seatAddIbrahimErkal(41,"B10",docRef),seatAddIbrahimErkal(42,"B11",docRef),seatAddIbrahimErkal(43,"B12",docRef),seatAddIbrahimErkal(44,"B13",docRef),seatAddIbrahimErkal(45,"B14",docRef),seatAddIbrahimErkal(46,"B15",docRef),seatAddIbrahimErkal(47,"B16",docRef),seatAddIbrahimErkal(48,"B17",docRef),seatAddIbrahimErkal(49,"B18",docRef),seatAddIbrahimErkal(50,"B19,",docRef),seatAddIbrahimErkal(51,"B20",docRef),seatAddIbrahimErkal(52,"B21",docRef),seatAddIbrahimErkal(53,"B22",docRef),seatAddIbrahimErkal(54,"B23",docRef),seatAddIbrahimErkal(55,"B24",docRef),seatAddIbrahimErkal(56,"NA",docRef),seatAddIbrahimErkal(57,"NA",docRef),seatAddIbrahimErkal(58,"NA",docRef)
                          seatAddIbrahimErkal(59,"NA",docRef),seatAddIbrahimErkal(60,"NA",docRef),seatAddIbrahimErkal(61,"C1",docRef),seatAddIbrahimErkal(62,"C2",docRef),seatAddIbrahimErkal(63,"C3",docRef),seatAddIbrahimErkal(64,"C4",docRef),seatAddIbrahimErkal(65,"C5",docRef),seatAddIbrahimErkal(66,"C6",docRef),seatAddIbrahimErkal(67,"C7",docRef),seatAddIbrahimErkal(68,"C8",docRef),seatAddIbrahimErkal(69,"C9",docRef),seatAddIbrahimErkal(70,"C10",docRef),seatAddIbrahimErkal(71,"C11",docRef),seatAddIbrahimErkal(72,"C12",docRef),seatAddIbrahimErkal(73,"C13",docRef),seatAddIbrahimErkal(74,"C14",docRef),seatAddIbrahimErkal(75,"C15",docRef),seatAddIbrahimErkal(76,"C16",docRef),seatAddIbrahimErkal(77,"C17",docRef),seatAddIbrahimErkal(78,"C18",docRef),seatAddIbrahimErkal(79,"C19,",docRef),seatAddIbrahimErkal(80,"C20",docRef),seatAddIbrahimErkal(81,"C21",docRef),seatAddIbrahimErkal(82,"C22",docRef),seatAddIbrahimErkal(83,"C23",docRef),seatAddIbrahimErkal(84,"C24",docRef),seatAddIbrahimErkal(85,"NA",docRef),seatAddIbrahimErkal(86,"NA",docRef),seatAddIbrahimErkal(87,"NA",docRef)
                          seatAddIbrahimErkal(88,"NA",docRef),seatAddIbrahimErkal(89,"NA",docRef),seatAddIbrahimErkal(90,"D1",docRef),seatAddIbrahimErkal(91,"D2",docRef),seatAddIbrahimErkal(92,"D3",docRef),seatAddIbrahimErkal(93,"D4",docRef),seatAddIbrahimErkal(94,"D5",docRef),seatAddIbrahimErkal(95,"D6",docRef),seatAddIbrahimErkal(96,"D7",docRef),seatAddIbrahimErkal(97,"D8",docRef),seatAddIbrahimErkal(98,"D9",docRef),seatAddIbrahimErkal(99,"D10",docRef),seatAddIbrahimErkal(100,"D11",docRef),seatAddIbrahimErkal(101,"D12",docRef),seatAddIbrahimErkal(102,"D13",docRef),seatAddIbrahimErkal(103,"D14",docRef),seatAddIbrahimErkal(104,"D15",docRef),seatAddIbrahimErkal(105,"D16",docRef),seatAddIbrahimErkal(106,"D17",docRef),seatAddIbrahimErkal(107,"D18",docRef),seatAddIbrahimErkal(108,"D19,",docRef),seatAddIbrahimErkal(109,"D20",docRef),seatAddIbrahimErkal(110,"D21",docRef),seatAddIbrahimErkal(111,"D22",docRef),seatAddIbrahimErkal(112,"D23",docRef),seatAddIbrahimErkal(113,"D24",docRef),seatAddIbrahimErkal(114,"NA",docRef),seatAddIbrahimErkal(115,"NA",docRef),seatAddIbrahimErkal(116,"NA",docRef)
                          seatAddIbrahimErkal(117,"NA",docRef),seatAddIbrahimErkal(118,"NA",docRef),seatAddIbrahimErkal(119,"E1",docRef),seatAddIbrahimErkal(120,"E2",docRef),seatAddIbrahimErkal(121,"E3",docRef),seatAddIbrahimErkal(122,"E4",docRef),seatAddIbrahimErkal(123,"E5",docRef),seatAddIbrahimErkal(124,"E6",docRef),seatAddIbrahimErkal(125,"E7",docRef),seatAddIbrahimErkal(126,"E8",docRef),seatAddIbrahimErkal(127,"E9",docRef),seatAddIbrahimErkal(128,"E10",docRef),seatAddIbrahimErkal(129,"E11",docRef),seatAddIbrahimErkal(130,"E12",docRef),seatAddIbrahimErkal(131,"E13",docRef),seatAddIbrahimErkal(132,"E14",docRef),seatAddIbrahimErkal(133,"E15",docRef),seatAddIbrahimErkal(134,"E16",docRef),seatAddIbrahimErkal(135,"E17",docRef),seatAddIbrahimErkal(136,"E18",docRef),seatAddIbrahimErkal(137,"E19",docRef),seatAddIbrahimErkal(138,"E20",docRef),seatAddIbrahimErkal(139,"E21",docRef),seatAddIbrahimErkal(140,"E22",docRef),seatAddIbrahimErkal(141,"E23",docRef),seatAddIbrahimErkal(142,"E24",docRef),seatAddIbrahimErkal(143,"NA",docRef),seatAddIbrahimErkal(144,"NA",docRef),seatAddIbrahimErkal(145,"NA",docRef)
                          seatAddIbrahimErkal(146,"NA",docRef),seatAddIbrahimErkal(147,"NA",docRef),seatAddIbrahimErkal(148,"F1",docRef),seatAddIbrahimErkal(149,"F2",docRef),seatAddIbrahimErkal(150,"F3",docRef),seatAddIbrahimErkal(151,"F4",docRef),seatAddIbrahimErkal(152,"F5",docRef),seatAddIbrahimErkal(153,"F6",docRef),seatAddIbrahimErkal(154,"F7",docRef),seatAddIbrahimErkal(155,"F8",docRef),seatAddIbrahimErkal(156,"F9",docRef),seatAddIbrahimErkal(157,"F10",docRef),seatAddIbrahimErkal(158,"F11",docRef),seatAddIbrahimErkal(159,"F12",docRef),seatAddIbrahimErkal(160,"F13",docRef),seatAddIbrahimErkal(161,"F14",docRef),seatAddIbrahimErkal(162,"F15",docRef),seatAddIbrahimErkal(163,"F16",docRef),seatAddIbrahimErkal(164,"F17",docRef),seatAddIbrahimErkal(165,"F18",docRef),seatAddIbrahimErkal(166,"F19",docRef),seatAddIbrahimErkal(167,"E20",docRef),seatAddIbrahimErkal(168,"F21",docRef),seatAddIbrahimErkal(169,"F22",docRef),seatAddIbrahimErkal(170,"F23",docRef),seatAddIbrahimErkal(171,"F24",docRef),seatAddIbrahimErkal(172,"NA",docRef),seatAddIbrahimErkal(173,"NA",docRef),seatAddIbrahimErkal(174,"NA",docRef)
                          seatAddIbrahimErkal(175,"NA",docRef),seatAddIbrahimErkal(176,"NA",docRef),seatAddIbrahimErkal(177,"G1",docRef),seatAddIbrahimErkal(178,"G2",docRef),seatAddIbrahimErkal(179,"G3",docRef),seatAddIbrahimErkal(180,"G4",docRef),seatAddIbrahimErkal(181,"G5",docRef),seatAddIbrahimErkal(182,"G6",docRef),seatAddIbrahimErkal(183,"G7",docRef),seatAddIbrahimErkal(184,"G8",docRef),seatAddIbrahimErkal(185,"G9",docRef),seatAddIbrahimErkal(186,"G10",docRef),seatAddIbrahimErkal(187,"G11",docRef),seatAddIbrahimErkal(188,"G12",docRef),seatAddIbrahimErkal(189,"G13",docRef),seatAddIbrahimErkal(190,"G14",docRef),seatAddIbrahimErkal(191,"G15",docRef),seatAddIbrahimErkal(192,"G16",docRef),seatAddIbrahimErkal(193,"G17",docRef),seatAddIbrahimErkal(194,"G18",docRef),seatAddIbrahimErkal(195,"G19",docRef),seatAddIbrahimErkal(196,"G20",docRef),seatAddIbrahimErkal(197,"G21",docRef),seatAddIbrahimErkal(198,"G22",docRef),seatAddIbrahimErkal(199,"G23",docRef),seatAddIbrahimErkal(200,"G24",docRef),seatAddIbrahimErkal(201,"NA",docRef),seatAddIbrahimErkal(202,"NA",docRef),seatAddIbrahimErkal(203,"NA",docRef)
                          seatAddIbrahimErkal(204,"NA",docRef),seatAddIbrahimErkal(205,"NA",docRef),seatAddIbrahimErkal(206,"H1",docRef),seatAddIbrahimErkal(207,"H2",docRef),seatAddIbrahimErkal(208,"H3",docRef),seatAddIbrahimErkal(209,"H4",docRef),seatAddIbrahimErkal(210,"H5",docRef),seatAddIbrahimErkal(211,"H6",docRef),seatAddIbrahimErkal(212,"H7",docRef),seatAddIbrahimErkal(213,"H8",docRef),seatAddIbrahimErkal(214,"H9",docRef),seatAddIbrahimErkal(215,"H10",docRef),seatAddIbrahimErkal(216,"H11",docRef),seatAddIbrahimErkal(217,"H12",docRef),seatAddIbrahimErkal(218,"H13",docRef),seatAddIbrahimErkal(219,"H14",docRef),seatAddIbrahimErkal(220,"H15",docRef),seatAddIbrahimErkal(221,"H16",docRef),seatAddIbrahimErkal(222,"H17",docRef),seatAddIbrahimErkal(223,"H18",docRef),seatAddIbrahimErkal(224,"H19",docRef),seatAddIbrahimErkal(225,"H20",docRef),seatAddIbrahimErkal(226,"H21",docRef),seatAddIbrahimErkal(227,"H22",docRef),seatAddIbrahimErkal(228,"H23",docRef),seatAddIbrahimErkal(229,"H24",docRef),seatAddIbrahimErkal(230,"NA",docRef),seatAddIbrahimErkal(231,"NA",docRef),seatAddIbrahimErkal(232,"NA",docRef)
                          seatAddIbrahimErkal(233,"NA",docRef),seatAddIbrahimErkal(234,"NA",docRef),seatAddIbrahimErkal(235,"I1",docRef),seatAddIbrahimErkal(236,"I2",docRef),seatAddIbrahimErkal(237,"I3",docRef),seatAddIbrahimErkal(238,"I4",docRef),seatAddIbrahimErkal(239,"I5",docRef),seatAddIbrahimErkal(240,"I6",docRef),seatAddIbrahimErkal(241,"I7",docRef),seatAddIbrahimErkal(242,"I8",docRef),seatAddIbrahimErkal(243,"I9",docRef),seatAddIbrahimErkal(244,"I10",docRef),seatAddIbrahimErkal(245,"I11",docRef),seatAddIbrahimErkal(246,"I12",docRef),seatAddIbrahimErkal(247,"I13",docRef),seatAddIbrahimErkal(248,"I14",docRef),seatAddIbrahimErkal(249,"I15",docRef),seatAddIbrahimErkal(250,"I16",docRef),seatAddIbrahimErkal(251,"I17",docRef),seatAddIbrahimErkal(252,"I18",docRef),seatAddIbrahimErkal(253,"I19",docRef),seatAddIbrahimErkal(254,"I20",docRef),seatAddIbrahimErkal(255,"I21",docRef),seatAddIbrahimErkal(256,"I22",docRef),seatAddIbrahimErkal(257,"I23",docRef),seatAddIbrahimErkal(258,"I24",docRef),seatAddIbrahimErkal(259,"NA",docRef),seatAddIbrahimErkal(260,"NA",docRef),seatAddIbrahimErkal(261,"NA",docRef)
                          seatAddIbrahimErkal(262,"NA",docRef),seatAddIbrahimErkal(263,"NA",docRef),seatAddIbrahimErkal(264,"J1",docRef),seatAddIbrahimErkal(265,"J2",docRef),seatAddIbrahimErkal(266,"J3",docRef),seatAddIbrahimErkal(267,"J4",docRef),seatAddIbrahimErkal(268,"J5",docRef),seatAddIbrahimErkal(269,"J6",docRef),seatAddIbrahimErkal(270,"J7",docRef),seatAddIbrahimErkal(271,"J8",docRef),seatAddIbrahimErkal(272,"J9",docRef),seatAddIbrahimErkal(273,"J10",docRef),seatAddIbrahimErkal(274,"J11",docRef),seatAddIbrahimErkal(275,"J12",docRef),seatAddIbrahimErkal(276,"J13",docRef),seatAddIbrahimErkal(277,"J14",docRef),seatAddIbrahimErkal(278,"J15",docRef),seatAddIbrahimErkal(279,"J16",docRef),seatAddIbrahimErkal(280,"J17",docRef),seatAddIbrahimErkal(281,"J18",docRef),seatAddIbrahimErkal(282,"J19",docRef),seatAddIbrahimErkal(283,"J20",docRef),seatAddIbrahimErkal(284,"J21",docRef),seatAddIbrahimErkal(285,"J22",docRef),seatAddIbrahimErkal(286,"J23",docRef),seatAddIbrahimErkal(287,"J24",docRef),seatAddIbrahimErkal(288,"NA",docRef),seatAddIbrahimErkal(289,"NA",docRef),seatAddIbrahimErkal(290,"NA",docRef)
                          seatAddIbrahimErkal(291,"NA",docRef),seatAddIbrahimErkal(292,"NA",docRef),seatAddIbrahimErkal(293,"NA",docRef),seatAddIbrahimErkal(294,"NA",docRef),seatAddIbrahimErkal(295,"NA",docRef),seatAddIbrahimErkal(296,"NA",docRef),seatAddIbrahimErkal(297,"NA",docRef),seatAddIbrahimErkal(298,"NA",docRef),seatAddIbrahimErkal(299,"NA",docRef),seatAddIbrahimErkal(300,"NA",docRef),seatAddIbrahimErkal(301,"NA",docRef),seatAddIbrahimErkal(302,"NA",docRef),seatAddIbrahimErkal(303,"NA",docRef),seatAddIbrahimErkal(304,"NA",docRef),seatAddIbrahimErkal(305,"NA",docRef),seatAddIbrahimErkal(306,"NA",docRef),seatAddIbrahimErkal(307,"NA",docRef),seatAddIbrahimErkal(308,"NA",docRef),seatAddIbrahimErkal(309,"NA",docRef),seatAddIbrahimErkal(310,"NA",docRef),seatAddIbrahimErkal(311,"NA",docRef),seatAddIbrahimErkal(312,"NA",docRef),seatAddIbrahimErkal(313,"NA",docRef),seatAddIbrahimErkal(314,"NA",docRef),seatAddIbrahimErkal(315,"NA",docRef),seatAddIbrahimErkal(316,"NA",docRef),seatAddIbrahimErkal(317,"NA",docRef),seatAddIbrahimErkal(318,"NA",docRef),seatAddIbrahimErkal(319,"NA",docRef)  
                          seatAddIbrahimErkal(320,"NA",docRef),seatAddIbrahimErkal(321,"NA",docRef),seatAddIbrahimErkal(322,"K1",docRef),seatAddIbrahimErkal(323,"K2",docRef),seatAddIbrahimErkal(324,"K3",docRef),seatAddIbrahimErkal(325,"K4",docRef),seatAddIbrahimErkal(326,"K5",docRef),seatAddIbrahimErkal(327,"K6",docRef),seatAddIbrahimErkal(328,"K7",docRef),seatAddIbrahimErkal(329,"K8",docRef),seatAddIbrahimErkal(330,"K9",docRef),seatAddIbrahimErkal(331,"K10",docRef),seatAddIbrahimErkal(332,"K11",docRef),seatAddIbrahimErkal(333,"NA",docRef),seatAddIbrahimErkal(334,"NA",docRef),seatAddIbrahimErkal(335,"NA",docRef),seatAddIbrahimErkal(336,"K12",docRef),seatAddIbrahimErkal(337,"K13",docRef),seatAddIbrahimErkal(338,"K14",docRef),seatAddIbrahimErkal(339,"K15",docRef),seatAddIbrahimErkal(340,"K16",docRef),seatAddIbrahimErkal(341,"K17",docRef),seatAddIbrahimErkal(342,"K18",docRef),seatAddIbrahimErkal(343,"K19",docRef),seatAddIbrahimErkal(344,"K20",docRef),seatAddIbrahimErkal(345,"K21",docRef),seatAddIbrahimErkal(346,"NA",docRef),seatAddIbrahimErkal(347,"NA",docRef),seatAddIbrahimErkal(348,"NA",docRef)
                          seatAddIbrahimErkal(349,"NA",docRef),seatAddIbrahimErkal(350,"NA",docRef),seatAddIbrahimErkal(351,"L1",docRef),seatAddIbrahimErkal(352,"L2",docRef),seatAddIbrahimErkal(353,"L3",docRef),seatAddIbrahimErkal(354,"L4",docRef),seatAddIbrahimErkal(355,"L5",docRef),seatAddIbrahimErkal(356,"L6",docRef),seatAddIbrahimErkal(357,"L7",docRef),seatAddIbrahimErkal(358,"L8",docRef),seatAddIbrahimErkal(359,"L9",docRef),seatAddIbrahimErkal(360,"L10",docRef),seatAddIbrahimErkal(361,"L11",docRef),seatAddIbrahimErkal(362,"NA",docRef),seatAddIbrahimErkal(363,"NA",docRef),seatAddIbrahimErkal(364,"NA",docRef),seatAddIbrahimErkal(365,"L12",docRef),seatAddIbrahimErkal(366,"L13",docRef),seatAddIbrahimErkal(367,"L14",docRef),seatAddIbrahimErkal(368,"L15",docRef),seatAddIbrahimErkal(369,"L16",docRef),seatAddIbrahimErkal(370,"L17",docRef),seatAddIbrahimErkal(371,"L18",docRef),seatAddIbrahimErkal(372,"L19",docRef),seatAddIbrahimErkal(373,"L20",docRef),seatAddIbrahimErkal(374,",L21",docRef),seatAddIbrahimErkal(375,"NA",docRef),seatAddIbrahimErkal(376,"NA",docRef),seatAddIbrahimErkal(377,"NA",docRef)
                          seatAddIbrahimErkal(378,"NA",docRef),seatAddIbrahimErkal(379,"NA",docRef),seatAddIbrahimErkal(380,"M1",docRef),seatAddIbrahimErkal(381,"M2",docRef),seatAddIbrahimErkal(382,"M3",docRef),seatAddIbrahimErkal(383,"M4",docRef),seatAddIbrahimErkal(384,"M5",docRef),seatAddIbrahimErkal(385,"M6",docRef),seatAddIbrahimErkal(386,"M7",docRef),seatAddIbrahimErkal(387,"M8",docRef),seatAddIbrahimErkal(388,"M9",docRef),seatAddIbrahimErkal(389,"M10",docRef),seatAddIbrahimErkal(390,"M11",docRef),seatAddIbrahimErkal(391,"NA",docRef),seatAddIbrahimErkal(392,"NA",docRef),seatAddIbrahimErkal(393,"NA",docRef),seatAddIbrahimErkal(394,"M12",docRef),seatAddIbrahimErkal(395,"M13",docRef),seatAddIbrahimErkal(396,"M14",docRef),seatAddIbrahimErkal(397,"M15",docRef),seatAddIbrahimErkal(398,"M16",docRef),seatAddIbrahimErkal(399,"M17",docRef),seatAddIbrahimErkal(400,"M18",docRef),seatAddIbrahimErkal(401,"M19",docRef),seatAddIbrahimErkal(402,"M20",docRef),seatAddIbrahimErkal(403,"M21",docRef),seatAddIbrahimErkal(404,"NA",docRef),seatAddIbrahimErkal(405,"NA",docRef),seatAddIbrahimErkal(406,"NA",docRef)
                          seatAddIbrahimErkal(407,"NA",docRef),seatAddIbrahimErkal(408,"NA",docRef),seatAddIbrahimErkal(409,"N1",docRef),seatAddIbrahimErkal(410,"N2",docRef),seatAddIbrahimErkal(411,"N3",docRef),seatAddIbrahimErkal(412,"N4",docRef),seatAddIbrahimErkal(413,"N5",docRef),seatAddIbrahimErkal(414,"N6",docRef),seatAddIbrahimErkal(415,"N7",docRef),seatAddIbrahimErkal(416,"N8",docRef),seatAddIbrahimErkal(417,"N9",docRef),seatAddIbrahimErkal(418,"N10",docRef),seatAddIbrahimErkal(419,"N11",docRef),seatAddIbrahimErkal(420,"NA",docRef),seatAddIbrahimErkal(421,"NA",docRef),seatAddIbrahimErkal(422,"NA",docRef),seatAddIbrahimErkal(423,"N12",docRef),seatAddIbrahimErkal(424,"N13",docRef),seatAddIbrahimErkal(425,"N14",docRef),seatAddIbrahimErkal(426,"N15",docRef),seatAddIbrahimErkal(427,"N16",docRef),seatAddIbrahimErkal(428,"N17",docRef),seatAddIbrahimErkal(429,"N18",docRef),seatAddIbrahimErkal(430,"N19",docRef),seatAddIbrahimErkal(431,"N20",docRef),seatAddIbrahimErkal(432,"N21",docRef),seatAddIbrahimErkal(433,"NA",docRef),seatAddIbrahimErkal(434,"NA",docRef),seatAddIbrahimErkal(435,"NA",docRef)
                          seatAddIbrahimErkal(436,"NA",docRef),seatAddIbrahimErkal(437,"NA",docRef),seatAddIbrahimErkal(438,"O1",docRef),seatAddIbrahimErkal(439,"O2",docRef),seatAddIbrahimErkal(440,"O3",docRef),seatAddIbrahimErkal(441,"O4",docRef),seatAddIbrahimErkal(442,"O5",docRef),seatAddIbrahimErkal(443,"O6",docRef),seatAddIbrahimErkal(444,"O7",docRef),seatAddIbrahimErkal(445,"O8",docRef),seatAddIbrahimErkal(446,"O9",docRef),seatAddIbrahimErkal(447,"O10",docRef),seatAddIbrahimErkal(448,"O11",docRef),seatAddIbrahimErkal(449,"NA",docRef),seatAddIbrahimErkal(450,"NA",docRef),seatAddIbrahimErkal(451,"NA",docRef),seatAddIbrahimErkal(452,"O12",docRef),seatAddIbrahimErkal(453,"O13",docRef),seatAddIbrahimErkal(454,"O14",docRef),seatAddIbrahimErkal(455,"O15",docRef),seatAddIbrahimErkal(456,"O16",docRef),seatAddIbrahimErkal(457,"O17",docRef),seatAddIbrahimErkal(458,"O18",docRef),seatAddIbrahimErkal(459,"O19",docRef),seatAddIbrahimErkal(460,"O20",docRef),seatAddIbrahimErkal(461,"O21",docRef),seatAddIbrahimErkal(462,"NA",docRef),seatAddIbrahimErkal(463,"NA",docRef),seatAddIbrahimErkal(464,"NA",docRef)
                          seatAddIbrahimErkal(465,"NA",docRef),seatAddIbrahimErkal(466,"NA",docRef),seatAddIbrahimErkal(467,"P1",docRef),seatAddIbrahimErkal(468,"P2",docRef),seatAddIbrahimErkal(469,"P3",docRef),seatAddIbrahimErkal(470,"P4",docRef),seatAddIbrahimErkal(471,"P5",docRef),seatAddIbrahimErkal(472,"P6",docRef),seatAddIbrahimErkal(473,"P7",docRef),seatAddIbrahimErkal(474,"P8",docRef),seatAddIbrahimErkal(475,"P9",docRef),seatAddIbrahimErkal(476,"P10",docRef),seatAddIbrahimErkal(477,"P11",docRef),seatAddIbrahimErkal(478,"NA",docRef),seatAddIbrahimErkal(479,"NA",docRef),seatAddIbrahimErkal(480,"NA",docRef),seatAddIbrahimErkal(481,"P12",docRef),seatAddIbrahimErkal(482,"P13",docRef),seatAddIbrahimErkal(483,"P14",docRef),seatAddIbrahimErkal(484,"P15",docRef),seatAddIbrahimErkal(485,"P16",docRef),seatAddIbrahimErkal(486,"P17",docRef),seatAddIbrahimErkal(487,"P18",docRef),seatAddIbrahimErkal(488,"P19",docRef),seatAddIbrahimErkal(489,"P20",docRef),seatAddIbrahimErkal(490,"P21",docRef),seatAddIbrahimErkal(491,"NA",docRef),seatAddIbrahimErkal(492,"NA",docRef),seatAddIbrahimErkal(493,"NA",docRef)
                          seatAddIbrahimErkal(494,"NA",docRef),seatAddIbrahimErkal(495,"NA",docRef),seatAddIbrahimErkal(496,"R1",docRef),seatAddIbrahimErkal(497,"R2",docRef),seatAddIbrahimErkal(498,"R3",docRef),seatAddIbrahimErkal(499,"R4",docRef),seatAddIbrahimErkal(500,"R5",docRef),seatAddIbrahimErkal(501,"R6",docRef),seatAddIbrahimErkal(502,"R7",docRef),seatAddIbrahimErkal(503,"R8",docRef),seatAddIbrahimErkal(504,"R9",docRef),seatAddIbrahimErkal(505,"R10",docRef),seatAddIbrahimErkal(506,"R11",docRef),seatAddIbrahimErkal(507,"NA",docRef),seatAddIbrahimErkal(508,"NA",docRef),seatAddIbrahimErkal(509,"NA",docRef),seatAddIbrahimErkal(510,"R12",docRef),seatAddIbrahimErkal(511,"R13",docRef),seatAddIbrahimErkal(512,"R14",docRef),seatAddIbrahimErkal(513,"R15",docRef),seatAddIbrahimErkal(514,"R16",docRef),seatAddIbrahimErkal(515,"R17",docRef),seatAddIbrahimErkal(516,"R18",docRef),seatAddIbrahimErkal(517,"R19",docRef),seatAddIbrahimErkal(518,"R20",docRef),seatAddIbrahimErkal(519,"R21",docRef),seatAddIbrahimErkal(520,"NA",docRef),seatAddIbrahimErkal(521,"NA",docRef),seatAddIbrahimErkal(522,"NA",docRef)
                          seatAddIbrahimErkal(523,"NA",docRef),seatAddIbrahimErkal(524,"NA",docRef),seatAddIbrahimErkal(525,"S1",docRef),seatAddIbrahimErkal(526,"S2",docRef),seatAddIbrahimErkal(527,"S3",docRef),seatAddIbrahimErkal(528,"S4",docRef),seatAddIbrahimErkal(529,"S5",docRef),seatAddIbrahimErkal(530,"S6",docRef),seatAddIbrahimErkal(531,"S7",docRef),seatAddIbrahimErkal(532,"S8",docRef),seatAddIbrahimErkal(533,"S9",docRef),seatAddIbrahimErkal(534,"S10",docRef),seatAddIbrahimErkal(535,"S11",docRef),seatAddIbrahimErkal(536,"NA",docRef),seatAddIbrahimErkal(537,"NA",docRef),seatAddIbrahimErkal(538,"NA",docRef),seatAddIbrahimErkal(539,"S12",docRef),seatAddIbrahimErkal(540,"S13",docRef),seatAddIbrahimErkal(541,"S14",docRef),seatAddIbrahimErkal(542,"S15",docRef),seatAddIbrahimErkal(543,"S16",docRef),seatAddIbrahimErkal(544,"S17",docRef),seatAddIbrahimErkal(545,"S18",docRef),seatAddIbrahimErkal(546,"S19",docRef),seatAddIbrahimErkal(547,"S20",docRef),seatAddIbrahimErkal(548,"S21",docRef),seatAddIbrahimErkal(549,"NA",docRef),seatAddIbrahimErkal(550,"NA",docRef),seatAddIbrahimErkal(551,"NA",docRef)
                          seatAddIbrahimErkal(552,"NA",docRef),seatAddIbrahimErkal(553,"NA",docRef),seatAddIbrahimErkal(554,"NA",docRef),seatAddIbrahimErkal(555,"NA",docRef),seatAddIbrahimErkal(556,"NA",docRef),seatAddIbrahimErkal(557,"NA",docRef),seatAddIbrahimErkal(558,"NA",docRef),seatAddIbrahimErkal(559,"NA",docRef),seatAddIbrahimErkal(560,"NA",docRef),seatAddIbrahimErkal(561,"NA",docRef),seatAddIbrahimErkal(562,"NA",docRef),seatAddIbrahimErkal(563,"NA",docRef),seatAddIbrahimErkal(564,"NA",docRef),seatAddIbrahimErkal(565,"NA",docRef),seatAddIbrahimErkal(566,"NA",docRef),seatAddIbrahimErkal(567,"NA",docRef),seatAddIbrahimErkal(568,"NA",docRef),seatAddIbrahimErkal(569,"NA",docRef),seatAddIbrahimErkal(570,"NA",docRef),seatAddIbrahimErkal(571,"NA",docRef),seatAddIbrahimErkal(572,"NA",docRef),seatAddIbrahimErkal(573,"NA",docRef),seatAddIbrahimErkal(574,"NA",docRef),seatAddIbrahimErkal(575,"NA",docRef),seatAddIbrahimErkal(576,"NA",docRef),seatAddIbrahimErkal(577,"NA",docRef),seatAddIbrahimErkal(578,"NA",docRef),seatAddIbrahimErkal(579,"NA",docRef),seatAddIbrahimErkal(580,"NA",docRef)  
                          seatAddIbrahimErkal(581,"NA",docRef),seatAddIbrahimErkal(582,"T1",docRef),seatAddIbrahimErkal(583,"T2",docRef),seatAddIbrahimErkal(584,"T3",docRef),seatAddIbrahimErkal(585,"T4",docRef),seatAddIbrahimErkal(586,"T5",docRef),seatAddIbrahimErkal(587,"T6",docRef),seatAddIbrahimErkal(588,"T7",docRef),seatAddIbrahimErkal(589,"T8",docRef),seatAddIbrahimErkal(590,"T9",docRef),seatAddIbrahimErkal(591,"T10",docRef),seatAddIbrahimErkal(592,"T11",docRef),seatAddIbrahimErkal(593,"T12",docRef),seatAddIbrahimErkal(594,"NA",docRef),seatAddIbrahimErkal(595,"NA",docRef),seatAddIbrahimErkal(596,"NA",docRef),seatAddIbrahimErkal(597,"T13",docRef),seatAddIbrahimErkal(598,"T14",docRef),seatAddIbrahimErkal(599,"T15",docRef),seatAddIbrahimErkal(600,"T16",docRef),seatAddIbrahimErkal(601,"T17,",docRef),seatAddIbrahimErkal(602,"T18",docRef),seatAddIbrahimErkal(603,"T19",docRef),seatAddIbrahimErkal(604,"T20",docRef),seatAddIbrahimErkal(605,"T21",docRef),seatAddIbrahimErkal(606,"T22",docRef),seatAddIbrahimErkal(607,"T23",docRef),seatAddIbrahimErkal(608,"T24",docRef),seatAddIbrahimErkal(609,"NA",docRef)
                          seatAddIbrahimErkal(610,"NA",docRef),seatAddIbrahimErkal(611,"U1",docRef),seatAddIbrahimErkal(612,"U2",docRef),seatAddIbrahimErkal(613,"U3",docRef),seatAddIbrahimErkal(614,"U4",docRef),seatAddIbrahimErkal(615,"U5",docRef),seatAddIbrahimErkal(616,"U6",docRef),seatAddIbrahimErkal(617,"NA",docRef),seatAddIbrahimErkal(618,"NA",docRef),seatAddIbrahimErkal(619,"U7",docRef),seatAddIbrahimErkal(620,"U8",docRef),seatAddIbrahimErkal(621,"U9",docRef),seatAddIbrahimErkal(622,"U10",docRef),seatAddIbrahimErkal(623,"NA",docRef),seatAddIbrahimErkal(624,"NA",docRef),seatAddIbrahimErkal(625,"NA",docRef),seatAddIbrahimErkal(626,"U11",docRef),seatAddIbrahimErkal(627,"U12",docRef),seatAddIbrahimErkal(628,"U13",docRef),seatAddIbrahimErkal(629,"U14",docRef),seatAddIbrahimErkal(630,"U15",docRef),seatAddIbrahimErkal(631,"U16",docRef),seatAddIbrahimErkal(632,"U17",docRef),seatAddIbrahimErkal(633,"U18",docRef),seatAddIbrahimErkal(634,"U19",docRef),seatAddIbrahimErkal(635,"U20",docRef),seatAddIbrahimErkal(636,"U21",docRef),seatAddIbrahimErkal(637,"U22",docRef),seatAddIbrahimErkal(638,"U23",docRef)
                          seatAddIbrahimErkal(639,"NA",docRef),seatAddIbrahimErkal(640,"V1",docRef),seatAddIbrahimErkal(641,"V2",docRef),seatAddIbrahimErkal(642,"V3",docRef),seatAddIbrahimErkal(643,"V4",docRef),seatAddIbrahimErkal(644,"V5",docRef),seatAddIbrahimErkal(645,"V6",docRef),seatAddIbrahimErkal(646,"NA",docRef),seatAddIbrahimErkal(647,"NA",docRef),seatAddIbrahimErkal(648,"NA",docRef),seatAddIbrahimErkal(649,"V7",docRef),seatAddIbrahimErkal(650,"V8",docRef),seatAddIbrahimErkal(651,"V9",docRef),seatAddIbrahimErkal(652,"NA",docRef),seatAddIbrahimErkal(653,"NA",docRef),seatAddIbrahimErkal(654,"NA",docRef),seatAddIbrahimErkal(655,"NA",docRef),seatAddIbrahimErkal(656,"NA",docRef),seatAddIbrahimErkal(657,"NA",docRef),seatAddIbrahimErkal(658,"NA",docRef),seatAddIbrahimErkal(659,"NA,",docRef),seatAddIbrahimErkal(660,"NA",docRef),seatAddIbrahimErkal(661,"NA",docRef),seatAddIbrahimErkal(662,"NA",docRef),seatAddIbrahimErkal(663,"V17",docRef),seatAddIbrahimErkal(664,"V18",docRef),seatAddIbrahimErkal(665,"V19",docRef),seatAddIbrahimErkal(666,"V20",docRef),seatAddIbrahimErkal(667,"V21",docRef)
                          seatAddIbrahimErkal(668,"Y1",docRef),seatAddIbrahimErkal(669,"Y2",docRef),seatAddIbrahimErkal(670,"Y3",docRef),seatAddIbrahimErkal(671,"Y4",docRef),seatAddIbrahimErkal(672,"Y5",docRef),seatAddIbrahimErkal(673,"Y6",docRef),seatAddIbrahimErkal(674,"Y7",docRef),seatAddIbrahimErkal(675,"NA",docRef),seatAddIbrahimErkal(676,"NA",docRef),seatAddIbrahimErkal(677,"NA",docRef),seatAddIbrahimErkal(678,"Y8",docRef),seatAddIbrahimErkal(679,"Y9",docRef),seatAddIbrahimErkal(680,"Y10",docRef),seatAddIbrahimErkal(681,"NA",docRef),seatAddIbrahimErkal(682,"NA",docRef),seatAddIbrahimErkal(683,"NA",docRef),seatAddIbrahimErkal(684,"NA",docRef),seatAddIbrahimErkal(685,"NA",docRef),seatAddIbrahimErkal(686,"NA",docRef),seatAddIbrahimErkal(687,"NA",docRef),seatAddIbrahimErkal(688,"NA,",docRef),seatAddIbrahimErkal(689,"NA",docRef),seatAddIbrahimErkal(690,"NA",docRef),seatAddIbrahimErkal(691,"NA",docRef),seatAddIbrahimErkal(692,"Y18",docRef),seatAddIbrahimErkal(693,"Y19",docRef),seatAddIbrahimErkal(694,"Y20",docRef),seatAddIbrahimErkal(695,"Y21",docRef),seatAddIbrahimErkal(696,"Y22",docRef)
    
                        
                        }

                        try {

   
  
                          const docRefHome = await addDoc(collection(db,"HomeBanner"), {
                      
                            activityImgUrl : image1url,
                            activityCategoryName : activityCategoryFormSelect.value,
                            activityDocumentId : docRef.id,
                            
                          });
                      
                          console.log("Document written with ID: ", docRefHome.id);

                          alert("Etkinlik başalı bir şekilde eklendi")

                          } catch (e) {
                          console.error("Error adding document: ", e);
                        } 
        
                        console.log("Document written with ID: ", docRef.id);
                    } catch (e) {
                      console.error("Error adding document: ", e);
                    }
        
                  });
                
                });
        
            });
          
          });

          } else if (activityProtocolCheckBox.checked == true && activityProtocolSeatTextView.value == "") {

            alert("Lütfen protokol koltukları için sıra giriniz!")
          
          } else {

          var fileItem = activityWideImageInput.files[0];
          var fileItem2 = activityProtectImageInput.files[0];
        
         
          var filename = "image1" + Math.floor(Math.random() * (100000000 - 1000000)) + ".jpg";
          var filename2 = "image2" + Math.floor(Math.random() * (100000000 - 1000000))+ ".jpg";
        
          var image1url;
          var image2url;
        
          let storageRef1 = ref(storage, "images/"+filename);
          uploadBytes(storageRef1, fileItem).then((snapshot) =>{
      
            getDownloadURL(ref(storage,"images/"+filename)).then((url)=> {
        
              image1url = url;  
              console.log(url);
        
              let storageRef2 = ref(storage, "images/"+filename2);
              uploadBytes(storageRef2, fileItem2).then((snapshot) =>{
            
                getDownloadURL(ref(storage,"images/"+filename2)).then(async (url)=> {
              
                    image2url = url;  
                    console.log(url);
                    console.log(categoryValue);
        
                   
                    var datetimestamp;
                    var beginDatetimeStamp;
                    var endDateTimeStamp;

                    var dateOld = new Date();
        
                    if (categoryValue == 1 || categoryValue == 2) {
        
                      var date = new Date(activityDateInput.value);

                      console.log(date)

                     datetimestamp = date;
                     beginDatetimeStamp = dateOld;
                     endDateTimeStamp = dateOld;
                     console.log(datetimestamp)
        
        
                    } else if (categoryValue == 3){
        
                      datetimestamp = dateOld;
                      var beginDate = new Date(activityBeginDateInput.value);
                      beginDatetimeStamp = beginDate;
                      var endDate = new Date(activityEndDateInput.value);
                      endDateTimeStamp = endDate;
                    
                    }
                    
                   
        
                    var activityLocationValue = activitySaloonFormSelect.value;
                    var activityLocationStr;
                    var activityLocationAdressDetail;
                    var activityLocationLatitude;
                    var activityLocationLongitude;
        
                    if (activityLocationValue == 1) {
        
                      activityLocationStr = "İbrahim Erkal Kültür Merkezi"
                      activityLocationAdressDetail = "Muratpaşa, Kuloğlu, Bahçe Sk. No:4, 25100 Yakutiye/Erzurum"
        
                      activityLocationLatitude = 39.90536
                      activityLocationLongitude = 41.27130
        
                     }

                     var activityCategoryValue =  activityCategoryFormSelect.value;
                     var activityCategoryStr;

                     if (activityCategoryValue == "1") {

                      activityCategoryStr = "Tiyatro"
                    
                    } else if (activityCategoryValue == "2") {

                      activityCategoryStr = "Konser"

                    } else if (activityCategoryValue == "3") {

                      activityCategoryStr = "Sergi"

                    }

                   
        
                    try {


                        const docRef = await addDoc(collection(db,"Events"), {
        
                          activityName: activityNameTextView.value,
                          activityCategory: activityCategoryStr,
                          activityLocation: activityLocationStr,
        
                          activityDate: datetimestamp,
                          activityBeginDate: beginDatetimeStamp,
                          activityEndDate: endDateTimeStamp,
                          activityDescription: activityDescriptionTextView.value,
                          
                          activityImgUrl1: image1url,
                          activityImgUrl2: image2url,
                          
                          activityLocationAdressDetail: activityLocationAdressDetail,
                          activityLocationLatitude: activityLocationLatitude,
                          activityLocationLongitude: activityLocationLongitude,
                          
                          activityOrganization: activityOrganisationTextView.value,
                          activityTelephoneNumber: activityTelephoneTextView.value,
        
                          activityTicketInfo: ticketValue,
                          activityTicketClass1Name: ticketName1,
                          activityTicketClass1Price: ticketprice1,
                          activityTicketClass2Name: ticketName2,
                          activityTicketClass2Price: ticketprice2,
                          activityTicketClass3Name: ticketName3,
                          activityTicketClass3Price: ticketprice3,
                          activityTicketClass4Name: ticketName4,
                          activityTicketClass4Price: ticketprice4,

                          activityAddUser: auth.currentUser.email,
                          
                        });

                       
        
                        if (activityLocationValue == "1") {      


                          if (activityProtocolSeatTextView.value == 1) {

                            seatAddIbrahimErkalProtocol(1,"NA",docRef),seatAddIbrahimErkalProtocol(2,"NA",docRef),seatAddIbrahimErkalProtocol(3,"A1",docRef),seatAddIbrahimErkalProtocol(4,"A2",docRef),seatAddIbrahimErkalProtocol(5,"A3",docRef),seatAddIbrahimErkalProtocol(6,"A4",docRef),seatAddIbrahimErkalProtocol(7,"A5",docRef),seatAddIbrahimErkalProtocol(8,"A6",docRef),seatAddIbrahimErkalProtocol(9,"A7",docRef),seatAddIbrahimErkalProtocol(10,"A8",docRef),seatAddIbrahimErkalProtocol(11,"A9",docRef),seatAddIbrahimErkalProtocol(12,"A10",docRef),seatAddIbrahimErkalProtocol(13,"A11",docRef),seatAddIbrahimErkalProtocol(14,"A12",docRef),seatAddIbrahimErkalProtocol(15,"A13",docRef),seatAddIbrahimErkalProtocol(16,"A14",docRef),seatAddIbrahimErkalProtocol(17,"A15",docRef),seatAddIbrahimErkalProtocol(18,"A16",docRef),seatAddIbrahimErkalProtocol(19,"A17",docRef),seatAddIbrahimErkalProtocol(20,"A18",docRef),seatAddIbrahimErkalProtocol(21,"A19,",docRef),seatAddIbrahimErkalProtocol(22,"A20",docRef),seatAddIbrahimErkalProtocol(23,"A21",docRef),seatAddIbrahimErkalProtocol(24,"A22",docRef),seatAddIbrahimErkalProtocol(25,"A23",docRef),seatAddIbrahimErkalProtocol(26,"A24",docRef),seatAddIbrahimErkalProtocol(27,"NA",docRef),seatAddIbrahimErkalProtocol(28,"NA",docRef),seatAddIbrahimErkalProtocol(29,"NA",docRef)
                            seatAddIbrahimErkal(30,"NA",docRef),seatAddIbrahimErkal(31,"NA",docRef),seatAddIbrahimErkal(32,"B1",docRef),seatAddIbrahimErkal(33,"B2",docRef),seatAddIbrahimErkal(34,"B3",docRef),seatAddIbrahimErkal(35,"B4",docRef),seatAddIbrahimErkal(36,"B5",docRef),seatAddIbrahimErkal(37,"B6",docRef),seatAddIbrahimErkal(38,"B7",docRef),seatAddIbrahimErkal(39,"B8",docRef),seatAddIbrahimErkal(40,"B9",docRef),seatAddIbrahimErkal(41,"B10",docRef),seatAddIbrahimErkal(42,"B11",docRef),seatAddIbrahimErkal(43,"B12",docRef),seatAddIbrahimErkal(44,"B13",docRef),seatAddIbrahimErkal(45,"B14",docRef),seatAddIbrahimErkal(46,"B15",docRef),seatAddIbrahimErkal(47,"B16",docRef),seatAddIbrahimErkal(48,"B17",docRef),seatAddIbrahimErkal(49,"B18",docRef),seatAddIbrahimErkal(50,"B19,",docRef),seatAddIbrahimErkal(51,"B20",docRef),seatAddIbrahimErkal(52,"B21",docRef),seatAddIbrahimErkal(53,"B22",docRef),seatAddIbrahimErkal(54,"B23",docRef),seatAddIbrahimErkal(55,"B24",docRef),seatAddIbrahimErkal(56,"NA",docRef),seatAddIbrahimErkal(57,"NA",docRef),seatAddIbrahimErkal(58,"NA",docRef)
                            seatAddIbrahimErkal(59,"NA",docRef),seatAddIbrahimErkal(60,"NA",docRef),seatAddIbrahimErkal(61,"C1",docRef),seatAddIbrahimErkal(62,"C2",docRef),seatAddIbrahimErkal(63,"C3",docRef),seatAddIbrahimErkal(64,"C4",docRef),seatAddIbrahimErkal(65,"C5",docRef),seatAddIbrahimErkal(66,"C6",docRef),seatAddIbrahimErkal(67,"C7",docRef),seatAddIbrahimErkal(68,"C8",docRef),seatAddIbrahimErkal(69,"C9",docRef),seatAddIbrahimErkal(70,"C10",docRef),seatAddIbrahimErkal(71,"C11",docRef),seatAddIbrahimErkal(72,"C12",docRef),seatAddIbrahimErkal(73,"C13",docRef),seatAddIbrahimErkal(74,"C14",docRef),seatAddIbrahimErkal(75,"C15",docRef),seatAddIbrahimErkal(76,"C16",docRef),seatAddIbrahimErkal(77,"C17",docRef),seatAddIbrahimErkal(78,"C18",docRef),seatAddIbrahimErkal(79,"C19,",docRef),seatAddIbrahimErkal(80,"C20",docRef),seatAddIbrahimErkal(81,"C21",docRef),seatAddIbrahimErkal(82,"C22",docRef),seatAddIbrahimErkal(83,"C23",docRef),seatAddIbrahimErkal(84,"C24",docRef),seatAddIbrahimErkal(85,"NA",docRef),seatAddIbrahimErkal(86,"NA",docRef),seatAddIbrahimErkal(87,"NA",docRef)
                            seatAddIbrahimErkal(88,"NA",docRef),seatAddIbrahimErkal(89,"NA",docRef),seatAddIbrahimErkal(90,"D1",docRef),seatAddIbrahimErkal(91,"D2",docRef),seatAddIbrahimErkal(92,"D3",docRef),seatAddIbrahimErkal(93,"D4",docRef),seatAddIbrahimErkal(94,"D5",docRef),seatAddIbrahimErkal(95,"D6",docRef),seatAddIbrahimErkal(96,"D7",docRef),seatAddIbrahimErkal(97,"D8",docRef),seatAddIbrahimErkal(98,"D9",docRef),seatAddIbrahimErkal(99,"D10",docRef),seatAddIbrahimErkal(100,"D11",docRef),seatAddIbrahimErkal(101,"D12",docRef),seatAddIbrahimErkal(102,"D13",docRef),seatAddIbrahimErkal(103,"D14",docRef),seatAddIbrahimErkal(104,"D15",docRef),seatAddIbrahimErkal(105,"D16",docRef),seatAddIbrahimErkal(106,"D17",docRef),seatAddIbrahimErkal(107,"D18",docRef),seatAddIbrahimErkal(108,"D19,",docRef),seatAddIbrahimErkal(109,"D20",docRef),seatAddIbrahimErkal(110,"D21",docRef),seatAddIbrahimErkal(111,"D22",docRef),seatAddIbrahimErkal(112,"D23",docRef),seatAddIbrahimErkal(113,"D24",docRef),seatAddIbrahimErkal(114,"NA",docRef),seatAddIbrahimErkal(115,"NA",docRef),seatAddIbrahimErkal(116,"NA",docRef)
                            seatAddIbrahimErkal(117,"NA",docRef),seatAddIbrahimErkal(118,"NA",docRef),seatAddIbrahimErkal(119,"E1",docRef),seatAddIbrahimErkal(120,"E2",docRef),seatAddIbrahimErkal(121,"E3",docRef),seatAddIbrahimErkal(122,"E4",docRef),seatAddIbrahimErkal(123,"E5",docRef),seatAddIbrahimErkal(124,"E6",docRef),seatAddIbrahimErkal(125,"E7",docRef),seatAddIbrahimErkal(126,"E8",docRef),seatAddIbrahimErkal(127,"E9",docRef),seatAddIbrahimErkal(128,"E10",docRef),seatAddIbrahimErkal(129,"E11",docRef),seatAddIbrahimErkal(130,"E12",docRef),seatAddIbrahimErkal(131,"E13",docRef),seatAddIbrahimErkal(132,"E14",docRef),seatAddIbrahimErkal(133,"E15",docRef),seatAddIbrahimErkal(134,"E16",docRef),seatAddIbrahimErkal(135,"E17",docRef),seatAddIbrahimErkal(136,"E18",docRef),seatAddIbrahimErkal(137,"E19,",docRef),seatAddIbrahimErkal(138,"E20",docRef),seatAddIbrahimErkal(139,"E21",docRef),seatAddIbrahimErkal(140,"E22",docRef),seatAddIbrahimErkal(141,"E23",docRef),seatAddIbrahimErkal(142,"E24",docRef),seatAddIbrahimErkal(143,"NA",docRef),seatAddIbrahimErkal(144,"NA",docRef),seatAddIbrahimErkal(145,"NA",docRef)
                            seatAddIbrahimErkal(146,"NA",docRef),seatAddIbrahimErkal(147,"NA",docRef),seatAddIbrahimErkal(148,"F1",docRef),seatAddIbrahimErkal(149,"F2",docRef),seatAddIbrahimErkal(150,"F3",docRef),seatAddIbrahimErkal(151,"F4",docRef),seatAddIbrahimErkal(152,"F5",docRef),seatAddIbrahimErkal(153,"F6",docRef),seatAddIbrahimErkal(154,"F7",docRef),seatAddIbrahimErkal(155,"F8",docRef),seatAddIbrahimErkal(156,"F9",docRef),seatAddIbrahimErkal(157,"F10",docRef),seatAddIbrahimErkal(158,"F11",docRef),seatAddIbrahimErkal(159,"F12",docRef),seatAddIbrahimErkal(160,"F13",docRef),seatAddIbrahimErkal(161,"F14",docRef),seatAddIbrahimErkal(162,"F15",docRef),seatAddIbrahimErkal(163,"F16",docRef),seatAddIbrahimErkal(164,"F17",docRef),seatAddIbrahimErkal(165,"F18",docRef),seatAddIbrahimErkal(166,"F19,",docRef),seatAddIbrahimErkal(167,"E20",docRef),seatAddIbrahimErkal(168,"F21",docRef),seatAddIbrahimErkal(169,"F22",docRef),seatAddIbrahimErkal(170,"F23",docRef),seatAddIbrahimErkal(171,"F24",docRef),seatAddIbrahimErkal(172,"NA",docRef),seatAddIbrahimErkal(173,"NA",docRef),seatAddIbrahimErkal(174,"NA",docRef)
                            seatAddIbrahimErkal(175,"NA",docRef),seatAddIbrahimErkal(176,"NA",docRef),seatAddIbrahimErkal(177,"G1",docRef),seatAddIbrahimErkal(178,"G2",docRef),seatAddIbrahimErkal(179,"G3",docRef),seatAddIbrahimErkal(180,"G4",docRef),seatAddIbrahimErkal(181,"G5",docRef),seatAddIbrahimErkal(182,"G6",docRef),seatAddIbrahimErkal(183,"G7",docRef),seatAddIbrahimErkal(184,"G8",docRef),seatAddIbrahimErkal(185,"G9",docRef),seatAddIbrahimErkal(186,"G10",docRef),seatAddIbrahimErkal(187,"G11",docRef),seatAddIbrahimErkal(188,"G12",docRef),seatAddIbrahimErkal(189,"G13",docRef),seatAddIbrahimErkal(190,"G14",docRef),seatAddIbrahimErkal(191,"G15",docRef),seatAddIbrahimErkal(192,"G16",docRef),seatAddIbrahimErkal(193,"G17",docRef),seatAddIbrahimErkal(194,"G18",docRef),seatAddIbrahimErkal(195,"G19,",docRef),seatAddIbrahimErkal(196,"G20",docRef),seatAddIbrahimErkal(197,"G21",docRef),seatAddIbrahimErkal(198,"G22",docRef),seatAddIbrahimErkal(199,"G23",docRef),seatAddIbrahimErkal(200,"G24",docRef),seatAddIbrahimErkal(201,"NA",docRef),seatAddIbrahimErkal(202,"NA",docRef),seatAddIbrahimErkal(203,"NA",docRef)
                            seatAddIbrahimErkal(204,"NA",docRef),seatAddIbrahimErkal(205,"NA",docRef),seatAddIbrahimErkal(206,"H1",docRef),seatAddIbrahimErkal(207,"H2",docRef),seatAddIbrahimErkal(208,"H3",docRef),seatAddIbrahimErkal(209,"H4",docRef),seatAddIbrahimErkal(210,"H5",docRef),seatAddIbrahimErkal(211,"H6",docRef),seatAddIbrahimErkal(212,"H7",docRef),seatAddIbrahimErkal(213,"H8",docRef),seatAddIbrahimErkal(214,"H9",docRef),seatAddIbrahimErkal(215,"H10",docRef),seatAddIbrahimErkal(216,"H11",docRef),seatAddIbrahimErkal(217,"H12",docRef),seatAddIbrahimErkal(218,"H13",docRef),seatAddIbrahimErkal(219,"H14",docRef),seatAddIbrahimErkal(220,"H15",docRef),seatAddIbrahimErkal(221,"H16",docRef),seatAddIbrahimErkal(222,"H17",docRef),seatAddIbrahimErkal(223,"H18",docRef),seatAddIbrahimErkal(224,"H19,",docRef),seatAddIbrahimErkal(225,"H20",docRef),seatAddIbrahimErkal(226,"H21",docRef),seatAddIbrahimErkal(227,"H22",docRef),seatAddIbrahimErkal(228,"H23",docRef),seatAddIbrahimErkal(229,"H24",docRef),seatAddIbrahimErkal(230,"NA",docRef),seatAddIbrahimErkal(231,"NA",docRef),seatAddIbrahimErkal(232,"NA",docRef)
                            seatAddIbrahimErkal(233,"NA",docRef),seatAddIbrahimErkal(234,"NA",docRef),seatAddIbrahimErkal(235,"I1",docRef),seatAddIbrahimErkal(236,"I2",docRef),seatAddIbrahimErkal(237,"I3",docRef),seatAddIbrahimErkal(238,"I4",docRef),seatAddIbrahimErkal(239,"I5",docRef),seatAddIbrahimErkal(240,"I6",docRef),seatAddIbrahimErkal(241,"I7",docRef),seatAddIbrahimErkal(242,"I8",docRef),seatAddIbrahimErkal(243,"I9",docRef),seatAddIbrahimErkal(244,"I10",docRef),seatAddIbrahimErkal(245,"I11",docRef),seatAddIbrahimErkal(246,"I12",docRef),seatAddIbrahimErkal(247,"I13",docRef),seatAddIbrahimErkal(248,"I14",docRef),seatAddIbrahimErkal(249,"I15",docRef),seatAddIbrahimErkal(250,"I16",docRef),seatAddIbrahimErkal(251,"I17",docRef),seatAddIbrahimErkal(252,"I18",docRef),seatAddIbrahimErkal(253,"I19,",docRef),seatAddIbrahimErkal(254,"I20",docRef),seatAddIbrahimErkal(255,"I21",docRef),seatAddIbrahimErkal(256,"I22",docRef),seatAddIbrahimErkal(257,"I23",docRef),seatAddIbrahimErkal(258,"I24",docRef),seatAddIbrahimErkal(259,"NA",docRef),seatAddIbrahimErkal(260,"NA",docRef),seatAddIbrahimErkal(261,"NA",docRef)
                            seatAddIbrahimErkal(262,"NA",docRef),seatAddIbrahimErkal(263,"NA",docRef),seatAddIbrahimErkal(264,"J1",docRef),seatAddIbrahimErkal(265,"J2",docRef),seatAddIbrahimErkal(266,"J3",docRef),seatAddIbrahimErkal(267,"J4",docRef),seatAddIbrahimErkal(268,"J5",docRef),seatAddIbrahimErkal(269,"J6",docRef),seatAddIbrahimErkal(270,"J7",docRef),seatAddIbrahimErkal(271,"J8",docRef),seatAddIbrahimErkal(272,"J9",docRef),seatAddIbrahimErkal(273,"J10",docRef),seatAddIbrahimErkal(274,"J11",docRef),seatAddIbrahimErkal(275,"J12",docRef),seatAddIbrahimErkal(276,"J13",docRef),seatAddIbrahimErkal(277,"J14",docRef),seatAddIbrahimErkal(278,"J15",docRef),seatAddIbrahimErkal(279,"J16",docRef),seatAddIbrahimErkal(280,"J17",docRef),seatAddIbrahimErkal(281,"J18",docRef),seatAddIbrahimErkal(282,"J19,",docRef),seatAddIbrahimErkal(283,"J20",docRef),seatAddIbrahimErkal(284,"J21",docRef),seatAddIbrahimErkal(285,"J22",docRef),seatAddIbrahimErkal(286,"J23",docRef),seatAddIbrahimErkal(287,"J24",docRef),seatAddIbrahimErkal(288,"NA",docRef),seatAddIbrahimErkal(289,"NA",docRef),seatAddIbrahimErkal(290,"NA",docRef)
                            seatAddIbrahimErkal(291,"NA",docRef),seatAddIbrahimErkal(292,"NA",docRef),seatAddIbrahimErkal(293,"NA",docRef),seatAddIbrahimErkal(294,"NA",docRef),seatAddIbrahimErkal(295,"NA",docRef),seatAddIbrahimErkal(296,"NA",docRef),seatAddIbrahimErkal(297,"NA",docRef),seatAddIbrahimErkal(298,"NA",docRef),seatAddIbrahimErkal(299,"NA",docRef),seatAddIbrahimErkal(300,"NA",docRef),seatAddIbrahimErkal(301,"NA",docRef),seatAddIbrahimErkal(302,"NA",docRef),seatAddIbrahimErkal(303,"NA",docRef),seatAddIbrahimErkal(304,"NA",docRef),seatAddIbrahimErkal(305,"NA",docRef),seatAddIbrahimErkal(306,"NA",docRef),seatAddIbrahimErkal(307,"NA",docRef),seatAddIbrahimErkal(308,"NA",docRef),seatAddIbrahimErkal(309,"NA",docRef),seatAddIbrahimErkal(310,"NA",docRef),seatAddIbrahimErkal(311,"NA",docRef),seatAddIbrahimErkal(312,"NA",docRef),seatAddIbrahimErkal(313,"NA",docRef),seatAddIbrahimErkal(314,"NA",docRef),seatAddIbrahimErkal(315,"NA",docRef),seatAddIbrahimErkal(316,"NA",docRef),seatAddIbrahimErkal(317,"NA",docRef),seatAddIbrahimErkal(318,"NA",docRef),seatAddIbrahimErkal(319,"NA",docRef)  
                            seatAddIbrahimErkal(320,"NA",docRef),seatAddIbrahimErkal(321,"NA",docRef),seatAddIbrahimErkal(322,"K1",docRef),seatAddIbrahimErkal(323,"K2",docRef),seatAddIbrahimErkal(324,"K3",docRef),seatAddIbrahimErkal(325,"K4",docRef),seatAddIbrahimErkal(326,"K5",docRef),seatAddIbrahimErkal(327,"K6",docRef),seatAddIbrahimErkal(328,"K7",docRef),seatAddIbrahimErkal(329,"K8",docRef),seatAddIbrahimErkal(330,"K9",docRef),seatAddIbrahimErkal(331,"K10",docRef),seatAddIbrahimErkal(332,"K11",docRef),seatAddIbrahimErkal(333,"NA",docRef),seatAddIbrahimErkal(334,"NA",docRef),seatAddIbrahimErkal(335,"NA",docRef),seatAddIbrahimErkal(336,"K12",docRef),seatAddIbrahimErkal(337,"K13",docRef),seatAddIbrahimErkal(338,"K14",docRef),seatAddIbrahimErkal(339,"K15",docRef),seatAddIbrahimErkal(340,"K16,",docRef),seatAddIbrahimErkal(341,"K17",docRef),seatAddIbrahimErkal(342,"K18",docRef),seatAddIbrahimErkal(343,"K19",docRef),seatAddIbrahimErkal(344,"K20",docRef),seatAddIbrahimErkal(345,"K21",docRef),seatAddIbrahimErkal(346,"NA",docRef),seatAddIbrahimErkal(347,"NA",docRef),seatAddIbrahimErkal(348,"NA",docRef)
                            seatAddIbrahimErkal(349,"NA",docRef),seatAddIbrahimErkal(350,"NA",docRef),seatAddIbrahimErkal(351,"L1",docRef),seatAddIbrahimErkal(352,"L2",docRef),seatAddIbrahimErkal(353,"L3",docRef),seatAddIbrahimErkal(354,"L4",docRef),seatAddIbrahimErkal(355,"L5",docRef),seatAddIbrahimErkal(356,"L6",docRef),seatAddIbrahimErkal(357,"L7",docRef),seatAddIbrahimErkal(358,"L8",docRef),seatAddIbrahimErkal(359,"L9",docRef),seatAddIbrahimErkal(360,"L10",docRef),seatAddIbrahimErkal(361,"L11",docRef),seatAddIbrahimErkal(362,"NA",docRef),seatAddIbrahimErkal(363,"NA",docRef),seatAddIbrahimErkal(364,"NA",docRef),seatAddIbrahimErkal(365,"L12",docRef),seatAddIbrahimErkal(366,"L13",docRef),seatAddIbrahimErkal(367,"L14",docRef),seatAddIbrahimErkal(368,"L15",docRef),seatAddIbrahimErkal(369,"L16,",docRef),seatAddIbrahimErkal(370,"L17",docRef),seatAddIbrahimErkal(371,"L18",docRef),seatAddIbrahimErkal(372,"L19",docRef),seatAddIbrahimErkal(373,"L20",docRef),seatAddIbrahimErkal(374,",L21",docRef),seatAddIbrahimErkal(375,"NA",docRef),seatAddIbrahimErkal(376,"NA",docRef),seatAddIbrahimErkal(377,"NA",docRef)
                            seatAddIbrahimErkal(378,"NA",docRef),seatAddIbrahimErkal(379,"NA",docRef),seatAddIbrahimErkal(380,"M1",docRef),seatAddIbrahimErkal(381,"M2",docRef),seatAddIbrahimErkal(382,"M3",docRef),seatAddIbrahimErkal(383,"M4",docRef),seatAddIbrahimErkal(384,"M5",docRef),seatAddIbrahimErkal(385,"M6",docRef),seatAddIbrahimErkal(386,"M7",docRef),seatAddIbrahimErkal(387,"M8",docRef),seatAddIbrahimErkal(388,"M9",docRef),seatAddIbrahimErkal(389,"M10",docRef),seatAddIbrahimErkal(390,"M11",docRef),seatAddIbrahimErkal(391,"NA",docRef),seatAddIbrahimErkal(392,"NA",docRef),seatAddIbrahimErkal(393,"NA",docRef),seatAddIbrahimErkal(394,"M12",docRef),seatAddIbrahimErkal(395,"M13",docRef),seatAddIbrahimErkal(396,"M14",docRef),seatAddIbrahimErkal(397,"M15",docRef),seatAddIbrahimErkal(398,"M16,",docRef),seatAddIbrahimErkal(399,"M17",docRef),seatAddIbrahimErkal(400,"M18",docRef),seatAddIbrahimErkal(401,"M19",docRef),seatAddIbrahimErkal(402,"M20",docRef),seatAddIbrahimErkal(403,"M21",docRef),seatAddIbrahimErkal(404,"NA",docRef),seatAddIbrahimErkal(405,"NA",docRef),seatAddIbrahimErkal(406,"NA",docRef)
                            seatAddIbrahimErkal(407,"NA",docRef),seatAddIbrahimErkal(408,"NA",docRef),seatAddIbrahimErkal(409,"N1",docRef),seatAddIbrahimErkal(410,"N2",docRef),seatAddIbrahimErkal(411,"N3",docRef),seatAddIbrahimErkal(412,"N4",docRef),seatAddIbrahimErkal(413,"N5",docRef),seatAddIbrahimErkal(414,"N6",docRef),seatAddIbrahimErkal(415,"N7",docRef),seatAddIbrahimErkal(416,"N8",docRef),seatAddIbrahimErkal(417,"N9",docRef),seatAddIbrahimErkal(418,"N10",docRef),seatAddIbrahimErkal(419,"N11",docRef),seatAddIbrahimErkal(420,"NA",docRef),seatAddIbrahimErkal(421,"NA",docRef),seatAddIbrahimErkal(422,"NA",docRef),seatAddIbrahimErkal(423,"N12",docRef),seatAddIbrahimErkal(424,"N13",docRef),seatAddIbrahimErkal(425,"N14",docRef),seatAddIbrahimErkal(426,"N15",docRef),seatAddIbrahimErkal(427,"N16,",docRef),seatAddIbrahimErkal(428,"N17",docRef),seatAddIbrahimErkal(429,"N18",docRef),seatAddIbrahimErkal(430,"N19",docRef),seatAddIbrahimErkal(431,"N20",docRef),seatAddIbrahimErkal(432,"N21",docRef),seatAddIbrahimErkal(433,"NA",docRef),seatAddIbrahimErkal(434,"NA",docRef),seatAddIbrahimErkal(435,"NA",docRef)
                            seatAddIbrahimErkal(436,"NA",docRef),seatAddIbrahimErkal(437,"NA",docRef),seatAddIbrahimErkal(438,"O1",docRef),seatAddIbrahimErkal(439,"O2",docRef),seatAddIbrahimErkal(440,"O3",docRef),seatAddIbrahimErkal(441,"O4",docRef),seatAddIbrahimErkal(442,"O5",docRef),seatAddIbrahimErkal(443,"O6",docRef),seatAddIbrahimErkal(444,"O7",docRef),seatAddIbrahimErkal(445,"O8",docRef),seatAddIbrahimErkal(446,"O9",docRef),seatAddIbrahimErkal(447,"O10",docRef),seatAddIbrahimErkal(448,"O11",docRef),seatAddIbrahimErkal(449,"NA",docRef),seatAddIbrahimErkal(450,"NA",docRef),seatAddIbrahimErkal(451,"NA",docRef),seatAddIbrahimErkal(452,"O12",docRef),seatAddIbrahimErkal(453,"O13",docRef),seatAddIbrahimErkal(454,"O14",docRef),seatAddIbrahimErkal(455,"O15",docRef),seatAddIbrahimErkal(456,"O16,",docRef),seatAddIbrahimErkal(457,"O17",docRef),seatAddIbrahimErkal(458,"O18",docRef),seatAddIbrahimErkal(459,"O19",docRef),seatAddIbrahimErkal(460,"O20",docRef),seatAddIbrahimErkal(461,"O21",docRef),seatAddIbrahimErkal(462,"NA",docRef),seatAddIbrahimErkal(463,"NA",docRef),seatAddIbrahimErkal(464,"NA",docRef)
                            seatAddIbrahimErkal(465,"NA",docRef),seatAddIbrahimErkal(466,"NA",docRef),seatAddIbrahimErkal(467,"P1",docRef),seatAddIbrahimErkal(468,"P2",docRef),seatAddIbrahimErkal(469,"P3",docRef),seatAddIbrahimErkal(470,"P4",docRef),seatAddIbrahimErkal(471,"P5",docRef),seatAddIbrahimErkal(472,"P6",docRef),seatAddIbrahimErkal(473,"P7",docRef),seatAddIbrahimErkal(474,"P8",docRef),seatAddIbrahimErkal(475,"P9",docRef),seatAddIbrahimErkal(476,"P10",docRef),seatAddIbrahimErkal(477,"P11",docRef),seatAddIbrahimErkal(478,"NA",docRef),seatAddIbrahimErkal(479,"NA",docRef),seatAddIbrahimErkal(480,"NA",docRef),seatAddIbrahimErkal(481,"P12",docRef),seatAddIbrahimErkal(482,"P13",docRef),seatAddIbrahimErkal(483,"P14",docRef),seatAddIbrahimErkal(484,"P15",docRef),seatAddIbrahimErkal(485,"P16,",docRef),seatAddIbrahimErkal(486,"P17",docRef),seatAddIbrahimErkal(487,"P18",docRef),seatAddIbrahimErkal(488,"P19",docRef),seatAddIbrahimErkal(489,"P20",docRef),seatAddIbrahimErkal(490,"P21",docRef),seatAddIbrahimErkal(491,"NA",docRef),seatAddIbrahimErkal(492,"NA",docRef),seatAddIbrahimErkal(493,"NA",docRef)
                            seatAddIbrahimErkal(494,"NA",docRef),seatAddIbrahimErkal(495,"NA",docRef),seatAddIbrahimErkal(496,"R1",docRef),seatAddIbrahimErkal(497,"R2",docRef),seatAddIbrahimErkal(498,"R3",docRef),seatAddIbrahimErkal(499,"R4",docRef),seatAddIbrahimErkal(500,"R5",docRef),seatAddIbrahimErkal(501,"R6",docRef),seatAddIbrahimErkal(502,"R7",docRef),seatAddIbrahimErkal(503,"R8",docRef),seatAddIbrahimErkal(504,"R9",docRef),seatAddIbrahimErkal(505,"R10",docRef),seatAddIbrahimErkal(506,"R11",docRef),seatAddIbrahimErkal(507,"NA",docRef),seatAddIbrahimErkal(508,"NA",docRef),seatAddIbrahimErkal(509,"NA",docRef),seatAddIbrahimErkal(510,"R12",docRef),seatAddIbrahimErkal(511,"R13",docRef),seatAddIbrahimErkal(512,"R14",docRef),seatAddIbrahimErkal(513,"R15",docRef),seatAddIbrahimErkal(514,"R16,",docRef),seatAddIbrahimErkal(515,"R17",docRef),seatAddIbrahimErkal(516,"R18",docRef),seatAddIbrahimErkal(517,"R19",docRef),seatAddIbrahimErkal(518,"R20",docRef),seatAddIbrahimErkal(519,"R21",docRef),seatAddIbrahimErkal(520,"NA",docRef),seatAddIbrahimErkal(521,"NA",docRef),seatAddIbrahimErkal(522,"NA",docRef)
                            seatAddIbrahimErkal(523,"NA",docRef),seatAddIbrahimErkal(524,"NA",docRef),seatAddIbrahimErkal(525,"S1",docRef),seatAddIbrahimErkal(526,"S2",docRef),seatAddIbrahimErkal(527,"S3",docRef),seatAddIbrahimErkal(528,"S4",docRef),seatAddIbrahimErkal(529,"S5",docRef),seatAddIbrahimErkal(530,"S6",docRef),seatAddIbrahimErkal(531,"S7",docRef),seatAddIbrahimErkal(532,"S8",docRef),seatAddIbrahimErkal(533,"S9",docRef),seatAddIbrahimErkal(534,"S10",docRef),seatAddIbrahimErkal(535,"S11",docRef),seatAddIbrahimErkal(536,"NA",docRef),seatAddIbrahimErkal(537,"NA",docRef),seatAddIbrahimErkal(538,"NA",docRef),seatAddIbrahimErkal(539,"S12",docRef),seatAddIbrahimErkal(540,"S13",docRef),seatAddIbrahimErkal(541,"S14",docRef),seatAddIbrahimErkal(542,"S15",docRef),seatAddIbrahimErkal(543,"S16,",docRef),seatAddIbrahimErkal(544,"S17",docRef),seatAddIbrahimErkal(545,"S18",docRef),seatAddIbrahimErkal(546,"S19",docRef),seatAddIbrahimErkal(547,"S20",docRef),seatAddIbrahimErkal(548,"S21",docRef),seatAddIbrahimErkal(549,"NA",docRef),seatAddIbrahimErkal(550,"NA",docRef),seatAddIbrahimErkal(551,"NA",docRef)
                            seatAddIbrahimErkal(552,"NA",docRef),seatAddIbrahimErkal(553,"NA",docRef),seatAddIbrahimErkal(554,"NA",docRef),seatAddIbrahimErkal(555,"NA",docRef),seatAddIbrahimErkal(556,"NA",docRef),seatAddIbrahimErkal(557,"NA",docRef),seatAddIbrahimErkal(558,"NA",docRef),seatAddIbrahimErkal(559,"NA",docRef),seatAddIbrahimErkal(560,"NA",docRef),seatAddIbrahimErkal(561,"NA",docRef),seatAddIbrahimErkal(562,"NA",docRef),seatAddIbrahimErkal(563,"NA",docRef),seatAddIbrahimErkal(564,"NA",docRef),seatAddIbrahimErkal(565,"NA",docRef),seatAddIbrahimErkal(566,"NA",docRef),seatAddIbrahimErkal(567,"NA",docRef),seatAddIbrahimErkal(568,"NA",docRef),seatAddIbrahimErkal(569,"NA",docRef),seatAddIbrahimErkal(570,"NA",docRef),seatAddIbrahimErkal(571,"NA",docRef),seatAddIbrahimErkal(572,"NA",docRef),seatAddIbrahimErkal(573,"NA",docRef),seatAddIbrahimErkal(574,"NA",docRef),seatAddIbrahimErkal(575,"NA",docRef),seatAddIbrahimErkal(576,"NA",docRef),seatAddIbrahimErkal(577,"NA",docRef),seatAddIbrahimErkal(578,"NA",docRef),seatAddIbrahimErkal(579,"NA",docRef),seatAddIbrahimErkal(580,"NA",docRef)  
                            seatAddIbrahimErkal(581,"NA",docRef),seatAddIbrahimErkal(582,"T1",docRef),seatAddIbrahimErkal(583,"T2",docRef),seatAddIbrahimErkal(584,"T3",docRef),seatAddIbrahimErkal(585,"T4",docRef),seatAddIbrahimErkal(586,"T5",docRef),seatAddIbrahimErkal(587,"T6",docRef),seatAddIbrahimErkal(588,"T7",docRef),seatAddIbrahimErkal(589,"T8",docRef),seatAddIbrahimErkal(590,"T9",docRef),seatAddIbrahimErkal(591,"T10",docRef),seatAddIbrahimErkal(592,"T11",docRef),seatAddIbrahimErkal(593,"T12",docRef),seatAddIbrahimErkal(594,"NA",docRef),seatAddIbrahimErkal(595,"NA",docRef),seatAddIbrahimErkal(596,"NA",docRef),seatAddIbrahimErkal(597,"T13",docRef),seatAddIbrahimErkal(598,"T14",docRef),seatAddIbrahimErkal(599,"T15",docRef),seatAddIbrahimErkal(600,"T16",docRef),seatAddIbrahimErkal(601,"T17,",docRef),seatAddIbrahimErkal(602,"T18",docRef),seatAddIbrahimErkal(603,"T19",docRef),seatAddIbrahimErkal(604,"T20",docRef),seatAddIbrahimErkal(605,"T21",docRef),seatAddIbrahimErkal(606,"T22",docRef),seatAddIbrahimErkal(607,"T23",docRef),seatAddIbrahimErkal(608,"T24",docRef),seatAddIbrahimErkal(609,"NA",docRef)
                            seatAddIbrahimErkal(610,"NA",docRef),seatAddIbrahimErkal(611,"U1",docRef),seatAddIbrahimErkal(612,"U2",docRef),seatAddIbrahimErkal(613,"U3",docRef),seatAddIbrahimErkal(614,"U4",docRef),seatAddIbrahimErkal(615,"U5",docRef),seatAddIbrahimErkal(616,"U6",docRef),seatAddIbrahimErkal(617,"NA",docRef),seatAddIbrahimErkal(618,"NA",docRef),seatAddIbrahimErkal(619,"U7",docRef),seatAddIbrahimErkal(620,"U8",docRef),seatAddIbrahimErkal(621,"U9",docRef),seatAddIbrahimErkal(622,"U10",docRef),seatAddIbrahimErkal(623,"NA",docRef),seatAddIbrahimErkal(624,"NA",docRef),seatAddIbrahimErkal(625,"NA",docRef),seatAddIbrahimErkal(626,"U11",docRef),seatAddIbrahimErkal(627,"U12",docRef),seatAddIbrahimErkal(628,"U13",docRef),seatAddIbrahimErkal(629,"U14",docRef),seatAddIbrahimErkal(630,"U15,",docRef),seatAddIbrahimErkal(631,"U16",docRef),seatAddIbrahimErkal(632,"U17",docRef),seatAddIbrahimErkal(633,"U18",docRef),seatAddIbrahimErkal(634,"U19",docRef),seatAddIbrahimErkal(635,"U20",docRef),seatAddIbrahimErkal(636,"U21",docRef),seatAddIbrahimErkal(637,"U22",docRef),seatAddIbrahimErkal(638,"U23",docRef)
                            seatAddIbrahimErkal(639,"NA",docRef),seatAddIbrahimErkal(640,"V1",docRef),seatAddIbrahimErkal(641,"V2",docRef),seatAddIbrahimErkal(642,"V3",docRef),seatAddIbrahimErkal(643,"V4",docRef),seatAddIbrahimErkal(644,"V5",docRef),seatAddIbrahimErkal(645,"V6",docRef),seatAddIbrahimErkal(646,"NA",docRef),seatAddIbrahimErkal(647,"NA",docRef),seatAddIbrahimErkal(648,"NA",docRef),seatAddIbrahimErkal(649,"V7",docRef),seatAddIbrahimErkal(650,"V8",docRef),seatAddIbrahimErkal(651,"V9",docRef),seatAddIbrahimErkal(652,"NA",docRef),seatAddIbrahimErkal(653,"NA",docRef),seatAddIbrahimErkal(654,"NA",docRef),seatAddIbrahimErkal(655,"NA",docRef),seatAddIbrahimErkal(656,"NA",docRef),seatAddIbrahimErkal(657,"NA",docRef),seatAddIbrahimErkal(658,"NA",docRef),seatAddIbrahimErkal(659,"NA,",docRef),seatAddIbrahimErkal(660,"NA",docRef),seatAddIbrahimErkal(661,"NA",docRef),seatAddIbrahimErkal(662,"NA",docRef),seatAddIbrahimErkal(663,"V17",docRef),seatAddIbrahimErkal(664,"V18",docRef),seatAddIbrahimErkal(665,"V19",docRef),seatAddIbrahimErkal(666,"V20",docRef),seatAddIbrahimErkal(667,"V21",docRef)
                            seatAddIbrahimErkal(668,"Y1",docRef),seatAddIbrahimErkal(669,"Y2",docRef),seatAddIbrahimErkal(670,"Y3",docRef),seatAddIbrahimErkal(671,"Y4",docRef),seatAddIbrahimErkal(672,"Y5",docRef),seatAddIbrahimErkal(673,"Y6",docRef),seatAddIbrahimErkal(674,"Y7",docRef),seatAddIbrahimErkal(675,"NA",docRef),seatAddIbrahimErkal(676,"NA",docRef),seatAddIbrahimErkal(677,"NA",docRef),seatAddIbrahimErkal(678,"Y8",docRef),seatAddIbrahimErkal(679,"Y9",docRef),seatAddIbrahimErkal(680,"Y10",docRef),seatAddIbrahimErkal(681,"NA",docRef),seatAddIbrahimErkal(682,"NA",docRef),seatAddIbrahimErkal(683,"NA",docRef),seatAddIbrahimErkal(684,"NA",docRef),seatAddIbrahimErkal(685,"NA",docRef),seatAddIbrahimErkal(686,"NA",docRef),seatAddIbrahimErkal(687,"NA",docRef),seatAddIbrahimErkal(688,"NA,",docRef),seatAddIbrahimErkal(689,"NA",docRef),seatAddIbrahimErkal(690,"NA",docRef),seatAddIbrahimErkal(691,"NA",docRef),seatAddIbrahimErkal(692,"Y18",docRef),seatAddIbrahimErkal(693,"Y19",docRef),seatAddIbrahimErkal(694,"Y20",docRef),seatAddIbrahimErkal(695,"Y21",docRef),seatAddIbrahimErkal(696,"Y22",docRef);
                          


                          } else if (activityProtocolSeatTextView.value == 2) {

                            
                            seatAddIbrahimErkalProtocol(1,"NA",docRef),seatAddIbrahimErkalProtocol(2,"NA",docRef),seatAddIbrahimErkalProtocol(3,"A1",docRef),seatAddIbrahimErkalProtocol(4,"A2",docRef),seatAddIbrahimErkalProtocol(5,"A3",docRef),seatAddIbrahimErkalProtocol(6,"A4",docRef),seatAddIbrahimErkalProtocol(7,"A5",docRef),seatAddIbrahimErkalProtocol(8,"A6",docRef),seatAddIbrahimErkalProtocol(9,"A7",docRef),seatAddIbrahimErkalProtocol(10,"A8",docRef),seatAddIbrahimErkalProtocol(11,"A9",docRef),seatAddIbrahimErkalProtocol(12,"A10",docRef),seatAddIbrahimErkalProtocol(13,"A11",docRef),seatAddIbrahimErkalProtocol(14,"A12",docRef),seatAddIbrahimErkalProtocol(15,"A13",docRef),seatAddIbrahimErkalProtocol(16,"A14",docRef),seatAddIbrahimErkalProtocol(17,"A15",docRef),seatAddIbrahimErkalProtocol(18,"A16",docRef),seatAddIbrahimErkalProtocol(19,"A17",docRef),seatAddIbrahimErkalProtocol(20,"A18",docRef),seatAddIbrahimErkalProtocol(21,"A19,",docRef),seatAddIbrahimErkalProtocol(22,"A20",docRef),seatAddIbrahimErkalProtocol(23,"A21",docRef),seatAddIbrahimErkalProtocol(24,"A22",docRef),seatAddIbrahimErkalProtocol(25,"A23",docRef),seatAddIbrahimErkalProtocol(26,"A24",docRef),seatAddIbrahimErkalProtocol(27,"NA",docRef),seatAddIbrahimErkalProtocol(28,"NA",docRef),seatAddIbrahimErkalProtocol(29,"NA",docRef)
                            seatAddIbrahimErkalProtocol(30,"NA",docRef),seatAddIbrahimErkalProtocol(31,"NA",docRef),seatAddIbrahimErkalProtocol(32,"B1",docRef),seatAddIbrahimErkalProtocol(33,"B2",docRef),seatAddIbrahimErkalProtocol(34,"B3",docRef),seatAddIbrahimErkalProtocol(35,"B4",docRef),seatAddIbrahimErkalProtocol(36,"B5",docRef),seatAddIbrahimErkalProtocol(37,"B6",docRef),seatAddIbrahimErkalProtocol(38,"B7",docRef),seatAddIbrahimErkalProtocol(39,"B8",docRef),seatAddIbrahimErkalProtocol(40,"B9",docRef),seatAddIbrahimErkalProtocol(41,"B10",docRef),seatAddIbrahimErkalProtocol(42,"B11",docRef),seatAddIbrahimErkalProtocol(43,"B12",docRef),seatAddIbrahimErkalProtocol(44,"B13",docRef),seatAddIbrahimErkalProtocol(45,"B14",docRef),seatAddIbrahimErkalProtocol(46,"B15",docRef),seatAddIbrahimErkalProtocol(47,"B16",docRef),seatAddIbrahimErkalProtocol(48,"B17",docRef),seatAddIbrahimErkalProtocol(49,"B18",docRef),seatAddIbrahimErkalProtocol(50,"B19,",docRef),seatAddIbrahimErkalProtocol(51,"B20",docRef),seatAddIbrahimErkalProtocol(52,"B21",docRef),seatAddIbrahimErkalProtocol(53,"B22",docRef),seatAddIbrahimErkalProtocol(54,"B23",docRef),seatAddIbrahimErkalProtocol(55,"B24",docRef),seatAddIbrahimErkalProtocol(56,"NA",docRef),seatAddIbrahimErkalProtocol(57,"NA",docRef),seatAddIbrahimErkalProtocol(58,"NA",docRef)
                            seatAddIbrahimErkal(59,"NA",docRef),seatAddIbrahimErkal(60,"NA",docRef),seatAddIbrahimErkal(61,"C1",docRef),seatAddIbrahimErkal(62,"C2",docRef),seatAddIbrahimErkal(63,"C3",docRef),seatAddIbrahimErkal(64,"C4",docRef),seatAddIbrahimErkal(65,"C5",docRef),seatAddIbrahimErkal(66,"C6",docRef),seatAddIbrahimErkal(67,"C7",docRef),seatAddIbrahimErkal(68,"C8",docRef),seatAddIbrahimErkal(69,"C9",docRef),seatAddIbrahimErkal(70,"C10",docRef),seatAddIbrahimErkal(71,"C11",docRef),seatAddIbrahimErkal(72,"C12",docRef),seatAddIbrahimErkal(73,"C13",docRef),seatAddIbrahimErkal(74,"C14",docRef),seatAddIbrahimErkal(75,"C15",docRef),seatAddIbrahimErkal(76,"C16",docRef),seatAddIbrahimErkal(77,"C17",docRef),seatAddIbrahimErkal(78,"C18",docRef),seatAddIbrahimErkal(79,"C19,",docRef),seatAddIbrahimErkal(80,"C20",docRef),seatAddIbrahimErkal(81,"C21",docRef),seatAddIbrahimErkal(82,"C22",docRef),seatAddIbrahimErkal(83,"C23",docRef),seatAddIbrahimErkal(84,"C24",docRef),seatAddIbrahimErkal(85,"NA",docRef),seatAddIbrahimErkal(86,"NA",docRef),seatAddIbrahimErkal(87,"NA",docRef)
                            seatAddIbrahimErkal(88,"NA",docRef),seatAddIbrahimErkal(89,"NA",docRef),seatAddIbrahimErkal(90,"D1",docRef),seatAddIbrahimErkal(91,"D2",docRef),seatAddIbrahimErkal(92,"D3",docRef),seatAddIbrahimErkal(93,"D4",docRef),seatAddIbrahimErkal(94,"D5",docRef),seatAddIbrahimErkal(95,"D6",docRef),seatAddIbrahimErkal(96,"D7",docRef),seatAddIbrahimErkal(97,"D8",docRef),seatAddIbrahimErkal(98,"D9",docRef),seatAddIbrahimErkal(99,"D10",docRef),seatAddIbrahimErkal(100,"D11",docRef),seatAddIbrahimErkal(101,"D12",docRef),seatAddIbrahimErkal(102,"D13",docRef),seatAddIbrahimErkal(103,"D14",docRef),seatAddIbrahimErkal(104,"D15",docRef),seatAddIbrahimErkal(105,"D16",docRef),seatAddIbrahimErkal(106,"D17",docRef),seatAddIbrahimErkal(107,"D18",docRef),seatAddIbrahimErkal(108,"D19,",docRef),seatAddIbrahimErkal(109,"D20",docRef),seatAddIbrahimErkal(110,"D21",docRef),seatAddIbrahimErkal(111,"D22",docRef),seatAddIbrahimErkal(112,"D23",docRef),seatAddIbrahimErkal(113,"D24",docRef),seatAddIbrahimErkal(114,"NA",docRef),seatAddIbrahimErkal(115,"NA",docRef),seatAddIbrahimErkal(116,"NA",docRef)
                            seatAddIbrahimErkal(117,"NA",docRef),seatAddIbrahimErkal(118,"NA",docRef),seatAddIbrahimErkal(119,"E1",docRef),seatAddIbrahimErkal(120,"E2",docRef),seatAddIbrahimErkal(121,"E3",docRef),seatAddIbrahimErkal(122,"E4",docRef),seatAddIbrahimErkal(123,"E5",docRef),seatAddIbrahimErkal(124,"E6",docRef),seatAddIbrahimErkal(125,"E7",docRef),seatAddIbrahimErkal(126,"E8",docRef),seatAddIbrahimErkal(127,"E9",docRef),seatAddIbrahimErkal(128,"E10",docRef),seatAddIbrahimErkal(129,"E11",docRef),seatAddIbrahimErkal(130,"E12",docRef),seatAddIbrahimErkal(131,"E13",docRef),seatAddIbrahimErkal(132,"E14",docRef),seatAddIbrahimErkal(133,"E15",docRef),seatAddIbrahimErkal(134,"E16",docRef),seatAddIbrahimErkal(135,"E17",docRef),seatAddIbrahimErkal(136,"E18",docRef),seatAddIbrahimErkal(137,"E19,",docRef),seatAddIbrahimErkal(138,"E20",docRef),seatAddIbrahimErkal(139,"E21",docRef),seatAddIbrahimErkal(140,"E22",docRef),seatAddIbrahimErkal(141,"E23",docRef),seatAddIbrahimErkal(142,"E24",docRef),seatAddIbrahimErkal(143,"NA",docRef),seatAddIbrahimErkal(144,"NA",docRef),seatAddIbrahimErkal(145,"NA",docRef)
                            seatAddIbrahimErkal(146,"NA",docRef),seatAddIbrahimErkal(147,"NA",docRef),seatAddIbrahimErkal(148,"F1",docRef),seatAddIbrahimErkal(149,"F2",docRef),seatAddIbrahimErkal(150,"F3",docRef),seatAddIbrahimErkal(151,"F4",docRef),seatAddIbrahimErkal(152,"F5",docRef),seatAddIbrahimErkal(153,"F6",docRef),seatAddIbrahimErkal(154,"F7",docRef),seatAddIbrahimErkal(155,"F8",docRef),seatAddIbrahimErkal(156,"F9",docRef),seatAddIbrahimErkal(157,"F10",docRef),seatAddIbrahimErkal(158,"F11",docRef),seatAddIbrahimErkal(159,"F12",docRef),seatAddIbrahimErkal(160,"F13",docRef),seatAddIbrahimErkal(161,"F14",docRef),seatAddIbrahimErkal(162,"F15",docRef),seatAddIbrahimErkal(163,"F16",docRef),seatAddIbrahimErkal(164,"F17",docRef),seatAddIbrahimErkal(165,"F18",docRef),seatAddIbrahimErkal(166,"F19,",docRef),seatAddIbrahimErkal(167,"E20",docRef),seatAddIbrahimErkal(168,"F21",docRef),seatAddIbrahimErkal(169,"F22",docRef),seatAddIbrahimErkal(170,"F23",docRef),seatAddIbrahimErkal(171,"F24",docRef),seatAddIbrahimErkal(172,"NA",docRef),seatAddIbrahimErkal(173,"NA",docRef),seatAddIbrahimErkal(174,"NA",docRef)
                            seatAddIbrahimErkal(175,"NA",docRef),seatAddIbrahimErkal(176,"NA",docRef),seatAddIbrahimErkal(177,"G1",docRef),seatAddIbrahimErkal(178,"G2",docRef),seatAddIbrahimErkal(179,"G3",docRef),seatAddIbrahimErkal(180,"G4",docRef),seatAddIbrahimErkal(181,"G5",docRef),seatAddIbrahimErkal(182,"G6",docRef),seatAddIbrahimErkal(183,"G7",docRef),seatAddIbrahimErkal(184,"G8",docRef),seatAddIbrahimErkal(185,"G9",docRef),seatAddIbrahimErkal(186,"G10",docRef),seatAddIbrahimErkal(187,"G11",docRef),seatAddIbrahimErkal(188,"G12",docRef),seatAddIbrahimErkal(189,"G13",docRef),seatAddIbrahimErkal(190,"G14",docRef),seatAddIbrahimErkal(191,"G15",docRef),seatAddIbrahimErkal(192,"G16",docRef),seatAddIbrahimErkal(193,"G17",docRef),seatAddIbrahimErkal(194,"G18",docRef),seatAddIbrahimErkal(195,"G19,",docRef),seatAddIbrahimErkal(196,"G20",docRef),seatAddIbrahimErkal(197,"G21",docRef),seatAddIbrahimErkal(198,"G22",docRef),seatAddIbrahimErkal(199,"G23",docRef),seatAddIbrahimErkal(200,"G24",docRef),seatAddIbrahimErkal(201,"NA",docRef),seatAddIbrahimErkal(202,"NA",docRef),seatAddIbrahimErkal(203,"NA",docRef)
                            seatAddIbrahimErkal(204,"NA",docRef),seatAddIbrahimErkal(205,"NA",docRef),seatAddIbrahimErkal(206,"H1",docRef),seatAddIbrahimErkal(207,"H2",docRef),seatAddIbrahimErkal(208,"H3",docRef),seatAddIbrahimErkal(209,"H4",docRef),seatAddIbrahimErkal(210,"H5",docRef),seatAddIbrahimErkal(211,"H6",docRef),seatAddIbrahimErkal(212,"H7",docRef),seatAddIbrahimErkal(213,"H8",docRef),seatAddIbrahimErkal(214,"H9",docRef),seatAddIbrahimErkal(215,"H10",docRef),seatAddIbrahimErkal(216,"H11",docRef),seatAddIbrahimErkal(217,"H12",docRef),seatAddIbrahimErkal(218,"H13",docRef),seatAddIbrahimErkal(219,"H14",docRef),seatAddIbrahimErkal(220,"H15",docRef),seatAddIbrahimErkal(221,"H16",docRef),seatAddIbrahimErkal(222,"H17",docRef),seatAddIbrahimErkal(223,"H18",docRef),seatAddIbrahimErkal(224,"H19,",docRef),seatAddIbrahimErkal(225,"H20",docRef),seatAddIbrahimErkal(226,"H21",docRef),seatAddIbrahimErkal(227,"H22",docRef),seatAddIbrahimErkal(228,"H23",docRef),seatAddIbrahimErkal(229,"H24",docRef),seatAddIbrahimErkal(230,"NA",docRef),seatAddIbrahimErkal(231,"NA",docRef),seatAddIbrahimErkal(232,"NA",docRef)
                            seatAddIbrahimErkal(233,"NA",docRef),seatAddIbrahimErkal(234,"NA",docRef),seatAddIbrahimErkal(235,"I1",docRef),seatAddIbrahimErkal(236,"I2",docRef),seatAddIbrahimErkal(237,"I3",docRef),seatAddIbrahimErkal(238,"I4",docRef),seatAddIbrahimErkal(239,"I5",docRef),seatAddIbrahimErkal(240,"I6",docRef),seatAddIbrahimErkal(241,"I7",docRef),seatAddIbrahimErkal(242,"I8",docRef),seatAddIbrahimErkal(243,"I9",docRef),seatAddIbrahimErkal(244,"I10",docRef),seatAddIbrahimErkal(245,"I11",docRef),seatAddIbrahimErkal(246,"I12",docRef),seatAddIbrahimErkal(247,"I13",docRef),seatAddIbrahimErkal(248,"I14",docRef),seatAddIbrahimErkal(249,"I15",docRef),seatAddIbrahimErkal(250,"I16",docRef),seatAddIbrahimErkal(251,"I17",docRef),seatAddIbrahimErkal(252,"I18",docRef),seatAddIbrahimErkal(253,"I19,",docRef),seatAddIbrahimErkal(254,"I20",docRef),seatAddIbrahimErkal(255,"I21",docRef),seatAddIbrahimErkal(256,"I22",docRef),seatAddIbrahimErkal(257,"I23",docRef),seatAddIbrahimErkal(258,"I24",docRef),seatAddIbrahimErkal(259,"NA",docRef),seatAddIbrahimErkal(260,"NA",docRef),seatAddIbrahimErkal(261,"NA",docRef)
                            seatAddIbrahimErkal(262,"NA",docRef),seatAddIbrahimErkal(263,"NA",docRef),seatAddIbrahimErkal(264,"J1",docRef),seatAddIbrahimErkal(265,"J2",docRef),seatAddIbrahimErkal(266,"J3",docRef),seatAddIbrahimErkal(267,"J4",docRef),seatAddIbrahimErkal(268,"J5",docRef),seatAddIbrahimErkal(269,"J6",docRef),seatAddIbrahimErkal(270,"J7",docRef),seatAddIbrahimErkal(271,"J8",docRef),seatAddIbrahimErkal(272,"J9",docRef),seatAddIbrahimErkal(273,"J10",docRef),seatAddIbrahimErkal(274,"J11",docRef),seatAddIbrahimErkal(275,"J12",docRef),seatAddIbrahimErkal(276,"J13",docRef),seatAddIbrahimErkal(277,"J14",docRef),seatAddIbrahimErkal(278,"J15",docRef),seatAddIbrahimErkal(279,"J16",docRef),seatAddIbrahimErkal(280,"J17",docRef),seatAddIbrahimErkal(281,"J18",docRef),seatAddIbrahimErkal(282,"J19,",docRef),seatAddIbrahimErkal(283,"J20",docRef),seatAddIbrahimErkal(284,"J21",docRef),seatAddIbrahimErkal(285,"J22",docRef),seatAddIbrahimErkal(286,"J23",docRef),seatAddIbrahimErkal(287,"J24",docRef),seatAddIbrahimErkal(288,"NA",docRef),seatAddIbrahimErkal(289,"NA",docRef),seatAddIbrahimErkal(290,"NA",docRef)
                            seatAddIbrahimErkal(291,"NA",docRef),seatAddIbrahimErkal(292,"NA",docRef),seatAddIbrahimErkal(293,"NA",docRef),seatAddIbrahimErkal(294,"NA",docRef),seatAddIbrahimErkal(295,"NA",docRef),seatAddIbrahimErkal(296,"NA",docRef),seatAddIbrahimErkal(297,"NA",docRef),seatAddIbrahimErkal(298,"NA",docRef),seatAddIbrahimErkal(299,"NA",docRef),seatAddIbrahimErkal(300,"NA",docRef),seatAddIbrahimErkal(301,"NA",docRef),seatAddIbrahimErkal(302,"NA",docRef),seatAddIbrahimErkal(303,"NA",docRef),seatAddIbrahimErkal(304,"NA",docRef),seatAddIbrahimErkal(305,"NA",docRef),seatAddIbrahimErkal(306,"NA",docRef),seatAddIbrahimErkal(307,"NA",docRef),seatAddIbrahimErkal(308,"NA",docRef),seatAddIbrahimErkal(309,"NA",docRef),seatAddIbrahimErkal(310,"NA",docRef),seatAddIbrahimErkal(311,"NA",docRef),seatAddIbrahimErkal(312,"NA",docRef),seatAddIbrahimErkal(313,"NA",docRef),seatAddIbrahimErkal(314,"NA",docRef),seatAddIbrahimErkal(315,"NA",docRef),seatAddIbrahimErkal(316,"NA",docRef),seatAddIbrahimErkal(317,"NA",docRef),seatAddIbrahimErkal(318,"NA",docRef),seatAddIbrahimErkal(319,"NA",docRef)  
                            seatAddIbrahimErkal(320,"NA",docRef),seatAddIbrahimErkal(321,"NA",docRef),seatAddIbrahimErkal(322,"K1",docRef),seatAddIbrahimErkal(323,"K2",docRef),seatAddIbrahimErkal(324,"K3",docRef),seatAddIbrahimErkal(325,"K4",docRef),seatAddIbrahimErkal(326,"K5",docRef),seatAddIbrahimErkal(327,"K6",docRef),seatAddIbrahimErkal(328,"K7",docRef),seatAddIbrahimErkal(329,"K8",docRef),seatAddIbrahimErkal(330,"K9",docRef),seatAddIbrahimErkal(331,"K10",docRef),seatAddIbrahimErkal(332,"K11",docRef),seatAddIbrahimErkal(333,"NA",docRef),seatAddIbrahimErkal(334,"NA",docRef),seatAddIbrahimErkal(335,"NA",docRef),seatAddIbrahimErkal(336,"K12",docRef),seatAddIbrahimErkal(337,"K13",docRef),seatAddIbrahimErkal(338,"K14",docRef),seatAddIbrahimErkal(339,"K15",docRef),seatAddIbrahimErkal(340,"K16,",docRef),seatAddIbrahimErkal(341,"K17",docRef),seatAddIbrahimErkal(342,"K18",docRef),seatAddIbrahimErkal(343,"K19",docRef),seatAddIbrahimErkal(344,"K20",docRef),seatAddIbrahimErkal(345,"K21",docRef),seatAddIbrahimErkal(346,"NA",docRef),seatAddIbrahimErkal(347,"NA",docRef),seatAddIbrahimErkal(348,"NA",docRef)
                            seatAddIbrahimErkal(349,"NA",docRef),seatAddIbrahimErkal(350,"NA",docRef),seatAddIbrahimErkal(351,"L1",docRef),seatAddIbrahimErkal(352,"L2",docRef),seatAddIbrahimErkal(353,"L3",docRef),seatAddIbrahimErkal(354,"L4",docRef),seatAddIbrahimErkal(355,"L5",docRef),seatAddIbrahimErkal(356,"L6",docRef),seatAddIbrahimErkal(357,"L7",docRef),seatAddIbrahimErkal(358,"L8",docRef),seatAddIbrahimErkal(359,"L9",docRef),seatAddIbrahimErkal(360,"L10",docRef),seatAddIbrahimErkal(361,"L11",docRef),seatAddIbrahimErkal(362,"NA",docRef),seatAddIbrahimErkal(363,"NA",docRef),seatAddIbrahimErkal(364,"NA",docRef),seatAddIbrahimErkal(365,"L12",docRef),seatAddIbrahimErkal(366,"L13",docRef),seatAddIbrahimErkal(367,"L14",docRef),seatAddIbrahimErkal(368,"L15",docRef),seatAddIbrahimErkal(369,"L16,",docRef),seatAddIbrahimErkal(370,"L17",docRef),seatAddIbrahimErkal(371,"L18",docRef),seatAddIbrahimErkal(372,"L19",docRef),seatAddIbrahimErkal(373,"L20",docRef),seatAddIbrahimErkal(374,",L21",docRef),seatAddIbrahimErkal(375,"NA",docRef),seatAddIbrahimErkal(376,"NA",docRef),seatAddIbrahimErkal(377,"NA",docRef)
                            seatAddIbrahimErkal(378,"NA",docRef),seatAddIbrahimErkal(379,"NA",docRef),seatAddIbrahimErkal(380,"M1",docRef),seatAddIbrahimErkal(381,"M2",docRef),seatAddIbrahimErkal(382,"M3",docRef),seatAddIbrahimErkal(383,"M4",docRef),seatAddIbrahimErkal(384,"M5",docRef),seatAddIbrahimErkal(385,"M6",docRef),seatAddIbrahimErkal(386,"M7",docRef),seatAddIbrahimErkal(387,"M8",docRef),seatAddIbrahimErkal(388,"M9",docRef),seatAddIbrahimErkal(389,"M10",docRef),seatAddIbrahimErkal(390,"M11",docRef),seatAddIbrahimErkal(391,"NA",docRef),seatAddIbrahimErkal(392,"NA",docRef),seatAddIbrahimErkal(393,"NA",docRef),seatAddIbrahimErkal(394,"M12",docRef),seatAddIbrahimErkal(395,"M13",docRef),seatAddIbrahimErkal(396,"M14",docRef),seatAddIbrahimErkal(397,"M15",docRef),seatAddIbrahimErkal(398,"M16,",docRef),seatAddIbrahimErkal(399,"M17",docRef),seatAddIbrahimErkal(400,"M18",docRef),seatAddIbrahimErkal(401,"M19",docRef),seatAddIbrahimErkal(402,"M20",docRef),seatAddIbrahimErkal(403,"M21",docRef),seatAddIbrahimErkal(404,"NA",docRef),seatAddIbrahimErkal(405,"NA",docRef),seatAddIbrahimErkal(406,"NA",docRef)
                            seatAddIbrahimErkal(407,"NA",docRef),seatAddIbrahimErkal(408,"NA",docRef),seatAddIbrahimErkal(409,"N1",docRef),seatAddIbrahimErkal(410,"N2",docRef),seatAddIbrahimErkal(411,"N3",docRef),seatAddIbrahimErkal(412,"N4",docRef),seatAddIbrahimErkal(413,"N5",docRef),seatAddIbrahimErkal(414,"N6",docRef),seatAddIbrahimErkal(415,"N7",docRef),seatAddIbrahimErkal(416,"N8",docRef),seatAddIbrahimErkal(417,"N9",docRef),seatAddIbrahimErkal(418,"N10",docRef),seatAddIbrahimErkal(419,"N11",docRef),seatAddIbrahimErkal(420,"NA",docRef),seatAddIbrahimErkal(421,"NA",docRef),seatAddIbrahimErkal(422,"NA",docRef),seatAddIbrahimErkal(423,"N12",docRef),seatAddIbrahimErkal(424,"N13",docRef),seatAddIbrahimErkal(425,"N14",docRef),seatAddIbrahimErkal(426,"N15",docRef),seatAddIbrahimErkal(427,"N16,",docRef),seatAddIbrahimErkal(428,"N17",docRef),seatAddIbrahimErkal(429,"N18",docRef),seatAddIbrahimErkal(430,"N19",docRef),seatAddIbrahimErkal(431,"N20",docRef),seatAddIbrahimErkal(432,"N21",docRef),seatAddIbrahimErkal(433,"NA",docRef),seatAddIbrahimErkal(434,"NA",docRef),seatAddIbrahimErkal(435,"NA",docRef)
                            seatAddIbrahimErkal(436,"NA",docRef),seatAddIbrahimErkal(437,"NA",docRef),seatAddIbrahimErkal(438,"O1",docRef),seatAddIbrahimErkal(439,"O2",docRef),seatAddIbrahimErkal(440,"O3",docRef),seatAddIbrahimErkal(441,"O4",docRef),seatAddIbrahimErkal(442,"O5",docRef),seatAddIbrahimErkal(443,"O6",docRef),seatAddIbrahimErkal(444,"O7",docRef),seatAddIbrahimErkal(445,"O8",docRef),seatAddIbrahimErkal(446,"O9",docRef),seatAddIbrahimErkal(447,"O10",docRef),seatAddIbrahimErkal(448,"O11",docRef),seatAddIbrahimErkal(449,"NA",docRef),seatAddIbrahimErkal(450,"NA",docRef),seatAddIbrahimErkal(451,"NA",docRef),seatAddIbrahimErkal(452,"O12",docRef),seatAddIbrahimErkal(453,"O13",docRef),seatAddIbrahimErkal(454,"O14",docRef),seatAddIbrahimErkal(455,"O15",docRef),seatAddIbrahimErkal(456,"O16,",docRef),seatAddIbrahimErkal(457,"O17",docRef),seatAddIbrahimErkal(458,"O18",docRef),seatAddIbrahimErkal(459,"O19",docRef),seatAddIbrahimErkal(460,"O20",docRef),seatAddIbrahimErkal(461,"O21",docRef),seatAddIbrahimErkal(462,"NA",docRef),seatAddIbrahimErkal(463,"NA",docRef),seatAddIbrahimErkal(464,"NA",docRef)
                            seatAddIbrahimErkal(465,"NA",docRef),seatAddIbrahimErkal(466,"NA",docRef),seatAddIbrahimErkal(467,"P1",docRef),seatAddIbrahimErkal(468,"P2",docRef),seatAddIbrahimErkal(469,"P3",docRef),seatAddIbrahimErkal(470,"P4",docRef),seatAddIbrahimErkal(471,"P5",docRef),seatAddIbrahimErkal(472,"P6",docRef),seatAddIbrahimErkal(473,"P7",docRef),seatAddIbrahimErkal(474,"P8",docRef),seatAddIbrahimErkal(475,"P9",docRef),seatAddIbrahimErkal(476,"P10",docRef),seatAddIbrahimErkal(477,"P11",docRef),seatAddIbrahimErkal(478,"NA",docRef),seatAddIbrahimErkal(479,"NA",docRef),seatAddIbrahimErkal(480,"NA",docRef),seatAddIbrahimErkal(481,"P12",docRef),seatAddIbrahimErkal(482,"P13",docRef),seatAddIbrahimErkal(483,"P14",docRef),seatAddIbrahimErkal(484,"P15",docRef),seatAddIbrahimErkal(485,"P16,",docRef),seatAddIbrahimErkal(486,"P17",docRef),seatAddIbrahimErkal(487,"P18",docRef),seatAddIbrahimErkal(488,"P19",docRef),seatAddIbrahimErkal(489,"P20",docRef),seatAddIbrahimErkal(490,"P21",docRef),seatAddIbrahimErkal(491,"NA",docRef),seatAddIbrahimErkal(492,"NA",docRef),seatAddIbrahimErkal(493,"NA",docRef)
                            seatAddIbrahimErkal(494,"NA",docRef),seatAddIbrahimErkal(495,"NA",docRef),seatAddIbrahimErkal(496,"R1",docRef),seatAddIbrahimErkal(497,"R2",docRef),seatAddIbrahimErkal(498,"R3",docRef),seatAddIbrahimErkal(499,"R4",docRef),seatAddIbrahimErkal(500,"R5",docRef),seatAddIbrahimErkal(501,"R6",docRef),seatAddIbrahimErkal(502,"R7",docRef),seatAddIbrahimErkal(503,"R8",docRef),seatAddIbrahimErkal(504,"R9",docRef),seatAddIbrahimErkal(505,"R10",docRef),seatAddIbrahimErkal(506,"R11",docRef),seatAddIbrahimErkal(507,"NA",docRef),seatAddIbrahimErkal(508,"NA",docRef),seatAddIbrahimErkal(509,"NA",docRef),seatAddIbrahimErkal(510,"R12",docRef),seatAddIbrahimErkal(511,"R13",docRef),seatAddIbrahimErkal(512,"R14",docRef),seatAddIbrahimErkal(513,"R15",docRef),seatAddIbrahimErkal(514,"R16,",docRef),seatAddIbrahimErkal(515,"R17",docRef),seatAddIbrahimErkal(516,"R18",docRef),seatAddIbrahimErkal(517,"R19",docRef),seatAddIbrahimErkal(518,"R20",docRef),seatAddIbrahimErkal(519,"R21",docRef),seatAddIbrahimErkal(520,"NA",docRef),seatAddIbrahimErkal(521,"NA",docRef),seatAddIbrahimErkal(522,"NA",docRef)
                            seatAddIbrahimErkal(523,"NA",docRef),seatAddIbrahimErkal(524,"NA",docRef),seatAddIbrahimErkal(525,"S1",docRef),seatAddIbrahimErkal(526,"S2",docRef),seatAddIbrahimErkal(527,"S3",docRef),seatAddIbrahimErkal(528,"S4",docRef),seatAddIbrahimErkal(529,"S5",docRef),seatAddIbrahimErkal(530,"S6",docRef),seatAddIbrahimErkal(531,"S7",docRef),seatAddIbrahimErkal(532,"S8",docRef),seatAddIbrahimErkal(533,"S9",docRef),seatAddIbrahimErkal(534,"S10",docRef),seatAddIbrahimErkal(535,"S11",docRef),seatAddIbrahimErkal(536,"NA",docRef),seatAddIbrahimErkal(537,"NA",docRef),seatAddIbrahimErkal(538,"NA",docRef),seatAddIbrahimErkal(539,"S12",docRef),seatAddIbrahimErkal(540,"S13",docRef),seatAddIbrahimErkal(541,"S14",docRef),seatAddIbrahimErkal(542,"S15",docRef),seatAddIbrahimErkal(543,"S16,",docRef),seatAddIbrahimErkal(544,"S17",docRef),seatAddIbrahimErkal(545,"S18",docRef),seatAddIbrahimErkal(546,"S19",docRef),seatAddIbrahimErkal(547,"S20",docRef),seatAddIbrahimErkal(548,"S21",docRef),seatAddIbrahimErkal(549,"NA",docRef),seatAddIbrahimErkal(550,"NA",docRef),seatAddIbrahimErkal(551,"NA",docRef)
                            seatAddIbrahimErkal(552,"NA",docRef),seatAddIbrahimErkal(553,"NA",docRef),seatAddIbrahimErkal(554,"NA",docRef),seatAddIbrahimErkal(555,"NA",docRef),seatAddIbrahimErkal(556,"NA",docRef),seatAddIbrahimErkal(557,"NA",docRef),seatAddIbrahimErkal(558,"NA",docRef),seatAddIbrahimErkal(559,"NA",docRef),seatAddIbrahimErkal(560,"NA",docRef),seatAddIbrahimErkal(561,"NA",docRef),seatAddIbrahimErkal(562,"NA",docRef),seatAddIbrahimErkal(563,"NA",docRef),seatAddIbrahimErkal(564,"NA",docRef),seatAddIbrahimErkal(565,"NA",docRef),seatAddIbrahimErkal(566,"NA",docRef),seatAddIbrahimErkal(567,"NA",docRef),seatAddIbrahimErkal(568,"NA",docRef),seatAddIbrahimErkal(569,"NA",docRef),seatAddIbrahimErkal(570,"NA",docRef),seatAddIbrahimErkal(571,"NA",docRef),seatAddIbrahimErkal(572,"NA",docRef),seatAddIbrahimErkal(573,"NA",docRef),seatAddIbrahimErkal(574,"NA",docRef),seatAddIbrahimErkal(575,"NA",docRef),seatAddIbrahimErkal(576,"NA",docRef),seatAddIbrahimErkal(577,"NA",docRef),seatAddIbrahimErkal(578,"NA",docRef),seatAddIbrahimErkal(579,"NA",docRef),seatAddIbrahimErkal(580,"NA",docRef)  
                            seatAddIbrahimErkal(581,"NA",docRef),seatAddIbrahimErkal(582,"T1",docRef),seatAddIbrahimErkal(583,"T2",docRef),seatAddIbrahimErkal(584,"T3",docRef),seatAddIbrahimErkal(585,"T4",docRef),seatAddIbrahimErkal(586,"T5",docRef),seatAddIbrahimErkal(587,"T6",docRef),seatAddIbrahimErkal(588,"T7",docRef),seatAddIbrahimErkal(589,"T8",docRef),seatAddIbrahimErkal(590,"T9",docRef),seatAddIbrahimErkal(591,"T10",docRef),seatAddIbrahimErkal(592,"T11",docRef),seatAddIbrahimErkal(593,"T12",docRef),seatAddIbrahimErkal(594,"NA",docRef),seatAddIbrahimErkal(595,"NA",docRef),seatAddIbrahimErkal(596,"NA",docRef),seatAddIbrahimErkal(597,"T13",docRef),seatAddIbrahimErkal(598,"T14",docRef),seatAddIbrahimErkal(599,"T15",docRef),seatAddIbrahimErkal(600,"T16",docRef),seatAddIbrahimErkal(601,"T17,",docRef),seatAddIbrahimErkal(602,"T18",docRef),seatAddIbrahimErkal(603,"T19",docRef),seatAddIbrahimErkal(604,"T20",docRef),seatAddIbrahimErkal(605,"T21",docRef),seatAddIbrahimErkal(606,"T22",docRef),seatAddIbrahimErkal(607,"T23",docRef),seatAddIbrahimErkal(608,"T24",docRef),seatAddIbrahimErkal(609,"NA",docRef)
                            seatAddIbrahimErkal(610,"NA",docRef),seatAddIbrahimErkal(611,"U1",docRef),seatAddIbrahimErkal(612,"U2",docRef),seatAddIbrahimErkal(613,"U3",docRef),seatAddIbrahimErkal(614,"U4",docRef),seatAddIbrahimErkal(615,"U5",docRef),seatAddIbrahimErkal(616,"U6",docRef),seatAddIbrahimErkal(617,"NA",docRef),seatAddIbrahimErkal(618,"NA",docRef),seatAddIbrahimErkal(619,"U7",docRef),seatAddIbrahimErkal(620,"U8",docRef),seatAddIbrahimErkal(621,"U9",docRef),seatAddIbrahimErkal(622,"U10",docRef),seatAddIbrahimErkal(623,"NA",docRef),seatAddIbrahimErkal(624,"NA",docRef),seatAddIbrahimErkal(625,"NA",docRef),seatAddIbrahimErkal(626,"U11",docRef),seatAddIbrahimErkal(627,"U12",docRef),seatAddIbrahimErkal(628,"U13",docRef),seatAddIbrahimErkal(629,"U14",docRef),seatAddIbrahimErkal(630,"U15,",docRef),seatAddIbrahimErkal(631,"U16",docRef),seatAddIbrahimErkal(632,"U17",docRef),seatAddIbrahimErkal(633,"U18",docRef),seatAddIbrahimErkal(634,"U19",docRef),seatAddIbrahimErkal(635,"U20",docRef),seatAddIbrahimErkal(636,"U21",docRef),seatAddIbrahimErkal(637,"U22",docRef),seatAddIbrahimErkal(638,"U23",docRef)
                            seatAddIbrahimErkal(639,"NA",docRef),seatAddIbrahimErkal(640,"V1",docRef),seatAddIbrahimErkal(641,"V2",docRef),seatAddIbrahimErkal(642,"V3",docRef),seatAddIbrahimErkal(643,"V4",docRef),seatAddIbrahimErkal(644,"V5",docRef),seatAddIbrahimErkal(645,"V6",docRef),seatAddIbrahimErkal(646,"NA",docRef),seatAddIbrahimErkal(647,"NA",docRef),seatAddIbrahimErkal(648,"NA",docRef),seatAddIbrahimErkal(649,"V7",docRef),seatAddIbrahimErkal(650,"V8",docRef),seatAddIbrahimErkal(651,"V9",docRef),seatAddIbrahimErkal(652,"NA",docRef),seatAddIbrahimErkal(653,"NA",docRef),seatAddIbrahimErkal(654,"NA",docRef),seatAddIbrahimErkal(655,"NA",docRef),seatAddIbrahimErkal(656,"NA",docRef),seatAddIbrahimErkal(657,"NA",docRef),seatAddIbrahimErkal(658,"NA",docRef),seatAddIbrahimErkal(659,"NA,",docRef),seatAddIbrahimErkal(660,"NA",docRef),seatAddIbrahimErkal(661,"NA",docRef),seatAddIbrahimErkal(662,"NA",docRef),seatAddIbrahimErkal(663,"V17",docRef),seatAddIbrahimErkal(664,"V18",docRef),seatAddIbrahimErkal(665,"V19",docRef),seatAddIbrahimErkal(666,"V20",docRef),seatAddIbrahimErkal(667,"V21",docRef)
                            seatAddIbrahimErkal(668,"Y1",docRef),seatAddIbrahimErkal(669,"Y2",docRef),seatAddIbrahimErkal(670,"Y3",docRef),seatAddIbrahimErkal(671,"Y4",docRef),seatAddIbrahimErkal(672,"Y5",docRef),seatAddIbrahimErkal(673,"Y6",docRef),seatAddIbrahimErkal(674,"Y7",docRef),seatAddIbrahimErkal(675,"NA",docRef),seatAddIbrahimErkal(676,"NA",docRef),seatAddIbrahimErkal(677,"NA",docRef),seatAddIbrahimErkal(678,"Y8",docRef),seatAddIbrahimErkal(679,"Y9",docRef),seatAddIbrahimErkal(680,"Y10",docRef),seatAddIbrahimErkal(681,"NA",docRef),seatAddIbrahimErkal(682,"NA",docRef),seatAddIbrahimErkal(683,"NA",docRef),seatAddIbrahimErkal(684,"NA",docRef),seatAddIbrahimErkal(685,"NA",docRef),seatAddIbrahimErkal(686,"NA",docRef),seatAddIbrahimErkal(687,"NA",docRef),seatAddIbrahimErkal(688,"NA,",docRef),seatAddIbrahimErkal(689,"NA",docRef),seatAddIbrahimErkal(690,"NA",docRef),seatAddIbrahimErkal(691,"NA",docRef),seatAddIbrahimErkal(692,"Y18",docRef),seatAddIbrahimErkal(693,"Y19",docRef),seatAddIbrahimErkal(694,"Y20",docRef),seatAddIbrahimErkal(695,"Y21",docRef),seatAddIbrahimErkal(696,"Y22",docRef);
                          




                          } else if (activityProtocolSeatTextView.value == 3) {

                            seatAddIbrahimErkalProtocol(1,"NA",docRef),seatAddIbrahimErkalProtocol(2,"NA",docRef),seatAddIbrahimErkalProtocol(3,"A1",docRef),seatAddIbrahimErkalProtocol(4,"A2",docRef),seatAddIbrahimErkalProtocol(5,"A3",docRef),seatAddIbrahimErkalProtocol(6,"A4",docRef),seatAddIbrahimErkalProtocol(7,"A5",docRef),seatAddIbrahimErkalProtocol(8,"A6",docRef),seatAddIbrahimErkalProtocol(9,"A7",docRef),seatAddIbrahimErkalProtocol(10,"A8",docRef),seatAddIbrahimErkalProtocol(11,"A9",docRef),seatAddIbrahimErkalProtocol(12,"A10",docRef),seatAddIbrahimErkalProtocol(13,"A11",docRef),seatAddIbrahimErkalProtocol(14,"A12",docRef),seatAddIbrahimErkalProtocol(15,"A13",docRef),seatAddIbrahimErkalProtocol(16,"A14",docRef),seatAddIbrahimErkalProtocol(17,"A15",docRef),seatAddIbrahimErkalProtocol(18,"A16",docRef),seatAddIbrahimErkalProtocol(19,"A17",docRef),seatAddIbrahimErkalProtocol(20,"A18",docRef),seatAddIbrahimErkalProtocol(21,"A19,",docRef),seatAddIbrahimErkalProtocol(22,"A20",docRef),seatAddIbrahimErkalProtocol(23,"A21",docRef),seatAddIbrahimErkalProtocol(24,"A22",docRef),seatAddIbrahimErkalProtocol(25,"A23",docRef),seatAddIbrahimErkalProtocol(26,"A24",docRef),seatAddIbrahimErkalProtocol(27,"NA",docRef),seatAddIbrahimErkalProtocol(28,"NA",docRef),seatAddIbrahimErkalProtocol(29,"NA",docRef)
                            seatAddIbrahimErkalProtocol(30,"NA",docRef),seatAddIbrahimErkalProtocol(31,"NA",docRef),seatAddIbrahimErkalProtocol(32,"B1",docRef),seatAddIbrahimErkalProtocol(33,"B2",docRef),seatAddIbrahimErkalProtocol(34,"B3",docRef),seatAddIbrahimErkalProtocol(35,"B4",docRef),seatAddIbrahimErkalProtocol(36,"B5",docRef),seatAddIbrahimErkalProtocol(37,"B6",docRef),seatAddIbrahimErkalProtocol(38,"B7",docRef),seatAddIbrahimErkalProtocol(39,"B8",docRef),seatAddIbrahimErkalProtocol(40,"B9",docRef),seatAddIbrahimErkalProtocol(41,"B10",docRef),seatAddIbrahimErkalProtocol(42,"B11",docRef),seatAddIbrahimErkalProtocol(43,"B12",docRef),seatAddIbrahimErkalProtocol(44,"B13",docRef),seatAddIbrahimErkalProtocol(45,"B14",docRef),seatAddIbrahimErkalProtocol(46,"B15",docRef),seatAddIbrahimErkalProtocol(47,"B16",docRef),seatAddIbrahimErkalProtocol(48,"B17",docRef),seatAddIbrahimErkalProtocol(49,"B18",docRef),seatAddIbrahimErkalProtocol(50,"B19,",docRef),seatAddIbrahimErkalProtocol(51,"B20",docRef),seatAddIbrahimErkalProtocol(52,"B21",docRef),seatAddIbrahimErkalProtocol(53,"B22",docRef),seatAddIbrahimErkalProtocol(54,"B23",docRef),seatAddIbrahimErkalProtocol(55,"B24",docRef),seatAddIbrahimErkalProtocol(56,"NA",docRef),seatAddIbrahimErkalProtocol(57,"NA",docRef),seatAddIbrahimErkalProtocol(58,"NA",docRef)
                            seatAddIbrahimErkalProtocol(59,"NA",docRef),seatAddIbrahimErkalProtocol(60,"NA",docRef),seatAddIbrahimErkalProtocol(61,"C1",docRef),seatAddIbrahimErkalProtocol(62,"C2",docRef),seatAddIbrahimErkalProtocol(63,"C3",docRef),seatAddIbrahimErkalProtocol(64,"C4",docRef),seatAddIbrahimErkalProtocol(65,"C5",docRef),seatAddIbrahimErkalProtocol(66,"C6",docRef),seatAddIbrahimErkalProtocol(67,"C7",docRef),seatAddIbrahimErkalProtocol(68,"C8",docRef),seatAddIbrahimErkalProtocol(69,"C9",docRef),seatAddIbrahimErkalProtocol(70,"C10",docRef),seatAddIbrahimErkalProtocol(71,"C11",docRef),seatAddIbrahimErkalProtocol(72,"C12",docRef),seatAddIbrahimErkalProtocol(73,"C13",docRef),seatAddIbrahimErkalProtocol(74,"C14",docRef),seatAddIbrahimErkalProtocol(75,"C15",docRef),seatAddIbrahimErkalProtocol(76,"C16",docRef),seatAddIbrahimErkalProtocol(77,"C17",docRef),seatAddIbrahimErkalProtocol(78,"C18",docRef),seatAddIbrahimErkalProtocol(79,"C19,",docRef),seatAddIbrahimErkalProtocol(80,"C20",docRef),seatAddIbrahimErkalProtocol(81,"C21",docRef),seatAddIbrahimErkalProtocol(82,"C22",docRef),seatAddIbrahimErkalProtocol(83,"C23",docRef),seatAddIbrahimErkalProtocol(84,"C24",docRef),seatAddIbrahimErkalProtocol(85,"NA",docRef),seatAddIbrahimErkalProtocol(86,"NA",docRef),seatAddIbrahimErkalProtocol(87,"NA",docRef)
                            seatAddIbrahimErkal(88,"NA",docRef),seatAddIbrahimErkal(89,"NA",docRef),seatAddIbrahimErkal(90,"D1",docRef),seatAddIbrahimErkal(91,"D2",docRef),seatAddIbrahimErkal(92,"D3",docRef),seatAddIbrahimErkal(93,"D4",docRef),seatAddIbrahimErkal(94,"D5",docRef),seatAddIbrahimErkal(95,"D6",docRef),seatAddIbrahimErkal(96,"D7",docRef),seatAddIbrahimErkal(97,"D8",docRef),seatAddIbrahimErkal(98,"D9",docRef),seatAddIbrahimErkal(99,"D10",docRef),seatAddIbrahimErkal(100,"D11",docRef),seatAddIbrahimErkal(101,"D12",docRef),seatAddIbrahimErkal(102,"D13",docRef),seatAddIbrahimErkal(103,"D14",docRef),seatAddIbrahimErkal(104,"D15",docRef),seatAddIbrahimErkal(105,"D16",docRef),seatAddIbrahimErkal(106,"D17",docRef),seatAddIbrahimErkal(107,"D18",docRef),seatAddIbrahimErkal(108,"D19,",docRef),seatAddIbrahimErkal(109,"D20",docRef),seatAddIbrahimErkal(110,"D21",docRef),seatAddIbrahimErkal(111,"D22",docRef),seatAddIbrahimErkal(112,"D23",docRef),seatAddIbrahimErkal(113,"D24",docRef),seatAddIbrahimErkal(114,"NA",docRef),seatAddIbrahimErkal(115,"NA",docRef),seatAddIbrahimErkal(116,"NA",docRef)
                            seatAddIbrahimErkal(117,"NA",docRef),seatAddIbrahimErkal(118,"NA",docRef),seatAddIbrahimErkal(119,"E1",docRef),seatAddIbrahimErkal(120,"E2",docRef),seatAddIbrahimErkal(121,"E3",docRef),seatAddIbrahimErkal(122,"E4",docRef),seatAddIbrahimErkal(123,"E5",docRef),seatAddIbrahimErkal(124,"E6",docRef),seatAddIbrahimErkal(125,"E7",docRef),seatAddIbrahimErkal(126,"E8",docRef),seatAddIbrahimErkal(127,"E9",docRef),seatAddIbrahimErkal(128,"E10",docRef),seatAddIbrahimErkal(129,"E11",docRef),seatAddIbrahimErkal(130,"E12",docRef),seatAddIbrahimErkal(131,"E13",docRef),seatAddIbrahimErkal(132,"E14",docRef),seatAddIbrahimErkal(133,"E15",docRef),seatAddIbrahimErkal(134,"E16",docRef),seatAddIbrahimErkal(135,"E17",docRef),seatAddIbrahimErkal(136,"E18",docRef),seatAddIbrahimErkal(137,"E19",docRef),seatAddIbrahimErkal(138,"E20",docRef),seatAddIbrahimErkal(139,"E21",docRef),seatAddIbrahimErkal(140,"E22",docRef),seatAddIbrahimErkal(141,"E23",docRef),seatAddIbrahimErkal(142,"E24",docRef),seatAddIbrahimErkal(143,"NA",docRef),seatAddIbrahimErkal(144,"NA",docRef),seatAddIbrahimErkal(145,"NA",docRef)
                            seatAddIbrahimErkal(146,"NA",docRef),seatAddIbrahimErkal(147,"NA",docRef),seatAddIbrahimErkal(148,"F1",docRef),seatAddIbrahimErkal(149,"F2",docRef),seatAddIbrahimErkal(150,"F3",docRef),seatAddIbrahimErkal(151,"F4",docRef),seatAddIbrahimErkal(152,"F5",docRef),seatAddIbrahimErkal(153,"F6",docRef),seatAddIbrahimErkal(154,"F7",docRef),seatAddIbrahimErkal(155,"F8",docRef),seatAddIbrahimErkal(156,"F9",docRef),seatAddIbrahimErkal(157,"F10",docRef),seatAddIbrahimErkal(158,"F11",docRef),seatAddIbrahimErkal(159,"F12",docRef),seatAddIbrahimErkal(160,"F13",docRef),seatAddIbrahimErkal(161,"F14",docRef),seatAddIbrahimErkal(162,"F15",docRef),seatAddIbrahimErkal(163,"F16",docRef),seatAddIbrahimErkal(164,"F17",docRef),seatAddIbrahimErkal(165,"F18",docRef),seatAddIbrahimErkal(166,"F19",docRef),seatAddIbrahimErkal(167,"E20",docRef),seatAddIbrahimErkal(168,"F21",docRef),seatAddIbrahimErkal(169,"F22",docRef),seatAddIbrahimErkal(170,"F23",docRef),seatAddIbrahimErkal(171,"F24",docRef),seatAddIbrahimErkal(172,"NA",docRef),seatAddIbrahimErkal(173,"NA",docRef),seatAddIbrahimErkal(174,"NA",docRef)
                            seatAddIbrahimErkal(175,"NA",docRef),seatAddIbrahimErkal(176,"NA",docRef),seatAddIbrahimErkal(177,"G1",docRef),seatAddIbrahimErkal(178,"G2",docRef),seatAddIbrahimErkal(179,"G3",docRef),seatAddIbrahimErkal(180,"G4",docRef),seatAddIbrahimErkal(181,"G5",docRef),seatAddIbrahimErkal(182,"G6",docRef),seatAddIbrahimErkal(183,"G7",docRef),seatAddIbrahimErkal(184,"G8",docRef),seatAddIbrahimErkal(185,"G9",docRef),seatAddIbrahimErkal(186,"G10",docRef),seatAddIbrahimErkal(187,"G11",docRef),seatAddIbrahimErkal(188,"G12",docRef),seatAddIbrahimErkal(189,"G13",docRef),seatAddIbrahimErkal(190,"G14",docRef),seatAddIbrahimErkal(191,"G15",docRef),seatAddIbrahimErkal(192,"G16",docRef),seatAddIbrahimErkal(193,"G17",docRef),seatAddIbrahimErkal(194,"G18",docRef),seatAddIbrahimErkal(195,"G19",docRef),seatAddIbrahimErkal(196,"G20",docRef),seatAddIbrahimErkal(197,"G21",docRef),seatAddIbrahimErkal(198,"G22",docRef),seatAddIbrahimErkal(199,"G23",docRef),seatAddIbrahimErkal(200,"G24",docRef),seatAddIbrahimErkal(201,"NA",docRef),seatAddIbrahimErkal(202,"NA",docRef),seatAddIbrahimErkal(203,"NA",docRef)
                            seatAddIbrahimErkal(204,"NA",docRef),seatAddIbrahimErkal(205,"NA",docRef),seatAddIbrahimErkal(206,"H1",docRef),seatAddIbrahimErkal(207,"H2",docRef),seatAddIbrahimErkal(208,"H3",docRef),seatAddIbrahimErkal(209,"H4",docRef),seatAddIbrahimErkal(210,"H5",docRef),seatAddIbrahimErkal(211,"H6",docRef),seatAddIbrahimErkal(212,"H7",docRef),seatAddIbrahimErkal(213,"H8",docRef),seatAddIbrahimErkal(214,"H9",docRef),seatAddIbrahimErkal(215,"H10",docRef),seatAddIbrahimErkal(216,"H11",docRef),seatAddIbrahimErkal(217,"H12",docRef),seatAddIbrahimErkal(218,"H13",docRef),seatAddIbrahimErkal(219,"H14",docRef),seatAddIbrahimErkal(220,"H15",docRef),seatAddIbrahimErkal(221,"H16",docRef),seatAddIbrahimErkal(222,"H17",docRef),seatAddIbrahimErkal(223,"H18",docRef),seatAddIbrahimErkal(224,"H19",docRef),seatAddIbrahimErkal(225,"H20",docRef),seatAddIbrahimErkal(226,"H21",docRef),seatAddIbrahimErkal(227,"H22",docRef),seatAddIbrahimErkal(228,"H23",docRef),seatAddIbrahimErkal(229,"H24",docRef),seatAddIbrahimErkal(230,"NA",docRef),seatAddIbrahimErkal(231,"NA",docRef),seatAddIbrahimErkal(232,"NA",docRef)
                            seatAddIbrahimErkal(233,"NA",docRef),seatAddIbrahimErkal(234,"NA",docRef),seatAddIbrahimErkal(235,"I1",docRef),seatAddIbrahimErkal(236,"I2",docRef),seatAddIbrahimErkal(237,"I3",docRef),seatAddIbrahimErkal(238,"I4",docRef),seatAddIbrahimErkal(239,"I5",docRef),seatAddIbrahimErkal(240,"I6",docRef),seatAddIbrahimErkal(241,"I7",docRef),seatAddIbrahimErkal(242,"I8",docRef),seatAddIbrahimErkal(243,"I9",docRef),seatAddIbrahimErkal(244,"I10",docRef),seatAddIbrahimErkal(245,"I11",docRef),seatAddIbrahimErkal(246,"I12",docRef),seatAddIbrahimErkal(247,"I13",docRef),seatAddIbrahimErkal(248,"I14",docRef),seatAddIbrahimErkal(249,"I15",docRef),seatAddIbrahimErkal(250,"I16",docRef),seatAddIbrahimErkal(251,"I17",docRef),seatAddIbrahimErkal(252,"I18",docRef),seatAddIbrahimErkal(253,"I19",docRef),seatAddIbrahimErkal(254,"I20",docRef),seatAddIbrahimErkal(255,"I21",docRef),seatAddIbrahimErkal(256,"I22",docRef),seatAddIbrahimErkal(257,"I23",docRef),seatAddIbrahimErkal(258,"I24",docRef),seatAddIbrahimErkal(259,"NA",docRef),seatAddIbrahimErkal(260,"NA",docRef),seatAddIbrahimErkal(261,"NA",docRef)
                            seatAddIbrahimErkal(262,"NA",docRef),seatAddIbrahimErkal(263,"NA",docRef),seatAddIbrahimErkal(264,"J1",docRef),seatAddIbrahimErkal(265,"J2",docRef),seatAddIbrahimErkal(266,"J3",docRef),seatAddIbrahimErkal(267,"J4",docRef),seatAddIbrahimErkal(268,"J5",docRef),seatAddIbrahimErkal(269,"J6",docRef),seatAddIbrahimErkal(270,"J7",docRef),seatAddIbrahimErkal(271,"J8",docRef),seatAddIbrahimErkal(272,"J9",docRef),seatAddIbrahimErkal(273,"J10",docRef),seatAddIbrahimErkal(274,"J11",docRef),seatAddIbrahimErkal(275,"J12",docRef),seatAddIbrahimErkal(276,"J13",docRef),seatAddIbrahimErkal(277,"J14",docRef),seatAddIbrahimErkal(278,"J15",docRef),seatAddIbrahimErkal(279,"J16",docRef),seatAddIbrahimErkal(280,"J17",docRef),seatAddIbrahimErkal(281,"J18",docRef),seatAddIbrahimErkal(282,"J19",docRef),seatAddIbrahimErkal(283,"J20",docRef),seatAddIbrahimErkal(284,"J21",docRef),seatAddIbrahimErkal(285,"J22",docRef),seatAddIbrahimErkal(286,"J23",docRef),seatAddIbrahimErkal(287,"J24",docRef),seatAddIbrahimErkal(288,"NA",docRef),seatAddIbrahimErkal(289,"NA",docRef),seatAddIbrahimErkal(290,"NA",docRef)
                            seatAddIbrahimErkal(291,"NA",docRef),seatAddIbrahimErkal(292,"NA",docRef),seatAddIbrahimErkal(293,"NA",docRef),seatAddIbrahimErkal(294,"NA",docRef),seatAddIbrahimErkal(295,"NA",docRef),seatAddIbrahimErkal(296,"NA",docRef),seatAddIbrahimErkal(297,"NA",docRef),seatAddIbrahimErkal(298,"NA",docRef),seatAddIbrahimErkal(299,"NA",docRef),seatAddIbrahimErkal(300,"NA",docRef),seatAddIbrahimErkal(301,"NA",docRef),seatAddIbrahimErkal(302,"NA",docRef),seatAddIbrahimErkal(303,"NA",docRef),seatAddIbrahimErkal(304,"NA",docRef),seatAddIbrahimErkal(305,"NA",docRef),seatAddIbrahimErkal(306,"NA",docRef),seatAddIbrahimErkal(307,"NA",docRef),seatAddIbrahimErkal(308,"NA",docRef),seatAddIbrahimErkal(309,"NA",docRef),seatAddIbrahimErkal(310,"NA",docRef),seatAddIbrahimErkal(311,"NA",docRef),seatAddIbrahimErkal(312,"NA",docRef),seatAddIbrahimErkal(313,"NA",docRef),seatAddIbrahimErkal(314,"NA",docRef),seatAddIbrahimErkal(315,"NA",docRef),seatAddIbrahimErkal(316,"NA",docRef),seatAddIbrahimErkal(317,"NA",docRef),seatAddIbrahimErkal(318,"NA",docRef),seatAddIbrahimErkal(319,"NA",docRef)  
                            seatAddIbrahimErkal(320,"NA",docRef),seatAddIbrahimErkal(321,"NA",docRef),seatAddIbrahimErkal(322,"K1",docRef),seatAddIbrahimErkal(323,"K2",docRef),seatAddIbrahimErkal(324,"K3",docRef),seatAddIbrahimErkal(325,"K4",docRef),seatAddIbrahimErkal(326,"K5",docRef),seatAddIbrahimErkal(327,"K6",docRef),seatAddIbrahimErkal(328,"K7",docRef),seatAddIbrahimErkal(329,"K8",docRef),seatAddIbrahimErkal(330,"K9",docRef),seatAddIbrahimErkal(331,"K10",docRef),seatAddIbrahimErkal(332,"K11",docRef),seatAddIbrahimErkal(333,"NA",docRef),seatAddIbrahimErkal(334,"NA",docRef),seatAddIbrahimErkal(335,"NA",docRef),seatAddIbrahimErkal(336,"K12",docRef),seatAddIbrahimErkal(337,"K13",docRef),seatAddIbrahimErkal(338,"K14",docRef),seatAddIbrahimErkal(339,"K15",docRef),seatAddIbrahimErkal(340,"K16,",docRef),seatAddIbrahimErkal(341,"K17",docRef),seatAddIbrahimErkal(342,"K18",docRef),seatAddIbrahimErkal(343,"K19",docRef),seatAddIbrahimErkal(344,"K20",docRef),seatAddIbrahimErkal(345,"K21",docRef),seatAddIbrahimErkal(346,"NA",docRef),seatAddIbrahimErkal(347,"NA",docRef),seatAddIbrahimErkal(348,"NA",docRef)
                            seatAddIbrahimErkal(349,"NA",docRef),seatAddIbrahimErkal(350,"NA",docRef),seatAddIbrahimErkal(351,"L1",docRef),seatAddIbrahimErkal(352,"L2",docRef),seatAddIbrahimErkal(353,"L3",docRef),seatAddIbrahimErkal(354,"L4",docRef),seatAddIbrahimErkal(355,"L5",docRef),seatAddIbrahimErkal(356,"L6",docRef),seatAddIbrahimErkal(357,"L7",docRef),seatAddIbrahimErkal(358,"L8",docRef),seatAddIbrahimErkal(359,"L9",docRef),seatAddIbrahimErkal(360,"L10",docRef),seatAddIbrahimErkal(361,"L11",docRef),seatAddIbrahimErkal(362,"NA",docRef),seatAddIbrahimErkal(363,"NA",docRef),seatAddIbrahimErkal(364,"NA",docRef),seatAddIbrahimErkal(365,"L12",docRef),seatAddIbrahimErkal(366,"L13",docRef),seatAddIbrahimErkal(367,"L14",docRef),seatAddIbrahimErkal(368,"L15",docRef),seatAddIbrahimErkal(369,"L16",docRef),seatAddIbrahimErkal(370,"L17",docRef),seatAddIbrahimErkal(371,"L18",docRef),seatAddIbrahimErkal(372,"L19",docRef),seatAddIbrahimErkal(373,"L20",docRef),seatAddIbrahimErkal(374,",L21",docRef),seatAddIbrahimErkal(375,"NA",docRef),seatAddIbrahimErkal(376,"NA",docRef),seatAddIbrahimErkal(377,"NA",docRef)
                            seatAddIbrahimErkal(378,"NA",docRef),seatAddIbrahimErkal(379,"NA",docRef),seatAddIbrahimErkal(380,"M1",docRef),seatAddIbrahimErkal(381,"M2",docRef),seatAddIbrahimErkal(382,"M3",docRef),seatAddIbrahimErkal(383,"M4",docRef),seatAddIbrahimErkal(384,"M5",docRef),seatAddIbrahimErkal(385,"M6",docRef),seatAddIbrahimErkal(386,"M7",docRef),seatAddIbrahimErkal(387,"M8",docRef),seatAddIbrahimErkal(388,"M9",docRef),seatAddIbrahimErkal(389,"M10",docRef),seatAddIbrahimErkal(390,"M11",docRef),seatAddIbrahimErkal(391,"NA",docRef),seatAddIbrahimErkal(392,"NA",docRef),seatAddIbrahimErkal(393,"NA",docRef),seatAddIbrahimErkal(394,"M12",docRef),seatAddIbrahimErkal(395,"M13",docRef),seatAddIbrahimErkal(396,"M14",docRef),seatAddIbrahimErkal(397,"M15",docRef),seatAddIbrahimErkal(398,"M16",docRef),seatAddIbrahimErkal(399,"M17",docRef),seatAddIbrahimErkal(400,"M18",docRef),seatAddIbrahimErkal(401,"M19",docRef),seatAddIbrahimErkal(402,"M20",docRef),seatAddIbrahimErkal(403,"M21",docRef),seatAddIbrahimErkal(404,"NA",docRef),seatAddIbrahimErkal(405,"NA",docRef),seatAddIbrahimErkal(406,"NA",docRef)
                            seatAddIbrahimErkal(407,"NA",docRef),seatAddIbrahimErkal(408,"NA",docRef),seatAddIbrahimErkal(409,"N1",docRef),seatAddIbrahimErkal(410,"N2",docRef),seatAddIbrahimErkal(411,"N3",docRef),seatAddIbrahimErkal(412,"N4",docRef),seatAddIbrahimErkal(413,"N5",docRef),seatAddIbrahimErkal(414,"N6",docRef),seatAddIbrahimErkal(415,"N7",docRef),seatAddIbrahimErkal(416,"N8",docRef),seatAddIbrahimErkal(417,"N9",docRef),seatAddIbrahimErkal(418,"N10",docRef),seatAddIbrahimErkal(419,"N11",docRef),seatAddIbrahimErkal(420,"NA",docRef),seatAddIbrahimErkal(421,"NA",docRef),seatAddIbrahimErkal(422,"NA",docRef),seatAddIbrahimErkal(423,"N12",docRef),seatAddIbrahimErkal(424,"N13",docRef),seatAddIbrahimErkal(425,"N14",docRef),seatAddIbrahimErkal(426,"N15",docRef),seatAddIbrahimErkal(427,"N16",docRef),seatAddIbrahimErkal(428,"N17",docRef),seatAddIbrahimErkal(429,"N18",docRef),seatAddIbrahimErkal(430,"N19",docRef),seatAddIbrahimErkal(431,"N20",docRef),seatAddIbrahimErkal(432,"N21",docRef),seatAddIbrahimErkal(433,"NA",docRef),seatAddIbrahimErkal(434,"NA",docRef),seatAddIbrahimErkal(435,"NA",docRef)
                            seatAddIbrahimErkal(436,"NA",docRef),seatAddIbrahimErkal(437,"NA",docRef),seatAddIbrahimErkal(438,"O1",docRef),seatAddIbrahimErkal(439,"O2",docRef),seatAddIbrahimErkal(440,"O3",docRef),seatAddIbrahimErkal(441,"O4",docRef),seatAddIbrahimErkal(442,"O5",docRef),seatAddIbrahimErkal(443,"O6",docRef),seatAddIbrahimErkal(444,"O7",docRef),seatAddIbrahimErkal(445,"O8",docRef),seatAddIbrahimErkal(446,"O9",docRef),seatAddIbrahimErkal(447,"O10",docRef),seatAddIbrahimErkal(448,"O11",docRef),seatAddIbrahimErkal(449,"NA",docRef),seatAddIbrahimErkal(450,"NA",docRef),seatAddIbrahimErkal(451,"NA",docRef),seatAddIbrahimErkal(452,"O12",docRef),seatAddIbrahimErkal(453,"O13",docRef),seatAddIbrahimErkal(454,"O14",docRef),seatAddIbrahimErkal(455,"O15",docRef),seatAddIbrahimErkal(456,"O16",docRef),seatAddIbrahimErkal(457,"O17",docRef),seatAddIbrahimErkal(458,"O18",docRef),seatAddIbrahimErkal(459,"O19",docRef),seatAddIbrahimErkal(460,"O20",docRef),seatAddIbrahimErkal(461,"O21",docRef),seatAddIbrahimErkal(462,"NA",docRef),seatAddIbrahimErkal(463,"NA",docRef),seatAddIbrahimErkal(464,"NA",docRef)
                            seatAddIbrahimErkal(465,"NA",docRef),seatAddIbrahimErkal(466,"NA",docRef),seatAddIbrahimErkal(467,"P1",docRef),seatAddIbrahimErkal(468,"P2",docRef),seatAddIbrahimErkal(469,"P3",docRef),seatAddIbrahimErkal(470,"P4",docRef),seatAddIbrahimErkal(471,"P5",docRef),seatAddIbrahimErkal(472,"P6",docRef),seatAddIbrahimErkal(473,"P7",docRef),seatAddIbrahimErkal(474,"P8",docRef),seatAddIbrahimErkal(475,"P9",docRef),seatAddIbrahimErkal(476,"P10",docRef),seatAddIbrahimErkal(477,"P11",docRef),seatAddIbrahimErkal(478,"NA",docRef),seatAddIbrahimErkal(479,"NA",docRef),seatAddIbrahimErkal(480,"NA",docRef),seatAddIbrahimErkal(481,"P12",docRef),seatAddIbrahimErkal(482,"P13",docRef),seatAddIbrahimErkal(483,"P14",docRef),seatAddIbrahimErkal(484,"P15",docRef),seatAddIbrahimErkal(485,"P16",docRef),seatAddIbrahimErkal(486,"P17",docRef),seatAddIbrahimErkal(487,"P18",docRef),seatAddIbrahimErkal(488,"P19",docRef),seatAddIbrahimErkal(489,"P20",docRef),seatAddIbrahimErkal(490,"P21",docRef),seatAddIbrahimErkal(491,"NA",docRef),seatAddIbrahimErkal(492,"NA",docRef),seatAddIbrahimErkal(493,"NA",docRef)
                            seatAddIbrahimErkal(494,"NA",docRef),seatAddIbrahimErkal(495,"NA",docRef),seatAddIbrahimErkal(496,"R1",docRef),seatAddIbrahimErkal(497,"R2",docRef),seatAddIbrahimErkal(498,"R3",docRef),seatAddIbrahimErkal(499,"R4",docRef),seatAddIbrahimErkal(500,"R5",docRef),seatAddIbrahimErkal(501,"R6",docRef),seatAddIbrahimErkal(502,"R7",docRef),seatAddIbrahimErkal(503,"R8",docRef),seatAddIbrahimErkal(504,"R9",docRef),seatAddIbrahimErkal(505,"R10",docRef),seatAddIbrahimErkal(506,"R11",docRef),seatAddIbrahimErkal(507,"NA",docRef),seatAddIbrahimErkal(508,"NA",docRef),seatAddIbrahimErkal(509,"NA",docRef),seatAddIbrahimErkal(510,"R12",docRef),seatAddIbrahimErkal(511,"R13",docRef),seatAddIbrahimErkal(512,"R14",docRef),seatAddIbrahimErkal(513,"R15",docRef),seatAddIbrahimErkal(514,"R16",docRef),seatAddIbrahimErkal(515,"R17",docRef),seatAddIbrahimErkal(516,"R18",docRef),seatAddIbrahimErkal(517,"R19",docRef),seatAddIbrahimErkal(518,"R20",docRef),seatAddIbrahimErkal(519,"R21",docRef),seatAddIbrahimErkal(520,"NA",docRef),seatAddIbrahimErkal(521,"NA",docRef),seatAddIbrahimErkal(522,"NA",docRef)
                            seatAddIbrahimErkal(523,"NA",docRef),seatAddIbrahimErkal(524,"NA",docRef),seatAddIbrahimErkal(525,"S1",docRef),seatAddIbrahimErkal(526,"S2",docRef),seatAddIbrahimErkal(527,"S3",docRef),seatAddIbrahimErkal(528,"S4",docRef),seatAddIbrahimErkal(529,"S5",docRef),seatAddIbrahimErkal(530,"S6",docRef),seatAddIbrahimErkal(531,"S7",docRef),seatAddIbrahimErkal(532,"S8",docRef),seatAddIbrahimErkal(533,"S9",docRef),seatAddIbrahimErkal(534,"S10",docRef),seatAddIbrahimErkal(535,"S11",docRef),seatAddIbrahimErkal(536,"NA",docRef),seatAddIbrahimErkal(537,"NA",docRef),seatAddIbrahimErkal(538,"NA",docRef),seatAddIbrahimErkal(539,"S12",docRef),seatAddIbrahimErkal(540,"S13",docRef),seatAddIbrahimErkal(541,"S14",docRef),seatAddIbrahimErkal(542,"S15",docRef),seatAddIbrahimErkal(543,"S16",docRef),seatAddIbrahimErkal(544,"S17",docRef),seatAddIbrahimErkal(545,"S18",docRef),seatAddIbrahimErkal(546,"S19",docRef),seatAddIbrahimErkal(547,"S20",docRef),seatAddIbrahimErkal(548,"S21",docRef),seatAddIbrahimErkal(549,"NA",docRef),seatAddIbrahimErkal(550,"NA",docRef),seatAddIbrahimErkal(551,"NA",docRef)
                            seatAddIbrahimErkal(552,"NA",docRef),seatAddIbrahimErkal(553,"NA",docRef),seatAddIbrahimErkal(554,"NA",docRef),seatAddIbrahimErkal(555,"NA",docRef),seatAddIbrahimErkal(556,"NA",docRef),seatAddIbrahimErkal(557,"NA",docRef),seatAddIbrahimErkal(558,"NA",docRef),seatAddIbrahimErkal(559,"NA",docRef),seatAddIbrahimErkal(560,"NA",docRef),seatAddIbrahimErkal(561,"NA",docRef),seatAddIbrahimErkal(562,"NA",docRef),seatAddIbrahimErkal(563,"NA",docRef),seatAddIbrahimErkal(564,"NA",docRef),seatAddIbrahimErkal(565,"NA",docRef),seatAddIbrahimErkal(566,"NA",docRef),seatAddIbrahimErkal(567,"NA",docRef),seatAddIbrahimErkal(568,"NA",docRef),seatAddIbrahimErkal(569,"NA",docRef),seatAddIbrahimErkal(570,"NA",docRef),seatAddIbrahimErkal(571,"NA",docRef),seatAddIbrahimErkal(572,"NA",docRef),seatAddIbrahimErkal(573,"NA",docRef),seatAddIbrahimErkal(574,"NA",docRef),seatAddIbrahimErkal(575,"NA",docRef),seatAddIbrahimErkal(576,"NA",docRef),seatAddIbrahimErkal(577,"NA",docRef),seatAddIbrahimErkal(578,"NA",docRef),seatAddIbrahimErkal(579,"NA",docRef),seatAddIbrahimErkal(580,"NA",docRef)  
                            seatAddIbrahimErkal(581,"NA",docRef),seatAddIbrahimErkal(582,"T1",docRef),seatAddIbrahimErkal(583,"T2",docRef),seatAddIbrahimErkal(584,"T3",docRef),seatAddIbrahimErkal(585,"T4",docRef),seatAddIbrahimErkal(586,"T5",docRef),seatAddIbrahimErkal(587,"T6",docRef),seatAddIbrahimErkal(588,"T7",docRef),seatAddIbrahimErkal(589,"T8",docRef),seatAddIbrahimErkal(590,"T9",docRef),seatAddIbrahimErkal(591,"T10",docRef),seatAddIbrahimErkal(592,"T11",docRef),seatAddIbrahimErkal(593,"T12",docRef),seatAddIbrahimErkal(594,"NA",docRef),seatAddIbrahimErkal(595,"NA",docRef),seatAddIbrahimErkal(596,"NA",docRef),seatAddIbrahimErkal(597,"T13",docRef),seatAddIbrahimErkal(598,"T14",docRef),seatAddIbrahimErkal(599,"T15",docRef),seatAddIbrahimErkal(600,"T16",docRef),seatAddIbrahimErkal(601,"T17",docRef),seatAddIbrahimErkal(602,"T18",docRef),seatAddIbrahimErkal(603,"T19",docRef),seatAddIbrahimErkal(604,"T20",docRef),seatAddIbrahimErkal(605,"T21",docRef),seatAddIbrahimErkal(606,"T22",docRef),seatAddIbrahimErkal(607,"T23",docRef),seatAddIbrahimErkal(608,"T24",docRef),seatAddIbrahimErkal(609,"NA",docRef)
                            seatAddIbrahimErkal(610,"NA",docRef),seatAddIbrahimErkal(611,"U1",docRef),seatAddIbrahimErkal(612,"U2",docRef),seatAddIbrahimErkal(613,"U3",docRef),seatAddIbrahimErkal(614,"U4",docRef),seatAddIbrahimErkal(615,"U5",docRef),seatAddIbrahimErkal(616,"U6",docRef),seatAddIbrahimErkal(617,"NA",docRef),seatAddIbrahimErkal(618,"NA",docRef),seatAddIbrahimErkal(619,"U7",docRef),seatAddIbrahimErkal(620,"U8",docRef),seatAddIbrahimErkal(621,"U9",docRef),seatAddIbrahimErkal(622,"U10",docRef),seatAddIbrahimErkal(623,"NA",docRef),seatAddIbrahimErkal(624,"NA",docRef),seatAddIbrahimErkal(625,"NA",docRef),seatAddIbrahimErkal(626,"U11",docRef),seatAddIbrahimErkal(627,"U12",docRef),seatAddIbrahimErkal(628,"U13",docRef),seatAddIbrahimErkal(629,"U14",docRef),seatAddIbrahimErkal(630,"U15",docRef),seatAddIbrahimErkal(631,"U16",docRef),seatAddIbrahimErkal(632,"U17",docRef),seatAddIbrahimErkal(633,"U18",docRef),seatAddIbrahimErkal(634,"U19",docRef),seatAddIbrahimErkal(635,"U20",docRef),seatAddIbrahimErkal(636,"U21",docRef),seatAddIbrahimErkal(637,"U22",docRef),seatAddIbrahimErkal(638,"U23",docRef)
                            seatAddIbrahimErkal(639,"NA",docRef),seatAddIbrahimErkal(640,"V1",docRef),seatAddIbrahimErkal(641,"V2",docRef),seatAddIbrahimErkal(642,"V3",docRef),seatAddIbrahimErkal(643,"V4",docRef),seatAddIbrahimErkal(644,"V5",docRef),seatAddIbrahimErkal(645,"V6",docRef),seatAddIbrahimErkal(646,"NA",docRef),seatAddIbrahimErkal(647,"NA",docRef),seatAddIbrahimErkal(648,"NA",docRef),seatAddIbrahimErkal(649,"V7",docRef),seatAddIbrahimErkal(650,"V8",docRef),seatAddIbrahimErkal(651,"V9",docRef),seatAddIbrahimErkal(652,"NA",docRef),seatAddIbrahimErkal(653,"NA",docRef),seatAddIbrahimErkal(654,"NA",docRef),seatAddIbrahimErkal(655,"NA",docRef),seatAddIbrahimErkal(656,"NA",docRef),seatAddIbrahimErkal(657,"NA",docRef),seatAddIbrahimErkal(658,"NA",docRef),seatAddIbrahimErkal(659,"NA",docRef),seatAddIbrahimErkal(660,"NA",docRef),seatAddIbrahimErkal(661,"NA",docRef),seatAddIbrahimErkal(662,"NA",docRef),seatAddIbrahimErkal(663,"V17",docRef),seatAddIbrahimErkal(664,"V18",docRef),seatAddIbrahimErkal(665,"V19",docRef),seatAddIbrahimErkal(666,"V20",docRef),seatAddIbrahimErkal(667,"V21",docRef)
                            seatAddIbrahimErkal(668,"Y1",docRef),seatAddIbrahimErkal(669,"Y2",docRef),seatAddIbrahimErkal(670,"Y3",docRef),seatAddIbrahimErkal(671,"Y4",docRef),seatAddIbrahimErkal(672,"Y5",docRef),seatAddIbrahimErkal(673,"Y6",docRef),seatAddIbrahimErkal(674,"Y7",docRef),seatAddIbrahimErkal(675,"NA",docRef),seatAddIbrahimErkal(676,"NA",docRef),seatAddIbrahimErkal(677,"NA",docRef),seatAddIbrahimErkal(678,"Y8",docRef),seatAddIbrahimErkal(679,"Y9",docRef),seatAddIbrahimErkal(680,"Y10",docRef),seatAddIbrahimErkal(681,"NA",docRef),seatAddIbrahimErkal(682,"NA",docRef),seatAddIbrahimErkal(683,"NA",docRef),seatAddIbrahimErkal(684,"NA",docRef),seatAddIbrahimErkal(685,"NA",docRef),seatAddIbrahimErkal(686,"NA",docRef),seatAddIbrahimErkal(687,"NA",docRef),seatAddIbrahimErkal(688,"NA",docRef),seatAddIbrahimErkal(689,"NA",docRef),seatAddIbrahimErkal(690,"NA",docRef),seatAddIbrahimErkal(691,"NA",docRef),seatAddIbrahimErkal(692,"Y18",docRef),seatAddIbrahimErkal(693,"Y19",docRef),seatAddIbrahimErkal(694,"Y20",docRef),seatAddIbrahimErkal(695,"Y21",docRef),seatAddIbrahimErkal(696,"Y22",docRef);
                
                          }
                        
                        }

                        try {

   
  
                          const docRefHome = await addDoc(collection(db,"HomeBanner"), {
                      
                            activityImgUrl : image1url,
                            activityCategoryName : activityCategoryFormSelect.value,
                            activityDocumentId : docRef.id,
                            
                          });
                      
                          console.log("Document written with ID: ", docRefHome.id);

                          alert("Etkinlik başalı bir şekilde eklendi")

                          } catch (e) {
                          console.error("Error adding document: ", e);
                        } 

                        
                        
                        console.log("Document written with ID: ", docRef.id);
                    
                      } catch (e) {
                      
                        console.error("Error adding document: ", e);
                    
                      }
                    
                    });
                
                });
        
            });
          
          });



          }


  
        } 

      }

    }
  
  }

});


btnActivityAdd.addEventListener("click",()=> {

    if (addEditActivityContainer.style.display === "none") {

        
        addEditActivityContainer.style.display = ""
        btnActivityAdd.style.visibility ="hidden"

      
        
    } 
})


btnLogout.addEventListener("click",()=> {

    const auth = getAuth();
    
signOut(auth).then(() => {
  window.location.href ="index.html"
}).catch((error) => {
  // An error happened.
});


});


btnActivityAddCancel.addEventListener("click",()=> {


  
    if (addEditActivityContainer.style.display != "none") {

        addEditActivityContainer.style.display = "none"
        btnActivityAdd.style.visibility ="visible"
        window.location.reload();
        
        
    } 


})





async function seatAddIbrahimErkal(seatBox, seatName, docRef) {

  var dateOld = new Date();
 

  try {

    await addDoc(collection(db,"Events/" + docRef.id + "/Saloon/"  ), {

      seatBox : seatBox,
      seatName : seatName,
      seatStatus : 0,
      userName : "",
      userEmail : "",
      userTcNo : "",
      reservationUser: "",
      reservationTimeStamp : dateOld,
      
    });

   
    
    
     console.log("Document written with ID: ", docRef.id);
    } catch (e) {
    console.error("Error adding document: ", e);
  } 

}

async function seatAddIbrahimErkalProtocol(seatBox, seatName, docRef) {

  var dateOld = new Date();

  try {

   
  
    await addDoc(collection(db,"Events/" + docRef.id + "/Saloon/"  ), {

      seatBox : seatBox,
      seatName : seatName,
      seatStatus : 5,
      userName : "",
      userEmail : "",
      userTcNo : "",
      reservationUser: "",
      reservationTimeStamp : dateOld,
      
    });

   
    
    
     console.log("Document written with ID: ", docRef.id);
    } catch (e) {
    console.error("Error adding document: ", e);
  } 

}











