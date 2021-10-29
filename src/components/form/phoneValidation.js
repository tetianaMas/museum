const phoneInput = document.querySelector(".phone-input-js");
const regex = /^\d{0,3}[-\s]?\d{0,3}[-\s]?\d{0,3}[-\s]?\d{1}$/;

phoneInput.addEventListener("input", () => {
  let currVal = phoneInput.value.replace(/[-|\s]*/gm, "");

  if (currVal.match(regex)) {
    phoneInput.classList.remove("invalid");
  } else {
    phoneInput.classList.add("invalid");
  }
  if (!phoneInput.value.length) {
    phoneInput.classList.remove("invalid");
  }
});
