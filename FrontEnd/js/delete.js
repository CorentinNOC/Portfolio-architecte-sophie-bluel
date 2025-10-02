import { displayWorks, fetchWorks } from "./works.js";

async function deleteWork() {
  const works = document.querySelectorAll(".modify-works figure");

  works.forEach((work) => {
    const deleteIcon = work.querySelector("i");
    deleteIcon.addEventListener("click", async () => {
      const workId = work.id;
      if (window.confirm("Voulez-vous vraiment supprimer ce projet ?")) {
        try {
          const response = await fetch(
            `http://localhost:5678/api/works/${workId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          );
          if (response.ok) {
            const updatedWorks = await fetchWorks();
            work.remove();
            displayWorks(updatedWorks);
          }
        } catch (error) {
          console.error("Erreur lors de la suppresion:", error);
        }
      }
    });
  });
}

export async function displayDeleteModal() {
  const works = await fetchWorks();
  const modalElement = document.querySelector("dialog");
  modalElement.querySelector("h3").innerText = "Galerie photo";
  modalElement.querySelector("button").innerText = "Ajouter une photo";
  modalElement.querySelector("button").type = "button";
  modalElement.querySelector("button").disabled = false;

  const worksModal = document.createElement("div");
  worksModal.classList.add("modify-works");

  works.forEach((work) => {
    worksModal.innerHTML += `
        <figure id=${work.id}>
          <img src="${work.imageUrl}" alt="${work.title}" />
          <i class="fa-solid fa-trash-can"></i>
        </figure>
      `;
  });

  if (document.querySelector(".form-add")) {
    document.querySelector(".form-add").remove();
  }

  if (document.querySelector(".fa-arrow-left")) {
    document.querySelector(".fa-arrow-left").remove();
  }

  modalElement
    .querySelector("h3")
    .insertAdjacentElement("afterend", worksModal);

  deleteWork();
}
