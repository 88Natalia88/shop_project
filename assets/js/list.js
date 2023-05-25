let cardsContent = document.getElementById("cards-container");

function GetHTML(Object) {
    let html = "";
    html += `<div class="card" data-id="${Object.id}">
    <div class="card__image-wrap">
        <a href="goods.html"><img src="${Object.image}" alt="" class="card__image"></img></a>
        <button type="button" class="card__favourite" data-id="${Object.id}" data-name="${Object.title}" data-price="${Object.price}">
            <img class="card__icon-like" src="assets/images/icons/like.svg" alt="like"></img>
        </button>
    </div>

    <div class="card__name card__name--new">
        <p>
        ${Object.title}
        </p>
    </div>
    <div class="card__price">
        <p class="card-para__price">
            <strong>${Object.price} $</strong>
        </p>
    </div>
    <ul class="card__sizes">
        <li class="card__size">XXS</li>
        <li class="card__size">XS</li>
        <li class="card__size">S</li>
        <li class="card__size">M</li>
        <li class="card__size">L</li>
    </ul>
    <ul class="card__colours">
        <li class="card__colour card__colour--white"></li>
        <li class="card__colour card__colour--navy"></li>
        <li class="card__colour card__colour--beige"></li>
    </ul>
</div>`;
    return html;
}

function GetCards() {
    fetch("https://fakestoreapi.com/products/category/women's clothing")
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(json);
            json.forEach((card) => {
                let htmlcard = GetHTML(card);
                AddHTMLtoContainer(htmlcard, cardsContent);
            });
        })
        .catch((error) => console.log(error));
}

GetCards();

function AddHTMLtoContainer(HTML, cardsContent) {
    cardsContent.innerHTML += HTML;

    const btnFavourite = cardsContent.querySelectorAll('.card__favourite')
    console.log(btnFavourite);

    btnFavourite.forEach((btn) => {

        // Обработчик клика на кнопке "Добавить в избранное"
        btn.addEventListener("click", () => {
            console.log('Действия при клике на кнопку избранного');
            let currentItem = {
                id: btn.dataset.id,
                name: btn.dataset.name,
                price: btn.dataset.price
            };
            console.log(currentItem);
            AddToFavorites(currentItem);
            btn.classList.toggle('active');
        })
    });
}

// Функция добавления товара в список избранных
function AddToFavorites(item) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let card = document.querySelector(`[data-id='${item.id}']`).closest(".card");
    let imageSrc = card.querySelector(".card__image").getAttribute("src");
    let name = card.querySelector(".card__name").textContent;
    let price = card.querySelector(".card__price strong").textContent;

    let newItem = {
        ...item,
        image: imageSrc,
        name: name,
        price: price,
    };

    // Проверяем, есть ли текущий товар в списке избранных
    let exists = false;
    for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].id == newItem.id) {
            exists = true;
            break;
        }
    }

    // Если товара нет в списке избранных, добавляем его
    if (!exists) {
        favorites.push(newItem);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    else {
        swal('Товар уже добавлен в избранное!')
    }
}

// Функция удаления товаров из списка избранного
function RemoveFromFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    favorites = favorites.filter((item) => item.id !== id);

    localStorage.setItem('favorites', JSON.stringify(favorites));

    // let btnToRemove = document.querySelector(`[data-id="${id}"]`);

    // if (btnToRemove) btnToRemove.classList.remove('active');
}

// Функция для отображения списка избранных товаров на странице
function ShowFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let favoritesList = document.getElementById('favorites-list');
    let titleContainer = document.getElementById('title-container');
    console.log(favoritesList);
    favoritesList.innerHTML = '';

    if (favorites.length === 0) {
        titleContainer.innerHTML = `<p class="favorites-title">В избранном пока ничего нет</p>`;
        return;
    }
    console.log(favorites.length);

    for (let i = 0; i < favorites.length; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<div class="card__image-wrap">
        <img src="${favorites[i].image}" alt="" class="card__image" data-id="${favorites[i].id}">
        <button type="button" class="card__favourite">
            <img class="card__icon-like" src="assets/images/icons/Frame.svg" alt="like"></img>
        </button>
    </div>
    <div class="card__name card__name--new">
        <p>${favorites[i].name}</p>
    </div>
    <div class="card__price">
        <p class="card-para__price">
            <strong>${favorites[i].price}</strong>
        </p>
        <ul class="card__sizes">
        <li class="card__size">XXS</li>
        <li class="card__size">XS</li>
        <li class="card__size">S</li>
        <li class="card__size">M</li>
        <li class="card__size">L</li>
    </ul>
    <ul class="card__colours">
        <li class="card__colour card__colour--white"></li>
        <li class="card__colour card__colour--navy"></li>
        <li class="card__colour card__colour--beige"></li>
    </ul>
    </div>`;

        favoritesList.appendChild(card);

        let btnFavourite = card.querySelector('.card__favourite');

        // Удаление товара из избранного при клике на кнопку
        btnFavourite.addEventListener('click', () => {
            let clotherId = card.querySelector('.card__image').getAttribute('data-id');;

            RemoveFromFavorites(clotherId);

            card.remove();
        });
    }
}

window.addEventListener('load', () => {
    ShowFavorites();
});
