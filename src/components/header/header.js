const hamburger = document.querySelector(".hamburger-js");
const menu = document.querySelector(".menu-js");
const welcomeContainerDescr = document.querySelector(".descr-js");

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleNavbar();
});
menu.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("navbar-item") ||
    e.target.closest(".navbar-item") ||
    e.target.closest(".social-link")
  ) {
    toggleNavbar();
  }
});

document.body.addEventListener("click", (e) => {
  if (hamburger.classList.contains("open") && !e.target.closest(".menu-js")) {
    toggleNavbar();
  }
});
function toggleNavbar() {
  hamburger.classList.toggle("open");
  menu.classList.toggle("active");
  welcomeContainerDescr.classList.toggle("hidden");
}
