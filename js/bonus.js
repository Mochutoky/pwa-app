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
