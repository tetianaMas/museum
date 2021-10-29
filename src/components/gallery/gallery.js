import { DEFAULT_IMG } from "./image-paths";
import { DB } from "../helpers/DataBase";

window.addEventListener("DOMContentLoaded", () => {
  const pictureInnerContainer = document.querySelector(
    ".picture-inner-container"
  );
  pictureInnerContainer.addEventListener("click", (e) => likeImage(e));
  let allImg = DB.getFromLocalStorage("galleryImages");

  function shuffleArray(imagesArr) {
    if (!imagesArr || !Array.isArray(imagesArr)) {
      return false;
    }
    const copyArr = [...imagesArr];
    const result = [];

    imagesArr.forEach(() => {
      const currentIndex = Math.floor(Math.random() * copyArr.length);
      if (copyArr[currentIndex]) {
        result.push(copyArr[currentIndex]);
        copyArr.splice(currentIndex, 1);
      }
    });

    return result;
  }

  function createImgTemplate(elems) {
    return elems
      .map((elem) => {
        return `
        <div class="gallery-img ${elem.image.liked ? "" : "unliked"}" id="${
          elem.image.id
        }">
          <span class="heart-icon ${
            elem.image.liked ? "heart-icon-filled" : ""
          }"></span>
          <img src=${elem.image.src} alt="gallery image">
        </div>

        `;
      })
      .join("");
  }

  function createGallery(img) {
    const shuffledArr = shuffleArray(img);
    const template = createImgTemplate(shuffledArr);
    pictureInnerContainer.innerHTML = template;
    pictureInnerContainer.classList.add("show");
  }

  function likeImage(e) {
    const id = e.target.id || e.target.parentElement.id;
    const imgContainer = document.getElementById(id);
    const heartIcon = imgContainer.firstElementChild;
    allImg.forEach((elem) => {
      if (elem.image.id === id) {
        elem.image.liked = !elem.image.liked;
      }
    });

    if (imgContainer.classList.contains("unliked")) {
      imgContainer.classList.remove("unliked");
      heartIcon.classList.add("heart-icon-filled");
    } else {
      imgContainer.classList.add("unliked");
      heartIcon.classList.remove("heart-icon-filled");
    }

    DB.setToLocalStorage("galleryImages", allImg);
  }

  function init() {
    if (!allImg) {
      allImg = DEFAULT_IMG;
      DB.setToLocalStorage("galleryImages", allImg);
    }

    createGallery(allImg);
  }

  init();

  window.addEventListener("scroll", () => {
    const windowWidth = document.getElementsByTagName("html")[0].clientWidth;
    if (windowWidth >= 1024) {
      if (
        window.pageYOffset >= 3900 &&
        !pictureInnerContainer.classList.contains("show")
      ) {
        pictureInnerContainer.classList.add("show");
        init();
      } else if (
        window.pageYOffset < 3450 &&
        pictureInnerContainer.classList.contains("show")
      ) {
        pictureInnerContainer.classList.remove("show");
      }
    } else {
      if (
        window.pageYOffset >= 3900 - (3900 / 100) * 10 &&
        !pictureInnerContainer.classList.contains("show")
      ) {
        pictureInnerContainer.classList.add("show");
        init();
      } else if (
        window.pageYOffset < 3450 - (3450 / 100) * 10 &&
        pictureInnerContainer.classList.contains("show")
      ) {
        pictureInnerContainer.classList.remove("show");
      }
    }
  });
});
