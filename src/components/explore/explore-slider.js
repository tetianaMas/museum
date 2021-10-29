const expSlider = document.querySelector(".exp-slider-js");
const expSliderLine = document.querySelector(".exp-slider-line-js");
const imageBefore = document.querySelector(".img-before-js");
const imageAfter = document.querySelector(".img-after-js");
const sliderExplore = document.querySelector(".images-slider-explore");

expSlider.addEventListener("input", () => {
  const val = expSlider.value;
  expSliderLine.style.left = `${val}%`;
  imageAfter.style.width = `${val}%`;
});
