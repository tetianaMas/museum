import Swiper, { Navigation, Pagination, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

Swiper.use([Navigation, Pagination, Thumbs]);

const swiperVideo = new Swiper(".video-thumbs-wrapper", {
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    980: {
      slidesPerView: 3,
      spaceBetween: 42,
    },
  },
  loop: true,
  navigation: {
    nextEl: ".button-next",
    prevEl: ".button-prev",
  },
  pagination: {
    el: ".pagination-bullets",
    clickable: true,
  },
  on: {
    click: function (swiper, event) {
      createIframe(event.target.closest("div[id]"));
    },
  },
});

const mainVideo = document.querySelector(".main-video-js");
const playBtn = document.querySelector(".video-play-js");
const playBtnSmall = document.querySelector(".play-btn-sm-js");
const pauseBtnSmall = document.querySelector(".pause-btn-sm-js");
const timeline = document.querySelector(".timeline-js");

mainVideo.addEventListener("click", () => {
  videosIframe.forEach((video) => {
    if (video.playerInfo.playerState === 1) {
      video.stopVideo();
    }
  });
});

swiperVideo.on("slideChange", () => {
  mainVideo.setAttribute(
    "poster",
    `./assets/video/poster${swiperVideo.realIndex}.webp`
  );
  mainVideo.setAttribute(
    "src",
    `./assets/video/video${swiperVideo.realIndex}.mp4`
  );

  videosIframe.forEach((video) => {
    if (video.playerInfo.playerState === 1) {
      video.stopVideo();
    }
  });

  mainVideo.currentTime = 0;
  playBtn.style.display = "block";
  playBtnSmall.style.display = "block";
  pauseBtnSmall.style.display = "none";

  timeline.style.background = `linear-gradient(to right, #710707 0%, #710707 0%, #C4C4C4 0%, #C4C4C4 100%)`;
});

const videosIframe = [];

function getId(media) {
  let regexp = /https:\/\/i\.ytimg\.com\/vi\/([A-Z0-9_-]+)\/.*\.jpg/i;
  let url = media.src;
  let match = url.match(regexp);

  return match[1];
}

function createIframe(video) {
  const media = video.querySelector(".video-slide");
  const videoThumb = video.parentElement;
  const id = getId(media);
  video.id = (Math.random() * 10000).toFixed(2);
  const videoId = video.id;

  videosIframe.push(onYouTubeIframeAPIReady(videoId, id));
  videoThumb.firstElementChild.classList.add("video-slide");
}

function onYouTubeIframeAPIReady(videoId, id) {
  return new YT.Player(videoId, {
    height: "452",
    playerVars: { autoplay: 1, controls: 1, showinfo: 0, rel: 0 },
    width: "254",
    videoId: id,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(data) {
  if (data.data === 1) {
    videosIframe.forEach((video) => {
      if (video !== data.target && video.playerInfo.playerState === 1) {
        video.stopVideo();
      }
    });

    if (
      mainVideo.currentTime > 0 &&
      !mainVideo.paused &&
      !mainVideo.ended &&
      mainVideo.readyState > 2
    ) {
      mainVideo.pause();
      playBtn.style.display = "block";
      playBtnSmall.style.display = "block";
      pauseBtnSmall.style.display = "none";
    }
  }
}
