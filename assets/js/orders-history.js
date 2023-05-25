function logout(event) {
    event.preventDefault(); // Отмена отправки формы или перехода по ссылке по умолчанию
    const modal = document.getElementById("login-modal");
    modal.style.display = "block";
    }