import { renderCalendar } from "./calendar.js";
import { loadData, addData, deleteData, saveData } from "./storage.js";

export const renderModal = (selectedDate) => {
  const modalRoot = document.querySelector("#modal-root");
  const existingModal = modalRoot.querySelector(".modal-overlay");
  if (existingModal) {
    modalRoot.removeChild(existingModal);
  }
  const todoData = loadData();
  const todos = todoData[selectedDate] || [];
  const modalOverlay = document.createElement("div");
  modalOverlay.classList.add("modal-overlay");

  const updateTodo = (selectedDate, todos) => {
    const clikedDate = new Date(selectedDate);
    const viewDate =
      clikedDate.getDate() === new Date().getDate() &&
      clikedDate.getMonth() === new Date().getMonth()
        ? "오늘"
        : `${clikedDate.getMonth() + 1}월 ${clikedDate.getDate()}일`;
    modalOverlay.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <p class="modal-title">${viewDate}의 할 일</p>
        <div class="modal-body">
          <ul id="todoList">
            ${todos
              .map(
                (todoItem, index) =>
                  `<li class="todoItem">
                    <input type="checkbox" id="todoChk-${index}" ${
                    todoItem.isDone ? "checked" : ""
                  } />
                    <label for="todoChk-${index}">${todoItem.text}</label>
                    <button class="deleteTodo" data-index="${index}">삭제</button>
                  </li>`
              )
              .join("")}
          </ul>
          <input type="text" id="todoInput" placeholder="할 일을 입력하세요" />
          <button id="addTodo">할 일 추가</button>
        </div>
      </div>
    `;

    modalOverlay
      .querySelector("#todoInput")
      .addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          modalOverlay.querySelector("#addTodo").click();
        }
      });

    modalOverlay.querySelectorAll(".deleteTodo").forEach((deleteTodo) => {
      deleteTodo.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        deleteData(selectedDate, index, todoData);
        updateTodo(selectedDate, todoData[selectedDate] || []);
        renderCalendar();
      });
    });
    modalOverlay
      .querySelectorAll("input[type='checkbox']")
      .forEach((checkbox, index) => {
        checkbox.addEventListener("change", (e) => {
          todos[index].isDone = e.target.checked;
          saveData(todoData);
        });
      });
    modalOverlay.querySelector("#addTodo").addEventListener("click", () => {
      const todoInput = modalOverlay.querySelector("#todoInput");
      const newTodoText = todoInput.value;
      if (newTodoText.trim() === "") {
        alert("할 일을 입력하세요");
        return;
      }
      const newTodo = { text: newTodoText, isDone: false };
      addData(selectedDate, newTodo, todoData);
      updateTodo(selectedDate, todoData[selectedDate] || []);
      renderCalendar();
    });
  };

  updateTodo(selectedDate, todos);
  modalRoot.appendChild(modalOverlay);

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalRoot.removeChild(modalOverlay);
    }
  });
};
