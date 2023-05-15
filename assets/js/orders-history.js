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