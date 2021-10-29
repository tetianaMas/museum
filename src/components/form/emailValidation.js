const emailInput = document.querySelector(".email-input-js");
const regex = /^[A-Za-z\d_\-\S]{3,15}@[A-Za-z]{4,}\.[A-Za-z]{2,}$/;

emailInput.addEventListener("input", () => {
  const currVal = emailInput.value;
  if (currVal.match(regex)) {
    emailInput.classList.remove("invalid");
  } else {
    emailInput.classList.add("invalid");
  }

  if (!emailInput.value.length) {
    emailInput.classList.remove("invalid");
  }
});
