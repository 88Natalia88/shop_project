//Показываем или скрываем пароль по нажатию на кнопку

function showPassword() {
  const passBtns = document.querySelectorAll('.password__btn');
  const passInputs = document.querySelectorAll('.password__input');

  passBtns.forEach((passBtn, index) => {
    passBtn.addEventListener('click', () => {
      passBtn.classList.toggle('active');

      if (passInputs[index].getAttribute('type') === 'password') {
        passInputs[index].setAttribute('type', 'text')
      } else {
        passInputs[index].setAttribute('type', 'password')
      }
    })
  });
}

showPassword();

//Модальное окно

const loginModal = document.getElementById("login-modal");
const forgotPasswordModal = document.getElementById("forgot-password-modal");
const registerModal = document.getElementById("register-modal");
const codeModal = document.getElementById("code-modal");
const registerModalStep2 = document.getElementById("register-modal-step2");
const passwordChangedModal = document.getElementById("password-changed-modal");
const registerSuccessModal = document.getElementById("register-success-modal")

// Кнопки, которые открывают соответствующее модальное окно
const logoutLink = document.getElementById("logout-link");
const forgotPasswordLink = document.querySelector("#forgot-password-link");
const registerLink = document.querySelector("#register-link");

// Функции для открытия модальных окон
function openModal(modal) {
modal.style.display = "block";
}

// Обработчик событий для открытия модального окна "Авторизация"
logoutLink.addEventListener("click", () => openModal(loginModal));

// Обработчики событий для открытия модальных окон "Забыли пароль?" и "Нет аккаунта?"
forgotPasswordLink.addEventListener("click", (event) => {
event.preventDefault();
openModal(forgotPasswordModal);
});

registerLink.addEventListener("click", (event) => {
event.preventDefault();
openModal(registerModal);
});

// Функции для закрытия модальных окон
function closeModal(modal) {
modal.style.display = "none";
}

// Добавляем обработчики событий для закрытия модальных окон
const closeButtons = document.querySelectorAll(".close");
const modals = [loginModal, forgotPasswordModal, registerModal, codeModal, registerModalStep2, passwordChangedModal, registerSuccessModal];

closeButtons.forEach((button) => {
button.addEventListener("click", () => {
  modals.forEach((modal) => closeModal(modal));
});
});

window.addEventListener("click", (event) => {
modals.forEach((modal) => {
  if (event.target === modal) {
    closeModal(modal);
  }
});
});

