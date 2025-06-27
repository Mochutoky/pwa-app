// Firebase config
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

let scannedCode = "";
const number = localStorage.getItem("number") || "unknown";

const qrScanner = new Html5Qrcode("reader");

qrScanner.start(
  { facingMode: "environment" },
  { fps: 10, qrbox: 250 },
  (decodedText) => {
    scannedCode = decodedText;
    document.getElementById("scan-status").innerText = "✅ QR код отсканирован: " + scannedCode;
    qrScanner.stop();
  },
  (errorMsg) => {
    // Можно вывести в консоль, но не обязательно
  }
);

function sendQr() {
  if (!scannedCode) {
    alert("❌ Сначала отсканируйте QR код!");
    return;
  }

  db.collection("Readings")
    .add({
      number: number,
      qr: scannedCode
    })
    .then(() => {
      console.log("✅ Успешно отправлено в базу");
      // window.location.href = "main.html";
    })
    .catch((e) => {
      console.log("❌ Ошибка при отправке: " + e.message);
    });
}

window.addEventListener("load", () => {
  window.scrollTo(0, document.body.scrollHeight);
});
