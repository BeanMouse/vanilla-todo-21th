document.addEventListener("DOMContentLoaded", () => {
  const modalRoot = document.querySelector("#modal-root");

  document.querySelectorAll(".openModal").forEach((openModal) => {
    openModal.addEventListener("click", () => {
      const modalOverlay = document.createElement("div");
      modalOverlay.classList.add("modal-overlay");

      modalOverlay.innerHTML = `
          <div class="modal">
              <div class="modal-header">
                  <h2>${openModal.textContent}일의 투두리스트</h2>
              </div> 
              <div class="modal-body">
                  <button class="addList">할 일 추가</button>
              </div>
          </div>
        `;

      modalRoot.appendChild(modalOverlay);

      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
          modalRoot.removeChild(modalOverlay);
        }
      });
    });
  });
});
