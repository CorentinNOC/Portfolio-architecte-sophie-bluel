import { displayWorks, fetchWorks } from "./works.js";

// Initie un tableau de catégorie vite

let allCategories = [];

// Importe les catégories depuis l'API

export async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();
    allCategories = data;
    return allCategories;
  } catch (error) {
    console.error("Erreur lors de la récupération des categories :", error);
  }
}

// Créer le tableau avec les différentes catégories et gère son affichage

document.addEventListener("DOMContentLoaded", async () => {
  const allWorks = await fetchWorks();

  let allCategories = await fetchCategories();
  allCategories = [{ id: 0, name: "Tous" }, ...allCategories];

  const categoryMenu = document.querySelector(".filters");

  allCategories.forEach((category) => {
    const categoryButton = document.createElement("button");

    categoryButton.classList.add("btn");
    categoryButton.dataset.categoryId = category.id;
    categoryButton.innerText = category.name;

    categoryMenu.appendChild(categoryButton);

    categoryButton.addEventListener("click", () => {
      if (category.id === 0) {
        displayWorks(allWorks);
      } else {
        const filteredWorks = allWorks.filter(
          (work) => work.category.id === category.id
        );
        displayWorks(filteredWorks);
      }
    });
  });

  const categoryButtons = document.querySelectorAll(".filters button");
  categoryButtons[0].classList.add("current");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryButtons.forEach((btn) => btn.classList.remove("current"));
      button.classList.add("current");
    });
  });
});
