document.addEventListener("DOMContentLoaded", function () {
  const logoBurger = document.querySelector(".header__logoBurger");
  const menu = document.querySelector(".header__menuBurger");

  logoBurger.addEventListener("click", function () {
    menu.classList.toggle("show");
  });
});

const categoriesToShow = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

const initCategory = (categories) => {
  const container = document.querySelector(".product-container");

  categoriesToShow.forEach((category) => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((products) => {
        const product = products[0];

        const cardWrapper = document.createElement("div");
        const cardBlock = document.createElement("div");
        const cardImg = document.createElement("img");
        const cardText = document.createElement("p");
        cardWrapper.append(cardBlock);
        cardBlock.append(cardImg);
        cardBlock.append(cardText);
        cardWrapper.classList.add("product-card");
        cardBlock.classList.add("product-image");
        cardImg.classList.add("product-thumb");
        cardText.classList.add("card-btn");
        cardImg.src = product.image;
        cardText.innerHTML = category;
        container.append(cardWrapper);
      });
  });
};

fetch("https://fakestoreapi.com/products/categories")
  .then((res) => res.json())
  .then((categories) => initCategory(categories));

const productContainers = [...document.querySelectorAll(".product-container")];
const nxtBtn = [...document.querySelectorAll(".nxt-btn")];
const preBtn = [...document.querySelectorAll(".pre-btn")];

productContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtn[i].addEventListener("click", () => {
    item.scrollLeft += containerWidth;
  });

  preBtn[i].addEventListener("click", () => {
    item.scrollLeft -= containerWidth;
  });
});
