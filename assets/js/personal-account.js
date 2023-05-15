function logout() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://example.com/logout", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log("Выход из аккаунта выполнен");
                window.location.href = "http://example.com/login";
            } else {
                console.log("Ошибка выхода из аккаунта");
            }
        }
    };
    xhr.send(JSON.stringify({
        token: "your_token"
    }));
}

function updateInformation(event) {
    event.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://example.com/update_information", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log("Персональные данные обновлены");
            } else {
                console.log("Ошибка обновления персональных данных");
            }
        }
    };
    xhr.send(JSON.stringify({
        name: document.getElementsByName("name")[0].value,
        surname: document.getElementsByName("surname")[0].value,
        email: document.getElementsByName("email")[0].value,
        phone: document.getElementsByName("phone")[0].value,
        city: document.getElementsByName("city")[0].value,
        address: document.getElementsByName("address")[0].value,
        token: "your_token"
    }));
}