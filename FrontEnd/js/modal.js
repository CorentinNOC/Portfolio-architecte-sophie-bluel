import { displayDeleteModal } from "./delete.js";

document.addEventListener("DOMContentLoaded", async () => {
  const authToken = localStorage.getItem("authToken");

  if (authToken) {
    const workTitle = document.querySelector("#portfolio h2");
    const modalButton = document.createElement("button");
    modalButton.innerHTML =
      "<i class='fa-regular fa-pen-to-square'></i> modifier";

    workTitle.appendChild(modalButton);

    modalButton.addEventListener("click", () => {
      createModal();
    });
  }
});

function createModal() {
  let modalElement = document.querySelector("dialog");

  if (!modalElement) {
    modalElement = document.createElement("dialog");

    modalElement.innerHTML = `
    <i class="fa-solid fa-xmark"></i>
    <h3></h3>
  `;

    document.body.appendChild(modalElement);
    displayDeleteModal();

    modalElement.addEventListener("click", (event) => {
      const rect = modalElement.getBoundingClientRect();
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.bottom &&
        rect.left <= event.clientX &&
        event.clientX <= rect.right;

      if (!isInDialog) {
        modalElement.close();
        if (document.querySelector(".form-add")) {
          displayDeleteModal();
        }
      }
    });

    document.querySelector(".fa-xmark").addEventListener("click", () => {
      modalElement.close();
    });
  }
  modalElement.showModal();
}
