// Обработчик событий для формы с личными данными
const accountForm = document.querySelector('#account-form');
if (accountForm) {
    accountForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Отмена отправки формы по умолчанию

    const formData = new FormData(accountForm);
    const name = formData.get('name');
    const surname = formData.get('surname');
    const email = formData.get('email');
    const phone = formData.get('tel');
    const city = formData.get('city');
    const address = formData.get('house-address');

    // Сохранение данных в локальное хранилище
    localStorage.setItem('name', name);
    localStorage.setItem('surname', surname);
    localStorage.setItem('email', email);
    localStorage.setItem('phone', phone);
    localStorage.setItem('city', city);
    localStorage.setItem('address', address);

    // Отправка данных на сервер
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/update-information');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        alert('Данные успешно обновлены!');
    };
    xhr.send(JSON.stringify({
        name: name,
        surname: surname,
        email: email,
        phone: phone,
        city: city,
        address: address
    }));
    });
}  

function logout(event) {
    event.preventDefault(); // Отмена отправки формы или перехода по ссылке по умолчанию

    // Очистка данных в локальном хранилище
    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    localStorage.removeItem('email');
    localStorage.removeItem('phone');
    localStorage.removeItem('city');
    localStorage.removeItem('address');

    // Очистка полей инпутов
    const inputs = accountForm.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
    });

    const modal = document.getElementById("login-modal");
    modal.style.display = "block";
    }



    