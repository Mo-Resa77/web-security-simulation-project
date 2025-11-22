document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.getElementById("navbar");
    const navbarRight = document.getElementById("navbarRight");
    const menu = document.getElementById("menu");

    menu.addEventListener("click", function() {
      navbar.classList.toggle("active");
      navbarRight.classList.toggle("active");
      menu.classList.toggle("open");
    });
  });