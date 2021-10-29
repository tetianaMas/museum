const nameInput = document.querySelector(".name-input-js");
const regex = /^([А-Яа-я\sA-Za-z]){3,15}$/;

nameInput.addEventListener("input", () => {
  const currVal = nameInput.value;
  if (currVal.match(regex)) {
    nameInput.classList.remove("invalid");
  } else {
    nameInput.classList.add("invalid");
  }

  if (!nameInput.value.length) {
    nameInput.classList.remove("invalid");
  }
});
