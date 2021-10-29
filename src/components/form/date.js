function getCurrentDate() {
  const date = new Date();
  return `${date.getFullYear()}-${
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)
  }-${date.getDate() > 9 ? date.getDate() : "0" + date.getDate()}`;
}

function setDateToTicket(e) {
  const ticketDateElem = document.querySelector(".ticket-date-js");
  const currDate = new Date(e.target.value);
  const day = currDate.getDate();
  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    currDate
  );
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    currDate
  );
  ticketDateElem.innerText = `${weekday}, ${month} ${day}`;
}

const dateInput = document.querySelector('input[type="date"]');
dateInput.setAttribute("min", getCurrentDate());
dateInput.addEventListener("input", (e) => setDateToTicket(e));
