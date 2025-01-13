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
    console.log("logged in");
  } else {
    console.log("no user");
  }
});

// Global değişkenler ve fonksiyonları window objesine ekle
window.currentYear = new Date().getFullYear();
window.currentMonth = new Date().getMonth();

// Ay isimleri
const monthNames = [
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

// Fonksiyonları global scope'a ekle
window.previousMonth = function () {
  window.currentMonth--;
  if (window.currentMonth < 0) {
    window.currentMonth = 11;
    window.currentYear--;
  }
  updateCalendar();
};

window.nextMonth = function () {
  window.currentMonth++;
  if (window.currentMonth > 11) {
    window.currentMonth = 0;
    window.currentYear++;
  }
  updateCalendar();
};

function updateCalendarTitle() {
  const titleElement = document.querySelector("#calendarTitle");
  titleElement.textContent = `${monthNames[window.currentMonth]} ${
    window.currentYear
  }`;
}

function updateCalendar() {
  updateCalendarTitle();
  const firstDayOfMonth = getFirstDayOfMonth(
    window.currentYear,
    window.currentMonth
  );
  const daysInMonth = getDaysInMonth(window.currentYear, window.currentMonth);
  const daysNumber = firstDayOfMonth + daysInMonth - 1;

  // Tüm hücreleri temizle
  document.querySelectorAll("#calendar td").forEach((td) => {
    td.innerHTML = "";
  });

  // Yeni takvimi oluştur
  processDaysInMonth(
    firstDayOfMonth,
    daysNumber,
    window.currentMonth,
    window.currentYear,
    daysInMonth
  );
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

async function processDaysInMonth(
  firstDayOfMonth,
  daysNumber,
  month,
  year,
  daysInMonth
) {
  try {
    const dayToday = new Date().getDate();

    // Önceki ayın son günü
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const prevMonthLastDay = new Date(prevYear, month, 0).getDate();

    // Önceki ayın günlerini hesapla
    let prevMonthStartDay = prevMonthLastDay - firstDayOfMonth + 2;

    // Tüm etkinlikleri çekelim
    const programsRef = collection(db, "programs");
    const programsSnapshot = await getDocs(programsRef);
    const allPrograms = new Map();

    // Tüm programları Map'e ekle
    programsSnapshot.forEach((doc) => {
      allPrograms.set(doc.id, doc.data());
    });

    // VenueTracking verilerini çek
    const getData = query(
      collection(db, "VenueTracking"),
      where("year", "==", year),
      where("month", "==", month)
    );
    const querySnapshot = await getDocs(getData);

    // Verileri bir Map'te saklayalım
    const eventsByDay = new Map();
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const dayId = data.day;

      // Eğer bu gün için daha önce veri eklenmişse, mevcut DocID'leri al
      const existingData = eventsByDay.get(dayId) || {
        hasEvent: false,
        events: { activityDocIds: [] },
      };

      // Yeni ve mevcut DocID'leri birleştir ve tekrar edenleri kaldır
      const uniqueDocIds = new Set([
        ...existingData.events.activityDocIds,
        ...[
          data.activity1DocId,
          data.activity2DocId,
          data.activity3DocId,
        ].filter((id) => id !== "0"),
      ]);

      // Set'i array'e çevir
      const allDocIds = [...uniqueDocIds];

      // Her DocId için program bilgilerini logla
      allDocIds.forEach((docId) => {
        const program = allPrograms.get(docId);
        if (program) {
          console.log(`DocId ${docId} için program:`, program);
        }
      });

      // Güncellenmiş veriyi Map'e kaydet
      eventsByDay.set(dayId, {
        hasEvent: allDocIds.length > 0,
        events: {
          activityDocIds: allDocIds,
        },
      });
    });

    // Takvimi oluştur
    for (let i = 1; i <= 42; i++) {
      const dayId = `day${i}`;
      const dayElement = document.querySelector(`#${dayId}`);
      if (!dayElement) continue;

      let dayNum;
      let dayClass;

      if (i < firstDayOfMonth) {
        // Önceki ayın günleri
        dayNum = prevMonthStartDay++;
        dayClass = "other-month";
      } else if (i >= firstDayOfMonth && i < daysInMonth + firstDayOfMonth) {
        // Mevcut ayın günleri
        dayNum = i - firstDayOfMonth + 1;
        dayClass = "current-month";
      } else {
        // Sonraki ayın günleri
        dayNum = i - (daysInMonth + firstDayOfMonth - 1);
        dayClass = "other-month";
      }

      const dayData = eventsByDay.get(dayId);
      const backgroundColor =
        dayNum === dayToday && dayClass === "current-month"
          ? "#A2CDF2"
          : "white";

      const dayHtml = `
        <div class="day-container" style="background-color: ${backgroundColor};">
          <div class="day-content">
            <div class="day-number ${dayClass}">${dayNum}</div>
            ${
              dayClass === "current-month" && dayData?.hasEvent
                ? '<div class="event-dot"></div>'
                : ""
            }
            ${
              dayClass === "current-month" && !dayData?.hasEvent
                ? '<div class="no-event-text" style="display: none;">Etkinlik yok</div>'
                : ""
            }
          </div>
        </div>
      `;

      dayElement.innerHTML = dayHtml;

      // Sadece mevcut ayın günleri için tıklama olaylarını ekle
      if (dayClass === "current-month") {
        if (dayData?.hasEvent) {
          dayElement.addEventListener("click", async () => {
            console.log(
              `${dayNum} tarihindeki etkinlik ID'leri:`,
              dayData.events.activityDocIds
            );

            // Etkinlikleri göstereceğimiz div'i seçelim
            const eventListDiv = document.querySelector(".rounded-4");

            try {
              // Tüm program bilgilerini çekelim
              const programsRef = collection(db, "ProgramList");
              const q = query(
                programsRef,
                where("__name__", "in", dayData.events.activityDocIds)
              );
              const querySnapshot = await getDocs(q);

              // HTML içeriğini oluştur
              let eventsHTML = `<div class="events-container">`;
              querySnapshot.forEach((doc) => {
                const programData = doc.data();
                eventsHTML += `
                  <div class="event-item">
                    <img
                      class="rounded-3"
                      src="${
                        programData.imageUrl ||
                        "https://via.placeholder.com/250x200"
                      }"
                      alt="${programData.name}"
                    />
                    <div class="event-details">
                      <h2>${programData.name}</h2>
                      <p>${
                        programData.description || "Açıklama bulunmamaktadır."
                      }</p>
                    </div>
                  </div>
                `;
              });
              eventsHTML += "</div>";

              // İçeriği div'e ekle
              eventListDiv.innerHTML = eventsHTML;
            } catch (error) {
              console.error("Error getting documents: ", error);
              eventListDiv.innerHTML =
                '<p style="color: #3b94c4;">Etkinlik bilgileri yüklenirken bir hata oluştu.</p>';
            }
          });
        } else {
          dayElement.addEventListener("click", () => {
            const noEventText = dayElement.querySelector(".no-event-text");
            if (noEventText) {
              noEventText.style.display = "block";
              setTimeout(() => {
                noEventText.style.display = "none";
              }, 2000);
            }
          });
        }
      }
    }

    // Boş satırları ve sonraki aya ait son satırı gizle
    for (let row = 6; row >= 1; row--) {
      const rowElement = document.querySelector(
        `#calendar tbody tr:nth-child(${row})`
      );
      if (rowElement) {
        const cells = [...rowElement.querySelectorAll("td")];
        const hasCurrentMonthDay = cells.some((cell) =>
          cell.querySelector(".day-number.current-month")
        );

        // Eğer satırda mevcut aya ait gün yoksa satırı gizle
        rowElement.style.display = hasCurrentMonthDay ? "" : "none";

        // İçerik olan bir satır bulduktan sonra döngüyü sonlandır
        if (hasCurrentMonthDay) break;
      }
    }
  } catch (error) {
    console.error("Genel hata:", error);
  }
}

// Sayfa yüklendiğinde
document.addEventListener("DOMContentLoaded", () => {
  updateCalendarTitle();
  const firstDayOfMonth = getFirstDayOfMonth(
    window.currentYear,
    window.currentMonth
  );
  const daysInMonth = getDaysInMonth(window.currentYear, window.currentMonth);
  const daysNumber = firstDayOfMonth + daysInMonth - 1;
  processDaysInMonth(
    firstDayOfMonth,
    daysNumber,
    window.currentMonth,
    window.currentYear,
    daysInMonth
  );
});
