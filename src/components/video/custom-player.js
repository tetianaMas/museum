const mainPlayer = document.querySelector(".main-video-js");
const playBtn = document.querySelector(".video-play-js");
const playBtnSmall = document.querySelector(".play-btn-sm-js");
const pauseBtnSmall = document.querySelector(".pause-btn-sm-js");
const videoContainer = document.querySelector(".video-container-js");
const timeline = document.querySelector(".timeline-js");
const speedContainer = document.querySelector(".video-speed-js");
let isFullScreen = false;

function initVideo() {
  changeTimelineBg();
}

//playing video
mainPlayer.addEventListener("click", toggleVideo);
playBtn.addEventListener("click", toggleVideo);
playBtnSmall.addEventListener("click", toggleVideo);
pauseBtnSmall.addEventListener("click", toggleVideo);

mainPlayer.addEventListener("timeupdate", () => {
  timeline.value = mainPlayer.currentTime;
  changeTimelineBg();

  if (mainPlayer.ended) {
    playBtn.style.display = "block";
    playBtnSmall.style.display = "block";
    pauseBtnSmall.style.display = "none";
    changeTimelineBg();
  }
});

timeline.addEventListener("input", () => {
  mainPlayer.currentTime = timeline.value;
  if (!mainPlayer.paused) {
    mainPlayer.play();
  }
  changeTimelineBg();
});

function toggleVideo() {
  if (!mainPlayer.paused) {
    mainPlayer.pause();
    playBtn.style.display = "block";
    playBtnSmall.style.display = "block";
    pauseBtnSmall.style.display = "none";
  } else {
    timeline.setAttribute("max", mainPlayer.duration);
    mainPlayer.play();
    playBtn.style.display = "none";
    playBtnSmall.style.display = "none";
    pauseBtnSmall.style.display = "block";
  }
}

function changeTimelineBg() {
  timeline.style.background = `linear-gradient(to right, #710707 0%, #710707 ${
    (mainPlayer.currentTime * 100) / mainPlayer.duration
  }%, #C4C4C4 ${
    (mainPlayer.currentTime * 100) / mainPlayer.duration
  }%, #C4C4C4 100%)`;
}

//volume
const volumeBtn = document.querySelector(".volume-btn-js");
const volumeBtnMuted = document.querySelector(".volume-btn-muted-js");
const volumeRange = document.querySelector(".volume-js");
let currentVolumeVal = mainPlayer.volume;

volumeBtnMuted.addEventListener("click", () => {
  mainPlayer.volume = currentVolumeVal;
  volumeRange.value = currentVolumeVal;
  changeVolumeBg();
  toggleMute();
});

volumeBtn.addEventListener("click", () => {
  if (mainPlayer.volume > 0) {
    mainPlayer.volume = 0;
    volumeRange.value = 0;
  }
  toggleMute();
});

volumeRange.addEventListener("input", changeVolumeLevel);

function changeVolumeLevel() {
  currentVolumeVal = mainPlayer.volume;
  const currVolVal = parseFloat(volumeRange.value, 10);
  mainPlayer.volume = currVolVal;
  changeVolumeBg();

  if (parseFloat(currVolVal, 10) === 0) {
    volumeBtnMuted.classList.remove("d-none");
    volumeBtn.classList.add("d-none");
  } else {
    volumeBtnMuted.classList.add("d-none");
    volumeBtn.classList.remove("d-none");
  }
}

function toggleMute() {
  changeVolumeBg();
  volumeBtnMuted.classList.toggle("d-none");
  volumeBtn.classList.toggle("d-none");
}

function changeVolumeBg() {
  const currVolVal = parseFloat(volumeRange.value, 10);

  volumeRange.style.background = `linear-gradient(to right, #710707 0%, #710707 ${
    currVolVal * 100
  }%, #C4C4C4 ${currVolVal * 100}%, #C4C4C4 100%)`;
}

//fullscreen
const fullscreenBtn = document.querySelector(".fullscreen-btn-js");
const fullscreenBtnExit = document.querySelector(".fullscreen-btn-exit-js");

fullscreenBtn.addEventListener("click", goFullScreen);

fullscreenBtnExit.addEventListener("click", exitFullScreen);

function goFullScreen() {
  isFullScreen = true;
  videoContainer.requestFullscreen();
  fullscreenBtn.classList.add("d-none");
  fullscreenBtnExit.classList.remove("d-none");
}

function exitFullScreen() {
  isFullScreen = false;
  fullscreenBtn.classList.remove("d-none");
  fullscreenBtnExit.classList.add("d-none");
  document.exitFullscreen();
}

//pressing keys

document.addEventListener("keydown", (e) => {
  const isInViewport = mainPlayer.getBoundingClientRect().top > 0;
  if (e.code === "Space" && isInViewport) {
    e.preventDefault();
    mainPlayer.focus();
    toggleVideo();
    return false;
  }

  if (e.code === "KeyM" && isInViewport) {
    mainPlayer.focus();
    if (mainPlayer.volume === 0) {
      mainPlayer.volume = currentVolumeVal;
      volumeRange.value = currentVolumeVal;
      changeVolumeBg();
    } else {
      mainPlayer.volume = 0;
      volumeRange.value = 0;
    }
    toggleMute();
  }

  if (e.code === "KeyF" && isInViewport) {
    if (isFullScreen) {
      exitFullScreen();
    } else {
      goFullScreen();
    }
  }
});

function increaseVideoSpeed(video) {
  const isInViewport = mainPlayer.getBoundingClientRect().top > 0;
  const currentSpeed = video.playbackRate;

  if (currentSpeed === 2) {
    return;
  } else if (isInViewport) {
    video.playbackRate = currentSpeed + 0.25;

    showCurrentSpeed(video.playbackRate, speedContainer);
  }
}

function decreaseVideoSpeed(video) {
  const isInViewport = mainPlayer.getBoundingClientRect().top > 0;
  const currentSpeed = video.playbackRate;

  if (currentSpeed === 0.25) {
    return;
  } else if (isInViewport) {
    video.playbackRate = currentSpeed - 0.25;
  }

  showCurrentSpeed(video.playbackRate, speedContainer);
}

function changeVideoSpeed(func, ...codes) {
  let pressed = new Set();

  document.addEventListener("keydown", function (event) {
    pressed.add(event.code);

    for (let code of codes) {
      if (!pressed.has(code)) {
        return;
      }
    }
    func();
  });

  document.addEventListener("keyup", function (event) {
    pressed.delete(event.code);
  });
}

function showCurrentSpeed(speed, container) {
  container.innerHTML = "";
  container.insertAdjacentHTML(
    "afterbegin",
    `<span class="video-speed">${speed}x</span>`
  );
  setTimeout(() => {
    container.innerHTML = "";
  }, 1000);
}

changeVideoSpeed(() => decreaseVideoSpeed(mainPlayer), "ShiftLeft", "Period");
changeVideoSpeed(() => increaseVideoSpeed(mainPlayer), "ShiftLeft", "Comma");

changeVideoSpeed(() => decreaseVideoSpeed(mainPlayer), "ShiftRight", "Period");
changeVideoSpeed(() => increaseVideoSpeed(mainPlayer), "ShiftRight", "Comma");
