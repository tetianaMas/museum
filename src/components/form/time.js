const ticketTime = document.querySelector(".ticket-time-js");
const timeInput = document.querySelector(".time-js");

timeInput.addEventListener("change", () => {
  ticketTime.innerText = timeInput.value;
});
