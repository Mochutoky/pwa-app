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
const password = localStorage.getItem("password");

if (!number || !password) {
  alert("Сначала войдите в аккаунт.");
  window.location.href = "index.html";
}

document.getElementById("phone").innerText = `Телефон: ${number}`;

// Получаем бонусы
db.collection("Users")
  .where("number", "==", number)
  .get()
  .then((snapshot) => {
    if (!snapshot.empty) {
      const data = snapshot.docs[0].data();
      document.getElementById("balance").innerText = data.balance;
    }
  });

// Получаем количество бутылок
db.collection("Stats")
  .where("number", "==", number)
  .get()
  .then((snapshot) => {
    if (!snapshot.empty) {
      const doc = snapshot.docs[0].data();
      const sum = (doc.plastic || 0) + (doc.glass || 0) + (doc.alum || 0);
      document.getElementById("bottles").innerText = sum;
    }
  });

// Выход
function logout() {
  localStorage.removeItem("number");
  localStorage.removeItem("password");
  window.location.href = "index.html";
}
