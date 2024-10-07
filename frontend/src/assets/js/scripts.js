// The following code is based off a toggle menu by @Bradcomp
// source: https://gist.github.com/Bradcomp/a9ef2ef322a8e8017443b626208999c1
addEventListener("DOMContentLoaded", (event) => {    
    const value = "#burger";
    var burger = document.querySelector(value);
    var menu = document.querySelector("#" + burger.dataset.target);
    burger.addEventListener("click", function () {
      burger.classList.toggle("is-active");
      menu.classList.toggle("is-active");
    });
});