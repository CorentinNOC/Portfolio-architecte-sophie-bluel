import { fetchCategories } from "./categories.js";
import { displayDeleteModal } from "./delete.js";
import { displayWorks, fetchWorks } from "./works.js";

function addWorkForm() {
  const uploadButton = document.querySelector("#file-input");
  uploadButton.addEventListener("change", () => {
    const file = uploadButton.files[0];
    if (file) {
      document.querySelector(".fa-image").style.display = "none";
      document.querySelector(".label-file").style.display = "none";
      document.querySelector("#file-input").style.display = "none";
      document.querySelector(".size-instruction").style.display = "none";
      document.querySelector("#preview").style.display = "flex";
      const reader = new FileReader();
      reader.onload = function (e) {
        document.querySelector(
          "#preview"
        ).style.backgroundImage = `url(${e.target.result})`;
        document.querySelector(".fa-circle-xmark").style.display = `block`;
      };
      reader.readAsDataURL(file);
    }

    document.querySelector(".fa-circle-xmark").addEventListener("click", () => {
      document.querySelector(".fa-image").style.display = "block";
      document.querySelector(".label-file").style.display = "block";
      document.querySelector("#file-input").style.display = "block";
      document.querySelector("#file-input").value = "";
      document.querySelector(".size-instruction").style.display = "block";
      document.querySelector(".fa-circle-xmark").style.display = `none`;
      document.querySelector("#preview").style.display = "none";
      document.querySelector(".form-add input.btn-full").disabled = true;
    });
  });
}

async function submitWork() {
  const submitForm = document.querySelector(".form-add");
  const submitWorkImage = submitForm.querySelector("#file-input");
  const submitWorkTitle = submitForm.querySelector("#title");
  const submitWorkCategory = submitForm.querySelector("#category");

  try {
    const formData = new FormData();
    formData.append("image", submitWorkImage.files[0]);
    formData.append("title", submitWorkTitle.value.trim());
    formData.append("category", submitWorkCategory.value);

    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: formData,
    });

    if (response.ok) {
      const updatedWorks = await fetchWorks();
      displayWorks(updatedWorks);
      displayDeleteModal();
    } else if (!response.ok) {
      throw new Error("Échec lors de l'ajout");
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout :", error.message);
  }
}

export async function addModal() {
  const categories = await fetchCategories();

  const modalElement = document.querySelector("dialog");

  modalElement.querySelector("h3").innerText = "Ajout photos";

  modalElement.querySelector(".works").remove();

  const addBackArrow = document.createElement("i");
  addBackArrow.classList.add("fa-solid", "fa-arrow-left");

  const addSection = document.createElement("section");
  addSection.classList.add("section-add");

  const addForm = document.createElement("form");
  addForm.classList.add("form-add");

  const optionsHTML = categories
    .map(
      (category) => `<option value="${category.id}">${category.name}</option>`
    )
    .join("");

  addForm.innerHTML = `
    <div class="upload">
      <i style="display:none;" class="fa-solid fa-circle-xmark"></i>
      <i class="fa-regular fa-image"></i>
      <label for="file-input" class="label-file">+ Ajouter photo</label>
      <input type="file" id="file-input" name="file-input" accept="image/png, image/jpeg" required/>
      <div id="preview"></div>
      <p class="size-instruction">jpg, png : 4mo max</p>
    </div>
    <label for="title">Titre</label>
    <input type="text" id="title" required>
    <label for="category">Catégorie</label>
    <select id="category">
    <option value=""></option>
    ${optionsHTML}
    </select>
    <hr/>
    <input class="btn-full" type="submit" value="Valider" disabled />
  `;

  modalElement
    .querySelector("i")
    .insertAdjacentElement("afterend", addBackArrow);

  modalElement
    .querySelector("h3")
    .insertAdjacentElement("afterend", addSection);

  addSection.appendChild(addForm);

  addWorkForm();

  const submitButton = addForm.querySelector("input[type='submit']");
  const titleInput = addForm.querySelector("#title");
  const categorySelect = addForm.querySelector("#category");
  const fileInput = addForm.querySelector("#file-input");

  function checkFormValidity() {
    const titleFilled = titleInput.value.trim() !== "";
    const categoryFilled = categorySelect.value.trim() !== "";
    const fileFilled = fileInput.files.length > 0;

    if (titleFilled && categoryFilled && fileFilled) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }

  titleInput.addEventListener("input", checkFormValidity);
  categorySelect.addEventListener("change", checkFormValidity);
  fileInput.addEventListener("change", checkFormValidity);

  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!submitButton.disabled) {
      submitWork();
    }
  });

  if (addBackArrow) {
    addBackArrow.addEventListener("click", () => {
      displayDeleteModal();
    });
  }
}
