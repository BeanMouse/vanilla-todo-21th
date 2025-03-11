import { loadData } from "./storage.js";
import { renderModal } from "./modal.js";
//오늘 날짜
const date = new Date();
//캘린더 렌더링 함수
export const renderCalendar = () => {
  //데이터 로드
  const todoData = loadData();

  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

  //현 캘린더 년월 표시
  document.querySelector(".currentYearMonth").textContent = `${currentYear}년 ${
    currentMonth + 1
  }월`;

  //이전 달 마지막 날, 현재 달 마지막 날 날짜 및 요일
  const prevLast = new Date(currentYear, currentMonth, 0);
  const currentLast = new Date(currentYear, currentMonth + 1, 0);

  const prevLastDay = prevLast.getDay();
  const currentLastDay = currentLast.getDay();

  //이전 달, 현재 달, 다음 달 날짜 배열 생성
  const prevDates = [];
  const currentDates = Array.from(
    { length: currentLast.getDate() },
    (_, i) => i + 1
  );
  const nextDates = [];

  //현재 달 캘린더에서 보이는 전후 달 날짜 배열 생성
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
    let year = currentYear;
    let month = currentMonth + 1;
    //전후 달과 현 달 구분
    if (i < firstDate) {
      month = currentMonth === 0 ? 12 : currentMonth;
      if (currentMonth === 0) {
        year = currentYear - 1;
      }
    } else if (i > lastDateIndex) {
      month = currentMonth === 11 ? 1 : currentMonth + 2;
      if (currentMonth === 11) {
        year = currentYear + 1;
      }
    }
    //날짜별 데이터 할당
    const selectedDate = `${year}/${month}/${eachDate}`;
    const isTodo = todoData[selectedDate] && todoData[selectedDate].length > 0;
    const isTodoClass = isTodo ? "isTodo" : "";
    const todo = isTodo
      ? `<p class="todo">할일 ${todoData[selectedDate].length}개 !</p>`
      : "";
    const condition =
      i >= firstDate && i < lastDateIndex + 1 ? `current` : `other`;
    if (
      eachDate === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      dates[
        i
      ] = `<div class="date openModalClass " data-date="${selectedDate}"><span class="today ${isTodoClass}" >오늘</span>${todo}</div>`;
    } else {
      dates[
        i
      ] = `<div class="date openModalClass " data-date="${selectedDate}"><span class="${condition} ${isTodoClass}">${eachDate}일</span>${todo}</div>`;
    }
  });

  //캘린더 렌더링
  document.querySelector(".dates").innerHTML = dates.join("");

  //버블링을 사용하여 이벤트 위임
  document.querySelector(".dates").addEventListener("click", (e) => {
    const openModalEl = e.target.closest(".openModalClass");
    if (openModalEl) {
      const selectedDate = openModalEl.dataset.date;
      renderModal(selectedDate);
    }
  });
};

renderCalendar();

//캘린더 달 이동 네브 함수
const prevMonth = () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
};
const nextMonth = () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
};
const goCurrentYearMonth = () => {
  date.setMonth(new Date().getMonth());
  renderCalendar();
};
//전역 함수화 (모듈화를 했기 때문에)
window.prevMonth = prevMonth;
window.nextMonth = nextMonth;
window.goCurrentYearMonth = goCurrentYearMonth;
