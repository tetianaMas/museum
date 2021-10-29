import { tickets } from "./ticketsPrice";
import { DB } from "../helpers/DataBase";

const closeModalBtn = document.querySelector(".close-modal-btn");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const formOpenBtn = document.querySelector(".form-btn");
const modalBookBtn = document.querySelector(".card-form-btn");

function closeModal() {
  if (modal.classList.contains("show")) {
    modal.classList.remove("show");
  }
  if (overlay.classList.contains("show")) {
    overlay.classList.remove("show");
  }
}

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

formOpenBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!modal.classList.contains("show")) {
    modal.classList.add("show");
  }
  if (!overlay.classList.contains("show")) {
    overlay.classList.add("show");
  }
});

modalBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  rippleBtn(e);
});

const dateInput = document.querySelector(".date");
const timeInput = document.querySelector(".time");

dateInput.addEventListener("input", (e) => {
  dateInput.classList.remove("date-placeholder");
  dateInput.classList.add("picker-rotate");

  const value = e.currentTarget.value;
  if (value) {
    dateInput.value = value;
  }
});

dateInput.addEventListener("click", () => {
  dateInput.classList.remove("date-placeholder");
  dateInput.classList.add("picker-rotate");
});

dateInput.addEventListener("blur", (e) => {
  const value = e.currentTarget.value;
  if (!value) {
    dateInput.classList.add("date-placeholder");
  }
  dateInput.classList.remove("picker-rotate");
});

timeInput.addEventListener("input", (e) => {
  timeInput.classList.remove("time-placeholder");
  timeInput.classList.add("picker-rotate");
  const value = e.currentTarget.value;
  if (value) {
    timeInput.value = value;
  }
});

timeInput.addEventListener("click", () => {
  timeInput.classList.remove("time-placeholder");
  timeInput.classList.add("picker-rotate");
});

timeInput.addEventListener("blur", (e) => {
  const value = e.currentTarget.value;
  if (!value) {
    timeInput.classList.add("time-placeholder");
  }
  timeInput.classList.remove("picker-rotate");
});

const ticketSelect = document.querySelector(".ticket-select");
const selectOptions = document.querySelector(".select-options");
const selectArrow = document.querySelector(".select-arrow");
const selectVal = document.querySelector(".select-value");
const options = document.querySelectorAll(".ticket-select-opt");

ticketSelect.addEventListener("click", () => {
  selectOptions.classList.toggle("active");
  selectArrow.classList.toggle("rotate-arrow");
});

selectOptions.addEventListener("click", (e) => {
  if (e.target) {
    setSelectValue(e.target);
    setTicketType(e.target);
    countTotal();
  }
});

function setSelectValue(elem) {
  [...options].forEach((option) => option.classList.remove("opt-active"));
  elem.classList.add("opt-active");
  selectVal.innerText = elem.innerText;
  ticketSelect.classList.remove("select-placeholder");
}

function bindSelectValue(value) {
  const selectItem = document.querySelector(`div[data-value="${value}"]`);
  const type = document.querySelector(".type-js");
  type.innerText = selectItem.innerText;

  setSelectValue(selectItem);
}

//Button ripple

function rippleBtn(event) {
  const button = event.currentTarget;
  const oldRipple = button.querySelector(".ripple");

  if (oldRipple) {
    oldRipple.remove();
  }
  const ripple = document.createElement("span");
  ripple.classList.add("ripple");

  let targetCoords = event.target.getBoundingClientRect();

  const x = event.clientX - targetCoords.left;
  const y = event.clientY - targetCoords.top;

  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  button.appendChild(ripple);
}

const monthInput = document.querySelector(".exp-month");
const monthBtnUp = document.querySelector(".exp-month-up");
const monthBtnDown = document.querySelector(".exp-month-down");

const yearInput = document.querySelector(".exp-year");
const yearBtnUp = document.querySelector(".exp-year-up");
const yearBtnDown = document.querySelector(".exp-year-down");

monthBtnUp.addEventListener("click", () => increaseVal(monthInput, true));
yearBtnUp.addEventListener("click", () => increaseVal(yearInput));

monthBtnDown.addEventListener("click", () => decreaseVal(monthInput));
yearBtnDown.addEventListener("click", () => decreaseVal(yearInput));

function increaseVal(input, isMonth = false) {
  let val = parseInt(input.value, 10);
  val += 1;
  if (isMonth && val >= 12) {
    val = 12;
  }
  input.value = `${val > 9 ? val : "0" + val}`;
}

function decreaseVal(input) {
  let val = parseInt(input.value, 10);
  val -= 1;
  if (val <= 0) {
    val = 1;
  }
  input.value = `${val > 9 ? val : "0" + val}`;
}

//form amount buttons
const ticketsForm = document.querySelector(".tickets-form-js");
const basicUp = document.getElementById("basic-plus");
const basicDown = document.getElementById("basic-minus");
const basicInput = document.getElementById("basic");

const seniorUp = document.getElementById("senior-plus");
const seniorDown = document.getElementById("senior-minus");
const seniorInput = document.getElementById("senior");

const typeElements = document.querySelectorAll('input[name="ticket"]');

ticketsForm.addEventListener("click", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "LABEL") {
    const val = e.target.value;
    countTotal();
    if (val) {
      bindSelectValue(val);
    }
  }
});

basicUp.addEventListener("click", (e) => increaseBasic(e));
basicDown.addEventListener("click", (e) => decreaseBasic(e));
seniorUp.addEventListener("click", (e) => increaseSenior(e));
seniorDown.addEventListener("click", (e) => decreaseSenior(e));

//form modal buttons
const modalBasicUp = document.getElementById("basic-plus-modal");
const modalBasicDown = document.getElementById("basic-minus-modal");
const modalBasicInput = document.getElementById("basic-modal");

const modalSeniorUp = document.getElementById("senior-plus-modal");
const modalSeniorDown = document.getElementById("senior-minus-modal");
const modalSeniorInput = document.getElementById("senior-modal");

modalBasicUp.addEventListener("click", (e) => increaseBasic(e));
modalBasicDown.addEventListener("click", (e) => decreaseBasic(e));
modalSeniorUp.addEventListener("click", (e) => increaseSenior(e));
modalSeniorDown.addEventListener("click", (e) => decreaseSenior(e));

function increaseSenior(e) {
  e.preventDefault();

  increaseTickets(seniorInput);
  increaseTickets(modalSeniorInput);
  countTotal();
}

function increaseBasic(e) {
  e.preventDefault();
  increaseTickets(basicInput);
  increaseTickets(modalBasicInput);
  countTotal();
}

function decreaseSenior(e) {
  e.preventDefault();

  decreaseTickets(seniorInput);
  decreaseTickets(modalSeniorInput);
  countTotal();
}

function decreaseBasic(e) {
  e.preventDefault();

  decreaseTickets(basicInput);
  decreaseTickets(modalBasicInput);
  countTotal();
}

function increaseTickets(input) {
  let val = parseInt(input.value, 10);
  val += 1;
  if (val > 20) {
    val = 20;
  }
  input.value = val;
}

function decreaseTickets(input) {
  let val = parseInt(input.value, 10);
  val -= 1;
  if (val <= 0) {
    val = 0;
  }
  input.value = val;
}

function countTotal() {
  let currentType;
  const totalInputs = document.querySelectorAll(".total-sum-js");
  const basicPrices = document.querySelectorAll(".price-basic-js");
  const seniorPrices = document.querySelectorAll(".price-senior-js");
  const totalBasicInput = document.querySelector(".basic-sum-js");
  const totalSeniorInput = document.querySelector(".senior-sum-js");
  const basicTicketsAmount = document.querySelector(".basic-ticket-counter-js");
  const seniorTicketsAmount = document.querySelector(
    ".senior-ticket-counter-js"
  );

  typeElements.forEach((type) => {
    if (type.checked) {
      currentType = type.value;
    }
  });

  const totalBasic =
    tickets.basic[currentType] * parseInt(basicInput.value, 10);
  const totalSenior =
    tickets.senior[currentType] * parseInt(seniorInput.value, 10);
  const total = totalBasic + totalSenior;

  totalInputs.forEach((input) => (input.innerText = total));
  basicPrices.forEach((elem) => (elem.innerText = tickets.basic[currentType]));
  seniorPrices.forEach(
    (elem) => (elem.innerText = tickets.senior[currentType])
  );
  totalBasicInput.innerText = totalBasic;
  totalSeniorInput.innerText = totalSenior;
  basicTicketsAmount.innerText = parseInt(basicInput.value, 10);
  seniorTicketsAmount.innerText = parseInt(seniorInput.value, 10);
  saveData();
}

function setTicketType(value) {
  const currType = document.querySelector(
    `input[value="${value.getAttribute("data-value")}"]`
  );
  const type = document.querySelector(".type-js");
  currType.checked = true;
  type.innerText = value.innerText;
}

function saveData() {
  const form = document.forms[0];
  const data = {
    ticketType: [...form.elements["ticket"]].find((type) => type.checked).value,
    basicInput: basicInput.value,
    seniorInput: seniorInput.value,
  };

  DB.setToLocalStorage("form-tickets", data);
}

function getData() {
  const data = DB.getFromLocalStorage("form-tickets");

  const type = document.querySelector(".type-js");
  const radioLabel = document.querySelector(
    `input[value="${data ? data.ticketType : "permanent"}"]`
  );

  if (!data) {
    basicInput.value = 0;
    seniorInput.value = 0;
    modalBasicInput.value = 0;
    modalSeniorInput.value = 0;
    bindSelectValue("permanent");
  } else {
    basicInput.value = data.basicInput;
    seniorInput.value = data.seniorInput;
    modalBasicInput.value = data.basicInput;
    modalSeniorInput.value = data.seniorInput;
    bindSelectValue(data.ticketType);
  }

  radioLabel.checked = true;
  type.innerText = radioLabel.nextElementSibling.innerText;
  countTotal();
}
getData();
