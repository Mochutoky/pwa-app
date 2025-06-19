window.onload = function () {
  // ✅ Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyDe6gvo3dC9WUxGTDqI1RZFhU_i2HLzMIk",
    authDomain: "businessdb-84869.firebaseapp.com",
    databaseURL: "https://businessdb-84869-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "businessdb-84869",
    storageBucket: "businessdb-84869.firebasestorage.app",
    messagingSenderId: "789894098053",
    appId: "1:789894098053:web:ea281a17c570bb64de8dec",
    measurementId: "G-XE82C87YXH"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  console.log("✅ Firebase initialized");

  // 🔐 ЛОГИН
  window.login = function () {
    const number = document.getElementById("login-number").value.trim();
    const pass = document.getElementById("login-password").value.trim();

    if (!number || !pass) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    db.collection("Users")
      .where("number", "==", number)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          alert("❌ Пользователь не найден");
        } else {
          const data = snapshot.docs[0].data();
          if (data.password === pass) {
            alert("✅ Успешный вход");
            localStorage.setItem("number", number);
            // window.location.href = "main.html";
          } else {
            alert("❌ Неверный пароль");
          }
        }
      })
      .catch((error) => {
        alert("Ошибка входа: " + error.message);
      });
  };

  // 🆕 РЕГИСТРАЦИЯ
  window.register = function () {
    const number = document.getElementById("reg-number").value.trim();
    const pass1 = document.getElementById("reg-pass1").value.trim();
    const pass2 = document.getElementById("reg-pass2").value.trim();

    if (!number || !pass1 || !pass2) {
      alert("⚠️ Заполните все поля");
      return;
    }

    if (pass1 !== pass2) {
      alert("❌ Пароли не совпадают");
      return;
    }

    db.collection("Users")
      .where("number", "==", number)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          alert("❌ Такой номер уже зарегистрирован");
        } else {
            db.collection("Users").add({
                    number: number,
                    password: pass1,
                    balance: 0
                })
                .then((docRef) => {
                    alert("✅ User added with ID: " + docRef.id);
                })
                .catch((error) => {
                    alert("❌ Failed to add user: " + error.message);
                    console.error(error);
                });
            db.collection("Stats").add({ number, alum: 0, plastic: 0, glass: 0 });
            db.collection("Stats").add({ number, onay: 0, r2d2: 0, koptic: 0 });

            alert("✅ Успешная регистрация");
            window.location.href = "index.html";
        }
      })
      .catch((error) => {
        alert("Ошибка при регистрации: " + error.message);
      });
  };
};
