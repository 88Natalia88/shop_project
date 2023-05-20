const accountForm = document.getElementById("account-form");
const nameInput = document.querySelector(".name");
const surnameInput = document.querySelector(".surname");
const emailInput = document.querySelector("input[type='email']");
const phoneInput = document.querySelector("input[type='tel']");
const cityInput = document.querySelector(".city");
const addressInput = document.querySelector(".house-address");

function updateInformation(event) {
    event.preventDefault(); // предотвращаем отправку формы по умолчанию
    const formData = new FormData(accountForm); // получаем данные формы
    const body = Object.fromEntries(formData); // преобразуем данные в объект

    fetch("/api/update-information", {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
        })
        .then(response => {
            if (!response.ok) {
            throw new Error("Ошибка при обновлении информации");
            }
            return response.json();
        })
        .then(json => {
          // обновляем данные в DOM
            nameInput.value = json.name;
            surnameInput.value = json.surname;
            emailInput.value = json.email;
            phoneInput.value = json.phone;
            cityInput.value = json.city;
            addressInput.value = json.address;
            alert("Информация успешно обновлена");
        })
        .catch(error => {
            alert(error.message);
        });
    }

    accountForm.addEventListener("submit", updateInformation);
    
    