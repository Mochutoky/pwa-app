const firebaseConfig = {
  apiKey: "AIzaSyDe6gvo3dC9WUxGTDqI1RZFhU_i2HLzMIk",
  authDomain: "businessdb-84869.firebaseapp.com",
  databaseURL: "https://businessdb-84869-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "businessdb-84869",
  storageBucket: "businessdb-84869.firebasestorage.app",
  messagingSenderId: "789894098053",
  appId: "1:789894098053:web:ea281a17c570bb64de8dec"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const number = localStorage.getItem("number");
if (!number) {
  alert("Авторизуйтесь сначала");
  window.location.href = "index.html";
}

db.collection("Stats")
  .where("number", "==", number)
  .get()
  .then(snapshot => {
    if (!snapshot.empty) {
      const doc = snapshot.docs[0].data();

      const alum = doc.alum || 0;
      const plastic = doc.plastic || 0;
      const glass = doc.glass || 0;

      document.getElementById("alum").innerText = alum;
      document.getElementById("plastic").innerText = plastic;
      document.getElementById("glass").innerText = glass;

      const savedCO2 = alum * 1.43 + plastic * 0.25 + glass * 0.6;
      document.getElementById("carbonSaved").innerText = `${savedCO2.toFixed(1)} кг`;

      // Пример общего следа — можно заменить формулой
      const totalCO2 = savedCO2 + 127; // например, baseline углеродный след
      document.getElementById("carbonFootprint").innerText = `${totalCO2.toFixed(1)} кг`;
    }
  })
  .catch(e => alert("Ошибка загрузки: " + e.message));

function closeProfile() {
  window.location.href = "profile.html";
}

window.addEventListener("load", () => {
  window.scrollTo(0, document.body.scrollHeight);
});