import { loadData, addData, deleteData } from "./storage.js";
document.addEventListener("DOMContentLoaded", () => {
  const modalRoot = document.querySelector("#modal-root");

  document.querySelectorAll(".openModal").forEach((openModal) => {
    openModal.addEventListener("click", () => {
      const selectedDate = openModal.dataset.date;
      const modalOverlay = document.createElement("div");
      modalOverlay.classList.add("modal-overlay");
      const todoData = loadData();
      const todos = todoData[selectedDate] || [];
      const updateTodo = (selectedDate, todos) => {
        modalOverlay.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h2>${openModal.textContent}일의 투두리스트</h2>
                </div> 
                <div class="modal-body">
                    <ul id="todoList">
                        ${todos
                          .map(
                            (
                              todoItem,
                              index
                            ) => `<li>${todoItem} <button class="deleteTodo
                        " data-index="${index}">삭제</button></li>`
                          )
                          .join("")}
                    </ul>
                    <input type="text" id="todoInput" placeholder="할 일을 입력하세요" />
                    <button class="addTodo">할 일 추가</button>
                </div>
            </div>
          `;
        modalOverlay.querySelectorAll(".deleteTodo").forEach((deleteTodo) => {
          deleteTodo.addEventListener("click", (e) => {
            deleteData(selectedDate, e.target.dataset.index, todoData);
            updateTodo(selectedDate, todos);
          });
        });
        modalOverlay.querySelector(".addTodo").addEventListener("click", () => {
          const todoInput = modalOverlay.querySelector("#todoInput");
          const newTodo = todoInput.value;
          if (newTodo.trim() === "") {
            alert("할 일을 입력하세요");
            return;
          }
          addData(selectedDate, newTodo, todoData);
          updateTodo(selectedDate, todos);
        });
      };
      updateTodo(selectedDate, todos);
      modalRoot.appendChild(modalOverlay);

      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
          modalRoot.removeChild(modalOverlay);
        }
      });
    });
  });
});
