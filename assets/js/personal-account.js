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