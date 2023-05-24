//html
let cards = document.querySelector('.cards');
let overlay = document.querySelector('.overlay');
let close = document.querySelector('.popup-close');
getProducts();

//api

async function getProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    const productsArray = await response.json();
	renderProducts(productsArray);
    changeProducts(productsArray);
    
}
//выводим товар в html
function renderProducts(productsArray){
    productsArray.forEach(card => {
    //console.log(card)
    let cardInfo = '';
    cardInfo = `<div class="cardInfo"><img class="img" src="${card.image}">
            <p class="cardId">артикул: ${card.id}</p>
            <p>Наименование товара: <span class="cardTitle">${card.title}</span></p>
    <p>Цена: <span class="cardPrice">${card.price}</span> рублей</p>
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
    renderShoppingCart();
    }
}
  //закрываем модальное окно
    close.addEventListener('click', function() {
    overlay.style.display = 'none';
});

window.addEventListener('click', addToCart);
//console.log(cart)

//корзина с товарами
function renderShoppingCart() {
    let cartElement = document.querySelector('.cart');
    let productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || {};
    
    cartElement.innerHTML = '';
    Object.values(productsInCart).forEach((product) => { 
    console.log(product)
    let  cartInfo = '';
    cartInfo = `<div class='cart-item' data-id="${product.id}">
    <img src="${product.img}">
    <h4 class="cart-item-title">${product.title}</h4>
    <p class="cart-item-price">${product.price}</p>
    <div class="cart-item-quantity">
    <div><button class="items__minus minus" data-id="${product.id}">-</button></div>
    <div class="items__current" data-counter="">${product.quantity}</div>
    <div><button class="items__plus plus" data-id="${product.id}">+</button></div>		
    </div>
    <div class="button">
    <button class="remove-cart-item" data-id="${product.id}">Удалить</button></div></div>`
    cartElement.innerHTML += cartInfo;
    });
    cartElement.classList.toggle('line');
    document.querySelector('.decor').remove('hidden');
}

renderShoppingCart();

//уменьшаем или увеличиваем количество товаров
function changeProducts(productsArray){
    document.onclick = event => {
    let productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || {};
    //console.log(productsInCart)
    if(event.target.classList.contains('plus')) {
        let id = Number(event.target.dataset.id);
        let price = Number(productsArray.find(item => item.id === id).price);
        if (productsInCart[id]) {
        productsInCart[id].quantity++;
        productsInCart[id].price = Number(productsInCart[id].price) + price;
        }
    }
    if(event.target.classList.contains('minus')){
        let id = Number(event.target.dataset.id);
        let price = Number(productsArray.find(item => item.id === id).price);
            if (productsInCart[id]) {
                if(productsInCart[id].quantity > 1){
                    productsInCart[id].quantity--;
                    productsInCart[id].price = Number(productsInCart[id].price) - price;
        } else {
            removeProducts(event);
        }
        }
    }
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart)); 
    renderShoppingCart();
    }
}

//удаляем товар из корзины
function removeProducts(event){
    if(event.target.classList.contains('remove-cart-item')){
        let productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || {};
        let id = Number(event.target.dataset.id);
        delete productsInCart[id];
        localStorage.setItem('productsInCart', JSON.stringify(productsInCart)); 
        const cartItems = document.querySelectorAll(".cart-item");
        cartItems.forEach(item => {
            if(item.dataset.id === id.toString()){
                item.remove();  // удаление соответствующего DOM-элемента
        }
    })
      updateCartTotal();  // Обновляем общую стоимость и количество товаров в корзине
    }
}

document.addEventListener('click', removeProducts);
/*
function updateCartTotal(){

}*/