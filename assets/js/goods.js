//html
let cards = document.querySelector('.cards');
let overlay = document.querySelector('.overlay');
let close = document.querySelector('.popup-close');
getProducts();
//api
async function getProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    const productsArray = await response.json();
    await renderProducts(productsArray);
    await Array.from(document.querySelectorAll('.btn')).forEach((btn) => {
    btn.addEventListener('click', addToCart);
    })
}
//выводим товар в html
function renderProducts(productsArray) {
    productsArray.forEach(card => {
    //console.log(card)
    let cardInfo = '';
    cardInfo = `<div class="cardInfo"><img class="img" src="${card.image}">
            <p class="cardId">арт: ${card.id}</p>
            <p>Наименование товара: <span class="cardTitle">${card.title}</span></p>
    <p>Цена: <span class="cardPrice">${card.price}</span>$</p>
    <p class="cardCategory">Категория: ${card.category}</p>
    <p class="cardDescription">Описание: ${card.description} </p>
    <button class="btn" data-id="${card.id}">Заказать</button></div>`;
    cards.innerHTML += cardInfo;
    })
}
//добавляем товар в localstorage
function addToCart(event) {
    if (event.target.classList.contains('btn')) {
    const id = Number(event.target.dataset.id);
    const card = event.target.closest('.cardInfo');
    let productInfo = {
        id: id,
        img: card.querySelector('.img').getAttribute('src'),
        title: card.querySelector('.cardTitle').innerText,
        price: card.querySelector('.cardPrice').innerText,
        category: card.querySelector('.cardCategory').innerText,
        description: card.querySelector('.cardDescription').innerText,
        quantity: 1,
    };
    //console.log(typeof(productInfo.price))
    let productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || {};
    if (productsInCart[id]) {
      //console.log(productsInCart[id]);
        productsInCart[id].quantity++;
        productsInCart[id].price = Number(productsInCart[id].price) + Number(productInfo.price);
        console.log(productsInCart[id].price)
    } else {
        productsInCart[id] = productInfo;
    }
    //модадльное окно
    overlay.style.display = 'block';
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
    }
}
//закрываем модальное окно
close.addEventListener('click', function () {
    overlay.style.display = 'none';
});