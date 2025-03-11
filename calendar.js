import { loadData } from "./storage.js";
import { renderModal } from "./modal.js";
const date = new Date();
export const renderCalendar = () => {
  const todoData = loadData();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

  document.querySelector("#currentYearMonth").textContent = `${currentYear}년 ${
    currentMonth + 1
  }월`;

  const prevLast = new Date(currentYear, currentMonth, 0);
  const currentLast = new Date(currentYear, currentMonth + 1, 0);

  const prevLastDay = prevLast.getDay();
  const currentLastDay = currentLast.getDay();

  const prevDates = [];
  const currentDates = Array.from(
    { length: currentLast.getDate() },
    (_, i) => i + 1
  );
  const nextDates = [];

  if (prevLastDay !== 6) {
    for (let i = 0; i < prevLastDay + 1; i++) {
      prevDates.unshift(prevLast.getDate() - i);
    }
  }

  for (let i = 1; i < 7 - currentLastDay; i++) {
    nextDates.push(i);
  }

  const dates = prevDates.concat(currentDates, nextDates);
  dates.forEach((eachDate, i) => {
    const firstDate = prevDates.length;
    const lastDateIndex = prevDates.length + currentDates.length - 1;
    const selectedDate = `${currentYear}/${currentMonth + 1}/${eachDate}`;
    const isTodo = todoData[selectedDate] && todoData[selectedDate].length > 0;
    const todo = isTodo ? `<p class="todo">할일 있음</p>` : "";
    const condition =
      i >= firstDate && i < lastDateIndex + 1 ? `current` : `other`;
    if (
      eachDate === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      dates[
        i
      ] = `<div class="date openModal" data-date="${selectedDate}"><span class="today">오늘</span>${todo}</div>`;
    } else {
      dates[
        i
      ] = `<div class="date openModal" data-date="${selectedDate}"><span class="${condition}">${eachDate}일</span>${todo}</div>`;
    }
  });
  document.querySelector(".dates").innerHTML = dates.join("");

  document.querySelector(".dates").addEventListener("click", (e) => {
    const openModalEl = e.target.closest(".openModal");
    if (openModalEl) {
      const selectedDate = openModalEl.dataset.date;
      renderModal(selectedDate);
    }
  });
};

renderCalendar();

const prevMonth = () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
};
const nextMonth = () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
};
const goCurrentMonth = () => {
  date.setMonth(new Date().getMonth());
  renderCalendar();
};
