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

const bonuses = [
  { name: "Coke", label: "Coca-Cola" },
  { name: "Efes", label: "Efes" },
  { name: "Pepsi", label: "Pepsi" },
  { name: "Onay", label: "Onay" },
  { name: "R2D2", label: "R2D2" },
  { name: "Koptic", label: "Koptic" }
];

const bonusesfb = [
  { name: "Coke", label: "coke" },
  { name: "Efes", label: "efes" },
  { name: "Pepsi", label: "pepsi" },
  { name: "Onay", label: "onay" },
  { name: "R2D2", label: "r2d2" },
  { name: "Koptic", label: "koptic" }
];

function renderBonuses(sortedList) {
  const container = document.getElementById("bonusGrid");
  container.innerHTML = "";

  sortedList.forEach(bonus => {
    const div = document.createElement("div");
    div.className = "bonus-card";
    div.textContent = bonus.label;
    div.onclick = () => openBonus(bonus.name);
    container.appendChild(div);
  });
}

function searchBonus(query) {
  const clean = query.trim().toLowerCase();

  if (!clean) {
    renderBonuses(bonuses);
    return;
  }

  const found = bonuses.filter(b => b.label.toLowerCase().includes(clean));
  const others = bonuses.filter(b => !b.label.toLowerCase().includes(clean));
  const sorted = [...found, ...others];

  renderBonuses(sorted);
}

// первичный рендер
window.onload = () => {
  renderBonuses(bonuses);
};


function openBonus(name) {
  const modal = document.getElementById("bonusModal");
  const title = document.getElementById("bonusTitle");
  const description = document.getElementById("bonusDescription");
  const image = document.getElementById("bonusImage");
  const content = modal.querySelector(".modal-content");

  switch (name) {
    case "Coke":
      title.innerText = "Бонус: Coca-Cola";
      description.innerText = "Сдавай алюминий и получай фирменные призы от Coca-Cola!";
      image.src = "img/coke.png";
      break;
    case "Pepsi":
      title.innerText = "Бонус: Pepsi";
      description.innerText = "Каждая сданная упаковка — вклад в экологию!";
      image.src = "img/pepsi.png";
      break;
    case "Efes":
      title.innerText = "Бонус: Efes";
      description.innerText = "Собирай стекло — получай баллы!";
      image.src = "img/efes.png";
      break;
    case "Onay":
      title.innerText = "Бонус: Onay";
      description.innerText = "Пользуешься транспортом? Получи зелёные баллы!";
      image.src = "img/onay.png";
      break;
    case "R2D2":
      title.innerText = "Бонус: R2D2";
      description.innerText = "Увлекаешься играми? Получи минуты в игротеке!";
      image.src = "img/r2d2.JPG";
      break;
    case "Koptic":
      title.innerText = "Бонус: Koptic";
      description.innerText = "Сдавай бутылки и выбирай лучший вариант очков под себя";
      image.src = "img/koptic.png";
      break;
    default:
      title.innerText = "Бонус";
      description.innerText = "Описание скоро появится!";
      image.src = "img/default.jpg";
  }

  modal.style.display = "flex";
  content.style.animation = "modalShow 0.3s ease-out forwards";

  document.getElementById("confirmBonus").onclick = () => {
    buyModal(name);
    closeModal();
  }
}

function closeModal() {
  const modal = document.getElementById("bonusModal");
  const content = modal.querySelector(".modal-content");

  // Добавим анимацию скрытия
  content.style.animation = "modalHide 0.2s ease-in forwards";

  setTimeout(() => {
    modal.style.display = "none";
  }, 200); // Соответствует длительности анимации
}


function buyModal(bonusName) {
  const number = localStorage.getItem("number") || "unknown";
  const bonus = bonusesfb.find(b => b.name === bonusName);
  const fieldToUpdate = bonus.label;
  db.collection("Goods")
  .where("number", "==", number)
  .get()
  .then((snapshot) => {
    if (!snapshot.empty) {
      const docId = snapshot.docs[0].id;
      db.collection("Goods")
        .doc(docId)
        .update({
          [fieldToUpdate]: firebase.firestore.FieldValue.increment(1) 
        })
        .then(() => {
          alert("✅ Обновлено успешно");
        })
        .catch((error) => {
          alert("❌ Ошибка при обновлении: " + error.message);
        });
    } else {
      alert("❗️ Документ не найден");
    }
  })
  .catch((error) => {
    alert("Ошибка при поиске: " + error.message);
  });
}
