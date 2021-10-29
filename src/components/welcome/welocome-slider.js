import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const SLIDES = document.querySelectorAll(".welcome-slide");
const SLIDES_AMOUNT = SLIDES.length;

const CURRENT_SLIDE_CONTAINER = document.querySelector(
  ".current-slide-number-js"
);
const ALL_SLIDE_CONTAINER = document.querySelector(".slide-number-js");
Swiper.use([Navigation, Pagination]);

const swiper = new Swiper(".swiper-welcome", {
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  on: {
    init: function () {
      changeAllSlidersAmount();
      changeCurrentSliderNumber(1);
    },
  },
});

swiper.on("slideChange", () => changeCurrentSliderNumber(swiper.realIndex + 1));

function changeCurrentSliderNumber(index) {
  CURRENT_SLIDE_CONTAINER.innerHTML = `${index > 9 ? index : "0" + index}`;
}

function changeAllSlidersAmount() {
  ALL_SLIDE_CONTAINER.innerHTML = `${
    SLIDES_AMOUNT > 9 ? SLIDES_AMOUNT : "0" + SLIDES_AMOUNT
  }`;
}
