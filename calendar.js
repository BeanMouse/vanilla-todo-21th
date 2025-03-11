const date = new Date();
const renderCalendar = () => {
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
    const condition =
      i >= firstDate && i < lastDateIndex + 1 ? `current` : `other`;
    if (
      eachDate === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      dates[i] = `<div class="date openModal" data-date="${currentYear}/${
        currentMonth + 1
      }/${eachDate}"><span class="today">오늘</span></div>`;
    } else {
      dates[i] = `<div class="date openModal" data-date="${currentYear}/${
        currentMonth + 1
      }/${eachDate}"><span class="${condition}">${eachDate}일</span></div>`;
    }
  });
  document.querySelector(".dates").innerHTML = dates.join("");
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
