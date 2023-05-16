//Показываем или скрываем пароль по нажатию на кнопку

function showPassword() {
    const passBtn = document.querySelector('.password__btn');
    const passInput = document.querySelector('.password__input');

    passBtn.addEventListener('click', () => {
        passBtn.classList.toggle('active')

        if (passInput.getAttribute('type') === 'password') {
            passInput.setAttribute('type', 'text')
        } else {
            passInput.setAttribute('type', 'password')
        }
    })
}    
showPassword();

//Модальное окно

const loginForm = document.getElementById("login-form");
const loginModal = document.getElementById("login-modal");
const loginButton = document.getElementById("login-button");
const closeButton = loginModal.getElementsByClassName("close")[0];

// Отображаем всплывающее окно при нажатии на кнопку
//loginButton.onclick = function() {
//    loginModal.style.display = "block";
//};

// Скрываем всплывающее окно при нажатии на кнопку закрытия
closeButton.onclick = function() {
    loginModal.style.display = "none";
};

// Скрываем всплывающее окно при нажатии за его пределами
window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
};

