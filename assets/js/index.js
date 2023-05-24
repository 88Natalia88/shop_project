document.addEventListener("DOMContentLoaded", function () {
  const logoBurger = document.querySelector(".header__logoBurger");
  const menu = document.querySelector(".header__menuBurger");

  logoBurger.addEventListener("click", function () {
    menu.classList.toggle("show");
  });
});
